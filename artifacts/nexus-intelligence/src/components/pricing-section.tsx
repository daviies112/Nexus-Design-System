import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useLocation } from "wouter";

interface PricingPlan {
  id: string;
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  features: string[];
  popular?: boolean;
  buttonText: string;
  buttonVariant: "default" | "outline";
}

const plans: PricingPlan[] = [
  {
    id: "bronze",
    name: "Bronze - Setup Rápido",
    monthlyPrice: 197,
    annualPrice: 148, // 25% off (3 meses grátis)
    description: "Pare de pagar salários desnecessários hoje mesmo • Economia de R$ 3.303/mês vs funcionário",
    features: [
      "Chat IA humanizado",
      "Conversas ilimitadas",
      "Encaminhamento para dono",
      "Dashboard básico",
      "Atendimento 24/7",
      "Setup em 24h"
    ],
    buttonText: "Começar Agora - R$ 197",
    buttonVariant: "outline"
  },
  {
    id: "prata",
    name: "Prata - IA + Agenda",
    monthlyPrice: 497,
    annualPrice: 373, // 25% off (3 meses grátis)
    description: "Para empresas que querem automatizar agendamentos • Economia de R$ 3.703/mês vs funcionário",
    features: [
      "Tudo do Bronze +",
      "Agendamento automático",
      "Google Calendar integrado",
      "Multi-usuários (até 3)",
      "Setup personalizado",
      "Suporte prioritário"
    ],
    buttonText: "Escolher Prata - R$ 497",
    buttonVariant: "outline"
  },
  {
    id: "ouro",
    name: "Ouro - Automação Completa",
    monthlyPrice: 697,
    annualPrice: 523, // 25% off (3 meses grátis)
    description: "Para empresas que querem substituir múltiplos funcionários • Economia de R$ 5.803/mês vs funcionários",
    features: [
      "Tudo do Prata +",
      "Gravação + transcrição reuniões",
      "Follow-up inteligente",
      "Sistema pausa/despause IA",
      "Success Manager dedicado",
      "SLA 99,9% uptime"
    ],
    popular: true,
    buttonText: "Escolher Ouro - R$ 697",
    buttonVariant: "default"
  },
  {
    id: "enterprise",
    name: "Enterprise - White Label",
    monthlyPrice: 0,
    annualPrice: 0,
    description: "Solução white label para agências e grandes empresas",
    features: [
      "Volume ilimitado",
      "White label completo",
      "Desenvolvimento dedicado",
      "Suporte 24/7",
      "Consultoria estratégica"
    ],
    buttonText: "Solicitar Proposta",
    buttonVariant: "default"
  }
];

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [, setLocation] = useLocation();

  const handlePlanSelect = (plan: PricingPlan) => {
    if (plan.id === "enterprise") {
      // Redirect to contact or custom quote
      window.open("https://wa.me/5511999999999?text=Gostaria%20de%20mais%20informações%20sobre%20o%20plano%20" + plan.name, "_blank");
    } else {
      // Redirect to checkout
      setLocation(`/checkout?plan=${plan.id}&annual=${isAnnual}`);
    }
  };

  return (
    <section id="pricing" className="py-12 md:py-20 bg-background nexus-pattern-bg">
      <div className="max-w-7xl mx-auto mobile-padding relative z-10">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 px-4" data-testid="pricing-title">Substitua Funcionários por Automação Inteligente</h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-4 px-4">Economize até R$ 5.800/mês vs contratar secretária e atendente</p>
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 md:p-4 mb-6 mx-auto max-w-2xl mobile-padding">
            <p className="text-accent font-semibold text-base md:text-lg">⚡ Comece hoje e substitua sua secretária em 24h</p>
            <p className="text-muted-foreground text-xs md:text-sm mt-1">Setup imediato - Resultados garantidos em 24h</p>
          </div>
          
          <div className="flex items-center justify-center space-x-3 md:space-x-4 mb-6 md:mb-8 px-4">
            <span className="text-sm md:text-base text-muted-foreground">Mensal</span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              data-testid="annual-toggle"
            />
            <span className="text-sm md:text-base text-muted-foreground">
              Anual <span className="text-accent font-semibold">(3 meses grátis)</span>
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-card rounded-xl md:rounded-2xl p-4 md:p-6 hover:shadow-lg transition-all duration-300 relative luxury-card ${
                plan.popular ? "border-2 border-primary nexus-pricing-decoration nexus-card-accent" : "border border-border"
              } ${plan.id === "enterprise" ? "bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-dashed border-primary/30 nexus-card-accent" : ""}`}
              data-testid={`plan-${plan.id}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 md:-top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-3 md:px-4 py-1 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap">
                    ⭐ Mais Escolhido
                  </span>
                </div>
              )}
              
              <div className="text-center">
                <h3 className="text-base md:text-lg font-semibold mb-2 leading-tight">{plan.name}</h3>
                <div className="mb-3 md:mb-4">
                  {plan.id === "enterprise" ? (
                    <span className="text-2xl md:text-3xl font-bold">Sob consulta</span>
                  ) : (
                    <>
                      <span className="text-2xl md:text-3xl font-bold">
                        R$ {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                      </span>
                      <span className="text-muted-foreground text-sm md:text-base">/mês</span>
                    </>
                  )}
                </div>
                <p className="text-xs md:text-sm text-muted-foreground mb-4 md:mb-6 leading-relaxed">{plan.description}</p>
              </div>
              
              <ul className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <i className="fas fa-check text-accent mr-2 text-xs md:text-sm"></i>
                    <span className="text-xs md:text-sm leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button
                className="w-full touch-target text-sm md:text-base py-2 md:py-3"
                variant={plan.buttonVariant}
                onClick={() => handlePlanSelect(plan)}
                data-testid={`button-select-${plan.id}`}
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8 md:mt-12">
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 md:p-6 mb-6 md:mb-8 mx-auto max-w-4xl">
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">🔥 Setup Imediato</h3>
            <p className="text-muted-foreground mb-3 md:mb-4 text-sm md:text-base">Configuração em até 24h após pagamento</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 text-xs md:text-sm">
              <div className="flex items-center justify-center p-2">
                <i className="fas fa-users text-accent mr-2"></i>
                <span className="text-center">Mais de 300 empresas economizam milhares mensalmente</span>
              </div>
              <div className="flex items-center justify-center p-2">
                <i className="fas fa-clock text-accent mr-2"></i>
                <span className="text-center">Setup médio: 18 horas após contratação</span>
              </div>
              <div className="flex items-center justify-center p-2">
                <i className="fas fa-chart-line text-accent mr-2"></i>
                <span className="text-center">94% mantêm o serviço após primeiro mês</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
