import { Request, Response } from "express";
import { payment } from "../config/mp"; 
import { PaymentCreateRequest } from "mercadopago/dist/clients/payment/create/types";

export const createCardPayment = async (req: Request, res: Response) => {
  try {
    const { 
      transaction_amount, 
      token, 
      description, 
      installments, 
      payment_method_id, 
      payer, 
      issuer_id 
    } = req.body;

    console.log("💳 Iniciando pagamento Cartão:", { transaction_amount, email: payer?.email });

    const paymentData: PaymentCreateRequest = {
      transaction_amount: Number(transaction_amount),
      token,
      description: description || "Compra SealClub",
      installments: Number(installments),
      payment_method_id,
      issuer_id,
      payer: {
        email: payer.email,
        identification: {
          type: payer.identification.type || "CPF",
          number: payer.identification.number 
        }
      }
    };

    const requestOptions = { idempotencyKey: token };
    const result = await payment.create({ body: paymentData, requestOptions });

    return res.status(201).json({
        id: result.id,
        status: result.status,
        status_detail: result.status_detail,
        amount: result.transaction_amount
    });

  } catch (error: any) {
    console.error("❌ Erro Cartão:", JSON.stringify(error, null, 2));
    const errorMessage = error.cause?.[0]?.description || error.message || "Erro desconhecido";
    return res.status(400).json({ error: "Erro no pagamento", details: errorMessage });
  }
};

export const createPIX = async (req: Request, res: Response) => {
  try {
    const { title, price, email, identification } = req.body;

    console.log("💠 Iniciando PIX:", { price, email, cpf: identification?.number });

    if (!email || !identification?.number) {
        return res.status(400).json({ error: "Email e CPF são obrigatórios para PIX" });
    }

    const result = await payment.create({
        body: {
            transaction_amount: Number(price),
            description: title,
            payment_method_id: 'pix',
            payer: {
                email,
                identification: {
                    type: "CPF",
                    number: identification.number
                }
            }
        }
    });

    if (!result.point_of_interaction) {
        throw new Error("QR Code não gerado pelo Mercado Pago");
    }

    return res.json({
        id: result.id,
        status: result.status,
        qr_code: result.point_of_interaction.transaction_data?.qr_code,
        qr_code_base64: result.point_of_interaction.transaction_data?.qr_code_base64
    });

  } catch (error: any) {
    console.error("❌ Erro PIX:", JSON.stringify(error, null, 2));
    const errorMessage = error.cause?.[0]?.description || error.message || "Erro ao gerar PIX";
    return res.status(500).json({ error: errorMessage });
  }
};

export const webhook = async (req: Request, res: Response) => {
  const { type, data } = req.body;
  if (type === "payment") {
      console.log("🔔 Webhook Recebido:", data.id);
  }
  res.sendStatus(200);
};