import { Request, Response } from "express";
import { preApproval } from "../config/mp";
import { SubscriptionData } from "../types/mercadopago.types";

// Criar nova assinatura
export const createSubscription = async (req: Request, res: Response) => {
  try {
    const { 
      email, 
      plan_id,
      card_token_id 
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

    // Estrutura da assinatura para o Mercado Pago
    const subscriptionData: SubscriptionData = {
      preapproval_plan_id: plan_id,
      reason: "Assinatura SealClub",
      payer_email: email,
      card_token_id: card_token_id,
      back_url: `${process.env.BASE_URL}/subscription-success`,
      status: "authorized"
    };

    // Criar assinatura no Mercado Pago
    const response = await preApproval.create({ 
      body: subscriptionData 
    });

    res.json({
      success: true,
      subscription_id: response.id,
      status: response.status,
      payer_email: response.payer_email,
      init_point: response.init_point,
      message: "Assinatura criada com sucesso!"
    });
  } catch (error: any) {
    console.error("Erro ao criar assinatura:", error);
    res.status(500).json({ 
      error: "Erro ao criar assinatura no Mercado Pago",
      details: error.message 
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

    const response = await preApproval.get({ id });
    
    res.json({
      success: true,
      subscription: {
        id: response.id,
        status: response.status,
        payer_email: response.payer_email,
        plan_id: response.preapproval_plan_id,
        reason: response.reason,
        init_date: response.init_point,
        auto_recurring: response.auto_recurring
      }
    });
  } catch (error: any) {
    console.error("Erro ao buscar assinatura:", error);
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

    // Atualizar status para cancelado
    const response = await preApproval.update({
      id,
      body: { status: "cancelled" }
    });

    res.json({
      success: true,
      message: "Assinatura cancelada com sucesso",
      subscription_id: response.id,
      status: response.status
    });
  } catch (error: any) {
    console.error("Erro ao cancelar assinatura:", error);
    res.status(500).json({ 
      error: "Erro ao cancelar assinatura",
      details: error.message 
    });
  }
};

// Listar todas as assinaturas (útil para admin)
export const listSubscriptions = async (req: Request, res: Response) => {
  try {
    const response = await preApproval.search();
    
    res.json({
      success: true,
      total: response.results?.length || 0,
      subscriptions: response.results
    });
  } catch (error: any) {
    console.error("Erro ao listar assinaturas:", error);
    res.status(500).json({ 
      error: "Erro ao listar assinaturas",
      details: error.message 
    });
  }
};
```

---

### 3️⃣ O que cada função faz?

#### 🔹 **createSubscription** - Cria assinatura do cliente
- **Recebe**: email, plan_id, card_token_id
- **Valida**: email formato correto, campos obrigatórios
- **Cria**: assinatura no MP
- **Retorna**: subscription_id, status

#### 🔹 **getSubscription** - Consulta assinatura
- **Recebe**: ID da assinatura
- **Retorna**: Todos os detalhes (status, email, plano)

#### 🔹 **cancelSubscription** - Cancela assinatura
- **Recebe**: ID da assinatura
- **Atualiza**: status para "cancelled"
- **Útil para**: quando cliente quer cancelar

#### 🔹 **listSubscriptions** - Lista todas (admin)
- **Retorna**: Todas as assinaturas criadas
- **Útil para**: painel administrativo

---

### 4️⃣ Fluxo completo de uma assinatura:
```
1. Frontend envia: email + plan_id + card_token_id
                          ↓
2. createSubscription valida os dados
                          ↓
3. Cria assinatura no Mercado Pago
                          ↓
4. MP processa pagamento mensalmente
                          ↓
5. Webhook notifica cada pagamento