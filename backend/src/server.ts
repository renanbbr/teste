import express from "express";
import paymentRoutes from "./routes/payment.routes";
import cors from "cors";
import dotenv from "dotenv";
import { testConnection as testSupabase } from "./services/supabase.service";
import { testEmailConnection } from "./services/email.service";
import fs from "fs";

dotenv.config();

// Logging to file
const logFile = '/tmp/backend.log';
const originalConsoleLog = console.log;
const originalConsoleError = console.error;

console.log = (...args: any[]) => {
  const message = `[${new Date().toISOString()}] ${args.join(' ')}\n`;
  try {
    fs.appendFileSync(logFile, message);
  } catch (e) {}
  originalConsoleLog(...args);
};

console.error = (...args: any[]) => {
  const message = `[${new Date().toISOString()}] ERROR: ${args.join(' ')}\n`;
  try {
    fs.appendFileSync(logFile, message);
  } catch (e) {}
  originalConsoleError(...args);
};

console.log("MP_ACCESS_TOKEN loaded:", process.env.MP_ACCESS_TOKEN ? "YES" : "NO");

const app = express();

// Configurar CORS com whitelist
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "http://localhost:8080").split(",");
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api", paymentRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("[ERROR]", err.message, err.stack);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === "production" 
      ? "Erro interno do servidor" 
      : err.message
  });
});

const PORT = parseInt(process.env.PORT || "3001", 10);
const HOST = process.env.HOST || "localhost";

app.listen(PORT, HOST, async () => {
  console.log(`[SERVER] Backend rodando em http://${HOST}:${PORT}`);
  console.log(`[ENV] NODE_ENV=${process.env.NODE_ENV || "development"}`);
  
  // Testar conexões no startup
  console.log("\n[STARTUP] Verificando dependências...");
  
  const supabaseOk = await testSupabase();
  const emailOk = await testEmailConnection();
  
  if (supabaseOk && emailOk) {
    console.log("[STARTUP] ✅ Todas as dependências funcionando!\n");
  } else {
    console.warn("[STARTUP] ⚠️  Algumas dependências podem não estar configuradas corretamente\n");
  }
});