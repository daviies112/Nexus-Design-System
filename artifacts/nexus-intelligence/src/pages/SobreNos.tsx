import { motion } from "framer-motion";
import { NexusIcon } from "@/components/NexusIcon";

export default function SobreNos() {
  return (
    <div className="min-h-screen bg-[#060F0A]">
      <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <NexusIcon size={64} className="mx-auto mb-6" />
          <h1 className="font-syne font-extrabold text-5xl text-white mb-4">
            Sobre a <span className="text-[#FF5A1F]">Nexus Intelligence</span>
          </h1>
          <p className="text-[#7AA88E] text-xl max-w-2xl mx-auto">
            A única plataforma construída do zero para empresas de semijoias que operam com rede de revendedoras.
          </p>
        </motion.div>

        <div className="space-y-12">
          <div className="bg-[#0C1A12] border border-[#1E3828] rounded-3xl p-10">
            <h2 className="font-syne font-bold text-2xl text-white mb-4">Nossa missão</h2>
            <p className="text-[#C4DDD0] leading-relaxed text-lg">
              Devolver tempo para quem não pode perder tempo. Uma empresa de semijoias com 50 revendedoras precisa de alguém para cobrar cada revendedora, controlar maletas, responder dúvidas no WhatsApp, gerar etiquetas, verificar pagamentos e emitir notas. Esse alguém custa entre R$2.500 e R$5.000 por mês com encargos. A Nexus substitui esse alguém — e não falta, não erra, não esquece, não tira férias, não pede aumento.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { num: "R$649", desc: "Plano Start — a partir de R$649/mês" },
              { num: "3", desc: "Planos: Start, Pro e Max" },
              { num: "7 dias", desc: "Para estar operando após assinar" },
            ].map((s, i) => (
              <div key={i} className="bg-[#0C1A12] border border-[#1E3828] rounded-2xl p-8 text-center">
                <div className="font-syne font-extrabold text-4xl text-[#FF5A1F] mb-2">{s.num}</div>
                <div className="text-[#7AA88E] text-sm">{s.desc}</div>
              </div>
            ))}
          </div>

          <div className="bg-[#0C1A12] border border-[#1E3828] rounded-3xl p-10">
            <h2 className="font-syne font-bold text-2xl text-white mb-4">A Amanda AI</h2>
            <p className="text-[#C4DDD0] leading-relaxed mb-4">
              A Amanda é a inteligência central da plataforma. Ela atende leads pelo WhatsApp, envia formulários de qualificação, consulta CPF na Datacorp, aprova ou reprova revendedoras automaticamente, agenda reuniões, grava e transcreve, cobra inadimplentes na régua D+5/D+10/D+15, analisa comprovantes de pagamento por foto, gerencia RMA com IA e muito mais — tudo pelo WhatsApp, de forma natural e sem nenhuma intervenção humana.
            </p>
            <p className="text-[#C4DDD0] leading-relaxed">
              Ela nunca dorme, nunca esquece e nunca fica doente. Quando encontra algo fora da base de conhecimento, escala para um humano — e reativa sozinha quando o humano encerra. É a funcionária perfeita que toda empresa de semijoias merece ter.
            </p>
          </div>

          <div className="bg-[#0C1A12] border border-[#1E3828] rounded-3xl p-10">
            <h2 className="font-syne font-bold text-2xl text-white mb-6">O que nos diferencia</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "Única para semijoias", desc: "Não adaptamos um sistema genérico. Construímos do zero para o ciclo de vida real de uma empresa de semijoias com revendedoras." },
                { title: "Zero toque humano", desc: "A meta é que nenhum processo exija intervenção humana. O humano só entra quando a IA detecta que precisa dele." },
                { title: "Multi-tenant isolado", desc: "Cada cliente tem schema exclusivo no PostgreSQL. Seus dados não compartilham infraestrutura com nenhum outro cliente." },
                { title: "Validação jurídica integrada", desc: "Consulta Datacorp (BigDataCorp) para CPF, processos judiciais e pendências financeiras — tudo automático no momento da qualificação." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-[#FF5A1F] mt-2 flex-shrink-0" />
                  <div>
                    <div className="text-white font-semibold mb-1">{item.title}</div>
                    <div className="text-[#7AA88E] text-sm leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="bg-[#FF5A1F] rounded-3xl p-10 text-center"
            style={{ backgroundImage: "linear-gradient(rgba(26,5,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(26,5,0,0.06) 1px, transparent 1px)", backgroundSize: "40px 40px" }}
          >
            <h2 className="font-syne font-extrabold text-3xl text-[#1A0500] mb-4">Pronta para operar no piloto automático?</h2>
            <p className="text-[#5C1A00] mb-6">Start a partir de R$649/mês. Setup em 7 dias. Sem fidelidade.</p>
            <a href="/#qualificacao" className="inline-block bg-[#1A0500] text-[#FF5A1F] font-extrabold px-8 py-4 rounded-xl hover:-translate-y-0.5 transition-transform shadow-lg">
              Garantir minha vaga
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
