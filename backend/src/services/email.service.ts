import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Configurar transportador de email (usando Gmail ou seu serviço)
// Para Gmail: https://support.google.com/accounts/answer/185833
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: parseInt(process.env.EMAIL_PORT || "587"),
  secure: process.env.EMAIL_SECURE === "true", // true para 465, false para outros
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

/**
 * Enviar email de confirmação de pagamento
 */
export const sendPaymentConfirmation = async (
  email: string,
  data: {
    name: string;
    plan: string;
    amount: number;
    paymentId: string;
    method: "card" | "pix";
  }
) => {
  try {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1>✅ Pagamento Confirmado!</h1>
        
        <p>Olá ${data.name},</p>
        
        <p>Seu pagamento foi processado com sucesso!</p>
        
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3>Resumo do Pedido</h3>
          <p><strong>Plano:</strong> ${data.plan}</p>
          <p><strong>Valor:</strong> R$ ${data.amount.toFixed(2)}</p>
          <p><strong>Método:</strong> ${data.method.toUpperCase()}</p>
          <p><strong>ID do Pagamento:</strong> ${data.paymentId}</p>
        </div>
        
        <p>Sua assinatura está <strong>ativa</strong> e você já pode usar todos os benefícios do plano.</p>
        
        <p>Se tiver dúvidas, entre em contato conosco!</p>
        
        <hr>
        <p style="color: #666; font-size: 12px;">
          SealClub © 2025. Todos os direitos reservados.
        </p>
      </div>
    `;

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: `Confirmação de Pagamento - SealClub ${data.plan}`,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("[EMAIL] ✅ Confirmação enviada:", info.messageId);
    return true;
  } catch (error: any) {
    console.error("[EMAIL ERROR]", error.message);
    // Não falhar toda a operação se email não enviar
    return false;
  }
};

/**
 * Enviar email de cancelamento de assinatura
 */
export const sendCancellationEmail = async (
  email: string,
  data: {
    name: string;
    plan: string;
  }
) => {
  try {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1>Assinatura Cancelada</h1>
        
        <p>Olá ${data.name},</p>
        
        <p>Sua assinatura do plano <strong>${data.plan}</strong> foi cancelada com sucesso.</p>
        
        <p>Você será removido de nossas listas de e-mail e não receberá mais notificações.</p>
        
        <p>Se deseja reativar sua assinatura, entre em contato conosco!</p>
        
        <hr>
        <p style="color: #666; font-size: 12px;">
          SealClub © 2025. Todos os direitos reservados.
        </p>
      </div>
    `;

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: "Sua assinatura SealClub foi cancelada",
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("[EMAIL] ✅ Cancelamento enviado:", info.messageId);
    return true;
  } catch (error: any) {
    console.error("[EMAIL ERROR]", error.message);
    return false;
  }
};

/**
 * Testar conexão com servidor de email
 */
export const testEmailConnection = async () => {
  try {
    await transporter.verify();
    console.log("[EMAIL] ✅ Conexão verificada com sucesso!");
    return true;
  } catch (error: any) {
    console.error("[EMAIL] ❌ Erro de conexão:", error.message);
    return false;
  }
};
