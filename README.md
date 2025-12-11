# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/92dc0c12-c831-4ed8-9ab7-0f875920f45d

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/92dc0c12-c831-4ed8-9ab7-0f875920f45d) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/92dc0c12-c831-4ed8-9ab7-0f875920f45d) and click on Share -> Publish.

## Backend Setup (Pagamentos & Webhooks)

### Pré-requisitos
- Node.js 18+
- Mercado Pago Account (sandbox)
- Supabase Project
- Gmail com App Password (SMTP)

### Instalação Backend
```sh
cd backend
npm install
```

### Configuração de Variáveis de Ambiente
Copie `backend/.env.example` para `backend/.env` e preencha:

```dotenv
# Mercado Pago (obtenha no painel MP)
MP_ACCESS_TOKEN=seu_access_token_sandbox
MP_WEBHOOK_SECRET=seu_webhook_secret

# Supabase
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_KEY=sua_anon_key

# Email (Gmail + App Password)
EMAIL_USER=seu_email@gmail.com
EMAIL_PASSWORD=sua_app_password

# URLs
BASE_URL=http://localhost:8080
PORT=3001
```

### Iniciar Servidor em Desenvolvimento
```sh
cd backend
npm run dev
```

### Testar Integrações (Supabase + SMTP)
```sh
cd backend
npm run test:connections
```

### Webhooks (Pagamentos Recebidos)

#### 1. Configurar MP_WEBHOOK_SECRET
O backend valida assinatura HMAC-SHA256 de webhooks do Mercado Pago. Configure `MP_WEBHOOK_SECRET` com o valor gerado no painel MP (Configurações > Webhooks).

#### 2. Expor Webhook Localmente (Ngrok)
```sh
brew install --cask ngrok  # ou download do site
ngrok http 3000
```
Copie a URL HTTPS gerada (ex: `https://abcd1234.ngrok.io`).

#### 3. Configurar URL no Mercado Pago
- Acesse painel MP (sandbox)
- Vá em **Configurações > Webhooks**
- Registre: `https://seu-ngrok-url.ngrok.io/api/webhook`
- Evento: `payment.created`, `payment.updated`

#### 4. Testar com cURL (Webhook simulado)
```bash
# Gere assinatura (Node.js):
node -e "const crypto=require('crypto');const s='seu_webhook_secret';const p=JSON.stringify({type:'payment',data:{id:123}});console.log(crypto.createHmac('sha256',s).update(p).digest('base64'))"

# Simule webhook:
curl -X POST https://seu-ngrok-url.ngrok.io/api/webhook \
  -H "Content-Type: application/json" \
  -H "x-signature: sha256=<assinatura_acima>" \
  -d '{"type":"payment","data":{"id":123}}'
```

#### 5. Fluxo Completo
- Cliente realiza pagamento no frontend → Checkout MP
- MP dispara webhook → `/api/webhook`
- Backend valida assinatura + consulta MP
- Atualiza `subscriptions` no Supabase
- Envia email de confirmação via Gmail

#### Estrutura de Tabela (Supabase)
```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  plano TEXT NOT NULL,
  amount DECIMAL(10, 2),
  payment_method TEXT,
  payment_id TEXT UNIQUE,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)
