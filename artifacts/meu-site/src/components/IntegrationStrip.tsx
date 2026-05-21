import { motion } from "framer-motion";

const INTEGRATIONS = [
  {
    label: "WhatsApp Business API",
    sublabel: "API Oficial",
    color: "#25D366",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    label: "Meta Business",
    sublabel: "Partner Oficial",
    color: "#1877F2",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15H9V9h2v8zm4 0h-2V9h2v8zm-5-9V6h2v2h-2zm4 0V6h2v2h-2z"/>
      </svg>
    ),
  },
  {
    label: "NF-e / SEFAZ",
    sublabel: "Integração fiscal",
    color: "#7AA88E",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "PIX",
    sublabel: "Banco Central",
    color: "#32BCAD",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor">
        <path d="M9.5 4.5L14.5 9.5M14.5 9.5L19.5 4.5M14.5 9.5L14.5 14.5M14.5 14.5L9.5 19.5M14.5 14.5L19.5 19.5M4.5 9.5L9.5 4.5M4.5 14.5L9.5 19.5M4.5 9.5L9.5 14.5M9.5 14.5L4.5 19.5M9.5 9.5L9.5 14.5M9.5 9.5L14.5 9.5M9.5 14.5L14.5 14.5" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: "LGPD",
    sublabel: "Conformidade total",
    color: "#FF5A1F",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor">
        <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6L12 2z" strokeWidth="1.7" strokeLinejoin="round"/>
        <path d="M9 12l2 2 4-4" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "SSL/TLS 256-bit",
    sublabel: "Dados seguros",
    color: "#00CC7A",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor">
        <rect x="5" y="11" width="14" height="10" rx="2" strokeWidth="1.7"/>
        <path d="M8 11V7a4 4 0 018 0v4" strokeWidth="1.7" strokeLinecap="round"/>
        <circle cx="12" cy="16" r="1.5" fill="currentColor"/>
      </svg>
    ),
  },
];

export default function IntegrationStrip() {
  return (
    <section className="relative bg-[#060F0A] px-6 py-12 border-b border-[#1E3828] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(180deg, rgba(0,204,122,0.03) 0%, transparent 100%)"
      }} />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-[#4A6A58] text-xs uppercase tracking-[0.18em] font-medium mb-8"
        >
          Integrações e certificações oficiais
        </motion.p>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {INTEGRATIONS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ scale: 1.04, y: -3 }}
              className="flex flex-col items-center gap-2.5 bg-[#0C1A12] border border-[#1E3828] rounded-xl p-4 cursor-default group transition-colors hover:border-[#2A4A38]"
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                style={{ color: item.color, background: `${item.color}12` }}
              >
                {item.icon}
              </div>
              <div className="text-center">
                <div className="text-[#C4DDD0] text-[10px] font-semibold leading-tight">{item.label}</div>
                <div className="text-[#4A6A58] text-[9px] mt-0.5">{item.sublabel}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
