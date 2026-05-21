import { NexusIcon, NexusIconSm } from "@/components/NexusIcon";

export default function InstagramTemplates() {
  return (
    <div className="py-24 max-w-7xl mx-auto px-6">
      <div className="mb-16">
        <h1 className="font-syne font-extrabold text-5xl text-white">Templates Instagram</h1>
        <p className="text-[#7AA88E] text-lg mt-4 max-w-2xl">
          Formatos prontos para o feed. Use estes designs para manter consistência visual e um tom direto, arrojado e autoritário na comunicação.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Template 1: 93% de Margem */}
        <div className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group bg-[#060F0A] border border-[#1E3828] flex flex-col justify-center items-center text-center p-8">
          <div className="absolute top-6 left-6 bg-[#FF5A1F] text-[#1A0500] text-[9px] font-extrabold uppercase tracking-widest px-2 py-1 rounded">MÉTRICA</div>
          
          <div className="font-syne font-extrabold text-[#FF5A1F] leading-none" style={{ fontSize: '120px' }}>93%</div>
          <div className="text-[#7AA88E] font-medium text-xl mt-4">de margem por cliente</div>
          
          <div className="absolute bottom-6 left-6">
            <NexusIconSm size={24} />
          </div>
          <div className="group-hover:opacity-100 opacity-0 transition-all absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white/20 p-4 rounded-full text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            </div>
          </div>
        </div>

        {/* Template 2: Manifesto */}
        <div className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group bg-[#FF5A1F] flex items-center p-12">
          <div className="absolute top-6 left-6 bg-[#1A0500] text-[#FF5A1F] text-[9px] font-extrabold uppercase tracking-widest px-2 py-1 rounded">MANIFESTO</div>
          
          <h2 className="font-syne font-extrabold text-5xl text-[#1A0500] leading-tight">
            Pare de gerenciar.<br/>Comece a escalar.
          </h2>
          
          <div className="absolute bottom-6 left-6">
            <NexusIconSm size={24} stroke="#1A0500" white="#1A0500" nodeColor="#1A0500" />
          </div>
          <div className="group-hover:opacity-100 opacity-0 transition-all absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white/20 p-4 rounded-full text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            </div>
          </div>
        </div>

        {/* Template 3: Zero Intervenção */}
        <div className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group bg-[#060F0A] border border-[#1E3828] flex flex-col justify-center p-12">
          <div className="absolute top-6 left-6 bg-[#FF5A1F] text-[#1A0500] text-[9px] font-extrabold uppercase tracking-widest px-2 py-1 rounded">FEATURE</div>
          
          <h2 className="font-syne font-extrabold text-4xl text-white mb-4">Zero intervenção humana.</h2>
          <p className="text-[#7AA88E] text-xl">A Amanda cuida de tudo enquanto você foca em crescer.</p>
          
          <div className="absolute bottom-6 left-6">
            <NexusIconSm size={24} />
          </div>
          <div className="group-hover:opacity-100 opacity-0 transition-all absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white/20 p-4 rounded-full text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            </div>
          </div>
        </div>

        {/* Template 4: R$200/mês */}
        <div className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group bg-[#FF5A1F] flex flex-col justify-center items-center text-center p-8" style={{ backgroundImage: "linear-gradient(rgba(26,5,0,0.06) 2px, transparent 2px), linear-gradient(90deg, rgba(26,5,0,0.06) 2px, transparent 2px)", backgroundSize: "40px 40px" }}>
          <div className="absolute top-6 left-6 bg-[#1A0500] text-[#FF5A1F] text-[9px] font-extrabold uppercase tracking-widest px-2 py-1 rounded">PREÇO</div>
          
          <div className="bg-white/5 p-12 rounded-[3rem] backdrop-blur-sm border border-[#1A0500]/10 shadow-xl">
            <div className="font-syne font-extrabold text-8xl text-[#1A0500] leading-none tracking-tight mb-2">R$200</div>
            <div className="text-[#5C1A00] text-xl font-bold uppercase tracking-wider">/mês tudo incluso</div>
          </div>
          
          <div className="absolute bottom-6 left-6">
            <NexusIconSm size={24} stroke="#1A0500" white="#1A0500" nodeColor="#1A0500" />
          </div>
          <div className="group-hover:opacity-100 opacity-0 transition-all absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white/20 p-4 rounded-full text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            </div>
          </div>
        </div>

        {/* Template 5: Cobrança Elegante */}
        <div className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group bg-[#060F0A] border border-[#1E3828] flex flex-col justify-between p-10 pt-16">
          <div className="absolute top-6 left-6 bg-[#FF5A1F] text-[#1A0500] text-[9px] font-extrabold uppercase tracking-widest px-2 py-1 rounded">AMANDA AI</div>
          
          <h2 className="font-syne font-extrabold text-3xl text-white">Cobrança elegante, no WhatsApp.</h2>
          
          <div className="flex flex-col gap-3 w-full mt-8">
            <div className="self-start bg-[#0C1A12] text-[#F0FAF4] p-4 rounded-2xl rounded-tl-sm border border-[#1E3828] text-sm shadow-sm w-4/5">
              Olá! O vencimento da maleta é amanhã. Posso enviar o pix?
            </div>
            <div className="self-end bg-[#FF5A1F] text-[#1A0500] font-medium p-4 rounded-2xl rounded-tr-sm text-sm shadow-sm w-3/5">
              Sim, por favor!
            </div>
          </div>
          
          <div className="absolute bottom-6 left-6">
            <NexusIconSm size={24} />
          </div>
          <div className="group-hover:opacity-100 opacity-0 transition-all absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white/20 p-4 rounded-full text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            </div>
          </div>
        </div>

        {/* Template 6: Logo N Laranja */}
        <div className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group bg-[#060F0A] border border-[#1E3828] flex flex-col justify-center items-center">
          <div className="absolute top-6 left-6 bg-[#FF5A1F] text-[#1A0500] text-[9px] font-extrabold uppercase tracking-widest px-2 py-1 rounded">BRAND</div>
          
          <NexusIcon size={180} />
          <div className="font-syne font-bold text-2xl mt-8 text-center leading-tight">
            <span className="text-white">nexus</span><br/>
            <span className="text-[#FF5A1F]">intelligence</span>
          </div>
          
          <div className="group-hover:opacity-100 opacity-0 transition-all absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white/20 p-4 rounded-full text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            </div>
          </div>
        </div>

        {/* Template 7: Logo N Preto */}
        <div className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group bg-[#FF5A1F] flex flex-col justify-center items-center">
          <div className="absolute top-6 left-6 bg-[#1A0500] text-[#FF5A1F] text-[9px] font-extrabold uppercase tracking-widest px-2 py-1 rounded">BRAND</div>
          
          <NexusIcon size={180} stroke="#1A0500" white="#1A0500" nodeColor="#1A0500" />
          <div className="font-syne font-bold text-2xl mt-8 text-center leading-tight text-[#1A0500]">
            nexus<br/>intelligence
          </div>
          
          <div className="group-hover:opacity-100 opacity-0 transition-all absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white/20 p-4 rounded-full text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            </div>
          </div>
        </div>

        {/* Template 8: Logo N Grid */}
        <div className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group bg-[#FF5A1F] flex flex-col justify-center items-center" style={{ backgroundImage: "linear-gradient(rgba(26,5,0,0.06) 2px, transparent 2px), linear-gradient(90deg, rgba(26,5,0,0.06) 2px, transparent 2px)", backgroundSize: "40px 40px" }}>
          <div className="absolute top-6 left-6 bg-[#1A0500] text-[#FF5A1F] text-[9px] font-extrabold uppercase tracking-widest px-2 py-1 rounded">BRAND</div>
          
          <div className="bg-white/20 backdrop-blur-md rounded-full p-12 shadow-xl border border-white/10">
            <NexusIcon size={140} stroke="#1A0500" white="#1A0500" nodeColor="#1A0500" />
          </div>
          
          <div className="group-hover:opacity-100 opacity-0 transition-all absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white/20 p-4 rounded-full text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            </div>
          </div>
        </div>

        {/* Template 9: Manifesto Bold */}
        <div className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group flex items-center justify-center p-12 text-center" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(0,204,122,0.15) 0%, transparent 70%), #060F0A' }}>
          <div className="absolute top-6 left-6 bg-[#FF5A1F] text-[#1A0500] text-[9px] font-extrabold uppercase tracking-widest px-2 py-1 rounded">MANIFESTO</div>
          
          <h2 className="font-syne font-extrabold text-5xl leading-tight">
            <span className="text-white block mb-2">Automatize.</span>
            <span className="text-white block mb-2">Cresça.</span>
            <span className="text-[#FF5A1F] block">Domine.</span>
          </h2>
          
          <div className="absolute bottom-6 left-6">
            <NexusIconSm size={24} />
          </div>
          <div className="group-hover:opacity-100 opacity-0 transition-all absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white/20 p-4 rounded-full text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
