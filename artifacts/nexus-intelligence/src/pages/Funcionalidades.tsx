import { motion } from "framer-motion";
import { useState } from "react";

const modules = [
  { icon: "🤖", title: "Amanda AI — Atendimento WhatsApp", desc: "Agente conversacional com memória de contexto, entende texto e áudio, divide mensagens longas naturalmente, sabe quando pausar para um humano e reativa sozinha quando ele encerra.", tag: "IA", plans: "Todos os planos" },
  { icon: "📋", title: "Formulário de Qualificação", desc: "Design personalizado com identidade visual da empresa, sistema de pontuação configurável, URL única por lead e follow-up automático para quem não preencheu.", tag: "Prospecção", plans: "Todos os planos" },
  { icon: "🔍", title: "Consulta CPF Automática (Datacorp)", desc: "Verificação de validade, nome, endereço, processos judiciais e pendências financeiras. Score 0–100 com aprovação automática (80+), análise manual (50–79) ou reprovação (0–49).", tag: "Jurídico", plans: "Todos os planos — R$1,99/consulta" },
  { icon: "✍️", title: "Contrato Digital com Assinatura Eletrônica", desc: "Gerado automaticamente com os dados do formulário, enviado por WhatsApp e e-mail. Monitoramento a cada 1 minuto. Follow-up automático para contratos não assinados.", tag: "Jurídico", plans: "Todos os planos" },
  { icon: "📅", title: "Agendamento Automático (Google Calendar)", desc: "Cria reuniões, verifica disponibilidade, detecta conflitos, envia lembretes 2h e 5min antes. Cancelamento e reagendamento sem intervenção humana.", tag: "Reuniões", plans: "Todos os planos" },
  { icon: "🎙️", title: "Gravação e Transcrição de Reuniões", desc: "Grava automaticamente, converte áudio, transcreve com Gemini 2.5 Pro, gera resumo executivo e envia por WhatsApp e e-mail. Histórico completo armazenado.", tag: "Reuniões", plans: "Todos os planos" },
  { icon: "💰", title: "Pix Automático (Efi Bank)", desc: "No dia configurado, gera cobrança Pix para cada revendedora com saldo pendente, envia QR code pelo WhatsApp e monitora o pagamento. Ao confirmar, encerra o ciclo automaticamente.", tag: "Financeiro", plans: "Pro e Max — R$3,00/transação" },
  { icon: "📸", title: "Análise de Comprovante por Visão Computacional", desc: "Gemini Vision extrai valor, data, horário e chave Pix de qualquer comprovante enviado por foto. Atualiza o financeiro da revendedora sem nenhum humano conferir.", tag: "Financeiro", plans: "Pro e Max" },
  { icon: "⚠️", title: "Follow-up de Inadimplência D+5/D+10/D+15", desc: "D+5: primeira cobrança automática. D+10: segunda cobrança com aviso jurídico. D+15: bloqueio do sistema para a revendedora. Tudo via WhatsApp, sem nenhum humano ligar.", tag: "Financeiro", plans: "Pro e Max" },
  { icon: "📦", title: "Maleta 100% Automatizada", desc: "Geração automática de maleta, confirmação de recebimento via Pix, rolagem de peças automatizada ao fim do ciclo e declaração de sinistro para peças perdidas ou danificadas.", tag: "Logística", plans: "Pro e Max" },
  { icon: "🚚", title: "Melhor Envio com Automação Completa", desc: "Fila de expedição automática, notificação de nova maleta, rastreamento por WhatsApp e etiqueta de devolução (RMA). Custo de frete cobrado com margem aplicada automaticamente.", tag: "Logística", plans: "Pro e Max" },
  { icon: "🔄", title: "Anti-churn (D+3, D+10, D+20)", desc: "D+3 pós-entrega: boas-vindas e dica de stories. D+10: sugestão de foto de produto. D+20: mensagem de urgência com estratégia de vendas. Tudo automático via WhatsApp.", tag: "Retenção", plans: "Start: apenas D+3 · Pro e Max: completo" },
  { icon: "🩺", title: "RMA com Análise de Foto por IA", desc: "A Amanda detecta automaticamente quando uma revendedora descreve um defeito. A revendedora envia foto — o Gemini Vision classifica, verifica política e aprova ou rejeita o RMA.", tag: "Logística", plans: "Pro e Max" },
  { icon: "🧾", title: "NF-e Automática via Bling", desc: "Emissão individual e em lote (toda segunda-feira às 7h). Cobrado por nota emitida com margem aplicada pela Nexus. DANFE enviado por e-mail e WhatsApp automaticamente.", tag: "Fiscal", plans: "Pro e Max" },
  { icon: "❌", title: "Negativação Serasa D+17", desc: "Se a revendedora chegar ao D+17 sem pagar após todos os follow-ups, o sistema negativa automaticamente no Serasa. Notificação automática para a revendedora e para a empresa.", tag: "Jurídico", plans: "Max — R$25,00/ação" },
  { icon: "🧠", title: "Plano de Ação IA por Consultora", desc: "Diagnóstico individual gerado por IA para cada revendedora com base no histórico de vendas, inadimplência e engajamento. Entregue via WhatsApp com estratégias personalizadas.", tag: "IA", plans: "Max — R$5,00/geração" },
  { icon: "🏆", title: "Ranking e Gamificação", desc: "Níveis Bronze, Prata, Ouro, Diamante e Platina por volume de vendas. Ranking mensal e histórico. Badges e conquistas. Loja de pontos para trocar por produtos ou benefícios.", tag: "Engajamento", plans: "Todos os planos" },
  { icon: "🔗", title: "Sistema de Indicação", desc: "Link único por revendedora com rastreamento completo. Bônus automáticos por indicação cadastrada, aprovada e ativa. No Pro/Max, o bônus é embutido no repasse via Pix.", tag: "Crescimento", plans: "Todos os planos" },
  { icon: "📊", title: "CRM Completo", desc: "Histórico de todos os contatos, status, tags, observações, prioridade, origem, responsável e valor total. Dashboard unificado com visão de toda a operação.", tag: "Gestão", plans: "Todos os planos" },
  { icon: "🗂️", title: "Workspace Colaborativo", desc: "Kanban (estilo Trello) e páginas de documentação (estilo Notion). Boards, listas, cards, drag and drop, hierarquia de páginas. Multi-tenant isolado por cliente.", tag: "Gestão", plans: "Todos os planos" },
  { icon: "📢", title: "Publicação em 6 Redes Sociais", desc: "Instagram, Facebook, LinkedIn, Twitter/X, YouTube e TikTok com adaptação automática de formato, agendamento e biblioteca de mídia inclusos.", tag: "Marketing", plans: "Todos os planos" },
  { icon: "💳", title: "Integração Bancária (Open Banking)", desc: "Múltiplos bancos conectados, saldos em tempo real, transações consolidadas, categorização automática e previsão de fluxo de caixa.", tag: "Financeiro", plans: "Todos os planos" },
  { icon: "🔎", title: "OCR de Despesas Financeiras", desc: "Análise de boletos, NF-e, recibos e comprovantes por foto com Gemini Vision. Extrai tipo, valores, datas, códigos de barras e PIX. Status de extração em tempo real.", tag: "Financeiro", plans: "Todos os planos" },
  { icon: "📡", title: "Campanhas com Rastreamento por Origem", desc: "Links de WhatsApp pré-preenchidos com rastreamento por origem (Facebook, Instagram, Google, YouTube, TikTok). A Amanda identifica de qual campanha veio cada lead.", tag: "Marketing", plans: "Todos os planos" },
];

const tagColors: Record<string, string> = {
  IA: "#00CC7A", Prospecção: "#FF5A1F", Jurídico: "#8B5CF6", Reuniões: "#3B82F6",
  Financeiro: "#F59E0B", Logística: "#EC4899", Retenção: "#00CC7A", Fiscal: "#FF5A1F",
  Engajamento: "#F59E0B", Crescimento: "#00CC7A", Gestão: "#3B82F6", Marketing: "#EC4899",
};

const allTags = ["Todos", ...Array.from(new Set(modules.map(m => m.tag)))];

export default function Funcionalidades() {
  const [activeTag, setActiveTag] = useState("Todos");
  const filtered = activeTag === "Todos" ? modules : modules.filter(m => m.tag === activeTag);

  return (
    <div className="min-h-screen bg-[#060F0A]">

      {/* ── HERO — left-aligned, com bordas e personalidade ── */}
      <section className="relative border-b border-[#1E3828] pt-32 pb-16 overflow-hidden">
        {/* Glow de fundo */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 80% at 80% 50%, rgba(255,90,31,0.05) 0%, transparent 60%)" }} />
        {/* Linhas brand verticais — lado direito */}
        <svg className="absolute right-0 top-0 h-full w-1/3 opacity-[0.06]" viewBox="0 0 400 600" preserveAspectRatio="none">
          {[0, 50, 110, 190, 290, 420].map((x, i) => (
            <line key={i} x1={x} y1="0" x2={x} y2="600" stroke="#FF5A1F" strokeWidth="1" />
          ))}
        </svg>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-2xl">
            <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-[#FF5A1F]" />
              <span className="text-[#FF5A1F] text-xs font-bold tracking-[0.25em] uppercase">Tudo que sua operação precisa</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="font-syne font-extrabold text-5xl md:text-6xl text-white leading-tight mb-5"
            >
              Da prospecção<br />
              <span className="text-[#FF5A1F]">à negativação.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="text-[#7AA88E] text-lg leading-relaxed mb-8"
            >
              Cada módulo resolve uma dor real e mensurável. Cada funcionalidade existe para eliminar um processo manual.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="flex items-center gap-4"
            >
              <a
                href="/comparacao"
                className="inline-flex items-center gap-2 bg-[#FF5A1F] text-[#1A0500] font-extrabold px-7 py-3.5 rounded-full text-sm hover:shadow-[0_0_30px_rgba(255,90,31,0.4)] hover:-translate-y-0.5 transition-all"
              >
                Ver planos →
              </a>
              <span className="text-[#4A6A58] text-sm">{modules.length} módulos incluídos</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FILTRO POR CATEGORIA ── */}
      <section className="sticky top-20 z-30 bg-[#060F0A]/95 backdrop-blur-md border-b border-[#1E3828] py-3">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className="flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all"
                style={
                  activeTag === tag
                    ? { background: tag === "Todos" ? "#FF5A1F" : (tagColors[tag] || "#FF5A1F"), color: "#1A0500" }
                    : { background: "#0C1A12", color: "#7AA88E", border: "1px solid #1E3828" }
                }
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── GRID DE MÓDULOS ── */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((mod, i) => (
            <motion.div
              key={mod.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className="bg-[#0C1A12] border border-[#1E3828] rounded-2xl p-7 hover:border-[#FF5A1F]/30 hover:shadow-[0_0_24px_rgba(255,90,31,0.04)] transition-all group cursor-default"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl">{mod.icon}</div>
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
                  style={{ background: (tagColors[mod.tag] || "#FF5A1F") + "20", color: tagColors[mod.tag] || "#FF5A1F" }}
                >
                  {mod.tag}
                </span>
              </div>
              <h3 className="font-syne font-bold text-[16px] text-white group-hover:text-[#FF5A1F] transition-colors mb-2">{mod.title}</h3>
              <p className="text-[#7AA88E] text-sm leading-relaxed mb-3">{mod.desc}</p>
              <div className="text-[10px] font-semibold text-[#4A6A58] uppercase tracking-wider border-t border-[#1E3828] pt-3">{mod.plans}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a href="/checkout?plan=pro" className="inline-block bg-[#FF5A1F] text-[#1A0500] font-extrabold px-10 py-4 rounded-full text-base hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(255,90,31,0.35)] transition-all">
            Começar com o Nexus Pro — R$997/mês
          </a>
          <p className="text-[#7AA88E] text-sm mt-3">Setup em 7 dias · Sem fidelidade · Sem multa de cancelamento</p>
        </div>
      </section>
    </div>
  );
}
