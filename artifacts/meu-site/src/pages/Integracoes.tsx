import { motion } from "framer-motion";

const integrations = [
  { name: "WhatsApp Business API", desc: "Integração oficial com a API do WhatsApp Business para mensagens confiáveis e em escala.", category: "Comunicação" },
  { name: "Google Calendar", desc: "Sincronização de agendamentos e lembretes com sua agenda pessoal.", category: "Produtividade" },
  { name: "PIX", desc: "Cobranças e recebimentos via Pix gerados e confirmados automaticamente.", category: "Pagamentos" },
  { name: "Boleto Bancário", desc: "Emissão e envio de boletos registrados para suas revendedoras.", category: "Pagamentos" },
  { name: "NF-e / SEFAZ", desc: "Emissão de Nota Fiscal Eletrônica integrada à SEFAZ de cada estado.", category: "Fiscal" },
  { name: "NFS-e Municipal", desc: "Nota Fiscal de Serviço Eletrônica para municípios que suportam o padrão.", category: "Fiscal" },
  { name: "Google Sheets", desc: "Exportação de relatórios e dados para planilhas automaticamente.", category: "Analytics" },
  { name: "Webhook / API REST", desc: "Conecte a Nexus com qualquer sistema via webhook ou nossa API REST documentada.", category: "Dev" },
];

const catColors: Record<string, string> = {
  Comunicação: "#25D366", Produtividade: "#4285F4", Pagamentos: "#00CC7A", Fiscal: "#FF5A1F", Analytics: "#3B82F6", Dev: "#8B5CF6",
};

export default function Integracoes() {
  return (
    <div className="min-h-screen bg-[#060F0A]">
      <div className="max-w-6xl mx-auto px-6 pt-32 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <span className="text-[#FF5A1F] text-xs font-bold tracking-[0.2em] uppercase block mb-4">INTEGRAÇÕES</span>
          <h1 className="font-syne font-extrabold text-5xl text-white mb-4">
            Conectado a tudo
          </h1>
          <p className="text-[#7AA88E] text-xl max-w-xl mx-auto">
            A Nexus Intelligence se integra nativamente com os principais serviços que sua operação já usa.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {integrations.map((int, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-[#0C1A12] border border-[#1E3828] rounded-2xl p-6 flex gap-4 items-start hover:border-[#FF5A1F]/30 transition-all"
            >
              <div
                className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center text-xs font-bold"
                style={{ background: catColors[int.category] + "20", color: catColors[int.category] }}
              >
                {int.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-syne font-bold text-white">{int.name}</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: catColors[int.category] + "20", color: catColors[int.category] }}>
                    {int.category}
                  </span>
                </div>
                <p className="text-[#7AA88E] text-sm">{int.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-[#0C1A12] border border-[#1E3828] rounded-3xl p-10 text-center">
          <h2 className="font-syne font-bold text-2xl text-white mb-3">Precisa de uma integração específica?</h2>
          <p className="text-[#7AA88E] mb-6">Nossa API REST permite conectar a Nexus com praticamente qualquer sistema.</p>
          <a href="/#qualificacao" className="inline-block bg-[#FF5A1F] text-[#1A0500] font-extrabold px-8 py-4 rounded-xl hover:-translate-y-0.5 transition-transform shadow-lg">
            Falar com nossa equipe
          </a>
        </div>
      </div>
    </div>
  );
}
