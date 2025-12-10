import { MercadoPagoConfig, PreApprovalPlan, PreApproval, Payment } from "mercadopago";
import dotenv from "dotenv";

dotenv.config();

// Configuração do cliente Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN as string,
  options: {
    timeout: 5000,
    idempotencyKey: 'your-idempotency-key', // Opcional: para evitar duplicatas
  }
});

// Instâncias para trabalhar com diferentes recursos do MP
export const preApprovalPlan = new PreApprovalPlan(client);
export const preApproval = new PreApproval(client);
export const payment = new Payment(client);

export default client;