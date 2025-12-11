import { Request, Response } from "express";
import { payment } from "../config/mp";
import { PaymentCreateRequest } from "mercadopago/dist/clients/payment/create/types";
import crypto from "crypto";
import { 
  getSubscriptionByPaymentId, 
  updateSubscriptionStatus, 
  createSubscriptionRecord 
} from "../services/supabase.service";
import { 
  sendPaymentConfirmation 
} from "../services/email.service";

/* -----------------------------------------------------
   VALIDAR ASSINATURA HMAC DO WEBHOOK
------------------------------------------------------ */
const validateWebhookSignature = (req: Request): boolean => {
  const secret = process.env.MP_WEBHOOK_SECRET;
  if (!secret) return false;

  const signatureHeader =
    req.headers["x-signature"] ||
    req.headers["x-hub-signature"] ||
    req.headers["x-mercadopago-signature"] ||
    req.headers["x-meli-signature"] ||
    req.headers["x-hub-signature-256"];

  if (!signatureHeader) return false;

  const provided = String(signatureHeader).replace(/^sha256=/i, "").trim();
  const rawBody = Buffer.isBuffer((req as any).body)
    ? (req as any).body
    : Buffer.from(JSON.stringify(req.body));

  const calcBase64 = crypto.createHmac("sha256", secret).update(rawBody).digest("base64");
  const calcHex = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");

  const safeCompare = (a: string, b: string) => {
    try {
      const bufA = Buffer.from(a);
      const bufB = Buffer.from(b);
      return bufA.length === bufB.length && crypto.timingSafeEqual(bufA, bufB);
    } catch {
      return false;
    }
  };

  if (provided === calcBase64 || provided === calcHex) return true;
  if (safeCompare(provided, calcBase64) || safeCompare(provided, calcHex)) return true;

  console.warn("[WEBHOOK] Assinatura inválida");
  return false;
};

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

    if (!transaction_amount || !token || !payer?.email)
      return res.status(400).json({ error: "transaction_amount, token e payer.email são obrigatórios" });

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

    console.log("[PAYMENT CARD] Resultado:", { id: result.id, status: result.status });

    if (result.status === "approved") {
      // Criar registro no Supabase
      try {
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

        await sendPaymentConfirmation(customerEmail, {
          name: name || "Cliente",
          plan: plan_name || "SealClub",
          amount: Number(transaction_amount),
          paymentId: String(result.id),
          method: "card"
        });
      } catch (e: any) {
        console.warn("[SUPABASE] Falha ao criar registro:", e.message);
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
    return res.status(400).json({ error: "Erro no pagamento", details: error.message });
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

    if (!price || price <= 0)
      return res.status(400).json({ error: "Valor inválido" });

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
      requestOptions: { idempotencyKey: `pix-${Date.now()}-${email}-${price}` }
    });

    const qr = result.point_of_interaction?.transaction_data;
    if (!qr?.qr_code) throw new Error("QR Code não gerado pelo Mercado Pago");

    return res.json({
      id: result.id,
      status: result.status,
      qr_code: qr.qr_code,
      qr_code_base64: qr.qr_code_base64
    });

  } catch (error: any) {
    console.error("[ERROR PIX]", error.message);
    return res.status(500).json({ error: error.message });
  }
};

/* -----------------------------------------------------
   WEBHOOK (VALIDAÇÃO + ATUALIZAÇÃO)
------------------------------------------------------ */
export const webhook = async (req: Request, res: Response) => {
  try {
    if (!validateWebhookSignature(req)) return res.sendStatus(401);

    let payload: any = (req as any).body;
    if (Buffer.isBuffer(payload)) payload = JSON.parse(payload.toString());

    const { type, data } = payload;

    console.log("[WEBHOOK] Evento recebido:", type, data?.id);

    if (type === "payment") {
      const paymentId = data.id;

      const validated = await validatePaymentFromWebhook(paymentId);
      if (!validated.success) return res.sendStatus(200);

      const subscription = await getSubscriptionByPaymentId(paymentId);
      if (!subscription) return res.sendStatus(200);

      await updateSubscriptionStatus(paymentId, "active");

      await sendPaymentConfirmation(subscription.email, {
        name: subscription.name,
        plan: subscription.plano,
        amount: subscription.amount,
        paymentId,
        method: subscription.payment_method
      });

      console.log("[WEBHOOK] Processado com sucesso:", paymentId);
    }

    return res.sendStatus(200);

  } catch (error: any) {
    console.error("[WEBHOOK ERROR]", error.message);
    return res.sendStatus(500);
  }
};

/* -----------------------------------------------------
   VALIDAR PAGAMENTO NO MP
------------------------------------------------------ */
export const validatePaymentFromWebhook = async (paymentId: string) => {
  try {
    const data = await payment.get({ id: paymentId });

    return {
      success: data.status === "approved",
      status: data.status,
      amount: data.transaction_amount,
      email: data.payer?.email,
      id: data.id
    };
  } catch (e: any) {
    console.error("[VALIDATE] Erro:", e.message);
    return { success: false };
  }
};