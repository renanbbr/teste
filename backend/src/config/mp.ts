import { MercadoPagoConfig, Payment, Preference, PreApproval, PreApprovalPlan } from "mercadopago";
import dotenv from "dotenv";

dotenv.config();

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN as string,
  options: { timeout: 5000 }
});

// Exporta as instâncias já configuradas
export const payment = new Payment(client);
export const preference = new Preference(client); // Necessário para PIX ou Checkout Pro
export const preApproval = new PreApproval(client); // Para assinaturas
export const preApprovalPlan = new PreApprovalPlan(client); // Para planos

export default client;