import { Request, Response } from "express";
import { preApproval } from "../config/mp";
import { SubscriptionData } from "../types/mercadopago.types";
import { createSubscriptionRecord, getSubscriptionByPaymentId, cancelSubscriptionRecord, listActiveSubscriptions } from "../services/supabase.service";
import { sendCancellationEmail } from "../services/email.service";

// Criar nova assinatura
export const createSubscription = async (req: Request, res: Response) => {
  try {
    const { 
      email, 
      plan_id,
      card_token_id,
      name,
      phone,
      cpf,
      plan_name,
      amount,
      payment_method
    } = req.body;

    // Validar campos obrigatórios
    if (!email || !plan_id || !card_token_id) {
      return res.status(400).json({ 
        error: "Dados obrigatórios ausentes",
        required: ["email", "plan_id", "card_token_id"]
      });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: "Email inválido" 
      });
    }

    console.log("[SUBSCRIPTION] Criando assinatura:", { 
      email, 
      plan_id,
      timestamp: new Date().toISOString()
    });

    // Estrutura da assinatura para o Mercado Pago
    const subscriptionData: any = {
      preapproval_plan_id: plan_id,
      reason: `Assinatura SealClub ${plan_name || ""}`,
      payer_email: email,
      card_token_id: card_token_id,
      payer: {
        email,
        identification: {
          type: "CPF",
          number: cpf || ""
        }
      },
      back_url: `${process.env.BASE_URL || "http://localhost:8080"}/subscription-success`,
      status: "authorized"
    };

    // Criar assinatura no Mercado Pago
    const response = await preApproval.create({ 
      body: subscriptionData 
    });

    // Criar registro no banco de dados Supabase
    const subscriptionRecord = await createSubscriptionRecord({
      name: name || "Cliente",
      email,
      telefone: phone || "",
      cpf: cpf || "",
      plano: plan_name || plan_id,
      payment_id: response.id,
      payment_method: payment_method || "card",
      amount: amount || 0
    });

    console.log("[SUBSCRIPTION] Sucesso:", { 
      id: response.id, 
      status: response.status,
      timestamp: new Date().toISOString()
    });

    res.status(201).json({
      success: true,
      subscription_id: response.id,
      status: response.status,
      payer_email: response.payer_email,
      init_point: response.init_point,
      db_id: subscriptionRecord?.id,
      message: "Assinatura criada com sucesso!"
    });
  } catch (error: any) {
    console.error("[SUBSCRIPTION ERROR]", {
      message: error.message,
      stack: error.stack,
      body: error?.cause || error?.response || null,
      timestamp: new Date().toISOString()
    });
    res.status(500).json({ 
      error: "Erro ao criar assinatura no Mercado Pago",
      details: error.message,
      raw: error?.cause || error?.response || null
    });
  }
};

// Consultar assinatura por ID
export const getSubscription = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ 
        error: "ID da assinatura é obrigatório" 
      });
    }

    console.log("[SUBSCRIPTION] Buscando assinatura:", { id, timestamp: new Date().toISOString() });

    const response = await preApproval.get({ id });
    
    res.json({
      success: true,
      subscription: {
        id: response.id,
        status: response.status,
        payer_email: response.payer_email,
        plan_id: (response as any).preapproval_plan_id,
        reason: response.reason,
        init_date: response.init_point,
        auto_recurring: response.auto_recurring
      }
    });
  } catch (error: any) {
    console.error("[SUBSCRIPTION GET ERROR]", {
      message: error.message,
      subscriptionId: req.params.id,
      timestamp: new Date().toISOString()
    });
    res.status(500).json({ 
      error: "Erro ao buscar assinatura",
      details: error.message 
    });
  }
};

// Cancelar assinatura
export const cancelSubscription = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ 
        error: "ID da assinatura é obrigatório" 
      });
    }

    console.log("[SUBSCRIPTION] Cancelando assinatura:", { id, timestamp: new Date().toISOString() });

    // Atualizar status para cancelado no Mercado Pago
    const response = await preApproval.update({
      id,
      body: { status: "cancelled" }
    });

    // Atualizar status no banco de dados
    const subscription = await cancelSubscriptionRecord(id);

    // Enviar email de cancelamento
    if (subscription?.email) {
      await sendCancellationEmail(subscription.email, {
        name: subscription.name,
        plan: subscription.plano
      });
    }

    console.log("[SUBSCRIPTION] Cancelada com sucesso:", { 
      id: response.id, 
      status: response.status,
      timestamp: new Date().toISOString()
    });

    res.json({
      success: true,
      message: "Assinatura cancelada com sucesso",
      subscription_id: response.id,
      status: response.status
    });
  } catch (error: any) {
    console.error("[SUBSCRIPTION CANCEL ERROR]", {
      message: error.message,
      subscriptionId: req.params.id,
      timestamp: new Date().toISOString()
    });
    res.status(500).json({ 
      error: "Erro ao cancelar assinatura",
      details: error.message 
    });
  }
};

// Listar todas as assinaturas ativas
export const listSubscriptions = async (req: Request, res: Response) => {
  try {
    console.log("[SUBSCRIPTION] Listando assinaturas");
    
    const subscriptions = await listActiveSubscriptions();
    
    res.json({
      success: true,
      total: subscriptions.length,
      subscriptions
    });
  } catch (error: any) {
    console.error("[SUBSCRIPTION LIST ERROR]", {
      message: error.message,
      timestamp: new Date().toISOString()
    });
    res.status(500).json({ 
      error: "Erro ao listar assinaturas",
      details: error.message 
    });
  }
};

// Endpoint temporário para debug: retorna e loga o payload recebido
export const debugSubscription = async (req: Request, res: Response) => {
  try {
    console.log('[DEBUG SUBSCRIPTION] Headers:', req.headers);
    console.log('[DEBUG SUBSCRIPTION] Body:', req.body);
    return res.json({ success: true, received: req.body });
  } catch (error: any) {
    console.error('[DEBUG SUBSCRIPTION ERROR]', error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};
