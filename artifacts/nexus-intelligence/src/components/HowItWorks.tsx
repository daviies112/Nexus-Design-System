import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const STEPS = [
  {
    num: "01",
    title: "Conecte em 5 minutos",
    desc: "Seu WhatsApp Business e CNPJ. Nossa equipe configura tudo remotamente em até 24 horas.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M12 2C7.03 2 3 6.03 3 11c0 1.74.49 3.36 1.33 4.74L3 21l5.4-1.3A9 9 0 1012 2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
        <path d="M9 11c0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    color: "#00CC7A",
    accent: "from-[#00CC7A]/15 to-transparent",
  },
  {
    num: "02",
    title: "Amanda aprende seu negócio",
    desc: "Sua régua de cobrança, tabela de preços, rede de revendedoras e regras fiscais. Zero planilhas.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M12 3C7 3 3 7 3 12s4 9 9 9 9-4 9-9-4-9-9-9z" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M8 12s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
    color: "#FF5A1F",
    accent: "from-[#FF5A1F]/12 to-transparent",
  },
  {
    num: "03",
    title: "Piloto automático ativado",
    desc: "Cobranças, NF-e e relatórios rodam sozinhos. Você só acompanha o crescimento.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M12 2l2 5h5l-4 3 1.5 5L12 13l-4.5 2 1.5-5-4-3h5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
        <path d="M12 22v-4M8 19l2-3M16 19l-2-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    color: "#00CC7A",
    accent: "from-[#00CC7A]/15 to-transparent",
  },
];

function Step({ step, index, isLast }: { step: typeof STEPS[0]; index: number; isLast: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="relative flex flex-col items-center text-center">
      {/* Connecting line (desktop) */}
      {!isLast && (
        <div className="absolute top-10 left-[calc(50%+3rem)] right-[calc(-50%+3rem)] h-px hidden lg:block overflow-hidden">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
            style={{ originX: 0 }}
            className="h-full bg-gradient-to-r from-[#1E3828] via-[#2A4A38] to-[#1E3828]"
          />
          {/* Animated dot traveling the line */}
          <motion.div
            initial={{ left: "0%" }}
            animate={inView ? { left: "100%" } : {}}
            transition={{ duration: 1.2, delay: 0.6, ease: "easeInOut" }}
            className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#00CC7A] shadow-[0_0_8px_rgba(0,204,122,0.8)]"
          />
        </div>
      )}

      {/* Number badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.15, type: "spring", stiffness: 300 }}
        className="relative z-10 mb-6"
      >
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center relative"
          style={{
            background: `linear-gradient(135deg, ${step.color}14 0%, transparent 100%)`,
            border: `1px solid ${step.color}30`,
            boxShadow: `0 0 32px ${step.color}12`,
          }}
        >
          <div style={{ color: step.color }}>{step.icon}</div>
          {/* Step number badge */}
          <div
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-extrabold font-syne"
            style={{ background: step.color, color: "#060F0A" }}
          >
            {index + 1}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.15 + 0.15 }}
        className="max-w-xs"
      >
        <div
          className="text-[10px] font-extrabold tracking-[0.2em] uppercase mb-3"
          style={{ color: step.color }}
        >
          Passo {step.num}
        </div>
        <h3 className="font-syne font-bold text-[18px] text-white mb-3 leading-snug tracking-tight">
          {step.title}
        </h3>
        <p className="text-[#7AA88E] text-sm leading-relaxed">{step.desc}</p>
      </motion.div>
    </div>
  );
}

export default function HowItWorks() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });

  return (
    <section id="como-funciona" className="relative bg-[#060F0A] px-6 py-24 border-t border-[#1E3828] overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(0,204,122,0.05) 0%, transparent 70%)"
      }} />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[#FF5A1F] text-xs font-semibold tracking-[0.15em] uppercase mb-4"
          >
            Como funciona
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={titleInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-syne font-bold text-3xl md:text-4xl text-white leading-snug tracking-tight"
          >
            Três passos para{" "}
            <span className="text-[#FF5A1F] drop-shadow-[0_0_20px_rgba(255,90,31,0.3)]">automatizar tudo</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#7AA88E] text-base mt-4 max-w-md mx-auto"
          >
            Do zero ao piloto automático em menos de 24 horas
          </motion.p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-6">
          {STEPS.map((step, i) => (
            <Step key={i} step={step} index={i} isLast={i === STEPS.length - 1} />
          ))}
        </div>

        {/* CTA below */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <div className="flex items-center gap-3 text-[#4A6A58] text-sm">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7l3.5 3.5L12 3.5" stroke="#00CC7A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Setup em 24h após a assinatura
          </div>
          <span className="hidden sm:block text-[#1E3828]">·</span>
          <div className="flex items-center gap-3 text-[#4A6A58] text-sm">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7l3.5 3.5L12 3.5" stroke="#00CC7A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Equipe de suporte via WhatsApp
          </div>
          <span className="hidden sm:block text-[#1E3828]">·</span>
          <div className="flex items-center gap-3 text-[#4A6A58] text-sm">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7l3.5 3.5L12 3.5" stroke="#00CC7A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            7 dias grátis para testar
          </div>
        </motion.div>
      </div>
    </section>
  );
}
