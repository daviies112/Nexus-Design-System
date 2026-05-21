# Análise Exaustiva: Plataforma Completa vs Plataforma Revendedora e Workflow N8N

Este documento consolida a análise da arquitetura e das responsabilidades dos serviços em execução no servidor de produção (`195.200.1.86`), detalhando a **Plataforma Completa**, a **Plataforma Revendedora** e o **Workflow do n8n**.

---

## 1. Plataforma Completa (Master / Admin)
**Processo PM2**: `plataformacompleta` (ID: 15)  
**Porta**: `5000` (configurada via `cross-env NODE_ENV=production PORT=5000` no `package.json`)  
**Tamanho do Backend**: ~98.880 linhas de código (TypeScript).

A Plataforma Completa atua como o **Sistema Master** (Nexus Intelligence Master) projetado para gerenciar todos os tenants (clientes) e configurar orquestrações complexas. Ela não é destinada aos usuários finais dos clientes, mas sim para os administradores, gestores e a própria operação interna.

### Principais Responsabilidades e Módulos:
- **Gestão de Tenants e Configurações Globais (`config.ts`, `tenantSupabase.ts`)**:
  - Provisionamento e controle de instâncias Supabase para cada tenant (cliente).
  - Gerenciamento dinâmico de conexões de banco de dados (`multiTenantSupabase.ts`).
- **Autenticação e Permissões (`auth.ts`, `multiTenantAuth.ts`)**:
  - Implementa controle de acesso rígido (`requireSuperAdmin`) com base em roles via JWT.
- **Orquestração de Integrações (`evolution.ts`, `n8n.ts`, `whatsapp-complete.ts`)**:
  - Comunicação pesada com a Evolution API para disparo e recebimento de mensagens de WhatsApp.
  - O endpoint `/api/n8n` centraliza as integrações de reuniões (ex: criação/edição/cancelamento via `MQqGLq8zmqVDxycp` ou automações similares).
- **Gestão Operacional de Negócios**:
  - **Leads e Funis (`leadsPipelineRoutes.ts`, `funilRoutes.ts`)**: CRM interno avançado para gerenciamento completo do pipeline de leads.
  - **Reuniões e Videoconferências (`meetings.ts`, `recording100ms.ts`)**: Integração direta com a API do 100ms para gerenciar salas, links e gravar sessões.
  - **Assinatura e Contratos (`assinatura.ts`, `contractSyncPoller.ts`)**: Gerador de PDFs e acompanhamento das assinaturas de clientes.
  - **Compliance e Gaps (`compliance.ts`, `gaps.ts`, `bigdatacorpClient.ts`)**: Verifica CPF/CNPJ contra base da BigDataCorp, cálculo de "Risk Score" e gestão de Gaps operacionais.
  - **Faturamento e Billing (`billing.ts`, `pagarme.ts`, `asaas.ts`)**: Fluxo financeiro pesado e distribuição/repasse global.

### Comportamento Frontend
- Arquitetura "Fat Client", carrega scripts de otimização de bundle, charts (`recharts`), monitoramento (`@sentry`), e bibliotecas pesadas de form e PDF (`jspdf`, `fabric`).

---

## 2. Plataforma Revendedora (Reseller / Frontend Store)
**Processo PM2**: `plataformarevendedora` (ID: 2)  
**Porta**: `5002` (configurada via `cross-env NODE_ENV=production PORT=5002` no `package.json`)  
**Tamanho do Backend**: ~66.885 linhas de código (TypeScript).

A Plataforma Revendedora atua como o **Sistema White-Label (Loja e Perfis)** voltado aos revendedores finais ou consumidores dos serviços e produtos oferecidos pelos tenants. A lógica é mais "leve" do lado do backend, sendo focada em exibir catálogos e facilitar transações descentralizadas.

### Principais Responsabilidades e Módulos:
- **Catálogo Público e Lojas (`publicStore.ts`, `PublicStore.tsx`, `resellerCatalog.ts`)**:
  - Exibe o inventário do revendedor, focado em alta velocidade e visualização em tempo real para os clientes finais.
  - Acesso público garantido para a navegação dos consumidores (`/loja/:storeId`).
- **Autenticação Isolada (`resellerAuth.ts`)**:
  - O acesso dos revendedores ocorre de forma isolada (`Reseller Auth`), separada do dashboard Admin do tenant. Funciona utilizando o middleware `resellerAuthMiddleware` para permitir login cross-site seguro.
- **Split de Pagamentos e Checkout Público (`split.ts`, `pagarmePublic.ts`)**:
  - Gerencia o repasse direto das comissões para as revendedoras (através do Split Payment da Pagar.me/Asaas) no momento do checkout do cliente.
- **Formulários e Reuniões para o Cliente Final (`forms.ts`, `FormularioPublicoWrapper.tsx`)**:
  - A captura de leads é ultra-otimizada. Rotas como `/f/:token` e `/reuniao-publica/` não carregam todo o painel admin, fornecendo um *Skeleton Loading* quase instantâneo (<50ms).
- **Roteamento Diferenciado (Isolamento de Chunks no Vite)**:
  - O React/Vite foi ajustado criticamente para gerar *chunks* menores e isolar dependências (ex: LiveKit e 100ms não bloqueiam o render do React Core), priorizando a latência na loja pública.

---

## 3. Workflow N8N (`MQqGLq8zmqVDxycp` - Workflow "Emerick")

O workflow com a ID `MQqGLq8zmqVDxycp` encontrado no container Docker `n8n` atua como o **Cérebro de Orquestração de Negócios e Financeiro** para um Tenant/Revendedora específica (Tenant: `emerick`). Diferente de ser apenas um fluxo de busca de produtos, ele automatiza todo o ciclo de vida da revendedora.

### Responsabilidades e Fluxos Automatizados (Cron & Webhooks)
- **Onboarding e Follow-up (CRM Ativo)**:
  - Processa o onboarding inicial da revendedora e possui réguas de *Follow-up* (ex: `Cron 24h Follow-up`, `Schedule Anti-Churn 10h30`) para converter leads em revendedoras ativas.
- **Cobrança Mensal e Inadimplência**:
  - `Cron Cobrança Mensal` e `Schedule Diario 9h - Inadimplencia` geram cobranças automáticas.
  - O fluxo vai até as últimas consequências da inadimplência, incluindo negativação no Serasa (`D+17 Negativar CPF Serasa`) via integração com Asaas (`/v3/paymentDunnings`).
- **Pagamentos PIX e Comprovantes (Integração EVO)**:
  - O fluxo gera QRCodes via um microserviço de PIX interno (`http://localhost:3010/pix/criar`) e salva no banco (tabela `payment_transactions`).
  - Um `Webhook EVO` escuta as mensagens do WhatsApp (imagens de comprovantes de pagamento). A IA/Fluxo confere o comprovante PIX enviado e valida o pagamento automaticamente.
- **Maletas Automáticas e Estoque**:
  - Escuta confirmações de maletas (`Webhook Maleta Confirmada`) recebendo os produtos vendidos, dando baixa/reset no estoque alocado (`Cron Reset Soft Allocation`).
- **Comunicação Ativa e Relatórios**:
  - Envia os valores e confirmações diretamente para a empresa, atuando como um operador humano verificando recibos e disparando mensagens.

A orquestração via N8N remove virtualmente a necessidade de intervenção humana no fluxo de ponta a ponta (desde a captação, até cobrança mensal e conferência de comprovantes PIX enviados via WhatsApp).

---

## Conclusão de Arquitetura

O sistema emprega uma arquitetura **Microservices-Oriented via Monolithic Repositories** bem definida:
1. A **Plataforma Completa (5000)** gerencia todo o peso do backoffice (integrações de risco, faturamento geral, gravação de reuniões).
2. A **Plataforma Revendedora (5002)** serve como porta de frente performática (lojas, checkouts com split de pagamento e respostas instantâneas).
3. O **n8n** age como orquestrador *Event-Driven* e camada middleware que costura os eventos de mensageria (WhatsApp Evolution) com a lógica de e-commerce e agendamento das plataformas.
