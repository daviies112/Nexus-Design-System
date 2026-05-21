import { useEffect } from "react";
import HeroSection from "../components/hero-section";
import DemoSection from "../components/demo-section";
import ROICalculator from "../components/roi-calculator";
import QualificationForm from "../components/qualification-form";
import PricingSection from "../components/pricing-section";
import DemoBookingForm from "../components/demo-booking-form";
import PurchaseNotification from "../components/purchase-notification";
import SpecialOfferModal from "../components/special-offer-modal";
import Header from "../components/Header";
import nexusLogo from "@assets/generated_images/Nexus_Intelligence_logo_no_bg.png";

export default function Home() {

  useEffect(() => {
    // Handle hash navigation when page loads
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // Small delay to ensure DOM is ready
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Header />

      <HeroSection />
      
      {/* Social Proof Section */}
      <section className="py-16 bg-muted/30 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4" data-testid="social-proof-title">Resultados Comprovados em 2024</h2>
            <p className="text-muted-foreground text-base md:text-lg px-4">Mais de 340 empresas brasileiras já economizam com nossa IA:</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
            <div className="text-center p-4 md:p-6 bg-card border border-border rounded-xl luxury-card" data-testid="metric-clinics">
              <div className="text-2xl md:text-3xl font-bold text-accent mb-2">97%</div>
              <div className="text-base md:text-lg font-semibold mb-1">Taxa de Satisfação</div>
              <div className="text-sm md:text-base text-muted-foreground">clientes renovam o serviço</div>
            </div>
            <div className="text-center p-4 md:p-6 bg-card border border-border rounded-xl luxury-card" data-testid="metric-law">
              <div className="text-2xl md:text-3xl font-bold text-accent mb-2">18h</div>
              <div className="text-base md:text-lg font-semibold mb-1">Setup Médio</div>
              <div className="text-sm md:text-base text-muted-foreground">tempo para estar operacional</div>
            </div>
            <div className="text-center p-4 md:p-6 bg-card border border-border rounded-xl luxury-card" data-testid="metric-consulting">
              <div className="text-2xl md:text-3xl font-bold text-accent mb-2">24/7</div>
              <div className="text-base md:text-lg font-semibold mb-1">Operação Contínua</div>
              <div className="text-sm md:text-base text-muted-foreground">sem pausas ou feriados</div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-8 opacity-60">
            <span className="text-sm text-muted-foreground">Certificado ISO 27001:</span>
            <div className="text-xl md:text-2xl font-bold text-muted-foreground">Segurança</div>
            <div className="text-base md:text-lg text-muted-foreground">• LGPD Compliance</div>
          </div>
        </div>
      </section>

      <div id="funcionalidades">
        <DemoSection />
      </div>
      <ROICalculator />
      <div id="qualification">
        <QualificationForm />
      </div>
      <div id="pricing">
        <PricingSection />
      </div>
      <div id="demo-booking">
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <DemoBookingForm />
          </div>
        </section>
      </div>
      <div id="cases">
        <section className="py-12 md:py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto mobile-padding">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Impacto Real em Números</h2>
              <p className="text-muted-foreground text-base md:text-lg px-4">Dados reais de empresas que automatizaram com nossa IA</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <div className="text-center p-4 md:p-6 bg-card border border-border rounded-xl luxury-card">
                <div className="text-xl md:text-2xl font-bold text-accent mb-2">3.2k</div>
                <div className="text-sm md:text-base font-semibold mb-1">Conversas/Mês</div>
                <div className="text-xs md:text-sm text-muted-foreground">gerenciadas pela IA</div>
              </div>
              <div className="text-center p-4 md:p-6 bg-card border border-border rounded-xl luxury-card">
                <div className="text-xl md:text-2xl font-bold text-accent mb-2">89%</div>
                <div className="text-sm md:text-base font-semibold mb-1">Resolução Automática</div>
                <div className="text-xs md:text-sm text-muted-foreground">sem intervenção humana</div>
              </div>
              <div className="text-center p-4 md:p-6 bg-card border border-border rounded-xl luxury-card">
                <div className="text-xl md:text-2xl font-bold text-accent mb-2">12seg</div>
                <div className="text-sm md:text-base font-semibold mb-1">Tempo Médio</div>
                <div className="text-xs md:text-sm text-muted-foreground">de resposta da IA</div>
              </div>
              <div className="text-center p-4 md:p-6 bg-card border border-border rounded-xl luxury-card">
                <div className="text-xl md:text-2xl font-bold text-accent mb-2">340+</div>
                <div className="text-sm md:text-base font-semibold mb-1">Empresas Ativas</div>
                <div className="text-xs md:text-sm text-muted-foreground">usando diariamente</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* CTA Section */}
      <section className="py-12 md:py-20 luxury-gradient text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 px-4">
            Pare de Perder Dinheiro
            <br/><span className="text-accent">Comece Hoje Mesmo</span>
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
            Junte-se às 340+ empresas que já automatizaram o atendimento e nunca mais perderam um cliente
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6 md:mb-8 px-4">
            <a
              href="/#qualification"
              className="inline-flex items-center px-6 py-3 rounded-md text-lg font-medium bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
              data-testid="cta-start-trial"
            >
              <i className="fas fa-rocket mr-2"></i>
              Começar Agora
            </a>
            <a
              href="/#demo-booking"
              className="inline-flex items-center px-6 py-3 rounded-md text-lg font-medium bg-white/10 border border-white/30 text-white hover:bg-white/20 transition-colors"
              data-testid="cta-schedule-demo"
            >
              <i className="fas fa-calendar mr-2"></i>
              Agendar Demonstração
            </a>
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm text-white/80 px-4">
            <span><i className="fas fa-credit-card mr-1"></i> Cartão obrigatório</span>
            <span><i className="fas fa-clock mr-1"></i> Setup em 24h</span>
            <span><i className="fas fa-shield-alt mr-1"></i> Garantia de resultados</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 md:py-16">
        <div className="max-w-7xl mx-auto mobile-padding">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="col-span-1 sm:col-span-2 md:col-span-1">
              <div className="flex items-center space-x-2 mb-4 justify-center sm:justify-start">
                <a href="/">
                  <img 
                    src={nexusLogo} 
                    alt="Nexus Intelligence" 
                    className="h-16 sm:h-20 md:h-24 w-auto"
                  />
                </a>
              </div>
              <p className="text-muted-foreground mb-4 md:mb-6 text-sm md:text-base text-center sm:text-left">
                Automatize sua Empresa com inteligência artificial e nunca mais perca um cliente.
              </p>
              <div className="flex space-x-4 justify-center sm:justify-start">
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  <i className="fab fa-linkedin text-xl"></i>
                </a>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  <i className="fab fa-instagram text-xl"></i>
                </a>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  <i className="fab fa-youtube text-xl"></i>
                </a>
              </div>
            </div>
            
            <div className="text-center sm:text-left">
              <h4 className="font-semibold mb-3 md:mb-4 text-foreground text-sm md:text-base">Produto</h4>
              <ul className="space-y-2 md:space-y-3 text-muted-foreground text-sm md:text-base">
                <li><a href="/funcionalidades" className="hover:text-accent transition-colors touch-target">Funcionalidades</a></li>
                <li><a href="/integracoes" className="hover:text-accent transition-colors touch-target">Integrações</a></li>
                <li><a href="/seguranca" className="hover:text-accent transition-colors touch-target">Segurança</a></li>
              </ul>
            </div>
            
            <div className="text-center sm:text-left">
              <h4 className="font-semibold mb-3 md:mb-4 text-foreground text-sm md:text-base">Empresa</h4>
              <ul className="space-y-2 md:space-y-3 text-muted-foreground text-sm md:text-base">
                <li><a href="/sobre-nos" className="hover:text-accent transition-colors touch-target">Sobre Nós</a></li>
                <li><a href="/#cases" className="hover:text-accent transition-colors touch-target">Cases de Sucesso</a></li>
              </ul>
            </div>
            
            <div className="text-center sm:text-left">
              <h4 className="font-semibold mb-3 md:mb-4 text-foreground text-sm md:text-base">Suporte</h4>
              <ul className="space-y-2 md:space-y-3 text-muted-foreground text-sm md:text-base">
                <li><a href="/central-ajuda" className="hover:text-accent transition-colors touch-target">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-accent transition-colors flex items-center justify-center sm:justify-start touch-target">
                  <i className="fab fa-whatsapp mr-2 text-secondary"></i>
                  <span className="truncate">(11) 9999-9999</span>
                </a></li>
                <li><a href="mailto:contato@secretariaai.com" className="hover:text-accent transition-colors flex items-center justify-center sm:justify-start touch-target">
                  <i className="fas fa-envelope mr-2 text-accent"></i>
                  <span className="truncate">contato@secretariaai.com</span>
                </a></li>
                <li><a href="#" className="hover:text-accent transition-colors flex items-center justify-center sm:justify-start touch-target">
                  <i className="fas fa-circle mr-2 text-secondary"></i>
                  <span>Status do Sistema</span>
                </a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 md:mt-12 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-xs md:text-sm text-center md:text-left">
              © 2024 Secretária IA. Todos os direitos reservados.
            </p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 text-xs md:text-sm text-muted-foreground">
              <a href="/termos-uso" className="hover:text-accent transition-colors touch-target text-center">Termos de Uso</a>
              <a href="/politica-privacidade" className="hover:text-accent transition-colors touch-target text-center">Política de Privacidade</a>
              <a href="#" className="hover:text-accent transition-colors touch-target text-center">LGPD</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Notifications */}
      <PurchaseNotification />
      <SpecialOfferModal />
    </div>
  );
}
