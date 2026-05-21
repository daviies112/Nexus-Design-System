import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    q: "Preciso saber programar ou ter conhecimento técnico?",
    a: "Não. O setup é 100% assistido pela nossa equipe em até 24 horas após a assinatura. Você só precisa compartilhar suas credenciais de WhatsApp Business e a prefeitura para NF-e — a equipe cuida de todo o resto.",
  },
  {
    q: "O WhatsApp Business pode ser bloqueado pelo Meta?",
    a: "Não. Usamos a API Oficial do WhatsApp Business, sendo parceiro Meta certificado. Suas mensagens trafegam pela infraestrutura do próprio Meta — com zero risco de bloqueio de número.",
  },
  {
    q: "E se eu quiser cancelar? Tem fidelidade ou multa?",
    a: "Sem contrato, sem fidelidade, sem multa. Cancele quando quiser direto pelo painel, em menos de 2 minutos. Sem burocracia e sem ligação de retenção. O acesso encerra no próximo ciclo.",
  },
  {
    q: "Funciona para qualquer tamanho de rede de revendedoras?",
    a: "Sim. O Nexus atende desde autônomas com 10 clientes até redes com mais de 500 revendedoras ativas. A plataforma escala automaticamente sem custo adicional.",
  },
  {
    q: "Os dados das minhas clientes ficam seguros?",
    a: "Sim. Todos os dados são criptografados (AES-256), com backups diários automáticos e infraestrutura hospedada no Brasil em conformidade total com a LGPD. Você pode exportar seus dados a qualquer momento.",
  },
  {
    q: "Quanto tempo leva para ver resultado financeiro?",
    a: "A maioria das clientes recupera o investimento na primeira semana — só com cobranças que antes seriam esquecidas. O setup em 24h garante que você começa a automatizar desde o primeiro dia.",
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
        <span
          className={`text-[15px] font-medium leading-snug transition-colors duration-200 ${
            open ? "text-white" : "text-[#C4DDD0] group-hover:text-white"
          }`}
        >
          {q}
        </span>
        <span
          className={`flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${
            open
              ? "border-[#FF5A1F] bg-[#FF5A1F]/10 rotate-45"
              : "border-[#1E3828] group-hover:border-[#7AA88E]"
          }`}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M6 2v8M2 6h8"
              stroke={open ? "#FF5A1F" : "#7AA88E"}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
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
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 0%, rgba(0,204,122,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.p
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-[#FF5A1F] text-xs font-semibold tracking-[0.15em] uppercase mb-4"
        >
          Perguntas Frequentes
        </motion.p>
        <motion.h2
          custom={0.08}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="font-syne font-bold text-3xl md:text-4xl text-white leading-snug tracking-tight mb-12"
        >
          Todas as suas dúvidas,{" "}
          <span className="text-[#FF5A1F] drop-shadow-[0_0_20px_rgba(255,90,31,0.3)]">
            respondidas.
          </span>
        </motion.h2>

        <div className="rounded-2xl border border-[#1E3828] bg-[#0C1A12] px-6 md:px-8">
          {FAQS.map((f, i) => (
            <FAQItem key={i} q={f.q} a={f.a} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
