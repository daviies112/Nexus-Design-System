import { Link } from "wouter";
import { NexusIconSm } from "./NexusIcon";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
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

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-[#7AA88E] hover:text-white transition-colors">
              Recursos
            </Link>
            <Link href="/" className="text-sm font-medium text-[#7AA88E] hover:text-white transition-colors">
              Módulos
            </Link>
            <Link href="/" className="text-sm font-medium text-[#7AA88E] hover:text-white transition-colors">
              Preço
            </Link>
            <Link href="/brand" className="text-sm font-medium text-[#7AA88E] hover:text-white transition-colors">
              Brand Kit
            </Link>
            <Link href="/instagram" className="text-sm font-medium text-[#7AA88E] hover:text-white transition-colors">
              Instagram
            </Link>
          </nav>

          <div className="flex items-center">
            <button className="bg-[#FF5A1F] text-[#1A0500] font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-[#FF5A1F]/90 hover:scale-[1.02] transition-all hidden md:block">
              Entrar na lista
            </button>
            <button className="md:hidden text-[#7AA88E] hover:text-white transition-colors p-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round">
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
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
            
            <div className="flex flex-wrap justify-center md:justify-end gap-8 text-sm">
              <div className="flex flex-col gap-3">
                <h4 className="font-syne font-bold text-white mb-2">Produto</h4>
                <Link href="/" className="text-[#7AA88E] hover:text-white transition-colors">Recursos</Link>
                <Link href="/" className="text-[#7AA88E] hover:text-white transition-colors">Amanda AI</Link>
                <Link href="/" className="text-[#7AA88E] hover:text-white transition-colors">Preços</Link>
              </div>
              <div className="flex flex-col gap-3">
                <h4 className="font-syne font-bold text-white mb-2">Recursos</h4>
                <Link href="/brand" className="text-[#7AA88E] hover:text-white transition-colors">Brand Kit</Link>
                <Link href="/instagram" className="text-[#7AA88E] hover:text-white transition-colors">Templates Instagram</Link>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-[#1E3828] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#4A6A58]">
            <p>© {new Date().getFullYear()} Nexus Intelligence. Todos os direitos reservados.</p>
            <div className="flex gap-4">
              <Link href="/" className="hover:text-white transition-colors">Termos</Link>
              <Link href="/" className="hover:text-white transition-colors">Privacidade</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
