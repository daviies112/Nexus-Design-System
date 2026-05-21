import { motion } from "framer-motion";

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

export default function Funcionalidades() {
  return (
    <div className="min-h-screen bg-[#060F0A]">
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <span className="text-[#FF5A1F] text-xs font-bold tracking-[0.2em] uppercase block mb-4">TUDO QUE SUA OPERAÇÃO PRECISA</span>
          <h1 className="font-syne font-extrabold text-5xl text-white mb-4">
            Da prospecção à negativação.
          </h1>
          <p className="text-[#7AA88E] text-xl max-w-2xl mx-auto">
            Cada módulo resolve uma dor real e mensurável. Cada funcionalidade existia para eliminar um processo manual.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map((mod, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className="bg-[#0C1A12] border border-[#1E3828] rounded-2xl p-7 hover:border-[#FF5A1F]/40 transition-all group"
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
              <h3 className="font-syne font-bold text-[17px] text-white group-hover:text-[#FF5A1F] transition-colors mb-2">{mod.title}</h3>
              <p className="text-[#7AA88E] text-sm leading-relaxed mb-3">{mod.desc}</p>
              <div className="text-[10px] font-semibold text-[#4A6A58] uppercase tracking-wider">{mod.plans}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a href="/checkout?plan=pro" className="inline-block bg-[#FF5A1F] text-[#1A0500] font-extrabold px-10 py-4 rounded-xl text-lg hover:-translate-y-0.5 transition-transform shadow-lg">
            Começar com o Nexus Pro — R$997/mês
          </a>
          <p className="text-[#7AA88E] text-sm mt-3">Setup em 7 dias. Sem fidelidade. Sem multa de cancelamento.</p>
        </div>
      </div>
    </div>
  );
}
