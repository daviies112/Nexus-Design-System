import Header from "@/components/Header";
import PurchaseNotification from "@/components/purchase-notification";
import { Button } from "@/components/ui/button";
export default function SobreNos() {

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
              <span className="luxury-text">Sobre a</span> <span className="luxury-accent font-medium">Nexus Intelligence</span>
            </h1>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-8"></div>
            <p className="text-xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
              Revolucionando a comunicação empresarial através da <span className="text-accent">inteligência artificial avançada</span>
            </p>
          </div>

          {/* Mission Section */}
          <section className="luxury-card p-8 rounded-xl mb-12">
            <h2 className="text-2xl font-medium mb-6 luxury-accent">Nossa Missão</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Transformar a maneira como empresas se comunicam com seus clientes, 
              fornecendo soluções de inteligência artificial que automatizam processos, 
              aumentam a eficiência e melhoram significativamente a experiência do cliente.
            </p>
          </section>

          {/* Story Section */}
          <section className="luxury-card p-8 rounded-xl mb-12">
            <h2 className="text-2xl font-medium mb-6 luxury-accent">Nossa História</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                A Nexus Intelligence nasceu da necessidade de resolver um problema comum: 
                empresas perdendo oportunidades de negócio por não conseguirem responder 
                seus clientes em tempo real.
              </p>
              <p>
                Nossa equipe de especialistas em IA e comunicação empresarial desenvolveu 
                uma plataforma que não apenas automatiza respostas, mas entende o contexto 
                e fornece soluções inteligentes para cada situação.
              </p>
              <p>
                Hoje, atendemos centenas de empresas que economizam milhares de horas 
                mensais e aumentaram suas taxas de conversão dramaticamente.
              </p>
            </div>
          </section>

          {/* Values Section */}
          <section className="luxury-card p-8 rounded-xl mb-12">
            <h2 className="text-2xl font-medium mb-8 luxury-accent">Nossos Valores</h2>
            <div className="grid md:grid-cols-2 gap-6">
              
              <div className="border border-border rounded-lg p-6">
                <div className="text-accent mb-4">
                  <i className="fas fa-lightbulb text-2xl"></i>
                </div>
                <h3 className="text-xl font-medium mb-3">Inovação</h3>
                <p className="text-muted-foreground">
                  Sempre na vanguarda da tecnologia, desenvolvendo soluções que antecipam 
                  as necessidades do mercado.
                </p>
              </div>

              <div className="border border-border rounded-lg p-6">
                <div className="text-accent mb-4">
                  <i className="fas fa-users text-2xl"></i>
                </div>
                <h3 className="text-xl font-medium mb-3">Foco no Cliente</h3>
                <p className="text-muted-foreground">
                  Cada decisão é tomada pensando no sucesso e satisfação dos nossos clientes.
                </p>
              </div>

              <div className="border border-border rounded-lg p-6">
                <div className="text-accent mb-4">
                  <i className="fas fa-shield-alt text-2xl"></i>
                </div>
                <h3 className="text-xl font-medium mb-3">Segurança</h3>
                <p className="text-muted-foreground">
                  Proteção máxima de dados e privacidade, seguindo os mais altos padrões 
                  de segurança da indústria.
                </p>
              </div>

              <div className="border border-border rounded-lg p-6">
                <div className="text-accent mb-4">
                  <i className="fas fa-rocket text-2xl"></i>
                </div>
                <h3 className="text-xl font-medium mb-3">Excelência</h3>
                <p className="text-muted-foreground">
                  Comprometimento com a qualidade em cada detalhe, desde o desenvolvimento 
                  até o atendimento.
                </p>
              </div>

            </div>
          </section>

          {/* Team Section */}
          <section className="luxury-card p-8 rounded-xl">
            <h2 className="text-2xl font-medium mb-6 luxury-accent">Nossa Equipe</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Somos uma equipe multidisciplinar de especialistas em IA, desenvolvimento, 
              design e negócios, unidos pela paixão de criar soluções que fazem a diferença.
            </p>
            
            {/* Mid-page CTA */}
            <div className="mb-8 text-center">
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-6">
                <h4 className="text-xl font-bold mb-3">Quer conhecer nossa equipe?</h4>
                <p className="text-muted-foreground mb-6">
                  Agende uma conversa e conheça os especialistas que vão transformar seu atendimento
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button 
                    onClick={handleScheduleDemo}
                    className="bg-accent text-accent-foreground hover:!bg-accent hover:!text-accent-foreground font-semibold px-6 py-3"
                  >
                    <i className="fas fa-video mr-2"></i>
                    Falar com Especialista
                  </Button>
                  <Button 
                    onClick={handleViewPlans}
                    variant="outline" 
                    className="border-accent text-accent hover:!bg-accent hover:!text-accent-foreground font-semibold px-6 py-3"
                  >
                    <i className="fas fa-rocket mr-2"></i>
                    Ver Soluções
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="luxury-glass w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-brain text-2xl text-accent"></i>
                </div>
                <h4 className="font-medium mb-2">Especialistas em IA</h4>
                <p className="text-sm text-muted-foreground">
                  PhDs e especialistas com anos de experiência em machine learning
                </p>
              </div>

              <div className="text-center">
                <div className="luxury-glass w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-code text-2xl text-accent"></i>
                </div>
                <h4 className="font-medium mb-2">Desenvolvedores</h4>
                <p className="text-sm text-muted-foreground">
                  Engenheiros sênior especializados em sistemas escaláveis
                </p>
              </div>

              <div className="text-center">
                <div className="luxury-glass w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-chart-line text-2xl text-accent"></i>
                </div>
                <h4 className="font-medium mb-2">Estrategistas</h4>
                <p className="text-sm text-muted-foreground">
                  Experts em negócios digitais e otimização de processos
                </p>
              </div>
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="mt-12 text-center">
            <div className="luxury-card p-8 rounded-xl">
              <h2 className="text-2xl font-bold mb-4">
                Faça Parte da <span className="text-accent">Revolução IA</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                Centenas de empresas já confiam na Nexus Intelligence para automatizar seu atendimento e aumentar vendas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Button 
                  onClick={handleScheduleDemo}
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 hover:text-accent-foreground font-bold px-8 py-4 shadow-lg"
                >
                  <i className="fas fa-handshake mr-2"></i>
                  Conhecer a Empresa
                </Button>
                <Button 
                  onClick={handleViewPlans}
                  size="lg" 
                  variant="outline"
                  className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-background font-bold px-8 py-4 shadow-lg"
                >
                  <i className="fas fa-play mr-2"></i>
                  Começar Agora
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                ✓ 15 anos de experiência ✓ Equipe especializada ✓ Resultados comprovados
              </p>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}