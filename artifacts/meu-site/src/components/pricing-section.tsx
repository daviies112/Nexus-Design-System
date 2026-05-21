import { motion } from "framer-motion";
import { useLocation } from "wouter";

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: (d = 0) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.75, delay: d, ease: [0.16, 1, 0.3, 1] },
  }),
};

function Check({ color = "#00CC7A" }: { color?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0 mt-0.5">
      <path d="M2.5 7l3 3 6-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function Cross() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0 mt-0.5 opacity-30">
      <path d="M4 4l6 6M10 4l-6 6" stroke="#7AA88E" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

const PRO_PRICE = 997;
const MAX_PRICE = 1449;
const PRO_MONTH1 = Math.round(PRO_PRICE * 0.65);   // 648
const MAX_MONTH1 = Math.round(MAX_PRICE * 0.50);    // 724 (arredondado de 724.5)
const DELTA = MAX_MONTH1 - PRO_MONTH1;              // 76

const START_FEATURES: { text: string; included: boolean; note?: string; bold?: boolean }[] = [
  { text: "Amanda AI — atendimento WhatsApp 24/7", included: true },
  { text: "Formulário de qualificação personalizado", included: true },
  { text: "Consulta CPF automática (Datacorp)", included: true, note: "R$1,99/consulta" },
  { text: "Aprovação / reprovação automática de lead", included: true },
  { text: "Contrato digital com assinatura eletrônica", included: true },
  { text: "Agendamento automático (Google Calendar)", included: true },
  { text: "Gravação e transcrição de reuniões (Gemini)", included: true },
  { text: "Gestão de maletas com rastreio integrado", included: true, note: "você monta, a Amanda notifica e rastreia" },
  { text: "Anti-churn D+3 pós-entrega automático", included: true },
  { text: "CRM + Workspace colaborativo", included: true },
  { text: "Ranking, gamificação e sistema de indicação", included: true, note: "pagamento de bônus manual no Start" },
  { text: "Publicação automática em 6 redes sociais", included: true },
  { text: "Pix automático · NF-e · Inadimplência D+5/10/15", included: false },
];

const PRO_FEATURES: { text: string; included: boolean; note?: string; bold?: boolean }[] = [
  { text: "Tudo do Start, mais:", included: true, bold: true },
  { text: "Pix automático de cobrança (Efi Bank)", included: true, note: "R$3,00/transação" },
  { text: "Análise de comprovante por visão computacional", included: true },
  { text: "Acerto parcial automático", included: true },
  { text: "Follow-up inadimplência D+5 / D+10 / D+15", included: true },
  { text: "Maleta 100% automatizada (confirmação via Pix)", included: true },
  { text: "Anti-churn completo D+3 / D+10 / D+20", included: true },
  { text: "RMA com análise de foto de defeito por IA", included: true },
  { text: "NF-e automática via Bling", included: true },
  { text: "Melhor Envio com fila de expedição automática", included: true },
  { text: "Bônus de indicação pagos automaticamente via Pix", included: true },
  { text: "Negativação Serasa D+17 · Plano de ação IA", included: false },
];

const MAX_FEATURES: { text: string; included: boolean; note?: string; bold?: boolean }[] = [
  { text: "Tudo do Pro, mais:", included: true, bold: true },
  { text: "Negativação Serasa D+17 automática", included: true, note: "R$25,00/ação" },
  { text: "Plano de ação IA individual por consultora", included: true, note: "R$5,00/geração" },
  { text: "Reset automático de soft allocation (cron diário)", included: true },
  { text: "Suporte via canal dedicado (resposta prioritária)", included: true },
  { text: "Acesso prioritário a novas funcionalidades", included: true },
  { text: "Ilimitado em leads, revendedoras e admins", included: true },
];

const PLANS = [
  {
    id: "start",
    name: "Nexus Start",
    price: 649,
    month1: 649,
    discount: null,
    label: "Para quem está estruturando o processo de prospecção",
    limit: "Até 30 candidatas/mês · Até 40 revendedoras ativas",
    features: START_FEATURES,
    badge: null,
    badgeColor: "#7AA88E",
    accentColor: "#7AA88E",
    cta: "Começar com o Start",
    ctaStyle: "plain",
    highlight: null,
  },
  {
    id: "pro",
    name: "Nexus Pro",
    price: PRO_PRICE,
    month1: PRO_MONTH1,
    discount: 35,
    label: "Para empresas com revendedoras ativas que precisam de operação 100% automática",
    limit: "Até 70 candidatas/mês · Revendedoras ilimitadas",
    features: PRO_FEATURES,
    badge: "⭐ Mais Escolhido",
    badgeColor: "#FF5A1F",
    accentColor: "#FF5A1F",
    cta: `Escolher o Pro — R$${PRO_MONTH1} no 1º mês`,
    ctaStyle: "orange",
    highlight: `R$${PRO_MONTH1} no 1º mês (35% off)`,
  },
  {
    id: "max",
    name: "Nexus Max",
    price: MAX_PRICE,
    month1: MAX_MONTH1,
    discount: 50,
    label: "Para empresas que não podem perder um repasse sequer",
    limit: "Ilimitado em tudo",
    features: MAX_FEATURES,
    badge: "🏆 Melhor Custo-Benefício",
    badgeColor: "#00CC7A",
    accentColor: "#00CC7A",
    cta: `Ir para o Max — R$${MAX_MONTH1} no 1º mês`,
    ctaStyle: "green",
    highlight: `Só R$${DELTA} a mais que o Pro no 1º mês`,
  },
];

export default function PricingSection() {
  const [, setLocation] = useLocation();

  return (
    <section id="pricing" className="relative bg-[#060F0A] px-6 py-24 border-t border-[#1E3828] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(0,204,122,0.06) 0%, transparent 60%)"
      }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-6">
          <motion.p custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-[#FF5A1F] text-xs font-semibold tracking-[0.15em] uppercase mb-4">
            Planos e Preços
          </motion.p>
          <motion.h2 custom={0.08} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="font-syne font-bold text-3xl md:text-4xl text-white leading-snug tracking-tight mb-3">
            Sem taxa de setup. Sem fidelidade.{" "}
            <span className="text-[#FF5A1F] drop-shadow-[0_0_20px_rgba(255,90,31,0.3)]">Cancele quando quiser.</span>
          </motion.h2>
          <motion.p custom={0.12} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-[#7AA88E] text-base max-w-lg mx-auto leading-relaxed">
            Primeiro mês com desconto especial. Mensalidade no dia 1, uso avulso no dia 5.
          </motion.p>
        </div>

        {/* Urgency strip */}
        <motion.div custom={0.15} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-[#FF5A1F]/10 border border-[#FF5A1F]/25 rounded-xl px-5 py-3 text-center mb-10">
          <span className="text-[#FF5A1F] text-sm font-bold">⚡ Pro: 35% OFF · Max: 50% OFF · Válido para novas assinaturas</span>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {PLANS.map((plan, idx) => (
            <motion.div
              key={plan.id}
              custom={idx * 0.08 + 0.18}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp}
              className={`relative rounded-2xl border-2 flex flex-col ${
                plan.id === "max"
                  ? "border-[#00CC7A]/50 bg-gradient-to-b from-[#0A1A10] to-[#0C1A12] shadow-[0_0_50px_rgba(0,204,122,0.09)]"
                  : plan.id === "pro"
                  ? "border-[#FF5A1F]/45 bg-[#0C1A12] shadow-[0_0_40px_rgba(255,90,31,0.08)]"
                  : "border-[#1E3828] bg-[#0C1A12] opacity-85"
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div
                  className="py-1.5 text-center text-[11px] font-extrabold tracking-wider uppercase"
                  style={{ background: plan.badgeColor, color: plan.id === "max" ? "#001A0E" : "#1A0500" }}
                >
                  {plan.badge}
                </div>
              )}

              {/* Discount tag */}
              {plan.discount && (
                <div className="absolute top-12 right-4 z-10">
                  <div className="text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-lg" style={{ background: plan.accentColor, color: plan.id === "max" ? "#001A0E" : "#1A0500" }}>
                    {plan.discount}% OFF 1º mês
                  </div>
                </div>
              )}

              <div className="p-7 flex-1">
                <div className="text-xs font-bold tracking-[0.15em] uppercase mb-3" style={{ color: plan.accentColor }}>
                  {plan.name}
                </div>

                {/* Price */}
                {plan.discount ? (
                  <div className="mb-2">
                    <div className="flex items-end gap-1.5 mb-0.5">
                      <span className="font-syne font-extrabold text-5xl text-white">R${plan.month1}</span>
                      <span className="text-[#7AA88E] text-sm mb-1.5">/1º mês</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#4A6A58] text-sm line-through">R${plan.price}/mês</span>
                      <span className="text-xs font-bold" style={{ color: plan.accentColor }}>depois R${plan.price.toLocaleString("pt-BR")}/mês</span>
                    </div>
                  </div>
                ) : (
                  <div className="mb-2 flex items-end gap-1">
                    <span className="font-syne font-extrabold text-4xl text-white">R${plan.price}</span>
                    <span className="text-[#7AA88E] text-sm mb-1">/mês</span>
                  </div>
                )}

                {/* Hook for Max */}
                {plan.id === "max" && (
                  <div className="bg-[#00CC7A]/10 border border-[#00CC7A]/25 rounded-xl px-3 py-2 mb-3">
                    <p className="text-[#00CC7A] text-[11px] font-bold leading-snug">Só R${DELTA} a mais que o Pro no 1º mês — em troca: Serasa D+17 automático + plano de ação IA por consultora.</p>
                  </div>
                )}

                <p className="text-[#7AA88E] text-xs mb-2 leading-relaxed">{plan.label}</p>
                <div className="text-[10px] font-semibold px-2.5 py-1 rounded-full inline-block mb-5" style={{ background: plan.accentColor + "18", color: plan.accentColor }}>
                  {plan.limit}
                </div>

                <ul className="space-y-2">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      {f.included ? <Check color={plan.id === "pro" ? "#FF5A1F" : plan.id === "max" ? "#00CC7A" : "#7AA88E"} /> : <Cross />}
                      <span className={`text-[13px] leading-snug ${f.included ? (f.bold ? "text-white font-semibold" : "text-[#C4DDD0]") : "text-[#4A6A58]"}`}>
                        {f.text}
                        {f.note && <span className="block text-[10px] mt-0.5" style={{ color: plan.accentColor + "cc" }}>{f.note}</span>}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="px-7 pb-7 space-y-2">
                <button
                  onClick={() => setLocation(`/checkout?plan=${plan.id}`)}
                  className={`w-full py-4 rounded-xl font-extrabold text-[15px] tracking-wide transition-all hover:-translate-y-0.5 ${
                    plan.id === "max"
                      ? "bg-gradient-to-r from-[#00CC7A] to-[#00AA62] text-[#001A0E] hover:shadow-[0_0_30px_rgba(0,204,122,0.4)]"
                      : plan.id === "pro"
                      ? "bg-[#FF5A1F] text-[#1A0500] hover:shadow-[0_0_28px_rgba(255,90,31,0.45)]"
                      : "bg-[#1E3828] text-[#C4DDD0] hover:bg-[#2A4A38] hover:text-white"
                  }`}
                >
                  {plan.cta}
                </button>
                {plan.discount && (
                  <p className="text-[#4A6A58] text-[10px] text-center">Depois R${plan.price.toLocaleString("pt-BR")}/mês · Cancele quando quiser</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pay-per-use table */}
        <motion.div custom={0.42} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mt-8 bg-[#0C1A12] border border-[#1E3828] rounded-2xl p-6">
          <p className="text-[#7AA88E] text-xs font-semibold uppercase tracking-wider mb-4">Serviços cobrados por uso — fatura separada no dia 5 de cada mês</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { service: "Consulta de CPF", price: "R$1,99/consulta", plans: "Todos os planos" },
              { service: "Pix automático", price: "R$3,00/transação", plans: "Pro e Max" },
              { service: "Negativação Serasa", price: "R$25,00/ação", plans: "Apenas Max" },
              { service: "Plano de ação IA", price: "R$5,00/geração", plans: "Apenas Max" },
            ].map((item, i) => (
              <div key={i} className="bg-[#060F0A] border border-[#1E3828] rounded-xl p-4">
                <div className="text-white text-sm font-semibold mb-0.5">{item.service}</div>
                <div className="text-[#FF5A1F] text-xs font-bold mb-1">{item.price}</div>
                <div className="text-[#4A6A58] text-[10px]">{item.plans}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Compare link */}
        <motion.div custom={0.48} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mt-5 text-center">
          <a href="/comparacao" className="text-[#7AA88E] text-sm hover:text-white transition-colors underline underline-offset-4">
            Ver comparação completa: Nexus vs. ferramentas separadas →
          </a>
        </motion.div>

        <motion.div custom={0.5} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mt-4 grid grid-cols-3 gap-px bg-[#1E3828] border border-[#1E3828] rounded-xl overflow-hidden text-center">
          {[
            "Setup completo em até 7 dias úteis",
            "Um cartão cobre tudo — mensalidade + uso",
            "Cancele quando quiser, sem multa",
          ].map((item, i) => (
            <div key={i} className="bg-[#060F0A] px-4 py-4 text-[#7AA88E] text-xs leading-snug">{item}</div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
