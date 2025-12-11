import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_KEY = process.env.SUPABASE_KEY || "";

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("[SUPABASE] ❌ Credenciais ausentes! Defina SUPABASE_URL e SUPABASE_KEY no .env");
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Tipo para assinatura no banco
export interface Subscription {
  id: string;
  created_at: string;
  name: string;
  telefone: string;
  cpf: string;
  email: string;
  plano: string;
  status: "pending" | "active" | "cancelled" | "expired";
  payment_id?: string;
  payment_method?: "card" | "pix";
  amount?: number;
  renewal_date?: string;
  cancelled_at?: string;
}

/**
 * Criar uma nova assinatura no banco de dados
 */
export const createSubscriptionRecord = async (data: {
  name: string;
  email: string;
  telefone: string;
  cpf: string;
  plano: string;
  payment_id: string;
  payment_method: "card" | "pix";
  amount: number;
}) => {
  try {
    const { data: subscription, error } = await supabase
      .from("assinaturas")
      .insert([
        {
          name: data.name,
          email: data.email,
          telefone: data.telefone,
          cpf: data.cpf,
          plano: data.plano,
          status: "approved", // Pagamento aprovado
          payment_id: data.payment_id,
          payment_method: data.payment_method,
          amount: data.amount
        },
      ])
      .select();

    if (error) {
      throw new Error(`Erro ao criar assinatura: ${error.message}`);
    }

    console.log("[DB] ✅ Assinatura criada:", subscription?.[0]?.id);
    return subscription?.[0] as Subscription;
  } catch (error: any) {
    console.error("[DB ERROR]", error.message);
    throw error;
  }
};

/**
 * Atualizar status de uma assinatura (ex: quando webhook confirma pagamento)
 */
export const updateSubscriptionStatus = async (
  paymentId: string,
  status: "active" | "cancelled" | "expired"
) => {
  try {
    const { data, error } = await supabase
      .from("assinaturas")
      .update({ status })
      .eq("payment_id", paymentId)
      .select();

    if (error) {
      throw new Error(`Erro ao atualizar assinatura: ${error.message}`);
    }

    console.log("[DB] ✅ Assinatura atualizada:", data?.[0]?.id, "→", status);
    return data?.[0] as Subscription;
  } catch (error: any) {
    console.error("[DB ERROR]", error.message);
    throw error;
  }
};

/**
 * Buscar assinatura por email
 */
export const getSubscriptionByEmail = async (email: string) => {
  try {
    const { data, error } = await supabase
      .from("assinaturas")
      .select()
      .eq("email", email)
      .order("created_at", { ascending: false })
      .limit(1);

    if (error) {
      throw new Error(`Erro ao buscar assinatura: ${error.message}`);
    }

    return data?.[0] as Subscription | null;
  } catch (error: any) {
    console.error("[DB ERROR]", error.message);
    return null;
  }
};

/**
 * Buscar assinatura por payment_id (útil para webhook)
 */
export const getSubscriptionByPaymentId = async (paymentId: string) => {
  try {
    const { data, error } = await supabase
      .from("assinaturas")
      .select()
      .eq("payment_id", paymentId)
      .single();

    if (error) {
      console.warn("[DB] Assinatura não encontrada para payment_id:", paymentId);
      return null;
    }

    return data as Subscription;
  } catch (error: any) {
    console.error("[DB ERROR]", error.message);
    return null;
  }
};

/**
 * Listar todas as assinaturas ativas
 */
export const listActiveSubscriptions = async () => {
  try {
    const { data, error } = await supabase
      .from("assinaturas")
      .select()
      .eq("status", "active")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(`Erro ao listar assinaturas: ${error.message}`);
    }

    return data as Subscription[];
  } catch (error: any) {
    console.error("[DB ERROR]", error.message);
    return [];
  }
};

/**
 * Cancelar uma assinatura
 */
export const cancelSubscriptionRecord = async (paymentId: string) => {
  try {
    const { data, error } = await supabase
      .from("assinaturas")
      .update({
        status: "cancelled",
        cancelled_at: new Date().toISOString(),
      })
      .eq("payment_id", paymentId)
      .select();

    if (error) {
      throw new Error(`Erro ao cancelar assinatura: ${error.message}`);
    }

    console.log("[DB] ✅ Assinatura cancelada:", data?.[0]?.id);
    return data?.[0] as Subscription;
  } catch (error: any) {
    console.error("[DB ERROR]", error.message);
    throw error;
  }
};

/**
 * Teste de conexão com Supabase
 */
export const testConnection = async () => {
  try {
    const { data, error } = await supabase.from("assinaturas").select("id").limit(1);

    if (error) {
      console.error("[SUPABASE] ❌ Erro de conexão:", error.message);
      return false;
    }

    console.log("[SUPABASE] ✅ Conexão estabelecida com sucesso!");
    return true;
  } catch (error: any) {
    console.error("[SUPABASE] ❌ Erro:", error.message);
    return false;
  }
};
