import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, decimal, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  createdAt: timestamp("created_at").default(sql`now()`).notNull(),
});

export const leads = pgTable("leads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  company: text("company").notNull(),
  companySize: text("company_size").notNull(),
  revenue: text("revenue").notNull(),
  leadsVolume: text("leads_volume").notNull(),
  painPoint: text("pain_point").notNull(),
  timeline: text("timeline").notNull(),
  score: integer("score").notNull(),
  roiData: jsonb("roi_data"),
  status: text("status").default("new").notNull(),
  lgpdConsent: boolean("lgpd_consent").notNull(),
  lgpdConsentDate: timestamp("lgpd_consent_date").notNull(),
  createdAt: timestamp("created_at").default(sql`now()`).notNull(),
});

export const chatSessions = pgTable("chat_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  leadId: varchar("lead_id").references(() => leads.id),
  messages: jsonb("messages").notNull(),
  status: text("status").default("active").notNull(),
  createdAt: timestamp("created_at").default(sql`now()`).notNull(),
});

export const demos = pgTable("demos", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  leadId: varchar("lead_id").references(() => leads.id),
  scheduledDate: timestamp("scheduled_date").notNull(),
  status: text("status").default("scheduled").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").default(sql`now()`).notNull(),
});

export const subscriptions = pgTable("subscriptions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  plan: text("plan").notNull(),
  status: text("status").notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  billingCycle: text("billing_cycle").notNull(),
  createdAt: timestamp("created_at").default(sql`now()`).notNull(),
});

export const emailTemplates = pgTable("email_templates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  subject: text("subject").notNull(),
  htmlContent: text("html_content").notNull(),
  textContent: text("text_content").notNull(),
  templateType: text("template_type").notNull(), // welcome, case_study, educational, roi, testimonials, special_offer, last_chance
  delayDays: integer("delay_days").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").default(sql`now()`).notNull(),
});

export const emailCampaigns = pgTable("email_campaigns", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  leadId: varchar("lead_id").references(() => leads.id).notNull(),
  status: text("status").default("active").notNull(), // active, paused, completed, cancelled
  startedAt: timestamp("started_at").default(sql`now()`).notNull(),
  completedAt: timestamp("completed_at"),
  totalEmails: integer("total_emails").default(7).notNull(),
  emailsSent: integer("emails_sent").default(0).notNull(),
  emailsOpened: integer("emails_opened").default(0).notNull(),
  emailsClicked: integer("emails_clicked").default(0).notNull(),
  createdAt: timestamp("created_at").default(sql`now()`).notNull(),
});

export const scheduledEmails = pgTable("scheduled_emails", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  campaignId: varchar("campaign_id").references(() => emailCampaigns.id).notNull(),
  leadId: varchar("lead_id").references(() => leads.id).notNull(),
  templateId: varchar("template_id").references(() => emailTemplates.id).notNull(),
  scheduledAt: timestamp("scheduled_at").notNull(),
  sentAt: timestamp("sent_at"),
  openedAt: timestamp("opened_at"),
  clickedAt: timestamp("clicked_at"),
  status: text("status").default("scheduled").notNull(), // scheduled, sent, opened, clicked, failed
  personalizedSubject: text("personalized_subject").notNull(),
  personalizedContent: text("personalized_content").notNull(),
  errorMessage: text("error_message"),
  createdAt: timestamp("created_at").default(sql`now()`).notNull(),
});

export const onboardingSurveys = pgTable("onboarding_surveys", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  leadId: varchar("lead_id").references(() => leads.id),
  
  // Seção 1: Dados da Empresa
  nomeEmpresa: text("nome_empresa").notNull(),
  setor: text("setor").notNull(),
  setorOutro: text("setor_outro"),
  telefoneWhatsApp: text("telefone_whatsapp").notNull(),
  emailCalendar: text("email_calendar").notNull(),
  apresentacaoWhatsApp: text("apresentacao_whatsapp").notNull(),
  horarioFuncionamento: text("horario_funcionamento").notNull(),
  horarioPersonalizado: text("horario_personalizado"),
  
  // Seção 2: Produtos e Atendimento
  produtosServicos: text("produtos_servicos").notNull(),
  iaInformaValores: text("ia_informa_valores").notNull(),
  tomComunicacao: text("tom_comunicacao").notNull(),
  processoQualificacao: text("processo_qualificacao").notNull(),
  quandoTransferir: text("quando_transferir").notNull(),
  
  // Seção 3: Agendamento
  tiposReuniao: text("tipos_reuniao").notNull(),
  duracaoPadrao: text("duracao_padrao").notNull(),
  duracaoOutro: text("duracao_outro"),
  disponibilidadeHorarios: text("disponibilidade_horarios").notNull(),
  informacoesNecessarias: text("informacoes_necessarias").notNull(),
  
  // Seção 4: Follow-up e Automação
  quandoFollowUp: text("quando_follow_up").notNull(),
  followUpPersonalizado: text("follow_up_personalizado"),
  tentativasFollowUp: text("tentativas_follow_up").notNull(),
  tentativasPersonalizado: text("tentativas_personalizado"),
  situacoesSemFollowUp: text("situacoes_sem_follow_up").notNull(),
  
  // Seção 5: Integrações e Técnico
  crmAtual: text("crm_atual").notNull(),
  crmOutro: text("crm_outro"),
  compliance: text("compliance").notNull(),
  complianceOutro: text("compliance_outro"),
  urgenciaImplementacao: text("urgencia_implementacao").notNull(),
  
  status: text("status").default("completed").notNull(),
  createdAt: timestamp("created_at").default(sql`now()`).notNull(),
});

export const formularioPersonalizado = pgTable("formulario_personalizado", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  nome: text("nome").notNull(),
  email: text("email").notNull(),
  telefone: text("telefone").notNull(),
  empresa: text("empresa").notNull(),
  tamanhoEmpresa: text("tamanho_empresa").notNull(),
  receita: text("receita").notNull(),
  volumeLeads: text("volume_leads").notNull(),
  pontosDor: text("pontos_dor").notNull(),
  timeline: text("timeline").notNull(),
  interesseEspecifico: text("interesse_especifico"),
  orcamentoDisponivel: text("orcamento_disponivel"),
  decisor: text("decisor").notNull(),
  processoDecisao: text("processo_decisao"),
  solucaoAtual: text("solucao_atual"),
  principaisDesafios: text("principais_desafios"),
  score: integer("score").notNull(),
  planoRecomendado: text("plano_recomendado"), // starter, business, professional, enterprise
  roiData: jsonb("roi_data"),
  origem: text("origem").notNull(), // landing page, referral, etc
  campanha: text("campanha"),
  status: text("status").default("novo").notNull(),
  lgpdConsent: boolean("lgpd_consent").notNull(),
  lgpdConsentDate: timestamp("lgpd_consent_date").notNull(),
  createdAt: timestamp("created_at").default(sql`now()`).notNull(),
});

export const reuniaoProspecto = pgTable("reuniao_prospecto", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  leadId: varchar("lead_id").references(() => leads.id),
  formularioPersonalizadoId: varchar("formulario_personalizado_id").references(() => formularioPersonalizado.id),
  tipoReuniao: text("tipo_reuniao").notNull(), // discovery, demo, proposal, follow-up
  dataAgendada: timestamp("data_agendada").notNull(),
  duracao: integer("duracao").default(60).notNull(), // em minutos
  plataforma: text("plataforma").notNull(), // zoom, teams, google meet, etc
  linkReuniao: text("link_reuniao"),
  
  // Dados do prospecto para a reunião
  nomeProspecto: text("nome_prospecto").notNull(),
  emailProspecto: text("email_prospecto").notNull(),
  telefoneProspecto: text("telefone_prospecto").notNull(),
  cargoProspecto: text("cargo_prospecto").notNull(),
  empresaProspecto: text("empresa_prospecto").notNull(),
  
  // Informações específicas da reunião
  objetivoReuniao: text("objetivo_reuniao").notNull(),
  pontosDiscussao: jsonb("pontos_discussao"), // array de tópicos
  materiaisCompartilhados: jsonb("materiais_compartilhados"), // links, documentos
  
  // Preparação e acompanhamento
  notasPreparacao: text("notas_preparacao"),
  lembreteEnviado: boolean("lembrete_enviado").default(false).notNull(),
  confirmado: boolean("confirmado").default(false).notNull(),
  
  // Resultado da reunião
  status: text("status").default("agendado").notNull(), // agendado, confirmado, realizado, cancelado, reagendado
  notasReuniao: text("notas_reuniao"),
  proximosPassos: text("proximos_passos"),
  probabilidadeConversao: integer("probabilidade_conversao"), // 0-100
  
  // Metadata
  dataRealizacao: timestamp("data_realizacao"),
  duracaoReal: integer("duracao_real"), // em minutos
  participantes: jsonb("participantes"), // lista de participantes
  
  createdAt: timestamp("created_at").default(sql`now()`).notNull(),
  updatedAt: timestamp("updated_at").default(sql`now()`).notNull(),
});

export const pagamentoRecusado = pgTable("pagamento_recusado", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  
  // Dados do cliente
  nome: text("nome").notNull(),
  email: text("email").notNull(),
  telefone: text("telefone").notNull(),
  empresa: text("empresa").notNull(),
  
  // Dados do cartão (sem dados sensíveis)
  numeroCartaoMascara: text("numero_cartao_mascara"), // ex: ****-****-****-1234
  validadeCartao: text("validade_cartao"), // MM/AA
  
  // Dados do plano
  planoEscolhido: text("plano_escolhido").notNull(), // starter, business, professional, enterprise
  valorPlano: decimal("valor_plano", { precision: 10, scale: 2 }).notNull(),
  cicloCobranca: text("ciclo_cobranca").notNull(), // mensal, anual
  
  // Status e erro
  motivoRecusa: text("motivo_recusa"), // "Timeout", "Cartão recusado", "Erro de rede", etc
  tentativas: integer("tentativas").default(1).notNull(),
  
  // Rastreamento
  origem: text("origem").default("checkout").notNull(),
  userAgent: text("user_agent"),
  ipAddress: text("ip_address"),
  
  createdAt: timestamp("created_at").default(sql`now()`).notNull(),
  updatedAt: timestamp("updated_at").default(sql`now()`).notNull(),
});

export const formularioCliente = pgTable("formulario_cliente", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  
  // Informações básicas do cliente
  nomeCompleto: text("nome_completo").notNull(),
  emailPrincipal: text("email_principal").notNull(),
  telefoneContato: text("telefone_contato").notNull(),
  cargoFuncao: text("cargo_funcao").notNull(),
  
  // Dados da empresa cliente
  nomeEmpresa: text("nome_empresa").notNull(),
  setorAtuacao: text("setor_atuacao").notNull(),
  tamanhoEquipe: text("tamanho_equipe").notNull(),
  receitaAnual: text("receita_anual").notNull(),
  principaisConcorrentes: text("principais_concorrentes"),
  
  // Objetivos e necessidades
  objetivosPrincipais: jsonb("objetivos_principais").notNull(), // array de objetivos
  metasNumericas: jsonb("metas_numericas"), // metas específicas
  prazoImplementacao: text("prazo_implementacao").notNull(),
  orcamentoDisponivel: text("orcamento_disponivel").notNull(),
  
  // Situação atual
  ferramentasAtuais: jsonb("ferramentas_atuais"), // CRM, marketing tools, etc
  principaisDesafios: text("principais_desafios").notNull(),
  processoAtualVendas: text("processo_atual_vendas").notNull(),
  volumeLeadsMensais: text("volume_leads_mensais").notNull(),
  taxaConversaoAtual: text("taxa_conversao_atual"),
  
  // Configurações técnicas
  integracoesNecessarias: jsonb("integracoes_necessarias"), // lista de integrações
  requisitosTecnicos: text("requisitos_tecnicos"),
  equipeResponsavel: jsonb("equipe_responsavel"), // quem será responsável
  nivelAutonomia: text("nivel_autonomia").notNull(), // baixo, médio, alto
  
  // Expectativas e sucesso
  expectativasResultados: text("expectativas_resultados").notNull(),
  indicadoresSuccesso: jsonb("indicadores_sucesso").notNull(),
  tempoEsperadoRoi: text("tempo_esperado_roi").notNull(),
  
  // Suporte e treinamento
  necessidadeTreinamento: text("necessidade_treinamento").notNull(),
  disponibilidadeTreinamento: text("disponibilidade_treinamento").notNull(),
  preferenciaSuporte: text("preferencia_suporte").notNull(), // chat, email, telefone
  
  // Status e acompanhamento
  etapaImplementacao: text("etapa_implementacao").default("planejamento").notNull(),
  prioridadeImplementacao: text("prioridade_implementacao").default("media").notNull(),
  observacoesAdicionais: text("observacoes_adicionais"),
  status: text("status").default("ativo").notNull(),
  
  createdAt: timestamp("created_at").default(sql`now()`).notNull(),
  updatedAt: timestamp("updated_at").default(sql`now()`).notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
});

// Frontend schema (without score - calculated on backend)
export const createLeadSchema = createInsertSchema(leads).pick({
  name: true,
  email: true,
  phone: true,
  company: true,
  companySize: true,
  revenue: true,
  leadsVolume: true,
  painPoint: true,
  timeline: true,
  roiData: true,
  lgpdConsent: true,
  lgpdConsentDate: true,
}).extend({
  // Enhanced email validation using RFC standard
  email: z.string().email("Email deve ter formato válido"),
  // Brazilian phone validation (supports various formats)
  phone: z.string().regex(
    /^(?:\+55\s?)?(?:\(?[1-9]{2}\)?\s?)?(?:9\d{4}[\-\s]?\d{4}|\d{4}[\-\s]?\d{4})$/,
    "Telefone deve ter formato brasileiro válido (ex: (11) 99999-9999)"
  ),
  // Ensure consent is always true (required for LGPD)
  lgpdConsent: z.literal(true, {
    errorMap: () => ({ message: "Consentimento LGPD é obrigatório" })
  })
});

// Full schema for database insertion (with score)
export const insertLeadSchema = createInsertSchema(leads);

export const insertChatSessionSchema = createInsertSchema(chatSessions).pick({
  leadId: true,
  messages: true,
});

export const insertDemoSchema = createInsertSchema(demos).pick({
  leadId: true,
  scheduledDate: true,
  notes: true,
}).extend({
  leadId: z.string().nullable(),
  scheduledDate: z.string().datetime().or(z.date()).transform((val) => 
    typeof val === 'string' ? new Date(val) : val
  ),
});

export const insertSubscriptionSchema = createInsertSchema(subscriptions).pick({
  userId: true,
  plan: true,
  status: true,
  amount: true,
  billingCycle: true,
});

export const insertEmailTemplateSchema = createInsertSchema(emailTemplates).pick({
  name: true,
  subject: true,
  htmlContent: true,
  textContent: true,
  templateType: true,
  delayDays: true,
  isActive: true,
});

export const insertEmailCampaignSchema = createInsertSchema(emailCampaigns).pick({
  leadId: true,
  status: true,
  totalEmails: true,
});

export const insertScheduledEmailSchema = createInsertSchema(scheduledEmails).pick({
  campaignId: true,
  leadId: true,
  templateId: true,
  scheduledAt: true,
  personalizedSubject: true,
  personalizedContent: true,
});

export const insertOnboardingSurveySchema = createInsertSchema(onboardingSurveys).pick({
  userId: true,
  leadId: true,
  nomeEmpresa: true,
  setor: true,
  setorOutro: true,
  telefoneWhatsApp: true,
  emailCalendar: true,
  apresentacaoWhatsApp: true,
  horarioFuncionamento: true,
  horarioPersonalizado: true,
  produtosServicos: true,
  iaInformaValores: true,
  tomComunicacao: true,
  processoQualificacao: true,
  quandoTransferir: true,
  tiposReuniao: true,
  duracaoPadrao: true,
  duracaoOutro: true,
  disponibilidadeHorarios: true,
  informacoesNecessarias: true,
  quandoFollowUp: true,
  followUpPersonalizado: true,
  tentativasFollowUp: true,
  tentativasPersonalizado: true,
  situacoesSemFollowUp: true,
  crmAtual: true,
  crmOutro: true,
  compliance: true,
  complianceOutro: true,
  urgenciaImplementacao: true,
}).extend({
  // Enhanced validations
  telefoneWhatsApp: z.string().regex(
    /^(?:\+55\s?)?(?:\(?[1-9]{2}\)?\s?)?(?:9\d{4}[\-\s]?\d{4}|\d{4}[\-\s]?\d{4})$/,
    "Telefone deve ter formato brasileiro válido"
  ),
  emailCalendar: z.string().email("Email deve ter formato válido"),
});

export const insertFormularioPersonalizadoSchema = createInsertSchema(formularioPersonalizado).pick({
  nome: true,
  email: true,
  telefone: true,
  empresa: true,
  tamanhoEmpresa: true,
  receita: true,
  volumeLeads: true,
  pontosDor: true,
  timeline: true,
  interesseEspecifico: true,
  orcamentoDisponivel: true,
  decisor: true,
  processoDecisao: true,
  solucaoAtual: true,
  principaisDesafios: true,
  planoRecomendado: true,
  roiData: true,
  origem: true,
  campanha: true,
  lgpdConsent: true,
  lgpdConsentDate: true,
}).extend({
  email: z.string().email("Email deve ter formato válido"),
  telefone: z.string().regex(
    /^(?:\+55\s?)?(?:\(?[1-9]{2}\)?\s?)?(?:9\d{4}[\-\s]?\d{4}|\d{4}[\-\s]?\d{4})$/,
    "Telefone deve ter formato brasileiro válido (ex: (11) 99999-9999)"
  ),
  lgpdConsent: z.literal(true, {
    errorMap: () => ({ message: "Consentimento LGPD é obrigatório" })
  })
});

export const insertPagamentoRecusadoSchema = createInsertSchema(pagamentoRecusado).pick({
  nome: true,
  email: true,
  telefone: true,
  empresa: true,
  numeroCartaoMascara: true,
  validadeCartao: true,
  planoEscolhido: true,
  valorPlano: true,
  cicloCobranca: true,
  motivoRecusa: true,
  tentativas: true,
  origem: true,
  userAgent: true,
  ipAddress: true,
}).extend({
  email: z.string().email("Email deve ter formato válido"),
  telefone: z.string().regex(
    /^(?:\+55\s?)?(?:\(?[1-9]{2}\)?\s?)?(?:9\d{4}[\-\s]?\d{4}|\d{4}[\-\s]?\d{4})$/,
    "Telefone deve ter formato brasileiro válido"
  )
});

export const insertReuniaoProspectoSchema = createInsertSchema(reuniaoProspecto).pick({
  leadId: true,
  formularioPersonalizadoId: true,
  tipoReuniao: true,
  dataAgendada: true,
  duracao: true,
  plataforma: true,
  linkReuniao: true,
  nomeProspecto: true,
  emailProspecto: true,
  telefoneProspecto: true,
  cargoProspecto: true,
  empresaProspecto: true,
  objetivoReuniao: true,
  pontosDiscussao: true,
  materiaisCompartilhados: true,
  notasPreparacao: true,
}).extend({
  leadId: z.string().nullable(),
  formularioPersonalizadoId: z.string().nullable(),
  dataAgendada: z.string().datetime().or(z.date()).transform((val) => 
    typeof val === 'string' ? new Date(val) : val
  ),
  emailProspecto: z.string().email("Email deve ter formato válido"),
  telefoneProspecto: z.string().regex(
    /^(?:\+55\s?)?(?:\(?[1-9]{2}\)?\s?)?(?:9\d{4}[\-\s]?\d{4}|\d{4}[\-\s]?\d{4})$/,
    "Telefone deve ter formato brasileiro válido"
  ),
});

export const insertFormularioClienteSchema = createInsertSchema(formularioCliente).pick({
  userId: true,
  nomeCompleto: true,
  emailPrincipal: true,
  telefoneContato: true,
  cargoFuncao: true,
  nomeEmpresa: true,
  setorAtuacao: true,
  tamanhoEquipe: true,
  receitaAnual: true,
  principaisConcorrentes: true,
  objetivosPrincipais: true,
  metasNumericas: true,
  prazoImplementacao: true,
  orcamentoDisponivel: true,
  ferramentasAtuais: true,
  principaisDesafios: true,
  processoAtualVendas: true,
  volumeLeadsMensais: true,
  taxaConversaoAtual: true,
  integracoesNecessarias: true,
  requisitosTecnicos: true,
  equipeResponsavel: true,
  nivelAutonomia: true,
  expectativasResultados: true,
  indicadoresSuccesso: true,
  tempoEsperadoRoi: true,
  necessidadeTreinamento: true,
  disponibilidadeTreinamento: true,
  preferenciaSuporte: true,
  etapaImplementacao: true,
  prioridadeImplementacao: true,
  observacoesAdicionais: true,
}).extend({
  emailPrincipal: z.string().email("Email deve ter formato válido"),
  telefoneContato: z.string().regex(
    /^(?:\+55\s?)?(?:\(?[1-9]{2}\)?\s?)?(?:9\d{4}[\-\s]?\d{4}|\d{4}[\-\s]?\d{4})$/,
    "Telefone deve ter formato brasileiro válido"
  ),
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Use createLeadSchema for API input (without score)
export type InsertLead = z.infer<typeof createLeadSchema> & { score: number };
export type Lead = typeof leads.$inferSelect;

export type InsertChatSession = z.infer<typeof insertChatSessionSchema>;
export type ChatSession = typeof chatSessions.$inferSelect;

export type InsertDemo = z.infer<typeof insertDemoSchema>;
export type Demo = typeof demos.$inferSelect;

export type InsertSubscription = z.infer<typeof insertSubscriptionSchema>;
export type Subscription = typeof subscriptions.$inferSelect;

export type InsertEmailTemplate = z.infer<typeof insertEmailTemplateSchema>;
export type EmailTemplate = typeof emailTemplates.$inferSelect;

export type InsertEmailCampaign = z.infer<typeof insertEmailCampaignSchema>;
export type EmailCampaign = typeof emailCampaigns.$inferSelect;

export type InsertScheduledEmail = z.infer<typeof insertScheduledEmailSchema>;
export type ScheduledEmail = typeof scheduledEmails.$inferSelect;

export type InsertOnboardingSurvey = z.infer<typeof insertOnboardingSurveySchema>;
export type OnboardingSurvey = typeof onboardingSurveys.$inferSelect;

export type InsertFormularioPersonalizado = z.infer<typeof insertFormularioPersonalizadoSchema> & { score: number };
export type FormularioPersonalizado = typeof formularioPersonalizado.$inferSelect;

export type InsertPagamentoRecusado = z.infer<typeof insertPagamentoRecusadoSchema>;
export type PagamentoRecusado = typeof pagamentoRecusado.$inferSelect;

export type InsertReuniaoProspecto = z.infer<typeof insertReuniaoProspectoSchema>;
export type ReuniaoProspecto = typeof reuniaoProspecto.$inferSelect;

export type InsertFormularioCliente = z.infer<typeof insertFormularioClienteSchema>;
export type FormularioCliente = typeof formularioCliente.$inferSelect;
