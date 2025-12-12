import { Request, Response } from "express";
import { payment } from "../config/mp";
import { PaymentCreateRequest } from "mercadopago/dist/clients/payment/create/types";

// Importações dos seus serviços
import {
  getSubscriptionByPaymentId,
  updateSubscriptionStatus,
  createSubscriptionRecord
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
      payer,
      issuer_id,
      name,
      plan_name,
      email
    } = req.body;

    // Validação básica
    if (!transaction_amount || !token || !payer?.email)
      return res.status(400).json({ error: "Dados obrigatórios faltando" });

    const customerEmail = email || payer.email;

    const paymentData: PaymentCreateRequest = {
      transaction_amount: Number(transaction_amount),
      token,
      description: description || "Compra SealClub",
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

    const result = await payment.create({
      body: paymentData,
      requestOptions: { idempotencyKey: `card-${Date.now()}-${token.slice(0, 10)}` }
    });

    console.log("[PAYMENT CARD] Sucesso:", result.id);

    if (result.status === "approved") {
      try {
        // Tenta salvar no Supabase
        await createSubscriptionRecord({
          name: name || "Cliente",
          email: customerEmail,
          telefone: "",
          cpf: payer.identification?.number || "",
          plano: plan_name || "SealClub",
          payment_id: String(result.id),
          payment_method: "card",
          amount: Number(transaction_amount)
        });

        // Tenta enviar email
        await sendPaymentConfirmation(customerEmail, {
          name: name || "Cliente",
          plan: plan_name || "SealClub",
          amount: Number(transaction_amount),
          paymentId: String(result.id),
          method: "card"
        });
      } catch (e: any) {
        console.warn("[SUPABASE/EMAIL] Erro pós-venda:", e.message);
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
    const { title, price, email, identification } = req.body;

    if (!email || !identification?.number)
      return res.status(400).json({ error: "Email e CPF são obrigatórios" });

    const result = await payment.create({
      body: {
        transaction_amount: Number(price),
        description: title || "Pagamento SealClub",
        payment_method_id: "pix",
        payer: {
          email,
          identification: { type: "CPF", number: identification.number }
        }
      },
      requestOptions: { idempotencyKey: `pix-${Date.now()}-${email}` }
    });

    const qr = result.point_of_interaction?.transaction_data;

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
   WEBHOOK (SEM VALIDAÇÃO DE ASSINATURA)
------------------------------------------------------ */
export const webhook = async (req: Request, res: Response) => {
  // 1. Responde OK imediatamente para o MP não ficar tentando de novo
  res.sendStatus(200);

  try {
    const { type, data } = req.body;
    console.log(`🔔 Webhook recebido: ${type} - ID: ${data?.id}`);

    // Filtra apenas eventos de pagamento
    if (type === "payment" || type === "payment.created") {
      const paymentId = data.id;

      // 2. Consulta o pagamento REAL no Mercado Pago (Segurança via API)
      const paymentInfo = await payment.get({ id: paymentId });

      console.log(`💰 Status atual: ${paymentInfo.status}`);

      if (paymentInfo.status === "approved") {
        try {
          // Tenta atualizar no Supabase
          const subscription = await getSubscriptionByPaymentId(String(paymentId));

          if (subscription) {
            await updateSubscriptionStatus(String(paymentId), "active");
            console.log("✅ Assinatura ativada!");

            // Envia e-mail de confirmação
            await sendPaymentConfirmation(subscription.email, {
              name: subscription.name,
              plan: subscription.plano,
              amount: subscription.amount,
              paymentId: String(paymentId),
              method: subscription.payment_method
            });
          } else {
            console.warn("⚠️ Pagamento aprovado, mas não encontrado no banco local.");
          }
        } catch (dbError) {
          console.error("Erro ao processar webhook:", dbError);
        }
      }
    }
  } catch (error: any) {
    console.error("Erro crítico no webhook:", error.message);
  }
};

/* -----------------------------------------------------
   CONSULTA DE STATUS (POLLING DO FRONTEND)
------------------------------------------------------ */
export const getPaymentStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const paymentInfo = await payment.get({ id });
    return res.json({
      id: paymentInfo.id,
      status: paymentInfo.status,
      status_detail: paymentInfo.status_detail
    });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar status" });
  }
};