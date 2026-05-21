import { useState } from "react";
import { motion } from "framer-motion";

const faqs = [
  { q: "Como funciona o período de 7 dias grátis?", a: "Você acessa todos os 21 módulos completos por 7 dias sem cartão de crédito. Se gostar, basta assinar. Se não gostar, não cobra nada." },
  { q: "Quanto tempo leva para configurar?", a: "Nossa equipe faz o setup assistido em até 24 horas após a assinatura. Você não precisa saber programar nada." },
  { q: "Preciso de número de WhatsApp Business?", a: "Sim, você precisa de um número com WhatsApp Business. Podemos ajudar a configurar a API oficial durante o onboarding." },
  { q: "A Amanda AI pode errar?", a: "A Amanda opera dentro de regras configuráveis por você. Para ações críticas, ela sempre aguarda confirmação antes de executar." },
  { q: "Funciona para quantas revendedoras?", a: "Depende do plano. Start suporta até 40 revendedoras ativas. Pro e Max são ilimitados. Os planos custam R$649, R$997 e R$1.449/mês respectivamente." },
  { q: "Posso cancelar a qualquer momento?", a: "Sim, sem multa e sem burocracia. O cancelamento é efetivado no final do período já pago." },
  { q: "Como é feita a emissão de notas fiscais?", a: "A Amanda emite NF-e e NFS-e automaticamente após cada venda confirmada, usando sua certificação digital. Você precisa ter um certificado digital A1 ou A3." },
  { q: "Os dados das minhas revendedoras ficam seguros?", a: "Sim. Todos os dados são criptografados com AES-256 e armazenados em servidores no Brasil, em conformidade com a LGPD." },
];

export default function CentralAjuda() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#060F0A]">
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <span className="text-[#FF5A1F] text-xs font-bold tracking-[0.2em] uppercase block mb-4">CENTRAL DE AJUDA</span>
          <h1 className="font-syne font-extrabold text-4xl text-white mb-4">Perguntas frequentes</h1>
          <p className="text-[#7AA88E] text-lg">Encontre respostas rápidas para as dúvidas mais comuns.</p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-[#0C1A12] border border-[#1E3828] rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-[#111f17] transition-colors"
              >
                <span className="font-syne font-bold text-white pr-4">{faq.q}</span>
                <svg
                  className={`w-5 h-5 text-[#FF5A1F] flex-shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {open === i && (
                <div className="px-6 pb-6 text-[#C4DDD0] leading-relaxed border-t border-[#1E3828] pt-4">
                  {faq.a}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-12 bg-[#0C1A12] border border-[#1E3828] rounded-3xl p-8 text-center">
          <h2 className="font-syne font-bold text-xl text-white mb-3">Não encontrou o que procurava?</h2>
          <p className="text-[#7AA88E] mb-6">Nossa equipe responde em menos de 2 horas no horário comercial.</p>
          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white font-extrabold px-8 py-4 rounded-xl hover:-translate-y-0.5 transition-transform shadow-lg"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Falar no WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
