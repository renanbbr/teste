import express, { Request, Response, NextFunction } from "express";
import paymentRoutes from "./routes/payment.routes";
import cors from "cors";
import dotenv from "dotenv";
import { testConnection as testSupabase } from "./services/supabase.service";
import { testEmailConnection } from "./services/email.service";
import { webhook } from "./controllers/payment.controller";

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || "3001", 10);
const HOST = process.env.HOST || "0.0.0.0"; // Importante para deploy

// Configuração de CORS
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "http://localhost:8080").split(",");
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Habilitar JSON para todas as rotas (incluindo Webhook)
app.use(express.json());

// --- Rotas ---

// Healthcheck (Para saber se o server está de pé)
app.get("/health", (req, res) => {
  res.json({ status: "ok", type: "one-time-payment", timestamp: new Date().toISOString() });
});

// Rota do Webhook (Mercado Pago envia notificações aqui)
app.post("/api/webhook", webhook);

// Rotas da API de Pagamento (Criar Pix, Cartão, etc)
app.use("/api", paymentRoutes);

// Middleware de Tratamento de Erro
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("[SERVER ERROR]", err.message);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === "production" ? "Erro interno" : err.message,
  });
});

// Inicialização
app.listen(PORT, HOST, async () => {
  console.log(`\n[SERVER] 🚀 Backend rodando em http://${HOST}:${PORT}`);

  console.log("[STARTUP] Testando conexões...");
  const [dbOk, emailOk] = await Promise.all([
    testSupabase(),
    testEmailConnection()
  ]);

  if (dbOk && emailOk) {
    console.log("[STARTUP] ✅ Banco de dados e Email prontos.\n");
  } else {
    console.warn("[STARTUP] ⚠️  Algum serviço não conectou corretamente. Verifique logs acima.\n");
  }
});