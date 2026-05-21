import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { NexusIcon } from "@/components/NexusIcon";
import { useToast } from "@/hooks/use-toast";

const PLANS: Record<string, { name: string; price: number; desc: string; features: string[] }> = {
  start: {
    name: "Nexus Start",
    price: 649,
    desc: "Até 30 leads/mês · Até 40 revendedoras ativas",
    features: [
      "Amanda AI — atendimento WhatsApp 24/7",
      "Formulário de qualificação personalizado",
      "Consulta CPF automática (Datacorp) — R$1,99/consulta",
      "Contrato digital com assinatura eletrônica",
      "Agendamento automático (Google Calendar)",
      "CRM completo + Workspace colaborativo",
    ],
  },
  pro: {
    name: "Nexus Pro",
    price: 997,
    desc: "Até 70 leads/mês · Revendedoras ilimitadas",
    features: [
      "Tudo do Start, mais:",
      "Pix automático de cobrança (Efi Bank) — R$3,00/transação",
      "Follow-up de inadimplência D+5, D+10, D+15",
      "Maleta 100% automatizada",
      "NF-e automática via Bling",
      "Anti-churn completo D+3, D+10, D+20",
    ],
  },
  max: {
    name: "Nexus Max",
    price: 1449,
    desc: "Ilimitado em tudo",
    features: [
      "Tudo do Pro, mais:",
      "Negativação Serasa D+17 automática — R$25,00/ação",
      "Plano de ação IA por consultora — R$5,00/geração",
      "Suporte via canal dedicado",
      "Acesso prioritário a novas funcionalidades",
      "Ilimitado em leads, revendedoras e admins",
    ],
  },
};

export default function Checkout() {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("pro");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const plan = params.get("plan");
    if (plan && PLANS[plan]) setSelectedPlan(plan);
  }, []);

  const plan = PLANS[selectedPlan] || PLANS.pro;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !company) {
      toast({ title: "Campos obrigatórios", description: "Preencha todos os campos.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1200));
    setIsSubmitting(false);
    setDone(true);
  };

  if (done) {
    return (
      <div className="min-h-screen bg-[#060F0A] flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#0C1A12] border border-[#1E3828] rounded-3xl p-12 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-[#00CC7A]/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-[#00CC7A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-syne font-extrabold text-2xl text-white mb-3">Solicitação recebida!</h2>
          <p className="text-[#7AA88E] mb-2">Nossa equipe vai entrar em contato via WhatsApp em até 2 horas para iniciar o seu setup.</p>
          <p className="text-[#4A6A58] text-sm mb-6">O onboarding é feito em até 7 dias úteis após a confirmação do contrato.</p>
          <a href="/" className="inline-block bg-[#FF5A1F] text-[#1A0500] font-extrabold px-8 py-4 rounded-xl hover:-translate-y-0.5 transition-transform shadow-lg">
            Voltar para o site
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060F0A]">
      <div className="max-w-lg mx-auto px-6 pt-32 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-10">
            <NexusIcon size={48} className="mx-auto mb-4" />
            <h1 className="font-syne font-extrabold text-3xl text-white mb-2">Começar com a Nexus</h1>
            <p className="text-[#7AA88E]">Setup em 7 dias. Sem fidelidade. Cancele quando quiser.</p>
          </div>

          <div className="flex gap-2 mb-6">
            {Object.entries(PLANS).map(([id, p]) => (
              <button
                key={id}
                onClick={() => setSelectedPlan(id)}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  selectedPlan === id
                    ? "bg-[#FF5A1F] text-[#1A0500]"
                    : "bg-[#0C1A12] border border-[#1E3828] text-[#7AA88E] hover:border-[#FF5A1F]/40"
                }`}
              >
                {p.name.replace("Nexus ", "")}<br/>
                <span className={selectedPlan === id ? "text-[#5C1A00]" : "text-[#4A6A58]"}>R${p.price.toLocaleString("pt-BR")}/mês</span>
              </button>
            ))}
          </div>

          <div className="bg-[#0C1A12] border border-[#1E3828] rounded-3xl p-8 mb-6">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#1E3828]">
              <div>
                <div className="text-white font-syne font-bold">{plan.name}</div>
                <div className="text-[#7AA88E] text-sm">{plan.desc}</div>
              </div>
              <div className="text-right">
                <div className="text-[#FF5A1F] font-bold text-lg">R${plan.price.toLocaleString("pt-BR")}/mês</div>
                <div className="text-[#4A6A58] text-xs">cobrança no dia 1</div>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-[#C4DDD0]">
              {plan.features.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#00CC7A] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="bg-[#0C1A12] border border-[#1E3828] rounded-3xl p-8 space-y-4">
            {[
              { label: "Nome completo *", value: name, setter: setName, placeholder: "Seu nome" },
              { label: "Empresa *", value: company, setter: setCompany, placeholder: "Nome da empresa" },
              { label: "Email *", value: email, setter: setEmail, placeholder: "seu@email.com", type: "email" },
              { label: "WhatsApp *", value: phone, setter: setPhone, placeholder: "(11) 99999-9999" },
            ].map((f, i) => (
              <div key={i}>
                <label className="text-[#C4DDD0] text-xs font-semibold block mb-1.5">{f.label}</label>
                <input
                  type={f.type || "text"}
                  value={f.value}
                  onChange={e => f.setter(e.target.value)}
                  placeholder={f.placeholder}
                  className="w-full bg-[#060F0A] border border-[#1E3828] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FF5A1F] transition-colors placeholder-[#4A6A58]"
                />
              </div>
            ))}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#FF5A1F] text-[#1A0500] font-extrabold py-4 rounded-xl text-base mt-2 hover:scale-[1.01] transition-all disabled:opacity-60 shadow-lg"
            >
              {isSubmitting ? "Enviando..." : `Quero o ${plan.name}`}
            </button>
            <p className="text-[#4A6A58] text-xs text-center">Após o envio, nossa equipe entra em contato via WhatsApp em até 2h.</p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
