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
            Nascemos para libertar empreendedoras do trabalho operacional e devolver o tempo delas para o que importa.
          </p>
        </motion.div>

        <div className="space-y-12">
          <div className="bg-[#0C1A12] border border-[#1E3828] rounded-3xl p-10">
            <h2 className="font-syne font-bold text-2xl text-white mb-4">Nossa missão</h2>
            <p className="text-[#C4DDD0] leading-relaxed text-lg">
              Automatizar 100% da operação de negócios de semijoias no Brasil — cobrança, estoque, fiscal e comissões — para que cada empreendedora possa focar em crescer, não em sobreviver.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { num: "R$200/mês", desc: "Plano único, tudo incluso" },
              { num: "21", desc: "Módulos integrados na plataforma" },
              { num: "24h", desc: "Para estar operando após assinar" },
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
              A Amanda é a inteligência central da plataforma. Ela orquestra todos os 21 módulos: lembra revendedoras de pagar, emite notas fiscais, atualiza o estoque, calcula comissões e muito mais — tudo pelo WhatsApp, de forma natural e automática.
            </p>
            <p className="text-[#C4DDD0] leading-relaxed">
              Ela nunca dorme, nunca esquece e nunca fica doente. É a funcionária perfeita que toda empreendedora de semijoias merece ter.
            </p>
          </div>

          <div className="bg-[#FF5A1F] rounded-3xl p-10 text-center"
            style={{ backgroundImage: "linear-gradient(rgba(26,5,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(26,5,0,0.06) 1px, transparent 1px)", backgroundSize: "40px 40px" }}>
            <h2 className="font-syne font-extrabold text-3xl text-[#1A0500] mb-4">Pronta para automatizar?</h2>
            <p className="text-[#5C1A00] mb-6">7 dias grátis. Setup em 24h. Sem cartão de crédito.</p>
            <a href="/#qualificacao" className="inline-block bg-[#1A0500] text-[#FF5A1F] font-extrabold px-8 py-4 rounded-xl hover:-translate-y-0.5 transition-transform shadow-lg">
              Garantir minha vaga
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
