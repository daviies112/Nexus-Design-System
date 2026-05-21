# Secretária IA - WhatsApp Automation Platform

🚀 **Plataforma completa de automação WhatsApp para geração e conversão de leads**

## 📋 Stack Tecnológico

- **Frontend**: React + TypeScript + Vite + TailwindCSS
- **Backend**: Express.js + TypeScript  
- **Database**: PostgreSQL + Drizzle ORM
- **Payment**: Stripe Integration
- **Deploy**: Vercel (Serverless)

## ⚡ Quick Start

### 1️⃣ Instalação
```bash
npm install
```

### 2️⃣ Environment Variables
Configure as seguintes variáveis:

**Obrigatórias:**
```env
DATABASE_URL=postgresql://[your-database-url]
STRIPE_SECRET_KEY=sk_test_[your-stripe-secret]
VITE_STRIPE_PUBLIC_KEY=pk_test_[your-stripe-public]
```

**Opcionais:**
```env
GOOGLE_CLIENT_ID=[google-oauth-id]
GOOGLE_CLIENT_SECRET=[google-oauth-secret]
SENDGRID_API_KEY=[sendgrid-key]
```

### 3️⃣ Database Setup
```bash
npm run db:push
```

### 4️⃣ Desenvolvimento
```bash
npm run dev
# Servidor: http://localhost:5000
```

### 5️⃣ Deploy (Vercel)
```bash
npm run build
# Ou conecte diretamente no Vercel Dashboard
```

## 📁 Estrutura do Projeto

```
├── api/                 # Serverless functions (Vercel)
├── client/              # React frontend
│   ├── src/components/  # UI components
│   ├── src/pages/       # Route pages
│   └── src/lib/         # Utils & configs
├── server/              # Express backend
├── shared/              # Shared schemas
├── migrations/          # Database migrations
└── attached_assets/     # Static assets
```

## 🎯 Funcionalidades

✅ **Sistema de Chat IA** - Conversação inteligente WhatsApp  
✅ **Qualificação de Leads** - Scoring automático  
✅ **Agendamento** - Google Calendar integrado  
✅ **Pagamentos** - Stripe checkout  
✅ **Email Marketing** - Campanhas automáticas  
✅ **Dashboard** - Métricas e analytics  

## 🔐 Segurança

- ✅ PII data protection
- ✅ Secure payment processing
- ✅ Environment variables isolation
- ✅ Input validation & sanitization

## 📊 Performance

- ⚡ **Frontend**: React + Vite (HMR)
- ⚡ **Backend**: Express serverless
- ⚡ **Database**: PostgreSQL optimized
- ⚡ **CDN**: Vercel Edge Network

## 🚀 Deploy Options

### Vercel (Recommended)
1. Connect GitHub repository
2. Add environment variables
3. Deploy automatically

### Other Platforms
- Compatible with any Node.js hosting
- Serverless functions supported
- PostgreSQL database required

## 📝 Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Production server
npm run db:push  # Apply database schema
npm run check    # TypeScript validation
```

## 🆘 Troubleshooting

**Common Issues:**
- **Stripe Error**: Verify `STRIPE_SECRET_KEY` and `VITE_STRIPE_PUBLIC_KEY`
- **Database Error**: Check `DATABASE_URL` connection
- **Build Error**: Run `npm run check` for TypeScript issues

**Support:**
- 📧 Email: suporte@secretariaiawhatsapp.com
- 💬 WhatsApp: [Contact Link]

---

**🎉 Ready for production!** Deploy and start automating your WhatsApp leads today.