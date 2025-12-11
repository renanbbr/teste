# Checklist de Variáveis de Ambiente para Produção

Este arquivo lista todas as variáveis de ambiente necessárias para rodar o sistema em produção sem erros. Configure-as no painel de hospedagem (ex: Vercel, Railway, etc.).

## Backend (.env no servidor)

### Mercado Pago
- `MP_ACCESS_TOKEN`: Token de acesso do Mercado Pago (produção). Obtenha em https://www.mercadopago.com.br/developers/panel/app
- `MP_PUBLIC_KEY`: Chave pública do Mercado Pago (produção). Mesma aplicação do access token.
- `MP_WEBHOOK_SECRET`: Segredo do webhook (produção). Configure no painel do Mercado Pago.

### URLs e Ambiente
- `BASE_URL`: URL base do frontend em produção (ex: https://seusite.com)
- `NODE_ENV`: Defina como `production`
- `PORT`: Porta do servidor (ex: 3001 ou a padrão da hospedagem)
- `HOST`: Host do servidor (ex: 0.0.0.0)
- `ALLOWED_ORIGINS`: Origens permitidas para CORS (ex: https://seusite.com,https://www.seusite.com)

### Supabase
- `SUPABASE_URL`: URL do projeto Supabase (produção)
- `SUPABASE_KEY`: Chave anônima do Supabase (produção)

### Email (Gmail SMTP)
- `EMAIL_HOST`: smtp.gmail.com
- `EMAIL_PORT`: 587
- `EMAIL_SECURE`: false
- `EMAIL_USER`: Seu email Gmail
- `EMAIL_PASSWORD`: Senha de app do Gmail (gere em https://myaccount.google.com/apppasswords)
- `EMAIL_FROM`: Mesmo que EMAIL_USER

## Frontend (.env na raiz do projeto)

### Mercado Pago
- `VITE_MERCADOPAGO_PUBLIC_KEY`: Chave pública do Mercado Pago (produção). Deve ser a mesma do backend.

### URLs
- `VITE_API_URL`: URL completa da API em produção (ex: https://sua-api.com/api)

## Checklist de Configuração

- [ ] Obter credenciais de produção do Mercado Pago (access token, public key, webhook secret)
- [ ] Configurar webhook no Mercado Pago apontando para `https://sua-api.com/api/webhook`
- [ ] Criar projeto Supabase em produção e obter URL/KEY
- [ ] Gerar senha de app no Gmail
- [ ] Desabilitar RLS na tabela `assinaturas` do Supabase (ou adicionar políticas)
- [ ] Alterar coluna `telefone` da tabela `assinaturas` para `text` (se ainda não feito)
- [ ] Testar build e deploy do frontend
- [ ] Testar build e deploy do backend
- [ ] Verificar logs em produção após deploy

## Notas
- Use sempre credenciais de **produção**, não sandbox.
- Para hospedagem, certifique-se de que o servidor suporta Node.js e variáveis de ambiente.
- Monitore logs para erros pós-deploy.