import Header from "@/components/Header";
import PurchaseNotification from "@/components/purchase-notification";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function Integracoes() {
  const [, setLocation] = useLocation();

  const handleViewPlans = () => {
    // Navigate to home page and scroll to pricing section
    window.location.href = '/#pricing';
  };

  const handleScheduleDemo = () => {
    // Navigate to home page and scroll to demo booking section
    window.location.href = '/#demo-booking';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Purchase Notifications */}
      <PurchaseNotification />
      
      {/* Navigation */}
      <Header />

      {/* Content */}
      <main className="luxury-gradient">
        <div className="max-w-4xl mx-auto px-8 pt-32 pb-20">
          
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-light mb-6">
              <span className="luxury-text">Integrações</span> <span className="luxury-accent font-medium">Poderosas</span>
            </h1>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-8"></div>
            <p className="text-xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
              Conecte sua <span className="text-accent">Secretária IA</span> com as principais ferramentas do seu negócio
            </p>
          </div>

          {/* Popular Integrations Section */}
          <section className="luxury-card p-8 rounded-xl mb-12">
            <h2 className="text-2xl font-medium mb-8 luxury-accent">Integrações Populares</h2>
            <div className="grid md:grid-cols-2 gap-6">
              
              <div className="border border-border rounded-lg p-6">
                <div className="text-green-500 mb-4">
                  <i className="fab fa-whatsapp text-3xl"></i>
                </div>
                <h3 className="text-xl font-medium mb-3">WhatsApp Business API</h3>
                <p className="text-muted-foreground mb-4">
                  Integração nativa com WhatsApp Business para automação completa de conversas,
                  incluindo envio de mensagens, templates e mídia.
                </p>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500">
                  Ativa por padrão
                </span>
              </div>

              <div className="border border-border rounded-lg p-6">
                <div className="text-blue-500 mb-4">
                  <i className="fab fa-google text-3xl"></i>
                </div>
                <h3 className="text-xl font-medium mb-3">Google Calendar</h3>
                <p className="text-muted-foreground mb-4">
                  Agendamento automático de reuniões e consultas diretamente pelo WhatsApp,
                  com sincronização em tempo real.
                </p>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500">
                  Disponível
                </span>
              </div>

              <div className="border border-border rounded-lg p-6">
                <div className="text-orange-500 mb-4">
                  <i className="fas fa-users text-3xl"></i>
                </div>
                <h3 className="text-xl font-medium mb-3">CRM Integrations</h3>
                <p className="text-muted-foreground mb-4">
                  Conecte com HubSpot, Salesforce, Pipedrive e outros CRMs para 
                  sincronizar leads e oportunidades automaticamente.
                </p>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-500/10 text-orange-500">
                  Múltiplas opções
                </span>
              </div>

              <div className="border border-border rounded-lg p-6">
                <div className="text-purple-500 mb-4">
                  <i className="fas fa-chart-bar text-3xl"></i>
                </div>
                <h3 className="text-xl font-medium mb-3">Analytics & BI</h3>
                <p className="text-muted-foreground mb-4">
                  Integração com Google Analytics, Power BI e outras ferramentas
                  para análise completa do desempenho.
                </p>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-500">
                  Premium
                </span>
              </div>

            </div>
          </section>

          {/* API Section */}
          <section className="luxury-card p-8 rounded-xl mb-12">
            <h2 className="text-2xl font-medium mb-6 luxury-accent">API RESTful</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Nossa API RESTful permite integrações customizadas com qualquer sistema,
              oferecendo endpoints para todas as funcionalidades da plataforma.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="luxury-glass w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-code text-accent"></i>
                </div>
                <h4 className="font-medium mb-2">RESTful</h4>
                <p className="text-sm text-muted-foreground">
                  Endpoints padronizados e documentados
                </p>
              </div>
              
              <div className="text-center">
                <div className="luxury-glass w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-lock text-accent"></i>
                </div>
                <h4 className="font-medium mb-2">Segura</h4>
                <p className="text-sm text-muted-foreground">
                  Autenticação OAuth 2.0 e HTTPS
                </p>
              </div>
              
              <div className="text-center">
                <div className="luxury-glass w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-tachometer-alt text-accent"></i>
                </div>
                <h4 className="font-medium mb-2">Rápida</h4>
                <p className="text-sm text-muted-foreground">
                  Baixa latência e alta disponibilidade
                </p>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 border border-border">
              <code className="text-sm text-muted-foreground">
                POST /api/v1/messages<br/>
                GET /api/v1/contacts<br/>
                PUT /api/v1/automations/{'{id}'}
              </code>
            </div>

            {/* Mid-page CTA */}
            <div className="mt-8 text-center">
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-6">
                <h4 className="text-xl font-bold mb-3">Pronto para integrar?</h4>
                <p className="text-muted-foreground mb-6">
                  Nossa API facilita a conexão com qualquer sistema em minutos
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button 
                    onClick={handleScheduleDemo}
                    className="bg-accent text-accent-foreground hover:bg-accent/90 hover:text-accent-foreground font-semibold px-6 py-3"
                  >
                    <i className="fas fa-code mr-2"></i>
                    Ver API em Ação
                  </Button>
                  <Button 
                    onClick={handleViewPlans}
                    variant="outline" 
                    className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground font-semibold px-6 py-3"
                  >
                    <i className="fas fa-rocket mr-2"></i>
                    Escolher Plano
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Webhooks Section */}
          <section className="luxury-card p-8 rounded-xl">
            <h2 className="text-2xl font-medium mb-6 luxury-accent">Webhooks</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Receba notificações em tempo real sobre eventos importantes,
              como novas mensagens, leads qualificados ou agendamentos.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 border border-border rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-medium">Nova mensagem recebida</span>
              </div>
              <div className="flex items-center space-x-3 p-4 border border-border rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="font-medium">Lead qualificado</span>
              </div>
              <div className="flex items-center space-x-3 p-4 border border-border rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="font-medium">Agendamento confirmado</span>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="mt-12 text-center">
            <div className="luxury-card p-8 rounded-xl">
              <h2 className="text-2xl font-bold mb-4">
                Conecte Todas Suas <span className="text-accent">Ferramentas</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                Integração simples com suas ferramentas favoritas em menos de 5 minutos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Button 
                  onClick={handleScheduleDemo}
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 hover:text-accent-foreground font-bold px-8 py-4"
                >
                  <i className="fas fa-plug mr-2"></i>
                  Ver Demo das Integrações
                </Button>
                <Button 
                  onClick={handleViewPlans}
                  size="lg" 
                  variant="outline"
                  className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground font-bold px-8 py-4"
                >
                  <i className="fas fa-rocket mr-2"></i>
                  Começar Agora
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                ✓ Setup automático ✓ Suporte técnico ✓ Integrações ilimitadas
              </p>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}