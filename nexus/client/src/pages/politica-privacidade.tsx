import Header from "@/components/Header";

export default function PoliticaPrivacidade() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Content */}
      <main className="luxury-gradient">
        <div className="max-w-4xl mx-auto px-8 pt-32 pb-20">
          
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-light mb-6">
              <span className="luxury-text">Política de</span> <span className="luxury-accent font-medium">Privacidade</span>
            </h1>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-8"></div>
            <p className="text-lg text-muted-foreground font-light">
              Última atualização: Setembro de 2025 | Conforme LGPD (Lei 13.709/2018)
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            
            <section className="luxury-card p-8 rounded-xl">
              <h2 className="text-2xl font-medium mb-6 luxury-accent">1. Compromisso com sua Privacidade</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                A Nexus Intelligence está comprometida em proteger sua privacidade e dados pessoais. 
                Esta política explica como coletamos, usamos, armazenamos e protegemos suas informações, 
                em conformidade com a Lei Geral de Proteção de Dados (LGPD) e regulamentações internacionais.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Ao usar nossos serviços, você concorda com as práticas descritas nesta política.
              </p>
            </section>

            <section className="luxury-card p-8 rounded-xl">
              <h2 className="text-2xl font-medium mb-6 luxury-accent">2. Informações que Coletamos</h2>
              
              <h3 className="text-lg font-medium mb-4 text-foreground">Informações fornecidas por você:</h3>
              <div className="ml-6 space-y-2 text-muted-foreground mb-6">
                <p>• Dados de registro (nome, email, telefone, empresa)</p>
                <p>• Informações de pagamento (processadas por terceiros seguros)</p>
                <p>• Conteúdo das conversas via WhatsApp (para funcionamento do serviço)</p>
                <p>• Configurações e preferências da plataforma</p>
                <p>• Informações de suporte ao cliente</p>
              </div>

              <h3 className="text-lg font-medium mb-4 text-foreground">Informações coletadas automaticamente:</h3>
              <div className="ml-6 space-y-2 text-muted-foreground">
                <p>• Dados de uso da plataforma (páginas visitadas, tempo de uso)</p>
                <p>• Informações técnicas (IP, navegador, dispositivo)</p>
                <p>• Logs de sistema para segurança e desempenho</p>
                <p>• Cookies e tecnologias similares</p>
              </div>
            </section>

            <section className="luxury-card p-8 rounded-xl">
              <h2 className="text-2xl font-medium mb-6 luxury-accent">3. Como Usamos suas Informações</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Utilizamos seus dados pessoais para os seguintes propósitos:
              </p>
              <div className="ml-6 space-y-2 text-muted-foreground">
                <p>• <strong>Prestação do serviço:</strong> Processar e responder mensagens via IA</p>
                <p>• <strong>Gerenciamento da conta:</strong> Criar e manter sua conta</p>
                <p>• <strong>Cobrança:</strong> Processar pagamentos e emitir faturas</p>
                <p>• <strong>Suporte:</strong> Fornecer atendimento e suporte técnico</p>
                <p>• <strong>Segurança:</strong> Detectar e prevenir fraudes e uso indevido</p>
                <p>• <strong>Melhoria do produto:</strong> Analisar uso para aprimorar funcionalidades</p>
                <p>• <strong>Comunicação:</strong> Enviar atualizações importantes sobre o serviço</p>
              </div>
            </section>

            <section className="luxury-card p-8 rounded-xl">
              <h2 className="text-2xl font-medium mb-6 luxury-accent">4. Base Legal para Processamento</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Processamos seus dados pessoais com base nas seguintes bases legais da LGPD:
              </p>
              <div className="ml-6 space-y-2 text-muted-foreground">
                <p>• <strong>Execução de contrato:</strong> Para fornecimento dos serviços contratados</p>
                <p>• <strong>Consentimento:</strong> Quando você nos autoriza expressamente</p>
                <p>• <strong>Interesse legítimo:</strong> Para melhorias, segurança e prevenção de fraudes</p>
                <p>• <strong>Cumprimento legal:</strong> Para atender obrigações legais e regulatórias</p>
              </div>
            </section>

            <section className="luxury-card p-8 rounded-xl">
              <h2 className="text-2xl font-medium mb-6 luxury-accent">5. Compartilhamento de Informações</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Não vendemos seus dados pessoais. Compartilhamos informações apenas quando necessário:
              </p>
              <div className="ml-6 space-y-2 text-muted-foreground mb-4">
                <p>• <strong>WhatsApp Business API:</strong> Para funcionamento da integração</p>
                <p>• <strong>Processadores de pagamento:</strong> Para processar assinaturas (Stripe, etc.)</p>
                <p>• <strong>Prestadores de serviço:</strong> Hospedagem, análises, suporte (sempre com contratos de proteção)</p>
                <p>• <strong>Exigências legais:</strong> Quando requerido por autoridades competentes</p>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Todos os terceiros são obrigados contratualmente a proteger seus dados e 
                usar apenas para os fins especificados.
              </p>
            </section>

            <section className="luxury-card p-8 rounded-xl">
              <h2 className="text-2xl font-medium mb-6 luxury-accent">6. Segurança dos Dados</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Implementamos medidas técnicas e organizacionais rigorosas:
              </p>
              <div className="ml-6 space-y-2 text-muted-foreground">
                <p>• <strong>Criptografia:</strong> End-to-end em transit e at-rest</p>
                <p>• <strong>Acesso restrito:</strong> Apenas funcionários autorizados</p>
                <p>• <strong>Servidores seguros:</strong> Infraestrutura certificada ISO 27001</p>
                <p>• <strong>Monitoramento:</strong> Detecção de ameaças 24/7</p>
                <p>• <strong>Backup:</strong> Cópias de segurança regulares e testadas</p>
                <p>• <strong>Auditoria:</strong> Revisões regulares de segurança</p>
              </div>
            </section>

            <section className="luxury-card p-8 rounded-xl">
              <h2 className="text-2xl font-medium mb-6 luxury-accent">7. Retenção de Dados</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Mantemos seus dados pelo tempo necessário para:
              </p>
              <div className="ml-6 space-y-2 text-muted-foreground mb-4">
                <p>• <strong>Conta ativa:</strong> Durante vigência da assinatura</p>
                <p>• <strong>Dados de conversa:</strong> 90 dias após inatividade (configurável)</p>
                <p>• <strong>Dados financeiros:</strong> 5 anos (exigência legal)</p>
                <p>• <strong>Logs de sistema:</strong> 12 meses para segurança</p>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Após o período de retenção, os dados são excluídos permanentemente 
                de forma segura e irreversível.
              </p>
            </section>

            <section className="luxury-card p-8 rounded-xl">
              <h2 className="text-2xl font-medium mb-6 luxury-accent">8. Seus Direitos (LGPD)</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Você tem os seguintes direitos sobre seus dados pessoais:
              </p>
              <div className="ml-6 space-y-2 text-muted-foreground mb-4">
                <p>• <strong>Acesso:</strong> Saber quais dados temos sobre você</p>
                <p>• <strong>Correção:</strong> Corrigir dados incompletos ou incorretos</p>
                <p>• <strong>Exclusão:</strong> Solicitar a remoção de seus dados</p>
                <p>• <strong>Portabilidade:</strong> Receber seus dados em formato estruturado</p>
                <p>• <strong>Oposição:</strong> Opor-se ao processamento de dados</p>
                <p>• <strong>Limitação:</strong> Limitar o processamento em certas circunstâncias</p>
                <p>• <strong>Revogação:</strong> Retirar consentimento a qualquer momento</p>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Para exercer seus direitos, entre em contato através do email: 
                <span className="text-accent"> privacidade@secretariaai.com</span>
              </p>
            </section>

            <section className="luxury-card p-8 rounded-xl">
              <h2 className="text-2xl font-medium mb-6 luxury-accent">9. Cookies e Tecnologias Similares</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Utilizamos cookies para melhorar sua experiência:
              </p>
              <div className="ml-6 space-y-2 text-muted-foreground">
                <p>• <strong>Essenciais:</strong> Necessários para funcionamento da plataforma</p>
                <p>• <strong>Funcionais:</strong> Lembrar suas preferências</p>
                <p>• <strong>Análise:</strong> Entender como você usa nossos serviços</p>
                <p>• <strong>Marketing:</strong> Personalizar conteúdo (apenas com consentimento)</p>
              </div>
            </section>

            <section className="luxury-card p-8 rounded-xl">
              <h2 className="text-2xl font-medium mb-6 luxury-accent">10. Transferência Internacional</h2>
              <p className="text-muted-foreground leading-relaxed">
                Seus dados são processados principalmente no Brasil. Quando necessário 
                transferir para outros países, garantimos nível adequado de proteção através 
                de cláusulas contratuais padrão e certificações internacionais.
              </p>
            </section>

            <section className="luxury-card p-8 rounded-xl">
              <h2 className="text-2xl font-medium mb-6 luxury-accent">11. Menores de Idade</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nossos serviços são destinados a empresas e não coletamos intencionalmente 
                dados de menores de 18 anos. Se identificarmos tais dados, os excluiremos imediatamente.
              </p>
            </section>

            <section className="luxury-card p-8 rounded-xl">
              <h2 className="text-2xl font-medium mb-6 luxury-accent">12. Alterações nesta Política</h2>
              <p className="text-muted-foreground leading-relaxed">
                Esta política pode ser atualizada periodicamente. Mudanças significativas 
                serão comunicadas por email com 30 dias de antecedência. 
                Recomendamos revisar esta página regularmente.
              </p>
            </section>

            <section className="luxury-card p-8 rounded-xl">
              <h2 className="text-2xl font-medium mb-6 luxury-accent">13. Encarregado de Dados (DPO)</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Nosso Encarregado de Proteção de Dados está disponível para esclarecer 
                dúvidas sobre esta política e seus direitos:
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p>📧 <strong>Email:</strong> privacidade@secretariaai.com</p>
                <p>📱 <strong>WhatsApp:</strong> (11) 9999-9999</p>
                <p>🏢 <strong>Endereço:</strong> São Paulo, SP, Brasil</p>
              </div>
            </section>

            <section className="luxury-card p-8 rounded-xl">
              <h2 className="text-2xl font-medium mb-6 luxury-accent">14. Autoridade Nacional</h2>
              <p className="text-muted-foreground leading-relaxed">
                Se não conseguirmos resolver suas preocupações, você pode entrar em contato 
                com a Autoridade Nacional de Proteção de Dados (ANPD) através do site: 
                <a href="https://www.gov.br/anpd" className="text-accent hover:text-accent/80 transition-colors" target="_blank" rel="noopener noreferrer">
                  www.gov.br/anpd
                </a>
              </p>
            </section>

          </div>

        </div>
      </main>
    </div>
  );
}