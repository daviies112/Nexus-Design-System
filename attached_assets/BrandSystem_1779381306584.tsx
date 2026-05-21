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

const NexusIconSm = ({ size = 22, stroke = T.accent }: { size?: number; stroke?: string }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <path d="M40 4L72 22V58L40 76L8 58V22L40 4Z" stroke={stroke} strokeWidth="2" fill="none" opacity="0.5"/>
    <circle cx="40" cy="39" r="5" fill={stroke}/>
    <line x1="40" y1="14" x2="40" y2="34" stroke={stroke} strokeWidth="1.5" opacity="0.7"/>
    <line x1="62" y1="26.5" x2="44.3" y2="36.5" stroke={stroke} strokeWidth="1.5" opacity="0.7"/>
    <line x1="62" y1="51.5" x2="44.3" y2="41.5" stroke={stroke} strokeWidth="1.5" opacity="0.7"/>
    <line x1="40" y1="64" x2="40" y2="44" stroke={stroke} strokeWidth="1.5" opacity="0.7"/>
    <line x1="18" y1="51.5" x2="35.7" y2="41.5" stroke={stroke} strokeWidth="1.5" opacity="0.7"/>
    <line x1="18" y1="26.5" x2="35.7" y2="36.5" stroke={stroke} strokeWidth="1.5" opacity="0.7"/>
    <circle cx="40" cy="14" r="3" fill={stroke} opacity="0.9"/>
    <circle cx="62" cy="26.5" r="3" fill={stroke} opacity="0.9"/>
    <circle cx="62" cy="51.5" r="3" fill={stroke} opacity="0.9"/>
    <circle cx="40" cy="64" r="3" fill={stroke} opacity="0.9"/>
    <circle cx="18" cy="51.5" r="3" fill={stroke} opacity="0.9"/>
    <circle cx="18" cy="26.5" r="3" fill={stroke} opacity="0.9"/>
  </svg>
);

const SectionLabel = ({ n, text }: { n: string; text: string }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
    <span style={{ color: T.accent, fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", fontFamily: "Inter,system-ui" }}>{n}</span>
    <span style={{ color: T.textSec, fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "Inter,system-ui" }}>{text}</span>
    <div style={{ flex: 1, height: "1px", background: T.border }} />
  </div>
);

export function BrandSystem() {
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
          Brand System — Aplicações Reais
        </h1>
        <p style={{ color: T.textSec, fontSize: "14px", marginTop: "8px", fontFamily: "Inter,system-ui" }}>
          Landing page, componentes UI, WhatsApp, dashboard e manifesto
        </p>
      </div>

      <div style={{ padding: "40px 64px", display: "flex", flexDirection: "column", gap: "40px" }}>

        {/* ── Landing Hero ──────────────────────────── */}
        <div>
          <SectionLabel n="01" text="Landing Page — Hero Section" />
          <div style={{ background: T.surface, borderRadius: "16px", overflow: "hidden", border: `1px solid ${T.border}` }}>

            {/* Nav */}
            <div style={{ padding: "14px 36px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", background: T.bg }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <NexusIconSm size={22} />
                <span style={{ color: T.textPri, fontSize: "14px", fontWeight: 700, letterSpacing: "-0.02em", fontFamily: "Syne,system-ui" }}>
                  nexus <span style={{ color: T.accent }}>intelligence</span>
                </span>
              </div>
              <div style={{ display: "flex", gap: "24px" }}>
                {["Plataforma", "Preços", "Casos de uso", "Blog"].map(item => (
                  <span key={item} style={{ color: T.textSec, fontSize: "13px", fontFamily: "Inter,system-ui", cursor: "pointer" }}>{item}</span>
                ))}
              </div>
              <div style={{ background: T.accent, borderRadius: "8px", padding: "9px 22px" }}>
                <span style={{ color: "#1A0500", fontSize: "13px", fontWeight: 700, fontFamily: "Inter,system-ui" }}>Ver demonstração</span>
              </div>
            </div>

            {/* Hero */}
            <div style={{ padding: "72px 36px 56px", textAlign: "center", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "700px", height: "400px", background: `radial-gradient(ellipse, rgba(255,90,31,0.09) 0%, transparent 65%)`, pointerEvents: "none" }} />
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: T.surface2, border: `1px solid ${T.border}`, borderRadius: "100px", padding: "6px 16px", marginBottom: "24px" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: T.green }} />
                <span style={{ color: T.textSec, fontSize: "12px", fontWeight: 500, fontFamily: "Inter,system-ui" }}>70% concluído · lançamento em 4 meses</span>
              </div>
              <h1 style={{ color: T.textPri, fontSize: "52px", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.0, margin: "0 auto 20px", maxWidth: "780px", fontFamily: "Syne,system-ui" }}>
                Sua empresa de semijoias
                <br /><span style={{ color: T.accent }}>roda sozinha.</span>
              </h1>
              <p style={{ color: T.textSec, fontSize: "17px", lineHeight: 1.65, maxWidth: "520px", margin: "0 auto 36px", fontFamily: "Inter,system-ui" }}>
                21 módulos integrados. IA em cada etapa. Zero funcionário para operar. Do marketing à nota fiscal — automático.
              </p>
              <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
                <div style={{ background: T.accent, borderRadius: "10px", padding: "14px 28px" }}>
                  <span style={{ color: "#1A0500", fontSize: "15px", fontWeight: 700, fontFamily: "Inter,system-ui" }}>Quero ver funcionando</span>
                </div>
                <div style={{ background: "transparent", border: `1px solid ${T.border}`, borderRadius: "10px", padding: "14px 28px" }}>
                  <span style={{ color: T.textSec, fontSize: "15px", fontWeight: 500, fontFamily: "Inter,system-ui" }}>Comparar com o que uso hoje</span>
                </div>
              </div>
              <div style={{ marginTop: "52px", display: "flex", justifyContent: "center", gap: "48px" }}>
                {[
                  { n: "93%", l: "Margem por cliente" },
                  { n: "R$ 200", l: "Custo operacional/mês" },
                  { n: "Zero", l: "Intervenção humana" },
                  { n: "21", l: "Módulos integrados" },
                ].map(stat => (
                  <div key={stat.l} style={{ textAlign: "center" }}>
                    <div style={{ color: T.accent, fontSize: "30px", fontWeight: 800, letterSpacing: "-0.03em", fontFamily: "Syne,system-ui" }}>{stat.n}</div>
                    <div style={{ color: T.textMuted, fontSize: "12px", marginTop: "4px", fontFamily: "Inter,system-ui" }}>{stat.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Componentes UI ────────────────────────── */}
        <div>
          <SectionLabel n="02" text="Componentes UI Essenciais" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>

            {/* Botões */}
            <div style={{ background: T.surface, borderRadius: "14px", padding: "22px", border: `1px solid ${T.border}` }}>
              <div style={{ color: T.textMuted, fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "14px", fontFamily: "Inter,system-ui" }}>Botões</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ background: T.accent, borderRadius: "8px", padding: "11px 18px" }}>
                  <span style={{ color: "#1A0500", fontSize: "13px", fontWeight: 700, fontFamily: "Inter,system-ui" }}>Primário — Ação principal</span>
                </div>
                <div style={{ background: "transparent", borderRadius: "8px", padding: "10px 18px", border: `1px solid ${T.accent}` }}>
                  <span style={{ color: T.accent, fontSize: "13px", fontWeight: 600, fontFamily: "Inter,system-ui" }}>Secundário — Alternativa</span>
                </div>
                <div style={{ background: "transparent", borderRadius: "8px", padding: "10px 18px", border: `1px solid ${T.border}` }}>
                  <span style={{ color: T.textSec, fontSize: "13px", fontFamily: "Inter,system-ui" }}>Ghost — Terciário</span>
                </div>
                <div style={{ background: "rgba(239,68,68,0.1)", borderRadius: "8px", padding: "10px 18px", border: "1px solid rgba(239,68,68,0.3)" }}>
                  <span style={{ color: "#EF4444", fontSize: "13px", fontWeight: 600, fontFamily: "Inter,system-ui" }}>Destrutivo</span>
                </div>
              </div>
            </div>

            {/* Cards de módulo */}
            <div style={{ background: T.surface, borderRadius: "14px", padding: "22px", border: `1px solid ${T.border}` }}>
              <div style={{ color: T.textMuted, fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "14px", fontFamily: "Inter,system-ui" }}>Cards de Módulo</div>
              {[
                { icon: "◎", title: "Amanda AI", sub: "Atendimento 24/7", st: "Ativo", ok: true },
                { icon: "⬡", title: "Datacorp", sub: "Validação jurídica", st: "Configurar", ok: false },
                { icon: "◈", title: "NotaFiscal", sub: "Emissão automática", st: "Ativo", ok: true },
              ].map(card => (
                <div key={card.title} style={{ background: T.bg, borderRadius: "8px", padding: "12px 14px", marginBottom: "8px", border: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <span style={{ color: T.accent, fontSize: "16px" }}>{card.icon}</span>
                    <div>
                      <div style={{ color: T.textPri, fontSize: "12px", fontWeight: 600, fontFamily: "Inter,system-ui" }}>{card.title}</div>
                      <div style={{ color: T.textMuted, fontSize: "10px", fontFamily: "Inter,system-ui" }}>{card.sub}</div>
                    </div>
                  </div>
                  <span style={{
                    background: card.ok ? "rgba(0,204,122,0.1)" : "rgba(255,90,31,0.1)",
                    color: card.ok ? T.green : T.accent,
                    fontSize: "9px", fontWeight: 700, borderRadius: "4px", padding: "2px 8px",
                    fontFamily: "Inter,system-ui"
                  }}>{card.st}</span>
                </div>
              ))}
            </div>

            {/* Badges e notificação */}
            <div style={{ background: T.surface, borderRadius: "14px", padding: "22px", border: `1px solid ${T.border}` }}>
              <div style={{ color: T.textMuted, fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "14px", fontFamily: "Inter,system-ui" }}>Badges & Status</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "14px" }}>
                {[
                  { l: "Ativo",       bg: "rgba(0,204,122,0.12)",  c: "#00CC7A" },
                  { l: "Automático",  bg: "rgba(255,90,31,0.12)",  c: "#FF5A1F" },
                  { l: "Processando", bg: "rgba(255,90,31,0.1)",   c: "#FF8040" },
                  { l: "Pendente",    bg: "rgba(245,158,11,0.12)", c: "#F59E0B" },
                  { l: "Erro",        bg: "rgba(239,68,68,0.12)",  c: "#EF4444" },
                  { l: "Zero toque",  bg: "rgba(0,204,122,0.12)",  c: "#00CC7A" },
                  { l: "IA",          bg: "rgba(139,92,246,0.12)", c: "#A78BFA" },
                ].map(b => (
                  <span key={b.l} style={{ background: b.bg, color: b.c, fontSize: "10px", fontWeight: 700, borderRadius: "5px", padding: "3px 9px", fontFamily: "Inter,system-ui" }}>{b.l}</span>
                ))}
              </div>
              <div style={{ background: T.bg, borderRadius: "8px", padding: "12px 14px", border: `1px solid ${T.border}` }}>
                <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                  <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: T.green, marginTop: "4px", flexShrink: 0 }} />
                  <span style={{ color: T.textBody, fontSize: "11px", lineHeight: 1.55, fontFamily: "Inter,system-ui" }}>
                    Cobrança de <strong style={{ color: T.accent }}>R$ 450</strong> processada automaticamente — Revendedora #132.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── WhatsApp + Dashboard ─────────────────── */}
        <div>
          <SectionLabel n="03" text="Aplicações — WhatsApp & Dashboard" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>

            {/* WhatsApp */}
            <div style={{ background: T.surface, borderRadius: "14px", padding: "22px", border: `1px solid ${T.border}` }}>
              <div style={{ color: T.textMuted, fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "14px", fontFamily: "Inter,system-ui" }}>WhatsApp — Mensagens da Amanda</div>
              <div style={{ background: T.bg, borderRadius: "10px", padding: "14px", display: "flex", flexDirection: "column", gap: "10px" }}>

                {/* Amanda message */}
                <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                  <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: `linear-gradient(135deg, ${T.surface2}, ${T.accent})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <NexusIconSm size={16} stroke="#1A0500" />
                  </div>
                  <div style={{ background: T.surface, borderRadius: "10px 10px 10px 3px", padding: "10px 13px", maxWidth: "85%" }}>
                    <div style={{ color: T.accent, fontSize: "10px", fontWeight: 700, marginBottom: "4px", fontFamily: "Inter,system-ui" }}>Amanda · Nexus Intelligence</div>
                    <p style={{ color: T.textBody, fontSize: "12px", lineHeight: 1.55, margin: 0, fontFamily: "Inter,system-ui" }}>
                      Ana, a maleta #47 está com você há 18 dias. Gero a cobrança de R$ 1.240 agora?
                    </p>
                    <div style={{ color: T.textMuted, fontSize: "9px", marginTop: "5px", textAlign: "right", fontFamily: "Inter,system-ui" }}>agora · ✓✓</div>
                  </div>
                </div>

                {/* User reply */}
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <div style={{ background: T.surface2, border: `1px solid ${T.border}`, borderRadius: "10px 10px 3px 10px", padding: "10px 13px", maxWidth: "65%" }}>
                    <p style={{ color: T.textBody, fontSize: "12px", margin: 0, fontFamily: "Inter,system-ui" }}>Sim, pode gerar!</p>
                    <div style={{ color: T.textMuted, fontSize: "9px", marginTop: "5px", textAlign: "right", fontFamily: "Inter,system-ui" }}>agora · ✓✓</div>
                  </div>
                </div>

                {/* Amanda confirmation */}
                <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                  <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: `linear-gradient(135deg, ${T.surface2}, ${T.accent})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <NexusIconSm size={16} stroke="#1A0500" />
                  </div>
                  <div style={{ background: T.surface, borderRadius: "10px 10px 10px 3px", padding: "10px 13px", maxWidth: "85%" }}>
                    <div style={{ color: T.accent, fontSize: "10px", fontWeight: 700, marginBottom: "4px", fontFamily: "Inter,system-ui" }}>Amanda · Nexus Intelligence</div>
                    <p style={{ color: T.textBody, fontSize: "12px", lineHeight: 1.55, margin: "0 0 6px", fontFamily: "Inter,system-ui" }}>
                      PIX enviado. NF-e emitida. Prazo: 3 dias úteis.
                    </p>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <span style={{ background: "rgba(0,204,122,0.15)", color: T.green, fontSize: "9px", fontWeight: 700, borderRadius: "4px", padding: "2px 7px", fontFamily: "Inter,system-ui" }}>R$ 1.240 gerado</span>
                      <span style={{ background: "rgba(255,90,31,0.12)", color: T.accent, fontSize: "9px", fontWeight: 700, borderRadius: "4px", padding: "2px 7px", fontFamily: "Inter,system-ui" }}>NF-e emitida</span>
                    </div>
                    <div style={{ color: T.textMuted, fontSize: "9px", marginTop: "5px", textAlign: "right", fontFamily: "Inter,system-ui" }}>agora · ✓✓</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dashboard */}
            <div style={{ background: T.surface, borderRadius: "14px", padding: "22px", border: `1px solid ${T.border}` }}>
              <div style={{ color: T.textMuted, fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "14px", fontFamily: "Inter,system-ui" }}>Dashboard — Métricas</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px" }}>
                {[
                  { l: "Receita do mês",           v: "R$ 156.400", d: "+18%",   ok: true },
                  { l: "Revendedoras ativas",       v: "247",        d: "+12",    ok: true },
                  { l: "Cobranças automáticas",     v: "1.840",      d: "100%",   ok: true },
                  { l: "Inadimplência",             v: "R$ 8.200",   d: "-4%",    ok: false },
                ].map(m => (
                  <div key={m.l} style={{ background: T.bg, borderRadius: "8px", padding: "14px", border: `1px solid ${T.border}` }}>
                    <div style={{ color: T.textMuted, fontSize: "9px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "5px", fontFamily: "Inter,system-ui" }}>{m.l}</div>
                    <div style={{ color: T.textPri, fontSize: "20px", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "3px", fontFamily: "Syne,system-ui" }}>{m.v}</div>
                    <span style={{ color: m.ok ? T.green : "#EF4444", fontSize: "10px", fontWeight: 700, fontFamily: "Inter,system-ui" }}>{m.d}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: T.bg, borderRadius: "8px", padding: "13px", border: `1px solid ${T.border}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <span style={{ color: T.textBody, fontSize: "11px", fontWeight: 600, fontFamily: "Inter,system-ui" }}>Automações hoje</span>
                  <span style={{ color: T.accent, fontSize: "12px", fontWeight: 700, fontFamily: "Syne,system-ui" }}>2.847</span>
                </div>
                <div style={{ height: "4px", background: T.border, borderRadius: "2px" }}>
                  <div style={{ height: "100%", width: "78%", background: `linear-gradient(90deg, ${T.surface2}, ${T.accent})`, borderRadius: "2px" }} />
                </div>
                <div style={{ color: T.textMuted, fontSize: "10px", marginTop: "5px", fontFamily: "Inter,system-ui" }}>
                  Nenhuma intervenção humana necessária hoje.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Manifesto ────────────────────────────── */}
        <div style={{
          background: `linear-gradient(135deg, ${T.surface} 0%, ${T.surface2} 60%, ${T.bg} 100%)`,
          borderRadius: "16px", padding: "52px",
          border: `1px solid ${T.border}`,
          position: "relative", overflow: "hidden"
        }}>
          <div style={{ position: "absolute", top: "50%", right: "-80px", width: "500px", height: "500px", background: `radial-gradient(circle, rgba(255,90,31,0.06) 0%, transparent 65%)`, transform: "translateY(-50%)", pointerEvents: "none" }} />
          <div style={{ maxWidth: "680px", position: "relative" }}>
            <div style={{ color: T.textMuted, fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "24px", fontFamily: "Inter,system-ui" }}>
              Manifesto
            </div>
            <blockquote style={{ margin: 0 }}>
              <p style={{ color: T.textBody, fontSize: "21px", fontWeight: 300, lineHeight: 1.65, letterSpacing: "-0.01em", margin: "0 0 16px", fontFamily: "Syne,system-ui" }}>
                "Você não acorda pensando em automação.
              </p>
              <p style={{ color: T.textBody, fontSize: "21px", fontWeight: 300, lineHeight: 1.65, letterSpacing: "-0.01em", margin: "0 0 16px", fontFamily: "Syne,system-ui" }}>
                Você acorda pensando: preciso que minhas revendedoras paguem em dia. Preciso saber onde estão minhas maletas. Preciso de mais tempo para vender — não para administrar.
              </p>
              <p style={{ color: T.accent, fontSize: "21px", fontWeight: 700, lineHeight: 1.65, letterSpacing: "-0.01em", margin: 0, fontFamily: "Syne,system-ui" }}>
                A Nexus Intelligence cuida de tudo isso — enquanto você cuida do que realmente importa."
              </p>
            </blockquote>
            <div style={{ marginTop: "32px", display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ height: "1px", width: "32px", background: T.accent }} />
              <span style={{ color: T.textMuted, fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", fontFamily: "Inter,system-ui" }}>
                NEXUS INTELLIGENCE — Automação que devolve tempo para quem importa.
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
