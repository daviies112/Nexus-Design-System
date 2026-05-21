import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

export default function SpecialOfferModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const hasShownRef = useRef(false);
  const exitIntentThrottleRef = useRef(false);

  useEffect(() => {
    // Show modal after 30 seconds
    const showTimer = setTimeout(() => {
      if (!hasShownRef.current) {
        setIsVisible(true);
        hasShownRef.current = true;
      }
    }, 30000);

    // Exit-intent detection
    const handleMouseMove = (e: MouseEvent) => {
      if (hasShownRef.current || exitIntentThrottleRef.current) return;
      
      if (e.clientY <= 0) {
        exitIntentThrottleRef.current = true;
        setIsVisible(true);
        hasShownRef.current = true;
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      if (hasShownRef.current || exitIntentThrottleRef.current) return;
      
      if (e.relatedTarget === null && e.clientY <= 0) {
        exitIntentThrottleRef.current = true;
        setIsVisible(true);
        hasShownRef.current = true;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      clearTimeout(showTimer);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  useEffect(() => {
    // Countdown timer - single interval per visible state
    if (isVisible) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsVisible(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isVisible]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleAcceptOffer = () => {
    // Scroll to qualification form
    const element = document.getElementById('qualification');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsVisible(false);
  };

  const handleMaybeLater = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
        {/* Modal */}
        <div className="relative bg-card border border-border rounded-2xl shadow-2xl max-w-md w-full luxury-card animate-in fade-in duration-300 zoom-in-95">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Content */}
          <div className="p-6 text-center">
            {/* Luxury Icon */}
            <div className="w-12 h-12 bg-accent/10 border border-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
              </svg>
            </div>

            {/* Header */}
            <div className="mb-6">
              <h2 className="text-xl font-light text-foreground mb-4 tracking-tight">
                <span className="luxury-accent font-medium">Oferta Especial</span><br/>
                <span className="luxury-text">por Tempo Limitado</span>
              </h2>
              
              {/* Countdown */}
              <div className="text-3xl font-light luxury-accent mb-2 tracking-wider">
                {formatTime(timeLeft)}
              </div>
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-2"></div>
              <p className="text-muted-foreground text-xs font-light tracking-wider uppercase">
                Tempo restante para esta oferta
              </p>
            </div>

            {/* Offer Details */}
            <div className="mb-8">
              <p className="text-base text-foreground font-light leading-relaxed">
                <span className="luxury-accent font-medium">50% OFF</span> no primeiro mês<br/>
                <span className="text-muted-foreground">+ Bônus exclusivo</span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button 
                onClick={handleAcceptOffer}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-medium py-3 text-base rounded-full minimal-shadow transition-all duration-300 hover:scale-105"
              >
                Aproveitar Agora
              </Button>
              
              <button 
                onClick={handleMaybeLater}
                className="w-full text-muted-foreground hover:text-foreground transition-colors text-xs tracking-wider uppercase font-light"
              >
                Talvez mais tarde →
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}