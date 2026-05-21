import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import MobileMenu from "@/components/mobile-menu";
import nexusLogo from "@assets/generated_images/Nexus_Intelligence_logo_no_bg.png";

export default function Header() {
  const [isNavFixed, setIsNavFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsNavFixed(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    // Se estiver na página inicial, scroll suave
    if (window.location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Se estiver em outra página, navegar para home com seção
      window.location.href = `/#${sectionId}`;
    }
  };

  const handleTrialClick = () => {
    // Se estiver na página inicial, scroll suave
    if (window.location.pathname === '/') {
      const element = document.getElementById('qualification');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Se estiver em outra página, navegar para home com seção
      window.location.href = '/#qualification';
    }
  };

  const handleDemoClick = () => {
    // Se estiver na página inicial, scroll suave
    if (window.location.pathname === '/') {
      const element = document.getElementById('demo-booking');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Se estiver em outra página, navegar para home com seção
      window.location.href = '/#demo-booking';
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isNavFixed ? "bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 shadow-sm" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-28">
          <div className="flex items-center space-x-2" data-testid="logo">
            <a href="/">
              <img 
                src={nexusLogo} 
                alt="Nexus Intelligence" 
                className="h-16 sm:h-20 md:h-24 w-auto"
              />
            </a>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/funcionalidades"
              className={`transition-colors ${
                isNavFixed ? "text-gray-300 hover:text-white" : "text-white/80 hover:text-white"
              }`}
              data-testid="nav-features"
            >
              Funcionalidades
            </a>
            <a
              href="/integracoes"
              className={`transition-colors ${
                isNavFixed ? "text-gray-300 hover:text-white" : "text-white/80 hover:text-white"
              }`}
              data-testid="nav-integrations"
            >
              Integrações
            </a>
            <button
              onClick={() => handleNavClick('pricing')}
              className={`transition-colors ${
                isNavFixed ? "text-gray-300 hover:text-white" : "text-white/80 hover:text-white"
              }`}
              data-testid="nav-pricing"
            >
              Preços
            </button>
            <a
              href="/sobre-nos"
              className={`transition-colors ${
                isNavFixed ? "text-gray-300 hover:text-white" : "text-white/80 hover:text-white"
              }`}
              data-testid="nav-sobre-nos"
            >
              Sobre Nós
            </a>
            <button
              onClick={handleDemoClick}
              className={`transition-colors ${
                isNavFixed ? "text-gray-300 hover:text-white" : "text-white/80 hover:text-white"
              }`}
              data-testid="nav-demo"
            >
              Marcar Reunião
            </button>
            <Button onClick={handleTrialClick} data-testid="nav-trial-button">
              Começar Agora
            </Button>
          </div>
          
          {/* Mobile Menu */}
          <MobileMenu 
            onNavClick={handleNavClick}
            onTrialClick={handleTrialClick}
            onDemoClick={handleDemoClick}
            isNavFixed={isNavFixed}
          />
        </div>
      </div>
    </nav>
  );
}