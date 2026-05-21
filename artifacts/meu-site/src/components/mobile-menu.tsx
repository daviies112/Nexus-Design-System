import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface MobileMenuProps {
  onNavClick: (sectionId: string) => void;
  onTrialClick: () => void;
  onDemoClick?: () => void;
  isNavFixed: boolean;
}

export default function MobileMenu({ onNavClick, onTrialClick, onDemoClick, isNavFixed }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  const handleNavClick = (sectionId: string) => {
    onNavClick(sectionId);
    setIsOpen(false);
  };

  const handleTrialClick = () => {
    onTrialClick();
    setIsOpen(false);
  };

  const handleDemoClick = () => {
    if (onDemoClick) {
      onDemoClick();
      setIsOpen(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="default"
          className={`p-3 touch-target ${
            isNavFixed ? "text-gray-300 hover:text-white" : "text-white/80 hover:text-white"
          }`}
          aria-label="Abrir menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] luxury-glass border-l border-border">
        <div className="flex flex-col h-full">
          
          {/* Navigation Links */}
          <nav className="flex flex-col space-y-4 mb-8">
            <a
              href="/funcionalidades"
              className="text-lg font-medium text-foreground hover:text-accent transition-colors py-3 border-b border-border/50 touch-target"
              onClick={() => setIsOpen(false)}
            >
              Funcionalidades
            </a>
            <a
              href="/integracoes"
              className="text-lg font-medium text-foreground hover:text-accent transition-colors py-3 border-b border-border/50 touch-target"
              onClick={() => setIsOpen(false)}
            >
              Integrações
            </a>
            <button
              onClick={() => handleNavClick('pricing')}
              className="text-lg font-medium text-foreground hover:text-accent transition-colors py-3 border-b border-border/50 text-left touch-target w-full"
            >
              Preços
            </button>
            <button
              onClick={() => handleNavClick('sobre-nos')}
              className="text-lg font-medium text-foreground hover:text-accent transition-colors py-3 border-b border-border/50 text-left touch-target w-full"
            >
              Sobre Nós
            </button>
            <button
              onClick={handleDemoClick}
              className="text-lg font-medium text-foreground hover:text-accent transition-colors py-3 border-b border-border/50 text-left touch-target w-full"
            >
              Marcar Reunião
            </button>
          </nav>

          {/* CTA Button */}
          <div className="mt-auto pb-8">
            <Button 
              onClick={handleTrialClick}
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 py-4 text-lg font-medium touch-target"
            >
              Começar Agora
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}