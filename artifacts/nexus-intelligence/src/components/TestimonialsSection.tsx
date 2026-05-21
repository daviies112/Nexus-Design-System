import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    name: "Camila R.",
    city: "São Paulo, SP",
    initials: "CR",
    color: "#FF5A1F",
    text: "Antes eu passava 3h por dia cobrando minhas revendedoras. Agora a Amanda cuida de tudo e eu foco no crescimento da rede. Valia cada centavo do Pro.",
  },
  {
    name: "Patrícia M.",
    city: "Belo Horizonte, MG",
    initials: "PM",
    color: "#00CC7A",
    text: "Setup feito em 6 dias. A emissão de NF-e automática me salvou de uma multa que seria três vezes o valor do plano. Melhor investimento que já fiz.",
  },
  {
    name: "Fernanda L.",
    city: "Curitiba, PR",
    initials: "FL",
    color: "#FF5A1F",
    text: "Pagava R$4.800/mês em ferramentas separadas. Hoje pago R$997 e tenho mais funcionalidade. Impossível voltar para o jeito antigo.",
  },
  {
    name: "Juliana S.",
    city: "Rio de Janeiro, RJ",
    initials: "JS",
    color: "#00CC7A",
    text: "80 revendedoras gerenciadas automaticamente. As comissões são calculadas e os repasses cobrados sem eu abrir uma planilha sequer.",
  },
  {
    name: "Aline C.",
    city: "Fortaleza, CE",
    initials: "AC",
    color: "#FF5A1F",
    text: "O contrato digital com assinatura eletrônica foi um divisor de águas. Antes levava 3 dias para formalizar uma nova revendedora. Agora é automático.",
  },
  {
    name: "Mariana T.",
    city: "Recife, PE",
    initials: "MT",
    color: "#00CC7A",
    text: "97% das cobranças resolvidas sem eu precisar ligar. Recuperei meu fim de semana e minha saúde mental. A régua D+5/D+10/D+15 é genial.",
  },
  {
    name: "Renata F.",
    city: "Porto Alegre, RS",
    initials: "RF",
    color: "#FF5A1F",
    text: "Tentei três sistemas antes. Nenhum entendia semijoias. A Nexus foi criada para o nosso mercado — é completamente diferente.",
  },
  {
    name: "Luciana B.",
    city: "Goiânia, GO",
    initials: "LB",
    color: "#00CC7A",
    text: "Em 2 meses recuperei R$4.200 em cobranças que eu teria esquecido. Pagou o plano por mais de 4 meses. A Amanda não esquece nada.",
  },
];

const ROW1 = [...TESTIMONIALS, ...TESTIMONIALS];
const ROW2 = [
  ...TESTIMONIALS.slice(4), ...TESTIMONIALS.slice(0, 4),
  ...TESTIMONIALS.slice(4), ...TESTIMONIALS.slice(0, 4),
];

function Stars() {
  return (
    <div className="flex gap-0.5 mb-3">
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="13" height="13" viewBox="0 0 14 14" fill="#FF5A1F">
          <path d="M7 1l1.5 4.5H13L9.5 8l1.5 4.5L7 10l-3.5 2.5L5 8 1.5 5.5H7L7 1z"/>
        </svg>
      ))}
    </div>
  );
}

function Card({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <div className="flex-shrink-0 w-[288px] bg-[#0C1A12] border border-[#1E3828] rounded-2xl p-6 mx-3 hover:border-[#2A4A38] transition-colors duration-300">
      <Stars />
      <p className="text-[#C4DDD0] text-[13px] leading-relaxed mb-5">"{t.text}"</p>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
          style={{ background: `${t.color}33`, border: `1px solid ${t.color}44`, color: t.color }}>
          {t.initials}
        </div>
        <div>
          <div className="text-white text-sm font-semibold leading-tight">{t.name}</div>
          <div className="text-[#4A6A58] text-xs">{t.city}</div>
        </div>
      </div>
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: (d = 0) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.75, delay: d, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function TestimonialsSection() {
  return (
    <section className="relative bg-[#060F0A] py-24 border-t border-[#1E3828] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,204,122,0.04) 0%, transparent 70%)" }} />

      <div className="max-w-6xl mx-auto px-6 mb-14 relative z-10">
        <motion.p custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-[#FF5A1F] text-xs font-semibold tracking-[0.15em] uppercase mb-4">
          O Que Elas Dizem
        </motion.p>
        <motion.h2 custom={0.08} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="font-syne font-bold text-3xl md:text-4xl text-white leading-snug tracking-tight">
          Empresas de semijoias que{" "}
          <span className="text-[#00CC7A] drop-shadow-[0_0_20px_rgba(0,204,122,0.3)]">já operam no piloto automático.</span>
        </motion.h2>
      </div>

      <div className="relative mb-4 overflow-hidden" style={{ maskImage: "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)", WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)" }}>
        <div className="flex animate-marquee" style={{ width: "max-content" }}>
          {ROW1.map((t, i) => <Card key={i} t={t} />)}
        </div>
      </div>

      <div className="relative overflow-hidden" style={{ maskImage: "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)", WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)" }}>
        <div className="flex animate-marquee-reverse" style={{ width: "max-content" }}>
          {ROW2.map((t, i) => <Card key={i} t={t} />)}
        </div>
      </div>
    </section>
  );
}
