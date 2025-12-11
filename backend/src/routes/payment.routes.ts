import { Router, raw } from "express";
import { createPIX, createCardPayment, webhook } from "../controllers/payment.controller";
import { createSubscription, getSubscription, cancelSubscription, listSubscriptions, debugSubscription } from "../controllers/subscription.controller";
import { createPlan } from "../controllers/plan.controller";

const router = Router();

// PAGAMENTOS ÚNICOS
router.post("/pix", createPIX);
router.post("/card", createCardPayment);

// ASSINATURAS
router.post("/subscription", createSubscription);
router.post("/debug/subscription", debugSubscription);
router.get("/subscription", listSubscriptions);
router.get("/subscription/:id", getSubscription);
router.delete("/subscription/:id", cancelSubscription);

// PLANOS
router.post("/plan", createPlan);

// WEBHOOK (Mercado Pago notifica mudanças de status)
// URL para registrar no Mercado Pago: https://seu-dominio.com/api/webhook
// Usar parser raw apenas para esta rota para validar assinatura HMAC
router.post("/webhook", raw({ type: "application/json" }), webhook);
router.get("/webhook/test", (req, res) => {
  res.json({ message: "Webhook endpoint está funcionando" });
});

export default router;