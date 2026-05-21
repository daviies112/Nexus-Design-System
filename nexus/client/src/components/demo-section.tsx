import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Message {
  id: number;
  type: "user" | "ai";
  content: string;
  time: string;
}

export default function DemoSection() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, type: "user", content: "Olá! Gostaria de agendar uma consulta", time: "14:23" },
    { id: 2, type: "ai", content: "Olá! Claro, vou te ajudar a agendar. Qual é o melhor dia e horário para você?", time: "14:23" },
    { id: 3, type: "user", content: "Terça-feira à tarde seria perfeito", time: "14:24" },
    { id: 4, type: "ai", content: "Perfeito! Tenho disponibilidade na terça às 14h ou às 16h. Qual prefere?", time: "14:24" },
    { id: 5, type: "user", content: "14h está ótimo!", time: "14:25" },
    { id: 6, type: "ai", content: "✅ Agendado! Terça, 14h. Acabei de enviar um convite para seu email com o link da reunião. Até lá!", time: "14:25" }
  ]);

  const [isPlaying, setIsPlaying] = useState(false);

  const playDemo = () => {
    setIsPlaying(true);
    setMessages([]);
    
    // Simulate typing messages one by one
    const demoMessages = [
      { id: 1, type: "user", content: "Olá! Gostaria de agendar uma consulta", time: "14:23" },
      { id: 2, type: "ai", content: "Olá! Claro, vou te ajudar a agendar. Qual é o melhor dia e horário para você?", time: "14:23" },
      { id: 3, type: "user", content: "Terça-feira à tarde seria perfeito", time: "14:24" },
      { id: 4, type: "ai", content: "Perfeito! Tenho disponibilidade na terça às 14h ou às 16h. Qual prefere?", time: "14:24" },
      { id: 5, type: "user", content: "14h está ótimo!", time: "14:25" },
      { id: 6, type: "ai", content: "✅ Agendado! Terça, 14h. Acabei de enviar um convite para seu email com o link da reunião. Até lá!", time: "14:25" }
    ] as Message[];

    demoMessages.forEach((message, index) => {
      setTimeout(() => {
        setMessages(prev => [...prev, message]);
        if (index === demoMessages.length - 1) {
          setIsPlaying(false);
        }
      }, (index + 1) * 1500);
    });
  };

  return (
    <section id="demo" className="py-32 luxury-gradient nexus-circuit-lines relative">
      <div className="max-w-5xl mx-auto px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="luxury-glass inline-flex items-center px-6 py-3 rounded-full mb-8">
            <span className="text-sm font-light text-muted-foreground tracking-wide">
              Demonstração ao Vivo
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-light tracking-tight mb-8" data-testid="demo-title">
            <span className="luxury-text">Fluxo Inteligente</span><br/>
            <span className="luxury-accent">de Conversa</span>
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
            Veja nossa IA entender o contexto, gerenciar agendamentos complexos<br/>
            e executar processos empresariais autonomamente
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Premium Chat Interface */}
          <div className="luxury-card rounded-3xl overflow-hidden max-w-md w-full animate-breathe mx-auto lg:mx-0" data-testid="whatsapp-demo">
            {/* Elegant Header */}
            <div className="bg-card border-b border-border px-6 py-6 flex items-center space-x-4">
              <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
              <div className="flex-1">
                <div className="font-medium text-foreground">Assistente Executivo</div>
                <div className="text-muted-foreground text-sm font-light">Sempre Disponível</div>
              </div>
              <div className="w-8 h-8 luxury-glass rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
              </div>
            </div>
            
            {/* Premium Chat Container */}
            <div className="chat-container bg-card p-6 space-y-4 min-h-[320px]">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === "ai" ? "justify-end" : "justify-start"}`}>
                  <div className={`px-5 py-4 rounded-2xl max-w-[85%] message-bubble transition-all duration-300 ${
                    message.type === "ai" 
                      ? "luxury-glass text-foreground ml-4" 
                      : "bg-accent/10 border border-accent/20 text-foreground mr-4"
                  }`}>
                    <p className="text-sm font-light leading-relaxed">{message.content}</p>
                    <span className={`text-xs mt-2 block font-light ${
                      message.type === "ai" ? "text-muted-foreground" : "text-accent/80"
                    }`}>{message.time}</span>
                  </div>
                </div>
              ))}
              {isPlaying && (
                <div className="flex justify-end">
                  <div className="bg-secondary text-secondary-foreground p-3 rounded-lg max-w-xs">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-secondary-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-secondary-foreground rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-secondary-foreground rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Premium Action Button */}
            <div className="p-6 border-t border-border">
              <Button 
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 py-4 text-sm font-medium rounded-full minimal-shadow transition-all duration-300 hover:scale-105" 
                onClick={playDemo} 
                disabled={isPlaying}
                data-testid="start-demo-button"
              >
                {isPlaying ? "Processando..." : "Iniciar Demo ao Vivo"}
              </Button>
            </div>
          </div>
          
          {/* Features Highlight */}
          <div className="space-y-6">
            <div className="bg-card border border-border p-6 rounded-xl nexus-card-accent" data-testid="feature-contextual">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <i className="fas fa-brain text-primary text-xl"></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Inteligência Contextual</h3>
                  <p className="text-muted-foreground">Entende o contexto da conversa e responde de forma natural e personalizada.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card border border-border p-6 rounded-xl" data-testid="feature-scheduling">
              <div className="flex items-start space-x-4">
                <div className="bg-accent/10 p-3 rounded-lg">
                  <i className="fas fa-calendar-plus text-accent text-xl"></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Agendamento Automático</h3>
                  <p className="text-muted-foreground">Agenda reuniões automaticamente na sua agenda e envia convites por email.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card border border-border p-6 rounded-xl" data-testid="feature-followup">
              <div className="flex items-start space-x-4">
                <div className="bg-accent/10 p-3 rounded-lg">
                  <i className="fas fa-paper-plane text-accent text-xl"></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Follow-up Inteligente</h3>
                  <p className="text-muted-foreground">Faz follow-ups personalizados no momento certo para maximizar conversões.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card border border-border p-6 rounded-xl" data-testid="feature-analytics">
              <div className="flex items-start space-x-4">
                <div className="bg-accent/10 p-3 rounded-lg">
                  <i className="fas fa-chart-line text-accent text-xl"></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Analytics em Tempo Real</h3>
                  <p className="text-muted-foreground">Dashboard completo com métricas de conversão e ROI mensurável.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
