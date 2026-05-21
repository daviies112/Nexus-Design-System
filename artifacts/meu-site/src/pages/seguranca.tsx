import Header from "@/components/Header";

export default function Seguranca() {
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
              <span className="luxury-text">Segurança</span> <span className="luxury-accent font-medium">Enterprise</span>
            </h1>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-8"></div>
            <p className="text-xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
              Proteção <span className="text-accent">máxima para seus dados</span> com os mais altos padrões de segurança
            </p>
          </div>

          {/* Security Features Section */}
          <section className="luxury-card p-8 rounded-xl mb-12">
            <h2 className="text-2xl font-medium mb-8 luxury-accent">Proteção de Dados</h2>
            <div className="grid md:grid-cols-2 gap-6">
              
              <div className="border border-border rounded-lg p-6">
                <div className="text-green-500 mb-4">
                  <i className="fas fa-shield-alt text-3xl"></i>
                </div>
                <h3 className="text-xl font-medium mb-3">Criptografia End-to-End</h3>
                <p className="text-muted-foreground">
                  Todas as mensagens são criptografadas com AES-256, garantindo que apenas 
                  você e seus clientes tenham acesso ao conteúdo das conversas.
                </p>
              </div>

              <div className="border border-border rounded-lg p-6">
                <div className="text-blue-500 mb-4">
                  <i className="fas fa-database text-3xl"></i>
                </div>
                <h3 className="text-xl font-medium mb-3">Backup Seguro</h3>
                <p className="text-muted-foreground">
                  Backups automáticos criptografados armazenados em múltiplas regiões
                  geográficas para máxima disponibilidade e segurança.
                </p>
              </div>

              <div className="border border-border rounded-lg p-6">
                <div className="text-purple-500 mb-4">
                  <i className="fas fa-user-lock text-3xl"></i>
                </div>
                <h3 className="text-xl font-medium mb-3">Autenticação 2FA</h3>
                <p className="text-muted-foreground">
                  Autenticação de dois fatores obrigatória para todos os acessos,
                  incluindo SMS, email e apps autenticadores.
                </p>
              </div>

              <div className="border border-border rounded-lg p-6">
                <div className="text-red-500 mb-4">
                  <i className="fas fa-eye text-3xl"></i>
                </div>
                <h3 className="text-xl font-medium mb-3">Monitoramento 24/7</h3>
                <p className="text-muted-foreground">
                  Sistema de monitoramento contínuo para detecção de atividades 
                  suspeitas e resposta automática a ameaças.
                </p>
              </div>

            </div>
          </section>

          {/* Compliance Section */}
          <section className="luxury-card p-8 rounded-xl mb-12">
            <h2 className="text-2xl font-medium mb-6 luxury-accent">Conformidade e Certificações</h2>
            <div className="space-y-6">
              
              <div className="flex items-start space-x-4 p-4 border border-border rounded-lg">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-certificate text-accent text-xl"></i>
                </div>
                <div>
                  <h4 className="font-medium mb-2">LGPD (Lei Geral de Proteção de Dados)</h4>
                  <p className="text-muted-foreground text-sm">
                    100% conforme com a legislação brasileira de proteção de dados.
                    Controles rigorosos de consentimento, portabilidade e exclusão de dados.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 border border-border rounded-lg">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-globe text-accent text-xl"></i>
                </div>
                <div>
                  <h4 className="font-medium mb-2">GDPR (General Data Protection Regulation)</h4>
                  <p className="text-muted-foreground text-sm">
                    Conformidade total com regulamentações europeias para proteção de dados
                    pessoais de cidadãos da União Europeia.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 border border-border rounded-lg">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-cloud text-accent text-xl"></i>
                </div>
                <div>
                  <h4 className="font-medium mb-2">ISO 27001</h4>
                  <p className="text-muted-foreground text-sm">
                    Certificação internacional para sistemas de gestão da segurança da informação,
                    garantindo processos auditados e seguros.
                  </p>
                </div>
              </div>

            </div>
          </section>

          {/* Infrastructure Section */}
          <section className="luxury-card p-8 rounded-xl mb-12">
            <h2 className="text-2xl font-medium mb-6 luxury-accent">Infraestrutura Segura</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              
              <div className="text-center">
                <div className="luxury-glass w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-server text-2xl text-accent"></i>
                </div>
                <h4 className="font-medium mb-2">AWS Cloud</h4>
                <p className="text-sm text-muted-foreground">
                  Hospedagem em infraestrutura AWS com certificações de segurança globais
                </p>
              </div>

              <div className="text-center">
                <div className="luxury-glass w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-network-wired text-2xl text-accent"></i>
                </div>
                <h4 className="font-medium mb-2">CDN Global</h4>
                <p className="text-sm text-muted-foreground">
                  Rede de entrega de conteúdo distribuída para máxima performance
                </p>
              </div>

              <div className="text-center">
                <div className="luxury-glass w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-fire-alt text-2xl text-accent"></i>
                </div>
                <h4 className="font-medium mb-2">DDoS Protection</h4>
                <p className="text-sm text-muted-foreground">
                  Proteção avançada contra ataques distribuídos de negação de serviço
                </p>
              </div>

            </div>

            <div className="bg-muted/30 rounded-lg p-6 border border-border">
              <h4 className="font-medium mb-3 text-center">Uptime Garantido</h4>
              <div className="text-center">
                <span className="text-3xl font-bold text-accent">99.9%</span>
                <p className="text-muted-foreground text-sm mt-2">
                  SLA com compensação em caso de indisponibilidade
                </p>
              </div>
            </div>
          </section>

          {/* Privacy Section */}
          <section className="luxury-card p-8 rounded-xl">
            <h2 className="text-2xl font-medium mb-6 luxury-accent">Privacidade por Design</h2>
            <div className="space-y-4">
              
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Dados processados apenas no Brasil (data residency)</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Zero logs de conversas armazenados sem consentimento</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Direito ao esquecimento implementado (exclusão completa)</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Auditoria completa de todos os acessos aos dados</span>
              </div>

            </div>
            
            <div className="mt-8 p-4 bg-accent/5 border border-accent/20 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <i className="fas fa-info-circle text-accent mr-2"></i>
                Para mais detalhes sobre nossas práticas de segurança, entre em contato com 
                nossa equipe especializada em segurança da informação.
              </p>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}