import { motion } from "framer-motion";

const BADGES = [
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" stroke="currentColor">
        <rect x="3" y="4" width="14" height="14" rx="2" strokeWidth="1.5"/>
        <path d="M7 2v4M13 2v4M3 9h14" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7 13l2 2 4-4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: "7 dias grátis",
    sub: "sem compromisso",
    color: "#00CC7A",
  },
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" stroke="currentColor">
        <rect x="3" y="8" width="14" height="10" rx="2" strokeWidth="1.5"/>
        <path d="M7 8V6a3 3 0 016 0v2" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M10 12v2" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
    label: "Sem cartão",
    sub: "no cadastro grátis",
    color: "#FF5A1F",
  },
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" stroke="currentColor">
        <path d="M10 2C6 2 3 5 3 9c0 1.4.4 2.7 1 3.8L3 17l4.3-1C8.4 16.6 9.2 17 10 17c4 0 7-3 7-7s-3-7-7-7z" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M8 10s.9 1.2 2 1.2 2-1.2 2-1.2" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
    label: "API Oficial WhatsApp",
    sub: "Meta Business Partner",
    color: "#25D366",
  },
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" stroke="currentColor">
        <path d="M10 2L3 5v5c0 4.5 3 8.5 7 9.5 4-1 7-5 7-9.5V5L10 2z" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M7.5 10l2 2 3.5-3.5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: "LGPD Compliance",
    sub: "dados no Brasil",
    color: "#7AA88E",
  },
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" stroke="currentColor">
        <circle cx="10" cy="10" r="7" strokeWidth="1.5"/>
        <path d="M10 6v4.5l2.5 1.5" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    label: "99,9% uptime",
    sub: "SLA garantido",
    color: "#00CC7A",
  },
];

export default function TrustBadges() {
  return (
    <section className="relative bg-[#060F0A] px-6 py-14 border-t border-[#1E3828] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(0,204,122,0.04) 0%, transparent 70%)"
      }} />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-[#4A6A58] text-xs uppercase tracking-[0.18em] font-medium mb-8"
        >
          Segurança e confiança
        </motion.p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {BADGES.map((badge, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ scale: 1.04, y: -2 }}
              className="inline-flex items-center gap-3 bg-[#0C1A12] border border-[#1E3828] hover:border-[#2A4A38] transition-colors rounded-xl px-5 py-3.5 cursor-default group"
            >
              <div
                className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                style={{ color: badge.color }}
              >
                {badge.icon}
              </div>
              <div>
                <div className="text-[#C4DDD0] text-[13px] font-semibold leading-none mb-1">{badge.label}</div>
                <div className="text-[#4A6A58] text-[11px]">{badge.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
