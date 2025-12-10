import { Request, Response } from "express";
import { preApprovalPlan } from "../config/mp";
import { PlanData } from "../types/mercadopago.types";

// Definição dos planos do SealClub
const SEALCLUB_PLANS = {
  PRO: {
    name: "SealClub PRO",
    price: 29,
    description: "Plano PRO - 1 produto por ano"
  },
  TECH: {
    name: "SealClub TECH",
    price: 49,
    description: "Plano TECH - 2 produtos por ano"
  },
  ULTRA: {
    name: "SealClub ULTRA",
    price: 79,
    description: "Plano ULTRA - 3 produtos por ano"
  }
};

// Criar um novo plano no Mercado Pago
export const createPlan = async (req: Request, res: Response) => {
  try {
    const { planType } = req.body; // "PRO", "TECH" ou "ULTRA"

    // Validar tipo de plano
    if (!SEALCLUB_PLANS[planType as keyof typeof SEALCLUB_PLANS]) {
      return res.status(400).json({ error: "Tipo de plano inválido. Use: PRO, TECH ou ULTRA" });
    }

    const plan = SEALCLUB_PLANS[planType as keyof typeof SEALCLUB_PLANS];

    // Estrutura do plano para o Mercado Pago
    const planData: PlanData = {
      reason: plan.description,
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: plan.price,
        currency_id: "BRL"
      },
      back_url: `${process.env.BASE_URL}/subscription-success`
    };

    // Criar plano no Mercado Pago
    const response = await preApprovalPlan.create({ body: planData });
    
    res.json({
      success: true,
      plan_id: response.id,
      plan_name: plan.name,
      plan_price: plan.price,
      init_point: response.init_point
    });
  } catch (error: any) {
    console.error("Erro ao criar plano:", error);
    res.status(500).json({ 
      error: "Erro ao criar plano no Mercado Pago",
      details: error.message 
    });
  }
};

// Listar todos os planos criados
export const listPlans = async (req: Request, res: Response) => {
  try {
    const response = await preApprovalPlan.search();
    res.json({
      success: true,
      plans: response
    });
  } catch (error: any) {
    console.error("Erro ao listar planos:", error);
    res.status(500).json({ 
      error: "Erro ao listar planos",
      details: error.message 
    });
  }
};

// Buscar plano específico por ID
export const getPlan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await preApprovalPlan.get({ id });
    res.json({
      success: true,
      plan: response
    });
  } catch (error: any) {
    console.error("Erro ao buscar plano:", error);
    res.status(500).json({ 
      error: "Erro ao buscar plano",
      details: error.message 
    });
  }
};