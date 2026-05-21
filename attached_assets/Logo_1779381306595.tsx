const GoogleFonts = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap');
  `}</style>
);

/* ─── Tokens ─────────────────────────────────────── */
const T = {
  bg:         "#060F0A",
  surface:    "#0C1A12",
  surface2:   "#122018",
  border:     "#1E3828",
  accent:     "#FF5A1F",   /* Vivid Tangerine — ação */
  green:      "#00CC7A",   /* Electric Green — sucesso / ativo */
  textPri:    "#F0FAF4",
  textBody:   "#C4DDD0",
  textSec:    "#7AA88E",
  textMuted:  "#4A6A58",
};

const NexusIcon = ({ size = 80, stroke = T.accent }: { size?: number; stroke?: string }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <path d="M40 4L72 22V58L40 76L8 58V22L40 4Z" stroke={stroke} strokeWidth="1.5" fill="none" opacity="0.35"/>
    <path d="M40 14L62 26.5V51.5L40 64L18 51.5V26.5L40 14Z" stroke={stroke} strokeWidth="1" fill="none" opacity="0.2"/>
    <circle cx="40" cy="39" r="5.5" fill={stroke}/>
    <line x1="40" y1="14" x2="40" y2="33.5" stroke={stroke} strokeWidth="1.3" opacity="0.65"/>
    <line x1="62" y1="26.5" x2="44.3" y2="36.5" stroke={stroke} strokeWidth="1.3" opacity="0.65"/>
    <line x1="62" y1="51.5" x2="44.3" y2="41.5" stroke={stroke} strokeWidth="1.3" opacity="0.65"/>
    <line x1="40" y1="64" x2="40" y2="44.5" stroke={stroke} strokeWidth="1.3" opacity="0.65"/>
    <line x1="18" y1="51.5" x2="35.7" y2="41.5" stroke={stroke} strokeWidth="1.3" opacity="0.65"/>
    <line x1="18" y1="26.5" x2="35.7" y2="36.5" stroke={stroke} strokeWidth="1.3" opacity="0.65"/>
    <circle cx="40" cy="14" r="2.8" fill={stroke} opacity="0.9"/>
    <circle cx="62" cy="26.5" r="2.8" fill={stroke} opacity="0.9"/>
    <circle cx="62" cy="51.5" r="2.8" fill={stroke} opacity="0.9"/>
    <circle cx="40" cy="64" r="2.8" fill={stroke} opacity="0.9"/>
    <circle cx="18" cy="51.5" r="2.8" fill={stroke} opacity="0.9"/>
    <circle cx="18" cy="26.5" r="2.8" fill={stroke} opacity="0.9"/>
    <circle cx="40" cy="39" r="16" fill={stroke} opacity="0.07"/>
  </svg>
);

const SectionLabel = ({ n, text }: { n: string; text: string }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
    <span style={{ color: T.accent, fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", fontFamily: "Inter,system-ui" }}>{n}</span>
    <span style={{ color: T.textSec, fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "Inter,system-ui" }}>{text}</span>
    <div style={{ flex: 1, height: "1px", background: T.border }} />
  </div>
);

export function Logo() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: T.bg }}>
      <GoogleFonts />

      {/* ── Header ─────────────────────────────────── */}
      <div style={{ padding: "48px 64px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
          <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: T.accent }} />
          <span style={{ color: T.accent, fontSize: "11px", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "Inter,system-ui" }}>
            Nexus Intelligence — Sistema de Marca
          </span>
        </div>
        <h1 style={{ color: T.textPri, fontSize: "32px", fontWeight: 800, letterSpacing: "-0.03em", margin: 0, fontFamily: "Syne,system-ui" }}>
          Logo & Identidade Visual
        </h1>
        <p style={{ color: T.textSec, fontSize: "14px", marginTop: "8px", fontFamily: "Inter,system-ui" }}>
          Construção do símbolo, variações, área de proteção e aplicações corretas
        </p>
      </div>

      <div style={{ padding: "40px 64px", display: "flex", flexDirection: "column", gap: "40px" }}>

        {/* ── Logo Principal — Fundo Escuro ─────────── */}
        <div>
          <SectionLabel n="01" text="Versão Principal — Fundo Escuro" />
          <div style={{ background: T.surface, borderRadius: "16px", border: `1px solid ${T.border}` }}>
            <div style={{ padding: "56px 48px", display: "flex", alignItems: "center", justifyContent: "center", gap: "64px", flexWrap: "wrap" }}>

              {/* Símbolo isolado */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}>
                <NexusIcon size={88} />
                <span style={{ color: T.textMuted, fontSize: "10px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "Inter,system-ui" }}>
                  Símbolo
                </span>
              </div>

              <div style={{ width: "1px", height: "80px", background: T.border }} />

              {/* Wordmark completo */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                  <NexusIcon size={56} />
                  <div>
                    <div style={{ color: T.textPri, fontSize: "38px", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1, fontFamily: "Syne,system-ui" }}>
                      nexus
                    </div>
                    <div style={{ color: T.accent, fontSize: "11px", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", marginTop: "4px", fontFamily: "Inter,system-ui" }}>
                      intelligence
                    </div>
                  </div>
                </div>
                <span style={{ color: T.textMuted, fontSize: "10px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "Inter,system-ui" }}>
                  Wordmark completo
                </span>
              </div>

              <div style={{ width: "1px", height: "80px", background: T.border }} />

              {/* Horizontal compacto */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <NexusIcon size={28} />
                  <span style={{ color: T.textPri, fontSize: "18px", fontWeight: 700, letterSpacing: "-0.02em", fontFamily: "Syne,system-ui" }}>
                    Nexus{" "}<span style={{ color: T.accent }}>Intelligence</span>
                  </span>
                </div>
                <span style={{ color: T.textMuted, fontSize: "10px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "Inter,system-ui" }}>
                  Horizontal / UI
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Logo em Fundos Especiais ───────────────── */}
        <div>
          <SectionLabel n="02" text="Versões por Contexto de Fundo" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>

            {/* Fundo light */}
            <div style={{ background: T.surface, borderRadius: "14px", border: `1px solid ${T.border}`, overflow: "hidden" }}>
              <div style={{ background: "#F4F9F6", padding: "32px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
                <NexusIcon size={44} stroke="#0C3A20" />
                <div style={{ textAlign: "center" }}>
                  <div style={{ color: "#0C3A20", fontSize: "22px", fontWeight: 800, letterSpacing: "-0.04em", fontFamily: "Syne,system-ui" }}>nexus</div>
                  <div style={{ color: "#CC3A0A", fontSize: "8px", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", marginTop: "3px", fontFamily: "Inter,system-ui" }}>intelligence</div>
                </div>
              </div>
              <div style={{ padding: "12px 16px" }}>
                <div style={{ color: T.textSec, fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "Inter,system-ui" }}>Fundo Claro</div>
                <div style={{ color: T.textMuted, fontSize: "10px", marginTop: "2px", fontFamily: "Inter,system-ui" }}>Docs, propostas, PDF</div>
              </div>
            </div>

            {/* Tangerine (CTA background) */}
            <div style={{ background: T.surface, borderRadius: "14px", border: `1px solid ${T.border}`, overflow: "hidden" }}>
              <div style={{ background: T.accent, padding: "32px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
                <NexusIcon size={44} stroke="#1A0800" />
                <div style={{ textAlign: "center" }}>
                  <div style={{ color: "#1A0800", fontSize: "22px", fontWeight: 800, letterSpacing: "-0.04em", fontFamily: "Syne,system-ui" }}>nexus</div>
                  <div style={{ color: "#3A1000", fontSize: "8px", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", marginTop: "3px", fontFamily: "Inter,system-ui" }}>intelligence</div>
                </div>
              </div>
              <div style={{ padding: "12px 16px" }}>
                <div style={{ color: T.textSec, fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "Inter,system-ui" }}>Fundo Tangerina</div>
                <div style={{ color: T.textMuted, fontSize: "10px", marginTop: "2px", fontFamily: "Inter,system-ui" }}>Banners, CTAs, crachás</div>
              </div>
            </div>

            {/* App icon sizes */}
            <div style={{ background: T.surface, borderRadius: "14px", border: `1px solid ${T.border}`, overflow: "hidden" }}>
              <div style={{ background: T.surface2, padding: "32px", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
                <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                  <div style={{ width: "56px", height: "56px", background: T.bg, borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${T.border}` }}>
                    <NexusIcon size={36} />
                  </div>
                  <div style={{ width: "40px", height: "40px", background: T.bg, borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${T.border}` }}>
                    <NexusIcon size={26} />
                  </div>
                  <div style={{ width: "28px", height: "28px", background: T.bg, borderRadius: "7px", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${T.border}` }}>
                    <NexusIcon size={18} />
                  </div>
                </div>
              </div>
              <div style={{ padding: "12px 16px" }}>
                <div style={{ color: T.textSec, fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "Inter,system-ui" }}>App Icon</div>
                <div style={{ color: T.textMuted, fontSize: "10px", marginTop: "2px", fontFamily: "Inter,system-ui" }}>56 · 40 · 28px</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Anatomia + Nome ────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div style={{ background: T.surface, borderRadius: "14px", padding: "28px", border: `1px solid ${T.border}` }}>
            <h3 style={{ color: T.textPri, fontSize: "15px", fontWeight: 700, margin: "0 0 20px", fontFamily: "Syne,system-ui" }}>
              Anatomia do Símbolo
            </h3>
            <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
              <NexusIcon size={96} />
              <div style={{ display: "flex", flexDirection: "column", gap: "11px" }}>
                {[
                  { label: "Hexágono duplo", desc: "6 lados = 6 pilares operacionais" },
                  { label: "Nós periféricos", desc: "Módulos que se integram em rede" },
                  { label: "Centro irradiante", desc: "IA que processa e decide sozinha" },
                  { label: "Linhas de dados", desc: "Fluxo automático — zero intervenção" },
                ].map((item) => (
                  <div key={item.label} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: T.accent, marginTop: "5px", flexShrink: 0 }} />
                    <div>
                      <span style={{ color: T.textPri, fontSize: "12px", fontWeight: 600, fontFamily: "Inter,system-ui" }}>{item.label}</span>
                      <span style={{ color: T.textSec, fontSize: "11px", fontFamily: "Inter,system-ui" }}> — {item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ background: T.surface, borderRadius: "14px", padding: "28px", border: `1px solid ${T.border}` }}>
            <h3 style={{ color: T.textPri, fontSize: "15px", fontWeight: 700, margin: "0 0 20px", fontFamily: "Syne,system-ui" }}>
              Nexus Intelligence — a escolha do nome
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ background: T.bg, borderRadius: "10px", padding: "16px 18px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
                  <span style={{ color: T.accent, fontSize: "24px", fontWeight: 800, letterSpacing: "-0.02em", fontFamily: "Syne,system-ui" }}>NEXUS</span>
                  <span style={{ color: T.textMuted, fontSize: "10px", fontFamily: "Inter,system-ui" }}>latim</span>
                </div>
                <p style={{ color: T.textBody, fontSize: "12px", lineHeight: 1.65, margin: 0, fontFamily: "Inter,system-ui" }}>
                  Elo, ligação, ponto de convergência. Tudo que era fragmentado — cobrança, estoque, atendimento — conectado num único nexo.
                </p>
              </div>
              <div style={{ background: T.bg, borderRadius: "10px", padding: "16px 18px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
                  <span style={{ color: T.textPri, fontSize: "24px", fontWeight: 800, letterSpacing: "-0.02em", fontFamily: "Syne,system-ui" }}>INTELLIGENCE</span>
                  <span style={{ color: T.textMuted, fontSize: "10px", fontFamily: "Inter,system-ui" }}>inglês</span>
                </div>
                <p style={{ color: T.textBody, fontSize: "12px", lineHeight: 1.65, margin: 0, fontFamily: "Inter,system-ui" }}>
                  Não IA genérica — inteligência operacional. O sistema age, decide e executa sem precisar ser pedido. Sempre.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Usos Incorretos ───────────────────────── */}
        <div style={{ background: T.surface, borderRadius: "14px", padding: "28px", border: `1px solid ${T.border}` }}>
          <h3 style={{ color: T.textPri, fontSize: "15px", fontWeight: 700, margin: "0 0 20px", fontFamily: "Syne,system-ui" }}>
            O que nunca fazer com o logo
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "12px" }}>
            {[
              { label: "Não distorça", note: "proporção original", sx: { transform: "scaleX(1.5)" } },
              { label: "Não rotacione", note: "orientação fixa", sx: { transform: "rotate(30deg)" } },
              { label: "Não adicione sombra", note: "símbolo sempre limpo", sx: { filter: "drop-shadow(0 0 10px #FF5A1F)" } },
              { label: "Não troque a cor", note: "só paleta oficial", stroke: "#22C55E" },
              { label: "Fundo sem contraste", note: "mínimo 4.5:1", bg: "#4A6A58" },
            ].map((item, i) => (
              <div key={i} style={{ background: item.bg || T.bg, borderRadius: "10px", padding: "16px 10px", textAlign: "center", border: `1px solid ${T.border}` }}>
                <div style={{ marginBottom: "10px", display: "flex", justifyContent: "center" }}>
                  <div style={item.sx || {}}>
                    <NexusIcon size={34} stroke={item.stroke || T.accent} />
                  </div>
                </div>
                <div style={{ color: "#EF4444", fontSize: "10px", fontWeight: 700, marginBottom: "2px", fontFamily: "Inter,system-ui" }}>✗ {item.label}</div>
                <div style={{ color: T.textMuted, fontSize: "9px", fontFamily: "Inter,system-ui" }}>{item.note}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Tagline ───────────────────────────────── */}
        <div style={{
          background: `linear-gradient(135deg, ${T.surface} 0%, ${T.surface2} 100%)`,
          borderRadius: "16px", padding: "44px 52px",
          border: `1px solid ${T.border}`, textAlign: "center", position: "relative", overflow: "hidden"
        }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "500px", height: "300px", background: `radial-gradient(circle, rgba(255,90,31,0.07) 0%, transparent 70%)`, pointerEvents: "none" }} />
          <div style={{ color: T.textMuted, fontSize: "11px", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "18px", fontFamily: "Inter,system-ui" }}>
            Tagline Oficial
          </div>
          <div style={{ color: T.textPri, fontSize: "28px", fontWeight: 300, letterSpacing: "-0.01em", lineHeight: 1.4, fontFamily: "Syne,system-ui" }}>
            Automação que devolve tempo{" "}
            <span style={{ color: T.accent, fontWeight: 800 }}>para quem importa.</span>
          </div>
          <div style={{ marginTop: "18px", color: T.textMuted, fontSize: "13px", lineHeight: 1.6, maxWidth: "480px", margin: "18px auto 0", fontFamily: "Inter,system-ui" }}>
            Produto, promessa, persona e propósito em seis palavras. Não vende tecnologia — vende o resultado de tê-la.
          </div>
        </div>

      </div>
    </div>
  );
}
