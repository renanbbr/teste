#!/usr/bin/env ts-node
import dotenv from "dotenv";
import { testConnection as testSupabase } from "./services/supabase.service";
import { testEmailConnection } from "./services/email.service";

dotenv.config();

async function runTests() {
  console.log("\n🧪 Testando Integrações...\n");

  console.log("1️⃣  Testando Supabase...");
  const supabaseOk = await testSupabase();

  console.log("\n2️⃣  Testando Email...");
  const emailOk = await testEmailConnection();

  console.log("\n" + "=".repeat(50));
  if (supabaseOk && emailOk) {
    console.log("✅ Todas as integrações funcionando!");
  } else {
    console.log("⚠️  Algumas integrações com problemas. Verifique o .env");
  }
  console.log("=".repeat(50) + "\n");

  process.exit(supabaseOk && emailOk ? 0 : 1);
}

runTests();
