import Header from "@/components/Header";

export default function TermosUso() {
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
              <span className="luxury-text">Termos de</span> <span className="luxury-accent font-medium">Uso</span>
            </h1>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-8"></div>
            <p className="text-lg text-muted-foreground font-light">
              Última atualização: Setembro de 2025
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            
            <section className="luxury-card p-8 rounded-xl">
              <h2 className="text-2xl font-medium mb-6 luxury-accent">1. Aceitação dos Termos</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Ao acessar e usar a plataforma Nexus Intelligence, você concorda em cumprir 
                e estar sujeito aos seguintes termos e condições de uso. Se você não concordar 
                com qualquer parte destes termos, não deverá usar nossos serviços.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Estes termos se aplicam a todos os usuários da plataforma, incluindo visitantes, 
                usuários registrados e assinantes de nossos serviços.
              </p>
            </section>

            <section className="luxury-card p-8 rounded-xl">
              <h2 className="text-2xl font-medium mb-6 luxury-accent">2. Descrição do Serviço</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                A Nexus Intelligence fornece uma plataforma de automação de comunicação 
                empresarial via WhatsApp Business, utilizando inteligência artificial para 
                otimizar o atendimento ao cliente.
              </p>
              <div className="ml-6 space-y-2 text-muted-foreground">
                <p>• Automação de respostas via IA</p>
                <p>• Integração com WhatsApp Business API</p>
                <p>• Dashboard de gerenciamento</p>
                <p>• Relatórios e análises de desempenho</p>
                <p>• Integrações com CRMs e ferramentas terceiras</p>
              </div>
            </section>

            <section className="luxury-card p-8 rounded-xl">
              <h2 className="text-2xl font-medium mb-6 luxury-accent">3. Registro e Conta</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Para usar nossos serviços, você deve criar uma conta fornecendo informações 
                precisas e atualizadas. Você é responsável por:
              </p>
              <div className="ml-6 space-y-2 text-muted-foreground">
                <p>• Manter a confidencialidade de sua senha</p>
                <p>• Todas as atividades que ocorrem em sua conta</p>
                <p>• Notificar-nos imediatamente sobre uso não autorizado</p>
                <p>• Fornecer informações verdadeiras e completas</p>
              </div>
            </section>

            <section className="luxury-card p-8 rounded-xl">
              <h2 className="text-2xl font-medium mb-6 luxury-accent">4. Uso Aceitável</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Ao usar nossa plataforma, você concorda em NÃO:
              </p>
              <div className="ml-6 space-y-2 text-muted-foreground">
                <p>• Usar o serviço para atividades ilegais ou não autorizadas</p>
                <p>• Transmitir spam, malware ou conteúdo malicioso</p>
                <p>• Interferir ou interromper os serviços ou servidores</p>
                <p>• Tentar acessar contas de outros usuários</p>
                <p>• Violar qualquer lei local, estadual, nacional ou internacional</p>
                <p>• Usar o serviço para assédio, abuso ou prejudicar outras pessoas</p>
              </div>
            </section>

            <section className="luxury-card p-8 rounded-xl">
              <h2 className="text-2xl font-medium mb-6 luxury-accent">5. Planos e Pagamento</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Nossa plataforma opera sob modelo de assinatura com diferentes planos:
              </p>
              <div className="ml-6 space-y-2 text-muted-foreground mb-4">
                <p>• <strong>Setup inicial:</strong> Configuração em até 24h</p>
                <p>• <strong>Cobrança:</strong> Mensal ou anual, conforme plano escolhido</p>
                <p>• <strong>Cancelamento:</strong> Pode ser feito a qualquer momento</p>
                <p>• <strong>Reembolso:</strong> Conforme política de reembolso específica</p>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Preços podem ser alterados com aviso prévio de 30 dias. Taxas não pagas 
                podem resultar na suspensão ou cancelamento de sua conta.
              </p>
            </section>

            <section className="luxury-card p-8 rounded-xl">
              <h2 className="text-2xl font-medium mb-6 luxury-accent">6. Propriedade Intelectual</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Todos os direitos, títulos e interesses na plataforma, incluindo software, 
                tecnologia, marca e conteúdo, são de propriedade da Nexus Intelligence.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Você mantém a propriedade dos dados que carrega na plataforma, mas nos 
                concede licença para processá-los conforme necessário para fornecer o serviço.
              </p>
            </section>

            <section className="luxury-card p-8 rounded-xl">
              <h2 className="text-2xl font-medium mb-6 luxury-accent">7. Limitação de Responsabilidade</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                A Nexus Intelligence não será responsável por danos indiretos, incidentais, 
                especiais ou consequentes decorrentes do uso ou incapacidade de usar nossos serviços.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Nossa responsabilidade total não excederá o valor pago por você nos 12 meses 
                anteriores ao evento que deu origem à reclamação.
              </p>
            </section>

            <section className="luxury-card p-8 rounded-xl">
              <h2 className="text-2xl font-medium mb-6 luxury-accent">8. Rescisão</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Podemos suspender ou encerrar sua conta se você violar estes termos. 
                Você pode cancelar sua conta a qualquer momento através das configurações 
                da plataforma.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Após o cancelamento, seus dados serão removidos conforme nossa Política de Privacidade.
              </p>
            </section>

            <section className="luxury-card p-8 rounded-xl">
              <h2 className="text-2xl font-medium mb-6 luxury-accent">9. Alterações nos Termos</h2>
              <p className="text-muted-foreground leading-relaxed">
                Reservamo-nos o direito de modificar estes termos a qualquer momento. 
                Notificaremos sobre mudanças significativas por email ou através da plataforma. 
                O uso continuado após as alterações constitui aceitação dos novos termos.
              </p>
            </section>

            <section className="luxury-card p-8 rounded-xl">
              <h2 className="text-2xl font-medium mb-6 luxury-accent">10. Lei Aplicável e Jurisdição</h2>
              <p className="text-muted-foreground leading-relaxed">
                Estes termos são regidos pelas leis brasileiras. Qualquer disputa será 
                resolvida nos tribunais competentes do Brasil.
              </p>
            </section>

            <section className="luxury-card p-8 rounded-xl">
              <h2 className="text-2xl font-medium mb-6 luxury-accent">11. Contato</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Para dúvidas sobre estes termos, entre em contato:
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p>📧 <strong>Email:</strong> contato@secretariaai.com</p>
                <p>📱 <strong>WhatsApp:</strong> (11) 9999-9999</p>
                <p>🌐 <strong>Site:</strong> nexusintelligence.com</p>
              </div>
            </section>

          </div>

        </div>
      </main>
    </div>
  );
}