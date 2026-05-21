import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { apiRequest } from "@/lib/queryClient";

interface ROIResults {
  lostLeads: number;
  lostRevenue: number;
  timeCost: number;
  totalSavings: number;
  roi: number;
}

interface PlanRecommendation {
  id: string;
  name: string;
  price: number;
  annualPrice: number;
  reason: string;
  savings: string;
  features: string[];
}

export default function ROICalculator() {
  const [, setLocation] = useLocation();
  const [leads, setLeads] = useState(150);
  const [ticket, setTicket] = useState(800);
  const [hours, setHours] = useState(4);
  const [businessType, setBusinessType] = useState("consulting");
  const [isCalculating, setIsCalculating] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [results, setResults] = useState<ROIResults>({
    lostLeads: 0,
    lostRevenue: 0,
    timeCost: 0,
    totalSavings: 0,
    roi: 0
  });

  const calculateROI = async () => {
    setIsCalculating(true);
    try {
      const response = await apiRequest("POST", "/api/calculate-roi", {
        leads,
        ticket,
        hours,
        businessType
      });
      const data = await response.json();
      setResults(data);
      setHasCalculated(true);
    } catch (error) {
      console.error("Error calculating ROI:", error);
    } finally {
      setIsCalculating(false);
    }
  };

  const getRecommendedPlan = (): PlanRecommendation => {
    const monthlySavings = results.totalSavings;
    
    if (monthlySavings >= 5000) {
      return {
        id: "ouro",
        name: "Ouro - Automação Completa",
        price: 697,
        annualPrice: 523,
        reason: "Com uma economia de R$ " + monthlySavings.toLocaleString('pt-BR') + "/mês, o plano Ouro oferece o melhor custo-benefício e ROI máximo para sua empresa.",
        savings: "Economia líquida de R$ " + (monthlySavings - 697).toLocaleString('pt-BR') + "/mês",
        features: ["Chat IA humanizado", "Agendamento automático", "Gravação + transcrição", "Follow-up inteligente", "Success Manager dedicado"]
      };
    } else if (monthlySavings >= 2500) {
      return {
        id: "prata",
        name: "Prata - IA + Agenda",
        price: 497,
        annualPrice: 373,
        reason: "Para sua economia de R$ " + monthlySavings.toLocaleString('pt-BR') + "/mês, o plano Prata oferece automação de agendamentos e excelente retorno.",
        savings: "Economia líquida de R$ " + (monthlySavings - 497).toLocaleString('pt-BR') + "/mês",
        features: ["Chat IA humanizado", "Agendamento automático", "Google Calendar", "Multi-usuários", "Suporte prioritário"]
      };
    } else {
      return {
        id: "bronze",
        name: "Bronze - Setup Rápido",
        price: 197,
        annualPrice: 148,
        reason: "Começe economizando R$ " + monthlySavings.toLocaleString('pt-BR') + "/mês com o plano Bronze - perfeito para iniciar sua automação.",
        savings: "Economia líquida de R$ " + (monthlySavings - 197).toLocaleString('pt-BR') + "/mês",
        features: ["Chat IA humanizado", "Conversas ilimitadas", "Atendimento 24/7", "Setup em 24h", "Dashboard básico"]
      };
    }
  };

  const handleStartNow = () => {
    if (hasCalculated) {
      setShowRecommendation(true);
    } else {
      setLocation("/checkout?plan=bronze&annual=false");
    }
  };

  const handleSelectPlan = (planId: string, isAnnual: boolean = false) => {
    setLocation(`/checkout?plan=${planId}&annual=${isAnnual}`);
    setShowRecommendation(false);
  };

  return (
    <section id="roi-calculator" className="py-20 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4" data-testid="roi-calculator-title">Calcule Seu ROI em 30 Segundos</h2>
          <p className="text-xl text-muted-foreground">Descubra quanto você pode economizar com automação inteligente</p>
        </div>
        
        <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Calculator Inputs */}
            <div className="space-y-6">
              <div>
                <Label htmlFor="leads-month" className="block text-sm font-medium mb-2">
                  Quantos leads você recebe por mês no WhatsApp?
                </Label>
                <Input
                  id="leads-month"
                  type="number"
                  value={leads}
                  onChange={(e) => setLeads(parseInt(e.target.value) || 0)}
                  placeholder="Ex: 150"
                  data-testid="input-leads"
                />
              </div>
              
              <div>
                <Label htmlFor="ticket-average" className="block text-sm font-medium mb-2">
                  Qual seu ticket médio? (R$)
                </Label>
                <Input
                  id="ticket-average"
                  type="number"
                  value={ticket}
                  onChange={(e) => setTicket(parseFloat(e.target.value) || 0)}
                  placeholder="Ex: 800"
                  data-testid="input-ticket"
                />
              </div>
              
              <div>
                <Label htmlFor="hours-day" className="block text-sm font-medium mb-2">
                  Quantas horas por dia você gasta respondendo WhatsApp?
                </Label>
                <Select value={hours.toString()} onValueChange={(value) => setHours(parseInt(value))}>
                  <SelectTrigger data-testid="select-hours">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 horas</SelectItem>
                    <SelectItem value="4">4 horas</SelectItem>
                    <SelectItem value="6">6 horas</SelectItem>
                    <SelectItem value="8">8+ horas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="business-type" className="block text-sm font-medium mb-2">
                  Seu tipo de negócio:
                </Label>
                <Select value={businessType} onValueChange={setBusinessType}>
                  <SelectTrigger data-testid="select-business-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clinic">Clínica/Consultório</SelectItem>
                    <SelectItem value="law">Escritório de Advocacia</SelectItem>
                    <SelectItem value="consulting">Consultoria B2B</SelectItem>
                    <SelectItem value="ecommerce">E-commerce</SelectItem>
                    <SelectItem value="services">Outros Serviços</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button onClick={calculateROI} className="w-full" size="lg" data-testid="button-calculate-roi" disabled={isCalculating}>
                {isCalculating ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Calculando...
                  </>
                ) : (
                  <>
                    <i className="fas fa-calculator mr-2"></i>
                    Calcular Meu ROI
                  </>
                )}
              </Button>
            </div>
            
            {/* Results Display */}
            <div className="bg-card p-6 rounded-xl border border-border">
              <h3 className="text-xl font-bold mb-6 text-center">
                {hasCalculated ? "Seu Potencial de Economia" : "Clique em Calcular para Ver os Resultados"}
              </h3>
              
              <div className="space-y-4">
                <div className="bg-muted/30 p-4 rounded-lg border border-border" data-testid="result-lost-leads">
                  <div className="text-xs text-muted-foreground flex items-center mb-2">
                    <i className="fas fa-exclamation-triangle mr-2 text-muted-foreground"></i>
                    Leads Perdidos por Demora
                  </div>
                  <div className="text-2xl font-bold text-foreground">
                    {hasCalculated ? `${results.lostLeads} leads/mês` : "-- leads/mês"}
                  </div>
                </div>
                
                <div className="bg-muted/30 p-4 rounded-lg border border-border" data-testid="result-lost-revenue">
                  <div className="text-xs text-muted-foreground flex items-center mb-2">
                    <i className="fas fa-dollar-sign mr-2 text-muted-foreground"></i>
                    Receita Perdida Mensal
                  </div>
                  <div className="text-2xl font-bold text-foreground">
                    {hasCalculated ? `R$ ${results.lostRevenue.toLocaleString('pt-BR')}` : "R$ --"}
                  </div>
                </div>
                
                <div className="bg-muted/30 p-4 rounded-lg border border-border" data-testid="result-time-cost">
                  <div className="text-xs text-muted-foreground flex items-center mb-2">
                    <i className="fas fa-clock mr-2 text-muted-foreground"></i>
                    Custo do Seu Tempo
                  </div>
                  <div className="text-2xl font-bold text-foreground">
                    {hasCalculated ? `R$ ${results.timeCost.toLocaleString('pt-BR')}/mês` : "R$ --/mês"}
                  </div>
                </div>
                
                <div className="premium-card p-4 rounded-lg" data-testid="result-total-savings">
                  <div className="text-xs text-accent flex items-center mb-2">
                    <i className="fas fa-chart-line mr-2 text-accent"></i>
                    Economia Total com IA
                  </div>
                  <div className="text-3xl font-bold text-accent">
                    {hasCalculated ? `R$ ${results.totalSavings.toLocaleString('pt-BR')}/mês` : "R$ --/mês"}
                  </div>
                </div>
                
                <div className="premium-card p-4 rounded-lg" data-testid="result-annual-roi">
                  <div className="text-xs text-accent flex items-center mb-2">
                    <i className="fas fa-trophy mr-2 text-accent"></i>
                    ROI em 12 meses
                  </div>
                  <div className="text-3xl font-bold text-accent">
                    {hasCalculated ? `${results.roi.toLocaleString('pt-BR')}%` : "--%"}
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={handleStartNow}
                className="w-full mt-6 bg-accent text-accent-foreground hover:bg-accent/90" 
                data-testid="button-start-now"
                disabled={!hasCalculated}
              >
                {hasCalculated ? "Ver Melhor Plano Para Mim" : "Calcule Primeiro o ROI"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Plan Recommendation Modal */}
      <Dialog open={showRecommendation} onOpenChange={setShowRecommendation}>
        <DialogContent className="max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center mb-1">
              🎯 Plano Ideal Para Você
            </DialogTitle>
            <DialogDescription className="text-center text-sm">
              Economia: <span className="font-bold text-accent">R$ {results.totalSavings.toLocaleString('pt-BR')}/mês</span>
            </DialogDescription>
          </DialogHeader>
          
          {hasCalculated && (
            <div className="space-y-4">
              {(() => {
                const recommendedPlan = getRecommendedPlan();
                return (
                  <div className="bg-muted/30 p-4 rounded-lg border border-border">
                    <div className="text-center mb-3">
                      <h3 className="text-lg font-bold text-accent mb-1">{recommendedPlan.name}</h3>
                      <div className="mb-2">
                        <span className="text-2xl font-bold">R$ {recommendedPlan.price}</span>
                        <span className="text-muted-foreground text-sm">/mês</span>
                        <div className="text-xs text-muted-foreground">
                          ou <span className="font-semibold text-accent">R$ {recommendedPlan.annualPrice}/mês</span> anual
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2 leading-relaxed">{recommendedPlan.reason}</p>
                      <div className="bg-accent/20 text-accent font-semibold p-2 rounded text-sm">
                        ✨ {recommendedPlan.savings}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-1 mb-4">
                      {recommendedPlan.features.slice(0, 4).map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <i className="fas fa-check text-accent mr-2 text-xs"></i>
                          <span className="text-xs">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="space-y-2">
                      <Button 
                        onClick={() => handleSelectPlan(recommendedPlan.id, false)}
                        className="w-full bg-accent text-accent-foreground hover:!bg-accent hover:!text-accent-foreground py-2 text-sm font-semibold transition-colors"
                        style={{}}
                      >
                        Escolher Mensal - R$ {recommendedPlan.price}
                      </Button>
                      <Button 
                        onClick={() => handleSelectPlan(recommendedPlan.id, true)}
                        variant="outline"
                        className="w-full border-accent text-accent hover:!bg-accent hover:!text-accent-foreground py-2 text-sm font-semibold transition-colors"
                        style={{}}
                      >
                        Anual (3 meses grátis) - R$ {recommendedPlan.annualPrice}
                      </Button>
                    </div>
                  </div>
                );
              })()}
              
              <div className="text-center">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    setShowRecommendation(false);
                    // Navigate to home page and scroll to pricing section
                    if (window.location.pathname === '/') {
                      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      window.location.href = '/#pricing';
                    }
                  }}
                  className="text-xs text-muted-foreground hover:!bg-accent hover:!text-accent-foreground transition-colors"
                >
                  Ver Todos os Planos
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
