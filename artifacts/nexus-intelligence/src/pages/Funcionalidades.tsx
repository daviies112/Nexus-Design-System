import { motion } from "framer-motion";

const modules = [
  { icon: "💰", title: "Cobrança Inteligente", desc: "Régua automática de cobrança via WhatsApp. Múltiplas tentativas, horários inteligentes, mensagens personalizadas para cada revendedora.", tag: "Core" },
  { icon: "📦", title: "Gestão de Estoque", desc: "Controle total de maletas, peças, devoluções e trocas em tempo real. Alertas automáticos de estoque crítico.", tag: "Core" },
  { icon: "🧾", title: "Emissão Fiscal", desc: "NF-e e NFS-e emitidas automaticamente em segundos após a confirmação de cada venda. Zero burocracia.", tag: "Core" },
  { icon: "💸", title: "Comissões", desc: "Cálculo automático de comissões para toda a rede de revendedoras. Relatórios individuais e coletivos.", tag: "Core" },
  { icon: "📊", title: "Dashboard", desc: "Painel completo: faturamento, inadimplência, produtos mais vendidos, desempenho por revendedora.", tag: "Analytics" },
  { icon: "🤖", title: "Amanda AI", desc: "IA central que orquestra todos os módulos e se comunica naturalmente pelo WhatsApp.", tag: "IA" },
  { icon: "📱", title: "WhatsApp Business API", desc: "Integração oficial com a API do WhatsApp Business. Mensagens confiáveis e sem risco de bloqueio.", tag: "Integração" },
  { icon: "🔔", title: "Lembretes Automáticos", desc: "Lembretes de vencimento, confirações de recebimento e avisos de baixo estoque automáticos.", tag: "Automação" },
  { icon: "📈", title: "Relatórios Financeiros", desc: "Relatórios diários, semanais e mensais enviados direto para o seu WhatsApp ou email.", tag: "Analytics" },
  { icon: "👥", title: "Gestão de Revendedoras", desc: "Cadastro, categorização e acompanhamento de desempenho de toda a rede de revendedoras.", tag: "Gestão" },
  { icon: "🗂️", title: "Controle de Maletas", desc: "Rastreamento em tempo real de quais maletas estão com quais revendedoras.", tag: "Core" },
  { icon: "🔗", title: "Integrações", desc: "Conecte com Google Calendar, ERPs e sistemas de pagamento via Pix e boleto.", tag: "Integração" },
];

const tagColors: Record<string, string> = {
  Core: "#FF5A1F", IA: "#00CC7A", Analytics: "#3B82F6", Automação: "#8B5CF6", Gestão: "#F59E0B", Integração: "#EC4899",
};

export default function Funcionalidades() {
  return (
    <div className="min-h-screen bg-[#060F0A]">
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <span className="text-[#FF5A1F] text-xs font-bold tracking-[0.2em] uppercase block mb-4">21 MÓDULOS</span>
          <h1 className="font-syne font-extrabold text-5xl text-white mb-4">
            Tudo que você precisa
          </h1>
          <p className="text-[#7AA88E] text-xl max-w-2xl mx-auto">
            A Nexus Intelligence integra todos os módulos que uma operação de semijoias precisa numa única plataforma.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-[#0C1A12] border border-[#1E3828] rounded-2xl p-8 hover:border-[#FF5A1F]/40 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl">{mod.icon}</div>
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
                  style={{ background: tagColors[mod.tag] + "20", color: tagColors[mod.tag] }}
                >
                  {mod.tag}
                </span>
              </div>
              <h3 className="font-syne font-bold text-xl text-white group-hover:text-[#FF5A1F] transition-colors mb-2">{mod.title}</h3>
              <p className="text-[#7AA88E] text-sm leading-relaxed">{mod.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a href="/#qualificacao" className="inline-block bg-[#FF5A1F] text-[#1A0500] font-extrabold px-10 py-4 rounded-xl text-lg hover:-translate-y-0.5 transition-transform shadow-lg">
            Quero todos os módulos
          </a>
          <p className="text-[#7AA88E] text-sm mt-3">R$200/mês, tudo incluso. 7 dias grátis.</p>
        </div>
      </div>
    </div>
  );
}
