import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "Como funciona o período de 7 dias grátis?",
    a: "Você acessa todos os 21 módulos completos por 7 dias sem cartão de crédito. Se gostar, basta assinar. Se não gostar, não cobra nada.",
    tag: "Planos"
  },
  {
    q: "Quanto tempo leva para configurar?",
    a: "Nossa equipe faz o setup assistido em até 24 horas após a assinatura. Você não precisa saber programar nada.",
    tag: "Setup"
  },
  {
    q: "Preciso de número de WhatsApp Business?",
    a: "Sim, você precisa de um número com WhatsApp Business. Podemos ajudar a configurar a API oficial durante o onboarding.",
    tag: "Setup"
  },
  {
    q: "A Amanda AI pode errar?",
    a: "A Amanda opera dentro de regras configuráveis por você. Para ações críticas, ela sempre aguarda confirmação antes de executar. Quando encontra algo fora da base de conhecimento, escala para um humano automaticamente.",
    tag: "Amanda AI"
  },
  {
    q: "Funciona para quantas revendedoras?",
    a: "Depende do plano. Start suporta até 40 revendedoras ativas. Pro e Max são ilimitados. Os planos custam R$649, R$997 e R$1.449/mês respectivamente.",
    tag: "Planos"
  },
  {
    q: "Posso cancelar a qualquer momento?",
    a: "Sim, sem multa e sem burocracia. O cancelamento é efetivado no final do período já pago. Nenhuma taxa de saída.",
    tag: "Planos"
  },
  {
    q: "Como é feita a emissão de notas fiscais?",
    a: "A Amanda emite NF-e e NFS-e automaticamente após cada venda confirmada, usando sua certificação digital. Você precisa ter um certificado digital A1 ou A3.",
    tag: "Fiscal"
  },
  {
    q: "Os dados das minhas revendedoras ficam seguros?",
    a: "Sim. Todos os dados são criptografados com AES-256 e armazenados em servidores no Brasil, em conformidade com a LGPD. Cada cliente tem um schema exclusivo no PostgreSQL.",
    tag: "Segurança"
  },
  {
    q: "Como funciona o Pix automático de cobrança?",
    a: "No dia configurado, a Amanda gera a cobrança Pix para cada revendedora com saldo pendente, envia o QR code via WhatsApp e monitora o pagamento. Ao confirmar, encerra o ciclo automaticamente. Custo: R$3,00/transação.",
    tag: "Financeiro"
  },
  {
    q: "O que acontece quando uma revendedora não paga?",
    a: "A régua de inadimplência é automática: D+5 primeira cobrança, D+10 aviso jurídico, D+15 bloqueio do sistema, D+17 negativação no Serasa (plano Max). Tudo via WhatsApp, sem intervenção humana.",
    tag: "Financeiro"
  },
];

const tagColors: Record<string, string> = {
  Planos: "#00CC7A",
  Setup: "#3B82F6",
  "Amanda AI": "#FF5A1F",
  Fiscal: "#F59E0B",
  Segurança: "#8B5CF6",
  Financeiro: "#EC4899",
};

const allTags = ["Todas", ...Array.from(new Set(faqs.map(f => f.tag)))];

export default function CentralAjuda() {
  const [open, setOpen] = useState<number | null>(null);
  const [activeTag, setActiveTag] = useState("Todas");

  const filtered = activeTag === "Todas" ? faqs : faqs.filter(f => f.tag === activeTag);

  return (
    <div className="min-h-screen bg-[#060F0A]">

      {/* ── HERO com temperatura verde ── */}
      <section className="relative border-b border-[#1E3828] pt-32 pb-16 overflow-hidden">
        {/* Glow verde de baixo */}
        <div className="absolute bottom-0 left-0 right-0 h-[200px] pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 100% at 50% 100%, rgba(0,204,122,0.07) 0%, transparent 70%)" }} />
        {/* Linhas brand no centro */}
        <svg className="absolute left-1/2 top-0 h-full -translate-x-1/2 opacity-[0.035]" width="800" viewBox="0 0 800 400" preserveAspectRatio="none">
          {[0, 80, 180, 320, 480, 640, 800].map((x, i) => (
            <line key={i} x1={x} y1="0" x2={x} y2="400" stroke="#00CC7A" strokeWidth="1" />
          ))}
        </svg>

        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-[#00CC7A]/10 border border-[#00CC7A]/25 rounded-full px-4 py-1.5 text-xs font-bold text-[#00CC7A] tracking-[0.15em] uppercase mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00CC7A] animate-pulse" />
            Central de Ajuda
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="font-syne font-extrabold text-5xl text-white mb-5 leading-tight"
          >
            Perguntas<br />
            <span className="text-[#00CC7A]">frequentes</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="text-[#7AA88E] text-lg"
          >
            Respostas rápidas para as dúvidas mais comuns.
            <br />
            Não encontrou? Nossa equipe responde em menos de 2h.
          </motion.p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 py-12">

        {/* Filtro por categoria */}
        <div className="flex gap-2 flex-wrap mb-8">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => { setActiveTag(tag); setOpen(null); }}
              className="px-3.5 py-1.5 rounded-full text-xs font-bold transition-all"
              style={
                activeTag === tag
                  ? { background: tag === "Todas" ? "#00CC7A" : (tagColors[tag] || "#00CC7A"), color: "#001A0E" }
                  : { background: "#0C1A12", color: "#7AA88E", border: "1px solid #1E3828" }
              }
            >
              {tag}
            </button>
          ))}
        </div>

        {/* FAQs */}
        <div className="space-y-3">
          {filtered.map((faq, i) => {
            const globalIndex = faqs.indexOf(faq);
            const isOpen = open === globalIndex;
            return (
              <motion.div
                key={globalIndex}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className={`bg-[#0C1A12] border rounded-2xl overflow-hidden transition-all ${isOpen ? "border-[#00CC7A]/30 shadow-[0_0_20px_rgba(0,204,122,0.05)]" : "border-[#1E3828]"}`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : globalIndex)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-[#111f17] transition-colors gap-4"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <span
                      className="text-[9px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 hidden sm:inline"
                      style={{ background: (tagColors[faq.tag] || "#00CC7A") + "20", color: tagColors[faq.tag] || "#00CC7A" }}
                    >
                      {faq.tag}
                    </span>
                    <span className="font-syne font-bold text-white text-[15px] leading-snug">{faq.q}</span>
                  </div>
                  <div className={`w-7 h-7 rounded-full border flex-shrink-0 flex items-center justify-center transition-all ${isOpen ? "border-[#00CC7A] bg-[#00CC7A]/10" : "border-[#1E3828]"}`}>
                    <svg
                      className={`w-3.5 h-3.5 transition-transform ${isOpen ? "rotate-180 text-[#00CC7A]" : "text-[#4A6A58]"}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-[#C4DDD0] leading-relaxed border-t border-[#1E3828] pt-4 text-[15px]">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* CTA contato */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-[#0C1A12] border border-[#1E3828] rounded-3xl p-8 text-center"
          style={{ boxShadow: "0 0 40px rgba(0,204,122,0.04)" }}
        >
          <div className="w-12 h-12 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6" fill="#25D366" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </div>
          <h2 className="font-syne font-bold text-xl text-white mb-2">Não encontrou o que procurava?</h2>
          <p className="text-[#7AA88E] text-sm mb-6">Nossa equipe responde em menos de 2 horas no horário comercial.</p>
          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white font-extrabold px-8 py-3.5 rounded-xl hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(37,211,102,0.3)] transition-all"
          >
            Falar no WhatsApp
          </a>
        </motion.div>
      </div>
    </div>
  );
}
