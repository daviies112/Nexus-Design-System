import { useState } from "react";
import { motion } from "framer-motion";

export default function ROICalculator() {
  const [revendedoras, setRevendedoras] = useState(30);
  const [ticket, setTicket] = useState(800);
  const [ferramentas, setFerramentas] = useState(3000);
  const [hasCalculated, setHasCalculated] = useState(false);

  const inadimplenciaMensal = Math.round(revendedoras * 0.18);
  const receitaNaoCobrada = Math.round(inadimplenciaMensal * ticket * 0.55);
  const custoFerramentas = ferramentas;
  const economiaConsolidacao = Math.max(0, custoFerramentas - 997);
  const totalSavings = receitaNaoCobrada + economiaConsolidacao;
  const nexusCusto = 997;
  const roi12 = Math.round(((totalSavings * 12 - nexusCusto * 12) / (nexusCusto * 12)) * 100);

  const calculate = () => setHasCalculated(true);

  const scrollToForm = () => {
    document.getElementById("qualificacao")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="roi-calculator" className="bg-[#0C1A12] py-24 md:py-32 px-6 border-t border-[#1E3828]">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <p className="text-[#FF5A1F] text-xs font-semibold tracking-[0.15em] uppercase mb-4">Calculadora de ROI</p>
          <h2 className="font-syne font-bold text-3xl md:text-4xl text-white tracking-tight">
            Quanto você perde operando
            <span className="text-[#FF5A1F]"> no manual?</span>
          </h2>
          <p className="text-[#7AA88E] text-base mt-4 max-w-xl mx-auto leading-relaxed">
            Calcule em 30 segundos o custo real da sua operação hoje — e quanto a Nexus devolve.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-[#060F0A] border border-[#1E3828] rounded-3xl p-8 md:p-10">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div>
                <label className="text-[#C4DDD0] text-sm font-semibold block mb-2">
                  Quantas revendedoras ativas você tem?
                </label>
                <input
                  type="number"
                  value={revendedoras}
                  onChange={e => { setRevendedoras(parseInt(e.target.value) || 0); setHasCalculated(false); }}
                  className="w-full bg-[#0C1A12] border border-[#1E3828] rounded-xl px-4 py-3 text-white text-lg font-bold focus:outline-none focus:border-[#FF5A1F] transition-colors"
                  placeholder="Ex: 30"
                />
              </div>

              <div>
                <label className="text-[#C4DDD0] text-sm font-semibold block mb-2">
                  Ticket médio de repasse por revendedora (R$)
                </label>
                <input
                  type="number"
                  value={ticket}
                  onChange={e => { setTicket(parseFloat(e.target.value) || 0); setHasCalculated(false); }}
                  className="w-full bg-[#0C1A12] border border-[#1E3828] rounded-xl px-4 py-3 text-white text-lg font-bold focus:outline-none focus:border-[#FF5A1F] transition-colors"
                  placeholder="Ex: 800"
                />
              </div>

              <div>
                <label className="text-[#C4DDD0] text-sm font-semibold block mb-2">
                  Quanto você paga hoje em ferramentas separadas (R$/mês)?
                </label>
                <select
                  value={ferramentas}
                  onChange={e => { setFerramentas(parseInt(e.target.value)); setHasCalculated(false); }}
                  className="w-full bg-[#0C1A12] border border-[#1E3828] rounded-xl px-4 py-3 text-white text-lg font-bold focus:outline-none focus:border-[#FF5A1F] transition-colors"
                >
                  <option value={700}>R$700 — Sistema de gestão + formulários</option>
                  <option value={1500}>R$1.500 — Gestão + app de vendas</option>
                  <option value={3000}>R$3.000 — Gestão + vendas + automação IA</option>
                  <option value={5000}>R$5.000+ — Ecossistema completo fragmentado</option>
                </select>
              </div>

              <button
                onClick={calculate}
                className="w-full bg-[#FF5A1F] text-[#1A0500] font-extrabold py-4 rounded-xl text-lg hover:-translate-y-0.5 transition-all shadow-lg"
              >
                Calcular meu ROI
              </button>
            </div>

            <div className="bg-[#0C1A12] rounded-2xl border border-[#1E3828] p-6">
              <h3 className="font-syne font-bold text-white text-lg mb-6 text-center">
                {hasCalculated ? "Seu potencial de economia mensal" : "Preencha e calcule"}
              </h3>
              <div className="space-y-4">
                <div className="bg-[#060F0A] border border-[#1E3828] rounded-xl p-4">
                  <div className="text-[#7AA88E] text-xs mb-1">Revendedoras com inadimplência estimada</div>
                  <div className="text-white text-xl font-bold">{hasCalculated ? `~${inadimplenciaMensal} por mês` : "--"}</div>
                </div>
                <div className="bg-[#060F0A] border border-[#1E3828] rounded-xl p-4">
                  <div className="text-[#7AA88E] text-xs mb-1">Receita não recuperada sem follow-up automático</div>
                  <div className="text-white text-xl font-bold">{hasCalculated ? `R$${receitaNaoCobrada.toLocaleString("pt-BR")}/mês` : "R$ --"}</div>
                </div>
                <div className="bg-[#060F0A] border border-[#1E3828] rounded-xl p-4">
                  <div className="text-[#7AA88E] text-xs mb-1">Economia ao consolidar ferramentas no Nexus Pro</div>
                  <div className="text-white text-xl font-bold">{hasCalculated ? `R$${economiaConsolidacao.toLocaleString("pt-BR")}/mês` : "R$ --"}</div>
                </div>
                <div className="bg-[#FF5A1F]/10 border border-[#FF5A1F]/30 rounded-xl p-4">
                  <div className="text-[#FF5A1F] text-xs font-bold mb-1">Economia total com a Nexus Intelligence</div>
                  <div className="text-[#FF5A1F] text-3xl font-extrabold font-syne">
                    {hasCalculated ? `R$${totalSavings.toLocaleString("pt-BR")}/mês` : "R$ --/mês"}
                  </div>
                </div>
                <div className="bg-[#00CC7A]/10 border border-[#00CC7A]/30 rounded-xl p-4">
                  <div className="text-[#00CC7A] text-xs font-bold mb-1">ROI em 12 meses (Nexus Pro R$997/mês)</div>
                  <div className="text-[#00CC7A] text-3xl font-extrabold font-syne">
                    {hasCalculated ? `${roi12.toLocaleString("pt-BR")}%` : "--%"}
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
