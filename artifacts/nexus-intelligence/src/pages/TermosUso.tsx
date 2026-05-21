import { motion } from "framer-motion";

export default function TermosUso() {
  return (
    <div className="min-h-screen bg-[#060F0A]">
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-syne font-extrabold text-4xl text-white mb-2">Termos de Uso</h1>
          <p className="text-[#7AA88E] mb-10">Última atualização: maio de 2026</p>

          <div className="space-y-8 text-[#C4DDD0] leading-relaxed">
            <section>
              <h2 className="font-syne font-bold text-xl text-white mb-3">1. Aceitação dos Termos</h2>
              <p>Ao utilizar a plataforma Nexus Intelligence, você concorda com estes Termos de Uso. Caso não concorde com qualquer cláusula, não utilize o serviço.</p>
            </section>
            <section>
              <h2 className="font-syne font-bold text-xl text-white mb-3">2. Descrição do Serviço</h2>
              <p>A Nexus Intelligence é uma plataforma SaaS de automação para negócios de semijoias, que inclui módulos de cobrança, gestão de estoque, emissão fiscal e comunicação via WhatsApp orquestrados pela Amanda AI.</p>
            </section>
            <section>
              <h2 className="font-syne font-bold text-xl text-white mb-3">3. Cadastro e Conta</h2>
              <p>Para utilizar a plataforma, você deve fornecer informações verídicas e manter seus dados atualizados. Você é responsável por manter a confidencialidade das suas credenciais de acesso.</p>
            </section>
            <section>
              <h2 className="font-syne font-bold text-xl text-white mb-3">4. Pagamento e Cancelamento</h2>
              <p>A Nexus Intelligence oferece três planos mensais: Start (R$649/mês), Pro (R$997/mês) e Max (R$1.449/mês). Além da mensalidade, alguns serviços são cobrados por uso (consulta de CPF, Pix automático, negativação Serasa e plano de ação IA). Você pode cancelar a qualquer momento sem multa. O cancelamento é efetivado no final do período já pago.</p>
            </section>
            <section>
              <h2 className="font-syne font-bold text-xl text-white mb-3">5. Uso Permitido</h2>
              <p>A plataforma deve ser utilizada exclusivamente para fins comerciais legítimos relacionados a negócios de semijoias. É proibido utilizar o serviço para fins ilegais, envio de spam ou violação de direitos de terceiros.</p>
            </section>
            <section>
              <h2 className="font-syne font-bold text-xl text-white mb-3">6. Limitação de Responsabilidade</h2>
              <p>A Nexus Intelligence não se responsabiliza por danos indiretos, lucros cessantes ou perda de dados decorrentes do uso ou impossibilidade de uso da plataforma.</p>
            </section>
            <section>
              <h2 className="font-syne font-bold text-xl text-white mb-3">7. Alterações nos Termos</h2>
              <p>Podemos atualizar estes Termos periodicamente. Você será notificado sobre mudanças significativas com 30 dias de antecedência.</p>
            </section>
            <section>
              <h2 className="font-syne font-bold text-xl text-white mb-3">8. Contato</h2>
              <p>Dúvidas sobre estes Termos? Entre em contato: <span className="text-[#FF5A1F]">legal@nexusintelligence.com.br</span></p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
