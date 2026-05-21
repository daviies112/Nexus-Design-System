import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    q: "Preciso de conhecimento técnico para usar a plataforma?",
    a: "Não. O onboarding é 100% assistido pela nossa equipe em até 7 dias úteis após a assinatura. Você compartilha suas credenciais de WhatsApp Business, Google Calendar e as integrações do seu plano — a equipe configura tudo remotamente e testa cada fluxo antes de entregar.",
  },
  {
    q: "O WhatsApp da minha empresa pode ser bloqueado?",
    a: "Não. Usamos a API Oficial do WhatsApp Business (Evolution API). Suas mensagens trafegam pela infraestrutura do próprio Meta — com zero risco de bloqueio. Cada cliente tem sua própria instância exclusiva, configurada e testada no onboarding.",
  },
  {
    q: "Tem contrato de fidelidade ou multa por cancelamento?",
    a: "Não. Cancele quando quiser direto pelo painel, em menos de 2 minutos. Sem burocracia, sem ligação de retenção, sem multa. O acesso encerra no próximo ciclo de cobrança. O uso avulso acumulado no mês corrente ainda aparece na fatura do dia 5 do mês seguinte.",
  },
  {
    q: "Qual a diferença entre os planos Start, Pro e Max?",
    a: "Start (R$649/mês): automatiza prospecção, qualificação e assinatura de contrato — até 30 leads/mês e 40 revendedoras ativas. Pro (R$997/mês): adiciona toda a automação financeira (Pix automático, inadimplência D+5/D+10/D+15, NF-e via Bling) e logística (maleta automatizada, anti-churn D+3/D+10/D+20, RMA com IA) — revendedoras ilimitadas. Max (R$1.449/mês): inclui negativação Serasa D+17 e plano de ação IA por consultora — ilimitado em tudo.",
  },
  {
    q: "O que é cobrado por uso e como funciona o pagamento?",
    a: "Você cadastra um único cartão de crédito. No dia 1 de cada mês é cobrada a mensalidade do plano. No dia 5 é cobrado o uso avulso acumulado: consulta de CPF (R$1,99 — todos os planos), Pix automático (R$3,00 — Pro/Max), negativação Serasa (R$25,00 — Max) e plano de ação IA (R$5,00 — Max). Os dois eventos são intencionalmente separados para não se afetar.",
  },
  {
    q: "Funciona para qualquer tamanho de rede de revendedoras?",
    a: "Start suporta até 40 revendedoras ativas e 30 leads por mês — ideal para quem está estruturando o processo. Pro e Max são ilimitados em revendedoras ativas. A plataforma é multi-tenant e escala automaticamente sem custo adicional por revendedora.",
  },
  {
    q: "Quanto tempo leva para ver resultado financeiro?",
    a: "A maioria dos clientes recupera o investimento no primeiro mês — só com cobranças de inadimplência que antes eram esquecidas ou feitas manualmente. Quem migra de ferramentas separadas (sistema de gestão + app de vendas + sistema de automação IA) economiza em média R$4.000/mês ao consolidar tudo na Nexus.",
  },
  {
    q: "Os dados das minhas revendedoras ficam seguros?",
    a: "Sim. Cada cliente tem seu próprio schema exclusivo no PostgreSQL (multi-tenant isolado) e namespace exclusivo no Redis. Todos os dados são criptografados com AES-256, com backups diários automáticos e infraestrutura em conformidade total com a LGPD. Você pode exportar seus dados a qualquer momento.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: (d = 0) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.75, delay: d, ease: [0.16, 1, 0.3, 1] },
  }),
};

function FAQItem({ q, a, idx }: { q: string; a: string; idx: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      custom={idx * 0.06}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      className="border-b border-[#1E3828] last:border-b-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-5 text-left gap-4 group"
        aria-expanded={open}
      >
        <span className={`text-[15px] font-medium leading-snug transition-colors duration-200 ${open ? "text-white" : "text-[#C4DDD0] group-hover:text-white"}`}>
          {q}
        </span>
        <span className={`flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${open ? "border-[#FF5A1F] bg-[#FF5A1F]/10 rotate-45" : "border-[#1E3828] group-hover:border-[#7AA88E]"}`}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 2v8M2 6h8" stroke={open ? "#FF5A1F" : "#7AA88E"} strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="text-[#7AA88E] text-sm leading-relaxed pb-5 max-w-2xl">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  return (
    <section className="relative bg-[#060F0A] px-6 py-24 border-t border-[#1E3828] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 40% at 50% 0%, rgba(0,204,122,0.05) 0%, transparent 60%)" }} />
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.p custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-[#FF5A1F] text-xs font-semibold tracking-[0.15em] uppercase mb-4">
          Perguntas Frequentes
        </motion.p>
        <motion.h2 custom={0.08} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="font-syne font-bold text-3xl md:text-4xl text-white leading-snug tracking-tight mb-12">
          Todas as suas dúvidas,{" "}
          <span className="text-[#FF5A1F] drop-shadow-[0_0_20px_rgba(255,90,31,0.3)]">respondidas.</span>
        </motion.h2>
        <div className="rounded-2xl border border-[#1E3828] bg-[#0C1A12] px-6 md:px-8">
          {FAQS.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} idx={i} />)}
        </div>
      </div>
    </section>
  );
}
