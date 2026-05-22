import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { NexusIcon } from "@/components/NexusIcon";
import { useToast } from "@/hooks/use-toast";

const STEPS = [
  { id: 1, title: "Sua empresa", desc: "Informações básicas" },
  { id: 2, title: "Sua operação", desc: "Como você trabalha" },
  { id: 3, title: "Revendedoras", desc: "Seu time de vendas" },
  { id: 4, title: "Comunicação", desc: "Tom e estilo" },
];

export default function PosPagamento() {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [plan, setPlan] = useState("pro");

  const [form, setForm] = useState({
    nomeEmpresa: "",
    whatsapp: "",
    email: "",
    cidade: "",
    segmento: "",
    revendedoras: "",
    maletas: "",
    principalDesafio: "",
    tomComunicacao: "",
    horarioAtendimento: "",
    nomeAmanda: "",
    observacoes: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const p = params.get("plan");
    if (p) setPlan(p);
  }, []);

  const update = (field: keyof typeof form, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    if (!form.nomeEmpresa || !form.whatsapp || !form.email) {
      toast({ title: "Campos obrigatórios", description: "Preencha pelo menos nome da empresa, WhatsApp e email.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsSubmitting(false);
    setDone(true);
  };

  if (done) {
    return (
      <div className="min-h-screen bg-[#060F0A] flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#0C1A12] border border-[#1E3828] rounded-3xl p-12 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-[#00CC7A]/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-[#00CC7A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-syne font-extrabold text-2xl text-white mb-3">Setup iniciado!</h2>
          <p className="text-[#7AA88E] mb-2">A Amanda está sendo configurada para a <strong className="text-white">{form.nomeEmpresa || "sua empresa"}</strong>.</p>
          <p className="text-[#4A6A58] text-sm mb-2">Nossa equipe vai entrar em contato pelo WhatsApp <strong className="text-[#7AA88E]">{form.whatsapp}</strong> em até 2 horas.</p>
          <p className="text-[#4A6A58] text-sm mb-8">O onboarding completo é feito em até 7 dias úteis.</p>
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

          {/* Header */}
          <div className="text-center mb-10">
            <NexusIcon size={40} className="mx-auto mb-4" />
            <div className="inline-flex items-center gap-2 bg-[#00CC7A]/10 border border-[#00CC7A]/20 text-[#00CC7A] text-xs font-bold px-4 py-1.5 rounded-full mb-4">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              Pagamento confirmado!
            </div>
            <h1 className="font-syne font-extrabold text-2xl text-white mb-2">Vamos configurar sua Amanda</h1>
            <p className="text-[#7AA88E] text-sm">Preencha as informações da sua operação para personalizarmos tudo para você.</p>
          </div>

          {/* Step indicators */}
          <div className="flex items-center mb-8">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex items-center flex-1">
                <button
                  onClick={() => step > s.id && setStep(s.id)}
                  className={`flex flex-col items-center ${step > s.id ? "cursor-pointer" : "cursor-default"}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold transition-all ${
                    step === s.id ? "bg-[#FF5A1F] text-[#1A0500] scale-110" :
                    step > s.id ? "bg-[#00CC7A] text-[#001A0E]" :
                    "bg-[#1E3828] text-[#4A6A58]"
                  }`}>
                    {step > s.id ? "✓" : s.id}
                  </div>
                  <span className={`text-[9px] font-bold mt-1 whitespace-nowrap ${step === s.id ? "text-[#FF5A1F]" : step > s.id ? "text-[#00CC7A]" : "text-[#4A6A58]"}`}>
                    {s.title}
                  </span>
                </button>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-px mx-2 transition-colors ${step > s.id ? "bg-[#00CC7A]/40" : "bg-[#1E3828]"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Step content */}
          <div className="bg-[#0C1A12] border border-[#1E3828] rounded-3xl p-8 mb-6">
            <AnimatedStep step={step}>
              {step === 1 && (
                <div className="space-y-4">
                  <p className="text-[#7AA88E] text-sm mb-5">Estas informações são usadas para configurar o perfil da sua empresa na Amanda.</p>
                  {[
                    { label: "Nome da empresa *", field: "nomeEmpresa" as const, placeholder: "Ex: Semijoias Bella Rosa" },
                    { label: "WhatsApp principal *", field: "whatsapp" as const, placeholder: "(11) 99999-9999" },
                    { label: "Email de contato *", field: "email" as const, placeholder: "seu@email.com" },
                    { label: "Cidade / Estado", field: "cidade" as const, placeholder: "Ex: São Paulo – SP" },
                  ].map(f => (
                    <Field key={f.field} label={f.label} value={form[f.field]} onChange={v => update(f.field, v)} placeholder={f.placeholder} />
                  ))}
                  <div>
                    <label className="text-[#C4DDD0] text-xs font-semibold block mb-1.5">Segmento *</label>
                    <select
                      value={form.segmento}
                      onChange={e => update("segmento", e.target.value)}
                      className="w-full bg-[#060F0A] border border-[#1E3828] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FF5A1F] transition-colors"
                    >
                      <option value="">Selecione...</option>
                      <option value="semijoias">Semijoias</option>
                      <option value="joias">Joias</option>
                      <option value="moda">Moda / Acessórios</option>
                      <option value="cosmeticos">Cosméticos</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <p className="text-[#7AA88E] text-sm mb-5">Como é sua operação hoje? Isso define como a Amanda vai agir.</p>
                  <div>
                    <label className="text-[#C4DDD0] text-xs font-semibold block mb-2">Quantas revendedoras ativas você tem?</label>
                    <div className="grid grid-cols-4 gap-2">
                      {["1–10", "11–30", "31–60", "60+"].map(v => (
                        <button key={v} onClick={() => update("revendedoras", v)}
                          className={`py-2.5 rounded-xl text-sm font-bold transition-all ${form.revendedoras === v ? "bg-[#FF5A1F] text-[#1A0500]" : "bg-[#060F0A] border border-[#1E3828] text-[#7AA88E] hover:border-[#FF5A1F]/40"}`}
                        >{v}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-[#C4DDD0] text-xs font-semibold block mb-2">Quantas maletas em circulação?</label>
                    <div className="grid grid-cols-4 gap-2">
                      {["0–5", "6–15", "16–30", "30+"].map(v => (
                        <button key={v} onClick={() => update("maletas", v)}
                          className={`py-2.5 rounded-xl text-sm font-bold transition-all ${form.maletas === v ? "bg-[#FF5A1F] text-[#1A0500]" : "bg-[#060F0A] border border-[#1E3828] text-[#7AA88E] hover:border-[#FF5A1F]/40"}`}
                        >{v}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-[#C4DDD0] text-xs font-semibold block mb-2">Qual seu maior desafio hoje?</label>
                    <div className="space-y-2">
                      {[
                        "Cobranças em atraso",
                        "Controle de maletas",
                        "Emissão de notas fiscais",
                        "Comunicação com revendedoras",
                        "Cadastro e qualificação de leads",
                      ].map(v => (
                        <button key={v} onClick={() => update("principalDesafio", v)}
                          className={`w-full py-2.5 px-4 rounded-xl text-sm font-medium text-left transition-all ${form.principalDesafio === v ? "bg-[#FF5A1F]/10 border border-[#FF5A1F]/50 text-[#FF5A1F]" : "bg-[#060F0A] border border-[#1E3828] text-[#7AA88E] hover:border-[#FF5A1F]/30"}`}
                        >{v}</button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <p className="text-[#7AA88E] text-sm mb-5">Como a Amanda vai se comunicar com suas revendedoras?</p>
                  <div>
                    <label className="text-[#C4DDD0] text-xs font-semibold block mb-2">Horário de atendimento da Amanda</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: "8h–18h (comercial)", value: "8-18" },
                        { label: "8h–20h (estendido)", value: "8-20" },
                        { label: "7h–22h", value: "7-22" },
                        { label: "24h / 7 dias", value: "24h" },
                      ].map(v => (
                        <button key={v.value} onClick={() => update("horarioAtendimento", v.value)}
                          className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${form.horarioAtendimento === v.value ? "bg-[#FF5A1F] text-[#1A0500]" : "bg-[#060F0A] border border-[#1E3828] text-[#7AA88E] hover:border-[#FF5A1F]/40"}`}
                        >{v.label}</button>
                      ))}
                    </div>
                  </div>
                  <Field
                    label="Nome da Amanda (como ela vai se apresentar)"
                    field="nomeAmanda"
                    value={form.nomeAmanda}
                    onChange={v => update("nomeAmanda", v)}
                    placeholder='Ex: "Amanda", "Bia", "Nexus AI"'
                  />
                  <div>
                    <label className="text-[#C4DDD0] text-xs font-semibold block mb-2">Que tipo de informações as revendedoras mais pedem?</label>
                    <textarea
                      value={form.observacoes}
                      onChange={e => update("observacoes", e.target.value)}
                      placeholder="Ex: status da maleta, saldo devedor, novas peças disponíveis, prazo de pagamento..."
                      rows={3}
                      className="w-full bg-[#060F0A] border border-[#1E3828] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FF5A1F] transition-colors placeholder-[#4A6A58] resize-none"
                    />
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <p className="text-[#7AA88E] text-sm mb-5">Como você quer que a Amanda se comunique?</p>
                  <div>
                    <label className="text-[#C4DDD0] text-xs font-semibold block mb-2">Tom de comunicação</label>
                    <div className="space-y-2">
                      {[
                        { value: "formal", label: "Formal", desc: "Prezado(a), cordialmente, atenciosamente..." },
                        { value: "amigavel", label: "Amigável e próximo", desc: "Oi, tudo bem? Obrigada, até mais!" },
                        { value: "profissional", label: "Profissional direto", desc: "Olá! Seu pagamento vence em X dias." },
                      ].map(v => (
                        <button key={v.value} onClick={() => update("tomComunicacao", v.value)}
                          className={`w-full py-3 px-4 rounded-xl text-left transition-all ${form.tomComunicacao === v.value ? "bg-[#FF5A1F]/10 border border-[#FF5A1F]/50" : "bg-[#060F0A] border border-[#1E3828] hover:border-[#FF5A1F]/30"}`}
                        >
                          <div className={`text-sm font-bold ${form.tomComunicacao === v.value ? "text-[#FF5A1F]" : "text-white"}`}>{v.label}</div>
                          <div className="text-[#7AA88E] text-xs mt-0.5">{v.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="bg-[#060F0A] border border-[#1E3828] rounded-2xl p-5">
                    <h4 className="text-white font-bold text-sm mb-3">Resumo do seu setup</h4>
                    <div className="space-y-1.5 text-sm">
                      {[
                        { label: "Empresa", value: form.nomeEmpresa },
                        { label: "Revendedoras", value: form.revendedoras },
                        { label: "Horário Amanda", value: form.horarioAtendimento },
                        { label: "Nome da IA", value: form.nomeAmanda || "Amanda" },
                        { label: "Tom", value: form.tomComunicacao },
                        { label: "Plano", value: `Nexus ${plan.charAt(0).toUpperCase() + plan.slice(1)}` },
                      ].filter(r => r.value).map(r => (
                        <div key={r.label} className="flex justify-between">
                          <span className="text-[#7AA88E]">{r.label}</span>
                          <span className="text-white font-medium capitalize">{r.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </AnimatedStep>
          </div>

          {/* Navigation */}
          <div className="flex gap-3">
            {step > 1 && (
              <button
                onClick={() => setStep(s => s - 1)}
                className="flex-1 py-4 rounded-xl bg-[#0C1A12] border border-[#1E3828] text-[#7AA88E] font-bold hover:border-[#FF5A1F]/40 transition-all"
              >
                ← Voltar
              </button>
            )}
            {step < STEPS.length ? (
              <button
                onClick={() => setStep(s => s + 1)}
                className="flex-1 py-4 rounded-xl bg-[#FF5A1F] text-[#1A0500] font-extrabold hover:scale-[1.01] transition-all shadow-lg shadow-[#FF5A1F]/20"
              >
                Continuar →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 py-4 rounded-xl bg-[#FF5A1F] text-[#1A0500] font-extrabold hover:scale-[1.01] transition-all disabled:opacity-60 shadow-lg shadow-[#FF5A1F]/20"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Enviando...
                  </span>
                ) : "Confirmar e iniciar setup ✓"}
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Field({ label, field, value, onChange, placeholder }: {
  label: string; field?: string; value: string;
  onChange: (v: string) => void; placeholder: string;
}) {
  return (
    <div>
      <label className="text-[#C4DDD0] text-xs font-semibold block mb-1.5">{label}</label>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#060F0A] border border-[#1E3828] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FF5A1F] transition-colors placeholder-[#4A6A58]"
      />
    </div>
  );
}

function AnimatedStep({ step, children }: { step: number; children: React.ReactNode }) {
  return (
    <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
      {children}
    </motion.div>
  );
}
