import { motion } from "framer-motion";

const features = [
  { title: "Criptografia End-to-End", desc: "Todas as mensagens e dados são criptografados com AES-256. Apenas você e suas revendedoras têm acesso." },
  { title: "Backup Automático", desc: "Backups automáticos criptografados armazenados em múltiplas regiões geográficas para máxima disponibilidade." },
  { title: "Autenticação 2FA", desc: "Autenticação de dois fatores disponível para todos os acessos à plataforma." },
  { title: "Monitoramento 24/7", desc: "Sistema de monitoramento contínuo com alertas automáticos de atividades suspeitas." },
];

const compliance = [
  { title: "LGPD", desc: "100% conforme com a Lei Geral de Proteção de Dados. Controles rigorosos de consentimento e exclusão." },
  { title: "ISO 27001", desc: "Certificação internacional para gestão da segurança da informação." },
  { title: "99.9% Uptime", desc: "SLA garantido com compensação em caso de indisponibilidade." },
];

export default function Seguranca() {
  return (
    <div className="min-h-screen bg-[#060F0A]">
      <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <span className="text-[#FF5A1F] text-xs font-bold tracking-[0.2em] uppercase block mb-4">SEGURANÇA</span>
          <h1 className="font-syne font-extrabold text-5xl text-white mb-4">
            Seus dados, <span className="text-[#FF5A1F]">protegidos</span>
          </h1>
          <p className="text-[#7AA88E] text-xl max-w-xl mx-auto">
            Segurança enterprise para o seu negócio de semijoias.
          </p>
        </motion.div>

        <div className="space-y-6">
          <div className="bg-[#0C1A12] border border-[#1E3828] rounded-3xl p-8">
            <h2 className="font-syne font-bold text-xl text-white mb-6">Proteção de Dados</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {features.map((f, i) => (
                <div key={i} className="bg-[#060F0A] border border-[#1E3828] rounded-2xl p-5">
                  <div className="w-8 h-8 bg-[#00CC7A]/20 rounded-lg flex items-center justify-center mb-3">
                    <svg className="w-4 h-4 text-[#00CC7A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="font-syne font-bold text-white mb-1">{f.title}</h3>
                  <p className="text-[#7AA88E] text-sm">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0C1A12] border border-[#1E3828] rounded-3xl p-8">
            <h2 className="font-syne font-bold text-xl text-white mb-6">Conformidade e Certificações</h2>
            <div className="space-y-4">
              {compliance.map((c, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-[#060F0A] border border-[#1E3828] rounded-xl">
                  <div className="w-10 h-10 bg-[#FF5A1F]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#FF5A1F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-syne font-bold text-white mb-1">{c.title}</h4>
                    <p className="text-[#7AA88E] text-sm">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0C1A12] border border-[#1E3828] rounded-3xl p-8">
            <h2 className="font-syne font-bold text-xl text-white mb-4">Privacidade por Design</h2>
            <ul className="space-y-3">
              {[
                "Dados processados apenas no Brasil (data residency)",
                "Zero logs de conversas armazenados sem consentimento",
                "Direito ao esquecimento implementado (exclusão completa)",
                "Auditoria completa de todos os acessos aos dados",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-[#C4DDD0]">
                  <div className="w-2 h-2 bg-[#00CC7A] rounded-full flex-shrink-0"></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
