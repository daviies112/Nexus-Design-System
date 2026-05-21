import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 32, filter: "blur(6px)" },
  visible: (d = 0) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.8, delay: d, ease: [0.16, 1, 0.3, 1] },
  }),
};

const before = [
  { emoji: "💸", title: "Cobrança manual", desc: "Ligar, cobrar, negociar, anotar — uma revendedora de cada vez. Todo mês." },
  { emoji: "🧾", title: "NF-e no braço", desc: "Abrir sistema fiscal, preencher dados, emitir, enviar. Para cada venda." },
  { emoji: "📦", title: "Maletas perdidas", desc: "Planilha de controle atualizada às 23h. Peça extraviada. Sem registro." },
  { emoji: "❌", title: "Negativação impossível", desc: "Revendedora sumiu. Serasa custa R$80 por ação. Você deixa passar." },
];

const depois = [
  { emoji: "🤖", title: "Amanda cobra sozinha", desc: "D+5, D+10, D+15 via WhatsApp. Sem você tocar em nada. Taxa de recebimento sobe 68%." },
  { emoji: "⚡", title: "NF-e automática", desc: "Toda segunda, 7h da manhã. Em lote. Enviada por WhatsApp e e-mail. Você nem vê." },
  { emoji: "📡", title: "Maleta rastreada", desc: "Confirmação de recebimento via Pix, rolagem automática, RMA com foto por IA." },
  { emoji: "⚖️", title: "Serasa automático", desc: "D+17 sem pagamento: negativação automática. R$25/ação. Sem advogado, sem burocracia." },
];

export default function SobreNos() {
  return (
    <div className="min-h-screen bg-[#060F0A] overflow-hidden">

      {/* ── MANIFESTO HERO ── */}
      <section className="relative pt-32 pb-20 px-6">
        {/* Background decorativo */}
        <div className="absolute inset-0 pointer-events-none">
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,90,31,0.06) 0%, transparent 65%)" }} />
          {/* Linhas brand verticais */}
          <svg className="absolute top-0 right-0 h-full w-1/3 opacity-[0.04]" viewBox="0 0 400 800" preserveAspectRatio="none">
            {[0, 40, 80, 130, 180, 240, 320].map((x, i) => (
              <line key={i} x1={x} y1="0" x2={x} y2="800" stroke="#FF5A1F" strokeWidth="1" />
            ))}
          </svg>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp} className="mb-6">
            <span className="text-[#FF5A1F] text-xs font-bold tracking-[0.25em] uppercase">Nossa missão</span>
          </motion.div>

          <motion.blockquote
            custom={0.1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="font-syne font-extrabold text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] mb-8"
          >
            Nós não vendemos software.{" "}
            <span className="text-[#FF5A1F]">Devolvemos tempo</span>{" "}
            para quem não pode perder tempo.
          </motion.blockquote>

          <motion.p
            custom={0.2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-[#7AA88E] text-xl max-w-2xl leading-relaxed"
          >
            Uma empresa de semijoias com 50 revendedoras precisa de alguém para cobrar cada revendedora,
            controlar maletas, responder dúvidas no WhatsApp, emitir notas. Esse alguém custa R$2.500–R$5.000/mês.
            A Nexus substitui esse alguém — e não falta, não erra, não esquece.
          </motion.p>
        </div>
      </section>

      {/* ── ANTES VS. NEXUS ── */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <motion.div custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <span className="text-[#7AA88E] text-xs font-bold tracking-[0.2em] uppercase block mb-3">A diferença na prática</span>
            <h2 className="font-syne font-bold text-3xl text-white">Antes da Nexus vs. Com a Nexus</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Antes */}
            <motion.div
              custom={0.1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-[#0A0A0A] border border-[#1E1E1E] rounded-2xl overflow-hidden"
            >
              <div className="flex items-center gap-3 px-6 py-4 border-b border-[#1E1E1E] bg-[#0D0D0D]">
                <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                <span className="font-syne font-bold text-[#EF4444] text-sm uppercase tracking-wider">Antes da Nexus</span>
              </div>
              <div className="p-6 space-y-5">
                {before.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="text-2xl flex-shrink-0">{item.emoji}</span>
                    <div>
                      <div className="font-semibold text-[#7A5A5A] mb-0.5">{item.title}</div>
                      <div className="text-[#4A3A3A] text-sm leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Depois */}
            <motion.div
              custom={0.18}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-[#061008] border border-[#1E3828] rounded-2xl overflow-hidden"
              style={{ boxShadow: "0 0 40px rgba(0,204,122,0.06)" }}
            >
              <div className="flex items-center gap-3 px-6 py-4 border-b border-[#1E3828] bg-[#071209]">
                <div className="w-2.5 h-2.5 rounded-full bg-[#00CC7A] animate-pulse" />
                <span className="font-syne font-bold text-[#00CC7A] text-sm uppercase tracking-wider">Com a Nexus</span>
              </div>
              <div className="p-6 space-y-5">
                {depois.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="text-2xl flex-shrink-0">{item.emoji}</span>
                    <div>
                      <div className="font-semibold text-white mb-0.5">{item.title}</div>
                      <div className="text-[#7AA88E] text-sm leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="px-6 pb-20 border-t border-[#1E3828]">
        <div className="max-w-5xl mx-auto pt-16">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { num: "R$649", label: "Plano de entrada", sub: "Menos que um assistente por semana" },
              { num: "7 dias", label: "Setup completo", sub: "Operando em menos de uma semana" },
              { num: "Zero", label: "Intervenção humana", sub: "A meta é 100% automático" },
            ].map((s, i) => (
              <motion.div
                key={i}
                custom={i * 0.08}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-[#0C1A12] border border-[#1E3828] rounded-2xl p-8 text-center"
              >
                <div className="font-syne font-extrabold text-4xl text-[#FF5A1F] mb-2">{s.num}</div>
                <div className="text-white font-semibold mb-1">{s.label}</div>
                <div className="text-[#4A6A58] text-xs">{s.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AMANDA AI ── */}
      <section className="px-6 pb-20 border-t border-[#1E3828]">
        <div className="max-w-5xl mx-auto pt-16">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <span className="text-[#FF5A1F] text-xs font-bold tracking-[0.2em] uppercase block mb-4">A inteligência central</span>
              <h2 className="font-syne font-bold text-3xl text-white mb-5">Amanda AI</h2>
              <p className="text-[#C4DDD0] leading-relaxed mb-4">
                A Amanda atende leads pelo WhatsApp, consulta CPF na Datacorp, aprova ou reprova revendedoras,
                agenda reuniões, grava e transcreve, cobra inadimplentes na régua D+5/D+10/D+15,
                analisa comprovantes por foto e gerencia RMA com IA.
              </p>
              <p className="text-[#7AA88E] text-sm leading-relaxed">
                Ela nunca dorme, nunca esquece e nunca fica doente. Quando encontra algo fora
                da base de conhecimento, escala para um humano — e reativa sozinha quando o humano encerra.
              </p>
            </motion.div>

            <motion.div custom={0.12} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="space-y-3">
                {[
                  { title: "Única para semijoias", desc: "Construída do zero para o ciclo real de uma empresa com revendedoras." },
                  { title: "Zero toque humano", desc: "O humano só entra quando a IA detecta que precisa dele." },
                  { title: "Multi-tenant isolado", desc: "Schema exclusivo no PostgreSQL por cliente. Dados nunca compartilhados." },
                  { title: "Validação jurídica integrada", desc: "Consulta Datacorp automática no momento da qualificação." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 bg-[#0C1A12] border border-[#1E3828] rounded-xl p-4">
                    <div className="w-1.5 rounded-full bg-[#FF5A1F] flex-shrink-0 self-stretch" />
                    <div>
                      <div className="text-white font-semibold text-sm mb-0.5">{item.title}</div>
                      <div className="text-[#7AA88E] text-xs leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA LARANJA ── */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="bg-[#FF5A1F] rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
            style={{ backgroundImage: "linear-gradient(rgba(26,5,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(26,5,0,0.06) 1px, transparent 1px)", backgroundSize: "40px 40px" }}
          >
            <h2 className="font-syne font-extrabold text-3xl md:text-4xl text-[#1A0500] mb-4">
              Pronta para operar no piloto automático?
            </h2>
            <p className="text-[#5C1A00] text-lg mb-8">Start a partir de R$649/mês. Setup em 7 dias. Sem fidelidade.</p>
            <a
              href="/comparacao"
              className="inline-block bg-[#1A0500] text-[#FF5A1F] font-extrabold px-10 py-4 rounded-xl hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-all text-lg"
            >
              Ver os planos →
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
