import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NexusIconSm } from "@/components/NexusIcon";

export default function StickyBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.85);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 24 }}
          className="fixed bottom-0 left-0 right-0 z-40 hidden lg:block"
        >
          <div className="liquid-glass-nexus border-t border-[#1E3828]">
            <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between gap-6 opacity-[0]">

              {/* Left: brand + info */}
              <div className="flex items-center gap-4 min-w-0">
                <NexusIconSm size={26} />
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-[#C4DDD0] text-sm font-semibold whitespace-nowrap">Amanda AI para sua semijoia</span>
                  <span className="text-[#1E3828]">·</span>
                  <span className="text-[#4A6A58] text-sm whitespace-nowrap">A partir de R$649/mês · sem fidelidade</span>
                </div>
              </div>

              {/* Center: trust micro-items */}
              <div className="hidden xl:flex items-center gap-5 text-[#4A6A58] text-xs">
                {["Setup em 7 dias úteis", "Cancele quando quiser", "Um cartão. Zero surpresas."].map((item, i) => (
                  <span key={i} className="flex items-center gap-1.5">
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                      <path d="M2 5.5l2.5 2.5 4.5-4.5" stroke="#00CC7A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {item}
                  </span>
                ))}
              </div>

              {/* Right: CTA + dismiss */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <motion.button
                  onClick={() => scrollTo("preco")}
                  whileHover={{ scale: 1.04, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-gradient-to-r from-[#00CC7A] to-[#00AA62] text-[#001A0E] font-bold px-6 py-2.5 rounded-full text-sm tracking-wide hover:shadow-[0_0_24px_rgba(0,204,122,0.5)] transition-shadow inline-flex items-center gap-2"
                >
                  🏆 Nexus Max — 50% off
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.button>
                <button
                  onClick={() => setDismissed(true)}
                  className="w-7 h-7 flex items-center justify-center rounded-full text-[#4A6A58] hover:text-[#7AA88E] hover:bg-[#1E3828] transition-colors text-base"
                  aria-label="Fechar"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
