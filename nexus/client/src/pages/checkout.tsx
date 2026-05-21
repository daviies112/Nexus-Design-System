import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { apiRequest } from "@/lib/queryClient";

interface PlanInfo {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  features: string[];
  popular?: boolean;
}

const plans: Record<string, PlanInfo> = {
  bronze: {
    id: "bronze",
    name: "Bronze - Setup Rápido",
    price: 197,
    originalPrice: 197,
    features: [
      "Chat IA humanizado",
      "Conversas ilimitadas",
      "Encaminhamento para dono",
      "Dashboard básico", 
      "Atendimento 24/7",
      "Setup em 24h"
    ]
  },
  prata: {
    id: "prata", 
    name: "Prata - IA + Agenda",
    price: 497,
    originalPrice: 497,
    features: [
      "Tudo do Bronze +",
      "Agendamento automático",
      "Google Calendar integrado",
      "Multi-usuários (até 3)",
      "Setup personalizado",
      "Suporte prioritário"
    ],
    popular: true
  },
  ouro: {
    id: "ouro",
    name: "Ouro - Automação Completa", 
    price: 697,
    originalPrice: 697,
    features: [
      "Tudo do Prata +",
      "Gravação + transcrição reuniões",
      "Follow-up inteligente",
      "Sistema pausa/despause IA",
      "Success Manager dedicado", 
      "SLA 99,9% uptime"
    ]
  }
};

// Load Stripe outside of component render - fetch from backend
let stripePromise: Promise<any> | null = null;

const initializeStripe = async () => {
  try {
    const response = await fetch('/api/stripe-config');
    const { publicKey } = await response.json();
    if (!publicKey) {
      throw new Error('Missing Stripe configuration');
    }
    return loadStripe(publicKey);
  } catch (error) {
    console.error('Failed to initialize Stripe:', error);
    throw new Error('Failed to load payment system');
  }
};

stripePromise = initializeStripe();

const StripeCheckoutForm = ({ plan, isAnnual, couponCode, couponDiscount }: { plan: PlanInfo, isAnnual: boolean, couponCode: string, couponDiscount: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/pos-pagamento?plan=${plan.id}&billing=${isAnnual ? 'anual' : 'mensal'}`,
          payment_method_data: {
            billing_details: {
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
            },
          },
        },
      });

      if (error) {
        // Log failed payment for analytics
        try {
          const pagamentoData = {
            nome: formData.name,
            email: formData.email,
            telefone: formData.phone,
            empresa: formData.company,
            planoEscolhido: plan.id,
            valorPlano: finalPrice.toString(),
            cicloCobranca: isAnnual ? "anual" : "mensal",
            motivoRecusa: error.message || "Erro desconhecido",
            tentativas: 1,
            origem: "checkout"
          };

          await fetch('/api/pagamento-recusado', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pagamentoData)
          });
        } catch (logError) {
          console.error('Erro ao registrar pagamento recusado:', logError);
        }

        toast({
          title: "❌ Pagamento Falhou",
          description: error.message || "Houve um problema com o pagamento. Tente novamente.",
          variant: "destructive"
        });
      }
    } catch (error: any) {
      toast({
        title: "❌ Erro no Pagamento",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const basePrice = isAnnual ? Math.round(plan.price * 0.75) : plan.price;
  const finalPrice = Math.round(basePrice * (1 - couponDiscount / 100));
  const annualDiscount = isAnnual ? Math.round(plan.price * 0.25 * 12) : 0;
  const couponSavings = Math.round(basePrice * couponDiscount / 100);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2" data-testid="checkout-title">
            Finalizar Assinatura - {plan.name}
          </h1>
          <p className="text-muted-foreground">
            Complete seu pagamento e substitua sua secretária hoje mesmo
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Plan Summary */}
          <div>
            <Card className={plan.popular ? "border-primary" : ""}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  {plan.popular && <Badge className="bg-primary">⭐ Mais Escolhido</Badge>}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Pricing */}
                <div className="text-center py-4">
                  {isAnnual && (
                    <div className="text-sm text-muted-foreground line-through">
                      R$ {plan.originalPrice}/mês
                    </div>
                  )}
                  <div className="text-3xl font-bold">
                    R$ {finalPrice.toLocaleString('pt-BR')}
                    <span className="text-base text-muted-foreground font-normal">/mês</span>
                  </div>
                  {isAnnual && (
                    <div className="text-sm text-accent font-semibold mt-1">
                      Economia de R$ {annualDiscount.toLocaleString('pt-BR')}/ano (3 meses grátis)
                    </div>
                  )}
                  {couponDiscount > 0 && (
                    <div className="text-sm text-green-600 font-semibold mt-1">
                      🎉 Desconto aplicado: {couponDiscount}% (R$ -{couponSavings.toLocaleString('pt-BR')})
                    </div>
                  )}
                  {!isAnnual && plan.id === 'bronze' && (
                    <div className="text-sm text-accent font-semibold mt-1">
                      💰 Economia de R$ 3.303/mês vs funcionário
                    </div>
                  )}
                  {!isAnnual && plan.id === 'prata' && (
                    <div className="text-sm text-accent font-semibold mt-1">
                      💰 Economia de R$ 3.703/mês vs funcionário
                    </div>
                  )}
                  {!isAnnual && plan.id === 'ouro' && (
                    <div className="text-sm text-accent font-semibold mt-1">
                      💰 Economia de R$ 5.803/mês vs funcionários
                    </div>
                  )}
                  <div className="text-sm text-muted-foreground mt-2">
                    {isAnnual ? "Cobrança anual" : "Cobrança mensal"}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h4 className="font-semibold mb-3">Incluído no plano:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <i className="fas fa-check text-accent mr-2"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Guarantees */}
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-sm">🎁 Garantias incluídas:</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    {plan.id === 'bronze' && (
                      <>
                        <div className="flex items-center">
                          <i className="fas fa-clock text-accent mr-2"></i>
                          Setup em 24h
                        </div>
                        <div className="flex items-center">
                          <i className="fas fa-undo text-accent mr-2"></i>
                          Cancelamento a qualquer momento
                        </div>
                        <div className="flex items-center">
                          <i className="fas fa-headset text-accent mr-2"></i>
                          Suporte especializado
                        </div>
                        <div className="flex items-center">
                          <i className="fas fa-shield-check text-accent mr-2"></i>
                          Garantia de funcionamento
                        </div>
                      </>
                    )}
                    {plan.id === 'prata' && (
                      <>
                        <div className="flex items-center">
                          <i className="fas fa-clock text-accent mr-2"></i>
                          Setup personalizado em 24h
                        </div>
                        <div className="flex items-center">
                          <i className="fas fa-undo text-accent mr-2"></i>
                          Cancelamento a qualquer momento
                        </div>
                        <div className="flex items-center">
                          <i className="fas fa-star text-accent mr-2"></i>
                          Suporte prioritário
                        </div>
                        <div className="flex items-center">
                          <i className="fas fa-heart text-accent mr-2"></i>
                          Garantia de satisfação
                        </div>
                      </>
                    )}
                    {plan.id === 'ouro' && (
                      <>
                        <div className="flex items-center">
                          <i className="fas fa-clock text-accent mr-2"></i>
                          Setup completo em 24h
                        </div>
                        <div className="flex items-center">
                          <i className="fas fa-undo text-accent mr-2"></i>
                          Cancelamento a qualquer momento
                        </div>
                        <div className="flex items-center">
                          <i className="fas fa-user-tie text-accent mr-2"></i>
                          Success Manager dedicado
                        </div>
                        <div className="flex items-center">
                          <i className="fas fa-chart-line text-accent mr-2"></i>
                          SLA 99,9% de funcionamento
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Dados de Pagamento</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Pagamento seguro processado pelo Stripe
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Cupom de Desconto */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-sm">Código de Desconto</h4>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Digite seu código de cupom"
                        value={couponCode}
                        onChange={(e) => (window as any).applyCoupon?.(e.target.value.toUpperCase())}
                        className="flex-1"
                      />
                      {couponDiscount > 0 && (
                        <div className="flex items-center px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                          ✓ {couponDiscount}% OFF
                        </div>
                      )}
                    </div>
                    {couponCode && couponDiscount === 0 && (
                      <div className="text-sm text-red-600">
                        Código de cupom inválido
                      </div>
                    )}
                  </div>

                  {/* Informações Pessoais */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-sm">Informações de Contato</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nome Completo</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Seu nome completo"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="seu@email.com"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">WhatsApp</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="(11) 99999-9999"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="company">Empresa</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                          placeholder="Nome da empresa"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Stripe Payment Element */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-sm text-foreground">Dados do Cartão</h4>
                    <div className="border border-border bg-muted/20 rounded-lg p-4">
                      <PaymentElement />
                    </div>
                    <div className="text-xs text-muted-foreground bg-muted/30 border border-muted-foreground/20 p-3 rounded-lg">
                      <i className="fas fa-shield-alt mr-1 text-green-600"></i>
                      <strong className="text-foreground">Pagamento Seguro:</strong> Processado pelo Stripe com criptografia de nível bancário.
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isProcessing || !stripe || !elements} 
                    className="w-full" 
                    size="lg"
                    data-testid="submit-payment"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                        Processando Pagamento...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-credit-card mr-2"></i>
                        Finalizar Pagamento - R$ {finalPrice.toLocaleString('pt-BR')}/mês
                      </>
                    )}
                  </Button>
                  
                  <div className="text-center text-xs text-muted-foreground">
                    <p>
                      <i className="fas fa-shield-alt mr-1"></i>
                      Pagamento seguro e criptografado
                    </p>
                    <p className="mt-1">
                      Ao confirmar, você concorda com nossos 
                      <a href="#" className="text-primary hover:underline ml-1">Termos de Serviço</a>
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Support */}
            <div className="mt-6 text-center">
              <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mb-4">
                <p className="text-accent font-semibold text-sm">💰 Pare de pagar salários desnecessários hoje mesmo</p>
                <p className="text-muted-foreground text-xs mt-1">⚡ Cada dia sem automação = R$ 116 desperdiçados</p>
                <p className="text-accent font-medium text-xs mt-2">🎯 Retorno garantido no primeiro mês</p>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                💡 Dica: 90% dos clientes escolhem o Plano Ouro por oferecer o melhor custo-benefício vs contratar funcionários!
              </p>
              <p className="text-sm text-muted-foreground mb-2 mt-4">
                📞 Precisa de ajuda? Fale conosco:
              </p>
              <div className="flex justify-center space-x-4 text-sm">
                <a 
                  href="https://wa.me/5511999999999" 
                  className="text-accent hover:underline flex items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-whatsapp mr-1"></i>
                  WhatsApp
                </a>
                <a 
                  href="mailto:suporte@secretariaiawhatsapp.com" 
                  className="text-accent hover:underline flex items-center"
                >
                  <i className="fas fa-envelope mr-1"></i>
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main checkout wrapper with Stripe Elements
const CheckoutWrapper = ({ plan, isAnnual }: { plan: PlanInfo, isAnnual: boolean }) => {
  const [clientSecret, setClientSecret] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Coupon codes and discounts
  const validCoupons: Record<string, number> = {
    'BEMVINDO20': 20,
    'SAVE15': 15,
    'DESCONTO10': 10,
    'PRIMEIRO': 25,
    'NATAL20': 20,
    'BLACKFRIDAY': 30
  };

  // Apply coupon function exposed globally for the input
  useEffect(() => {
    (window as any).applyCoupon = (code: string) => {
      setCouponCode(code);
      if (validCoupons[code]) {
        setCouponDiscount(validCoupons[code]);
        toast({
          title: "🎉 Cupom aplicado!",
          description: `Desconto de ${validCoupons[code]}% aplicado com sucesso.`,
        });
      } else {
        setCouponDiscount(0);
      }
    };
    return () => {
      delete (window as any).applyCoupon;
    };
  }, [toast]);

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const basePrice = isAnnual ? Math.round(plan.price * 0.75) : plan.price;
        const finalAmount = Math.round(basePrice * (1 - couponDiscount / 100));
        
        const response = await apiRequest("POST", "/api/create-payment-intent", {
          amount: finalAmount,
          currency: 'brl',
          plan_id: plan.id,
          billing_cycle: isAnnual ? 'annual' : 'monthly',
          coupon_code: couponCode || null,
          coupon_discount: couponDiscount
        });
        
        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error('Error creating payment intent:', error);
        toast({
          title: "Erro",
          description: "Não foi possível inicializar o pagamento. Tente novamente.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    createPaymentIntent();
  }, [plan.id, plan.price, isAnnual, couponDiscount, couponCode, toast]);

  if (loading || !clientSecret) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-muted-foreground">Preparando pagamento...</p>
        </div>
      </div>
    );
  }

  const stripeOptions = {
    clientSecret,
    appearance: {
      theme: 'night' as const,
      variables: {
        colorPrimary: '#ffffff',
        colorBackground: '#1e293b', // slate-800 equivalente
        colorText: '#f8fafc', // slate-50 equivalente  
        colorDanger: '#ef4444',
        borderRadius: '8px',
        fontFamily: 'Inter, system-ui, sans-serif',
        fontSize: '14px',
      },
      rules: {
        '.Input': {
          backgroundColor: '#334155', // slate-700 equivalente
          border: '1px solid #475569', // slate-600 equivalente
          color: '#f8fafc',
        },
        '.Input:focus': {
          border: '1px solid #ffffff',
          boxShadow: '0 0 0 1px #ffffff',
        },
        '.Label': {
          color: '#cbd5e1', // slate-300 equivalente
          fontWeight: '500',
        },
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={stripeOptions}>
      <StripeCheckoutForm 
        plan={plan} 
        isAnnual={isAnnual} 
        couponCode={couponCode}
        couponDiscount={couponDiscount}
      />
    </Elements>
  );
};

export default function Checkout() {
  const [error, setError] = useState("");
  const [, setLocation] = useLocation();

  // Parse URL params
  const urlParams = new URLSearchParams(window.location.search);
  const planId = urlParams.get('plan') || 'prata';
  const isAnnual = urlParams.get('annual') === 'true';

  const plan = plans[planId];

  if (error || !plan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <i className="fas fa-exclamation-triangle text-destructive text-4xl mb-4"></i>
            <h1 className="text-xl font-bold text-foreground mb-2">Erro no Checkout</h1>
            <p className="text-muted-foreground mb-4">
              {error || "Plano não encontrado"}
            </p>
            <Button onClick={() => setLocation("/")} data-testid="back-home">
              <i className="fas fa-arrow-left mr-2"></i>
              Voltar ao Início
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <CheckoutWrapper plan={plan} isAnnual={isAnnual} />;
}
