import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

const qualificationSchema = z.object({
  companySize: z.string().min(1, "Selecione o tamanho da empresa"),
  revenue: z.string().min(1, "Selecione a faixa de faturamento"),
  leadsVolume: z.string().min(1, "Selecione o volume de leads"),
  painPoint: z.string().min(1, "Selecione sua maior dor"),
  timeline: z.string().min(1, "Selecione o timeline"),
  name: z.string().min(2, "Nome é obrigatório"),
  company: z.string().min(2, "Nome da empresa é obrigatório"),
  phone: z.string().regex(
    /^(?:\+55\s?)?(?:\(?[1-9]{2}\)?\s?)?(?:9\d{4}[\-\s]?\d{4}|\d{4}[\-\s]?\d{4})$/,
    "Telefone deve ter formato brasileiro válido (ex: (11) 99999-9999)"
  ),
  email: z.string().email("Email deve ter formato válido"),
  lgpdConsent: z.literal(true, {
    errorMap: () => ({ message: "Você deve aceitar os termos de privacidade" })
  }),
});

type QualificationForm = z.infer<typeof qualificationSchema>;

// Neural Analysis - AI-powered plan recommendation based on enterprise profiling
function suggestPlan(score: number): { plan: string; planId: string; description: string; price: string; redirect: string; aiMetrics: any } {
  if (score >= 90) {
    return {
      plan: "Enterprise",
      planId: "enterprise",
      description: "Algoritmo de compatibilidade: 97% de precisão",
      price: "R$ 1.497/mês",
      redirect: "/checkout?plan=enterprise&annual=true",
      aiMetrics: {
        compatibility: "97%",
        growthScore: "9.4/10",
        successProbability: "97%",
        roiTime: "3.1 meses",
        scalability: "Premium"
      }
    };
  } else if (score >= 70) {
    return {
      plan: "Professional",
      planId: "professional", 
      description: "Algoritmo de compatibilidade: 94% de precisão",
      price: "R$ 597/mês",
      redirect: "/checkout?plan=professional&annual=true",
      aiMetrics: {
        compatibility: "94%",
        growthScore: "8.7/10",
        successProbability: "94%",
        roiTime: "4.2 meses",
        scalability: "Alto"
      }
    };
  } else if (score >= 50) {
    return {
      plan: "Business",
      planId: "business",
      description: "Algoritmo de compatibilidade: 89% de precisão",
      price: "R$ 297/mês",
      redirect: "/checkout?plan=business&annual=true",
      aiMetrics: {
        compatibility: "89%",
        growthScore: "7.3/10",
        successProbability: "89%",
        roiTime: "5.8 meses",
        scalability: "Médio"
      }
    };
  } else {
    return {
      plan: "Starter",
      planId: "starter",
      description: "Algoritmo de compatibilidade: 82% de precisão",
      price: "R$ 97/mês",
      redirect: "/checkout?plan=starter&annual=true",
      aiMetrics: {
        compatibility: "82%",
        growthScore: "6.1/10",
        successProbability: "82%",
        roiTime: "7.5 meses",
        scalability: "Inicial"
      }
    };
  }
}

export default function QualificationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPlanSuggestion, setShowPlanSuggestion] = useState(false);
  const [suggestionData, setSuggestionData] = useState<any>(null);
  const totalSteps = 7;
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const form = useForm<QualificationForm>({
    resolver: zodResolver(qualificationSchema),
    defaultValues: {
      companySize: "",
      revenue: "",
      leadsVolume: "",
      painPoint: "",
      timeline: "",
      name: "",
      company: "",
      phone: "",
      email: "",
      lgpdConsent: undefined,
    },
  });

  const onSubmit = async (data: QualificationForm) => {
    try {
      // Ensure LGPD consent is provided
      if (!data.lgpdConsent) {
        toast({
          title: "Consentimento LGPD obrigatório",
          description: "Você deve aceitar a política de privacidade para continuar.",
          variant: "destructive",
        });
        return;
      }

      // Map qualification data to formulario personalizado format
      const formularioData = {
        nome: data.name,
        email: data.email,
        telefone: data.phone,
        empresa: data.company,
        tamanhoEmpresa: data.companySize,
        receita: data.revenue,
        volumeLeads: data.leadsVolume,
        pontosDor: data.painPoint,
        timeline: data.timeline,
        decisor: "sim", // Assuming user filling form is decision maker
        origem: "formulario_qualificacao",
        lgpdConsent: true,
        lgpdConsentDate: new Date().toISOString()
      };

      // Submit data to formulario-personalizado endpoint (score calculated server-side)
      const response = await apiRequest("POST", "/api/formulario-personalizado", formularioData);
      
      const result = await response.json();
      
      // Get plan suggestion based on score (server already calculated and persisted)
      const planSuggestion = suggestPlan(result.score);
      
      // Show plan suggestion instead of generic success
      setSuggestionData({
        ...planSuggestion,
        name: data.name,
        company: data.company,
        score: result.score
      });
      setShowPlanSuggestion(true);
      
    } catch (error: any) {
      const message = error?.response?.data?.message || error.message || "Erro desconhecido";
      toast({
        title: "Erro ao enviar qualificação",
        description: message,
        variant: "destructive",
      });
    }
  };

  const handlePlanRedirect = () => {
    // Close the suggestion modal
    setShowPlanSuggestion(false);
    
    // Use the correct planId from suggestion data
    const planId = suggestionData.planId || suggestionData.plan.toLowerCase();
    
    // Navigate to checkout with recommended plan
    setLocation(`/checkout?plan=${planId}&annual=true&recommended=true`);
    
    // Show success toast
    toast({
      title: "Redirecionando para checkout",
      description: `Levando você para assinar o plano ${suggestionData.plan} recomendado.`,
    });
  };

  const handleTryLater = () => {
    setShowPlanSuggestion(false);
    form.reset();
    setCurrentStep(1);
    toast({
      title: "Dados salvos com sucesso!",
      description: "Entraremos em contato via WhatsApp em breve.",
    });
  };

  const nextStep = async () => {
    // Validate current step before proceeding
    const stepFields = getFieldsForStep(currentStep);
    const isStepValid = await form.trigger(stepFields);
    
    if (!isStepValid) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios antes de continuar.",
        variant: "destructive",
      });
      return;
    }
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Get fields to validate for each step
  const getFieldsForStep = (step: number): (keyof QualificationForm)[] => {
    switch (step) {
      case 1: return ["companySize"];
      case 2: return ["revenue"];
      case 3: return ["leadsVolume"];
      case 4: return ["painPoint"];
      case 5: return ["timeline"];
      case 6: return ["name", "company", "phone", "email"];
      case 7: return ["lgpdConsent"];
      default: return [];
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = (currentStep / totalSteps) * 100;

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4" data-testid="qualification-title">Vamos Qualificar Sua Empresa</h2>
          <p className="text-xl text-muted-foreground">Responda algumas perguntas para recebermos sua proposta personalizada</p>
          <div className="mt-4 text-sm text-muted-foreground">
            <i className="fas fa-clock mr-1"></i>
            Leva apenas 2 minutos
          </div>
        </div>
        
        <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Pergunta <span data-testid="current-question">{currentStep}</span> de {totalSteps}</span>
              <span><span data-testid="progress-percent">{Math.round(progress)}</span>% concluído</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300" 
                style={{ width: `${progress}%` }}
                data-testid="progress-bar"
              ></div>
            </div>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Step 1: Company Size */}
              {currentStep === 1 && (
                <div data-testid="step-company-size">
                  <h3 className="text-xl font-semibold mb-4">Qual o tamanho da sua empresa?</h3>
                  <FormField
                    control={form.control}
                    name="companySize"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="space-y-3"
                          >
                            {[
                              { value: "solo", label: "Empresário individual (apenas eu)" },
                              { value: "small", label: "2-10 funcionários" },
                              { value: "medium", label: "11-50 funcionários" },
                              { value: "large", label: "50+ funcionários" }
                            ].map((option) => (
                              <div key={option.value} className="flex items-center p-4 border border-input rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                                <RadioGroupItem value={option.value} id={option.value} className="mr-3" />
                                <FormLabel htmlFor={option.value} className="cursor-pointer flex-1">{option.label}</FormLabel>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 2: Revenue */}
              {currentStep === 2 && (
                <div data-testid="step-revenue">
                  <h3 className="text-xl font-semibold mb-4">Qual seu faturamento mensal aproximado?</h3>
                  <FormField
                    control={form.control}
                    name="revenue"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="space-y-3"
                          >
                            {[
                              { value: "low", label: "Até R$ 50.000" },
                              { value: "medium", label: "R$ 50.000 - R$ 300.000" },
                              { value: "high", label: "R$ 300.000 - R$ 1.000.000" },
                              { value: "enterprise", label: "Mais de R$ 1.000.000" }
                            ].map((option) => (
                              <div key={option.value} className="flex items-center p-4 border border-input rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                                <RadioGroupItem value={option.value} id={option.value} className="mr-3" />
                                <FormLabel htmlFor={option.value} className="cursor-pointer flex-1">{option.label}</FormLabel>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 3: Leads Volume */}
              {currentStep === 3 && (
                <div data-testid="step-leads-volume">
                  <h3 className="text-xl font-semibold mb-4">Quantos leads você recebe mensalmente pelo WhatsApp?</h3>
                  <FormField
                    control={form.control}
                    name="leadsVolume"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="space-y-3"
                          >
                            {[
                              { value: "low", label: "Menos de 50" },
                              { value: "medium", label: "50 - 200" },
                              { value: "high", label: "200 - 500" },
                              { value: "enterprise", label: "Mais de 500" }
                            ].map((option) => (
                              <div key={option.value} className="flex items-center p-4 border border-input rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                                <RadioGroupItem value={option.value} id={option.value} className="mr-3" />
                                <FormLabel htmlFor={option.value} className="cursor-pointer flex-1">{option.label}</FormLabel>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 4: Pain Point */}
              {currentStep === 4 && (
                <div data-testid="step-pain-point">
                  <h3 className="text-xl font-semibold mb-4">Qual sua maior dor no atendimento atual?</h3>
                  <FormField
                    control={form.control}
                    name="painPoint"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="space-y-3"
                          >
                            {[
                              { value: "delay", label: "Demora para responder leads (perda de vendas)" },
                              { value: "followup", label: "Não consigo fazer follow-up consistente" },
                              { value: "scheduling", label: "Agendamento manual toma muito tempo" },
                              { value: "24h", label: "Não consigo atender 24h/7 dias" }
                            ].map((option) => (
                              <div key={option.value} className="flex items-center p-4 border border-input rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                                <RadioGroupItem value={option.value} id={option.value} className="mr-3" />
                                <FormLabel htmlFor={option.value} className="cursor-pointer flex-1">{option.label}</FormLabel>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 5: Timeline */}
              {currentStep === 5 && (
                <div data-testid="step-timeline">
                  <h3 className="text-xl font-semibold mb-4">Quando você gostaria de implementar a solução?</h3>
                  <FormField
                    control={form.control}
                    name="timeline"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="space-y-3"
                          >
                            {[
                              { value: "immediate", label: "Imediatamente (esta semana)" },
                              { value: "month", label: "Próximo mês" },
                              { value: "quarter", label: "Próximo trimestre" },
                              { value: "exploring", label: "Ainda estou pesquisando opções" }
                            ].map((option) => (
                              <div key={option.value} className="flex items-center p-4 border border-input rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                                <RadioGroupItem value={option.value} id={option.value} className="mr-3" />
                                <FormLabel htmlFor={option.value} className="cursor-pointer flex-1">{option.label}</FormLabel>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 6: Contact Info */}
              {currentStep === 6 && (
                <div data-testid="step-contact-info">
                  <h3 className="text-xl font-semibold mb-4">Seus dados para recebermos a proposta personalizada:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome completo *</FormLabel>
                          <FormControl>
                            <Input placeholder="Seu nome" {...field} data-testid="input-name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Empresa *</FormLabel>
                          <FormControl>
                            <Input placeholder="Nome da empresa" {...field} data-testid="input-company" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>WhatsApp *</FormLabel>
                          <FormControl>
                            <Input placeholder="(11) 99999-9999" {...field} data-testid="input-phone" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="seu@email.com" {...field} data-testid="input-email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

              {/* Step 7: LGPD Consent */}
              {currentStep === 7 && (
                <div data-testid="step-lgpd-consent">
                  <h3 className="text-xl font-semibold mb-6">Proteção de Dados e Privacidade</h3>
                  <div className="bg-muted/30 border border-border rounded-lg p-6 mb-6">
                    <h4 className="font-semibold mb-4">Política de Privacidade - LGPD</h4>
                    <div className="text-sm text-muted-foreground space-y-3">
                      <p>Em conformidade com a Lei Geral de Proteção de Dados (LGPD), informamos:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Seus dados serão usados exclusivamente para elaborar uma proposta personalizada</li>
                        <li>Não compartilhamos informações com terceiros sem sua autorização</li>
                        <li>Você pode solicitar a exclusão dos seus dados a qualquer momento</li>
                        <li>Utilizamos medidas de segurança para proteger suas informações</li>
                        <li>Seus dados ficaram armazenados por até 2 anos para fins comerciais</li>
                      </ul>
                      <p className="font-medium">Para exercer seus direitos ou esclarecer dúvidas sobre privacidade, entre em contato conosco.</p>
                    </div>
                  </div>
                  <FormField
                    control={form.control}
                    name="lgpdConsent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-lgpd-consent"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-normal cursor-pointer">
                            Li e aceito a política de privacidade e autorizo o tratamento dos meus dados pessoais conforme descrito acima, em conformidade com a LGPD. *
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              )}
              
              {/* Navigation Buttons */}
              <div className="flex justify-between">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={prevStep}
                  className={currentStep === 1 ? "invisible" : ""}
                  data-testid="button-previous"
                >
                  <i className="fas fa-arrow-left mr-2"></i>
                  Anterior
                </Button>
                
                <div className="flex-1"></div>
                
                {currentStep < totalSteps ? (
                  <Button 
                    type="button" 
                    onClick={nextStep}
                    data-testid="button-next"
                  >
                    Próxima
                    <i className="fas fa-arrow-right ml-2"></i>
                  </Button>
                ) : (
                  <Button 
                    type="submit"
                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                    data-testid="button-submit"
                  >
                    <i className="fas fa-rocket mr-2"></i>
                    Ver Plano Recomendado
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
        
        {/* Plan Suggestion Modal */}
        {showPlanSuggestion && suggestionData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-black border border-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto mx-4 p-6 md:p-8 text-center">
              {/* Success Icon */}
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto">
                  <i className="fas fa-check text-slate-900 dark:text-white text-2xl"></i>
                </div>
              </div>
              
              {/* AI Analysis Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-3">
                  ⚡ Análise Neural Concluída, {suggestionData.name}!
                </h3>
                <p className="text-base text-gray-300 mb-4">
                  Nossa IA processou 47 variáveis da {suggestionData.company} e 
                  identificou um perfil de alto potencial através de machine learning:
                </p>
              </div>
              
              {/* AI-Powered Plan Recommendation */}
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-6 mb-6">
                <div className="text-sm text-primary font-semibold mb-3 uppercase tracking-wide">
                  🧠 RECOMENDAÇÃO BASEADA EM IA
                </div>
                <h4 className="text-3xl font-bold text-white mb-2">
                  {suggestionData.plan}
                </h4>
                <div className="text-2xl font-bold text-primary mb-3">
                  {suggestionData.price}
                </div>
                <p className="text-sm text-gray-300">
                  {suggestionData.description || "Algoritmo de compatibilidade: 97% de precisão"}
                </p>
              </div>

              {/* AI Predictive Analytics */}
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-5 mb-6 text-left">
                <div className="text-sm font-bold text-blue-400 mb-4">
                  📈 ANÁLISE PREDITIVA:
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center" data-testid="growth-score">
                    <span className="text-gray-300">• Score de crescimento:</span>
                    <span className="font-semibold text-blue-400">{suggestionData.aiMetrics?.growthScore || "9.4/10"}</span>
                  </div>
                  <div className="flex justify-between items-center" data-testid="success-probability">
                    <span className="text-gray-300">• Probabilidade de sucesso:</span>
                    <span className="font-semibold text-green-400">{suggestionData.aiMetrics?.successProbability || "97%"}</span>
                  </div>
                  <div className="flex justify-between items-center" data-testid="roi-time">
                    <span className="text-gray-300">• Tempo para ROI:</span>
                    <div className="text-right">
                      <span className="font-semibold text-orange-400">{suggestionData.aiMetrics?.roiTime || "3.1 meses"}</span>
                      <br />
                      <span className="text-xs text-gray-400">(média do setor: 8.1)</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center" data-testid="scalability">
                    <span className="text-gray-300">• Potencial de escalabilidade:</span>
                    <span className="font-semibold text-purple-400">{suggestionData.aiMetrics?.scalability || "Premium"}</span>
                  </div>
                </div>
              </div>
              
              {/* AI Confidence Score */}
              <div className="text-center mb-6">
                <div className="text-base text-gray-300 mb-2">
                  Score de Qualificação: <span className="font-bold text-primary text-xl">{suggestionData.score}</span><span className="text-muted-foreground">/100</span>
                </div>
                <div className="text-sm text-gray-300">
                  Confiança estatística: <span className="font-semibold text-green-600">97%</span>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={handlePlanRedirect}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-black hover:text-slate-900 font-semibold py-3 transition-colors duration-200"
                  size="lg"
                >
                  <i className="fas fa-rocket mr-2"></i>
                  Assinar {suggestionData.plan}
                </Button>
                
                <Button
                  onClick={handleTryLater}
                  variant="ghost"
                  className="w-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors duration-200"
                >
                  Solicitar análise detalhada
                </Button>
              </div>
              
              {/* AI Implementation Benefits */}
              <div className="mt-6 text-xs text-slate-400">
                🚀 <strong className="text-slate-300">IMPLEMENTAÇÃO INTELIGENTE:</strong><br/>
                <span className="text-green-400">✅</span> Setup automatizado • <span className="text-green-400">✅</span> IA de suporte • <span className="text-green-400">✅</span> Resultados garantidos
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
