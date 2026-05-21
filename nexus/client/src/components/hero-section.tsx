import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const scrollToDemo = () => {
    const demoSection = document.getElementById('funcionalidades');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToROI = () => {
    const roiSection = document.getElementById('qualification');
    if (roiSection) {
      roiSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="luxury-gradient nexus-hero-grid nexus-hero-decoration nexus-test-visible min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/20"></div>
      
      {/* Luxury Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

        {/* Hero Title */}
        <div className="mb-12 md:mb-16 mt-20 md:mt-32">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light tracking-tight mb-6 md:mb-8 px-2" data-testid="hero-title">
            <span className="luxury-text">Assistente</span><br/>
            <span className="luxury-accent font-medium">Executivo de IA</span><br/>
            <span className="luxury-text">Autônomo</span>
          </h1>
          <div className="w-16 md:w-24 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-6 md:mb-8"></div>
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground font-light leading-relaxed max-w-3xl mx-auto px-4" data-testid="hero-description">
            Transforme suas comunicações empresariais em um
            <span className="block sm:inline"> <span className="text-foreground">ecossistema inteligente</span> que opera 24/7</span>
          </p>
        </div>

        {/* CTA Section */}
        <div className="flex flex-col items-center mb-12 md:mb-20 px-4">
          <Button 
            onClick={scrollToDemo}
            className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-medium rounded-full minimal-shadow transition-all duration-500 hover:scale-105 mb-4 md:mb-6 w-full sm:w-auto max-w-xs" 
            data-testid="hero-demo-button"
          >
            Experimente o Futuro
          </Button>
          
          <button 
            onClick={scrollToROI}
            className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-xs sm:text-sm tracking-wider uppercase font-light"
            data-testid="hero-roi-button"
          >
            Calcular ROI →
          </button>
        </div>

        {/* Minimalist Features */}
        <div className="flex justify-center items-center space-x-8 sm:space-x-12 md:space-x-16 text-xs sm:text-sm text-muted-foreground font-light px-4" data-testid="hero-features">
          <div className="text-center">
            <div className="text-foreground text-base sm:text-lg font-medium mb-1 sm:mb-2">15min</div>
            <div className="tracking-wide text-xs sm:text-sm">Configuração</div>
          </div>
          <div className="w-[1px] h-6 sm:h-8 bg-border"></div>
          <div className="text-center">
            <div className="text-foreground text-base sm:text-lg font-medium mb-1 sm:mb-2">24/7</div>
            <div className="tracking-wide text-xs sm:text-sm">Operação</div>
          </div>
          <div className="w-[1px] h-6 sm:h-8 bg-border"></div>
          <div className="text-center">
            <div className="text-foreground text-base sm:text-lg font-medium mb-1 sm:mb-2">∞</div>
            <div className="tracking-wide text-xs sm:text-sm">Escalabilidade</div>
          </div>
        </div>
      </div>

      {/* Subtle Visual Element */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 luxury-glass w-60 sm:w-80 h-24 sm:h-32 rounded-2xl opacity-30 animate-breathe"></div>
    </section>
  );
}
