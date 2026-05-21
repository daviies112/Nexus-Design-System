import { 
  users, leads, chatSessions, demos, subscriptions, emailTemplates, emailCampaigns, scheduledEmails, onboardingSurveys,
  formularioPersonalizado, reuniaoProspecto, formularioCliente, pagamentoRecusado,
  type User, type InsertUser,
  type Lead, type InsertLead,
  type ChatSession, type InsertChatSession,
  type Demo, type InsertDemo,
  type Subscription, type InsertSubscription,
  type EmailTemplate, type InsertEmailTemplate,
  type EmailCampaign, type InsertEmailCampaign,
  type ScheduledEmail, type InsertScheduledEmail,
  type OnboardingSurvey, type InsertOnboardingSurvey,
  type FormularioPersonalizado, type InsertFormularioPersonalizado,
  type PagamentoRecusado, type InsertPagamentoRecusado,
  type ReuniaoProspecto, type InsertReuniaoProspecto,
  type FormularioCliente, type InsertFormularioCliente
} from "../shared/schema";
import { db } from "./db";
import { eq, desc, gte, lt, sql } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserStripeInfo(userId: string, customerId: string, subscriptionId: string): Promise<User>;
  
  // Leads
  createLead(lead: InsertLead): Promise<Lead>;
  getLeads(): Promise<Lead[]>;
  getLead(id: string): Promise<Lead | undefined>;
  updateLeadStatus(id: string, status: string): Promise<Lead>;
  getLeadsFromPeriod(daysBack: number): Promise<Lead[]>;
  
  // Chat Sessions
  createChatSession(session: InsertChatSession): Promise<ChatSession>;
  getChatSession(id: string): Promise<ChatSession | undefined>;
  updateChatMessages(id: string, messages: any): Promise<ChatSession>;
  getRecentChatSessions(limit: number): Promise<ChatSession[]>;
  
  // Demos
  createDemo(demo: InsertDemo): Promise<Demo>;
  getDemos(): Promise<Demo[]>;
  getRecentDemos(limit: number): Promise<Demo[]>;
  
  // Subscriptions
  createSubscription(subscription: InsertSubscription): Promise<Subscription>;
  getSubscription(userId: string): Promise<Subscription | undefined>;
  
  // Email Templates
  createEmailTemplate(template: InsertEmailTemplate): Promise<EmailTemplate>;
  getEmailTemplates(): Promise<EmailTemplate[]>;
  getEmailTemplate(id: string): Promise<EmailTemplate | undefined>;
  getEmailTemplateByType(type: string): Promise<EmailTemplate | undefined>;
  
  // Email Campaigns
  createEmailCampaign(campaign: InsertEmailCampaign): Promise<EmailCampaign>;
  getEmailCampaign(id: string): Promise<EmailCampaign | undefined>;
  getEmailCampaignByLead(leadId: string): Promise<EmailCampaign | undefined>;
  updateEmailCampaignMetrics(id: string, metrics: { emailsSent?: number; emailsOpened?: number; emailsClicked?: number }): Promise<EmailCampaign>;
  getActiveEmailCampaigns(): Promise<EmailCampaign[]>;
  
  // Scheduled Emails
  createScheduledEmail(email: InsertScheduledEmail): Promise<ScheduledEmail>;
  getScheduledEmail(id: string): Promise<ScheduledEmail | undefined>;
  getScheduledEmailsByLead(leadId: string): Promise<ScheduledEmail[]>;
  getEmailsToSend(): Promise<ScheduledEmail[]>;
  updateScheduledEmailStatus(id: string, status: string, sentAt?: Date, openedAt?: Date, clickedAt?: Date): Promise<ScheduledEmail>;
  
  // Onboarding Surveys
  createOnboardingSurvey(survey: InsertOnboardingSurvey): Promise<OnboardingSurvey>;
  getOnboardingSurvey(id: string): Promise<OnboardingSurvey | undefined>;
  getOnboardingSurveyByUser(userId: string): Promise<OnboardingSurvey | undefined>;
  getOnboardingSurveyByLead(leadId: string): Promise<OnboardingSurvey | undefined>;
  
  // Formulario Personalizado
  createFormularioPersonalizado(formulario: InsertFormularioPersonalizado): Promise<FormularioPersonalizado>;
  getFormularioPersonalizado(id: string): Promise<FormularioPersonalizado | undefined>;
  getFormulariosPersonalizados(): Promise<FormularioPersonalizado[]>;
  updateFormularioPersonalizadoStatus(id: string, status: string): Promise<FormularioPersonalizado>;
  
  // Reuniao Prospecto
  createReuniaoProspecto(reuniao: InsertReuniaoProspecto): Promise<ReuniaoProspecto>;
  getReuniaoProspecto(id: string): Promise<ReuniaoProspecto | undefined>;
  getReuniaoProspectoByLead(leadId: string): Promise<ReuniaoProspecto[]>;
  getReuniaoProspectoByFormulario(formularioId: string): Promise<ReuniaoProspecto[]>;
  getReunioesProspectoPorPeriodo(startDate: Date, endDate: Date): Promise<ReuniaoProspecto[]>;
  updateReuniaoProspectoStatus(id: string, status: string): Promise<ReuniaoProspecto>;
  
  // Formulario Cliente  
  createFormularioCliente(formulario: InsertFormularioCliente): Promise<FormularioCliente>;
  getFormularioCliente(id: string): Promise<FormularioCliente | undefined>;
  getFormularioClienteByUser(userId: string): Promise<FormularioCliente | undefined>;
  getFormulariosClientes(): Promise<FormularioCliente[]>;
  
  // Analytics
  getRecentActivities(limit: number): Promise<any[]>;
  getEmailCampaignMetrics(): Promise<{
    totalCampaigns: number;
    activeCampaigns: number;
    totalEmailsSent: number;
    totalEmailsOpened: number;
    totalEmailsClicked: number;
    openRate: number;
    clickRate: number;
  }>;
  getGrowthMetrics(): Promise<{
    currentMonth: {
      leads: number;
      demos: number;
      conversions: number;
      estimatedRevenue: number;
    };
    previousMonth: {
      leads: number;
      demos: number;
      conversions: number;
      estimatedRevenue: number;
    };
    growth: {
      leads: number;
      demos: number;
      conversions: number;
      revenue: number;
    };
  }>;

  // Pagamento Recusado
  createPagamentoRecusado(pagamento: InsertPagamentoRecusado): Promise<PagamentoRecusado>;
  getPagamentoRecusado(id: string): Promise<PagamentoRecusado | undefined>;
  getPagamentosRecusadosByEmail(email: string): Promise<PagamentoRecusado[]>;
  updateTentativasPagamento(id: string, tentativas: number): Promise<PagamentoRecusado>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUserStripeInfo(userId: string, customerId: string, subscriptionId: string): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ 
        stripeCustomerId: customerId,
        stripeSubscriptionId: subscriptionId 
      })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  async updateUserPassword(userId: string, hashedPassword: string): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ password: hashedPassword })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  // Leads
  async createLead(insertLead: InsertLead): Promise<Lead> {
    const [lead] = await db
      .insert(leads)
      .values(insertLead)
      .returning();
    return lead;
  }

  async getLeads(): Promise<Lead[]> {
    return await db.select().from(leads).orderBy(desc(leads.createdAt));
  }

  async getLead(id: string): Promise<Lead | undefined> {
    const [lead] = await db.select().from(leads).where(eq(leads.id, id));
    return lead || undefined;
  }

  async updateLeadStatus(id: string, status: string): Promise<Lead> {
    const [lead] = await db
      .update(leads)
      .set({ status })
      .where(eq(leads.id, id))
      .returning();
    return lead;
  }

  async getLeadsFromPeriod(daysBack: number): Promise<Lead[]> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysBack);
    
    return await db
      .select()
      .from(leads)
      .where(gte(leads.createdAt, startDate))
      .orderBy(desc(leads.createdAt));
  }

  // Chat Sessions
  async createChatSession(insertSession: InsertChatSession): Promise<ChatSession> {
    const [session] = await db
      .insert(chatSessions)
      .values(insertSession)
      .returning();
    return session;
  }

  async getChatSession(id: string): Promise<ChatSession | undefined> {
    const [session] = await db.select().from(chatSessions).where(eq(chatSessions.id, id));
    return session || undefined;
  }

  async updateChatMessages(id: string, messages: any): Promise<ChatSession> {
    const [session] = await db
      .update(chatSessions)
      .set({ messages })
      .where(eq(chatSessions.id, id))
      .returning();
    return session;
  }

  async getRecentChatSessions(limit: number): Promise<ChatSession[]> {
    return await db
      .select()
      .from(chatSessions)
      .orderBy(desc(chatSessions.createdAt))
      .limit(limit);
  }

  // Demos
  async createDemo(insertDemo: InsertDemo): Promise<Demo> {
    const [demo] = await db
      .insert(demos)
      .values(insertDemo)
      .returning();
    return demo;
  }

  async getDemos(): Promise<Demo[]> {
    return await db.select().from(demos).orderBy(desc(demos.createdAt));
  }

  async getRecentDemos(limit: number): Promise<Demo[]> {
    return await db
      .select()
      .from(demos)
      .orderBy(desc(demos.createdAt))
      .limit(limit);
  }

  // Subscriptions
  async createSubscription(insertSubscription: InsertSubscription): Promise<Subscription> {
    const [subscription] = await db
      .insert(subscriptions)
      .values(insertSubscription)
      .returning();
    return subscription;
  }

  async getSubscription(userId: string): Promise<Subscription | undefined> {
    const [subscription] = await db.select().from(subscriptions).where(eq(subscriptions.userId, userId));
    return subscription || undefined;
  }

  // Email Templates
  async createEmailTemplate(insertTemplate: InsertEmailTemplate): Promise<EmailTemplate> {
    const [template] = await db
      .insert(emailTemplates)
      .values(insertTemplate)
      .returning();
    return template;
  }

  async getEmailTemplates(): Promise<EmailTemplate[]> {
    return await db.select().from(emailTemplates).orderBy(emailTemplates.delayDays);
  }

  async getEmailTemplate(id: string): Promise<EmailTemplate | undefined> {
    const [template] = await db.select().from(emailTemplates).where(eq(emailTemplates.id, id));
    return template || undefined;
  }

  async getEmailTemplateByType(type: string): Promise<EmailTemplate | undefined> {
    const [template] = await db.select().from(emailTemplates).where(eq(emailTemplates.templateType, type));
    return template || undefined;
  }

  // Email Campaigns
  async createEmailCampaign(insertCampaign: InsertEmailCampaign): Promise<EmailCampaign> {
    const [campaign] = await db
      .insert(emailCampaigns)
      .values(insertCampaign)
      .returning();
    return campaign;
  }

  async getEmailCampaign(id: string): Promise<EmailCampaign | undefined> {
    const [campaign] = await db.select().from(emailCampaigns).where(eq(emailCampaigns.id, id));
    return campaign || undefined;
  }

  async getEmailCampaignByLead(leadId: string): Promise<EmailCampaign | undefined> {
    const [campaign] = await db.select().from(emailCampaigns).where(eq(emailCampaigns.leadId, leadId));
    return campaign || undefined;
  }

  async updateEmailCampaignMetrics(id: string, metrics: { emailsSent?: number; emailsOpened?: number; emailsClicked?: number }): Promise<EmailCampaign> {
    const [campaign] = await db
      .update(emailCampaigns)
      .set(metrics)
      .where(eq(emailCampaigns.id, id))
      .returning();
    return campaign;
  }

  async getActiveEmailCampaigns(): Promise<EmailCampaign[]> {
    return await db.select().from(emailCampaigns).where(eq(emailCampaigns.status, 'active'));
  }

  // Scheduled Emails
  async createScheduledEmail(insertEmail: InsertScheduledEmail): Promise<ScheduledEmail> {
    const [email] = await db
      .insert(scheduledEmails)
      .values(insertEmail)
      .returning();
    return email;
  }

  async getScheduledEmail(id: string): Promise<ScheduledEmail | undefined> {
    const [email] = await db.select().from(scheduledEmails).where(eq(scheduledEmails.id, id));
    return email || undefined;
  }

  async getScheduledEmailsByLead(leadId: string): Promise<ScheduledEmail[]> {
    return await db.select().from(scheduledEmails).where(eq(scheduledEmails.leadId, leadId)).orderBy(scheduledEmails.scheduledAt);
  }

  async getEmailsToSend(): Promise<ScheduledEmail[]> {
    const now = new Date();
    return await db
      .select()
      .from(scheduledEmails)
      .where(
        sql`${scheduledEmails.status} = 'scheduled' AND ${scheduledEmails.scheduledAt} <= ${now}`
      )
      .orderBy(scheduledEmails.scheduledAt);
  }

  async updateScheduledEmailStatus(id: string, status: string, sentAt?: Date, openedAt?: Date, clickedAt?: Date): Promise<ScheduledEmail> {
    const updateData: any = { status };
    if (sentAt) updateData.sentAt = sentAt;
    if (openedAt) updateData.openedAt = openedAt;
    if (clickedAt) updateData.clickedAt = clickedAt;

    const [email] = await db
      .update(scheduledEmails)
      .set(updateData)
      .where(eq(scheduledEmails.id, id))
      .returning();
    return email;
  }

  // Onboarding Surveys
  async createOnboardingSurvey(insertSurvey: InsertOnboardingSurvey): Promise<OnboardingSurvey> {
    const [survey] = await db
      .insert(onboardingSurveys)
      .values(insertSurvey)
      .returning();
    return survey;
  }

  async getOnboardingSurvey(id: string): Promise<OnboardingSurvey | undefined> {
    const [survey] = await db.select().from(onboardingSurveys).where(eq(onboardingSurveys.id, id));
    return survey || undefined;
  }

  async getOnboardingSurveyByUser(userId: string): Promise<OnboardingSurvey | undefined> {
    const [survey] = await db.select().from(onboardingSurveys).where(eq(onboardingSurveys.userId, userId));
    return survey || undefined;
  }

  async getOnboardingSurveyByLead(leadId: string): Promise<OnboardingSurvey | undefined> {
    const [survey] = await db.select().from(onboardingSurveys).where(eq(onboardingSurveys.leadId, leadId));
    return survey || undefined;
  }

  async getEmailCampaignMetrics(): Promise<{
    totalCampaigns: number;
    activeCampaigns: number;
    totalEmailsSent: number;
    totalEmailsOpened: number;
    totalEmailsClicked: number;
    openRate: number;
    clickRate: number;
  }> {
    // Get campaign stats
    const campaigns = await db.select().from(emailCampaigns);
    const activeCampaigns = campaigns.filter(c => c.status === 'active');
    
    // Aggregate metrics
    const totalEmailsSent = campaigns.reduce((sum, c) => sum + c.emailsSent, 0);
    const totalEmailsOpened = campaigns.reduce((sum, c) => sum + c.emailsOpened, 0);
    const totalEmailsClicked = campaigns.reduce((sum, c) => sum + c.emailsClicked, 0);
    
    const openRate = totalEmailsSent > 0 ? (totalEmailsOpened / totalEmailsSent) * 100 : 0;
    const clickRate = totalEmailsSent > 0 ? (totalEmailsClicked / totalEmailsSent) * 100 : 0;
    
    return {
      totalCampaigns: campaigns.length,
      activeCampaigns: activeCampaigns.length,
      totalEmailsSent,
      totalEmailsOpened,
      totalEmailsClicked,
      openRate: Math.round(openRate * 100) / 100,
      clickRate: Math.round(clickRate * 100) / 100
    };
  }

  // Analytics methods
  async getRecentActivities(limit: number): Promise<any[]> {
    const activities: any[] = [];
    
    // Get recent leads (conversations)
    const recentLeads = await db
      .select({
        id: leads.id,
        name: leads.name,
        createdAt: leads.createdAt,
        score: leads.score
      })
      .from(leads)
      .orderBy(desc(leads.createdAt))
      .limit(Math.ceil(limit / 3));
    
    recentLeads.forEach(lead => {
      activities.push({
        id: `lead_${lead.id}`,
        type: 'lead',
        icon: 'fas fa-message',
        color: 'text-primary',
        bgColor: 'bg-primary',
        title: 'Novo lead qualificado',
        description: `${lead.name} - Score: ${lead.score}`,
        time: this.formatTimeAgo(lead.createdAt),
        timestamp: lead.createdAt
      });
    });

    // Get recent demos (appointments)
    const recentDemos = await db
      .select({
        id: demos.id,
        leadId: demos.leadId,
        scheduledDate: demos.scheduledDate,
        createdAt: demos.createdAt,
        status: demos.status
      })
      .from(demos)
      .orderBy(desc(demos.createdAt))
      .limit(Math.ceil(limit / 3));
    
    for (const demo of recentDemos) {
      // Get lead name for demo
      const [lead] = await db.select({ name: leads.name }).from(leads).where(eq(leads.id, demo.leadId));
      const leadName = lead?.name || 'Cliente';
      
      activities.push({
        id: `demo_${demo.id}`,
        type: 'agendamento',
        icon: 'fas fa-calendar-plus',
        color: 'text-accent',
        bgColor: 'bg-accent',
        title: demo.status === 'completed' ? 'Demo realizada' : 'Demo agendada',
        description: `${leadName} - ${this.formatDate(demo.scheduledDate)}`,
        time: this.formatTimeAgo(demo.createdAt),
        timestamp: demo.createdAt
      });
    }

    // Get recent chat sessions (conversations)
    const recentChats = await db
      .select({
        id: chatSessions.id,
        leadId: chatSessions.leadId,
        createdAt: chatSessions.createdAt,
        messages: chatSessions.messages
      })
      .from(chatSessions)
      .orderBy(desc(chatSessions.createdAt))
      .limit(Math.ceil(limit / 3));
    
    for (const chat of recentChats) {
      let leadName = 'Visitante';
      if (chat.leadId) {
        const [lead] = await db.select({ name: leads.name }).from(leads).where(eq(leads.id, chat.leadId));
        leadName = lead?.name || 'Cliente';
      }
      
      activities.push({
        id: `chat_${chat.id}`,
        type: 'conversa',
        icon: 'fas fa-comments',
        color: 'text-blue-500',
        bgColor: 'bg-blue-500',
        title: 'Nova conversa iniciada',
        description: `${leadName} - Chat assistido por IA`,
        time: this.formatTimeAgo(chat.createdAt),
        timestamp: chat.createdAt
      });
    }

    // Sort all activities by timestamp and return limited results
    return activities
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
  }

  async getGrowthMetrics() {
    const now = new Date();
    const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfPreviousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfPreviousMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    // Current month data
    const currentMonthLeads = await db
      .select()
      .from(leads)
      .where(gte(leads.createdAt, startOfCurrentMonth));
    
    const currentMonthDemos = await db
      .select()
      .from(demos)
      .where(gte(demos.createdAt, startOfCurrentMonth));

    // Previous month data
    const previousMonthLeads = await db
      .select()
      .from(leads)
      .where(
        sql`${leads.createdAt} >= ${startOfPreviousMonth} AND ${leads.createdAt} <= ${endOfPreviousMonth}`
      );
    
    const previousMonthDemos = await db
      .select()
      .from(demos)
      .where(
        sql`${demos.createdAt} >= ${startOfPreviousMonth} AND ${demos.createdAt} <= ${endOfPreviousMonth}`
      );

    // Calculate metrics
    const currentLeadsCount = currentMonthLeads.length;
    const currentDemosCount = currentMonthDemos.length;
    const currentConversions = currentLeadsCount > 0 ? (currentDemosCount / currentLeadsCount) * 100 : 0;
    const currentRevenue = this.calculateEstimatedRevenue(currentMonthLeads, currentMonthDemos);

    const previousLeadsCount = previousMonthLeads.length;
    const previousDemosCount = previousMonthDemos.length;
    const previousConversions = previousLeadsCount > 0 ? (previousDemosCount / previousLeadsCount) * 100 : 0;
    const previousRevenue = this.calculateEstimatedRevenue(previousMonthLeads, previousMonthDemos);

    // Calculate growth percentages
    const leadsGrowth = previousLeadsCount > 0 ? ((currentLeadsCount - previousLeadsCount) / previousLeadsCount) * 100 : 0;
    const demosGrowth = previousDemosCount > 0 ? ((currentDemosCount - previousDemosCount) / previousDemosCount) * 100 : 0;
    const conversionsGrowth = previousConversions > 0 ? ((currentConversions - previousConversions) / previousConversions) * 100 : 0;
    const revenueGrowth = previousRevenue > 0 ? ((currentRevenue - previousRevenue) / previousRevenue) * 100 : 0;

    return {
      currentMonth: {
        leads: currentLeadsCount,
        demos: currentDemosCount,
        conversions: Math.round(currentConversions * 100) / 100,
        estimatedRevenue: Math.round(currentRevenue)
      },
      previousMonth: {
        leads: previousLeadsCount,
        demos: previousDemosCount,
        conversions: Math.round(previousConversions * 100) / 100,
        estimatedRevenue: Math.round(previousRevenue)
      },
      growth: {
        leads: Math.round(leadsGrowth),
        demos: Math.round(demosGrowth),
        conversions: Math.round(conversionsGrowth),
        revenue: Math.round(revenueGrowth)
      }
    };
  }

  // Helper methods
  private formatTimeAgo(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return 'agora';
    if (diffMins < 60) return `${diffMins} min atrás`;
    if (diffHours < 24) return `${diffHours}h atrás`;
    return `${diffDays} dias atrás`;
  }

  private formatDate(date: Date): string {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  private calculateEstimatedRevenue(leads: Lead[], demos: Demo[]): number {
    // Base estimation: Average ticket value based on lead quality score
    // High score leads (80+): R$ 2,000 average
    // Medium score leads (50-79): R$ 800 average  
    // Low score leads (<50): R$ 400 average
    // Demo conversion adds 20% probability of closing
    
    let estimatedRevenue = 0;
    
    for (const lead of leads) {
      let ticketValue = 400; // Base value for low score leads
      if (lead.score >= 80) ticketValue = 2000;
      else if (lead.score >= 50) ticketValue = 800;
      
      // Base probability of closing without demo: 15%
      let closingProbability = 0.15;
      
      // Check if lead has scheduled demo (increases closing probability to 35%)
      const hasDemo = demos.some(demo => demo.leadId === lead.id);
      if (hasDemo) {
        closingProbability = 0.35;
      }
      
      estimatedRevenue += ticketValue * closingProbability;
    }
    
    return estimatedRevenue;
  }

  // Formulario Personalizado methods
  async createFormularioPersonalizado(insertFormulario: InsertFormularioPersonalizado): Promise<FormularioPersonalizado> {
    const [formulario] = await db
      .insert(formularioPersonalizado)
      .values(insertFormulario)
      .returning();
    return formulario;
  }

  async getFormularioPersonalizado(id: string): Promise<FormularioPersonalizado | undefined> {
    const [formulario] = await db.select().from(formularioPersonalizado).where(eq(formularioPersonalizado.id, id));
    return formulario || undefined;
  }

  async getFormulariosPersonalizados(): Promise<FormularioPersonalizado[]> {
    return await db.select().from(formularioPersonalizado).orderBy(desc(formularioPersonalizado.createdAt));
  }

  async updateFormularioPersonalizadoStatus(id: string, status: string): Promise<FormularioPersonalizado> {
    const [formulario] = await db
      .update(formularioPersonalizado)
      .set({ status })
      .where(eq(formularioPersonalizado.id, id))
      .returning();
    return formulario;
  }

  // Reuniao Prospecto methods
  async createReuniaoProspecto(insertReuniao: InsertReuniaoProspecto): Promise<ReuniaoProspecto> {
    const [reuniao] = await db
      .insert(reuniaoProspecto)
      .values(insertReuniao)
      .returning();
    return reuniao;
  }

  async getReuniaoProspecto(id: string): Promise<ReuniaoProspecto | undefined> {
    const [reuniao] = await db.select().from(reuniaoProspecto).where(eq(reuniaoProspecto.id, id));
    return reuniao || undefined;
  }

  async getReuniaoProspectoByLead(leadId: string): Promise<ReuniaoProspecto[]> {
    return await db.select().from(reuniaoProspecto).where(eq(reuniaoProspecto.leadId, leadId)).orderBy(desc(reuniaoProspecto.createdAt));
  }

  async getReuniaoProspectoByFormulario(formularioId: string): Promise<ReuniaoProspecto[]> {
    return await db.select().from(reuniaoProspecto).where(eq(reuniaoProspecto.formularioPersonalizadoId, formularioId)).orderBy(desc(reuniaoProspecto.createdAt));
  }

  async getReunioesProspectoPorPeriodo(startDate: Date, endDate: Date): Promise<ReuniaoProspecto[]> {
    return await db.select().from(reuniaoProspecto)
      .where(
        sql`${reuniaoProspecto.dataAgendada} >= ${startDate} AND ${reuniaoProspecto.dataAgendada} <= ${endDate}`
      )
      .orderBy(reuniaoProspecto.dataAgendada);
  }

  async updateReuniaoProspectoStatus(id: string, status: string): Promise<ReuniaoProspecto> {
    const [reuniao] = await db
      .update(reuniaoProspecto)
      .set({ status, updatedAt: new Date() })
      .where(eq(reuniaoProspecto.id, id))
      .returning();
    return reuniao;
  }

  // Formulario Cliente methods
  async createFormularioCliente(insertFormulario: InsertFormularioCliente): Promise<FormularioCliente> {
    const [formulario] = await db
      .insert(formularioCliente)
      .values(insertFormulario)
      .returning();
    return formulario;
  }

  async getFormularioCliente(id: string): Promise<FormularioCliente | undefined> {
    const [formulario] = await db.select().from(formularioCliente).where(eq(formularioCliente.id, id));
    return formulario || undefined;
  }

  async getFormularioClienteByUser(userId: string): Promise<FormularioCliente | undefined> {
    const [formulario] = await db.select().from(formularioCliente).where(eq(formularioCliente.userId, userId));
    return formulario || undefined;
  }

  async getFormulariosClientes(): Promise<FormularioCliente[]> {
    return await db.select().from(formularioCliente).orderBy(desc(formularioCliente.createdAt));
  }

  // Pagamento Recusado methods
  async createPagamentoRecusado(insertPagamento: InsertPagamentoRecusado): Promise<PagamentoRecusado> {
    const [pagamento] = await db
      .insert(pagamentoRecusado)
      .values(insertPagamento)
      .returning();
    return pagamento;
  }

  async getPagamentoRecusado(id: string): Promise<PagamentoRecusado | undefined> {
    const [pagamento] = await db.select().from(pagamentoRecusado).where(eq(pagamentoRecusado.id, id));
    return pagamento || undefined;
  }

  async getPagamentosRecusadosByEmail(email: string): Promise<PagamentoRecusado[]> {
    return await db.select().from(pagamentoRecusado).where(eq(pagamentoRecusado.email, email)).orderBy(desc(pagamentoRecusado.createdAt));
  }

  async updateTentativasPagamento(id: string, tentativas: number): Promise<PagamentoRecusado> {
    const [pagamento] = await db
      .update(pagamentoRecusado)
      .set({ tentativas, updatedAt: new Date() })
      .where(eq(pagamentoRecusado.id, id))
      .returning();
    return pagamento;
  }
}

export const storage = new DatabaseStorage();
