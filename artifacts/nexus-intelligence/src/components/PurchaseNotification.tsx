import { useState, useEffect, useRef } from "react";

const INITIAL_DELAY_MS = 8000;
const DISPLAY_MS = 4000;
const PAUSE_MS = 7000;

const purchaseData = [
  { name: "Carla M.", plan: "Nexus Intelligence", location: "São Paulo, SP", timeAgo: "6 minutos atrás" },
  { name: "Juliana R.", plan: "Nexus Intelligence", location: "Rio de Janeiro, RJ", timeAgo: "14 minutos atrás" },
  { name: "Fernanda S.", plan: "Nexus Intelligence", location: "Belo Horizonte, MG", timeAgo: "21 minutos atrás" },
  { name: "Priscila A.", plan: "Nexus Intelligence", location: "Curitiba, PR", timeAgo: "33 minutos atrás" },
  { name: "Débora L.", plan: "Nexus Intelligence", location: "Salvador, BA", timeAgo: "48 minutos atrás" },
  { name: "Simone C.", plan: "Nexus Intelligence", location: "Porto Alegre, RS", timeAgo: "1 hora atrás" },
];

export default function PurchaseNotification() {
  const [current, setCurrent] = useState<typeof purchaseData[0] | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const [stopped, setStopped] = useState(false);
  const hideRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nextRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      if (!stopped) { setCurrent(purchaseData[0]); setIsVisible(true); }
    }, INITIAL_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!isVisible || stopped) return;
    hideRef.current = setTimeout(() => setIsVisible(false), DISPLAY_MS);
    return () => { if (hideRef.current) clearTimeout(hideRef.current); };
  }, [isVisible, stopped]);

  useEffect(() => {
    if (isVisible || !current || stopped) return;
    nextRef.current = setTimeout(() => {
      if (!stopped) {
        const next = (index + 1) % purchaseData.length;
        setCurrent(purchaseData[next]);
        setIndex(next);
        setIsVisible(true);
      }
    }, PAUSE_MS);
    return () => { if (nextRef.current) clearTimeout(nextRef.current); };
  }, [isVisible, current, index, stopped]);

  const close = () => {
    setIsVisible(false);
    setStopped(true);
    setCurrent(null);
    if (hideRef.current) clearTimeout(hideRef.current);
    if (nextRef.current) clearTimeout(nextRef.current);
  };

  if (!current) return null;

  return (
    <div
      className={`fixed bottom-6 left-6 z-40 transition-all duration-500 ease-out ${
        isVisible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
      }`}
    >
      <div className="bg-[#0C1A12] border border-[#1E3828] rounded-2xl shadow-2xl p-4 max-w-xs">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1">
            <div className="w-10 h-10 bg-[#FF5A1F]/20 rounded-full flex items-center justify-center border border-[#FF5A1F]/30 flex-shrink-0">
              <span className="text-[#FF5A1F] font-bold text-sm">{current.name.charAt(0)}</span>
            </div>
            <div>
              <p className="text-white font-semibold text-sm">{current.name}</p>
              <p className="text-[#00CC7A] text-xs font-medium">acabou de entrar na lista</p>
              <p className="text-[#7AA88E] text-xs flex items-center gap-1 mt-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {current.location}
              </p>
              <p className="text-[#4A6A58] text-[10px] mt-1">{current.timeAgo}</p>
            </div>
          </div>
          <button onClick={close} className="text-[#4A6A58] hover:text-white transition-colors p-0.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
