# SealClub 🛍️

> **O primeiro clube de compras inteligente do Brasil.**
> Acesso a produtos Apple e as maiores marcas do mundo com preço de fábrica.

🔗 **URL do Projeto:** [https://sealclub.com.br](https://sealclub.com.br)

---

## 💻 Sobre o Projeto

O **SealClub** é uma plataforma de e-commerce exclusiva que utiliza um sistema de **Checkout Transparente** (Custom Checkout) integrado diretamente à **API v2 do Mercado Pago**.
O sistema foi projetado para **alta conversão**, eliminando redirecionamentos e garantindo **segurança total** no processamento dos pagamentos.

---

## 🚀 Tecnologias Utilizadas

### Frontend (Client)

* **React** + **Vite** — Build rápido e leve
* **TypeScript** — Tipagem estática
* **Tailwind CSS** + **Shadcn/ui** — Estilização moderna
* **Mercado Pago SDK React** — Integração segura de cartão e PIX

### Backend (Server)

* **Node.js** + **Express** — API REST
* **Mercado Pago SDK Node** — Processamento seguro no servidor
* **Supabase** — PostgreSQL Database & Auth
* **Nodemailer** — Envio de e-mails transacionais

---

## ⚙️ Funcionalidades

* **Venda Única:** Fluxo simplificado para compra de produtos ou planos (sem recorrência complexa).
* **Pagamento via Cartão:** Processamento seguro com validação de dados sensíveis e retorno imediato.
* **Pagamento via PIX:** Geração instantânea de QR Code e código Copia e Cola.
* **Webhook Inteligente:** Escuta notificações do Mercado Pago e aprova pedidos automaticamente após confirmação do pagamento.
* **Banco de Dados em Tempo Real:** Registro automático de vendas e clientes na tabela `vendas`.

---

## 🛠️ Guia de Instalação e Configuração

### Pré-requisitos

* Node.js **18+**
* Conta no **Mercado Pago** (Produção ou Sandbox)
* Projeto criado no **Supabase**
* Conta de e-mail SMTP (ex: Gmail com App Password)

---

### 1️⃣ Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/sealclub.git
cd sealclub
```

---

### 2️⃣ Configurar o Backend (API)

Entre na pasta do backend e instale as dependências:

```bash
cd backend
npm install
```

Crie um arquivo **`.env`** na raiz da pasta `backend`:

```env
# Servidor
PORT=3001
HOST=0.0.0.0
ALLOWED_ORIGINS=http://localhost:5173,https://sealclub.com.br

# Mercado Pago
MP_ACCESS_TOKEN=seu_access_token_production_ou_sandbox
MP_WEBHOOK_SECRET=seu_webhook_secret_do_painel

# Supabase
SUPABASE_URL=https://seu-id-projeto.supabase.co
SUPABASE_KEY=sua_chave_anon_ou_service_role

# E-mail (Nodemailer)
EMAIL_USER=seu_email@gmail.com
EMAIL_PASSWORD=sua_senha_de_app_gerada_no_google
```

Rodar o backend em desenvolvimento:

```bash
npm run dev
```

---

### 3️⃣ Configurar o Frontend (Interface)

Na raiz do projeto, instale as dependências:

```bash
cd ..
npm install
```

Crie um arquivo **`.env`** na raiz do frontend:

```env
# URL da API Backend
VITE_API_URL=http://localhost:3001/api

# Mercado Pago Public Key (Frontend)
VITE_MERCADOPAGO_PUBLIC_KEY=sua_public_key_aqui
```

Rodar o frontend:

```bash
npm run dev
```

---

## 🗄️ Estrutura do Banco de Dados (Supabase)

Execute o SQL abaixo no **SQL Editor** do Supabase:

```sql
create table public.vendas (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,

  -- Dados do Cliente
  customer_name text not null,
  customer_email text not null,
  customer_phone text,
  customer_cpf text,

  -- Dados do Produto e Pagamento
  product_name text not null,
  amount numeric not null,

  -- Mercado Pago
  payment_id text not null unique,

  -- Validações
  payment_method text check (payment_method in ('card', 'pix')),
  status text check (status in ('pending', 'approved', 'rejected', 'refunded')) default 'pending'
);

alter table public.vendas enable row level security;

create policy "Enable access for service role" on public.vendas
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');
```

---

## 🔄 Configuração de Webhooks (Produção)

1. Acesse o painel do Mercado Pago:
   **Seus Negócios → Configurações → Webhooks**

2. Crie uma notificação apontando para:

```
https://api.sealclub.com.br/api/webhook
```

3. Marque os eventos:

* `payment.created`
* `payment.updated`

4. Copie o **Secret Key** e configure em `MP_WEBHOOK_SECRET` no backend.

---

## 📁 Estrutura de Pastas

```bash
sealclub/
├── src/                  # Frontend (React)
│   ├── components/       # UI Components (Shadcn)
│   ├── pages/            # Checkout.tsx, Home, etc
│   └── ...
├── backend/              # Backend (Node.js)
│   ├── src/
│   │   ├── controllers/  # payment.controller.ts
│   │   ├── services/     # supabase.service.ts, email.service.ts
│   │   ├── routes/       # payment.routes.ts
│   │   └── server.ts     # Entrada da API
│   └── .env
└── README.md
```

---

## 📝 Licença

Todos os direitos reservados à **SealClub**.
