import express, { Request, Response, NextFunction } from "express";
import paymentRoutes from "./routes/payment.routes";
import cors from "cors";
import dotenv from "dotenv";
import { testConnection as testSupabase } from "./services/supabase.service";
import { testEmailConnection } from "./services/email.service";
import { webhook } from "./controllers/payment.controller";

dotenv.config();

const app = express();
// No Railway, a porta é definida automaticamente pela variável PORT
const PORT = parseInt(process.env.PORT || "3001", 10);
const HOST = "0.0.0.0"; // Importante para deploy

// Configuração de CORS
// Adicionei "*" nas origens permitidas temporariamente para garantir que o front conecte sem erros
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

// [IMPORTANTE] Rota Raiz para o Railway não dar erro 404 no Health Check
// Isso evita o erro SIGTERM por falha de verificação
app.get("/", (req, res) => {
  res.send("Backend SealClub está Online! 🚀");
});

// Healthcheck
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

  // 1. Testamos apenas o Banco de Dados (Supabase)
  const dbOk = await testSupabase();

  /* 2. REMOVIDO TEMPORARIAMENTE: Teste de Email
     O Gmail bloqueia conexões vindas de nuvem (Railway) e isso estava causando o erro
     "Connection timeout" e travando o deploy.
  */
  // const emailOk = await testEmailConnection();

  if (dbOk) {
    console.log("[STARTUP] ✅ Banco de dados pronto. Servidor online!\n");
  } else {
    console.warn("[STARTUP] ⚠️  Falha ao conectar no Banco de Dados. Verifique logs.\n");
  }
});