import { Request, Response } from "express";
import { payment } from "../config/mp"; 
import { PaymentCreateRequest } from "mercadopago/dist/clients/payment/create/types";
import crypto from "crypto";
import { getSubscriptionByPaymentId, updateSubscriptionStatus, createSubscriptionRecord } from "../services/supabase.service";
import { sendPaymentConfirmation, sendCancellationEmail } from "../services/email.service";

// Validar assinatura de webhook do Mercado Pago (HMAC-SHA256)
const validateWebhookSignature = (req: Request): boolean => {
  const secret = process.env.MP_WEBHOOK_SECRET;
  if (!secret) {
    console.warn("[WEBHOOK] MP_WEBHOOK_SECRET não configurado");
    return false;
  }

  // Aceitar vários nomes de header comuns
  const headerNames = [
    "x-signature",
    "x-hub-signature",
    "x-mercadopago-signature",
    "x-meli-signature",
    "x-hub-signature-256"
  ];

  let signatureHeader: string | undefined;
  for (const h of headerNames) {
    const v = req.headers[h];
    if (v) {
      signatureHeader = Array.isArray(v) ? v[0] : String(v);
      break;
    }
  }

  if (!signatureHeader) {
    console.warn("[WEBHOOK] Header de assinatura não encontrado");
    return false;
  }

  // Remover prefixes como "sha256=" se existirem
  const providedSig = signatureHeader.replace(/^sha256=/i, "").trim();

  // Obter corpo bruto (quando usado express.raw middleware, req.body é Buffer)
  const rawBody = Buffer.isBuffer((req as any).body) ? (req as any).body as Buffer : Buffer.from(JSON.stringify(req.body));

  const calcBase64 = crypto.createHmac("sha256", secret).update(rawBody).digest("base64");
  const calcHex = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");

  // Comparações seguras
  try {
    // direto com base64 ou hex
    if (providedSig === calcBase64 || providedSig === calcHex) return true;

    // também tentar comparar como buffers (timingSafeEqual)
    const providedBufBase64 = Buffer.from(providedSig, "base64");
    const calcBufBase64 = Buffer.from(calcBase64, "base64");
    if (providedBufBase64.length === calcBufBase64.length && crypto.timingSafeEqual(providedBufBase64, calcBufBase64)) return true;
  } catch (e) {
    // ignore parse errors
  }

  try {
    const providedBufHex = Buffer.from(providedSig, "hex");
    const calcBufHex = Buffer.from(calcHex, "hex");
    if (providedBufHex.length === calcBufHex.length && crypto.timingSafeEqual(providedBufHex, calcBufHex)) return true;
  } catch (e) {
    // ignore
  }

  console.warn("[WEBHOOK] Assinatura inválida", { providedSig, calcBase64, calcHex });
  return false;
};

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
      // Dados da assinatura/cliente (novos)
      name,
      plan_name,
      email
    } = req.body;

    // Validação de campos obrigatórios
    if (!transaction_amount || !token || !payer?.email) {
      return res.status(400).json({ 
        error: "Campos obrigatórios faltando: transaction_amount, token, payer.email" 
      });
    }

    const customerEmail = email || payer?.email;

    console.log("[PAYMENT] Iniciando pagamento por Cartão:", { 
      amount: transaction_amount, 
      email: customerEmail,
      timestamp: new Date().toISOString()
    });

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

    const requestOptions = { idempotencyKey: `card-${Date.now()}-${token.substring(0, 10)}` };
    const result = await payment.create({ body: paymentData, requestOptions });

    console.log("[PAYMENT] Sucesso:", { 
      id: result.id, 
      status: result.status,
      timestamp: new Date().toISOString()
    });

    // ✨ NOVO: Criar registro de subscription no banco se pagamento foi aprovado
    if ((result as any).status === "approved") {
      try {
        const subscriptionRecord = await createSubscriptionRecord({
          name: name || payer.identification?.type || "Cliente",
          email: customerEmail,
          telefone: "", // Frontend não envia telefone aqui, apenas no Checkout
          cpf: payer.identification?.number || "",
          plano: plan_name || "SealClub",
          payment_id: String((result as any).id),
          payment_method: "card",
          amount: Number(transaction_amount)
        });

        console.log("[PAYMENT] Registro criado no Supabase:", subscriptionRecord);

        // Enviar email de confirmação
        await sendPaymentConfirmation(customerEmail, {
          name: name || "Cliente",
          plan: plan_name || "SealClub",
          amount: Number(transaction_amount),
          paymentId: String((result as any).id),
          method: "card"
        });
      } catch (dbError: any) {
        console.warn("[PAYMENT] Aviso ao salvar no Supabase:", dbError.message);
        // Não falha o pagamento se BD falhar, mas log aviso
      }
    }

    return res.status(201).json({
        id: result.id,
        status: result.status,
        status_detail: result.status_detail,
        amount: result.transaction_amount
    });

  } catch (error: any) {
    console.error("[PAYMENT ERROR]", {
      message: error.message,
      cause: error.cause,
      timestamp: new Date().toISOString()
    });
    const errorMessage = error.cause?.[0]?.description || error.message || "Erro desconhecido";
    return res.status(400).json({ 
      error: "Erro no pagamento", 
      details: errorMessage 
    });
  }
};

export const createPIX = async (req: Request, res: Response) => {
  try {
    const { title, price, email, identification } = req.body;

    // Validações
    if (!email || !identification?.number) {
        return res.status(400).json({ 
          error: "Email e CPF são obrigatórios para PIX" 
        });
    }

    if (!price || price <= 0) {
      return res.status(400).json({ 
        error: "Valor inválido" 
      });
    }

    console.log("[PIX] Iniciando PIX:", { 
      amount: price, 
      email,
      timestamp: new Date().toISOString()
    });

    const idempotencyKey = `pix-${Date.now()}-${email}-${price}`;
    
    const result = await payment.create({
        body: {
            transaction_amount: Number(price),
            description: title || "Pagamento SealClub",
            payment_method_id: 'pix',
            payer: {
                email,
                identification: {
                    type: "CPF",
                    number: identification.number
                }
            }
        },
        requestOptions: { idempotencyKey }
    });

    if (!result.point_of_interaction?.transaction_data?.qr_code) {
        throw new Error("QR Code não gerado pelo Mercado Pago");
    }

    console.log("[PIX] Sucesso:", { 
      id: result.id, 
      status: result.status,
      timestamp: new Date().toISOString()
    });

    return res.json({
        id: result.id,
        status: result.status,
        qr_code: result.point_of_interaction.transaction_data.qr_code,
        qr_code_base64: result.point_of_interaction.transaction_data.qr_code_base64
    });

  } catch (error: any) {
    console.error("[PIX ERROR]", {
      message: error.message,
      cause: error.cause,
      timestamp: new Date().toISOString()
    });
    const errorMessage = error.cause?.[0]?.description || error.message || "Erro ao gerar PIX";
    return res.status(500).json({ error: errorMessage });
  }
};

export const webhook = async (req: Request, res: Response) => {
  try {
    // Validação da assinatura HMAC
    if (!validateWebhookSignature(req)) {
      console.warn("[WEBHOOK] Assinatura inválida ou MP_WEBHOOK_SECRET não configurado");
      return res.sendStatus(401);
    }

    // Ao usar express.raw para esta rota, req.body pode ser Buffer
    let payload: any = (req as any).body;
    if (Buffer.isBuffer(payload)) {
      try {
        payload = JSON.parse(payload.toString());
      } catch (e) {
        console.error("[WEBHOOK] Falha ao parsear payload bruto:", e);
        return res.sendStatus(400);
      }
    }

    const { type, data } = payload;

    console.log("[WEBHOOK] Recebido:", { type, paymentId: data?.id, timestamp: new Date().toISOString() });

    if (type === "payment") {
      const paymentId = data.id;

      // 1. Buscar pagamento no Mercado Pago
      const paymentData = await validatePaymentFromWebhook(paymentId);

      if (!paymentData.success) {
        console.error("[WEBHOOK] Pagamento não validado:", paymentId);
        return res.sendStatus(200); // Responder OK mesmo se falhar (MP fará retry)
      }

      // 2. Buscar assinatura correspondente no BD
      const subscription = await getSubscriptionByPaymentId(paymentId);

      if (!subscription) {
        console.warn("[WEBHOOK] Assinatura não encontrada para payment_id:", paymentId);
        return res.sendStatus(200);
      }

      // 3. Atualizar status para "active"
      const updated = await updateSubscriptionStatus(paymentId, "active");

      // 4. Enviar email de confirmação
      if (updated) {
        await sendPaymentConfirmation(subscription.email, {
          name: subscription.name,
          plan: subscription.plano,
          amount: subscription.amount || 0,
          paymentId: paymentId,
          method: (subscription.payment_method as any) || "card"
        });
      }

      console.log("[WEBHOOK] ✅ Processado com sucesso:", paymentId);
    }

    // Responder rapidamente ao Mercado Pago (máx 20 segundos)
    res.sendStatus(200);

  } catch (error: any) {
    console.error("[WEBHOOK ERROR]", error.message);
    res.sendStatus(500);
  }
};

// Função auxiliar para validar pagamento (usar no webhook)
export const validatePaymentFromWebhook = async (paymentId: string) => {
  try {
    const paymentData = await payment.get({ id: paymentId });
    return {
      success: paymentData.status === "approved",
      status: paymentData.status,
      amount: paymentData.transaction_amount,
      email: paymentData.payer?.email,
      id: paymentData.id
    };
  } catch (error: any) {
    console.error("[VALIDATE] Erro ao validar pagamento:", error.message);
    return { success: false, error: error.message };
  }
};