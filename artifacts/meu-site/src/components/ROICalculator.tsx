import { useState } from "react";
import { motion } from "framer-motion";

interface ROIResults {
  lostLeads: number;
  lostRevenue: number;
  timeCost: number;
  totalSavings: number;
  roi: number;
}

export default function ROICalculator() {
  const [revendedoras, setRevendedoras] = useState(30);
  const [ticket, setTicket] = useState(300);
  const [hours, setHours] = useState(4);
  const [isCalculating, setIsCalculating] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [results, setResults] = useState<ROIResults>({ lostLeads: 0, lostRevenue: 0, timeCost: 0, totalSavings: 0, roi: 0 });

  const calculateROI = async () => {
    setIsCalculating(true);
    try {
      const res = await fetch("/api/calculate-roi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leads: revendedoras, ticket, hours, businessType: "semijoias" }),
      });
      const data = await res.json();
      setResults(data);
      setHasCalculated(true);
    } finally {
      setIsCalculating(false);
    }
  };

  const scrollToForm = () => {
    document.getElementById("qualificacao")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="roi-calculator" className="bg-[#0C1A12] py-24 md:py-32 px-6 border-t border-[#1E3828]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-syne font-bold text-3xl md:text-4xl text-white tracking-tight">
            Quanto você perde operando
            <span className="text-[#FF5A1F]"> no manual?</span>
          </h2>
          <p className="text-[#7AA88E] text-base mt-4 max-w-xl mx-auto leading-relaxed">
            Calcule em 30 segundos o custo real da sua operação atual.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#060F0A] border border-[#1E3828] rounded-3xl p-8 md:p-10"
        >
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div>
                <label className="text-[#C4DDD0] text-sm font-semibold block mb-2">
                  Quantas revendedoras ativas você tem?
                </label>
                <input
                  type="number"
                  value={revendedoras}
                  onChange={e => setRevendedoras(parseInt(e.target.value) || 0)}
                  className="w-full bg-[#0C1A12] border border-[#1E3828] rounded-xl px-4 py-3 text-white text-lg font-bold focus:outline-none focus:border-[#FF5A1F] transition-colors"
                  placeholder="Ex: 30"
                />
              </div>

              <div>
                <label className="text-[#C4DDD0] text-sm font-semibold block mb-2">
                  Ticket médio por revendedora (R$)
                </label>
                <input
                  type="number"
                  value={ticket}
                  onChange={e => setTicket(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#0C1A12] border border-[#1E3828] rounded-xl px-4 py-3 text-white text-lg font-bold focus:outline-none focus:border-[#FF5A1F] transition-colors"
                  placeholder="Ex: 300"
                />
              </div>

              <div>
                <label className="text-[#C4DDD0] text-sm font-semibold block mb-2">
                  Horas/dia gastas em cobranças e operação
                </label>
                <select
                  value={hours}
                  onChange={e => setHours(parseInt(e.target.value))}
                  className="w-full bg-[#0C1A12] border border-[#1E3828] rounded-xl px-4 py-3 text-white text-lg font-bold focus:outline-none focus:border-[#FF5A1F] transition-colors"
                >
                  <option value="2">2 horas</option>
                  <option value="4">4 horas</option>
                  <option value="6">6 horas</option>
                  <option value="8">8+ horas</option>
                </select>
              </div>

              <button
                onClick={calculateROI}
                disabled={isCalculating}
                className="w-full bg-[#FF5A1F] text-[#1A0500] font-extrabold py-4 rounded-xl text-lg hover:-translate-y-0.5 transition-all disabled:opacity-60 shadow-lg"
              >
                {isCalculating ? "Calculando..." : "Calcular meu ROI"}
              </button>
            </div>

            <div className="bg-[#0C1A12] rounded-2xl border border-[#1E3828] p-6">
              <h3 className="font-syne font-bold text-white text-lg mb-6 text-center">
                {hasCalculated ? "Seu potencial de economia" : "Preencha e calcule"}
              </h3>
              <div className="space-y-4">
                {[
                  { label: "Revendedoras com cobrança atrasada", value: hasCalculated ? `${results.lostLeads} / mês` : "--" },
                  { label: "Receita não cobrada mensalmente", value: hasCalculated ? `R$ ${results.lostRevenue.toLocaleString("pt-BR")}` : "R$ --" },
                  { label: "Custo do seu tempo operacional", value: hasCalculated ? `R$ ${results.timeCost.toLocaleString("pt-BR")}/mês` : "R$ --/mês" },
                ].map((item, i) => (
                  <div key={i} className="bg-[#060F0A] border border-[#1E3828] rounded-xl p-4">
                    <div className="text-[#7AA88E] text-xs mb-1">{item.label}</div>
                    <div className="text-white text-xl font-bold">{item.value}</div>
                  </div>
                ))}
                <div className="bg-[#FF5A1F]/10 border border-[#FF5A1F]/30 rounded-xl p-4">
                  <div className="text-[#FF5A1F] text-xs font-bold mb-1">Economia total com a Amanda AI</div>
                  <div className="text-[#FF5A1F] text-3xl font-extrabold font-syne">
                    {hasCalculated ? `R$ ${results.totalSavings.toLocaleString("pt-BR")}/mês` : "R$ --/mês"}
                  </div>
                </div>
                <div className="bg-[#00CC7A]/10 border border-[#00CC7A]/30 rounded-xl p-4">
                  <div className="text-[#00CC7A] text-xs font-bold mb-1">ROI em 12 meses</div>
                  <div className="text-[#00CC7A] text-3xl font-extrabold font-syne">
                    {hasCalculated ? `${results.roi.toLocaleString("pt-BR")}%` : "--%"}
                  </div>
                </div>
              </div>
              <button
                onClick={scrollToForm}
                disabled={!hasCalculated}
                className="w-full mt-6 bg-[#1A0500] text-[#FF5A1F] font-extrabold py-4 rounded-xl text-sm border border-[#FF5A1F]/30 hover:bg-[#FF5A1F]/10 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {hasCalculated ? "Quero automatizar agora" : "Calcule primeiro o ROI"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
