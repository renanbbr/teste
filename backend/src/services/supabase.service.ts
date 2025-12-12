import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_KEY = process.env.SUPABASE_KEY || "";

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("[SUPABASE] ❌ Credenciais ausentes! Defina SUPABASE_URL e SUPABASE_KEY no .env");
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Interface para Venda Única (não tem renovação)
export interface Sale {
  id: string;
  created_at: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_cpf: string;
  product_name: string; // Nome do produto comprado
  amount: number;
  payment_id: string;   // ID do Mercado Pago
  payment_method: "card" | "pix";
  status: "pending" | "approved" | "rejected" | "refunded";
}

/**
 * Cria o registro da venda (Geralmente com status 'pending' aguardando pagamento)
 */
export const createSaleRecord = async (data: {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  productName: string;
  amount: number;
  paymentId: string;
  paymentMethod: "card" | "pix";
}) => {
  try {
    const { data: sale, error } = await supabase
      .from("vendas") // Tabela alterada para 'vendas'
      .insert([
        {
          customer_name: data.name,
          customer_email: data.email,
          customer_phone: data.phone,
          customer_cpf: data.cpf,
          product_name: data.productName,
          amount: data.amount,
          payment_id: data.paymentId,
          payment_method: data.paymentMethod,
          status: "pending", // Começa como pendente até o Webhook confirmar
        },
      ])
      .select();

    if (error) {
      throw new Error(`Erro ao criar venda: ${error.message}`);
    }

    console.log("[DB] ✅ Venda registrada (Pendente):", sale?.[0]?.id);
    return sale?.[0] as Sale;
  } catch (error: any) {
    console.error("[DB ERROR]", error.message);
    throw error;
  }
};

/**
 * Atualiza o status da venda (Chamado pelo Webhook quando o pagamento cai)
 */
export const updateSaleStatus = async (
  paymentId: string,
  status: "approved" | "rejected" | "refunded" | "pending"
) => {
  try {
    const { data, error } = await supabase
      .from("vendas")
      .update({ status })
      .eq("payment_id", paymentId)
      .select();

    if (error) {
      throw new Error(`Erro ao atualizar venda: ${error.message}`);
    }

    if (data && data.length > 0) {
      console.log("[DB] 🔄 Status da venda atualizado:", data[0].id, "→", status);
      return data[0] as Sale;
    }

    console.warn("[DB] ⚠️ Nenhuma venda encontrada para atualizar com ID:", paymentId);
    return null;
  } catch (error: any) {
    console.error("[DB ERROR]", error.message);
    throw error;
  }
};

/**
 * Busca venda pelo ID do Pagamento (Útil para o Webhook)
 */
export const getSaleByPaymentId = async (paymentId: string) => {
  try {
    const { data, error } = await supabase
      .from("vendas")
      .select()
      .eq("payment_id", paymentId)
      .single();

    if (error) {
      return null;
    }

    return data as Sale;
  } catch (error: any) {
    console.error("[DB ERROR]", error.message);
    return null;
  }
};

/**
 * Teste de conexão
 */
export const testConnection = async () => {
  try {
    // Tenta buscar 1 registro qualquer só para ver se conecta
    const { error } = await supabase.from("vendas").select("id").limit(1);
    if (error) {
      console.error("[SUPABASE] ❌ Erro de conexão (verifique se a tabela 'vendas' existe):", error.message);
      return false;
    }
    console.log("[SUPABASE] ✅ Conexão OK!");
    return true;
  } catch (error: any) {
    console.error("[SUPABASE] ❌ Erro crítico:", error.message);
    return false;
  }
};