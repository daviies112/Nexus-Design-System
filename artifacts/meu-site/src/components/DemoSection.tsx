import { useState } from "react";
import { motion } from "framer-motion";

interface Message {
  id: number;
  type: "user" | "ai";
  content: string;
  time: string;
  tag?: string;
  tagColor?: string;
}

const demoMessages: Message[] = [
  { id: 1, type: "user", content: "Oi! A maleta 47 tá toda vendida, preciso fechar as contas", time: "09:12" },
  { id: 2, type: "ai", content: "Oi Ana! A maleta #47 tem R$ 2.340 em aberto com 3 revendedoras. Posso enviar as cobranças agora?", time: "09:12", tag: "Cobrança", tagColor: "#00CC7A" },
  { id: 3, type: "user", content: "Manda sim!", time: "09:12" },
  { id: 4, type: "ai", content: "Cobranças enviadas via WhatsApp para Carla, Júlia e Priscila. NF-e emitida automaticamente. Estoque da maleta #47 zerado ✅", time: "09:13", tag: "Automático", tagColor: "#FF5A1F" },
  { id: 5, type: "user", content: "Perfeito! E as comissões do mês?", time: "09:13" },
  { id: 6, type: "ai", content: "Calculadas! 12 revendedoras, total de R$ 8.760 em vendas. Relatório de comissões gerado e enviado para seu email ✅", time: "09:13", tag: "Relatório", tagColor: "#00CC7A" },
];

const features = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    title: "Cobrança Automática",
    desc: "Régua de cobrança inteligente via WhatsApp para todas as revendedoras.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "Emissão Fiscal Instantânea",
    desc: "NF-e e NFS-e emitidas automaticamente em segundos após cada venda.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    title: "Gestão de Estoque",
    desc: "Maletas, peças e devoluções controladas em tempo real automaticamente.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Comissões Calculadas",
    desc: "Cálculo automático para toda sua rede de revendedoras a cada venda.",
  },
];

export default function DemoSection() {
  const [messages, setMessages] = useState<Message[]>(demoMessages);
  const [isPlaying, setIsPlaying] = useState(false);

  const playDemo = () => {
    setIsPlaying(true);
    setMessages([]);
    demoMessages.forEach((msg, i) => {
      setTimeout(() => {
        setMessages(prev => [...prev, msg]);
        if (i === demoMessages.length - 1) setIsPlaying(false);
      }, (i + 1) * 1200);
    });
  };

  return (
    <section id="demo" className="bg-[#060F0A] py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-syne font-bold text-3xl md:text-4xl text-white tracking-tight">
            Veja a Amanda trabalhando
            <span className="text-[#FF5A1F]"> em tempo real.</span>
          </h2>
          <p className="text-[#7AA88E] text-base mt-4 max-w-xl mx-auto leading-relaxed">
            Em segundos, resolve cobrança, emite nota e atualiza estoque — sem você tocar em nada.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#0C1A12] rounded-3xl overflow-hidden border border-[#1E3828] shadow-2xl max-w-md w-full mx-auto lg:mx-0"
          >
            <div className="flex items-center gap-3 border-b border-[#1E3828] px-5 py-4">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#00CC7A] flex items-center justify-center font-syne font-bold text-[#060F0A] text-sm">A</div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#00CC7A] border-2 border-[#0C1A12] rounded-full"></div>
              </div>
              <div>
                <div className="font-bold text-white text-sm">Amanda AI</div>
                <div className="text-xs text-[#00CC7A]">online agora</div>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#00CC7A] animate-pulse"></div>
                <span className="text-[10px] text-[#7AA88E] font-medium">WhatsApp Business</span>
              </div>
            </div>

            <div className="p-5 space-y-4 min-h-[340px] bg-[#060F0A]">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === "ai" ? "justify-start" : "justify-end"}`}>
                  <div className={`relative max-w-[85%] ${msg.type === "ai" ? "" : ""}`}>
                    <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      msg.type === "ai"
                        ? "bg-[#0C1A12] text-[#F0FAF4] border border-[#1E3828] rounded-tl-sm"
                        : "bg-[#FF5A1F] text-[#1A0500] font-medium rounded-tr-sm"
                    }`}>
                      {msg.content}
                      <span className={`block text-[10px] mt-1 ${msg.type === "ai" ? "text-[#7AA88E]" : "text-[#5C1A00]"}`}>{msg.time}</span>
                    </div>
                    {msg.tag && (
                      <span
                        className="absolute -top-2 -right-2 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
                        style={{ background: msg.tagColor, color: msg.tagColor === "#00CC7A" ? "#060F0A" : "#1A0500" }}
                      >
                        {msg.tag}
                      </span>
                    )}
                  </div>
                </div>
              ))}
              {isPlaying && (
                <div className="flex justify-start">
                  <div className="bg-[#0C1A12] border border-[#1E3828] px-4 py-3 rounded-2xl rounded-tl-sm">
                    <div className="flex gap-1">
                      {[0, 0.15, 0.3].map((d, i) => (
                        <div key={i} className="w-2 h-2 bg-[#7AA88E] rounded-full animate-bounce" style={{ animationDelay: `${d}s` }}></div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-[#1E3828] bg-[#0C1A12]">
              <button
                onClick={playDemo}
                disabled={isPlaying}
                className="w-full bg-[#FF5A1F] text-[#1A0500] font-extrabold py-3 rounded-xl text-sm hover:bg-[#FF5A1F]/90 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isPlaying ? "Amanda trabalhando..." : "Iniciar demonstração"}
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            {features.map((f, i) => (
              <div key={i} className="bg-[#0C1A12] border border-[#1E3828] rounded-2xl p-6 flex gap-4 items-start hover:border-[#FF5A1F]/30 transition-colors">
                <div className="bg-[#FF5A1F]/10 p-3 rounded-xl text-[#FF5A1F] flex-shrink-0">
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-syne font-bold text-white mb-1">{f.title}</h3>
                  <p className="text-[#7AA88E] text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
