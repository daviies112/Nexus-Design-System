import Header from "@/components/Header";
import PurchaseNotification from "@/components/purchase-notification";
import { Button } from "@/components/ui/button";
export default function Funcionalidades() {

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
      
      {/* Header */}
      <Header />

      {/* Content */}
      <main className="luxury-gradient">
        <div className="max-w-4xl mx-auto px-8 pt-32 pb-20">
          
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-light mb-6">
              <span className="luxury-text">Funcionalidades</span> <span className="luxury-accent font-medium">Avançadas</span>
            </h1>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-8"></div>
            <p className="text-xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
              Descubra todas as <span className="text-accent">capacidades inteligentes</span> da nossa Secretária IA
            </p>
          </div>

          {/* Core Features Section */}
          <section className="luxury-card p-8 rounded-xl mb-12">
            <h2 className="text-2xl font-medium mb-8 luxury-accent">Automação Inteligente</h2>
            <div className="grid md:grid-cols-2 gap-6">
              
              <div className="border border-border rounded-lg p-6">
                <div className="text-green-500 mb-4">
                  <i className="fas fa-robot text-3xl"></i>
                </div>
                <h3 className="text-xl font-medium mb-3">Respostas Automáticas</h3>
                <p className="text-muted-foreground mb-4">
                  IA responde instantaneamente a perguntas comuns, qualifica leads e 
                  agenda reuniões automaticamente, mesmo fora do horário comercial.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Respostas contextualizadas</li>
                  <li>• Múltiplas línguas</li>
                  <li>• Aprendizado contínuo</li>
                </ul>
              </div>

              <div className="border border-border rounded-lg p-6">
                <div className="text-blue-500 mb-4">
                  <i className="fas fa-calendar-check text-3xl"></i>
                </div>
                <h3 className="text-xl font-medium mb-3">Agendamento Inteligente</h3>
                <p className="text-muted-foreground mb-4">
                  Integração com Google Calendar, Outlook e outros para agendamento 
                  automático considerando disponibilidade e preferências.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Sincronização automática</li>
                  <li>• Lembretes inteligentes</li>
                  <li>• Reagendamento fácil</li>
                </ul>
              </div>

              <div className="border border-border rounded-lg p-6">
                <div className="text-purple-500 mb-4">
                  <i className="fas fa-user-check text-3xl"></i>
                </div>
                <h3 className="text-xl font-medium mb-3">Qualificação de Leads</h3>
                <p className="text-muted-foreground mb-4">
                  Análise automática do perfil e interesse do lead, atribuindo 
                  pontuações e categorizando por potencial de conversão.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Score automático de leads</li>
                  <li>• Segmentação inteligente</li>
                  <li>• Priorização de contatos</li>
                </ul>
              </div>

              <div className="border border-border rounded-lg p-6">
                <div className="text-orange-500 mb-4">
                  <i className="fas fa-chart-line text-3xl"></i>
                </div>
                <h3 className="text-xl font-medium mb-3">Análise de Sentimento</h3>
                <p className="text-muted-foreground mb-4">
                  Detecta humor e intenção do cliente, adaptando a abordagem 
                  para maximizar satisfação e conversão.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Detecção de urgência</li>
                  <li>• Análise emocional</li>
                  <li>• Resposta personalizada</li>
                </ul>
              </div>

            </div>
          </section>

          {/* Advanced Features Section */}
          <section className="luxury-card p-8 rounded-xl mb-12">
            <h2 className="text-2xl font-medium mb-8 luxury-accent">Recursos Avançados</h2>
            <div className="space-y-6">
              
              <div className="flex items-start space-x-4 p-4 border border-border rounded-lg">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-brain text-accent text-xl"></i>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Processamento de Linguagem Natural (NLP)</h4>
                  <p className="text-muted-foreground text-sm">
                    Compreende contexto, intenções e nuances da linguagem humana, proporcionando 
                    conversas mais naturais e eficazes.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 border border-border rounded-lg">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-sync-alt text-accent text-xl"></i>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Follow-up Automático</h4>
                  <p className="text-muted-foreground text-sm">
                    Sistema de follow-up inteligente que reativa leads frios, envia lembretes 
                    personalizados e mantém engajamento constante.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 border border-border rounded-lg">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-file-alt text-accent text-xl"></i>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Templates Personalizáveis</h4>
                  <p className="text-muted-foreground text-sm">
                    Biblioteca de templates para diferentes situações, totalmente personalizáveis 
                    para refletir a voz e tom da sua marca.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 border border-border rounded-lg">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-tags text-accent text-xl"></i>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Etiquetagem Automática</h4>
                  <p className="text-muted-foreground text-sm">
                    Organiza conversas automaticamente por categoria, urgência, status e 
                    outros critérios para melhor gestão.
                  </p>
                </div>
              </div>

            </div>
          </section>

          {/* Analytics Section */}
          <section className="luxury-card p-8 rounded-xl mb-12">
            <h2 className="text-2xl font-medium mb-6 luxury-accent">Análises e Relatórios</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              
              <div className="text-center">
                <div className="luxury-glass w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-chart-bar text-2xl text-accent"></i>
                </div>
                <h4 className="font-medium mb-2">Métricas de Performance</h4>
                <p className="text-sm text-muted-foreground">
                  Tempo de resposta, taxa de conversão e satisfação do cliente
                </p>
              </div>

              <div className="text-center">
                <div className="luxury-glass w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-clock text-2xl text-accent"></i>
                </div>
                <h4 className="font-medium mb-2">Relatórios em Tempo Real</h4>
                <p className="text-sm text-muted-foreground">
                  Dashboard ao vivo com atualizações instantâneas de atividades
                </p>
              </div>

              <div className="text-center">
                <div className="luxury-glass w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-download text-2xl text-accent"></i>
                </div>
                <h4 className="font-medium mb-2">Exportação de Dados</h4>
                <p className="text-sm text-muted-foreground">
                  Exporte relatórios em PDF, Excel ou integre com BI tools
                </p>
              </div>

            </div>

            <div className="bg-muted/30 rounded-lg p-6 border border-border">
              <h4 className="font-medium mb-3 text-center">ROI Médio Documentado</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <span className="text-2xl font-bold text-accent">156%</span>
                  <p className="text-sm text-muted-foreground">Retorno sobre investimento</p>
                </div>
                <div>
                  <span className="text-2xl font-bold text-accent">73%</span>
                  <p className="text-sm text-muted-foreground">Aumento em conversões</p>
                </div>
                <div>
                  <span className="text-2xl font-bold text-accent">40h/mês</span>
                  <p className="text-sm text-muted-foreground">Tempo economizado</p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-8 text-center">
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-6">
                <h4 className="text-xl font-bold mb-3">Quer esses resultados na sua empresa?</h4>
                <p className="text-muted-foreground mb-6">
                  Empresas que implementam nossa IA economizam em média <span className="text-accent font-semibold">R$ 15.600/mês</span> 
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button 
                    onClick={handleScheduleDemo}
                    className="bg-accent text-accent-foreground hover:bg-accent/90 hover:text-accent-foreground font-semibold px-6 py-3"
                  >
                    <i className="fas fa-calendar-alt mr-2"></i>
                    Agendar Demonstração Gratuita
                  </Button>
                  <Button 
                    onClick={handleViewPlans}
                    variant="outline" 
                    className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground font-semibold px-6 py-3"
                  >
                    <i className="fas fa-rocket mr-2"></i>
                    Ver Planos e Preços
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Technical Features Section */}
          <section className="luxury-card p-8 rounded-xl">
            <h2 className="text-2xl font-medium mb-6 luxury-accent">Recursos Técnicos</h2>
            <div className="grid md:grid-cols-2 gap-6">
              
              <div className="space-y-4">
                <h4 className="font-medium">Integrações Nativas</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">WhatsApp Business API</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">CRM (HubSpot, Salesforce, Pipedrive)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm">Google Calendar & Outlook</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm">Zapier & Make (Integromat)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">API e Webhooks</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">API RESTful completa</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Webhooks em tempo real</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm">SDKs para JavaScript/Python</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm">Documentação completa</span>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* Final CTA Section */}
          <section className="mt-12 text-center">
            <div className="luxury-card p-8 rounded-xl">
              <h2 className="text-2xl font-bold mb-4">
                Pronto para <span className="text-accent">Revolucionar</span> sua Comunicação?
              </h2>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                Junte-se a centenas de empresas que já automatizaram seu atendimento e aumentaram suas vendas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Button 
                  onClick={handleScheduleDemo}
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 hover:text-accent-foreground font-bold px-8 py-4"
                >
                  <i className="fas fa-play mr-2"></i>
                  Demo Ao Vivo Grátis
                </Button>
                <Button 
                  onClick={handleViewPlans}
                  size="lg" 
                  variant="outline"
                  className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground font-bold px-8 py-4"
                >
                  <i className="fas fa-tag mr-2"></i>
                  Ver Preços
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                ✓ Sem compromisso ✓ Setup em 24h ✓ Suporte especializado
              </p>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}