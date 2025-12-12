import { Router } from "express";
import {
  createPIX,
  createCardPayment,
  getPaymentStatus,
  webhook
} from "../controllers/payment.controller";

const router = Router();

// --- PAGAMENTOS ÚNICOS ---

// Criar Pix
router.post("/pix", createPIX);

// Criar Pagamento Cartão
router.post("/card", createCardPayment);

// Consultar Status (Polling)
router.get("/payment/:id", getPaymentStatus);


// --- WEBHOOK ---
// O Mercado Pago envia notificações para cá.
// Nota: Removi o raw() porque já configuramos express.json() no server.ts 
// e o seu controller espera receber um objeto JSON, não um Buffer.
router.post("/webhook", webhook);

// Rota de teste simples para ver se o endpoint responde
router.get("/webhook/test", (req, res) => {
  res.json({ message: "Webhook endpoint está funcionando" });
});

export default router;