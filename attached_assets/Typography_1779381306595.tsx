const GoogleFonts = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap');
  `}</style>
);

const T = {
  bg:        "#060F0A",
  surface:   "#0C1A12",
  surface2:  "#122018",
  border:    "#1E3828",
  accent:    "#FF5A1F",
  green:     "#00CC7A",
  textPri:   "#F0FAF4",
  textBody:  "#C4DDD0",
  textSec:   "#7AA88E",
  textMuted: "#4A6A58",
};

const SectionLabel = ({ n, text }: { n: string; text: string }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
    <span style={{ color: T.accent, fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", fontFamily: "Inter,system-ui" }}>{n}</span>
    <span style={{ color: T.textSec, fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "Inter,system-ui" }}>{text}</span>
    <div style={{ flex: 1, height: "1px", background: T.border }} />
  </div>
);

export function Typography() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: T.bg }}>
      <GoogleFonts />

      <div style={{ padding: "48px 64px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
          <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: T.accent }} />
          <span style={{ color: T.accent, fontSize: "11px", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "Inter,system-ui" }}>
            Nexus Intelligence — Sistema de Marca
          </span>
        </div>
        <h1 style={{ color: T.textPri, fontSize: "32px", fontWeight: 800, letterSpacing: "-0.03em", margin: 0, fontFamily: "Syne,system-ui" }}>
          Tipografia & Linguagem de Marca
        </h1>
        <p style={{ color: T.textSec, fontSize: "14px", marginTop: "8px", fontFamily: "Inter,system-ui" }}>
          Par tipográfico Syne × Inter, escala de uso e voz da marca
        </p>
      </div>

      <div style={{ padding: "40px 64px", display: "flex", flexDirection: "column", gap: "40px" }}>

        {/* ── Par tipográfico hero ───────────────────── */}
        <div>
          <SectionLabel n="01" text="Par Tipográfico: Syne + Inter" />
          <div style={{ background: T.surface, borderRadius: "16px", padding: "40px", border: `1px solid ${T.border}` }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1px 1fr", gap: "40px" }}>

              {/* Syne */}
              <div>
                <div style={{ color: T.accent, fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "8px", fontFamily: "Inter,system-ui" }}>Display / Headlines</div>
                <div style={{ color: T.textPri, fontSize: "56px", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.95, fontFamily: "Syne,system-ui", marginBottom: "8px" }}>Syne</div>
                <div style={{ color: T.textPri, fontSize: "24px", fontWeight: 400, letterSpacing: "-0.02em", fontFamily: "Syne,system-ui", marginBottom: "20px" }}>
                  Automação total.
                </div>
                <div style={{ background: T.bg, borderRadius: "10px", padding: "16px", marginBottom: "16px" }}>
                  <div style={{ color: T.textMuted, fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px", fontFamily: "Inter,system-ui" }}>Pesos e exemplos</div>
                  {[
                    { w: 800, name: "ExtraBold", ex: "Sua empresa roda sozinha." },
                    { w: 700, name: "Bold", ex: "21 módulos. Um preço." },
                    { w: 600, name: "SemiBold", ex: "Zero toque humano." },
                    { w: 400, name: "Regular", ex: "Nexus Intelligence" },
                  ].map(item => (
                    <div key={item.w} style={{ padding: "5px 0", borderBottom: `1px solid ${T.border}`, display: "flex", gap: "10px", alignItems: "baseline" }}>
                      <span style={{ color: T.textMuted, fontSize: "9px", fontFamily: "monospace", width: "28px" }}>{item.w}</span>
                      <span style={{ color: T.textPri, fontSize: "15px", fontFamily: "Syne,system-ui", fontWeight: item.w }}>{item.ex}</span>
                    </div>
                  ))}
                </div>
                <p style={{ color: T.textSec, fontSize: "11px", lineHeight: 1.65, margin: 0, fontFamily: "Inter,system-ui" }}>
                  Geométrica, tech, com caráter próprio. Criada para uso em grandes tamanhos — não desaparece em headline. Resolve o problema da "Inter em tudo": cria hierarquia visual imediata.
                </p>
              </div>

              <div style={{ background: T.border }} />

              {/* Inter */}
              <div>
                <div style={{ color: T.textSec, fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "8px", fontFamily: "Inter,system-ui" }}>Body / UI / Dados</div>
                <div style={{ color: T.textPri, fontSize: "56px", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 0.95, fontFamily: "Inter,system-ui", marginBottom: "8px" }}>Inter</div>
                <div style={{ color: T.textBody, fontSize: "15px", fontWeight: 400, lineHeight: 1.65, fontFamily: "Inter,system-ui", marginBottom: "20px", maxWidth: "340px" }}>
                  A plataforma processa cobranças, emite NF-e e gerencia revendedoras automaticamente.
                </div>
                <div style={{ background: T.bg, borderRadius: "10px", padding: "16px", marginBottom: "16px" }}>
                  <div style={{ color: T.textMuted, fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px", fontFamily: "Inter,system-ui" }}>Pesos em uso</div>
                  {[
                    { w: 300, use: "Subtítulos grandes, display leve" },
                    { w: 400, use: "Corpo de texto, parágrafos" },
                    { w: 500, use: "Labels, badges, metadados" },
                    { w: 600, use: "Subheadings, nomes de campo" },
                    { w: 700, use: "Números, valores em destaque" },
                  ].map(item => (
                    <div key={item.w} style={{ padding: "5px 0", borderBottom: `1px solid ${T.border}`, display: "flex", gap: "10px", alignItems: "baseline" }}>
                      <span style={{ color: T.textMuted, fontSize: "9px", fontFamily: "monospace", width: "28px" }}>{item.w}</span>
                      <span style={{ color: T.textBody, fontSize: "13px", fontFamily: "Inter,system-ui", fontWeight: item.w, flex: 1 }}>Inter {item.w}</span>
                      <span style={{ color: T.textMuted, fontSize: "9px", fontFamily: "Inter,system-ui" }}>{item.use}</span>
                    </div>
                  ))}
                </div>
                <p style={{ color: T.textSec, fontSize: "11px", lineHeight: 1.65, margin: 0, fontFamily: "Inter,system-ui" }}>
                  Referência global para UI: Notion, Linear, Vercel, Stripe. Otimizada para leitura em tela. Permanece para corpo — Syne assume os headlines.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Escala tipográfica ─────────────────────── */}
        <div>
          <SectionLabel n="02" text="Escala Tipográfica Completa" />
          <div style={{ background: T.surface, borderRadius: "16px", padding: "32px 36px", border: `1px solid ${T.border}` }}>
            {[
              { level: "Display", px: 56, w: 800, tr: "-0.04em", lh: "1.0",  font: "Syne",  use: "Hero headline",     ex: "Sua empresa roda sozinha.", color: T.textPri },
              { level: "H1",      px: 40, w: 800, tr: "-0.03em", lh: "1.1",  font: "Syne",  use: "Título de página",  ex: "21 módulos. Um preço.", color: T.textPri },
              { level: "H2",      px: 32, w: 700, tr: "-0.025em",lh: "1.2",  font: "Syne",  use: "Seção",             ex: "Zero intervenção humana.", color: T.textPri },
              { level: "H3",      px: 24, w: 700, tr: "-0.02em", lh: "1.3",  font: "Syne",  use: "Subseção",          ex: "Gestão automática", color: T.textPri },
              { level: "H4",      px: 18, w: 600, tr: "-0.01em", lh: "1.4",  font: "Inter", use: "Cards, painéis",    ex: "Cobrança automática", color: T.textBody },
              { level: "Body L",  px: 16, w: 400, tr: "0",       lh: "1.7",  font: "Inter", use: "Texto principal",   ex: "A plataforma processa tudo sem ninguém no meio.", color: T.textBody },
              { level: "Body M",  px: 14, w: 400, tr: "0",       lh: "1.65", font: "Inter", use: "Texto secundário",  ex: "93% de margem com custo de R$ 200/mês.", color: T.textSec },
              { level: "Label",   px: 11, w: 600, tr: "0.08em",  lh: "1.5",  font: "Inter", use: "Tags, badges",      ex: "MÓDULO ATIVO · AUTOMÁTICO", color: T.textSec },
            ].map((item, i) => (
              <div key={item.level} style={{ display: "grid", gridTemplateColumns: "68px 100px 1fr 90px", alignItems: "center", gap: "16px", padding: "10px 0", borderBottom: i < 7 ? `1px solid ${T.border}` : "none" }}>
                <div style={{ background: T.bg, borderRadius: "5px", padding: "3px 8px", textAlign: "center" }}>
                  <span style={{ color: T.accent, fontSize: "9px", fontWeight: 700, letterSpacing: "0.06em", fontFamily: "Inter,system-ui" }}>{item.level}</span>
                </div>
                <div>
                  <div style={{ color: T.textMuted, fontSize: "9px", fontFamily: "monospace" }}>{item.px}px · {item.w}</div>
                  <div style={{ color: T.textMuted, fontSize: "9px", fontFamily: "monospace" }}>tr:{item.tr} lh:{item.lh}</div>
                  <div style={{ color: "#2A4A38", fontSize: "9px", fontFamily: "monospace" }}>{item.font}</div>
                </div>
                <span style={{
                  color: item.color,
                  fontSize: item.px > 28 ? "22px" : item.px > 18 ? `${item.px * 0.85}px` : `${item.px}px`,
                  fontWeight: item.w,
                  letterSpacing: item.tr,
                  fontFamily: item.font === "Syne" ? "Syne,system-ui" : "Inter,system-ui",
                  textTransform: item.level === "Label" ? "uppercase" : "none",
                  lineHeight: item.lh,
                }}>
                  {item.ex}
                </span>
                <span style={{ color: T.textMuted, fontSize: "10px", textAlign: "right", fontFamily: "Inter,system-ui" }}>{item.use}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Voz e Tom ──────────────────────────────── */}
        <div>
          <SectionLabel n="03" text="Voz & Tom de Marca" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div style={{ background: T.surface, borderRadius: "14px", padding: "28px", border: `1px solid ${T.border}` }}>
              <h3 style={{ color: T.textPri, fontSize: "15px", fontWeight: 700, margin: "0 0 18px", fontFamily: "Syne,system-ui" }}>
                Como a Nexus fala
              </h3>
              {[
                { trait: "Precisa", desc: '"R$ 200/mês" — não "custo baixo". Números concretos.' },
                { trait: "Direta", desc: "Afirmações, não perguntas. Sem rodeios retóricos." },
                { trait: "Confiante", desc: "Não pede desculpa pelo preço. Explica o valor." },
                { trait: "Humana", desc: "Tech sem jargão. A empresária entende na primeira leitura." },
                { trait: "Urgente (quando real)", desc: "Cada dia sem usar é custo mensurável — não pressão fabricada." },
              ].map(item => (
                <div key={item.trait} style={{ background: T.bg, borderRadius: "8px", padding: "10px 14px", marginBottom: "8px", display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: T.accent, marginTop: "5px", flexShrink: 0 }} />
                  <div>
                    <span style={{ color: T.textPri, fontSize: "12px", fontWeight: 700, fontFamily: "Syne,system-ui" }}>{item.trait} </span>
                    <span style={{ color: T.textSec, fontSize: "12px", fontFamily: "Inter,system-ui" }}>— {item.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: T.surface, borderRadius: "14px", padding: "28px", border: `1px solid ${T.border}` }}>
              <h3 style={{ color: T.textPri, fontSize: "15px", fontWeight: 700, margin: "0 0 18px", fontFamily: "Syne,system-ui" }}>
                Copy: antes vs. depois
              </h3>
              {[
                {
                  bad: "Nossa solução utiliza IA avançada para otimizar seus processos.",
                  good: "Sua cobrança vai sozinha. Sua nota sai automática. Você dorme."
                },
                {
                  bad: "Plataforma completa e robusta para gestão!",
                  good: "21 módulos integrados. Um preço. Zero funcionário para operar."
                },
                {
                  bad: "Economize com nossa tecnologia inovadora.",
                  good: "Você paga R$ 5.260/mês por sistemas separados. Nós cobramos R$ 2.830 por tudo."
                },
              ].map((item, i) => (
                <div key={i} style={{ marginBottom: "10px" }}>
                  <div style={{ background: "#180808", borderRadius: "6px", padding: "8px 12px", marginBottom: "4px", borderLeft: "3px solid #EF4444" }}>
                    <div style={{ color: "#EF4444", fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "3px", fontFamily: "Inter,system-ui" }}>✗ Errado</div>
                    <span style={{ color: "#7A4A4A", fontSize: "11px", lineHeight: 1.5, fontFamily: "Inter,system-ui" }}>{item.bad}</span>
                  </div>
                  <div style={{ background: "#081208", borderRadius: "6px", padding: "8px 12px", borderLeft: `3px solid ${T.green}` }}>
                    <div style={{ color: T.green, fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "3px", fontFamily: "Inter,system-ui" }}>✓ Certo</div>
                    <span style={{ color: "#4A8A6A", fontSize: "11px", lineHeight: 1.5, fontFamily: "Inter,system-ui" }}>{item.good}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Vocabulário ────────────────────────────── */}
        <div style={{ background: T.surface, borderRadius: "16px", padding: "28px", border: `1px solid ${T.border}` }}>
          <h3 style={{ color: T.textPri, fontSize: "15px", fontWeight: 700, margin: "0 0 20px", fontFamily: "Syne,system-ui" }}>
            Vocabulário: usamos vs. nunca usamos
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            <div>
              <div style={{ color: T.green, fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "12px", fontFamily: "Inter,system-ui" }}>✓ Usamos</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {["Automatiza", "Elimina", "Zero toque", "Devolve tempo", "Integrado", "Sem intervenção", "Processa", "93% margem", "R$ 200/mês", "24/7", "Sem erro", "Escala", "Invisível", "Zero humano", "Automático", "Preciso"].map(w => (
                  <span key={w} style={{ background: "#081208", borderRadius: "5px", padding: "3px 9px", color: T.green, fontSize: "11px", fontWeight: 600, fontFamily: "Inter,system-ui" }}>{w}</span>
                ))}
              </div>
            </div>
            <div>
              <div style={{ color: "#EF4444", fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "12px", fontFamily: "Inter,system-ui" }}>✗ Nunca usamos</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {["Revolucionário", "Disruptivo", "Ecossistema", "Sinérgico", "Otimiza", "Solução", "Plataforma completa", "Melhor do mercado", "Intuitivo", "Robusto", "World-class", "Inovador", "Avançado", "Transformador"].map(w => (
                  <span key={w} style={{ background: "#180808", borderRadius: "5px", padding: "3px 9px", color: "#EF4444", fontSize: "11px", fontWeight: 600, fontFamily: "Inter,system-ui" }}>{w}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
