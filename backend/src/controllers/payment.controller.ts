import { Request, Response } from "express";
import { payment } from "../config/mp";
import { PaymentCreateRequest } from "mercadopago/dist/clients/payment/create/types";

// ✅ IMPORTAÇÕES CORRIGIDAS (Vendas em vez de Assinaturas)
import {
  createSaleRecord,
  getSaleByPaymentId,
  updateSaleStatus
} from "../services/supabase.service";

import {
  sendPaymentConfirmation
} from "../services/email.service";

/* -----------------------------------------------------
   PAGAMENTO COM CARTÃO
------------------------------------------------------ */
export const createCardPayment = async (req: Request, res: Response) => {
  try {
    const {
      transaction_amount,
      token,
      description,
      installments,
      payment_method_id,
      issuer_id,
      payer,
      // Campos customizados do frontend
      product_name,
      name_customer, // Nome do cliente
      phone_customer // Telefone
    } = req.body;

    // Validação básica
    if (!transaction_amount || !token || !payer?.email) {
      return res.status(400).json({ error: "Dados obrigatórios faltando" });
    }

    const customerEmail = payer.email;

    // Objeto para o Mercado Pago
    const paymentData: PaymentCreateRequest = {
      transaction_amount: Number(transaction_amount),
      token,
      description: description || product_name || "Compra",
      installments: Number(installments) || 1,
      payment_method_id,
      issuer_id,
      payer: {
        email: payer.email,
        identification: {
          type: payer.identification?.type || "CPF",
          number: payer.identification?.number
        }
      }
    };

    // 1. Cria pagamento no Mercado Pago
    const result = await payment.create({
      body: paymentData,
      requestOptions: { idempotencyKey: `card-${Date.now()}-${token.slice(0, 10)}` }
    });

    console.log("[PAYMENT CARD] Processado no MP:", result.id, result.status);

    // 2. Se aprovado (ou in_process), salva no Banco
    if (result.id) {
      try {
        await createSaleRecord({
          name: name_customer || "Cliente Cartão",
          email: customerEmail,
          phone: phone_customer || "",
          cpf: payer.identification?.number || "",
          productName: product_name || description || "Produto",
          paymentId: String(result.id),
          paymentMethod: "card",
          amount: Number(transaction_amount)
        });

        // Se já aprovou na hora (sem pendência de análise), envia email
        if (result.status === 'approved') {
          // Atualiza status no banco pra garantir (embora createSaleRecord já crie pending por padrão)
          await updateSaleStatus(String(result.id), "approved");

          await sendPaymentConfirmation(customerEmail, {
            name: name_customer || "Cliente",
            plan: product_name || "Produto",
            amount: Number(transaction_amount),
            paymentId: String(result.id),
            method: "card"
          });
        }

      } catch (e: any) {
        console.warn("[DB ERROR] Venda criada no MP mas falhou ao salvar no banco:", e.message);
        // Não retorna erro 400 aqui para não confundir o front, pois o pagamento já foi feito.
      }
    }

    return res.status(201).json({
      id: result.id,
      status: result.status,
      status_detail: result.status_detail,
      amount: result.transaction_amount
    });

  } catch (error: any) {
    console.error("[ERROR CARD]", error.message);
    const msg = error.cause?.[0]?.description || error.message;
    return res.status(400).json({ error: "Erro no pagamento", details: msg });
  }
};

/* -----------------------------------------------------
   PAGAMENTO PIX
------------------------------------------------------ */
export const createPIX = async (req: Request, res: Response) => {
  try {
    const {
      product_name,
      price,
      email,
      cpf,
      name_customer, // Adicionei para salvar no banco
      phone_customer
    } = req.body;

    if (!email || !cpf) {
      return res.status(400).json({ error: "Email e CPF são obrigatórios" });
    }

    // 1. Cria PIX no Mercado Pago
    const result = await payment.create({
      body: {
        transaction_amount: Number(price),
        description: product_name || "Pagamento PIX",
        payment_method_id: "pix",
        payer: {
          email,
          identification: { type: "CPF", number: cpf }
        }
      },
      requestOptions: { idempotencyKey: `pix-${Date.now()}-${email}` }
    });

    const qr = result.point_of_interaction?.transaction_data;

    // 2. CRUCIAL: Salvar a venda como "pending" no banco AGORA.
    // Se não salvar agora, quando o webhook chegar, ele não vai achar a venda.
    try {
      await createSaleRecord({
        name: name_customer || "Cliente PIX",
        email: email,
        phone: phone_customer || "",
        cpf: cpf,
        productName: product_name || "Produto",
        paymentId: String(result.id),
        paymentMethod: "pix",
        amount: Number(price)
      });
      console.log("[DB] Pré-venda PIX registrada com sucesso.");
    } catch (dbError: any) {
      console.error("[DB ERROR] Erro ao salvar pré-venda PIX:", dbError.message);
    }

    return res.json({
      id: result.id,
      status: result.status,
      qr_code: qr?.qr_code,
      qr_code_base64: qr?.qr_code_base64
    });

  } catch (error: any) {
    console.error("[ERROR PIX]", error.message);
    return res.status(500).json({ error: error.message });
  }
};

/* -----------------------------------------------------
   WEBHOOK (Atualiza Venda Única)
------------------------------------------------------ */
export const webhook = async (req: Request, res: Response) => {
  // Responde rápido para o MP não ficar reenviando (timeout)
  res.sendStatus(200);

  try {
    const { type, data } = req.body; // Se usou express.json() no server.ts, isso funciona direto.

    // Log básico para debug
    if (type === "payment" || type === "payment.created") {
      console.log(`🔔 Webhook: Pagamento ${data?.id}`);
    }

    if (type === "payment") {
      const paymentId = data.id;

      // 1. Consulta o status real na API do MP (Segurança)
      const paymentInfo = await payment.get({ id: paymentId });
      const currentStatus = paymentInfo.status;

      console.log(`💰 Check MP ID ${paymentId}: Status ${currentStatus}`);

      // 2. Se aprovado, atualiza o banco
      if (currentStatus === "approved") {
        const sale = await getSaleByPaymentId(String(paymentId));

        if (sale) {
          // Evita reprocessar se já estiver approved
          if (sale.status !== 'approved') {
            await updateSaleStatus(String(paymentId), "approved");
            console.log("✅ Venda aprovada e atualizada no banco!");

            // Envia email
            await sendPaymentConfirmation(sale.customer_email, {
              name: sale.customer_name,
              plan: sale.product_name, // Reutilizando a prop 'plan' para nome do produto
              amount: Number(sale.amount),
              paymentId: String(paymentId),
              method: sale.payment_method || "pix"
            });
          } else {
            console.log("ℹ️ Venda já estava aprovada.");
          }
        } else {
          // Isso acontece se o passo 2 do createPIX falhou ou se é um pagamento antigo
          console.warn(`⚠️ Venda não encontrada no banco para o ID ${paymentId}. Verifique se createSaleRecord foi chamado.`);
        }
      }
      // Opcional: Tratar 'rejected' ou 'refunded'
      else if (currentStatus === "rejected" || currentStatus === "cancelled") {
        await updateSaleStatus(String(paymentId), "rejected");
      }
    }
  } catch (error: any) {
    console.error("❌ Erro crítico no processamento do webhook:", error.message);
  }
};

/* -----------------------------------------------------
   CONSULTA DE STATUS
------------------------------------------------------ */
export const getPaymentStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const paymentInfo = await payment.get({ id });

    // Opcional: Sincronizar banco se o status diferir

    return res.json({
      id: paymentInfo.id,
      status: paymentInfo.status,
      status_detail: paymentInfo.status_detail
    });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar status" });
  }
};