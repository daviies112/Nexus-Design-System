import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import { storage } from "./storage";
import { createLeadSchema, insertChatSessionSchema, insertDemoSchema, insertOnboardingSurveySchema, insertPagamentoRecusadoSchema } from "../shared/schema";
import { googleCalendarService } from "./google-calendar";
import { sendEmail } from "./sendgrid";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Rate limiting removed for serverless compatibility
// Vercel provides built-in rate limiting and DDoS protection
// Enhanced intelligence system for chat
interface ConversationState {
  phase: 'introduction' | 'discovery' | 'qualification' | 'objections' | 'closing' | 'demo_booking';
  businessType?: string;
  painPoints?: string[];
  leadScore?: number;
  lastIntent?: string;
  roiData?: any;
}

interface UserIntent {
  category: 'pricing' | 'demo' | 'roi' | 'objection' | 'qualification' | 'technical' | 'closing' | 'greeting' | 'business_type';
  confidence: number;
  entities: string[];
  businessType?: string;
  painPoint?: string;
}

// Advanced intent detection using multiple signals
const detectUserIntent = (message: string, conversationHistory: any[] = []): UserIntent => {
  const text = message.toLowerCase();
  
  // Pricing intent patterns
  const pricingPatterns = [
    /preço|valor|custa|caro|barato|investimento|mensalidade|plano/,
    /quanto (custa|é|fica)|valor do|preço do/,
    /orçamento|cotação|proposta comercial/
  ];
  
  // Demo/functionality intent patterns
  const demoPatterns = [
    /demo|demonstração|como funciona|ver funcionando|teste/,
    /mostrar|apresentar|conhecer|testar/,
    /exemplo|agendar|reunião|apresentação/
  ];
  
  // ROI/results intent patterns
  const roiPatterns = [
    /resultado|roi|retorno|economia|economizar/,
    /quanto vou ganhar|vale a pena|compensa/,
    /case|caso de sucesso|cliente|referência/
  ];
  
  // Business type detection
  const businessTypes = {
    'clinica': /clínica|médico|dentista|fisioterapeuta|psicólogo|saúde/,
    'escritorio': /advogado|contabilidade|escritório|consultoria|auditoria/,
    'ecommerce': /loja|e-commerce|vendas online|marketplace|produto/,
    'imobiliaria': /imóvel|corretor|imobiliária|apartamento|casa/,
    'agencia': /agência|marketing|publicidade|design|criativo/,
    'servicos': /serviço|manutenção|reforma|instalação|técnico/,
    'educacao': /escola|curso|educação|ensino|professor|faculdade/,
    'consultoria': /consultor|consultoria|coach|mentoria|treinamento/
  };
  
  // Objection detection
  const objectionPatterns = {
    'price': /caro|muito dinheiro|não tenho|orçamento apertado/,
    'complexity': /complexo|difícil|complicado|não entendo/,
    'time': /não tenho tempo|corrido|ocupado/,
    'trust': /não confio|não acredito|golpe|enganação/,
    'competitors': /concorrente|outro sistema|já uso/
  };
  
  // Check for business type
  let businessType;
  for (const [type, pattern] of Object.entries(businessTypes)) {
    if (pattern.test(text)) {
      businessType = type;
      break;
    }
  }
  
  // Check for pain points
  let painPoint;
  if (/perco lead|não respondo|demora|24h|fim de semana/.test(text)) painPoint = 'response_time';
  else if (/não consigo agendar|agenda|calendário/.test(text)) painPoint = 'scheduling';
  else if (/muito manual|perco tempo|repetitivo/.test(text)) painPoint = 'automation';
  else if (/não sei qualificar|lead ruim|perco tempo/.test(text)) painPoint = 'qualification';
  
  // Determine intent with confidence scoring
  if (pricingPatterns.some(p => p.test(text))) {
    return { category: 'pricing', confidence: 0.9, entities: [], businessType, painPoint };
  }
  
  if (demoPatterns.some(p => p.test(text))) {
    return { category: 'demo', confidence: 0.9, entities: [], businessType, painPoint };
  }
  
  if (roiPatterns.some(p => p.test(text))) {
    return { category: 'roi', confidence: 0.9, entities: [], businessType, painPoint };
  }
  
  // Check for objections
  for (const [type, pattern] of Object.entries(objectionPatterns)) {
    if (pattern.test(text)) {
      return { category: 'objection', confidence: 0.8, entities: [type], businessType, painPoint };
    }
  }
  
  // Greeting patterns
  if (/olá|oi|bom dia|boa tarde|boa noite|preciso de ajuda/.test(text)) {
    return { category: 'greeting', confidence: 0.7, entities: [], businessType, painPoint };
  }
  
  // Business type inquiry
  if (businessType) {
    return { category: 'business_type', confidence: 0.8, entities: [businessType], businessType, painPoint };
  }
  
  // Qualification patterns
  if (/quantos lead|volume|recebo|por mês|whatsapp/.test(text)) {
    return { category: 'qualification', confidence: 0.8, entities: [], businessType, painPoint };
  }
  
  return { category: 'greeting', confidence: 0.5, entities: [], businessType, painPoint };
};

// Generate intelligent responses based on intent and context
const generateContextualResponse = (intent: UserIntent, state: ConversationState, conversationHistory: any[] = []): { response: string, newState: ConversationState, quickReplies?: string[] } => {
  const newState = { ...state };
  
  // Update state based on detected information
  if (intent.businessType) newState.businessType = intent.businessType;
  if (intent.painPoint) {
    if (!newState.painPoints) newState.painPoints = [];
    if (!newState.painPoints.includes(intent.painPoint)) {
      newState.painPoints.push(intent.painPoint);
    }
  }
  newState.lastIntent = intent.category;
  
  let response = "";
  let quickReplies: string[] = [];
  
  switch (intent.category) {
    case 'greeting':
      if (state.phase === 'introduction') {
        response = "Olá! 👋 Sou especialista em automação WhatsApp da Secretária IA. Ajudo empresas a converter mais leads em clientes. \n\nQual é o seu tipo de negócio?";
        quickReplies = ["Clínica/Consultório", "E-commerce", "Imobiliária", "Agência", "Outro"];
        newState.phase = 'discovery';
      }
      break;
      
    case 'business_type':
      const businessResponses = {
        'clinica': "Perfeito! Trabalho muito com clínicas. Dr. Silva, por exemplo, aumentou seus agendamentos de 23 para 67 por mês com nossa automação. \n\nQual seu maior desafio: perder leads fora do horário ou dificuldade para agendar?",
        'ecommerce': "Ótimo! E-commerces que automatizam WhatsApp vendem 73% mais. A Loja do João aumentou o ticket médio em R$ 340 só com follow-up automático. \n\nSeu maior problema é abandono de carrinho ou leads que não convertem?",
        'imobiliaria': "Excelente! Imobiliárias perdem 68% dos leads em 10 minutos. A Imóveis Premium fechou 12 vendas extras só no primeiro mês. \n\nO que mais te preocupa: leads frios ou dificuldade para agendar visitas?",
        'agencia': "Show! Agências que automatizam WhatsApp conseguem mais clientes e entregam melhor. A Agência Digital dobrou os leads qualificados. \n\nSeu gargalo é geração de leads ou qualificação dos prospects?"
      };
      
      response = businessResponses[intent.businessType as keyof typeof businessResponses] || 
                "Entendi! Independente do segmento, a automação WhatsApp pode revolucionar seus resultados. \n\nQue tipo de desafio você enfrenta com leads hoje?";
      
      quickReplies = ["Perco muitos leads", "Demoro para responder", "Difícil agendar", "Leads não qualificados"];
      newState.phase = 'qualification';
      break;
      
    case 'pricing':
      if (!state.businessType) {
        response = "Antes de falar sobre investimento, preciso entender seu negócio para calcular seu ROI real. \n\nQual seu tipo de empresa?";
        quickReplies = ["Clínica", "E-commerce", "Imobiliária", "Agência", "Outro"];
      } else {
        response = `Nossos planos começam em R$ 297/mês, mas antes de falar sobre investimento, que tal calculamos quanto você está PERDENDO sem automação? \n\n${state.businessType === 'clinica' ? 'Clínicas' : 'Empresas do seu segmento'} perdem em média R$ 2.847/mês sem automação. \n\nQuantos leads você recebe por WhatsApp mensalmente?`;
        quickReplies = ["10-30 leads", "30-100 leads", "100+ leads", "Não sei ao certo"];
      }
      newState.phase = 'qualification';
      break;
      
    case 'roi':
      response = "Excelente pergunta! 📊 Nossos clientes documentam ROI médio de 156% em 90 dias. \n\n" +
                (state.businessType === 'clinica' ? "Dr. Silva economizou R$ 2.200/mês só em salário de recepcionista e aumentou agendamentos em 187%." : 
                 "Empresas similares à sua economizam em média R$ 2.847/mês e aumentam conversões em 73%.") +
                "\n\nQuer que eu calcule seu ROI específico? Preciso saber quantos leads você recebe mensalmente.";
      quickReplies = ["Calcular meu ROI", "Ver casos de sucesso", "Agendar demonstração"];
      newState.phase = 'qualification';
      break;
      
    case 'demo':
      response = "Claro! Nossa demonstração personalizada mostra exatamente como a automação funcionaria no seu negócio. \n\n" +
                "Em 15 minutos você verá: \n• Como automatizar o primeiro contato \n• Sistema de qualificação inteligente \n• Agendamento automático \n• Follow-ups que convertem \n\n" +
                "Qual melhor horário para você?";
      quickReplies = ["Manhã (9h-12h)", "Tarde (14h-17h)", "Prefiro escolher"];
      newState.phase = 'demo_booking';
      break;
      
    case 'objection':
      const objectionResponses = {
        'price': "Entendo a preocupação com investimento. Mas veja: se você perde apenas 5 leads por mês por demora na resposta, já são R$ 1.500+ de prejuízo (considerando ticket médio R$ 300). \n\nNosso sistema se paga em menos de 15 dias. Quer calcular seu ROI real?",
        'complexity': "Que bom que perguntou! Nossa solução é plug-and-play. Em 2 horas está funcionando. O Dr. Silva disse: 'Pensei que seria complicado, mas em 1 dia já estava respondendo sozinho'. \n\nQuer ver como é simples na prática?",
        'time': "Perfeito! Justamente para pessoas ocupadas como você que criamos a automação. Você ganha 40h/mês que gastava respondendo WhatsApp. \n\nImplementação é em 2h e depois funciona sozinho. Vale a pena ver, não acha?",
        'trust': "Compreendo totalmente! Por isso oferecemos garantia de funcionamento - cancelamento livre a qualquer momento. Mais de 300 empresas já economizam milhares mensalmente. \n\nQue tal começar agora? Setup em até 24h.",
        'competitors': "Interessante! Qual sistema você usa? Posso mostrar nossa comparação. Geralmente migramos clientes de outros sistemas porque oferecemos 3x mais automações pelo mesmo preço. \n\nQuer ver as diferenças?"
      };
      
      const objectionType = intent.entities[0] || 'price';
      response = objectionResponses[objectionType as keyof typeof objectionResponses];
      quickReplies = ["Quero calcular ROI", "Ver demonstração", "Começar agora"];
      break;
      
    case 'qualification':
      response = "Perfeito! Com essas informações consigo calcular seu ROI personalizado. \n\n" +
                "Com base no SEBRAE: 68% dos leads são perdidos após 10 min sem resposta. \n\n" +
                "Você provavelmente está perdendo R$ 1.500-3.000/mês. \n\nQuer ver o cálculo detalhado do seu caso?";
      quickReplies = ["Sim, calcular ROI", "Agendar demonstração", "Ver casos similares"];
      newState.phase = 'closing';
      break;
      
    default:
      response = "Sou especialista em automação WhatsApp que pode revolucionar seus resultados. \n\n" +
                "O que mais te interessa saber: preços, demonstração ou casos de sucesso?";
      quickReplies = ["Ver preços", "Agendar demo", "Casos de sucesso"];
  }
  
  return { response, newState, quickReplies };
};

// Mock sentiment analysis (keeping for compatibility)
const analyzeSentiment = async (text: string) => {
  const positiveWords = ['ótimo', 'excelente', 'bom', 'interessante', 'quero', 'preciso', 'sim', 'perfeito'];
  const negativeWords = ['ruim', 'caro', 'não', 'impossível', 'difícil', 'complicado'];
  
  const lowerText = text.toLowerCase();
  const hasPositive = positiveWords.some(word => lowerText.includes(word));
  const hasNegative = negativeWords.some(word => lowerText.includes(word));
  
  let rating = 3;
  if (hasPositive && !hasNegative) rating = 4;
  if (hasPositive && hasNegative) rating = 3;
  if (!hasPositive && hasNegative) rating = 2;
  if (hasPositive && (lowerText.includes('ótimo') || lowerText.includes('excelente'))) rating = 5;
  
  return { rating, confidence: 0.8 };
};

// Database-only available slots generation (without Google Calendar dependency)
const generateDatabaseAvailableSlots = async (startDate: string, endDate: string, slotDurationMinutes: number = 30) => {
  interface AvailableSlot {
    date: string; // YYYY-MM-DD format
    timeSlot: string; // HH:MM-HH:MM format
    available: boolean;
  }

  const slots: AvailableSlot[] = [];
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  // Business hours: 09:00 to 17:30 (last slot starts at 17:00)
  const businessStart = 9; // 9 AM
  const businessEnd = 17; // 5 PM (last slot starts at 17:00, ends at 17:30)
  
  // Get all existing meetings from database in the date range
  const existingMeetings = await storage.getReunioesProspectoPorPeriodo(start, end);
  
  const current = new Date(start);
  
  while (current <= end) {
    // Skip weekends
    const dayOfWeek = current.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Not Sunday or Saturday
      const dateStr = current.toISOString().split('T')[0]; // YYYY-MM-DD
      
      // Generate slots for this day
      for (let hour = businessStart; hour <= businessEnd; hour++) {
        for (let minute = 0; minute < 60; minute += slotDurationMinutes) {
          // Skip the last slot if it would go beyond business hours
          if (hour === businessEnd && minute > 0) {
            break;
          }
          
          const startTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
          const endMinute = minute + slotDurationMinutes;
          const endHour = endMinute >= 60 ? hour + 1 : hour;
          const finalMinute = endMinute >= 60 ? endMinute - 60 : endMinute;
          const endTime = `${endHour.toString().padStart(2, '0')}:${finalMinute.toString().padStart(2, '0')}`;
          
          const timeSlot = `${startTime}-${endTime}`;
          
          // Check for conflicts with existing meetings
          const slotStart = new Date(`${dateStr}T${startTime}:00`);
          const slotEnd = new Date(`${dateStr}T${endTime}:00`);
          
          const hasConflict = existingMeetings.some(meeting => {
            const meetingStart = new Date(meeting.dataAgendada);
            const meetingEnd = new Date(meetingStart.getTime() + (meeting.duracao * 60000)); // Add duration in milliseconds
            
            // Check if there's any overlap
            return (slotStart < meetingEnd && slotEnd > meetingStart);
          });
          
          slots.push({
            date: dateStr,
            timeSlot,
            available: !hasConflict
          });
        }
      }
    }
    
    // Move to next day
    current.setDate(current.getDate() + 1);
  }
  
  return slots;
};

// Initialize Stripe with secret key
const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
}) : null;

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Core system initialization
  
  // Lead qualification and scoring with rate limiting and LGPD compliance
  app.post("/api/leads", async (req, res) => {
    try {
      // Prepare data with enhanced LGPD compliance  
      const leadData = {
        ...req.body,
        lgpdConsentDate: new Date() // Automatically set consent timestamp
      };
      
      // Ensure LGPD consent was provided
      if (!leadData.lgpdConsent) {
        return res.status(400).json({ 
          message: "Consentimento LGPD é obrigatório para processar seus dados"
        });
      }
      
      // Calculate lead score based on qualification answers
      let score = 0;
      
      // Company size scoring
      if (leadData.companySize === "small") score += 25;
      else if (leadData.companySize === "medium") score += 35;
      else if (leadData.companySize === "large") score += 30;
      else score += 15; // solo
      
      // Revenue scoring
      if (leadData.revenue === "medium") score += 30;
      else if (leadData.revenue === "high") score += 35;
      else if (leadData.revenue === "enterprise") score += 25;
      else score += 10; // low
      
      // Volume scoring
      if (leadData.leadsVolume === "medium") score += 25;
      else if (leadData.leadsVolume === "high") score += 30;
      else if (leadData.leadsVolume === "enterprise") score += 15;
      else score += 10; // low
      
      // Timeline urgency scoring
      if (leadData.timeline === "immediate") score += 20;
      else if (leadData.timeline === "month") score += 15;
      else if (leadData.timeline === "quarter") score += 10;
      else score += 5; // exploring
      
      // Create complete lead object with calculated score
      const leadForInsert = { 
        ...leadData, 
        score,
        lgpdConsent: true,
        lgpdConsentDate: new Date()
      };
      
      const lead = await storage.createLead(leadForInsert);
      
      // Lead qualified and stored successfully
      
      // Return limited data without exposing all PII
      res.json({ 
        id: lead.id, 
        score: lead.score, 
        status: lead.status,
        message: "Qualificação enviada com sucesso! Sua proposta personalizada será enviada em até 2 horas."
      });
    } catch (error: any) {
      res.status(400).json({ message: "Error creating lead: " + error.message });
    }
  });

  // REMOVED: GET /api/leads endpoint for security - PII data should not be exposed
  // Analytics endpoint provides summary data without exposing personal information

  // Stripe configuration endpoint
  app.get("/api/stripe-config", async (req, res) => {
    const publicKey = process.env.VITE_STRIPE_PUBLIC_KEY;
    if (!publicKey) {
      return res.status(500).json({ message: "Stripe não configurado" });
    }
    res.json({ publicKey });
  });

  // Stripe payment endpoints (requires STRIPE_SECRET_KEY)
  app.post("/api/create-payment-intent", async (req, res) => {
    if (!stripe) {
      return res.status(500).json({ message: "Stripe não configurado. Configure STRIPE_SECRET_KEY." });
    }
    
    try {
      // Server-side pricing enforcement - NEVER trust client amounts
      const { plan_id = "prata", billing_cycle = "monthly", coupon_code, coupon_discount = 0 } = req.body;
      
      // Match the frontend plan structure
      const serverPlans = {
        bronze: { amount: 197, description: "Bronze - Setup Rápido" },
        prata: { amount: 497, description: "Prata - IA + Agenda" },
        ouro: { amount: 697, description: "Ouro - Automação Completa" }
      };
      
      const selectedPlan = serverPlans[plan_id as keyof typeof serverPlans];
      if (!selectedPlan) {
        return res.status(400).json({ message: "Plano inválido. Use: bronze, prata ou ouro." });
      }
      
      // Calculate price with annual discount if applicable
      let basePrice = selectedPlan.amount;
      if (billing_cycle === 'annual') {
        basePrice = Math.round(selectedPlan.amount * 12 * 0.75); // Annual price (12 months) with 25% discount
      }
      
      // Apply coupon discount
      const validCoupons: Record<string, number> = {
        'BEMVINDO20': 20,
        'SAVE15': 15,
        'DESCONTO10': 10,
        'PRIMEIRO': 25,
        'NATAL20': 20,
        'BLACKFRIDAY': 30
      };
      
      let discount = 0;
      if (coupon_code && validCoupons[coupon_code.toUpperCase()]) {
        discount = validCoupons[coupon_code.toUpperCase()];
      }
      
      const finalAmount = Math.round(basePrice * (1 - discount / 100));
      const amountInCents = finalAmount * 100; // Convert to cents for Stripe
      
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: "brl",
        description: `${selectedPlan.description} - ${billing_cycle === 'annual' ? 'Anual' : 'Mensal'}`,
        metadata: {
          source: "secretaria_ai_platform",
          plan_id: plan_id,
          billing_cycle: billing_cycle,
          coupon_code: coupon_code || '',
          coupon_discount: discount.toString(),
          original_amount: selectedPlan.amount.toString(),
          final_amount: finalAmount.toString()
        }
      });
      
      res.json({ 
        clientSecret: paymentIntent.client_secret,
        amount: finalAmount,
        description: selectedPlan.description,
        metadata: {
          plan_id,
          billing_cycle,
          coupon_applied: discount > 0,
          coupon_discount: discount
        }
      });
    } catch (error: any) {
      console.error("Stripe payment intent error:", error);
      res.status(500).json({ message: "Erro ao criar pagamento: " + error.message });
    }
  });

  app.post("/api/create-subscription", async (req, res) => {
    if (!stripe) {
      return res.status(500).json({ message: "Stripe não configurado. Configure STRIPE_SECRET_KEY." });
    }
    
    try {
      const { email, name, plan = "professional" } = req.body;
      
      if (!email || !name) {
        return res.status(400).json({ message: "Email e nome são obrigatórios." });
      }
      
      // Server-side price enforcement - whitelisted price IDs only
      const serverPlans = {
        starter: process.env.STRIPE_PRICE_STARTER,
        professional: process.env.STRIPE_PRICE_PROFESSIONAL,
        enterprise: process.env.STRIPE_PRICE_ENTERPRISE
      };
      
      const priceId = serverPlans[plan as keyof typeof serverPlans];
      if (!priceId) {
        return res.status(400).json({ message: "Plano inválido ou não configurado no servidor." });
      }
      
      // Create customer
      const customer = await stripe.customers.create({
        email,
        name,
        metadata: {
          source: "secretaria_ai_platform",
          plan: plan
        }
      });

      // Create subscription
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: priceId }],
        payment_behavior: 'default_incomplete',
        expand: ['latest_invoice.payment_intent'],
        metadata: {
          plan: plan
        }
      });
      
      const invoice = subscription.latest_invoice as any;
      
      res.json({
        subscriptionId: subscription.id,
        clientSecret: invoice.payment_intent.client_secret,
        customerId: customer.id,
        plan: plan
      });
    } catch (error: any) {
      console.error("Stripe subscription error:", error);
      res.status(500).json({ message: "Erro ao criar assinatura: " + error.message });
    }
  });

  // ROI calculation endpoint
  app.post("/api/calculate-roi", async (req, res) => {
    try {
      const { leads, ticket, hours, businessType } = req.body;
      
      // Calculations based on SEBRAE data: 68% leads lost after 10 min without response
      const lostLeads = Math.round(leads * 0.68);
      const lostRevenue = lostLeads * ticket;
      const timeCost = hours * 30 * 40; // 40 reais/hour estimate
      const totalSavings = lostRevenue + timeCost;
      const annualSavings = totalSavings * 12;
      const investment = 597 * 12; // Professional plan
      const roi = ((annualSavings - investment) / investment * 100);
      
      res.json({
        lostLeads,
        lostRevenue,
        timeCost,
        totalSavings,
        annualSavings,
        roi: Math.round(roi)
      });
    } catch (error: any) {
      res.status(500).json({ message: "Error calculating ROI: " + error.message });
    }
  });

  // Database-only availability check endpoint (works without Google Calendar)
  app.get("/api/availability", async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      
      if (!startDate || !endDate) {
        return res.status(400).json({ 
          message: "startDate e endDate são obrigatórios. Formato: YYYY-MM-DD" 
        });
      }
      
      // Use database-only availability method (same as /api/available-slots but with simpler output format)
      const availableSlots = await generateDatabaseAvailableSlots(
        startDate as string, 
        endDate as string,
        30 // Default 30 minutes duration
      );
      
      res.json({
        startDate,
        endDate,
        totalSlots: availableSlots.length,
        availableSlots: availableSlots.filter(slot => slot.available).length,
        slots: availableSlots
      });
      
    } catch (error: any) {
      console.error("Error checking availability:", error);
      res.status(500).json({ 
        message: "Erro ao verificar disponibilidade: " + error.message 
      });
    }
  });

  // New available slots endpoint with enhanced formatting and default parameters
  app.get("/api/available-slots", async (req, res) => {
    try {
      // Parse query parameters with defaults
      const { startDate, endDate, duration } = req.query;
      
      // Set default values
      const today = new Date();
      const defaultStartDate = today.toISOString().split('T')[0]; // YYYY-MM-DD format
      
      const thirtyDaysLater = new Date(today);
      thirtyDaysLater.setDate(today.getDate() + 30);
      const defaultEndDate = thirtyDaysLater.toISOString().split('T')[0];
      
      const finalStartDate = (startDate as string) || defaultStartDate;
      const finalEndDate = (endDate as string) || defaultEndDate;
      const finalDuration = parseInt((duration as string) || '30'); // Default 30 minutes
      
      // Validate date format
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(finalStartDate) || !dateRegex.test(finalEndDate)) {
        return res.status(400).json({
          message: "Formato de data inválido. Use YYYY-MM-DD"
        });
      }
      
      // Validate date range
      const startDateObj = new Date(finalStartDate);
      const endDateObj = new Date(finalEndDate);
      
      if (startDateObj > endDateObj) {
        return res.status(400).json({
          message: "Data de início deve ser anterior à data de fim"
        });
      }
      
      // Validate duration
      if (finalDuration < 15 || finalDuration > 120) {
        return res.status(400).json({
          message: "Duração deve estar entre 15 e 120 minutos"
        });
      }
      
      // Get available slots from database (without Google Calendar)
      const availableSlots = await generateDatabaseAvailableSlots(
        finalStartDate,
        finalEndDate,
        finalDuration
      );
      
      // Transform response to group slots by date with proper format
      const groupedSlots: { [date: string]: Array<{ timeSlot: string; available: boolean }> } = {};
      
      availableSlots.forEach(slot => {
        if (!groupedSlots[slot.date]) {
          groupedSlots[slot.date] = [];
        }
        
        // Extract start time from timeSlot format "HH:MM-HH:MM"
        const startTime = slot.timeSlot.split('-')[0];
        
        groupedSlots[slot.date].push({
          timeSlot: startTime,
          available: slot.available
        });
      });
      
      // Calculate total days and total slots
      const totalDays = Math.ceil((endDateObj.getTime() - startDateObj.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      const totalSlots = availableSlots.length;
      
      // Send response in the required format
      res.json({
        availableSlots: groupedSlots,
        totalDays,
        totalSlots,
        parameters: {
          startDate: finalStartDate,
          endDate: finalEndDate,
          duration: finalDuration
        }
      });
      
    } catch (error: any) {
      console.error("Error fetching available slots:", error);
      res.status(500).json({
        message: "Erro ao buscar horários disponíveis: " + error.message
      });
    }
  });

  // Enhanced AI Chat with intelligent conversation management
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, sessionId, leadId } = req.body;
      
      let session;
      if (sessionId) {
        session = await storage.getChatSession(sessionId);
      }
      
      if (!session) {
        session = await storage.createChatSession({
          leadId: leadId || null,
          messages: []
        });
      }
      
      const messages = session.messages as any[] || [];
      const conversationHistory = messages.slice(-6); // Keep last 6 messages for context
      
      // Get or initialize conversation state
      let conversationState: ConversationState = {
        phase: 'introduction',
        ...(session.status ? { phase: session.status as any } : {})
      };
      
      // Extract state from recent messages if available
      const lastAssistantMessage = messages.filter(m => m.role === 'assistant').slice(-1)[0];
      if (lastAssistantMessage && lastAssistantMessage.conversationState) {
        conversationState = lastAssistantMessage.conversationState;
      }
      
      // Detect user intent with enhanced analysis
      const userIntent = detectUserIntent(message, conversationHistory);
      
      // Generate intelligent contextual response
      const { response: aiResponse, newState, quickReplies } = generateContextualResponse(
        userIntent, 
        conversationState, 
        conversationHistory
      );
      
      // Analyze sentiment
      const sentiment = await analyzeSentiment(message);
      
      // Add user message
      messages.push({ 
        role: "user", 
        content: message, 
        timestamp: new Date(),
        intent: userIntent
      });
      
      // Add AI response with enhanced metadata
      messages.push({ 
        role: "assistant", 
        content: aiResponse, 
        timestamp: new Date(),
        sentiment: sentiment,
        conversationState: newState,
        quickReplies: quickReplies,
        intent: userIntent.category
      });
      
      // Update session with new state
      const updatedSession = await storage.updateChatMessages(session.id, messages);
      
      // Calculate lead score if we have enough information
      let leadScore = 0;
      if (newState.businessType) leadScore += 20;
      if (newState.painPoints && newState.painPoints.length > 0) leadScore += 30;
      if (userIntent.category === 'demo' || userIntent.category === 'pricing') leadScore += 25;
      if (sentiment.rating >= 4) leadScore += 25;
      
      newState.leadScore = leadScore;
      
      res.json({
        response: aiResponse,
        sessionId: session.id,
        sentiment: sentiment,
        quickReplies: quickReplies,
        conversationState: newState,
        intent: userIntent,
        leadScore: leadScore
      });
    } catch (error: any) {
      console.error('Chat error:', error);
      res.status(500).json({ message: "Error processing chat: " + error.message });
    }
  });

  // Onboarding Survey submission (post-purchase)
  app.post("/api/onboarding-survey", async (req, res) => {
    try {
      const surveyData = insertOnboardingSurveySchema.parse(req.body);
      
      console.log('Saving onboarding survey data:', JSON.stringify(surveyData, null, 2));
      
      const survey = await storage.createOnboardingSurvey(surveyData);
      
      console.log('Onboarding survey saved successfully:', survey.id);
      
      res.json({ 
        id: survey.id,
        status: survey.status,
        message: "Questionário de onboarding enviado com sucesso! Nossa equipe entrará em contato em até 24h para iniciar a configuração."
      });
    } catch (error: any) {
      console.error('Error saving onboarding survey:', error);
      res.status(400).json({ message: "Erro ao salvar questionário: " + error.message });
    }
  });

  // Demo scheduling with Google Calendar integration
  app.post("/api/demos", async (req, res) => {
    try {
      const demoData = insertDemoSchema.parse(req.body);
      
      // Get timezone from request or default to America/Sao_Paulo
      const timeZone = req.body.timeZone || 'America/Sao_Paulo';
      
      // Create demo in database
      const demo = await storage.createDemo(demoData);
      
      // Extract demo details from notes for calendar event
      const notes = demoData.notes || '';
      const demoTypeMatch = notes.match(/^(full|quick)/);
      const contactMatch = notes.match(/Contato: ([^(]+)\(([^,]+),\s*([^)]+)\)\s*-\s*([^|]+)/);
      
      // Determine demo duration based on type
      const getDemoDuration = (type: string): number => {
        switch (type) {
          case 'quick': return 15;
          default: return 30; // full demo
        }
      };

      const getDemoTitle = (type: string): string => {
        switch (type) {
          case 'quick': return 'Demo Rápido - Secretária IA';
          default: return 'Demonstração Completa - Secretária IA';
        }
      };
      
      // Log demo creation for tracking (Google Calendar integration removed for database-only operation)
      if (contactMatch) {
        const [, contactName, email, phone, company] = contactMatch;
        const demoType = demoTypeMatch?.[1] || 'full';
        const duration = getDemoDuration(demoType);
        
        console.log(`Demo scheduled for ${contactName} (${email}) from ${company} - ${demoType} demo (${duration} minutes)`);
      } else {
        console.log('Demo scheduled - contact information parsed from notes if available');
      }
      
      res.json(demo);
    } catch (error: any) {
      res.status(400).json({ message: "Error scheduling demo: " + error.message });
    }
  });

  // Stripe payment routes - COMENTADO TEMPORARIAMENTE
  /*
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { amount, plan } = req.body;
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: "brl",
        metadata: {
          plan: plan
        }
      });
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      res.status(500).json({ message: "Error creating payment intent: " + error.message });
    }
  });
  */

  // Subscription creation for recurring plans - COMENTADO TEMPORARIAMENTE
  /*
  app.post('/api/create-subscription', async (req, res) => {
    try {
      const { email, name, plan, amount } = req.body;
      
      const customer = await stripe.customers.create({
        email: email,
        name: name,
      });

      // Create a subscription setup intent for the customer
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{
          price_data: {
            currency: 'brl',
            product: `Secretária IA - Plano ${plan}`,
            unit_amount: Math.round(amount * 100),
            recurring: {
              interval: 'month',
            },
          },
        }],
        payment_behavior: 'default_incomplete',
        expand: ['latest_invoice.payment_intent'],
      });

      res.json({
        subscriptionId: subscription.id,
        clientSecret: (subscription.latest_invoice as any)?.payment_intent?.client_secret,
      });
    } catch (error: any) {
      res.status(400).json({ error: { message: error.message } });
    }
  });
  */

  // Helper function to calculate score (reused from /api/leads logic)
  const calculateScore = (data: any): number => {
    let score = 0;

    // Company size scoring
    if (data.companySize === "small" || data.tamanhoEmpresa === "small") score += 25;
    else if (data.companySize === "medium" || data.tamanhoEmpresa === "medium") score += 35;
    else if (data.companySize === "large" || data.tamanhoEmpresa === "large") score += 30;
    else score += 15; // solo

    // Revenue scoring
    if (data.revenue === "medium" || data.receita === "medium") score += 30;
    else if (data.revenue === "high" || data.receita === "high") score += 35;
    else if (data.revenue === "enterprise" || data.receita === "enterprise") score += 25;
    else score += 10; // low

    // Leads volume scoring
    if (data.leadsVolume === "medium" || data.volumeLeads === "medium") score += 25;
    else if (data.leadsVolume === "high" || data.volumeLeads === "high") score += 30;
    else if (data.leadsVolume === "enterprise" || data.volumeLeads === "enterprise") score += 15;
    else score += 10; // low

    // Timeline scoring
    if (data.timeline === "immediate") score += 20;
    else if (data.timeline === "month") score += 15;
    else if (data.timeline === "quarter") score += 10;
    else score += 5; // exploring

    return Math.min(score, 100); // Cap at 100
  };

  // Formulario Personalizado endpoints
  app.post("/api/formulario-personalizado", async (req, res) => {
    try {
      const formularioData = req.body;

      // Validate required fields - ALL NOT NULL fields from schema
      const requiredFields = [
        'nome', 'email', 'telefone', 'empresa', 'tamanhoEmpresa', 
        'receita', 'volumeLeads', 'pontosDor', 'timeline', 'decisor', 
        'lgpdConsent', 'lgpdConsentDate'
      ];
      
      for (const field of requiredFields) {
        if (!formularioData[field]) {
          return res.status(400).json({
            success: false,
            message: `Campo obrigatório faltando: ${field}`
          });
        }
      }

      // Calculate score based on form data
      const score = calculateScore(formularioData);

      // Calculate recommended plan based on score
      const calculateRecommendedPlan = (score: number): string => {
        if (score >= 90) return "enterprise";
        if (score >= 70) return "professional";
        if (score >= 50) return "business";
        return "starter";
      };

      const planoRecomendado = calculateRecommendedPlan(score);

      // Ensure LGPD fields are properly set
      const dataToInsert = {
        ...formularioData,
        score,
        planoRecomendado,
        lgpdConsent: formularioData.lgpdConsent === true,
        lgpdConsentDate: formularioData.lgpdConsentDate ? new Date(formularioData.lgpdConsentDate) : new Date(),
        origem: formularioData.origem || 'formulario_personalizado',
        status: formularioData.status || 'novo'
      };

      const formulario = await storage.createFormularioPersonalizado(dataToInsert);
      
      res.status(201).json({
        success: true,
        formulario,
        score,
        message: "Formulário personalizado criado com sucesso"
      });

    } catch (error: any) {
      console.error("Error creating formulario personalizado:", error);
      res.status(400).json({
        success: false,
        message: error.message || "Erro ao criar formulário personalizado"
      });
    }
  });

  app.get("/api/formulario-personalizado/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const formulario = await storage.getFormularioPersonalizado(id);
      
      if (!formulario) {
        return res.status(404).json({ message: "Formulário não encontrado" });
      }
      
      res.json(formulario);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Helper function to create and send confirmation email with calendar link
  const createAndSendConfirmationEmail = async (reuniao: any, calendarLink: string | null, scheduledDate: Date) => {
    try {
      const dateFormatted = format(scheduledDate, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
      
      // Create email content with calendar link
      const emailSubject = `Confirmação de Agendamento - ${reuniao.tipoReuniao === 'demo' ? 'Demonstração' : 'Reunião'} Secretária IA`;
      
      const emailHtmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Confirmação de Agendamento</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #2563eb; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                .content { background-color: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
                .meeting-details { background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb; }
                .calendar-button { display: inline-block; background-color: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: bold; }
                .calendar-button:hover { background-color: #15803d; }
                .footer { text-align: center; margin-top: 30px; font-size: 14px; color: #666; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🤖 Agendamento Confirmado!</h1>
                    <p>Sua ${reuniao.tipoReuniao === 'demo' ? 'demonstração' : 'reunião'} com a Secretária IA foi agendada com sucesso.</p>
                </div>
                
                <div class="content">
                    <div class="meeting-details">
                        <h2>📅 Detalhes do Agendamento</h2>
                        <p><strong>Data e Hora:</strong> ${dateFormatted}</p>
                        <p><strong>Duração:</strong> ${reuniao.duracao} minutos</p>
                        <p><strong>Plataforma:</strong> ${reuniao.plataforma}</p>
                        <p><strong>Objetivo:</strong> ${reuniao.objetivoReuniao}</p>
                        
                        <h3>👤 Seus Dados</h3>
                        <p><strong>Nome:</strong> ${reuniao.nomeProspecto}</p>
                        <p><strong>Empresa:</strong> ${reuniao.empresaProspecto}</p>
                        <p><strong>Email:</strong> ${reuniao.emailProspecto}</p>
                        ${reuniao.telefoneProspecto ? `<p><strong>Telefone:</strong> ${reuniao.telefoneProspecto}</p>` : ''}
                    </div>
                    
                    ${calendarLink ? `
                        <div style="text-align: center; margin: 30px 0;">
                            <h3>📅 Adicionar ao seu Google Calendar</h3>
                            <p>Clique no botão abaixo para adicionar este evento ao seu calendário pessoal:</p>
                            <a href="${calendarLink}" target="_blank" class="calendar-button">
                                📅 Adicionar ao Google Calendar
                            </a>
                            <p style="font-size: 14px; color: #666; margin-top: 10px;">
                                Este link abrirá o Google Calendar com o evento pré-preenchido para você salvar.
                            </p>
                        </div>
                    ` : ''}
                    
                    <div style="background-color: #dbeafe; padding: 15px; border-radius: 6px; margin: 20px 0;">
                        <p><strong>💡 O que esperar na reunião:</strong></p>
                        <ul>
                            <li>Demonstração personalizada da Secretária IA</li>
                            <li>Análise do seu processo atual de atendimento</li>
                            <li>Cálculo do ROI específico para seu negócio</li>
                            <li>Configuração e integração com WhatsApp Business</li>
                        </ul>
                    </div>
                    
                    <div style="background-color: #fef3c7; padding: 15px; border-radius: 6px; margin: 20px 0;">
                        <p><strong>⚠️ Importante:</strong></p>
                        <p>Você receberá o link da reunião por email 30 minutos antes do horário agendado. Também entraremos em contato via WhatsApp para confirmar sua presença.</p>
                    </div>
                </div>
                
                <div class="footer">
                    <p>Em caso de dúvidas, entre em contato conosco:</p>
                    <p>📧 contato@secretariaai.com | 📱 WhatsApp: (11) 99999-9999</p>
                    <p>Secretária IA - Nexus Intelligence</p>
                </div>
            </div>
        </body>
        </html>
      `;

      const emailTextContent = `
Agendamento Confirmado - Secretária IA

Olá ${reuniao.nomeProspecto}!

Sua ${reuniao.tipoReuniao === 'demo' ? 'demonstração' : 'reunião'} com a Secretária IA foi agendada com sucesso.

DETALHES DO AGENDAMENTO:
Data e Hora: ${dateFormatted}
Duração: ${reuniao.duracao} minutos
Plataforma: ${reuniao.plataforma}
Objetivo: ${reuniao.objetivoReuniao}

SEUS DADOS:
Nome: ${reuniao.nomeProspecto}
Empresa: ${reuniao.empresaProspecto}
Email: ${reuniao.emailProspecto}
${reuniao.telefoneProspecto ? `Telefone: ${reuniao.telefoneProspecto}` : ''}

${calendarLink ? `
ADICIONAR AO GOOGLE CALENDAR:
Use este link para adicionar o evento ao seu calendário:
${calendarLink}
` : ''}

O que esperar na reunião:
- Demonstração personalizada da Secretária IA
- Análise do seu processo atual de atendimento
- Cálculo do ROI específico para seu negócio
- Configuração e integração com WhatsApp Business

IMPORTANTE:
Você receberá o link da reunião por email 30 minutos antes do horário agendado.
Também entraremos em contato via WhatsApp para confirmar sua presença.

Em caso de dúvidas:
Email: contato@secretariaai.com
WhatsApp: (11) 99999-9999

Secretária IA - Nexus Intelligence
      `.trim();

      // Send actual email using SendGrid
      const emailSent = await sendEmail({
        to: reuniao.emailProspecto,
        from: process.env.GMAIL_EMAIL || 'contato@secretariaai.com',
        subject: emailSubject,
        text: emailTextContent,
        html: emailHtmlContent
      });
      
      if (emailSent) {
        console.log(`✅ Confirmation email sent successfully to ${reuniao.emailProspecto}`);
      } else {
        console.log(`⚠️ Email sending failed or simulated for ${reuniao.emailProspecto}`);
      }
      
      return emailSent;
    } catch (error) {
      console.error('Error in createAndSendConfirmationEmail:', error);
      throw error;
    }
  };

  // Reuniao Prospecto endpoints  
  app.post("/api/reuniao-prospecto", async (req, res) => {
    try {
      const reuniaoData = req.body;

      // Validate required fields
      const requiredFields = ['tipoReuniao', 'dataAgendada', 'plataforma', 'nomeProspecto', 'emailProspecto', 'telefoneProspecto', 'cargoProspecto', 'empresaProspecto', 'objetivoReuniao'];
      for (const field of requiredFields) {
        if (!reuniaoData[field]) {
          return res.status(400).json({
            success: false,
            message: `Campo obrigatório faltando: ${field}`
          });
        }
      }

      // Ensure data types are correct
      const dataToInsert = {
        ...reuniaoData,
        dataAgendada: new Date(reuniaoData.dataAgendada),
        duracao: reuniaoData.duracao || 60,
        lembreteEnviado: reuniaoData.lembreteEnviado || false,
        confirmado: reuniaoData.confirmado || false,
        status: reuniaoData.status || 'agendado'
      };

      const reuniao = await storage.createReuniaoProspecto(dataToInsert);
      
      // Auto-create Google Calendar event for the meeting
      const startTime = new Date(reuniao.dataAgendada);
      const endTime = new Date(startTime.getTime() + (reuniao.duracao * 60000)); // Add duration in milliseconds

      const getTipoReuniaoTitle = (tipo: string): string => {
        switch (tipo) {
          case 'discovery': return 'Reunião de Discovery - Secretária IA';
          case 'demo': return 'Demonstração - Secretária IA';
          case 'proposal': return 'Apresentação de Proposta - Secretária IA';
          case 'follow-up': return 'Follow-up - Secretária IA';
          default: return 'Reunião - Secretária IA';
        }
      };

      const calendarEventData = {
        summary: getTipoReuniaoTitle(reuniao.tipoReuniao),
        description: `
${getTipoReuniaoTitle(reuniao.tipoReuniao)}

Cliente: ${reuniao.nomeProspecto}
Cargo: ${reuniao.cargoProspecto}
Empresa: ${reuniao.empresaProspecto}
Telefone: ${reuniao.telefoneProspecto}
Plataforma: ${reuniao.plataforma}
Duração: ${reuniao.duracao} minutos

Objetivo: ${reuniao.objetivoReuniao}

${reuniao.pontosDiscussao ? 'Pontos de Discussão:\n' + (reuniao.pontosDiscussao as string[]).map(p => `• ${p}`).join('\n') : ''}

${reuniao.notasPreparacao ? `\nNotas de Preparação:\n${reuniao.notasPreparacao}` : ''}

---
Plataforma de Automação WhatsApp
Secretária IA - Nexus Intelligence
        `.trim(),
        startDateTime: startTime.toISOString(),
        endDateTime: endTime.toISOString(),
        attendeeEmail: reuniao.emailProspecto,
        attendeeName: reuniao.nomeProspecto
      };

      // Create Google Calendar event
      let calendarEventId = null;
      try {
        calendarEventId = await googleCalendarService.createDemoEvent(calendarEventData);
        if (calendarEventId) {
          console.log(`Google Calendar event created successfully: ${calendarEventId}`);
        } else {
          console.log('Google Calendar event creation skipped (service not available)');
        }
      } catch (calendarError) {
        console.error('Error creating Google Calendar event:', calendarError);
        // Don't fail the booking if calendar creation fails
      }
      
      // Log meeting creation for tracking
      console.log(`Meeting scheduled for ${reuniao.nomeProspecto} (${reuniao.emailProspecto}) - Meeting ID: ${reuniao.id}`);

      // Generate public Google Calendar link
      let publicCalendarLink = null;
      try {
        // Format dates for Google Calendar (YYYYMMDDTHHMMSSZ format)
        const formatGoogleCalendarDate = (date: Date): string => {
          return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
        };

        const startFormatted = formatGoogleCalendarDate(startTime);
        const endFormatted = formatGoogleCalendarDate(endTime);

        // Build event details for public link
        const title = encodeURIComponent(getTipoReuniaoTitle(reuniao.tipoReuniao));
        
        const description = `
Demonstração da Secretária IA

Cliente: ${reuniao.nomeProspecto}
Empresa: ${reuniao.empresaProspecto}
${reuniao.telefoneProspecto ? `Telefone: ${reuniao.telefoneProspecto}` : ''}
${reuniao.emailProspecto ? `Email: ${reuniao.emailProspecto}` : ''}
Plataforma: ${reuniao.plataforma}
Duração: ${reuniao.duracao} minutos

${reuniao.objetivoReuniao ? `Objetivo: ${reuniao.objetivoReuniao}` : ''}

Transforme seus leads em clientes com automação WhatsApp
Secretária IA - Nexus Intelligence
        `.trim();

        const encodedDescription = encodeURIComponent(description);
        const encodedLocation = encodeURIComponent("Reunião Online");

        // Generate Google Calendar public link
        publicCalendarLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startFormatted}/${endFormatted}&details=${encodedDescription}&location=${encodedLocation}`;
      } catch (linkError) {
        console.error('Error generating public calendar link:', linkError);
        // Don't fail the booking if calendar link generation fails
      }

      // Create/send confirmation email with calendar link
      try {
        await createAndSendConfirmationEmail(reuniao, publicCalendarLink, startTime);
      } catch (emailError) {
        console.error('Error sending confirmation email:', emailError);
        // Don't fail the booking if email sending fails
      }
      
      res.status(201).json({
        success: true,
        reuniao,
        calendarLink: publicCalendarLink,
        message: "Reunião agendada com sucesso"
      });

    } catch (error: any) {
      console.error("Error creating reuniao prospecto:", error);
      res.status(400).json({
        success: false,
        message: error.message || "Erro ao agendar reunião"
      });
    }
  });

  app.get("/api/reuniao-prospecto/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const reuniao = await storage.getReuniaoProspecto(id);
      
      if (!reuniao) {
        return res.status(404).json({ message: "Reunião não encontrada" });
      }
      
      res.json(reuniao);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Generate Google Calendar public link
  app.post("/api/generate-calendar-link", async (req, res) => {
    try {
      const {
        tipoReuniao,
        dataAgendada,
        duracao = 30,
        nomeProspecto,
        emailProspecto,
        telefoneProspecto,
        empresaProspecto,
        objetivoReuniao,
        plataforma = "Google Meet"
      } = req.body;

      // Validate required fields
      const requiredFields = ['tipoReuniao', 'dataAgendada', 'nomeProspecto', 'emailProspecto', 'empresaProspecto'];
      for (const field of requiredFields) {
        if (!req.body[field]) {
          return res.status(400).json({
            success: false,
            message: `Campo obrigatório faltando: ${field}`
          });
        }
      }

      // Parse dates
      const startTime = new Date(dataAgendada);
      const endTime = new Date(startTime.getTime() + (duracao * 60000)); // Add duration in milliseconds

      // Validate dates
      if (isNaN(startTime.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Data e hora inválidas"
        });
      }

      // Helper function to get meeting title
      const getTipoReuniaoTitle = (tipo: string): string => {
        switch (tipo) {
          case 'discovery': return 'Reunião de Discovery - Secretária IA';
          case 'demo': return 'Demonstração - Secretária IA';
          case 'proposal': return 'Apresentação de Proposta - Secretária IA';
          case 'follow-up': return 'Follow-up - Secretária IA';
          default: return 'Reunião - Secretária IA';
        }
      };

      // Format dates for Google Calendar (YYYYMMDDTHHMMSSZ format)
      const formatGoogleCalendarDate = (date: Date): string => {
        return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
      };

      const startFormatted = formatGoogleCalendarDate(startTime);
      const endFormatted = formatGoogleCalendarDate(endTime);

      // Build event details
      const title = encodeURIComponent(getTipoReuniaoTitle(tipoReuniao));
      
      const description = `
Demonstração da Secretária IA

Cliente: ${nomeProspecto}
Empresa: ${empresaProspecto}
${telefoneProspecto ? `Telefone: ${telefoneProspecto}` : ''}
${emailProspecto ? `Email: ${emailProspecto}` : ''}
Plataforma: ${plataforma}
Duração: ${duracao} minutos

${objetivoReuniao ? `Objetivo: ${objetivoReuniao}` : ''}

Transforme seus leads em clientes com automação WhatsApp
Secretária IA - Nexus Intelligence
      `.trim();

      const encodedDescription = encodeURIComponent(description);
      const encodedLocation = encodeURIComponent("Reunião Online");

      // Generate Google Calendar public link
      const calendarLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startFormatted}/${endFormatted}&details=${encodedDescription}&location=${encodedLocation}`;

      res.json({
        success: true,
        calendarLink,
        eventDetails: {
          title: getTipoReuniaoTitle(tipoReuniao),
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          duration: duracao,
          description: description
        }
      });

    } catch (error: any) {
      console.error("Error generating calendar link:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Erro ao gerar link do calendário"
      });
    }
  });

  // Formulario Cliente endpoints
  app.post("/api/formulario-cliente", async (req, res) => {
    try {
      const formularioData = req.body;

      // Handle userId - use a service/guest account for anonymous submissions
      let userId = formularioData.userId;
      
      if (!userId || userId === "temp-user-id") {
        // For anonymous submissions, create a unique identifier but don't create actual users
        // This is safer than auto-creating user accounts from business forms
        const guestIdentifier = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        // Try to find existing user by email for returning customers
        let existingUser;
        try {
          existingUser = await storage.getUserByEmail(formularioData.emailPrincipal);
        } catch (error) {
          // Continue if getUserByEmail fails
        }
        
        if (existingUser) {
          userId = existingUser.id;
        } else {
          // Create a temporary service user specifically for this form submission
          // Use proper password hashing and mark as service account
          const { createUserWithHashedPassword } = await import('./auth');
          const serviceUser = await createUserWithHashedPassword({
            username: guestIdentifier,
            email: formularioData.emailPrincipal,
            password: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) // Random password
          });
          userId = serviceUser.id;
        }
      }

      // Update formularioData with real userId
      formularioData.userId = userId;

      // Validate required fields - ALL NOT NULL fields from schema (except userId now handled)
      const requiredFields = [
        'nomeCompleto', 'emailPrincipal', 'telefoneContato', 'cargoFuncao', 
        'nomeEmpresa', 'setorAtuacao', 'tamanhoEquipe', 'receitaAnual', 'objetivosPrincipais', 
        'prazoImplementacao', 'orcamentoDisponivel', 'principaisDesafios', 'processoAtualVendas', 
        'volumeLeadsMensais', 'nivelAutonomia', 'expectativasResultados', 'indicadoresSuccesso', 
        'tempoEsperadoRoi', 'necessidadeTreinamento', 'disponibilidadeTreinamento', 'preferenciaSuporte'
      ];
      
      for (const field of requiredFields) {
        if (!formularioData[field]) {
          return res.status(400).json({
            success: false,
            message: `Campo obrigatório faltando: ${field}`
          });
        }
      }

      // Ensure objetivosPrincipais is an array
      if (!Array.isArray(formularioData.objetivosPrincipais)) {
        formularioData.objetivosPrincipais = [formularioData.objetivosPrincipais];
      }

      // Ensure indicadoresSuccesso is an array  
      if (!Array.isArray(formularioData.indicadoresSuccesso)) {
        formularioData.indicadoresSuccesso = [formularioData.indicadoresSuccesso];
      }

      const formulario = await storage.createFormularioCliente(formularioData);
      
      res.status(201).json({
        success: true,
        formulario,
        message: "Formulário de cliente criado com sucesso"
      });

    } catch (error: any) {
      console.error("Error creating formulario cliente:", error);
      res.status(400).json({
        success: false,
        message: error.message || "Erro ao criar formulário de cliente"
      });
    }
  });

  app.get("/api/formulario-cliente/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const formulario = await storage.getFormularioCliente(id);
      
      if (!formulario) {
        return res.status(404).json({ message: "Formulário não encontrado" });
      }
      
      res.json(formulario);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Pagamento Recusado endpoints
  app.post("/api/pagamento-recusado", async (req, res) => {
    try {
      const validateData = insertPagamentoRecusadoSchema.parse(req.body);
      const pagamento = await storage.createPagamentoRecusado(validateData);
      
      res.status(201).json({
        success: true,
        pagamento,
        message: "Pagamento recusado registrado com sucesso"
      });
    } catch (error: any) {
      console.error("Error creating pagamento recusado:", error);
      res.status(400).json({
        success: false,
        message: error.message || "Erro ao registrar pagamento recusado"
      });
    }
  });

  // GET route for pagamentos recusados by email
  app.get("/api/pagamento-recusado/:email", async (req, res) => {
    try {
      const { email } = req.params;
      const pagamentos = await storage.getPagamentosRecusadosByEmail(email);
      res.json({ success: true, pagamentos });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  });

  // Update tentativas for pagamento recusado
  app.patch("/api/pagamento-recusado/:id/tentativas", async (req, res) => {
    try {
      const { id } = req.params;
      const { tentativas } = req.body;
      const pagamento = await storage.updateTentativasPagamento(id, tentativas);
      res.json({ success: true, pagamento });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  });

  // Comprehensive analytics dashboard data
  app.get("/api/analytics", async (req, res) => {
    try {
      const growthMetrics = await storage.getGrowthMetrics();
      const recentActivities = await storage.getRecentActivities(10);
      
      // Current month metrics
      const current = growthMetrics.currentMonth;
      const growth = growthMetrics.growth;
      
      // Calculate ROI based on real data
      const monthlyInvestment = 597; // Professional plan cost
      const roi = current.estimatedRevenue > 0 ? ((current.estimatedRevenue - monthlyInvestment) / monthlyInvestment * 100) : 0;
      
      const analyticsData = {
        // Main KPI metrics
        conversas: current.leads,
        agendamentos: current.demos,
        conversaoRate: current.conversions,
        receitaGerada: current.estimatedRevenue,
        
        // Growth percentages
        crescimentoConversas: growth.leads,
        crescimentoAgendamentos: growth.demos,
        crescimentoConversao: growth.conversions,
        crescimentoReceita: growth.revenue,
        
        // Additional analytics for compatibility
        totalLeads: current.leads,
        qualifiedLeads: Math.round(current.leads * 0.6), // Estimate 60% qualification rate
        demos: current.demos,
        conversionRate: current.conversions,
        averageScore: 75, // Reasonable average for qualified leads
        
        // Recent activities
        recentActivities: recentActivities,
        
        // ROI calculation
        roi: {
          monthlyInvestment: monthlyInvestment,
          estimatedRevenue: current.estimatedRevenue,
          roiPercentage: Math.round(roi)
        }
      };
      
      res.json(analyticsData);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching analytics: " + error.message });
    }
  });

  // Formulário Personalizado endpoint
  app.post("/api/formulario-personalizado", async (req, res) => {
    try {
      const formularioData = {
        ...req.body,
        lgpdConsentDate: new Date(),
        origem: req.body.origem || 'website_form'
      };

      // Ensure LGPD consent
      if (!formularioData.lgpdConsent) {
        return res.status(400).json({ 
          message: "Consentimento LGPD é obrigatório para processar seus dados"
        });
      }

      // Calculate lead score based on qualification answers
      let score = 0;
      
      // Company size scoring
      if (formularioData.tamanhoEmpresa === "pequena") score += 25;
      else if (formularioData.tamanhoEmpresa === "media") score += 35;
      else if (formularioData.tamanhoEmpresa === "grande") score += 30;
      else score += 15; // micro

      // Revenue scoring  
      if (formularioData.receita === "media") score += 30;
      else if (formularioData.receita === "alta") score += 35;
      else if (formularioData.receita === "enterprise") score += 25;
      else score += 10; // baixa

      // Volume scoring
      if (formularioData.volumeLeads === "medio") score += 25;
      else if (formularioData.volumeLeads === "alto") score += 30;
      else if (formularioData.volumeLeads === "enterprise") score += 15;
      else score += 10; // baixo

      // Timeline urgency scoring
      if (formularioData.timeline === "imediato") score += 20;
      else if (formularioData.timeline === "mes") score += 15;
      else if (formularioData.timeline === "trimestre") score += 10;
      else score += 5; // explorando

      // Recommend plan based on score
      let planoRecomendado = 'starter';
      if (score >= 80) planoRecomendado = 'enterprise';
      else if (score >= 60) planoRecomendado = 'professional';
      else if (score >= 50) planoRecomendado = 'business';

      const formularioForInsert = {
        ...formularioData,
        score,
        planoRecomendado,
        lgpdConsent: true,
        lgpdConsentDate: new Date()
      };

      const formulario = await storage.createFormularioPersonalizado(formularioForInsert);

      res.json({
        id: formulario.id,
        score: formulario.score,
        planoRecomendado: formulario.planoRecomendado,
        status: formulario.status,
        message: "Formulário enviado com sucesso! Sua proposta personalizada será enviada em até 2 horas."
      });
    } catch (error: any) {
      res.status(400).json({ message: "Erro ao processar formulário: " + error.message });
    }
  });

  // Pagamento Recusado endpoint - corrigir implementação existente
  app.post("/api/pagamento-recusado", async (req, res) => {
    try {
      const pagamentoData = {
        ...req.body,
        tentativas: req.body.tentativas || 1,
        origem: req.body.origem || 'checkout',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const pagamento = await storage.createPagamentoRecusado(pagamentoData);

      res.json({
        id: pagamento.id,
        status: 'recorded',
        message: "Informações do pagamento recusado foram registradas para análise."
      });
    } catch (error: any) {
      res.status(400).json({ message: "Erro ao registrar pagamento recusado: " + error.message });
    }
  });

  // Reunião Prospecto endpoint
  app.post("/api/reuniao-prospecto", async (req, res) => {
    try {
      const reuniaoData = {
        ...req.body,
        dataAgendada: new Date(req.body.dataAgendada),
        duracao: req.body.duracao || 60,
        plataforma: req.body.plataforma || 'google-meet',
        status: 'agendado'
      };

      // Create meeting in database
      const reuniao = await storage.createReuniaoProspecto(reuniaoData);

      // Create Google Calendar event
      let calendarEventId = null;
      try {
        const calendarEventData = {
          summary: `Demonstração - Secretária IA`,
          description: `Demonstração da Secretária IA
          
Contato: ${reuniaoData.nomeProspecto} (${reuniaoData.emailProspecto}, ${reuniaoData.telefoneProspecto}) - ${reuniaoData.empresaProspecto}

Objetivo: ${reuniaoData.objetivoReuniao}

Notas de preparação: ${reuniaoData.notasPreparacao || 'Nenhuma'}`,
          startDateTime: reuniaoData.dataAgendada.toISOString(),
          endDateTime: new Date(reuniaoData.dataAgendada.getTime() + (reuniaoData.duracao * 60000)).toISOString(),
          attendeeEmail: reuniaoData.emailProspecto,
          attendeeName: reuniaoData.nomeProspecto,
          organizerEmail: process.env.GOOGLE_CALENDAR_ORGANIZER_EMAIL,
          organizerName: 'Secretária IA - Nexus Intelligence'
        };

        // Google Calendar integration removed for database-only operation
        console.log(`Meeting scheduled: ${reuniaoData.nomeProspecto} (${reuniaoData.emailProspecto})`);
      } catch (calendarError: any) {
        console.error('Error creating calendar event:', calendarError.message);
        // Continue without failing the meeting creation
      }

      res.json({
        id: reuniao.id,
        status: reuniao.status,
        dataAgendada: reuniao.dataAgendada,
        calendarEventId: calendarEventId,
        message: calendarEventId 
          ? "Reunião agendada com sucesso! Convite do Google Calendar foi enviado."
          : "Reunião agendada com sucesso! Você receberá um email de confirmação em breve."
      });
    } catch (error: any) {
      res.status(400).json({ message: "Erro ao agendar reunião: " + error.message });
    }
  });

  // Formulário Cliente endpoint (pós-pagamento)  
  app.post("/api/formulario-cliente", async (req, res) => {
    try {
      const formularioData = {
        ...req.body,
        etapaImplementacao: 'planejamento',
        prioridadeImplementacao: 'media',
        status: 'ativo',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      if (!formularioData.userId) {
        return res.status(400).json({ 
          message: "ID do usuário é obrigatório"
        });
      }

      // LGPD compliance for client form (mesmo que não explícito, é boa prática)
      if (!formularioData.lgpdConsent) {
        return res.status(400).json({ 
          message: "Consentimento LGPD é obrigatório para processar dados do cliente"
        });
      }

      const formulario = await storage.createFormularioCliente(formularioData);

      res.json({
        id: formulario.id,
        status: formulario.status,
        etapaImplementacao: formulario.etapaImplementacao,
        message: "Formulário de cliente enviado com sucesso! Sua implementação será iniciada em breve."
      });
    } catch (error: any) {
      res.status(400).json({ message: "Erro ao processar formulário de cliente: " + error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
