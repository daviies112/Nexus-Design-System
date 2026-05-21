import { useState, useEffect, useRef } from "react";

export default function SpecialOfferModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);
  const hasShownRef = useRef(false);

  useEffect(() => {
    const t = setTimeout(() => {
      if (!hasShownRef.current) { setIsVisible(true); hasShownRef.current = true; }
    }, 30000);

    const handleMouseOut = (e: MouseEvent) => {
      if (hasShownRef.current) return;
      if (e.relatedTarget === null && e.clientY <= 0) {
        setIsVisible(true);
        hasShownRef.current = true;
      }
    };

    document.addEventListener("mouseout", handleMouseOut);
    return () => { clearTimeout(t); document.removeEventListener("mouseout", handleMouseOut); };
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const t = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { setIsVisible(false); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [isVisible]);

  const fmt = (s: number) => `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  const handleAccept = () => {
    document.getElementById("qualificacao")?.scrollIntoView({ behavior: "smooth" });
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      <div className="relative bg-[#0C1A12] border border-[#1E3828] rounded-3xl shadow-2xl max-w-sm w-full p-8 text-center">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-[#4A6A58] hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="w-14 h-14 bg-[#FF5A1F]/20 border border-[#FF5A1F]/30 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg className="w-7 h-7 text-[#FF5A1F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>

        <div className="text-[#FF5A1F] text-xs font-bold tracking-[0.2em] uppercase mb-2">Oferta por tempo limitado</div>
        <h2 className="font-syne font-extrabold text-2xl text-white mb-4">
          7 dias grátis,<br/>sem cartão de crédito
        </h2>

        <div className="font-syne font-extrabold text-4xl text-[#FF5A1F] mb-1">{fmt(timeLeft)}</div>
        <div className="text-[#7AA88E] text-xs mb-6">tempo restante para esta oferta</div>

        <div className="bg-[#060F0A] border border-[#1E3828] rounded-2xl p-4 mb-6 text-sm">
          <div className="text-white font-semibold">Incluso na oferta:</div>
          <ul className="text-[#7AA88E] text-xs mt-2 space-y-1 text-left">
            <li>✓ 7 dias de teste completo</li>
            <li>✓ Sem cartão de crédito</li>
            <li>✓ Setup assistido em 24h</li>
            <li>✓ Todos os 21 módulos ativos</li>
          </ul>
        </div>

        <button
          onClick={handleAccept}
          className="w-full bg-[#FF5A1F] text-[#1A0500] font-extrabold py-4 rounded-xl hover:scale-[1.02] transition-all shadow-lg mb-3"
        >
          Começar grátis agora
        </button>
        <button
          onClick={() => setIsVisible(false)}
          className="w-full text-[#4A6A58] hover:text-[#7AA88E] text-xs transition-colors uppercase tracking-wider"
        >
          Talvez mais tarde
        </button>
      </div>
    </div>
  );
}
