CREATE TABLE "chat_sessions" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"lead_id" varchar,
	"messages" jsonb NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "demos" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"lead_id" varchar,
	"scheduled_date" timestamp NOT NULL,
	"status" text DEFAULT 'scheduled' NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "email_campaigns" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"lead_id" varchar NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"started_at" timestamp DEFAULT now() NOT NULL,
	"completed_at" timestamp,
	"total_emails" integer DEFAULT 7 NOT NULL,
	"emails_sent" integer DEFAULT 0 NOT NULL,
	"emails_opened" integer DEFAULT 0 NOT NULL,
	"emails_clicked" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "email_templates" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"subject" text NOT NULL,
	"html_content" text NOT NULL,
	"text_content" text NOT NULL,
	"template_type" text NOT NULL,
	"delay_days" integer NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "formulario_cliente" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"nome_completo" text NOT NULL,
	"email_principal" text NOT NULL,
	"telefone_contato" text NOT NULL,
	"cargo_funcao" text NOT NULL,
	"nome_empresa" text NOT NULL,
	"setor_atuacao" text NOT NULL,
	"tamanho_equipe" text NOT NULL,
	"receita_anual" text NOT NULL,
	"principais_concorrentes" text,
	"objetivos_principais" jsonb NOT NULL,
	"metas_numericas" jsonb,
	"prazo_implementacao" text NOT NULL,
	"orcamento_disponivel" text NOT NULL,
	"ferramentas_atuais" jsonb,
	"principais_desafios" text NOT NULL,
	"processo_atual_vendas" text NOT NULL,
	"volume_leads_mensais" text NOT NULL,
	"taxa_conversao_atual" text,
	"integracoes_necessarias" jsonb,
	"requisitos_tecnicos" text,
	"equipe_responsavel" jsonb,
	"nivel_autonomia" text NOT NULL,
	"expectativas_resultados" text NOT NULL,
	"indicadores_sucesso" jsonb NOT NULL,
	"tempo_esperado_roi" text NOT NULL,
	"necessidade_treinamento" text NOT NULL,
	"disponibilidade_treinamento" text NOT NULL,
	"preferencia_suporte" text NOT NULL,
	"etapa_implementacao" text DEFAULT 'planejamento' NOT NULL,
	"prioridade_implementacao" text DEFAULT 'media' NOT NULL,
	"observacoes_adicionais" text,
	"status" text DEFAULT 'ativo' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "formulario_personalizado" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nome" text NOT NULL,
	"email" text NOT NULL,
	"telefone" text NOT NULL,
	"empresa" text NOT NULL,
	"tamanho_empresa" text NOT NULL,
	"receita" text NOT NULL,
	"volume_leads" text NOT NULL,
	"pontos_dor" text NOT NULL,
	"timeline" text NOT NULL,
	"interesse_especifico" text,
	"orcamento_disponivel" text,
	"decisor" text NOT NULL,
	"processo_decisao" text,
	"solucao_atual" text,
	"principais_desafios" text,
	"score" integer NOT NULL,
	"plano_recomendado" text,
	"roi_data" jsonb,
	"origem" text NOT NULL,
	"campanha" text,
	"status" text DEFAULT 'novo' NOT NULL,
	"lgpd_consent" boolean NOT NULL,
	"lgpd_consent_date" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "leads" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"company" text NOT NULL,
	"company_size" text NOT NULL,
	"revenue" text NOT NULL,
	"leads_volume" text NOT NULL,
	"pain_point" text NOT NULL,
	"timeline" text NOT NULL,
	"score" integer NOT NULL,
	"roi_data" jsonb,
	"status" text DEFAULT 'new' NOT NULL,
	"lgpd_consent" boolean NOT NULL,
	"lgpd_consent_date" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "onboarding_surveys" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar,
	"lead_id" varchar,
	"nome_empresa" text NOT NULL,
	"setor" text NOT NULL,
	"setor_outro" text,
	"telefone_whatsapp" text NOT NULL,
	"email_calendar" text NOT NULL,
	"apresentacao_whatsapp" text NOT NULL,
	"horario_funcionamento" text NOT NULL,
	"horario_personalizado" text,
	"produtos_servicos" text NOT NULL,
	"ia_informa_valores" text NOT NULL,
	"tom_comunicacao" text NOT NULL,
	"processo_qualificacao" text NOT NULL,
	"quando_transferir" text NOT NULL,
	"tipos_reuniao" text NOT NULL,
	"duracao_padrao" text NOT NULL,
	"duracao_outro" text,
	"disponibilidade_horarios" text NOT NULL,
	"informacoes_necessarias" text NOT NULL,
	"quando_follow_up" text NOT NULL,
	"follow_up_personalizado" text,
	"tentativas_follow_up" text NOT NULL,
	"tentativas_personalizado" text,
	"situacoes_sem_follow_up" text NOT NULL,
	"crm_atual" text NOT NULL,
	"crm_outro" text,
	"compliance" text NOT NULL,
	"compliance_outro" text,
	"urgencia_implementacao" text NOT NULL,
	"status" text DEFAULT 'completed' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pagamento_recusado" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nome" text NOT NULL,
	"email" text NOT NULL,
	"telefone" text NOT NULL,
	"empresa" text NOT NULL,
	"numero_cartao_mascara" text,
	"validade_cartao" text,
	"plano_escolhido" text NOT NULL,
	"valor_plano" numeric(10, 2) NOT NULL,
	"ciclo_cobranca" text NOT NULL,
	"motivo_recusa" text,
	"tentativas" integer DEFAULT 1 NOT NULL,
	"origem" text DEFAULT 'checkout' NOT NULL,
	"user_agent" text,
	"ip_address" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reuniao_prospecto" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"lead_id" varchar,
	"formulario_personalizado_id" varchar,
	"tipo_reuniao" text NOT NULL,
	"data_agendada" timestamp NOT NULL,
	"duracao" integer DEFAULT 60 NOT NULL,
	"plataforma" text NOT NULL,
	"link_reuniao" text,
	"nome_prospecto" text NOT NULL,
	"email_prospecto" text NOT NULL,
	"telefone_prospecto" text NOT NULL,
	"cargo_prospecto" text NOT NULL,
	"empresa_prospecto" text NOT NULL,
	"objetivo_reuniao" text NOT NULL,
	"pontos_discussao" jsonb,
	"materiais_compartilhados" jsonb,
	"notas_preparacao" text,
	"lembrete_enviado" boolean DEFAULT false NOT NULL,
	"confirmado" boolean DEFAULT false NOT NULL,
	"status" text DEFAULT 'agendado' NOT NULL,
	"notas_reuniao" text,
	"proximos_passos" text,
	"probabilidade_conversao" integer,
	"data_realizacao" timestamp,
	"duracao_real" integer,
	"participantes" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "scheduled_emails" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"campaign_id" varchar NOT NULL,
	"lead_id" varchar NOT NULL,
	"template_id" varchar NOT NULL,
	"scheduled_at" timestamp NOT NULL,
	"sent_at" timestamp,
	"opened_at" timestamp,
	"clicked_at" timestamp,
	"status" text DEFAULT 'scheduled' NOT NULL,
	"personalized_subject" text NOT NULL,
	"personalized_content" text NOT NULL,
	"error_message" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "subscriptions" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"plan" text NOT NULL,
	"status" text NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"billing_cycle" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"email" text NOT NULL,
	"stripe_customer_id" text,
	"stripe_subscription_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "chat_sessions" ADD CONSTRAINT "chat_sessions_lead_id_leads_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "demos" ADD CONSTRAINT "demos_lead_id_leads_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "email_campaigns" ADD CONSTRAINT "email_campaigns_lead_id_leads_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "formulario_cliente" ADD CONSTRAINT "formulario_cliente_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "onboarding_surveys" ADD CONSTRAINT "onboarding_surveys_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "onboarding_surveys" ADD CONSTRAINT "onboarding_surveys_lead_id_leads_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reuniao_prospecto" ADD CONSTRAINT "reuniao_prospecto_lead_id_leads_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reuniao_prospecto" ADD CONSTRAINT "reuniao_prospecto_formulario_personalizado_id_formulario_personalizado_id_fk" FOREIGN KEY ("formulario_personalizado_id") REFERENCES "public"."formulario_personalizado"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scheduled_emails" ADD CONSTRAINT "scheduled_emails_campaign_id_email_campaigns_id_fk" FOREIGN KEY ("campaign_id") REFERENCES "public"."email_campaigns"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scheduled_emails" ADD CONSTRAINT "scheduled_emails_lead_id_leads_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scheduled_emails" ADD CONSTRAINT "scheduled_emails_template_id_email_templates_id_fk" FOREIGN KEY ("template_id") REFERENCES "public"."email_templates"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;