import { Router } from "express";
import { createPIX, createCardPayment, webhook } from "../controllers/payment.controller";
import { createSubscription } from "../controllers/subscription.controller";

const router = Router();

router.post("/pix", createPIX);
router.post("/card", createCardPayment);
router.post("/subscription", createSubscription);
router.post("/webhook", webhook);

export default router;