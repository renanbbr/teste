// Interface para criar planos no Mercado Pago
export interface PlanData {
    reason: string;
    auto_recurring: {
      frequency: number;
      frequency_type: "months";
      transaction_amount: number;
      currency_id: "BRL";
    };
    back_url: string;
}
  
// Interface para criar assinaturas
export interface SubscriptionData {
    preapproval_plan_id: string;
    reason: string;
    payer_email: string;
    card_token_id: string;
    back_url: string;
    status?: string;
}
  
// Interface para dados de pagamento recebidos via webhook
export interface WebhookPayment {
    id: number;
    date_created: string;
    date_approved: string;
    money_release_date: string;
    payment_method_id: string;
    payment_type_id: string;
    status: string;
    status_detail: string;
    transaction_amount: number;
    description: string;
    payer: {
      email: string;
      identification: {
        type: string;
        number: string;
        };
    };
}
  
// Interface para os planos do SealClub (uso interno)
export interface SealClubPlan {
    id: string;
    name: string;
    price: number;
    features: string[];
}