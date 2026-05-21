import { useState } from "react";
import { Link, useLocation } from "wouter";
import { NexusIconSm } from "./NexusIcon";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    if (location === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#060F0A] text-[#F0FAF4] font-inter selection:bg-[#FF5A1F] selection:text-[#1A0500]">
      <header className="h-20 bg-[#060F0A]/80 backdrop-blur-md border-b border-[#1E3828] sticky top-0 z-50 flex-none">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <Link href="/" className="flex items-center group">
            <NexusIconSm size={44} className="group-hover:scale-105 transition-transform" />
            <span className="font-syne font-bold text-xl ml-3 tracking-tight">
              <span className="text-white">nexus</span>
              <span className="text-[#FF5A1F]"> intelligence</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-7">
            <Link href="/funcionalidades" className="text-sm font-medium text-[#7AA88E] hover:text-white transition-colors">
              Funcionalidades
            </Link>
            <Link href="/integracoes" className="text-sm font-medium text-[#7AA88E] hover:text-white transition-colors">
              Integrações
            </Link>
            <button
              onClick={() => scrollTo("preco")}
              className="text-sm font-medium text-[#7AA88E] hover:text-white transition-colors"
            >
              Preço
            </button>
            <Link href="/sobre-nos" className="text-sm font-medium text-[#7AA88E] hover:text-white transition-colors">
              Sobre
            </Link>
            <Link href="/central-ajuda" className="text-sm font-medium text-[#7AA88E] hover:text-white transition-colors">
              Ajuda
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/checkout" className="bg-[#FF5A1F] text-[#1A0500] font-bold px-6 py-2.5 rounded-full text-sm hover:opacity-90 transition-opacity hidden md:block">
              Começar grátis
            </Link>
            <button
              className="md:hidden text-[#7AA88E] hover:text-white transition-colors p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              {menuOpen ? (
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="18" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-[#0C1A12] border-b border-[#1E3828] z-50 px-6 py-5 flex flex-col gap-4">
            <Link href="/funcionalidades" onClick={() => setMenuOpen(false)} className="text-[#C4DDD0] font-medium py-2 border-b border-[#1E3828]">Funcionalidades</Link>
            <Link href="/integracoes" onClick={() => setMenuOpen(false)} className="text-[#C4DDD0] font-medium py-2 border-b border-[#1E3828]">Integrações</Link>
            <button onClick={() => scrollTo("preco")} className="text-[#C4DDD0] font-medium py-2 border-b border-[#1E3828] text-left">Preço</button>
            <Link href="/sobre-nos" onClick={() => setMenuOpen(false)} className="text-[#C4DDD0] font-medium py-2 border-b border-[#1E3828]">Sobre</Link>
            <Link href="/central-ajuda" onClick={() => setMenuOpen(false)} className="text-[#C4DDD0] font-medium py-2 border-b border-[#1E3828]">Ajuda</Link>
            <Link href="/checkout" onClick={() => setMenuOpen(false)} className="bg-[#FF5A1F] text-[#1A0500] font-extrabold py-3 rounded-xl text-center mt-2">
              Começar 7 dias grátis
            </Link>
          </div>
        )}
      </header>

      <main className="flex-1">
        {children}
      </main>

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
      </footer>
    </div>
  );
}
