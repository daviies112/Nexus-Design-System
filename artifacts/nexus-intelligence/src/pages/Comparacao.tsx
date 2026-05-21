import { motion } from "framer-motion";
import { useLocation } from "wouter";

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: (d = 0) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.75, delay: d, ease: [0.16, 1, 0.3, 1] },
  }),
};

function Check({ color = "#00CC7A", size = 16 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
      <circle cx="8" cy="8" r="7" fill={color + "22"} />
      <path d="M5 8l2.5 2.5 4-4" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Cross() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 opacity-40">
      <circle cx="8" cy="8" r="7" fill="#4A6A5822" />
      <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="#4A6A58" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function Partial({ label }: { label: string }) {
  return (
    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F59E0B]/15 text-[#F59E0B] whitespace-nowrap">{label}</span>
  );
}

const FEATURES = [
  {
    label: "Amanda AI — atendimento WhatsApp 24/7",
    comp: <Cross />,
    start: <Check />,
    pro: <Check />,
    max: <Check />,
  },
  {
    label: "Formulário de qualificação personalizado com IA",
    comp: <Partial label="Sistema separado" />,
    start: <Check />,
    pro: <Check />,
    max: <Check />,
  },
  {
    label: "Consulta CPF automática (Datacorp)",
    comp: <Cross />,
    start: <Check color="#00CC7A" />,
    note: "R$1,99/consulta em todos os planos",
    pro: <Check color="#00CC7A" />,
    max: <Check color="#00CC7A" />,
  },
  {
    label: "Contrato digital com assinatura eletrônica",
    comp: <Cross />,
    start: <Check />,
    pro: <Check />,
    max: <Check />,
  },
  {
    label: "Agendamento automático + reuniões com IA",
    comp: <Partial label="R$3.000/mês separado" />,
    start: <Check />,
    pro: <Check />,
    max: <Check />,
  },
  {
    label: "Gravação e transcrição de reuniões (Gemini 2.5 Pro)",
    comp: <Partial label="R$3.000/mês separado" />,
    start: <Check />,
    pro: <Check />,
    max: <Check />,
  },
  {
    label: "Pix automático para cobrança de repasse",
    comp: <Cross />,
    start: <Cross />,
    pro: <Check color="#FF5A1F" />,
    max: <Check color="#FF5A1F" />,
    proNote: "R$3,00/transação",
  },
  {
    label: "Follow-up de inadimplência D+5 / D+10 / D+15",
    comp: <Partial label="100% manual" />,
    start: <Cross />,
    pro: <Check color="#FF5A1F" />,
    max: <Check color="#FF5A1F" />,
  },
  {
    label: "Negativação Serasa D+17 automática",
    comp: <Partial label="Manual — cara e lenta" />,
    start: <Cross />,
    pro: <Cross />,
    max: <Check color="#00CC7A" />,
    maxNote: "R$25,00/ação",
  },
  {
    label: "NF-e automática via Bling",
    comp: <Partial label="Sistema separado" />,
    start: <Cross />,
    pro: <Check color="#FF5A1F" />,
    max: <Check color="#FF5A1F" />,
  },
  {
    label: "Maleta com rastreio integrado",
    comp: <Cross />,
    start: <Partial label="Básico" />,
    pro: <Check color="#FF5A1F" />,
    max: <Check color="#FF5A1F" />,
  },
  {
    label: "Anti-churn automático pós-entrega",
    comp: <Cross />,
    start: <Partial label="Só D+3" />,
    pro: <Check color="#FF5A1F" />,
    max: <Check color="#FF5A1F" />,
    proNote: "D+3, D+10, D+20",
  },
  {
    label: "Plano de ação IA individual por consultora",
    comp: <Cross />,
    start: <Cross />,
    pro: <Cross />,
    max: <Check color="#00CC7A" />,
    maxNote: "R$5,00/geração",
  },
  {
    label: "CRM completo + Workspace colaborativo",
    comp: <Partial label="Parcial" />,
    start: <Check />,
    pro: <Check />,
    max: <Check />,
  },
  {
    label: "Publicação automática em 6 redes sociais",
    comp: <Cross />,
    start: <Check />,
    pro: <Check />,
    max: <Check />,
  },
  {
    label: "Suporte",
    comp: <Partial label="Ticket" />,
    start: <Partial label="Padrão" />,
    pro: <Partial label="Padrão" />,
    max: <Partial label="Canal dedicado" />,
  },
  {
    label: "Tudo em 1 plataforma (zero ferramentas paralelas)",
    comp: <Cross />,
    start: <Check />,
    pro: <Check />,
    max: <Check />,
  },
];

const COMP_COSTS = [
  { label: "Sistema de CRM + gestão (ex: Jueri)", val: "R$ 250" },
  { label: "App de catálogo + pedidos (ex: Up Vendas)", val: "R$ 450" },
  { label: "Sistema de reuniões IA", val: "R$ 3.000" },
  { label: "Formulários + landing pages", val: "R$ 100" },
  { label: "Agência de tráfego (mínimo)", val: "R$ 1.200" },
];

const PRO_PRICE = 997;
const MAX_PRICE = 1449;
const PRO_MONTH1 = Math.round(PRO_PRICE * 0.65);
const MAX_MONTH1 = Math.round(MAX_PRICE * 0.50);
const DELTA_MONTH1 = MAX_MONTH1 - PRO_MONTH1;

export default function Comparacao() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-[#060F0A]">
      {/* ── HERO ── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255,90,31,0.08) 0%, transparent 65%)" }} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp} className="inline-flex items-center gap-2 bg-[#FF5A1F]/10 border border-[#FF5A1F]/25 rounded-full px-4 py-2 text-xs font-semibold text-[#FF5A1F] mb-8 tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F] animate-pulse" />
            Nexus vs. Mercado — Comparação Completa
          </motion.div>
          <motion.h1 custom={0.08} initial="hidden" animate="visible" variants={fadeUp} className="font-syne font-extrabold text-5xl md:text-6xl text-white leading-tight tracking-tight mb-6">
            R$5.000+/mês em <span className="text-[#EF4444]">5 ferramentas</span> que não conversam entre si.
            <br />
            <span className="text-[#FF5A1F]">Ou R$649/mês.</span> Tudo integrado.
          </motion.h1>
          <motion.p custom={0.14} initial="hidden" animate="visible" variants={fadeUp} className="text-[#7AA88E] text-xl max-w-2xl mx-auto leading-relaxed mb-8">
            Cada mês que você mantém o ecossistema fragmentado é dinheiro que vai para ferramentas que mal se comunicam. A Amanda faz tudo isso automaticamente, com zero intervenção humana.
          </motion.p>
          <motion.div custom={0.2} initial="hidden" animate="visible" variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => setLocation("/checkout?plan=max")} className="bg-[#FF5A1F] text-[#1A0500] font-extrabold px-8 py-4 rounded-xl text-base hover:-translate-y-0.5 transition-all shadow-lg">
              Começar com o Nexus Max — 50% off 1º mês
            </button>
            <button onClick={() => setLocation("/checkout?plan=pro")} className="bg-[#1E3828] text-[#C4DDD0] font-bold px-8 py-4 rounded-xl text-base hover:bg-[#2A4A38] transition-all">
              Começar com o Pro — 35% off 1º mês
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── COMPETITOR BREAKDOWN ── */}
      <section className="px-6 pb-20 border-t border-[#1E3828]">
        <div className="max-w-4xl mx-auto pt-16">
          <motion.div custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10">
            <p className="text-[#FF5A1F] text-xs font-semibold tracking-[0.15em] uppercase mb-3">O que você paga hoje</p>
            <h2 className="font-syne font-bold text-3xl text-white">O ecossistema fragmentado que todo mundo usa</h2>
          </motion.div>
          <motion.div custom={0.08} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-[#0C1A12] border border-[#1E3828] rounded-2xl overflow-hidden">
            <div className="p-6 space-y-3">
              {COMP_COSTS.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-[#1E3828] last:border-b-0">
                  <span className="text-[#7AA88E] text-sm">{item.label}</span>
                  <span className="text-[#EF4444] font-bold text-sm font-mono">{item.val}/mês</span>
                </div>
              ))}
            </div>
            <div className="bg-[#1A0A08] border-t border-[#EF4444]/20 px-6 py-5 flex items-center justify-between">
              <div>
                <div className="text-[#EF4444] text-xs font-semibold uppercase tracking-wider mb-1">Total mensal</div>
                <div className="text-white text-sm">Sem contar esgotamento, erros e dados não sincronizados</div>
              </div>
              <div className="text-[#EF4444] font-syne font-extrabold text-4xl">R$5.000+</div>
            </div>
          </motion.div>
          <motion.p custom={0.14} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center text-[#4A6A58] text-sm mt-4 italic">
            "E ainda assim as ferramentas não conversam. Os dados duplicam. O suporte é de cada sistema separado. Você resolve bugs de integração no seu tempo livre."
          </motion.p>
        </div>
      </section>

      {/* ── FEATURE COMPARISON TABLE ── */}
      <section className="px-4 pb-20 border-t border-[#1E3828]">
        <div className="max-w-6xl mx-auto pt-16">
          <motion.div custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <p className="text-[#FF5A1F] text-xs font-semibold tracking-[0.15em] uppercase mb-3">Comparação Funcionalidade a Funcionalidade</p>
            <h2 className="font-syne font-bold text-3xl text-white">Tudo que você paga separado, incluído em um plano</h2>
          </motion.div>

          <motion.div custom={0.08} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="overflow-x-auto rounded-2xl border border-[#1E3828]">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-[#1E3828]">
                  <th className="bg-[#060F0A] px-5 py-4 text-left text-[#4A6A58] text-xs font-semibold uppercase tracking-wider w-[35%]">Funcionalidade</th>
                  <th className="bg-[#0A0A0A] px-4 py-4 text-center text-[#EF4444] text-xs font-bold uppercase tracking-wider">Concorrentes<br/><span className="text-[#EF4444] font-extrabold normal-case text-sm">R$5.000+</span></th>
                  <th className="bg-[#060F0A] px-4 py-4 text-center text-[#7AA88E] text-xs font-bold uppercase tracking-wider">Start<br/><span className="text-white font-extrabold normal-case text-sm">R$649</span></th>
                  <th className="bg-[#0C1A12] px-4 py-4 text-center text-[#FF5A1F] text-xs font-bold uppercase tracking-wider">Pro<br/><span className="text-white font-extrabold normal-case text-sm">R$997</span></th>
                  <th className="bg-[#0A1A10] px-4 py-4 text-center text-[#00CC7A] text-xs font-bold uppercase tracking-wider border-l-2 border-[#00CC7A]/30">Max<br/><span className="text-white font-extrabold normal-case text-sm">R$1.449</span></th>
                </tr>
              </thead>
              <tbody>
                {FEATURES.map((f, i) => (
                  <tr key={i} className={`border-b border-[#1E3828] last:border-b-0 ${i % 2 === 0 ? "" : "bg-[#0C1A12]/40"}`}>
                    <td className="bg-[#060F0A]/60 px-5 py-3.5">
                      <span className="text-[#C4DDD0] text-sm">{f.label}</span>
                    </td>
                    <td className="bg-[#0A0A0A]/40 px-4 py-3.5 text-center">
                      <div className="flex items-center justify-center">{f.comp}</div>
                    </td>
                    <td className="bg-[#060F0A]/40 px-4 py-3.5 text-center">
                      <div className="flex flex-col items-center gap-1">
                        {f.start}
                      </div>
                    </td>
                    <td className="bg-[#0C1A12]/40 px-4 py-3.5 text-center">
                      <div className="flex flex-col items-center gap-1">
                        {f.pro}
                        {(f as any).proNote && <span className="text-[#FF5A1F] text-[9px] font-semibold">{(f as any).proNote}</span>}
                      </div>
                    </td>
                    <td className="bg-[#0A1A10]/60 px-4 py-3.5 text-center border-l-2 border-[#00CC7A]/20">
                      <div className="flex flex-col items-center gap-1">
                        {f.max}
                        {(f as any).maxNote && <span className="text-[#00CC7A] text-[9px] font-semibold">{(f as any).maxNote}</span>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ── 3 PLANS WITH DISCOUNTS ── */}
      <section className="px-6 pb-20 border-t border-[#1E3828]">
        <div className="max-w-6xl mx-auto pt-16">
          <motion.div custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-6">
            <p className="text-[#FF5A1F] text-xs font-semibold tracking-[0.15em] uppercase mb-3">Oferta de Lançamento</p>
            <h2 className="font-syne font-bold text-3xl text-white mb-2">Escolha o seu plano</h2>
            <p className="text-[#7AA88E]">Primeiro mês com desconto especial. Sem fidelidade. Cancele quando quiser.</p>
          </motion.div>

          {/* Urgency banner */}
          <motion.div custom={0.05} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-[#FF5A1F]/10 border border-[#FF5A1F]/30 rounded-xl px-5 py-3 text-center mb-10">
            <span className="text-[#FF5A1F] text-sm font-bold">⚡ Desconto aplicado automaticamente no checkout — válido para novas assinaturas</span>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 items-start">

            {/* START */}
            <motion.div custom={0.1} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="rounded-2xl border border-[#1E3828] bg-[#0C1A12] overflow-hidden flex flex-col opacity-85">
              <div className="p-7 flex-1">
                <div className="text-[#7AA88E] text-xs font-bold uppercase tracking-widest mb-3">Nexus Start</div>
                <div className="mb-1 flex items-end gap-1">
                  <span className="font-syne font-extrabold text-4xl text-white">R$649</span>
                  <span className="text-[#7AA88E] text-sm mb-1">/mês</span>
                </div>
                <div className="text-[#4A6A58] text-xs mb-1 line-through">Sem desconto no primeiro mês</div>
                <div className="text-[10px] font-semibold px-2.5 py-1 rounded-full inline-block mb-5 bg-[#1E3828] text-[#7AA88E]">Até 30 leads/mês · Até 40 revendedoras</div>
                <p className="text-[#7AA88E] text-sm leading-relaxed mb-5">Para quem está estruturando o processo de prospecção e quer automatizar o caminho do lead até o contrato assinado.</p>
                <ul className="space-y-2 text-sm text-[#7AA88E]">
                  {[
                    "Amanda AI — atendimento WhatsApp",
                    "Formulário + consulta CPF (R$1,99)",
                    "Contrato digital + assinatura eletrônica",
                    "Agendamento + reuniões com IA",
                    "Maleta com rastreio básico",
                    "Anti-churn D+3 automático",
                    "CRM, estoque e publicação em 6 redes",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2"><Check size={13} />{item}</li>
                  ))}
                  <li className="text-[#4A6A58] flex items-center gap-2 pt-1 border-t border-[#1E3828] mt-2"><Cross />Pix automático · NF-e · Serasa</li>
                </ul>
              </div>
              <div className="px-7 pb-7">
                <button onClick={() => setLocation("/checkout?plan=start")} className="w-full py-3.5 rounded-xl font-bold text-sm bg-[#1E3828] text-[#7AA88E] hover:bg-[#2A4A38] hover:text-white transition-all">
                  Começar com o Start
                </button>
              </div>
            </motion.div>

            {/* PRO */}
            <motion.div custom={0.16} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative rounded-2xl border-2 border-[#FF5A1F]/50 bg-[#0C1A12] shadow-[0_0_50px_rgba(255,90,31,0.12)] overflow-hidden flex flex-col">
              <div className="bg-[#FF5A1F] text-[#1A0500] text-center py-2 text-xs font-extrabold tracking-widest uppercase">
                ⭐ Mais Escolhido
              </div>
              <div className="absolute top-10 right-5">
                <div className="bg-[#FF5A1F] text-[#1A0500] text-[10px] font-extrabold px-2.5 py-1 rounded-full">35% OFF 1º mês</div>
              </div>
              <div className="p-7 flex-1">
                <div className="text-[#FF5A1F] text-xs font-bold uppercase tracking-widest mb-3">Nexus Pro</div>
                <div className="mb-0.5 flex items-end gap-1">
                  <span className="font-syne font-extrabold text-5xl text-white">R${PRO_MONTH1}</span>
                  <span className="text-[#7AA88E] text-sm mb-1.5">/1º mês</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[#4A6A58] text-sm line-through">R$997/mês</span>
                  <span className="text-[#FF5A1F] text-xs font-bold">depois R$997/mês</span>
                </div>
                <div className="text-[10px] font-semibold px-2.5 py-1 rounded-full inline-block mb-5 bg-[#FF5A1F]/15 text-[#FF5A1F]">Até 70 leads/mês · Revendedoras ilimitadas</div>
                <p className="text-[#C4DDD0] text-sm leading-relaxed mb-5">Para empresas com revendedoras ativas que precisam que toda a operação financeira e logística rode sem nenhum humano para cobrar.</p>
                <ul className="space-y-2 text-sm text-[#C4DDD0]">
                  {[
                    "Tudo do Start, mais:",
                    "Pix automático de cobrança (R$3,00/transação)",
                    "Follow-up inadimplência D+5 / D+10 / D+15",
                    "Maleta 100% automatizada",
                    "NF-e automática via Bling",
                    "Anti-churn D+3 / D+10 / D+20",
                    "RMA com análise de foto por IA",
                    "Melhor Envio com fila automática",
                  ].map((item, i) => (
                    <li key={i} className={`flex items-center gap-2 ${i === 0 ? "text-white font-semibold" : ""}`}>
                      <Check color="#FF5A1F" size={13} />{item}
                    </li>
                  ))}
                  <li className="text-[#4A6A58] flex items-center gap-2 pt-1 border-t border-[#1E3828] mt-2"><Cross />Serasa D+17 · Plano de ação IA</li>
                </ul>
              </div>
              <div className="px-7 pb-7">
                <button onClick={() => setLocation("/checkout?plan=pro")} className="w-full py-4 rounded-xl font-extrabold text-base bg-[#FF5A1F] text-[#1A0500] hover:shadow-[0_0_30px_rgba(255,90,31,0.5)] transition-all hover:-translate-y-0.5">
                  Escolher o Pro — R${PRO_MONTH1} no 1º mês
                </button>
                <p className="text-[#4A6A58] text-[10px] text-center mt-2">Depois R$997/mês — cancele quando quiser</p>
              </div>
            </motion.div>

            {/* MAX */}
            <motion.div custom={0.22} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative rounded-2xl border-2 border-[#00CC7A]/50 bg-gradient-to-b from-[#0A1A10] to-[#0C1A12] shadow-[0_0_60px_rgba(0,204,122,0.1)] overflow-hidden flex flex-col">
              <div className="bg-gradient-to-r from-[#00CC7A] to-[#00AA62] text-[#001A0E] text-center py-2 text-xs font-extrabold tracking-widest uppercase">
                🏆 Melhor Custo-Benefício
              </div>
              <div className="absolute top-10 right-5">
                <div className="bg-[#00CC7A] text-[#001A0E] text-[10px] font-extrabold px-2.5 py-1 rounded-full">50% OFF 1º mês</div>
              </div>
              <div className="p-7 flex-1">
                <div className="text-[#00CC7A] text-xs font-bold uppercase tracking-widest mb-3">Nexus Max</div>
                <div className="mb-0.5 flex items-end gap-1">
                  <span className="font-syne font-extrabold text-5xl text-white">R${MAX_MONTH1}</span>
                  <span className="text-[#7AA88E] text-sm mb-1.5">/1º mês</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[#4A6A58] text-sm line-through">R$1.449/mês</span>
                  <span className="text-[#00CC7A] text-xs font-bold">depois R$1.449/mês</span>
                </div>
                <div className="text-[10px] font-semibold px-2.5 py-1 rounded-full inline-block mb-3 bg-[#00CC7A]/15 text-[#00CC7A]">Ilimitado em tudo</div>

                {/* THE HOOK */}
                <div className="bg-[#00CC7A]/10 border border-[#00CC7A]/25 rounded-xl px-4 py-3 mb-5">
                  <p className="text-[#00CC7A] text-xs font-bold mb-0.5">No 1º mês: só R${DELTA_MONTH1} a mais que o Pro</p>
                  <p className="text-[#7AA88E] text-[11px] leading-snug">Por R${DELTA_MONTH1} — menos que 3 pizzas — você tem Serasa D+17 automático + plano de ação IA por consultora.</p>
                </div>

                <p className="text-[#C4DDD0] text-sm leading-relaxed mb-5">Para empresas que não podem perder um repasse sequer. Operação 100% automática do lead ao Serasa.</p>
                <ul className="space-y-2 text-sm text-[#C4DDD0]">
                  {[
                    "Tudo do Pro, mais:",
                    "Negativação Serasa D+17 automática (R$25/ação)",
                    "Plano de ação IA por consultora (R$5/geração)",
                    "Reset automático de soft allocation",
                    "Suporte via canal dedicado",
                    "Acesso prioritário a novas funcionalidades",
                    "Ilimitado em leads, revendedoras e admins",
                  ].map((item, i) => (
                    <li key={i} className={`flex items-center gap-2 ${i === 0 ? "text-white font-semibold" : ""}`}>
                      <Check color="#00CC7A" size={13} />{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="px-7 pb-7">
                <button onClick={() => setLocation("/checkout?plan=max")} className="w-full py-4 rounded-xl font-extrabold text-base bg-gradient-to-r from-[#00CC7A] to-[#00AA62] text-[#001A0E] hover:shadow-[0_0_30px_rgba(0,204,122,0.4)] transition-all hover:-translate-y-0.5">
                  Ir para o Max — R${MAX_MONTH1} no 1º mês
                </button>
                <p className="text-[#4A6A58] text-[10px] text-center mt-2">Depois R$1.449/mês — cancele quando quiser</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHY MAX PAYS FOR ITSELF ── */}
      <section className="px-6 pb-20 border-t border-[#1E3828]">
        <div className="max-w-4xl mx-auto pt-16">
          <motion.div custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#00CC7A]/10 border border-[#00CC7A]/25 rounded-full px-4 py-2 text-xs font-bold text-[#00CC7A] mb-5 tracking-wide">
              🏆 Por que o Max paga a diferença sozinho
            </div>
            <h2 className="font-syne font-bold text-3xl text-white mb-4">A matemática que todo dono de semijoia precisa ver</h2>
            <p className="text-[#7AA88E] text-base max-w-2xl mx-auto">A diferença entre Pro e Max é R$452/mês. Veja o que isso representa na prática.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {[
              {
                title: "Serasa D+17 automático",
                color: "#00CC7A",
                calc: "Uma única dívida recuperada pela negativação = R$800+ (ticket médio de repasse). Precisou de 1 revendedora negativada por mês? A feature já pagou mais que a diferença Pro→Max.",
                badge: "R$25/ação cobrado. Custo do benefício: zero se recuperar.",
              },
              {
                title: "Plano de ação IA por consultora",
                color: "#00CC7A",
                calc: "Uma consultora com vendas 15% maiores por mês = R$120+ de repasse extra. Com 5 consultoras usando o plano de ação IA por mês, o custo (R$25) já tem ROI de 24x.",
                badge: "R$5/geração. Com 5 gerações = R$25. ROI mensurável.",
              },
              {
                title: "Canal de suporte dedicado",
                color: "#00CC7A",
                calc: "Prioridade máxima. Quando sua operação trava às 23h no dia de repasse, você quer um canal dedicado — não um ticket. Impossível precificar, mas impossível substituir.",
                badge: "Disponível apenas no Max.",
              },
              {
                title: "No 1º mês, a diferença é só R$" + DELTA_MONTH1,
                color: "#FF5A1F",
                calc: `Pro no 1º mês: R${PRO_MONTH1}. Max no 1º mês: R$${MAX_MONTH1}. Delta: R$${DELTA_MONTH1}. Para ter Serasa automático, plano de ação IA e suporte dedicado. Depois de 1 mês rodando, você já sabe se o Max vale R$452 a mais.`,
                badge: "Teste com risco mínimo.",
              },
            ].map((item, i) => (
              <motion.div key={i} custom={i * 0.08} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-[#0C1A12] border border-[#1E3828] rounded-2xl p-6 hover:border-[#00CC7A]/30 transition-colors">
                <div className="font-syne font-bold text-lg text-white mb-3">{item.title}</div>
                <p className="text-[#7AA88E] text-sm leading-relaxed mb-3">{item.calc}</p>
                <div className="text-xs font-bold px-3 py-1.5 rounded-full inline-block" style={{ background: item.color + "18", color: item.color }}>{item.badge}</div>
              </motion.div>
            ))}
          </div>

          {/* Year 1 comparison */}
          <motion.div custom={0.3} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-[#0C1A12] border border-[#1E3828] rounded-2xl p-8">
            <h3 className="font-syne font-bold text-white text-xl mb-6 text-center">Custo total no 1º ano — tudo incluído</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Concorrentes", cost: "R$60.000", color: "#EF4444", sub: "R$5.000/mês × 12" },
                { name: "Nexus Start", cost: "R$7.788", color: "#7AA88E", sub: "R$649/mês × 12" },
                { name: "Nexus Pro", cost: "R$11.615", color: "#FF5A1F", sub: `R$${PRO_MONTH1} + R$997×11`, badge: "35% 1º mês" },
                { name: "Nexus Max", cost: "R$16.663", color: "#00CC7A", sub: `R$${MAX_MONTH1} + R$1.449×11`, badge: "50% 1º mês" },
              ].map((item, i) => (
                <div key={i} className={`rounded-xl border p-4 text-center ${i === 3 ? "border-[#00CC7A]/40 bg-[#00CC7A]/5" : "border-[#1E3828] bg-[#060F0A]"}`}>
                  <div className="text-xs font-semibold mb-1" style={{ color: item.color }}>{item.name}</div>
                  <div className="font-syne font-extrabold text-2xl text-white mb-0.5">{item.cost}</div>
                  <div className="text-[#4A6A58] text-[10px]">{item.sub}</div>
                  {item.badge && <div className="mt-1 text-[9px] font-bold px-2 py-0.5 rounded-full inline-block" style={{ background: item.color + "20", color: item.color }}>{item.badge}</div>}
                </div>
              ))}
            </div>
            <p className="text-center text-[#4A6A58] text-xs mt-4">* Custo da plataforma. Uso avulso (CPF, Pix, Serasa, etc.) cobrado conforme consumo real.</p>
          </motion.div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="px-6 pb-24 border-t border-[#1E3828]">
        <div className="max-w-3xl mx-auto pt-16 text-center">
          <motion.div custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="font-syne font-extrabold text-4xl text-white mb-4">
              Chega de pagar R$5.000 em ferramentas que não conversam.
            </h2>
            <p className="text-[#7AA88E] text-lg mb-8 leading-relaxed">
              Setup em 7 dias. Um cartão. Zero ferramentas paralelas. A Amanda cuida de tudo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => setLocation("/checkout?plan=max")} className="bg-gradient-to-r from-[#00CC7A] to-[#00AA62] text-[#001A0E] font-extrabold px-10 py-5 rounded-xl text-lg hover:-translate-y-0.5 transition-all shadow-xl">
                🏆 Ir para o Max — R${MAX_MONTH1} no 1º mês
              </button>
              <button onClick={() => setLocation("/checkout?plan=pro")} className="bg-[#FF5A1F] text-[#1A0500] font-extrabold px-10 py-5 rounded-xl text-lg hover:-translate-y-0.5 transition-all shadow-lg">
                Escolher o Pro — R${PRO_MONTH1} no 1º mês
              </button>
            </div>
            <p className="text-[#4A6A58] text-sm mt-5">Sem fidelidade · Cancele quando quiser · Sem multa</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
