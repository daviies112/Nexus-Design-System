import { motion } from "framer-motion";

export default function PoliticaPrivacidade() {
  return (
    <div className="min-h-screen bg-[#060F0A]">
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-syne font-extrabold text-4xl text-white mb-2">Política de Privacidade</h1>
          <p className="text-[#7AA88E] mb-10">Última atualização: maio de 2026 — LGPD compliance</p>

          <div className="space-y-8 text-[#C4DDD0] leading-relaxed">
            <section>
              <h2 className="font-syne font-bold text-xl text-white mb-3">1. Dados que coletamos</h2>
              <p className="mb-2">Coletamos os seguintes dados pessoais:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Dados de identificação: nome, e-mail, telefone, CPF/CNPJ</li>
                <li>Dados de uso da plataforma: logs de acesso, ações realizadas</li>
                <li>Dados financeiros: histórico de pagamentos (sem dados de cartão)</li>
                <li>Dados de comunicação: mensagens trocadas via WhatsApp Business</li>
              </ul>
            </section>
            <section>
              <h2 className="font-syne font-bold text-xl text-white mb-3">2. Como usamos seus dados</h2>
              <p>Utilizamos seus dados para: prestação do serviço contratado, emissão de notas fiscais, comunicação sobre atualizações da plataforma, suporte ao cliente e melhoria contínua do produto.</p>
            </section>
            <section>
              <h2 className="font-syne font-bold text-xl text-white mb-3">3. Compartilhamento de dados</h2>
              <p>Não vendemos seus dados. Compartilhamos apenas com: parceiros de infraestrutura (AWS), serviços de emissão fiscal (SEFAZ) e, quando exigido, com autoridades competentes.</p>
            </section>
            <section>
              <h2 className="font-syne font-bold text-xl text-white mb-3">4. Retenção de dados</h2>
              <p>Dados de clientes ativos são mantidos durante a vigência do contrato. Após cancelamento, dados são mantidos por 5 anos por obrigação fiscal e depois excluídos.</p>
            </section>
            <section>
              <h2 className="font-syne font-bold text-xl text-white mb-3">5. Seus direitos (LGPD)</h2>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Acesso aos seus dados pessoais</li>
                <li>Correção de dados incompletos ou incorretos</li>
                <li>Exclusão dos dados (direito ao esquecimento)</li>
                <li>Portabilidade dos dados</li>
                <li>Revogação do consentimento</li>
              </ul>
            </section>
            <section>
              <h2 className="font-syne font-bold text-xl text-white mb-3">6. Segurança</h2>
              <p>Adotamos criptografia AES-256, autenticação 2FA e auditorias regulares de segurança para proteger seus dados.</p>
            </section>
            <section>
              <h2 className="font-syne font-bold text-xl text-white mb-3">7. Contato e DPO</h2>
              <p>Para exercer seus direitos ou tirar dúvidas sobre privacidade: <span className="text-[#FF5A1F]">privacidade@nexusintelligence.com.br</span></p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
