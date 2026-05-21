import { useState } from "react";
import Header from "@/components/Header";

export default function CentralAjuda() {
  const [searchTerm, setSearchTerm] = useState("");

  const faqs = [
    {
      category: "Primeiros Passos",
      questions: [
        {
          q: "Como começar a usar a plataforma?",
          a: "Após se cadastrar, você receberá um guia completo por email. Você também pode acessar nossa configuração guiada que leva apenas 5 minutos para conectar seu WhatsApp Business."
        },
        {
          q: "Preciso ter WhatsApp Business para usar?",
          a: "Sim, nossa plataforma é projetada especificamente para o WhatsApp Business API. Se você ainda usa WhatsApp pessoal, podemos ajudar na migração."
        },
        {
          q: "Quanto tempo leva para configurar?",
          a: "A configuração básica leva cerca de 5-10 minutos. Para customizações avançadas, nosso time de sucesso do cliente oferece suporte personalizado."
        }
      ]
    },
    {
      category: "Recursos e Funcionalidades",
      questions: [
        {
          q: "Como funciona a IA para responder automaticamente?",
          a: "Nossa IA analisa o contexto da conversa, histórico do cliente e sua base de conhecimento para gerar respostas personalizadas e relevantes em tempo real."
        },
        {
          q: "Posso personalizar as respostas da IA?",
          a: "Sim! Você pode treinar a IA com suas próprias respostas, definir tom de voz, e criar regras específicas para diferentes tipos de clientes."
        },
        {
          q: "A plataforma se integra com meu CRM?",
          a: "Sim, oferecemos integrações nativas com os principais CRMs do mercado: HubSpot, Salesforce, Pipedrive, RD Station e muitos outros."
        }
      ]
    },
    {
      category: "Planos e Preços",
      questions: [
        {
          q: "Qual a diferença entre os planos?",
          a: "O plano Starter é ideal para pequenas empresas, o Professional para médias empresas com mais automações, e o Enterprise para grandes corporações com recursos avançados."
        },
        {
          q: "Como funciona a contratação?",
          a: "A contratação é simples e direta. Escolha seu plano, faça o pagamento e em até 24h sua IA estará configurada e operando."
        },
        {
          q: "Como funciona a cobrança?",
          a: "A cobrança é mensal ou anual, com desconto para pagamento anual. Você pode cancelar a qualquer momento."
        }
      ]
    },
    {
      category: "Segurança e Privacidade",
      questions: [
        {
          q: "Meus dados estão seguros?",
          a: "Sim! Utilizamos criptografia end-to-end, servidores em nuvem certificados ISO 27001 e seguimos rigorosamente a LGPD."
        },
        {
          q: "Vocês armazenam as conversas dos clientes?",
          a: "As conversas são armazenadas de forma criptografada apenas pelo tempo necessário para o funcionamento do serviço, seguindo as melhores práticas de privacidade."
        }
      ]
    }
  ];

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      qa => 
        qa.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
        qa.a.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

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
              <span className="luxury-text">Central de</span> <span className="luxury-accent font-medium">Ajuda</span>
            </h1>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-8"></div>
            <p className="text-xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
              Encontre respostas rápidas para suas dúvidas ou entre em contato com nosso suporte especializado
            </p>
          </div>

          {/* Search */}
          <div className="luxury-card p-6 rounded-xl mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Pesquisar na base de conhecimento..."
                className="luxury-input w-full py-4 pl-12 pr-4 rounded-lg text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"></i>
            </div>
          </div>

          {/* Quick Contact */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <div className="luxury-card p-6 rounded-xl text-center">
              <div className="luxury-glass w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fab fa-whatsapp text-2xl text-accent"></i>
              </div>
              <h3 className="text-xl font-medium mb-3">WhatsApp</h3>
              <p className="text-muted-foreground mb-4">
                Fale conosco diretamente pelo WhatsApp
              </p>
              <a 
                href="https://wa.me/5511999999999" 
                className="text-accent hover:text-accent/80 transition-colors font-medium"
              >
                (11) 9999-9999 →
              </a>
            </div>

            <div className="luxury-card p-6 rounded-xl text-center">
              <div className="luxury-glass w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-envelope text-2xl text-accent"></i>
              </div>
              <h3 className="text-xl font-medium mb-3">Email</h3>
              <p className="text-muted-foreground mb-4">
                Envie sua dúvida por email
              </p>
              <a 
                href="mailto:contato@secretariaai.com" 
                className="text-accent hover:text-accent/80 transition-colors font-medium"
              >
                contato@secretariaai.com →
              </a>
            </div>
          </div>

          {/* FAQs */}
          <section>
            <h2 className="text-3xl font-light mb-8 text-center luxury-text">
              Perguntas Frequentes
            </h2>
            
            {filteredFaqs.length === 0 ? (
              <div className="luxury-card p-8 rounded-xl text-center">
                <i className="fas fa-search text-4xl text-muted-foreground mb-4"></i>
                <p className="text-muted-foreground">
                  Nenhuma pergunta encontrada para "{searchTerm}"
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {filteredFaqs.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="luxury-card p-8 rounded-xl">
                    <h3 className="text-xl font-medium mb-6 luxury-accent">
                      {category.category}
                    </h3>
                    <div className="space-y-6">
                      {category.questions.map((qa, qaIndex) => (
                        <div key={qaIndex} className="border-b border-border last:border-b-0 pb-6 last:pb-0">
                          <h4 className="text-lg font-medium mb-3 text-foreground">
                            {qa.q}
                          </h4>
                          <p className="text-muted-foreground leading-relaxed">
                            {qa.a}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Contact CTA */}
          <div className="luxury-card p-8 rounded-xl text-center mt-12">
            <h3 className="text-2xl font-medium mb-4 luxury-accent">
              Não encontrou sua resposta?
            </h3>
            <p className="text-muted-foreground mb-6">
              Nossa equipe de especialistas está pronta para ajudar você
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://wa.me/5511999999999" 
                className="bg-accent text-accent-foreground px-8 py-3 rounded-full font-medium hover:bg-accent/90 transition-colors inline-flex items-center justify-center"
              >
                <i className="fab fa-whatsapp mr-2"></i>
                Conversar no WhatsApp
              </a>
              <a 
                href="mailto:contato@secretariaai.com" 
                className="border border-border text-foreground px-8 py-3 rounded-full font-medium hover:border-accent hover:text-accent transition-colors inline-flex items-center justify-center"
              >
                <i className="fas fa-envelope mr-2"></i>
                Enviar Email
              </a>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}