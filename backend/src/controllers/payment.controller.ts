import { Request, Response } from "express";
import mercadopago from "../config/mp";

export const createPIX = async (req: Request, res: Response) => {
  try {
    const { title, price, email } = req.body;

    const preference = await mercadopago.preferences.create({
      items: [
        {
          title,
          quantity: 1,
          unit_price: price
        }
      ],
      payer: { email },
      back_urls: {
        success: `${process.env.BASE_URL}/success`,
        failure: `${process.env.BASE_URL}/failed`
      }
    });

    res.json({ id: preference.body.id, init_point: preference.body.init_point });

  } catch (error) {
    res.status(500).json({ error });
  }
};

export const createCardPayment = async (req: Request, res: Response) => {
  try {
    const { token, email, amount, installments } = req.body;

    const result = await mercadopago.payment.create({
      transaction_amount: Number(amount),
      token,
      installments,
      payment_method_id: "visa",
      payer: {
        email
      }
    });

    res.json(result.body);

  } catch (error) {
    res.status(500).json({ error });
  }
};

export const webhook = async (req: Request, res: Response) => {
  console.log("Webhook recebido:", req.body);
  res.sendStatus(200);
};