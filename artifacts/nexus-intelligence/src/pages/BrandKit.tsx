import { NexusIcon } from "@/components/NexusIcon";

export default function BrandKit() {
  return (
    <div className="py-24 max-w-7xl mx-auto px-6 font-inter">
      <div className="mb-16">
        <h1 className="font-syne font-extrabold text-5xl text-white">Brand Kit</h1>
        <p className="text-[#7AA88E] text-lg mt-4">Diretrizes visuais para a marca Nexus Intelligence.</p>
      </div>

      {/* Section 01 — Paleta de Cores */}
      <section className="mb-24">
        <span className="text-[#FF5A1F] text-xs font-bold tracking-[0.2em] uppercase block mb-8 border-l-4 border-[#FF5A1F] pl-4">01 — PALETA DE CORES</span>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="flex flex-col">
            <div className="h-40 bg-[#060F0A] rounded-2xl border border-[#1E3828] mb-4"></div>
            <div className="font-bold text-white">Deep Emerald</div>
            <div className="text-[#7AA88E] text-sm">Background principal</div>
            <div className="font-mono text-xs text-[#4A6A58] mt-1">#060F0A</div>
          </div>
          <div className="flex flex-col">
            <div className="h-40 bg-[#0C1A12] rounded-2xl border border-[#1E3828] mb-4"></div>
            <div className="font-bold text-white">Midnight Forest</div>
            <div className="text-[#7AA88E] text-sm">Cards e superfícies</div>
            <div className="font-mono text-xs text-[#4A6A58] mt-1">#0C1A12</div>
          </div>
          <div className="flex flex-col">
            <div className="h-40 bg-[#FF5A1F] rounded-2xl mb-4"></div>
            <div className="font-bold text-white">Vivid Tangerine</div>
            <div className="text-[#7AA88E] text-sm">Primário, ação, destaque</div>
            <div className="font-mono text-xs text-[#4A6A58] mt-1">#FF5A1F</div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#1A2F22] border border-[#1E3828]"></div>
            <div>
              <div className="text-white text-sm font-semibold">Surface Raised</div>
              <div className="font-mono text-xs text-[#7AA88E]">#1A2F22</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#00CC7A]"></div>
            <div>
              <div className="text-white text-sm font-semibold">Electric Green</div>
              <div className="font-mono text-xs text-[#7AA88E]">#00CC7A</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#1E3828]"></div>
            <div>
              <div className="text-white text-sm font-semibold">Border Subtle</div>
              <div className="font-mono text-xs text-[#7AA88E]">#1E3828</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#C4DDD0]"></div>
            <div>
              <div className="text-white text-sm font-semibold">Text Body</div>
              <div className="font-mono text-xs text-[#7AA88E]">#C4DDD0</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 02 — Tipografia */}
      <section className="mb-24">
        <span className="text-[#FF5A1F] text-xs font-bold tracking-[0.2em] uppercase block mb-8 border-l-4 border-[#FF5A1F] pl-4">02 — TIPOGRAFIA</span>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-[#0C1A12] border border-[#1E3828] rounded-3xl p-10">
            <div className="flex justify-between items-end border-b border-[#1E3828] pb-6 mb-8">
              <div>
                <div className="text-[#7AA88E] text-sm font-bold uppercase tracking-wider mb-2">Display</div>
                <div className="text-white text-3xl font-syne font-bold">Syne</div>
              </div>
              <div className="text-5xl font-syne text-[#FF5A1F]">Aa</div>
            </div>
            
            <div className="space-y-8">
              <div>
                <div className="text-[#4A6A58] text-xs mb-2">ExtraBold 800</div>
                <div className="font-syne font-extrabold text-4xl text-white tracking-tight">Nexus Intelligence</div>
              </div>
              <div>
                <div className="text-[#4A6A58] text-xs mb-2">Bold 700</div>
                <div className="font-syne font-bold text-3xl text-white">Nexus Intelligence</div>
              </div>
              <div>
                <div className="text-[#4A6A58] text-xs mb-2">SemiBold 600</div>
                <div className="font-syne font-semibold text-2xl text-white">Nexus Intelligence</div>
              </div>
            </div>
          </div>

          <div className="bg-[#0C1A12] border border-[#1E3828] rounded-3xl p-10">
            <div className="flex justify-between items-end border-b border-[#1E3828] pb-6 mb-8">
              <div>
                <div className="text-[#7AA88E] text-sm font-bold uppercase tracking-wider mb-2">Body</div>
                <div className="text-white text-3xl font-inter font-bold">Inter</div>
              </div>
              <div className="text-5xl font-inter text-[#00CC7A]">Aa</div>
            </div>
            
            <div className="space-y-8">
              <div>
                <div className="text-[#4A6A58] text-xs mb-2">SemiBold 600</div>
                <div className="font-inter font-semibold text-2xl text-white tracking-tight">Automatize. Cresça. Domine.</div>
              </div>
              <div>
                <div className="text-[#4A6A58] text-xs mb-2">Medium 500</div>
                <div className="font-inter font-medium text-xl text-[#C4DDD0]">Automatize. Cresça. Domine.</div>
              </div>
              <div>
                <div className="text-[#4A6A58] text-xs mb-2">Regular 400</div>
                <div className="font-inter font-normal text-lg text-[#7AA88E]">Automatize. Cresça. Domine.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 03 — Componentes UI */}
      <section className="mb-24">
        <span className="text-[#FF5A1F] text-xs font-bold tracking-[0.2em] uppercase block mb-8 border-l-4 border-[#FF5A1F] pl-4">03 — COMPONENTES UI</span>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-[#0C1A12] border border-[#1E3828] rounded-3xl p-10">
            <h3 className="text-white font-syne font-bold mb-6">Botões</h3>
            <div className="flex flex-col gap-6 items-start">
              <button className="bg-[#FF5A1F] text-[#1A0500] font-extrabold px-8 py-3 rounded-xl hover:scale-[1.02] transition-transform">
                Botão Primário
              </button>
              <button className="border border-[#1E3828] text-[#C4DDD0] font-semibold px-8 py-3 rounded-xl hover:bg-[#1A2F22] transition-colors">
                Botão Secundário Ghost
              </button>
              <div className="p-6 bg-[#FF5A1F] rounded-2xl w-full">
                <button className="bg-[#1A0500] text-[#FF5A1F] font-extrabold px-8 py-3 rounded-xl hover:scale-[1.02] transition-transform">
                  Botão CTA Escuro
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="bg-[#0C1A12] border border-[#1E3828] rounded-3xl p-10">
              <h3 className="text-white font-syne font-bold mb-6">Badges</h3>
              <div className="flex flex-wrap gap-4">
                <div className="bg-[#00CC7A]/20 text-[#00CC7A] border border-[#00CC7A]/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Ativo</div>
                <div className="bg-[#FFB020]/20 text-[#FFB020] border border-[#FFB020]/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Processando</div>
                <div className="bg-[#4A6A58]/20 text-[#7AA88E] border border-[#4A6A58]/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Pendente</div>
                <div className="bg-[#FF5A1F] text-[#1A0500] text-xs font-extrabold px-3 py-1 rounded uppercase tracking-widest">Amanda AI</div>
              </div>
            </div>
            
            <div className="group bg-[#060F0A] border border-[#1E3828] rounded-2xl p-6 hover:border-[#FF5A1F]/40 transition-colors cursor-pointer">
              <div className="text-2xl mb-4">💰</div>
              <h4 className="font-syne font-bold text-lg text-white group-hover:text-[#FF5A1F] transition-colors">Cobrança Inteligente</h4>
              <p className="text-[#7AA88E] text-xs mt-2">Card de módulo com hover state para exibir interação na Landing Page.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 04 — Logo & Símbolo */}
      <section>
        <span className="text-[#FF5A1F] text-xs font-bold tracking-[0.2em] uppercase block mb-8 border-l-4 border-[#FF5A1F] pl-4">04 — LOGO & VARIAÇÕES</span>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-[#060F0A] rounded-3xl border border-[#1E3828] aspect-square flex flex-col items-center justify-center p-8">
            <NexusIcon size={80} />
            <div className="font-syne font-bold text-lg mt-6 text-center leading-tight">
              <span className="text-white">nexus</span><br/>
              <span className="text-[#FF5A1F]">intelligence</span>
            </div>
          </div>
          
          <div className="bg-[#FF5A1F] rounded-3xl aspect-square flex flex-col items-center justify-center p-8">
            <NexusIcon size={80} stroke="#1A0500" white="#1A0500" nodeColor="#1A0500" />
            <div className="font-syne font-bold text-lg mt-6 text-center leading-tight">
              <span className="text-[#1A0500]">nexus</span><br/>
              <span className="text-[#1A0500]">intelligence</span>
            </div>
          </div>
          
          <div className="bg-[#FF5A1F] rounded-3xl aspect-square flex flex-col items-center justify-center p-8 relative overflow-hidden" style={{ backgroundImage: "linear-gradient(rgba(26,5,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(26,5,0,0.06) 1px, transparent 1px)", backgroundSize: "20px 20px" }}>
            <div className="relative z-10 flex flex-col items-center">
              <NexusIcon size={80} stroke="#1A0500" white="#1A0500" nodeColor="#1A0500" />
              <div className="font-syne font-bold text-lg mt-6 text-center leading-tight">
                <span className="text-[#1A0500]">nexus</span><br/>
                <span className="text-[#1A0500]">intelligence</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-3xl aspect-square flex flex-col items-center justify-center p-8">
            <NexusIcon size={80} stroke="#060F0A" white="#060F0A" nodeColor="#060F0A" />
            <div className="font-syne font-bold text-lg mt-6 text-center leading-tight">
              <span className="text-[#060F0A]">nexus</span><br/>
              <span className="text-[#060F0A]">intelligence</span>
            </div>
          </div>
        </div>
        
        <div className="bg-[#0C1A12] border border-[#1E3828] rounded-3xl p-10 flex items-center justify-center gap-12 flex-wrap">
          <div className="flex flex-col items-center gap-4">
            <NexusIcon size={120} />
            <span className="text-[#4A6A58] font-mono text-xs">120px</span>
          </div>
          <div className="flex flex-col items-center gap-4">
            <NexusIcon size={80} />
            <span className="text-[#4A6A58] font-mono text-xs">80px</span>
          </div>
          <div className="flex flex-col items-center gap-4">
            <NexusIcon size={56} />
            <span className="text-[#4A6A58] font-mono text-xs">56px</span>
          </div>
          <div className="flex flex-col items-center gap-4">
            <NexusIcon size={40} />
            <span className="text-[#4A6A58] font-mono text-xs">40px</span>
          </div>
        </div>
      </section>
    </div>
  );
}
