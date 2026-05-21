import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="https://wa.me/5511999999999?text=Olá!%20Quero%20saber%20mais%20sobre%20o%20Nexus%20Intelligence"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.7, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 16 }}
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[#25D366] text-white font-bold rounded-full shadow-[0_8px_32px_rgba(37,211,102,0.45)] px-5 py-3.5 text-sm"
          aria-label="Falar no WhatsApp"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="flex-shrink-0"
          >
            <path d="M10 2C5.6 2 2 5.6 2 10c0 1.4.4 2.8 1 3.9L2 18l4.2-1.1C7.3 17.6 8.6 18 10 18c4.4 0 8-3.6 8-8s-3.6-8-8-8zm4.1 11c-.2.5-1 1-1.4 1-.4 0-.8.1-2.5-.5-2.1-.8-3.4-2.9-3.5-3-.1-.1-1-1.3-1-2.5s.6-1.8.9-2c.2-.2.5-.3.7-.3h.5c.2 0 .4.1.5.4.2.5.7 1.7.8 1.8.1.2.1.3 0 .5-.1.2-.1.3-.3.4-.1.1-.3.3-.4.4-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2 1.1.9 2 1.2 2.3 1.3.3.1.5 0 .6-.1.2-.2.5-.5.7-.8.1-.2.3-.2.5-.1.2.1 1.2.6 1.4.7.2.1.4.2.4.3.1.2 0 .8-.4 1.3z" />
          </svg>
          <span className="hidden sm:inline">Falar no WhatsApp</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
