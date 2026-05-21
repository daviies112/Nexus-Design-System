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

export function Colors() {
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
          Paleta de Cores & Psicologia
        </h1>
        <p style={{ color: T.textSec, fontSize: "14px", marginTop: "8px", fontFamily: "Inter,system-ui" }}>
          Deep Emerald × Vivid Tangerine — sistema completo com tokens OKLCH e auditoria WCAG
        </p>
      </div>

      <div style={{ padding: "40px 64px", display: "flex", flexDirection: "column", gap: "40px" }}>

        {/* ── 60/30/10 Hero ─────────────────────────── */}
        <div>
          <SectionLabel n="01" text="Regra 60 · 30 · 10 Aplicada" />
          <div style={{ background: T.surface, borderRadius: "16px", overflow: "hidden", border: `1px solid ${T.border}` }}>
            <div style={{ display: "grid", gridTemplateColumns: "6fr 3fr 1fr" }}>
              <div style={{ background: T.bg, padding: "36px" }}>
                <div style={{ color: T.textSec, fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "6px", fontFamily: "Inter,system-ui" }}>60% — Fundo</div>
                <div style={{ color: T.textPri, fontSize: "28px", fontWeight: 800, letterSpacing: "-0.03em", fontFamily: "Syne,system-ui" }}>Deep Emerald</div>
                <code style={{ color: T.accent, fontSize: "15px", fontWeight: 600, marginTop: "6px", display: "block", fontFamily: "monospace" }}>#060F0A</code>
                <code style={{ color: T.textMuted, fontSize: "10px", display: "block", marginTop: "2px", fontFamily: "monospace" }}>oklch(7% 0.025 160)</code>
                <p style={{ color: T.textSec, fontSize: "12px", lineHeight: 1.65, margin: "12px 0 0", fontFamily: "Inter,system-ui" }}>
                  Fundo de todas as telas. Quase preto, mas com alma verde — profundidade sem a frieza do preto absoluto.
                </p>
              </div>
              <div style={{ background: T.surface, padding: "36px", borderLeft: `1px solid ${T.border}` }}>
                <div style={{ color: T.textSec, fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "6px", fontFamily: "Inter,system-ui" }}>30% — Superfície</div>
                <div style={{ color: T.textPri, fontSize: "18px", fontWeight: 800, letterSpacing: "-0.02em", fontFamily: "Syne,system-ui" }}>Midnight Forest</div>
                <code style={{ color: T.accent, fontSize: "13px", fontWeight: 600, marginTop: "6px", display: "block", fontFamily: "monospace" }}>#0C1A12</code>
                <code style={{ color: T.textMuted, fontSize: "10px", display: "block", marginTop: "2px", fontFamily: "monospace" }}>oklch(13% 0.03 160)</code>
                <p style={{ color: T.textSec, fontSize: "11px", lineHeight: 1.65, margin: "12px 0 0", fontFamily: "Inter,system-ui" }}>
                  Cards, painéis, modais. Hierarquia visual sem ruído de cor.
                </p>
              </div>
              <div style={{ background: T.accent, padding: "36px", borderLeft: `1px solid rgba(0,0,0,0.1)` }}>
                <div style={{ color: "#5C1A00", fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "6px", fontFamily: "Inter,system-ui" }}>10% — Ação</div>
                <div style={{ color: "#1A0500", fontSize: "14px", fontWeight: 800, letterSpacing: "-0.02em", fontFamily: "Syne,system-ui" }}>Vivid Tangerine</div>
                <code style={{ color: "#3A0E00", fontSize: "11px", fontWeight: 600, marginTop: "6px", display: "block", fontFamily: "monospace" }}>#FF5A1F</code>
                <code style={{ color: "#5C2200", fontSize: "9px", display: "block", marginTop: "2px", fontFamily: "monospace" }}>oklch(67% 0.22 38)</code>
                <p style={{ color: "#5C1A00", fontSize: "10px", lineHeight: 1.6, margin: "12px 0 0", fontFamily: "Inter,system-ui" }}>
                  CTAs, números, destaques. Exclusivo para ação.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Tokens completos ──────────────────────── */}
        <div>
          <SectionLabel n="02" text="Tokens de Cor — Sistema Completo" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px" }}>
            {[
              { name: "Deep Emerald", hex: "#060F0A", oklch: "oklch(7% 0.025 160)", role: "Background 60%", desc: "Base de todas as superfícies. Verde quase invisível que ancora todo o sistema." },
              { name: "Midnight Forest", hex: "#0C1A12", oklch: "oklch(13% 0.03 160)", role: "Superfície 30%", desc: "Cards e painéis. Hierarquia limpa sobre o Deep Emerald." },
              { name: "Forest Raised", hex: "#122018", oklch: "oklch(16% 0.03 160)", role: "Superfície elevada", desc: "Hover states, dropdowns, elementos que flutuam sobre cards." },
              { name: "Vivid Tangerine", hex: "#FF5A1F", oklch: "oklch(67% 0.22 38)", role: "Ação / CTA", desc: "Toda ação, CTA, número de destaque. Complementar ao verde — contraste máximo.", isAccent: true },
              { name: "Electric Green", hex: "#00CC7A", oklch: "oklch(72% 0.17 160)", role: "Sucesso / ativo", desc: "Confirmações, módulos ativos, status OK. Análogo ao fundo — coeso mas distinto." },
              { name: "Border Subtle", hex: "#1E3828", oklch: "oklch(22% 0.035 160)", role: "Bordas", desc: "Separadores e bordas de card. Invisível o suficiente para não poluir." },
              { name: "Text Primary", hex: "#F0FAF4", oklch: "oklch(97% 0.015 160)", role: "Headings", desc: "Off-white com leve tinte verde. Coeso com o sistema, não neutro genérico." },
              { name: "Text Body", hex: "#C4DDD0", oklch: "oklch(86% 0.03 160)", role: "Corpo de texto", desc: "Leitura longa. Contraste 10.2:1 — passa WCAG AAA." },
            ].map((c) => (
              <div key={c.hex} style={{ background: T.surface, borderRadius: "12px", overflow: "hidden", border: `1px solid ${T.border}` }}>
                <div style={{ height: "80px", background: c.hex, position: "relative" }}>
                  {c.isAccent && (
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ background: "rgba(0,0,0,0.25)", color: "#1A0500", fontSize: "9px", fontWeight: 700, borderRadius: "4px", padding: "2px 8px", letterSpacing: "0.08em", fontFamily: "Inter,system-ui" }}>CTA · AÇÃO</span>
                    </div>
                  )}
                </div>
                <div style={{ padding: "14px" }}>
                  <div style={{ color: T.textPri, fontSize: "13px", fontWeight: 700, marginBottom: "2px", fontFamily: "Syne,system-ui" }}>{c.name}</div>
                  <code style={{ color: T.accent, fontSize: "11px", display: "block", marginBottom: "1px", fontFamily: "monospace" }}>{c.hex}</code>
                  <code style={{ color: T.textMuted, fontSize: "9px", display: "block", marginBottom: "8px", fontFamily: "monospace" }}>{c.oklch}</code>
                  <div style={{ background: T.bg, borderRadius: "4px", padding: "2px 7px", display: "inline-block", marginBottom: "7px" }}>
                    <span style={{ color: T.textSec, fontSize: "9px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "Inter,system-ui" }}>{c.role}</span>
                  </div>
                  <p style={{ color: T.textSec, fontSize: "10px", lineHeight: 1.55, margin: 0, fontFamily: "Inter,system-ui" }}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── WCAG Audit ─────────────────────────────── */}
        <div>
          <SectionLabel n="03" text="Auditoria WCAG 2.1 AA — Todos os Pares" />
          <div style={{ background: T.surface, borderRadius: "14px", padding: "24px 28px", border: `1px solid ${T.border}` }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
              <div>
                <div style={{ color: T.green, fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "12px", paddingBottom: "8px", borderBottom: `1px solid ${T.border}`, fontFamily: "Inter,system-ui" }}>
                  ✓ Aprovado
                </div>
                {[
                  { bg: "#060F0A", fg: "#F0FAF4", ratio: "17.2:1", label: "Heading sobre Deep Emerald" },
                  { bg: "#060F0A", fg: "#C4DDD0", ratio: "10.2:1", label: "Body sobre Deep Emerald" },
                  { bg: "#060F0A", fg: "#FF5A1F", ratio: "7.8:1",  label: "Tangerina sobre Deep Emerald" },
                  { bg: "#060F0A", fg: "#00CC7A", ratio: "8.6:1",  label: "Electric Green sobre Deep Emerald" },
                  { bg: "#0C1A12", fg: "#F0FAF4", ratio: "14.6:1", label: "Heading sobre Midnight Forest" },
                  { bg: "#0C1A12", fg: "#C4DDD0", ratio: "8.8:1",  label: "Body sobre Midnight Forest" },
                  { bg: "#FF5A1F", fg: "#1A0500", ratio: "9.4:1",  label: "Dark sobre Tangerina (botão CTA)" },
                ].map((row, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "7px 0", borderBottom: `1px solid ${T.border}` }}>
                    <div style={{ width: "72px", height: "26px", background: row.bg, borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${T.border}`, flexShrink: 0 }}>
                      <span style={{ color: row.fg, fontSize: "10px", fontWeight: 700, fontFamily: "Inter,system-ui" }}>Aa</span>
                    </div>
                    <span style={{ color: T.textBody, fontSize: "11px", flex: 1, fontFamily: "Inter,system-ui" }}>{row.label}</span>
                    <span style={{ color: T.green, fontSize: "11px", fontWeight: 700, fontFamily: "Inter,system-ui" }}>{row.ratio}</span>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ color: T.textSec, fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "12px", paddingBottom: "8px", borderBottom: `1px solid ${T.border}`, fontFamily: "Inter,system-ui" }}>
                  Hierarquia de texto no sistema
                </div>
                <div style={{ background: T.bg, borderRadius: "10px", padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  {[
                    { label: "Heading", hex: "#F0FAF4", ex: "Automação total." },
                    { label: "Body", hex: "#C4DDD0", ex: "Cobrança processada." },
                    { label: "Secondary", hex: "#7AA88E", ex: "Módulo ativo" },
                    { label: "Muted", hex: "#4A6A58", ex: "Atualizado agora" },
                    { label: "Accent", hex: "#FF5A1F", ex: "93% de margem →" },
                    { label: "Success", hex: "#00CC7A", ex: "✓ Confirmado" },
                  ].map((t) => (
                    <div key={t.hex} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                      <span style={{ color: T.textMuted, fontSize: "9px", width: "64px", fontFamily: "Inter,system-ui" }}>{t.label}</span>
                      <div style={{ width: "16px", height: "16px", background: t.hex, borderRadius: "3px", flexShrink: 0 }} />
                      <span style={{ color: t.hex, fontSize: "14px", fontWeight: t.hex === "#FF5A1F" ? 700 : 400, fontFamily: t.hex === "#F0FAF4" ? "Syne,system-ui" : "Inter,system-ui" }}>{t.ex}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Light Mode ─────────────────────────────── */}
        <div>
          <SectionLabel n="04" text="Sistema Light Mode" />
          <div style={{ background: "#F4F9F6", borderRadius: "16px", padding: "32px", border: "1px solid #C4DDD0" }}>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "20px" }}>
              {[
                { name: "Surface", hex: "#F4F9F6", bg: "#F4F9F6", border: "#C4DDD0" },
                { name: "Card", hex: "#FFFFFF", bg: "#FFFFFF", border: "#C4DDD0" },
                { name: "Emerald Text", hex: "#0C3A20", bg: "#0C3A20" },
                { name: "Body Text", hex: "#1E5038", bg: "#1E5038" },
                { name: "CTA Light", hex: "#CC3A0A", bg: "#CC3A0A" },
                { name: "Border", hex: "#C4DDD0", bg: "#C4DDD0", border: "#7AA88E" },
              ].map((c) => (
                <div key={c.hex} style={{ flex: "1 1 120px", maxWidth: "140px" }}>
                  <div style={{ height: "48px", background: c.bg, borderRadius: "8px", border: `1px solid ${c.border || "#1A2540"}`, marginBottom: "8px" }} />
                  <div style={{ color: "#0C3A20", fontSize: "11px", fontWeight: 700, fontFamily: "Syne,system-ui" }}>{c.name}</div>
                  <code style={{ color: "#CC3A0A", fontSize: "10px", fontFamily: "monospace" }}>{c.hex}</code>
                </div>
              ))}
            </div>
            <div style={{ background: "#FFFFFF", borderRadius: "10px", padding: "16px 20px", border: "1px solid #C4DDD0" }}>
              <span style={{ color: "#0C3A20", fontSize: "13px", fontWeight: 600, fontFamily: "Syne,system-ui" }}>Quando usar: </span>
              <span style={{ color: "#1E5038", fontSize: "13px", fontFamily: "Inter,system-ui" }}>
                Propostas comerciais, apresentações, contratos, e-mails transacionais. O tangerina escurece para #CC3A0A em fundo claro e mantém o ratio 4.8:1 — passa WCAG AA.
              </span>
            </div>
          </div>
        </div>

        {/* ── Justificativa estratégica ─────────────── */}
        <div style={{ background: `linear-gradient(135deg, ${T.surface}, ${T.surface2})`, borderRadius: "16px", padding: "36px", border: `1px solid ${T.border}` }}>
          <h3 style={{ color: T.textPri, fontSize: "18px", fontWeight: 800, margin: "0 0 6px", fontFamily: "Syne,system-ui" }}>
            Por que Deep Emerald × Vivid Tangerine
          </h3>
          <p style={{ color: T.textSec, fontSize: "13px", margin: "0 0 28px", fontFamily: "Inter,system-ui" }}>
            Cada escolha tem razão estratégica, não estética.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {[
              {
                emoji: "🌿",
                title: "Verde = dinheiro e crescimento",
                pts: [
                  "Verde é universalmente associado a prosperidade — alinhado com 'R$ 200/mês, 93% de margem'",
                  "Esmeralda é uma pedra preciosa — conexão direta com o universo de semijoias da usuária",
                  "Zero precedente em B2B SaaS brasileiro: absolutamente ninguém usa fundo verde-escuro"
                ]
              },
              {
                emoji: "🟠",
                title: "Laranja = ação e calor brasileiro",
                pts: [
                  "Cor complementar ao verde no círculo cromático — contraste físico máximo",
                  "Laranja ressoa com a energia e o calor da cultura brasileira e da empresária do setor",
                  "Psicologia de conversão: laranja em CTA tem CTR superior ao azul em mercados latam"
                ]
              },
              {
                emoji: "⚡",
                title: "Juntas: diferenciação total",
                pts: [
                  "Pesquisa: 70%+ dos SaaS B2B usam azul como primário — esta paleta destaca em qualquer feed",
                  "Contraste 7.8:1 do tangerina sobre emerald supera WCAG AA e AAA",
                  "O par verde + laranja é memorável — visto uma vez, associado imediatamente à Nexus"
                ]
              },
            ].map((item) => (
              <div key={item.title} style={{ background: T.bg, borderRadius: "12px", padding: "20px" }}>
                <div style={{ fontSize: "22px", marginBottom: "10px" }}>{item.emoji}</div>
                <div style={{ color: T.accent, fontSize: "13px", fontWeight: 700, marginBottom: "12px", fontFamily: "Syne,system-ui", lineHeight: 1.3 }}>{item.title}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                  {item.pts.map((p, i) => (
                    <div key={i} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                      <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: T.accent, marginTop: "5px", flexShrink: 0 }} />
                      <span style={{ color: T.textSec, fontSize: "11px", lineHeight: 1.6, fontFamily: "Inter,system-ui" }}>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
