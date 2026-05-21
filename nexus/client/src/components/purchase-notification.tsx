import { useState, useEffect, useRef } from "react";

// Timing constants for easy adjustment
const INITIAL_DELAY_MS = 0;     // First notification appears immediately
const DISPLAY_MS = 2000;        // Each notification shows for 2 seconds  
const PAUSE_MS = 5000;          // 5 second pause between notifications

interface PurchaseData {
  name: string;
  plan: string;
  location: string;
  price: string;
  timeAgo: string;
}

const purchaseData: PurchaseData[] = [
  { name: "Maria S.", plan: "Ouro - Automação Completa", location: "São Paulo, SP", price: "R$ 697", timeAgo: "8 minutos atrás" },
  { name: "João P.", plan: "Ouro - Automação Completa", location: "Rio de Janeiro, RJ", price: "R$ 697", timeAgo: "12 minutos atrás" },
  { name: "Ana L.", plan: "Prata - IA + Agenda", location: "Belo Horizonte, MG", price: "R$ 497", timeAgo: "15 minutos atrás" },
  { name: "Carlos M.", plan: "Ouro - Automação Completa", location: "Porto Alegre, RS", price: "R$ 697", timeAgo: "18 minutos atrás" },
  { name: "Fernanda R.", plan: "Ouro - Automação Completa", location: "Salvador, BA", price: "R$ 697", timeAgo: "23 minutos atrás" },
  { name: "Roberto S.", plan: "Bronze - Setup Rápido", location: "Curitiba, PR", price: "R$ 197", timeAgo: "25 minutos atrás" }
];

export default function PurchaseNotification() {
  const [currentPurchase, setCurrentPurchase] = useState<PurchaseData | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [purchaseIndex, setPurchaseIndex] = useState(0);
  const [isStopped, setIsStopped] = useState(false); // Track if manually stopped
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nextTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Show first notification after initial delay
    const initialTimeout = setTimeout(() => {
      if (!isStopped) {
        setCurrentPurchase(purchaseData[0]);
        setIsVisible(true);
        setPurchaseIndex(0);
      }
    }, INITIAL_DELAY_MS);

    return () => {
      clearTimeout(initialTimeout);
    };
  }, []);

  useEffect(() => {
    if (isVisible && !isStopped) {
      // Hide notification after display time
      hideTimeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, DISPLAY_MS);

      return () => {
        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current);
          hideTimeoutRef.current = null;
        }
      };
    }
  }, [isVisible]);

  // Separate effect to handle next notification when isVisible becomes false
  useEffect(() => {
    if (!isVisible && currentPurchase && !isStopped) {
      // Show next notification after pause (total cycle: DISPLAY_MS + PAUSE_MS = 5 seconds)
      nextTimeoutRef.current = setTimeout(() => {
        if (!isStopped) { // Double-check in case stopped during pause
          const nextIndex = (purchaseIndex + 1) % purchaseData.length;
          setCurrentPurchase(purchaseData[nextIndex]);
          setPurchaseIndex(nextIndex);
          setIsVisible(true);
        }
      }, PAUSE_MS);

      return () => {
        if (nextTimeoutRef.current) {
          clearTimeout(nextTimeoutRef.current);
          nextTimeoutRef.current = null;
        }
      };
    }
  }, [isVisible, currentPurchase, purchaseIndex, isStopped]);

  const handleClose = () => {
    setIsVisible(false);
    setIsStopped(true); // Stop the entire cycle
    setCurrentPurchase(null); // Clear current purchase
    
    // Clear all timeouts to completely stop cycling
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    if (nextTimeoutRef.current) {
      clearTimeout(nextTimeoutRef.current);
      nextTimeoutRef.current = null;
    }
  };

  if (!currentPurchase) return null;

  return (
    <div
      className={`fixed bottom-6 left-6 z-[40] transform transition-all duration-500 ease-out ${
        isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
      }`}
    >
      <div className="bg-card border border-border rounded-xl shadow-2xl p-4 max-w-sm luxury-card">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            {/* Avatar */}
            <div className="w-10 h-10 bg-gradient-to-br from-accent/20 to-accent/10 rounded-full flex items-center justify-center border border-accent/20">
              <span className="text-accent font-semibold text-sm">
                {currentPurchase.name.charAt(0)}
              </span>
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-foreground font-medium text-sm">
                {currentPurchase.name}
              </p>
              <p className="text-accent text-sm font-medium">
                {currentPurchase.plan}
              </p>
              <p className="text-muted-foreground text-xs flex items-center mt-1">
                <span className="mr-1">📍</span>
                {currentPurchase.location}
              </p>
              <p className="text-foreground text-sm font-semibold mt-2">
                Acabou de comprar por <span className="text-accent">{currentPurchase.price}</span>
              </p>
              <p className="text-muted-foreground text-xs mt-1">
                {currentPurchase.timeAgo}
              </p>
            </div>
          </div>
          
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="text-muted-foreground hover:text-foreground transition-colors ml-2 p-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}