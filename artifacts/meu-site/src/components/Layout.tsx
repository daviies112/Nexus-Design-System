import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { NexusIconSm } from "./NexusIcon";
import CustomCursor from "./CustomCursor";
import FloatingCTA from "./FloatingCTA";

interface LayoutProps {
  children: React.ReactNode;
}

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[200] origin-left pointer-events-none"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #FF5A1F 0%, #FF8040 50%, #00CC7A 100%)",
      }}
    />
  );
}

const NAV_LINKS = [
  { label: "Funcionalidades", href: "/funcionalidades" },
  { label: "Comparar", href: "/comparacao" },
  { label: "Integrações", href: "/integracoes" },
  { label: "Sobre", href: "/sobre-nos" },
  { label: "Ajuda", href: "/central-ajuda" },
];

export default function Layout({ children }: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    if (location === "/") {
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 50);
    } else {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#060F0A] text-[#F0FAF4] font-inter selection:bg-[#FF5A1F] selection:text-[#1A0500]">
      <CustomCursor />
      <ScrollProgressBar />

      {/* ── HEADER ── */}
      <header
        className={`h-20 sticky top-[2px] z-50 flex-none transition-all duration-500 ${
          scrolled
            ? "liquid-glass-nexus border-b border-[#00CC7A]/10 shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <Link href="/" className="flex items-center group">
            <NexusIconSm size={44} className="group-hover:scale-105 transition-transform" />
            <span className="font-syne font-bold text-xl ml-3 tracking-tight">
              <span className="text-white">nexus</span>
              <span className="text-[#FF5A1F]"> intelligence</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-[#7AA88E] hover:text-white transition-colors duration-200 relative group"
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#FF5A1F] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            <button
              onClick={() => scrollTo("preco")}
              className="text-sm font-medium text-[#7AA88E] hover:text-white transition-colors duration-200 relative group"
            >
              Preço
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#FF5A1F] group-hover:w-full transition-all duration-300" />
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/checkout"
              className="bg-[#FF5A1F] text-[#1A0500] font-bold px-6 py-2.5 rounded-full text-sm hover:opacity-90 hover:shadow-[0_0_24px_rgba(255,90,31,0.45)] transition-all duration-300 hidden md:block"
            >
              Começar grátis
            </Link>
            <button
              className="md:hidden text-[#7AA88E] hover:text-white transition-colors p-2 relative z-10"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menu"
            >
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ── MOBILE MENU — slide in from right ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="fixed inset-0 bg-black/65 backdrop-blur-[6px] z-[60] md:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              key="panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-[#0A1710] border-l border-[#1E3828] z-[70] md:hidden flex flex-col"
            >
              {/* Panel header */}
              <div className="flex items-center justify-between px-6 h-20 border-b border-[#1E3828] flex-shrink-0">
                <NexusIconSm size={38} />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full text-[#7AA88E] hover:text-white hover:bg-[#1E3828] transition-colors"
                  aria-label="Fechar menu"
                >
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                    <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 px-4 py-6 flex flex-col gap-1 overflow-y-auto">
                {NAV_LINKS.map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.055 + 0.08, ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center text-[#C4DDD0] hover:text-white font-medium py-3 px-3 rounded-xl hover:bg-[#1E3828] transition-colors text-[15px]"
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: NAV_LINKS.length * 0.055 + 0.08, ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
                >
                  <button
                    onClick={() => scrollTo("preco")}
                    className="flex items-center text-[#C4DDD0] hover:text-white font-medium py-3 px-3 rounded-xl hover:bg-[#1E3828] transition-colors text-[15px] w-full text-left"
                  >
                    Preço
                  </button>
                </motion.div>
              </nav>

              {/* CTA */}
              <div className="px-4 pb-8 pt-4 border-t border-[#1E3828]">
                <Link
                  href="/checkout"
                  onClick={() => setMenuOpen(false)}
                  className="block bg-[#FF5A1F] text-[#1A0500] font-extrabold py-3.5 rounded-full text-center text-sm hover:shadow-[0_0_24px_rgba(255,90,31,0.4)] transition-shadow"
                >
                  Começar 7 dias grátis →
                </Link>
                <p className="text-[#4A6A58] text-xs text-center mt-3">Sem cartão de crédito</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="flex-1">{children}</main>

      {/* ── FOOTER ── */}
      <footer className="bg-[#060F0A] border-t border-[#1E3828] py-12 md:py-16 flex-none mt-auto">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 mb-12">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center">
                <NexusIconSm size={44} />
                <span className="font-syne font-bold text-xl ml-3 tracking-tight">
                  <span className="text-white">nexus</span>
                  <span className="text-[#FF5A1F]"> intelligence</span>
                </span>
              </div>
              <p className="text-[#7AA88E] text-sm mt-4 max-w-xs text-center md:text-left">
                A IA que automatiza cobrança, estoque e notas fiscais para revendedoras de semijoias.
              </p>
            </div>

            <div className="flex flex-wrap justify-center md:justify-end gap-10 text-sm">
              <div className="flex flex-col gap-3">
                <h4 className="font-syne font-bold text-white mb-1">Produto</h4>
                <Link href="/funcionalidades" className="text-[#7AA88E] hover:text-white transition-colors">Funcionalidades</Link>
                <Link href="/integracoes" className="text-[#7AA88E] hover:text-white transition-colors">Integrações</Link>
                <Link href="/seguranca" className="text-[#7AA88E] hover:text-white transition-colors">Segurança</Link>
              </div>
              <div className="flex flex-col gap-3">
                <h4 className="font-syne font-bold text-white mb-1">Empresa</h4>
                <Link href="/sobre-nos" className="text-[#7AA88E] hover:text-white transition-colors">Sobre nós</Link>
                <Link href="/central-ajuda" className="text-[#7AA88E] hover:text-white transition-colors">Central de Ajuda</Link>
                <Link href="/checkout" className="text-[#7AA88E] hover:text-white transition-colors">Começar grátis</Link>
              </div>
              <div className="flex flex-col gap-3">
                <h4 className="font-syne font-bold text-white mb-1">Legal</h4>
                <Link href="/termos-uso" className="text-[#7AA88E] hover:text-white transition-colors">Termos de Uso</Link>
                <Link href="/politica-privacidade" className="text-[#7AA88E] hover:text-white transition-colors">Privacidade</Link>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-[#1E3828] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#4A6A58]">
            <p>© {new Date().getFullYear()} Nexus Intelligence. Todos os direitos reservados. CNPJ: 00.000.000/0001-00</p>
            <div className="flex gap-4">
              <Link href="/termos-uso" className="hover:text-white transition-colors">Termos</Link>
              <Link href="/politica-privacidade" className="hover:text-white transition-colors">Privacidade</Link>
              <Link href="/seguranca" className="hover:text-white transition-colors">Segurança</Link>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-8 pointer-events-none select-none overflow-hidden" aria-hidden>
          <svg
            viewBox="0 0 900 140"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            style={{ display: "block" }}
          >
            <text
              x="450" y="120"
              textAnchor="middle"
              fontFamily="'Syne', sans-serif"
              fontWeight="800"
              fontSize="180"
              letterSpacing="-6"
              fill="none"
              stroke="rgba(0,204,122,0.07)"
              strokeWidth="1"
            >
              NEXUS
            </text>
          </svg>
        </div>
      </footer>

      <FloatingCTA />
    </div>
  );
}
