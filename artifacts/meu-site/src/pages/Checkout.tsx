import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NexusIcon } from "@/components/NexusIcon";
import { useToast } from "@/hooks/use-toast";

const PLANS: Record<string, {
  name: string; price: number; firstMonthPrice: number; discount: number;
  desc: string; features: string[];
}> = {
  start: {
    name: "Nexus Start",
    price: 649,
    firstMonthPrice: 649,
    discount: 0,
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
    firstMonthPrice: 648,
    discount: 35,
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
    firstMonthPrice: 724,
    discount: 50,
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

type PaymentMethod = "cartao" | "pix" | "boleto";

function formatCard(v: string) {
  return v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}
function formatExpiry(v: string) {
  return v.replace(/\D/g, "").slice(0, 4).replace(/^(\d{2})(\d)/, "$1/$2");
}

export default function Checkout() {
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cartao");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [installments, setInstallments] = useState("1");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [pixCopied, setPixCopied] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const plan = params.get("plan");
    if (plan && PLANS[plan]) setSelectedPlan(plan);
  }, []);

  const plan = PLANS[selectedPlan] || PLANS.pro;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !company) {
      toast({ title: "Campos obrigatórios", description: "Preencha todos os campos de contato.", variant: "destructive" });
      return;
    }
    if (paymentMethod === "cartao" && (!cardName || !cardNumber || !cardExpiry || !cardCvv)) {
      toast({ title: "Dados do cartão", description: "Preencha todos os dados do cartão.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1800));
    setIsSubmitting(false);
    setDone(true);
  };

  const copyPix = () => {
    navigator.clipboard.writeText("00020126580014br.gov.bcb.pix0136nexusintelligence@pix.com.br5204000053039865802BR5925Nexus Intelligence LTDA6009SAO PAULO62070503***630450A3");
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 3000);
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
          <h2 className="font-syne font-extrabold text-2xl text-white mb-3">Pagamento confirmado!</h2>
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
      <div className="max-w-2xl mx-auto px-6 pt-32 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

          {/* Header */}
          <div className="text-center mb-10">
            <NexusIcon size={48} className="mx-auto mb-4" />
            <h1 className="font-syne font-extrabold text-3xl text-white mb-2">Começar com a Nexus</h1>
            <p className="text-[#7AA88E]">Setup em 7 dias. Sem fidelidade. Cancele quando quiser.</p>
          </div>

          {/* Plan Selector */}
          <div className="flex gap-2 mb-6">
            {Object.entries(PLANS).map(([id, p]) => (
              <button
                key={id}
                onClick={() => setSelectedPlan(id)}
                className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all relative ${
                  selectedPlan === id
                    ? "bg-[#FF5A1F] text-[#1A0500]"
                    : "bg-[#0C1A12] border border-[#1E3828] text-[#7AA88E] hover:border-[#FF5A1F]/40"
                }`}
              >
                {p.discount > 0 && (
                  <span className={`absolute -top-2 left-1/2 -translate-x-1/2 text-[9px] font-extrabold px-2 py-0.5 rounded-full whitespace-nowrap ${
                    selectedPlan === id ? "bg-[#1A0500] text-[#FF5A1F]" : "bg-[#FF5A1F] text-[#1A0500]"
                  }`}>
                    {p.discount}% OFF
                  </span>
                )}
                {p.name.replace("Nexus ", "")}<br />
                <span className={selectedPlan === id ? "text-[#5C1A00] text-[10px]" : "text-[#4A6A58] text-[10px]"}>
                  R${p.price.toLocaleString("pt-BR")}/mês
                </span>
              </button>
            ))}
          </div>

          {/* Plan Summary */}
          <div className="bg-[#0C1A12] border border-[#1E3828] rounded-3xl p-6 mb-6">
            <div className="flex items-start justify-between mb-4 pb-4 border-b border-[#1E3828]">
              <div>
                <div className="text-white font-syne font-bold text-lg">{plan.name}</div>
                <div className="text-[#7AA88E] text-sm">{plan.desc}</div>
              </div>
              <div className="text-right">
                {plan.discount > 0 ? (
                  <>
                    <div className="flex items-center gap-2 justify-end mb-0.5">
                      <span className="bg-[#FF5A1F] text-[#1A0500] text-[10px] font-extrabold px-2 py-0.5 rounded-full">{plan.discount}% OFF</span>
                    </div>
                    <div className="text-[#FF5A1F] font-extrabold text-xl">R${plan.firstMonthPrice.toLocaleString("pt-BR")}<span className="text-xs font-normal text-[#7AA88E]">/1º mês</span></div>
                    <div className="text-[#4A6A58] text-xs line-through">R${plan.price.toLocaleString("pt-BR")}/mês</div>
                    <div className="text-[#4A6A58] text-[10px]">depois R${plan.price.toLocaleString("pt-BR")}/mês</div>
                  </>
                ) : (
                  <>
                    <div className="text-[#FF5A1F] font-extrabold text-xl">R${plan.price.toLocaleString("pt-BR")}<span className="text-xs font-normal text-[#7AA88E]">/mês</span></div>
                    <div className="text-[#4A6A58] text-xs">cobrança no dia 1</div>
                  </>
                )}
              </div>
            </div>
            <ul className="space-y-1.5 text-sm text-[#C4DDD0]">
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

          {/* Contact Form */}
          <div className="bg-[#0C1A12] border border-[#1E3828] rounded-3xl p-8 mb-6">
            <h3 className="font-syne font-bold text-white mb-5">Seus dados</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {[
                { label: "Nome completo *", value: name, setter: setName, placeholder: "Seu nome" },
                { label: "Empresa *", value: company, setter: setCompany, placeholder: "Nome da empresa" },
                { label: "Email *", value: email, setter: setEmail, placeholder: "seu@email.com", type: "email" },
                { label: "WhatsApp *", value: phone, setter: setPhone, placeholder: "(11) 99999-9999" },
              ].map((f, i) => (
                <div key={i} className={i < 2 ? "" : ""}>
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
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-[#0C1A12] border border-[#1E3828] rounded-3xl p-8">
            <h3 className="font-syne font-bold text-white mb-5">Forma de pagamento</h3>

            {/* Method Tabs */}
            <div className="flex gap-2 mb-6">
              {([
                { id: "cartao" as PaymentMethod, label: "Cartão de Crédito", icon: "💳" },
                { id: "pix" as PaymentMethod, label: "PIX", icon: "⚡" },
                { id: "boleto" as PaymentMethod, label: "Boleto", icon: "📄" },
              ]).map(m => (
                <button
                  key={m.id}
                  onClick={() => setPaymentMethod(m.id)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    paymentMethod === m.id
                      ? "bg-[#1E3828] border border-[#00CC7A]/40 text-[#00CC7A]"
                      : "bg-[#060F0A] border border-[#1E3828] text-[#7AA88E] hover:border-[#1E3828]"
                  }`}
                >
                  <span>{m.icon}</span> {m.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {paymentMethod === "cartao" && (
                <motion.form
                  key="cartao"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div>
                    <label className="text-[#C4DDD0] text-xs font-semibold block mb-1.5">Nome no cartão *</label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={e => setCardName(e.target.value.toUpperCase())}
                      placeholder="NOME SOBRENOME"
                      className="w-full bg-[#060F0A] border border-[#1E3828] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FF5A1F] transition-colors placeholder-[#4A6A58]"
                    />
                  </div>
                  <div>
                    <label className="text-[#C4DDD0] text-xs font-semibold block mb-1.5">Número do cartão *</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={e => setCardNumber(formatCard(e.target.value))}
                        placeholder="0000 0000 0000 0000"
                        maxLength={19}
                        className="w-full bg-[#060F0A] border border-[#1E3828] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FF5A1F] transition-colors placeholder-[#4A6A58] font-mono tracking-wider"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                        <span className="text-base">💳</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[#C4DDD0] text-xs font-semibold block mb-1.5">Validade *</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={e => setCardExpiry(formatExpiry(e.target.value))}
                        placeholder="MM/AA"
                        maxLength={5}
                        className="w-full bg-[#060F0A] border border-[#1E3828] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FF5A1F] transition-colors placeholder-[#4A6A58] font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[#C4DDD0] text-xs font-semibold block mb-1.5">CVV *</label>
                      <input
                        type="text"
                        value={cardCvv}
                        onChange={e => setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                        placeholder="•••"
                        maxLength={4}
                        className="w-full bg-[#060F0A] border border-[#1E3828] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FF5A1F] transition-colors placeholder-[#4A6A58] font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[#C4DDD0] text-xs font-semibold block mb-1.5">Parcelas</label>
                    <select
                      value={installments}
                      onChange={e => setInstallments(e.target.value)}
                      className="w-full bg-[#060F0A] border border-[#1E3828] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FF5A1F] transition-colors"
                    >
                      <option value="1">1x de R${plan.firstMonthPrice.toLocaleString("pt-BR")} (sem juros)</option>
                      <option value="2">2x de R${Math.ceil(plan.firstMonthPrice / 2).toLocaleString("pt-BR")} (sem juros)</option>
                      <option value="3">3x de R${Math.ceil(plan.firstMonthPrice / 3).toLocaleString("pt-BR")} (sem juros)</option>
                      <option value="6">6x de R${Math.ceil(plan.firstMonthPrice / 6).toLocaleString("pt-BR")} (sem juros)</option>
                    </select>
                  </div>

                  {/* Security badges */}
                  <div className="flex items-center gap-2 py-3 px-4 bg-[#060F0A] rounded-xl border border-[#1E3828]">
                    <svg className="w-4 h-4 text-[#00CC7A] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="text-[#7AA88E] text-xs">Pagamento seguro com criptografia SSL 256-bit</span>
                    <div className="ml-auto flex gap-2 text-[10px] text-[#4A6A58] font-bold">
                      <span>VISA</span><span>MC</span><span>ELO</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#FF5A1F] text-[#1A0500] font-extrabold py-4 rounded-xl text-base mt-2 hover:scale-[1.01] transition-all disabled:opacity-60 shadow-lg shadow-[#FF5A1F]/20"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                        </svg>
                        Processando...
                      </span>
                    ) : (
                      <>Pagar R${plan.firstMonthPrice.toLocaleString("pt-BR")}{plan.discount > 0 ? " (1º mês)" : ""} →</>
                    )}
                  </button>
                </motion.form>
              )}

              {paymentMethod === "pix" && (
                <motion.div
                  key="pix"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="space-y-4"
                >
                  <div className="bg-[#060F0A] border border-[#1E3828] rounded-2xl p-6 text-center">
                    {/* QR Code placeholder */}
                    <div className="w-48 h-48 mx-auto mb-4 bg-white rounded-2xl flex items-center justify-center">
                      <svg viewBox="0 0 100 100" className="w-40 h-40">
                        {/* Simulated QR code pattern */}
                        {[0,1,2,3,4,5,6].map(r => [0,1,2,3,4,5,6].map(c => {
                          const corner = (r < 3 && c < 3) || (r < 3 && c > 3) || (r > 3 && c < 3);
                          const fill = corner ? "#060F0A" : Math.random() > 0.5 ? "#060F0A" : "white";
                          return <rect key={`${r}-${c}`} x={r*14+1} y={c*14+1} width={12} height={12} fill={fill} />;
                        }))}
                        {/* Corner marks */}
                        <rect x="1" y="1" width="26" height="26" fill="none" stroke="#060F0A" strokeWidth="3"/>
                        <rect x="73" y="1" width="26" height="26" fill="none" stroke="#060F0A" strokeWidth="3"/>
                        <rect x="1" y="73" width="26" height="26" fill="none" stroke="#060F0A" strokeWidth="3"/>
                        <rect x="5" y="5" width="18" height="18" fill="#060F0A"/>
                        <rect x="77" y="5" width="18" height="18" fill="#060F0A"/>
                        <rect x="5" y="77" width="18" height="18" fill="#060F0A"/>
                      </svg>
                    </div>
                    <div className="text-[#00CC7A] font-extrabold text-2xl mb-1">R${plan.firstMonthPrice.toLocaleString("pt-BR")}</div>
                    {plan.discount > 0 && (
                      <div className="text-[#7AA88E] text-xs mb-3">{plan.discount}% de desconto no 1º mês · depois R${plan.price.toLocaleString("pt-BR")}/mês</div>
                    )}
                    <p className="text-[#7AA88E] text-sm mb-4">Escaneie o QR code com o app do seu banco ou copie a chave PIX</p>
                    <button
                      onClick={copyPix}
                      className={`w-full py-3 rounded-xl text-sm font-bold transition-all ${
                        pixCopied
                          ? "bg-[#00CC7A]/20 text-[#00CC7A] border border-[#00CC7A]/40"
                          : "bg-[#1E3828] text-[#7AA88E] border border-[#2A4A38] hover:border-[#00CC7A]/40"
                      }`}
                    >
                      {pixCopied ? "✓ Chave PIX copiada!" : "Copiar chave PIX"}
                    </button>
                  </div>
                  <p className="text-[#4A6A58] text-xs text-center">Após o pagamento, nossa equipe ativa o acesso em até 2 horas via WhatsApp.</p>
                  <button
                    onClick={handleSubmit as any}
                    disabled={isSubmitting}
                    className="w-full bg-[#00CC7A] text-[#001A0E] font-extrabold py-4 rounded-xl text-base hover:scale-[1.01] transition-all disabled:opacity-60 shadow-lg shadow-[#00CC7A]/10"
                  >
                    {isSubmitting ? "Confirmando..." : "Já paguei — confirmar pedido"}
                  </button>
                </motion.div>
              )}

              {paymentMethod === "boleto" && (
                <motion.div
                  key="boleto"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="space-y-4"
                >
                  <div className="bg-[#060F0A] border border-[#1E3828] rounded-2xl p-6">
                    <div className="text-center mb-5">
                      <div className="text-[#FF5A1F] font-extrabold text-2xl mb-1">R${plan.firstMonthPrice.toLocaleString("pt-BR")}</div>
                      {plan.discount > 0 && (
                        <div className="text-[#7AA88E] text-xs">{plan.discount}% de desconto no 1º mês</div>
                      )}
                    </div>
                    {/* Barcode */}
                    <div className="bg-white rounded-xl p-4 mb-4 flex items-center justify-center">
                      <div className="flex gap-px">
                        {Array.from({length: 80}).map((_, i) => (
                          <div key={i} style={{ width: Math.random() > 0.7 ? 3 : 1, height: i % 5 === 0 ? 60 : 50, background: "#000", margin: "0 0.5px" }} />
                        ))}
                      </div>
                    </div>
                    <p className="text-[#7AA88E] text-xs text-center mb-4">Linha digitável:</p>
                    <div className="bg-[#0C1A12] border border-[#1E3828] rounded-xl px-4 py-3 font-mono text-[#C4DDD0] text-xs text-center break-all mb-4">
                      34191.09008 00012.840009 01000.220007 4 87900000{plan.firstMonthPrice}00
                    </div>
                    <div className="flex items-start gap-2 text-xs text-[#7AA88E]">
                      <span>⚠️</span>
                      <span>Vencimento em 3 dias úteis. O acesso é liberado após a compensação bancária (até 1 dia útil).</span>
                    </div>
                  </div>
                  <button
                    onClick={handleSubmit as any}
                    disabled={isSubmitting}
                    className="w-full bg-[#FF5A1F] text-[#1A0500] font-extrabold py-4 rounded-xl text-base hover:scale-[1.01] transition-all disabled:opacity-60 shadow-lg shadow-[#FF5A1F]/20"
                  >
                    {isSubmitting ? "Gerando boleto..." : "Gerar boleto"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="text-[#4A6A58] text-xs text-center mt-4">
              Ao prosseguir, você concorda com os{" "}
              <a href="/termos-uso" className="text-[#7AA88E] hover:text-white transition-colors">Termos de Uso</a>{" "}e a{" "}
              <a href="/politica-privacidade" className="text-[#7AA88E] hover:text-white transition-colors">Política de Privacidade</a>.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
