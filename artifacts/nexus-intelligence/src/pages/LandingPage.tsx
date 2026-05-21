import { useState } from "react";
import { motion } from "framer-motion";
import { NexusIconSm } from "@/components/NexusIcon";
import DemoSection from "@/components/DemoSection";
import ROICalculator from "@/components/ROICalculator";
import QualificationForm from "@/components/QualificationForm";
import PurchaseNotification from "@/components/PurchaseNotification";
import SpecialOfferModal from "@/components/SpecialOfferModal";

/* ─── Inline SVG icon components ─── */
function IconCheck() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8l3.5 3.5L13 5" stroke="#00CC7A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function IconArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function LandingPage() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col">
      <PurchaseNotification />
      <SpecialOfferModal />

      {/* ── 1. HERO ── */}
      <section className="relative bg-[#060F0A] px-6 overflow-hidden">
        {/* Subtle background grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: "linear-gradient(#7AA88E 1px, transparent 1px), linear-gradient(90deg, #7AA88E 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10 pt-24 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Status pill — once only across the page */}
            <div className="inline-flex items-center gap-2 text-xs text-[#7AA88E] mb-10 tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F] animate-pulse" />
              Fila de espera aberta — 200 vagas restantes
            </div>

            <h1 className="font-syne font-semibold tracking-tight leading-[1.15] text-4xl md:text-5xl">
              <span className="block text-white">
                Automatize sua semijoia.
              </span>
              <span className="block text-white">
                Cresça{" "}
                <span className="text-[#FF5A1F]">sem contratar.</span>
              </span>
            </h1>

            {/* Editorial divider */}
            <div className="flex items-center justify-center gap-3 my-8">
              <div className="h-px w-10 bg-[#1E3828]" />
              <div className="w-1 h-1 rounded-full bg-[#FF5A1F]" />
              <div className="h-px w-10 bg-[#1E3828]" />
            </div>

            <p className="text-[#7AA88E] text-lg leading-relaxed max-w-xl mx-auto font-normal">
              Cobrança, estoque e nota fiscal automatizados pelo WhatsApp.
              R$200/mês, sem cartão, sem contrato.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <button
                onClick={() => scrollTo("qualificacao")}
                className="bg-[#FF5A1F] text-[#1A0500] font-bold px-9 py-3.5 rounded-full text-[15px] tracking-wide transition-opacity hover:opacity-90 w-full sm:w-auto"
              >
                Garantir minha vaga
              </button>
              <button
                onClick={() => scrollTo("demo")}
                className="inline-flex items-center gap-2 text-[#7AA88E] hover:text-white text-[15px] font-medium transition-colors"
              >
                Ver como funciona <IconArrow />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. STATS ── */}
      <section className="bg-[#060F0A] border-t border-[#1E3828] px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#1E3828] border border-[#1E3828] rounded-2xl overflow-hidden"
          >
            {[
              { num: "97%", label: "Cobranças resolvidas", sub: "sem intervenção humana" },
              { num: "R$200", label: "Por mês, tudo incluso", sub: "21 módulos integrados" },
              { num: "24h", label: "Setup assistido", sub: "após a assinatura" },
              { num: "Zero", label: "Contrato de fidelidade", sub: "cancele quando quiser" },
            ].map((s, i) => (
              <div key={i} className="bg-[#060F0A] px-8 py-8">
                <div className="font-syne font-extrabold text-4xl text-white">{s.num}</div>
                <div className="text-white text-sm font-semibold mt-2">{s.label}</div>
                <div className="text-[#4A6A58] text-xs mt-0.5">{s.sub}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 3. PROBLEMA ── */}
      <section className="bg-[#060F0A] px-6 py-24 border-t border-[#1E3828]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="text-[#FF5A1F] text-xs font-semibold tracking-[0.15em] uppercase mb-5">O Problema</p>
            <h2 className="font-syne font-bold text-3xl md:text-4xl text-white leading-snug tracking-tight">
              Você está administrando
              <br />um negócio ou apagando
              <br /><span className="text-[#FF5A1F]">incêndios?</span>
            </h2>
            <p className="text-[#7AA88E] text-base leading-relaxed mt-6 max-w-sm">
              Cobrança manual, estoque no Excel, nota fiscal atrasada — cada dia perdido custa mais do que você imagina.
            </p>
            <div className="mt-8 space-y-3">
              {[
                "4h por dia desperdiçadas em cobranças que a IA faz em 8 segundos",
                "Notas fiscais atrasadas geram multa e perda de credibilidade",
                "87% das empreendedoras de semijoias relatam esgotamento operacional",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-1 h-1 rounded-full bg-[#FF5A1F] mt-2.5 flex-shrink-0" />
                  <span className="text-[#C4DDD0] text-[15px] leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-4"
          >
            {[
              { num: "4h/dia", label: "gastas em cobrança manual", accent: true },
              { num: "68%", label: "das cobranças não resolvidas por falta de follow-up", accent: false },
              { num: "R$ 0", label: "de NF emitida quando você está sem tempo", accent: false },
            ].map((card, i) => (
              <div key={i} className={`rounded-2xl px-7 py-6 border ${card.accent ? "border-[#FF5A1F]/30 bg-[#FF5A1F]/5" : "border-[#1E3828] bg-[#0C1A12]"}`}>
                <div className={`font-syne font-extrabold text-3xl ${card.accent ? "text-[#FF5A1F]" : "text-white"}`}>{card.num}</div>
                <div className="text-[#7AA88E] text-sm mt-1.5 leading-snug">{card.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 4. AMANDA AI ── */}
      <section className="bg-[#0C1A12] px-6 py-24 border-t border-[#1E3828]">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-[#FF5A1F] text-xs font-semibold tracking-[0.15em] uppercase mb-5">Amanda AI</p>
            <h2 className="font-syne font-bold text-3xl md:text-4xl text-white leading-snug tracking-tight">
              A funcionária que nunca falta,
              nunca esquece,
              <span className="text-[#FF5A1F]"> nunca cansa.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: "Cobrança Automática",
                desc: "Régua inteligente via WhatsApp. Mensagem certa, hora certa, para cada revendedora.",
                icon: <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none"><path d="M10 2a8 8 0 100 16A8 8 0 0010 2zm0 4v4l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
              },
              {
                title: "Emissão Fiscal",
                desc: "NF-e e NFS-e emitidas em segundos após cada venda. Zero burocracia.",
                icon: <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none"><rect x="4" y="2" width="12" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M7 7h6M7 10h6M7 13h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
              },
              {
                title: "Gestão de Estoque",
                desc: "Maletas, peças e devoluções atualizadas em tempo real, automaticamente.",
                icon: <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none"><path d="M3 7l7-4 7 4v6l-7 4-7-4V7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>,
              },
              {
                title: "Comissões",
                desc: "Cálculo automático para toda a rede. Relatório individual por revendedora.",
                icon: <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M10 6v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
              },
              {
                title: "Dashboard Completo",
                desc: "Faturamento, inadimplência, desempenho por revendedora — tudo numa tela.",
                icon: <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none"><rect x="3" y="10" width="4" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="8" y="6" width="4" height="11" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="13" y="3" width="4" height="14" rx="1" stroke="currentColor" strokeWidth="1.5"/></svg>,
              },
              {
                title: "WhatsApp Business",
                desc: "API oficial do WhatsApp. Mensagens confiáveis, sem risco de bloqueio.",
                icon: <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none"><path d="M10 2C5.6 2 2 5.6 2 10c0 1.4.4 2.8 1 3.9L2 18l4.2-1C7.3 17.6 8.6 18 10 18c4.4 0 8-3.6 8-8s-3.6-8-8-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>,
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-[#060F0A] border border-[#1E3828] rounded-2xl p-7 group hover:border-[#FF5A1F]/25 transition-colors duration-300"
              >
                <div className="w-9 h-9 rounded-lg bg-[#1E3828] text-[#C4DDD0] flex items-center justify-center mb-5 group-hover:bg-[#FF5A1F]/10 group-hover:text-[#FF5A1F] transition-colors">
                  {f.icon}
                </div>
                <h3 className="font-syne font-bold text-[17px] text-white mb-2">{f.title}</h3>
                <p className="text-[#7AA88E] text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex items-center gap-4">
            <button
              onClick={() => scrollTo("qualificacao")}
              className="bg-[#FF5A1F] text-[#1A0500] font-bold px-8 py-3 rounded-full text-sm tracking-wide hover:opacity-90 transition-opacity"
            >
              Quero a Amanda AI
            </button>
            <span className="text-[#4A6A58] text-sm">R$200/mês · 7 dias grátis · sem cartão</span>
          </div>
        </div>
      </section>

      {/* ── 5. DEMO AO VIVO ── */}
      <DemoSection />

      {/* ── 6. ROI CALCULATOR ── */}
      <ROICalculator />

      {/* ── 7. PRICING ── */}
      <section id="preco" className="bg-[#060F0A] px-6 py-24 border-t border-[#1E3828]">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-xl mb-14">
            <h2 className="font-syne font-bold text-3xl md:text-4xl text-white leading-snug tracking-tight">
              Simples, transparente,{" "}
              <span className="text-[#FF5A1F]">sem surpresas.</span>
            </h2>
            <p className="text-[#7AA88E] text-base mt-4 leading-relaxed max-w-sm">
              Um plano. 21 módulos. Tudo incluso pelo preço de um almoço por semana.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 rounded-2xl overflow-hidden border border-[#1E3828]"
          >
            {/* Left — o que você paga hoje */}
            <div className="bg-[#0C1A12] p-10 border-b md:border-b-0 md:border-r border-[#1E3828]">
              <p className="text-[#4A6A58] text-sm font-medium mb-7 uppercase tracking-wider">O que você paga hoje</p>
              <div className="space-y-4 mb-8">
                {[
                  { label: "Cobrador / funcionário", val: "R$ 800+" },
                  { label: "Software de estoque", val: "R$ 150" },
                  { label: "Emissão de NF", val: "R$ 100" },
                  { label: "WhatsApp Business API", val: "R$ 50" },
                  { label: "Seu tempo (4h/dia × R$40/h)", val: "R$ 3.200" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-[#4A6A58] text-sm line-through">{item.label}</span>
                    <span className="text-[#4A6A58] text-sm line-through">{item.val}</span>
                  </div>
                ))}
              </div>
              <div className="pt-5 border-t border-[#1E3828]">
                <div className="text-[#EF4444] font-syne font-extrabold text-3xl">R$4.300+/mês</div>
                <div className="text-[#4A6A58] text-sm mt-1">sem contar esgotamento</div>
              </div>
            </div>

            {/* Right — Nexus */}
            <div className="bg-[#FF5A1F] p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-7">
                  <NexusIconSm size={32} />
                  <p className="text-[#1A0500] text-sm font-semibold uppercase tracking-wider">Nexus Intelligence</p>
                </div>
                <div className="mb-2">
                  <span className="font-syne font-extrabold text-[56px] text-[#1A0500] leading-none">R$200</span>
                  <span className="text-[#5C1A00] text-lg font-semibold ml-1">/mês</span>
                </div>
                <p className="text-[#5C1A00] text-sm font-medium mb-8">21 módulos · sem taxas · sem fidelidade</p>
                <ul className="space-y-2.5 mb-8">
                  {[
                    "Amanda AI — cobrança, NF e estoque",
                    "WhatsApp Business API integrada",
                    "Setup assistido em 24h",
                    "Relatórios automáticos",
                    "Suporte via WhatsApp",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-[#1A0500] text-sm font-medium">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2.5 7l3 3 6-6" stroke="#1A0500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => scrollTo("qualificacao")}
                className="bg-[#1A0500] text-[#FF5A1F] font-bold py-3.5 rounded-full text-[15px] hover:opacity-90 transition-opacity w-full tracking-wide"
              >
                Começar 7 dias grátis
              </button>
            </div>
          </motion.div>

          {/* Social proof bar below pricing */}
          <div className="mt-6 grid grid-cols-3 gap-px bg-[#1E3828] border border-[#1E3828] rounded-xl overflow-hidden text-center">
            {[
              "Mais de 300 revendedoras automatizadas",
              "Setup em até 24h após assinatura",
              "94% mantêm o serviço após o primeiro mês",
            ].map((item, i) => (
              <div key={i} className="bg-[#060F0A] px-4 py-4 text-[#7AA88E] text-xs leading-snug">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. QUALIFICATION FORM ── */}
      <QualificationForm />

      {/* ── 9. CTA FINAL ── */}
      <section className="bg-[#0C1A12] border-t border-[#1E3828] px-6 py-28">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Divider above */}
            <div className="flex items-center justify-center gap-3 mb-10">
              <div className="h-px w-12 bg-[#1E3828]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F]" />
              <div className="h-px w-12 bg-[#1E3828]" />
            </div>

            <h2 className="font-syne font-bold text-3xl md:text-4xl text-white leading-snug tracking-tight">
              Pare de trabalhar no negócio.{" "}
              <span className="text-[#FF5A1F]">Comece a trabalhar nele.</span>
            </h2>
            <p className="text-[#7AA88E] text-base mt-6 max-w-lg mx-auto leading-relaxed">
              Junte-se às empreendedoras que pararam de apagar incêndios e voltaram a crescer.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <button
                onClick={() => scrollTo("qualificacao")}
                className="bg-[#FF5A1F] text-[#1A0500] font-bold px-10 py-3.5 rounded-full text-[15px] tracking-wide hover:opacity-90 transition-opacity"
              >
                Receber proposta personalizada
              </button>
              <button
                onClick={() => scrollTo("demo")}
                className="inline-flex items-center gap-2 text-[#7AA88E] hover:text-white text-[15px] font-medium transition-colors"
              >
                Ver demonstração <IconArrow />
              </button>
            </div>

            <div className="flex items-center justify-center gap-6 mt-10 text-xs text-[#4A6A58]">
              <span className="flex items-center gap-1.5"><IconCheck />7 dias grátis</span>
              <span className="flex items-center gap-1.5"><IconCheck />Sem cartão de crédito</span>
              <span className="flex items-center gap-1.5"><IconCheck />Cancele quando quiser</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
