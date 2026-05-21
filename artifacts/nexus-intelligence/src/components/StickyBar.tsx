import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
          className="fixed bottom-0 left-0 right-0 z-[60] hidden lg:block"
        >
          <div className="liquid-glass-nexus border-t border-[#1E3828]">
            <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between gap-6">

              {/* Center: trust micro-items */}
              <div className="flex items-center gap-5 text-[#4A6A58] text-xs">
                {["Automação 100%", "Sem Serasa D+17", "Cancele quando quiser"].map((item, i) => (
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
                  className="bg-gradient-to-r from-[#FF5A1F] to-[#E04010] text-white font-bold px-6 py-2.5 rounded-full text-sm tracking-wide hover:shadow-[0_0_24px_rgba(255,90,31,0.45)] transition-shadow inline-flex items-center gap-2"
                >
                  🏆 Nexus Max — 50% off no 1º mês
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
