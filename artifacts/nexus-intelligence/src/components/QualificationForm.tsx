import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  companySize: string;
  revenue: string;
  leadsVolume: string;
  painPoint: string;
  timeline: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  lgpdConsent: boolean;
}

const initialData: FormData = {
  companySize: "", revenue: "", leadsVolume: "", painPoint: "", timeline: "",
  name: "", company: "", phone: "", email: "", lgpdConsent: false,
};

function suggestPlan(score: number) {
  if (score >= 70) return { plan: "Nexus Pro", price: "R$200/mês", color: "#FF5A1F" };
  return { plan: "Nexus Essencial", price: "R$200/mês", color: "#00CC7A" };
}

const steps = [
  { id: 1, title: "Tamanho da sua operação" },
  { id: 2, title: "Faturamento mensal" },
  { id: 3, title: "Volume de revendedoras" },
  { id: 4, title: "Sua maior dificuldade" },
  { id: 5, title: "Quando quer automatizar" },
  { id: 6, title: "Seus dados de contato" },
  { id: 7, title: "Proteção de dados (LGPD)" },
];

export default function QualificationForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(initialData);
  const [submitted, setSubmitted] = useState(false);
  const [suggestion, setSuggestion] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const update = (field: keyof FormData, value: string | boolean) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    const validators: Record<number, boolean> = {
      1: !!data.companySize, 2: !!data.revenue, 3: !!data.leadsVolume,
      4: !!data.painPoint, 5: !!data.timeline,
      6: !!(data.name && data.company && data.phone && data.email),
      7: data.lgpdConsent,
    };
    if (!validators[step]) {
      toast({ title: "Campo obrigatório", description: "Preencha antes de continuar.", variant: "destructive" });
      return;
    }
    if (step < 7) setStep(step + 1);
  };

  const handleSubmit = async () => {
    if (!data.lgpdConsent) {
      toast({ title: "LGPD obrigatório", description: "Aceite a política de privacidade para continuar.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/formulario-personalizado", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: data.name, email: data.email, telefone: data.phone, empresa: data.company,
          tamanhoEmpresa: data.companySize, receita: data.revenue, volumeLeads: data.leadsVolume,
          pontosDor: data.painPoint, timeline: data.timeline, lgpdConsent: true,
          lgpdConsentDate: new Date().toISOString(),
        }),
      });
      const result = await res.json();
      const plan = suggestPlan(result.score || 60);
      setSuggestion({ ...plan, name: data.name, score: result.score });
      setSubmitted(true);
    } catch {
      toast({ title: "Erro ao enviar", description: "Tente novamente.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = (step / 7) * 100;

  const RadioOption = ({ field, value, label }: { field: keyof FormData; value: string; label: string }) => (
    <button
      type="button"
      onClick={() => update(field, value)}
      className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
        data[field] === value
          ? "border-[#FF5A1F] bg-[#FF5A1F]/10 text-white"
          : "border-[#1E3828] bg-[#0C1A12] text-[#C4DDD0] hover:border-[#FF5A1F]/40"
      }`}
    >
      <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
        data[field] === value ? "border-[#FF5A1F]" : "border-[#4A6A58]"
      }`}>
        {data[field] === value && <div className="w-2.5 h-2.5 rounded-full bg-[#FF5A1F]"></div>}
      </div>
      <span className="font-medium text-sm">{label}</span>
    </button>
  );

  if (submitted && suggestion) {
    return (
      <section id="qualificacao" className="bg-[#060F0A] py-24 px-6 border-t border-[#1E3828]">
        <div className="max-w-xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#0C1A12] border border-[#1E3828] rounded-3xl p-10">
            <div className="w-16 h-16 bg-[#00CC7A]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-[#00CC7A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-syne font-extrabold text-2xl text-white mb-2">
              Perfeito, {suggestion.name.split(" ")[0]}!
            </h3>
            <p className="text-[#7AA88E] mb-6">Nossa equipe vai entrar em contato via WhatsApp em até 2 horas.</p>
            <div className="bg-[#FF5A1F]/10 border border-[#FF5A1F]/30 rounded-2xl p-6 mb-6">
              <div className="text-[#FF5A1F] text-xs font-bold uppercase tracking-wider mb-2">Plano recomendado</div>
              <div className="font-syne font-extrabold text-3xl text-white">{suggestion.plan}</div>
              <div className="text-[#FF5A1F] text-xl font-bold mt-1">{suggestion.price}</div>
              <div className="text-[#7AA88E] text-sm mt-2">Tudo incluso, sem taxas escondidas.</div>
            </div>
            <button
              onClick={() => { setSubmitted(false); setStep(1); setData(initialData); }}
              className="text-[#7AA88E] hover:text-white text-sm transition-colors"
            >
              Preencher novamente
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="qualificacao" className="bg-[#060F0A] py-24 md:py-32 px-6 border-t border-[#1E3828]">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <h2 className="font-syne font-bold text-3xl md:text-4xl text-white tracking-tight">
            Receba sua proposta
            <span className="text-[#FF5A1F]"> personalizada.</span>
          </h2>
          <p className="text-[#7AA88E] text-base mt-4 leading-relaxed">2 minutos para receber uma proposta personalizada.</p>
        </motion.div>

        <div className="bg-[#0C1A12] border border-[#1E3828] rounded-3xl p-8">
          <div className="mb-8">
            <div className="flex justify-between text-xs text-[#7AA88E] mb-2">
              <span>Pergunta {step} de 7</span>
              <span>{Math.round(progress)}% concluído</span>
            </div>
            <div className="h-1.5 bg-[#1E3828] rounded-full overflow-hidden">
              <div className="h-full bg-[#FF5A1F] rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="font-syne font-bold text-xl text-white mb-6">{steps[step - 1].title}</h3>

              {step === 1 && (
                <div className="space-y-3">
                  {[
                    { value: "solo", label: "Trabalho sozinha" },
                    { value: "small", label: "2–15 revendedoras" },
                    { value: "medium", label: "15–50 revendedoras" },
                    { value: "large", label: "50+ revendedoras" },
                  ].map(o => <RadioOption key={o.value} field="companySize" {...o} />)}
                </div>
              )}

              {step === 2 && (
                <div className="space-y-3">
                  {[
                    { value: "low", label: "Até R$ 10.000/mês" },
                    { value: "medium", label: "R$ 10.000 – R$ 50.000/mês" },
                    { value: "high", label: "R$ 50.000 – R$ 200.000/mês" },
                    { value: "enterprise", label: "Acima de R$ 200.000/mês" },
                  ].map(o => <RadioOption key={o.value} field="revenue" {...o} />)}
                </div>
              )}

              {step === 3 && (
                <div className="space-y-3">
                  {[
                    { value: "low", label: "Menos de 20 revendedoras" },
                    { value: "medium", label: "20 – 100 revendedoras" },
                    { value: "high", label: "100 – 500 revendedoras" },
                    { value: "enterprise", label: "Mais de 500 revendedoras" },
                  ].map(o => <RadioOption key={o.value} field="leadsVolume" {...o} />)}
                </div>
              )}

              {step === 4 && (
                <div className="space-y-3">
                  {[
                    { value: "delay", label: "Cobrança manual toma muito tempo" },
                    { value: "fiscal", label: "Emissão de nota fiscal é um pesadelo" },
                    { value: "stock", label: "Estoque sempre desatualizado" },
                    { value: "24h", label: "Não consigo acompanhar todas as revendedoras" },
                  ].map(o => <RadioOption key={o.value} field="painPoint" {...o} />)}
                </div>
              )}

              {step === 5 && (
                <div className="space-y-3">
                  {[
                    { value: "immediate", label: "Esta semana (urgente)" },
                    { value: "month", label: "Próximo mês" },
                    { value: "quarter", label: "Próximo trimestre" },
                    { value: "exploring", label: "Ainda estou pesquisando" },
                  ].map(o => <RadioOption key={o.value} field="timeline" {...o} />)}
                </div>
              )}

              {step === 6 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { field: "name" as const, label: "Nome completo *", placeholder: "Seu nome" },
                    { field: "company" as const, label: "Empresa *", placeholder: "Nome da empresa" },
                    { field: "phone" as const, label: "WhatsApp *", placeholder: "(11) 99999-9999" },
                    { field: "email" as const, label: "Email *", placeholder: "seu@email.com" },
                  ].map(f => (
                    <div key={f.field}>
                      <label className="text-[#C4DDD0] text-xs font-semibold block mb-1.5">{f.label}</label>
                      <input
                        type={f.field === "email" ? "email" : "text"}
                        value={data[f.field]}
                        onChange={e => update(f.field, e.target.value)}
                        placeholder={f.placeholder}
                        className="w-full bg-[#060F0A] border border-[#1E3828] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FF5A1F] transition-colors placeholder-[#4A6A58]"
                      />
                    </div>
                  ))}
                </div>
              )}

              {step === 7 && (
                <div>
                  <div className="bg-[#060F0A] border border-[#1E3828] rounded-xl p-5 mb-6 text-sm text-[#7AA88E] space-y-2">
                    <p className="text-[#C4DDD0] font-semibold mb-3">Política de Privacidade — LGPD</p>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>Seus dados serão usados apenas para elaborar sua proposta personalizada.</li>
                      <li>Não compartilhamos informações com terceiros sem autorização.</li>
                      <li>Você pode solicitar exclusão dos seus dados a qualquer momento.</li>
                      <li>Dados armazenados por até 2 anos para fins comerciais.</li>
                    </ul>
                  </div>
                  <button
                    type="button"
                    onClick={() => update("lgpdConsent", !data.lgpdConsent)}
                    className={`flex items-start gap-3 w-full text-left p-4 rounded-xl border transition-all ${
                      data.lgpdConsent ? "border-[#FF5A1F] bg-[#FF5A1F]/10" : "border-[#1E3828] bg-[#060F0A]"
                    }`}
                  >
                    <div className={`w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center mt-0.5 transition-all ${
                      data.lgpdConsent ? "border-[#FF5A1F] bg-[#FF5A1F]" : "border-[#4A6A58]"
                    }`}>
                      {data.lgpdConsent && (
                        <svg className="w-3 h-3 text-[#1A0500]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-[#C4DDD0] text-sm">
                      Li e aceito a política de privacidade e autorizo o tratamento dos meus dados pessoais conforme descrito acima, em conformidade com a LGPD. *
                    </span>
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex gap-3 mt-8">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-3 border border-[#1E3828] text-[#7AA88E] rounded-xl hover:border-[#FF5A1F]/40 hover:text-white transition-all text-sm font-medium"
              >
                Voltar
              </button>
            )}
            {step < 7 ? (
              <button
                onClick={nextStep}
                className="flex-1 bg-[#FF5A1F] text-[#1A0500] font-extrabold py-3 rounded-xl text-sm hover:bg-[#FF5A1F]/90 transition-all"
              >
                Continuar
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !data.lgpdConsent}
                className="flex-1 bg-[#FF5A1F] text-[#1A0500] font-extrabold py-3 rounded-xl text-sm hover:bg-[#FF5A1F]/90 transition-all disabled:opacity-60"
              >
                {isSubmitting ? "Enviando..." : "Receber proposta personalizada"}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
