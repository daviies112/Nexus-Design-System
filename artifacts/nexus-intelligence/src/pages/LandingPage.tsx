import { useState } from "react";
import { motion } from "framer-motion";
import { NexusIcon } from "@/components/NexusIcon";
import DemoSection from "@/components/DemoSection";
import ROICalculator from "@/components/ROICalculator";
import QualificationForm from "@/components/QualificationForm";
import PurchaseNotification from "@/components/PurchaseNotification";
import SpecialOfferModal from "@/components/SpecialOfferModal";

export default function LandingPage() {
  const [showDemoModal, setShowDemoModal] = useState(false);

  const scrollToQual = () => {
    document.getElementById("qualificacao")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <PurchaseNotification />
      <SpecialOfferModal />

      {/* Section 1 — Hero */}
      <section
        className="relative bg-[#060F0A] py-32 md:py-44 px-6 flex items-center justify-center overflow-hidden"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,90,31,0.13) 0%, transparent 65%), #060F0A" }}
      >
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 bg-[#0C1A12] border border-[#1E3828] rounded-full px-4 py-1.5 text-sm text-[#7AA88E] mb-8">
              <span className="w-2 h-2 rounded-full bg-[#FF5A1F] animate-pulse"></span>
              Fila de espera aberta — 200 vagas restantes
            </div>

            <h1 className="font-syne font-extrabold text-5xl sm:text-6xl md:text-8xl leading-[0.95] tracking-tight">
              <span className="text-white">Sua semijoia</span><br />
              <span className="text-[#FF5A1F]">fatura sozinha.</span>
            </h1>

            <p className="text-xl md:text-2xl text-[#7AA88E] mt-6 max-w-2xl mx-auto leading-relaxed">
              Automatize cobrança, estoque e nota fiscal pelo WhatsApp. Tudo com a Amanda AI, por R$200/mês.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mt-10">
              <button
                onClick={scrollToQual}
                className="bg-[#FF5A1F] text-[#1A0500] font-extrabold px-10 py-4 rounded-xl text-lg hover:-translate-y-1 transition-transform w-full sm:w-auto shadow-lg shadow-[#FF5A1F]/20"
              >
                Quero automatizar
              </button>
              <button
                onClick={() => document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })}
                className="border border-[#1E3828] text-[#C4DDD0] px-8 py-4 rounded-xl text-lg hover:bg-[#0C1A12] transition-colors w-full sm:w-auto"
              >
                Ver como funciona
              </button>
            </div>

            <div className="mt-12 flex items-center gap-6 text-sm text-[#7AA88E]">
              {["Sem contrato", "7 dias grátis", "Setup em 24h"].map((t, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-[#00CC7A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {t}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2 — Stats Bar */}
      <section
        className="w-full bg-[#FF5A1F] py-14 relative"
        style={{
          backgroundImage: "linear-gradient(rgba(26,5,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(26,5,0,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x divide-[#1A0500]/20 text-center"
          >
            {[
              { num: "97%", desc: "das cobranças resolvidas sem intervenção humana" },
              { num: "R$200", desc: "por mês, 21 módulos inclusos" },
              { num: "24h", desc: "para colocar no ar após assinatura" },
              { num: "Zero", desc: "contrato de fidelidade" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col">
                <span className="font-syne font-extrabold text-5xl text-[#1A0500]">{s.num}</span>
                <span className="text-[#5C1A00] text-sm font-semibold mt-1 max-w-[180px] mx-auto">{s.desc}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section 3 — O Problema */}
      <section className="bg-[#060F0A] py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="border-l-4 border-[#FF5A1F] pl-8 mb-12">
              <span className="text-[#FF5A1F] text-xs font-bold tracking-[0.2em] uppercase">O PROBLEMA</span>
            </div>
            <h2 className="font-syne font-extrabold text-4xl md:text-5xl">
              <span className="text-white">Você está presa</span>
              <span className="text-[#7AA88E]"> na operação.</span>
            </h2>
            <p className="text-[#7AA88E] text-xl mt-4 max-w-2xl">
              Enquanto você cobra pelo WhatsApp, controla estoque no Excel e emite NF manualmente, sua concorrente já automatizou tudo.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mt-16">
            {[
              { number: "4h/dia", desc: "gastas em cobranças manuais que a Amanda faz em segundos" },
              { number: "R$0", desc: "de notas fiscais emitidas quando você tá sem tempo" },
              { number: "87%", desc: "das empreendedoras largam o negócio por esgotamento operacional" },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#0C1A12] border border-[#1E3828] rounded-2xl p-8"
              >
                <div className="font-syne font-extrabold text-3xl text-[#FF5A1F]">{card.number}</div>
                <div className="text-[#7AA88E] text-sm mt-2 leading-relaxed">{card.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 — Amanda AI */}
      <section className="bg-[#0C1A12] py-24 md:py-32 px-6 border-t border-[#1E3828]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="inline-block bg-[#FF5A1F] text-[#1A0500] text-xs font-extrabold tracking-widest uppercase px-3 py-1.5 rounded mb-6">
              AMANDA AI
            </div>
            <h2 className="font-syne font-extrabold text-4xl md:text-5xl mb-8">
              <span className="text-white">A IA que cobra,</span>
              <span className="text-[#FF5A1F]"> emite e atualiza.</span>
            </h2>
            <div className="flex flex-col gap-4">
              {[
                "Cobrança automática pelo WhatsApp para cada revendedora",
                "Emissão de NF-e e NFS-e em 3 segundos",
                "Atualização de estoque em tempo real",
                "Comissões calculadas automaticamente para toda a rede",
                "Dashboard completo com visão do negócio",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="bg-[#00CC7A]/20 p-1 rounded flex-shrink-0">
                    <svg className="w-5 h-5 text-[#00CC7A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white font-medium">{item}</span>
                </div>
              ))}
            </div>
            <button
              onClick={scrollToQual}
              className="mt-10 bg-[#FF5A1F] text-[#1A0500] font-extrabold px-8 py-4 rounded-xl hover:-translate-y-0.5 transition-transform shadow-lg"
            >
              Quero a Amanda AI
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-[#060F0A] rounded-3xl p-6 border border-[#1E3828] shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-[#1E3828] pb-4 mb-6">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#00CC7A] flex items-center justify-center font-syne font-bold text-[#1A0500]">A</div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#00CC7A] border-2 border-[#060F0A] rounded-full"></div>
              </div>
              <div>
                <div className="font-bold text-white text-sm">Amanda AI</div>
                <div className="text-xs text-[#00CC7A]">online agora</div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="self-start max-w-[85%] relative">
                <div className="bg-[#0C1A12] text-[#F0FAF4] p-4 rounded-2xl rounded-tl-sm border border-[#1E3828] text-sm leading-relaxed shadow-sm">
                  Oi Ana! 👋 A maleta #47 tem R$ 2.340 em aberto. Posso enviar as cobranças agora?
                </div>
                <span className="absolute -right-2 -top-2 bg-[#00CC7A] text-[#060F0A] text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Cobrança</span>
              </div>
              <div className="self-end max-w-[85%]">
                <div className="bg-[#FF5A1F] text-[#1A0500] font-medium p-4 rounded-2xl rounded-tr-sm text-sm shadow-sm">
                  Manda sim!
                </div>
              </div>
              <div className="self-start max-w-[85%] relative">
                <div className="bg-[#0C1A12] text-[#F0FAF4] p-4 rounded-2xl rounded-tl-sm border border-[#1E3828] text-sm leading-relaxed shadow-sm">
                  Cobranças enviadas para Carla, Júlia e Priscila. NF-e emitida. Estoque atualizado ✅
                </div>
                <span className="absolute -right-2 -top-2 bg-[#FF5A1F] text-[#1A0500] text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Automático</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 5 — Demo ao vivo */}
      <DemoSection />

      {/* Section 6 — Módulos */}
      <section className="bg-[#0C1A12] py-24 md:py-32 px-6 border-t border-[#1E3828]">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-[#FF5A1F] text-xs font-bold tracking-[0.2em] uppercase block mb-4">21 MÓDULOS INTEGRADOS</span>
            <h2 className="font-syne font-extrabold text-4xl md:text-5xl text-white">
              Tudo que você precisa, num só lugar.
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "💰", title: "Cobrança Inteligente", desc: "Régua de cobrança automatizada pelo WhatsApp com múltiplas tentativas." },
              { icon: "📦", title: "Gestão de Estoque", desc: "Controle de maletas, peças e devoluções em tempo real." },
              { icon: "🧾", title: "Emissão Fiscal", desc: "NF-e e NFS-e emitidas automaticamente em segundos após cada venda." },
              { icon: "💸", title: "Comissões", desc: "Cálculo automático para toda sua rede de revendedoras." },
              { icon: "📊", title: "Dashboard", desc: "Visão completa do negócio: vendas, inadimplência, comissões." },
              { icon: "🤖", title: "Amanda AI", desc: "IA central que orquestra todos os 21 módulos da plataforma." },
              { icon: "📱", title: "WhatsApp Business", desc: "Integração nativa com a API oficial do WhatsApp." },
              { icon: "🔔", title: "Lembretes", desc: "Notificações automáticas para revendedoras e para você." },
              { icon: "📈", title: "Relatórios", desc: "Relatórios financeiros e de desempenho gerados automaticamente." },
            ].map((mod, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group bg-[#060F0A] border border-[#1E3828] rounded-2xl p-8 hover:border-[#FF5A1F]/40 hover:bg-[#0C1A12] transition-all cursor-pointer"
              >
                <div className="text-3xl mb-5">{mod.icon}</div>
                <h3 className="font-syne font-bold text-xl text-white group-hover:text-[#FF5A1F] transition-colors">{mod.title}</h3>
                <p className="text-[#7AA88E] text-sm leading-relaxed mt-2">{mod.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7 — ROI Calculator */}
      <ROICalculator />

      {/* Section 8 — Pricing */}
      <section id="preco" className="bg-[#060F0A] py-24 px-6 border-t border-[#1E3828]">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-[#FF5A1F] text-xs font-bold tracking-[0.2em] uppercase block mb-4">PREÇO</span>
            <h2 className="font-syne font-extrabold text-4xl md:text-5xl text-white">
              Simples. Transparente. Justo.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden border border-[#1E3828] max-w-4xl mx-auto grid md:grid-cols-2 shadow-2xl"
          >
            <div className="bg-[#0C1A12] p-10 md:p-12 flex flex-col justify-center">
              <h3 className="text-white font-syne font-bold text-xl mb-8">O que você paga hoje</h3>
              <ul className="space-y-4 mb-10">
                {[
                  { label: "Cobrador externo / funcionário", price: "R$ 800+" },
                  { label: "Software de estoque", price: "R$ 150" },
                  { label: "Emissão de NF", price: "R$ 100" },
                  { label: "WhatsApp Business API", price: "R$ 50" },
                ].map((item, i) => (
                  <li key={i} className="flex justify-between text-[#4A6A58] line-through text-sm">
                    <span>{item.label}</span><span>{item.price}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-6 border-t border-[#1E3828]">
                <div className="text-[#EF4444] text-3xl font-syne font-extrabold">R$1.100+/mês</div>
                <div className="text-[#7AA88E] text-sm mt-1">sem contar o seu tempo</div>
              </div>
            </div>

            <div className="bg-[#FF5A1F] p-10 md:p-12 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
              <div className="flex items-center gap-3 mb-8">
                <NexusIcon size={32} stroke="#1A0500" white="#1A0500" nodeColor="#1A0500" />
                <h3 className="text-[#1A0500] font-syne font-bold text-xl">Nexus Intelligence</h3>
              </div>
              <div className="text-[#5C1A00] font-semibold mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-[#1A0500]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
                Tudo acima + 21 módulos integrados
              </div>
              <div className="mb-2">
                <span className="text-[#1A0500] font-syne font-extrabold text-6xl tracking-tight">R$200</span>
                <span className="text-[#5C1A00] text-xl font-bold ml-1">/mês</span>
              </div>
              <p className="text-[#1A0500] text-sm font-semibold mb-8">Tudo incluso. Sem taxas escondidas. Sem fidelidade.</p>
              <button
                onClick={scrollToQual}
                className="bg-[#1A0500] text-[#FF5A1F] font-extrabold px-8 py-4 rounded-xl hover:scale-[1.02] transition-transform w-full shadow-lg"
              >
                Garantir minha vaga
              </button>
              <div className="mt-4 flex justify-center gap-3">
                <span className="bg-[#1A0500]/20 text-[#1A0500] text-xs font-bold px-3 py-1.5 rounded-full">✓ 7 dias grátis</span>
                <span className="bg-[#1A0500]/20 text-[#1A0500] text-xs font-bold px-3 py-1.5 rounded-full">✓ Cancele quando quiser</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 9 — Qualification Form */}
      <QualificationForm />

      {/* Section 10 — CTA Final */}
      <section
        className="w-full bg-[#FF5A1F] py-28 relative overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(rgba(26,5,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(26,5,0,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 flex flex-col items-center">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="mb-8">
            <NexusIcon size={96} stroke="#1A0500" white="#1A0500" nodeColor="#1A0500" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-syne font-extrabold text-5xl md:text-7xl text-[#1A0500] text-center leading-tight tracking-tight"
          >
            Automatize. Cresça.<br />Domine.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#5C1A00] text-xl text-center mt-6 font-medium max-w-2xl"
          >
            Junte-se às empreendedoras que pararam de ser escravas da operação.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            onClick={scrollToQual}
            className="bg-[#1A0500] text-[#FF5A1F] font-extrabold px-12 py-5 rounded-xl text-xl mt-10 hover:-translate-y-1 transition-transform inline-block shadow-xl"
          >
            Quero minha vaga agora
          </motion.button>
        </div>
      </section>
    </div>
  );
}
