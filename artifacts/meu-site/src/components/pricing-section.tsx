import { motion } from "framer-motion";
import { useLocation } from "wouter";

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: (d = 0) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.75, delay: d, ease: [0.16, 1, 0.3, 1] },
  }),
};

function Check({ orange = false }: { orange?: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0 mt-0.5">
      <path d="M2.5 7l3 3 6-6" stroke={orange ? "#FF5A1F" : "#00CC7A"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function Cross() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0 mt-0.5 opacity-40">
      <path d="M4 4l6 6M10 4l-6 6" stroke="#7AA88E" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

const START_FEATURES: { text: string; included: boolean; bold?: boolean }[] = [
  { text: "Amanda AI — atendimento WhatsApp 24/7", included: true },
  { text: "Formulário de qualificação personalizado", included: true },
  { text: "Consulta CPF automática (Datacorp) — R$1,99/consulta", included: true },
  { text: "Aprovação e reprovação automática", included: true },
  { text: "Contrato digital com assinatura eletrônica", included: true },
  { text: "Agendamento automático (Google Calendar)", included: true },
  { text: "Gravação e transcrição de reuniões", included: true },
  { text: "Gestão de maletas com rastreio integrado", included: true },
  { text: "CRM completo + Workspace colaborativo", included: true },
  { text: "Ranking, gamificação e sistema de indicação", included: true },
  { text: "Publicação automática em 6 redes sociais", included: true },
  { text: "Pix automático de cobrança de repasse", included: false },
  { text: "Follow-up de inadimplência D+5/D+10/D+15", included: false },
  { text: "NF-e automática via Bling", included: false },
];

const PRO_FEATURES: { text: string; included: boolean; bold?: boolean }[] = [
  { text: "Tudo do Start, mais:", included: true, bold: true },
  { text: "Pix automático (Efi Bank) — R$3,00/transação", included: true },
  { text: "Análise de comprovante por visão computacional", included: true },
  { text: "Acerto parcial automático", included: true },
  { text: "Follow-up de inadimplência D+5, D+10, D+15", included: true },
  { text: "Maleta 100% automatizada (confirmação via Pix)", included: true },
  { text: "Anti-churn completo D+3, D+10, D+20", included: true },
  { text: "RMA com análise de foto de defeito por IA", included: true },
  { text: "NF-e automática via Bling", included: true },
  { text: "Melhor Envio com fila de expedição automática", included: true },
  { text: "Negativação Serasa D+17", included: false },
  { text: "Plano de ação IA por consultora", included: false },
];

const MAX_FEATURES: { text: string; included: boolean; bold?: boolean }[] = [
  { text: "Tudo do Pro, mais:", included: true, bold: true },
  { text: "Negativação Serasa D+17 automática — R$25,00/ação", included: true },
  { text: "Plano de ação IA por consultora — R$5,00/geração", included: true },
  { text: "Reset automático de soft allocation (cron diário)", included: true },
  { text: "Suporte via canal dedicado", included: true },
  { text: "Acesso prioritário a novas funcionalidades", included: true },
  { text: "Ilimitado em leads, revendedoras e usuários admin", included: true },
];

const PLANS = [
  {
    id: "start",
    name: "Nexus Start",
    price: 649,
    label: "Para quem está estruturando o processo de prospecção",
    limit: "Até 30 leads/mês · Até 40 revendedoras ativas",
    features: START_FEATURES,
    popular: false,
    cta: "Começar com o Start",
    accentColor: "#00CC7A",
  },
  {
    id: "pro",
    name: "Nexus Pro",
    price: 997,
    label: "Para empresas com revendedoras ativas que precisam de operação 100% automática",
    limit: "Até 70 leads/mês · Revendedoras ilimitadas",
    features: PRO_FEATURES,
    popular: true,
    cta: "Escolher o Pro",
    accentColor: "#FF5A1F",
  },
  {
    id: "max",
    name: "Nexus Max",
    price: 1449,
    label: "Para empresas que não podem perder um repasse sequer",
    limit: "Ilimitado em tudo",
    features: MAX_FEATURES,
    popular: false,
    cta: "Ir para o Max",
    accentColor: "#00CC7A",
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
        <div className="text-center mb-14">
          <motion.p
            custom={0}
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp}
            className="text-[#FF5A1F] text-xs font-semibold tracking-[0.15em] uppercase mb-4"
          >
            Planos e Preços
          </motion.p>
          <motion.h2
            custom={0.08}
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp}
            className="font-syne font-bold text-3xl md:text-4xl text-white leading-snug tracking-tight mb-4"
          >
            Sem taxa de setup. Sem fidelidade.{" "}
            <span className="text-[#FF5A1F] drop-shadow-[0_0_20px_rgba(255,90,31,0.3)]">Cancele quando quiser.</span>
          </motion.h2>
          <motion.p
            custom={0.14}
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp}
            className="text-[#7AA88E] text-base max-w-xl mx-auto leading-relaxed"
          >
            Pagamento único no cartão. Mensalidade no dia 1, uso avulso no dia 5. Zero burocracia.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((plan, idx) => (
            <motion.div
              key={plan.id}
              custom={idx * 0.08}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp}
              className={`relative rounded-2xl border flex flex-col ${
                plan.popular
                  ? "border-[#FF5A1F]/50 bg-[#0C1A12] shadow-[0_0_40px_rgba(255,90,31,0.1)]"
                  : "border-[#1E3828] bg-[#0C1A12]"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-[#FF5A1F] text-[#1A0500] px-5 py-1.5 rounded-full text-[11px] font-extrabold tracking-wider uppercase whitespace-nowrap shadow-lg">
                    ⭐ Mais Escolhido
                  </span>
                </div>
              )}

              <div className="p-8 flex-1">
                <div
                  className="text-xs font-bold tracking-[0.15em] uppercase mb-3"
                  style={{ color: plan.accentColor }}
                >
                  {plan.name}
                </div>
                <div className="mb-2 flex items-end gap-1">
                  <span className="font-syne font-extrabold text-4xl text-white">R${plan.price.toLocaleString("pt-BR")}</span>
                  <span className="text-[#7AA88E] text-sm mb-1">/mês</span>
                </div>
                <p className="text-[#7AA88E] text-xs mb-3 leading-relaxed">{plan.label}</p>
                <div
                  className="text-[10px] font-semibold px-2.5 py-1 rounded-full inline-block mb-6"
                  style={{ background: plan.accentColor + "18", color: plan.accentColor }}
                >
                  {plan.limit}
                </div>

                <ul className="space-y-2.5">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      {f.included ? <Check orange={plan.popular} /> : <Cross />}
                      <span
                        className={`text-[13px] leading-snug ${
                          f.included
                            ? f.bold
                              ? "text-white font-semibold"
                              : "text-[#C4DDD0]"
                            : "text-[#4A6A58]"
                        }`}
                      >
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="px-8 pb-8">
                <button
                  onClick={() => setLocation(`/checkout?plan=${plan.id}`)}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all hover:-translate-y-0.5 ${
                    plan.popular
                      ? "bg-[#FF5A1F] text-[#1A0500] hover:shadow-[0_0_24px_rgba(255,90,31,0.5)]"
                      : "bg-[#1E3828] text-[#C4DDD0] hover:bg-[#2A4A38] hover:text-white"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          custom={0.28}
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={fadeUp}
          className="mt-8 bg-[#0C1A12] border border-[#1E3828] rounded-2xl p-6"
        >
          <p className="text-[#7AA88E] text-xs font-semibold uppercase tracking-wider mb-4">Serviços cobrados por uso — aparecem na fatura do dia 5</p>
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

        <motion.div
          custom={0.35}
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={fadeUp}
          className="mt-5 grid grid-cols-3 gap-px bg-[#1E3828] border border-[#1E3828] rounded-xl overflow-hidden text-center"
        >
          {[
            "Setup completo em até 7 dias úteis após assinatura",
            "Um cartão de crédito cobre tudo — mensalidade + uso avulso",
            "Cancele quando quiser, sem multa e sem ligação de retenção",
          ].map((item, i) => (
            <div key={i} className="bg-[#060F0A] px-4 py-4 text-[#7AA88E] text-xs leading-snug">
              {item}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
