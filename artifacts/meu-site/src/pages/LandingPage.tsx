import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { NexusIconSm } from "@/components/NexusIcon";
import DemoSection from "@/components/DemoSection";
import ROICalculator from "@/components/ROICalculator";
import QualificationForm from "@/components/QualificationForm";
import PurchaseNotification from "@/components/PurchaseNotification";
import SpecialOfferModal from "@/components/SpecialOfferModal";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";

/* ─── Icon helpers ─── */
function IconCheck() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8l3.5 3.5L13 5" stroke="#00CC7A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function IconArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ─── Motion variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: (d = 0) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.75, delay: d, ease: [0.16, 1, 0.3, 1] },
  }),
};

/* ─── Animated counter ─── */
function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const spanRef = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const t0 = performance.now();
          const dur = 1700;
          const tick = (now: number) => {
            const p = Math.min(1, (now - t0) / dur);
            const ease = 1 - Math.pow(1 - p, 3);
            setCount(Math.round(ease * to));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);

  return <span ref={spanRef}>{count}{suffix}</span>;
}

/* ─── Hero video with RAF fade loop ─── */
function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    let rafId = 0;
    const FADE_MS = 600;
    const LEAD = 0.6;
    let fadingOut = false;
    const fadeTo = (target: number, ms: number) => {
      cancelAnimationFrame(rafId);
      const start = performance.now();
      const from = parseFloat(video.style.opacity || "0");
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / ms);
        video.style.opacity = String(from + (target - from) * t);
        if (t < 1) rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);
    };
    const onLoaded = () => { video.style.opacity = "0"; video.play().catch(() => {}); fadeTo(1, FADE_MS); };
    const onTime = () => {
      if (!fadingOut && video.duration - video.currentTime <= LEAD && video.duration - video.currentTime > 0) {
        fadingOut = true; fadeTo(0, FADE_MS);
      }
    };
    const onEnded = () => {
      video.style.opacity = "0";
      setTimeout(() => { video.currentTime = 0; video.play().catch(() => {}); fadingOut = false; fadeTo(1, FADE_MS); }, 100);
    };
    video.addEventListener("loadeddata", onLoaded);
    video.addEventListener("timeupdate", onTime);
    video.addEventListener("ended", onEnded);
    if (video.readyState >= 2) onLoaded();
    return () => { cancelAnimationFrame(rafId); video.removeEventListener("loadeddata", onLoaded); video.removeEventListener("timeupdate", onTime); video.removeEventListener("ended", onEnded); };
  }, []);
  return (
    <video
      ref={ref}
      src="https://res.cloudinary.com/dfonotyfb/video/upload/v1775585556/dds3_1_rqhg7x.mp4"
      muted playsInline preload="auto"
      className="absolute inset-0 w-full h-full object-cover z-0"
      style={{ opacity: 0 }}
    />
  );
}

/* ─── Animated network lines (logo DNA) ─── */
function NetworkLines() {
  const nodes = [
    { x: 8,  y: 22 }, { x: 22, y: 72 }, { x: 38, y: 14 },
    { x: 50, y: 55 }, { x: 65, y: 28 }, { x: 78, y: 78 },
    { x: 88, y: 18 }, { x: 14, y: 88 }, { x: 55, y: 88 },
    { x: 92, y: 58 }, { x: 32, y: 45 }, { x: 70, y: 48 },
  ];
  const edges = [
    [0,2],[2,4],[4,6],[6,9],[9,11],[11,5],[5,7],[7,1],[1,10],[10,3],[3,11],
    [0,10],[2,10],[4,11],[6,11],[3,8],[5,9],[7,8],
  ];
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
      <defs>
        <filter id="glow-green" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="glow-orange" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      {edges.map(([a, b], i) => {
        const na = nodes[a], nb = nodes[b];
        const x1 = na.x * 10, y1 = na.y * 6, x2 = nb.x * 10, y2 = nb.y * 6;
        const len = Math.hypot(x2 - x1, y2 - y1);
        const isOrange = i % 5 === 0;
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={isOrange ? "#FF5A1F" : "#00CC7A"}
            strokeWidth={isOrange ? 0.8 : 0.6}
            strokeOpacity={isOrange ? 0.4 : 0.28}
            strokeDasharray={`${len} ${len}`}
            style={{ strokeDashoffset: len, animation: `line-draw ${3.5 + (i % 4) * 0.8}s ease-in-out ${i * 0.45}s infinite` }}
          />
        );
      })}
      {nodes.map((n, i) => (
        <g key={i} transform={`translate(${n.x * 10}, ${n.y * 6})`}>
          <circle r="5" fill="#00CC7A" opacity="0.08" style={{ animation: `node-pulse ${2.5 + (i % 3) * 0.7}s ease-in-out ${i * 0.3}s infinite` }} />
          <circle r="2" fill="#00CC7A" opacity="0.7" filter="url(#glow-green)" style={{ animation: `node-pulse ${2.5 + (i % 3) * 0.7}s ease-in-out ${i * 0.3}s infinite` }} />
        </g>
      ))}
      {[3, 6, 9].map((idx) => (
        <g key={`o${idx}`} transform={`translate(${nodes[idx].x * 10}, ${nodes[idx].y * 6})`}>
          <circle r="9" fill="#FF5A1F" opacity="0.07" style={{ animation: `node-pulse-orange ${2.2 + idx * 0.4}s ease-in-out ${idx * 0.5}s infinite` }} />
          <circle r="3" fill="#FF5A1F" opacity="0.85" filter="url(#glow-orange)" style={{ animation: `node-pulse-orange ${2.2 + idx * 0.4}s ease-in-out ${idx * 0.5}s infinite` }} />
        </g>
      ))}
      <circle cx="500" cy="300" r="200" stroke="#00CC7A" strokeWidth="0.6" strokeDasharray="8 32" fill="none" opacity="0.12" style={{ animation: "glow-pulse 4s ease-in-out infinite" }} />
      <circle cx="500" cy="300" r="310" stroke="#FF5A1F" strokeWidth="0.5" strokeDasharray="6 44" fill="none" opacity="0.09" style={{ animation: "glow-pulse 5.5s ease-in-out 1s infinite" }} />
    </svg>
  );
}

/* ─── Auto-scrolling marquee strip ─── */
const MARQUEE_ITEMS = [
  "Cobrança Automática", "Emissão de NF-e", "Gestão de Maletas",
  "WhatsApp Business", "Comissões Automáticas", "Dashboard Analítico",
  "Régua de Cobrança", "Relatórios Semanais", "Setup em 24h",
  "Sem Contrato", "Cancelamento Livre", "97% de Resolução",
];

function AutoMarquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="relative overflow-hidden py-4 bg-[#060F0A] border-y border-[#1E3828]" aria-hidden>
      <div className="flex animate-marquee whitespace-nowrap gap-0">
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 px-6">
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${i % 3 === 0 ? "bg-[#FF5A1F]" : "bg-[#00CC7A]/60"}`} />
            <span className="text-[#4A6A58] text-xs font-medium tracking-[0.12em] uppercase">{item}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Section radial grid overlay (Xero-inspired) ─── */
function GridOverlay({ opacity = 0.03 }: { opacity?: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{
      backgroundImage: "linear-gradient(rgba(122,168,142,1) 1px, transparent 1px), linear-gradient(90deg, rgba(122,168,142,1) 1px, transparent 1px)",
      backgroundSize: "72px 72px",
      opacity,
    }} />
  );
}

export default function LandingPage() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col">
      <PurchaseNotification />
      <SpecialOfferModal />

      {/* ── 1. HERO ── */}
      <section className="relative min-h-screen bg-[#060F0A] overflow-hidden flex items-center">
        <HeroVideo />
        <div className="absolute inset-0 z-[2]" style={{
          background: "linear-gradient(165deg, rgba(6,15,10,0.82) 0%, rgba(6,15,10,0.65) 50%, rgba(6,15,10,0.88) 100%)"
        }} />
        <div className="absolute inset-0 z-[3]"><NetworkLines /></div>
        <div className="absolute bottom-0 left-0 right-0 h-40 z-[4]" style={{
          background: "linear-gradient(to bottom, transparent, #060F0A)"
        }} />
        <div className="relative z-[5] w-full px-6 py-32">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-2.5 liquid-glass-nexus rounded-full px-3 py-2 text-xs text-[#7AA88E] mb-10 tracking-wide">
                <span className="bg-[#FF5A1F] text-[#1A0500] text-[9px] font-extrabold px-1.5 py-0.5 rounded-full uppercase tracking-widest flex-shrink-0">NOVO</span>
                <span className="w-px h-3 bg-[#1E3828] flex-shrink-0" />
                Fila de espera aberta — 200 vagas restantes
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F] animate-pulse flex-shrink-0" />
              </div>
              <h1 className="font-syne font-semibold tracking-tight leading-[1.12] text-4xl md:text-5xl lg:text-6xl">
                <span className="block text-white drop-shadow-[0_2px_16px_rgba(0,204,122,0.15)]">
                  Automatize sua semijoia.
                </span>
                <span className="block text-white">
                  Cresça{" "}
                  <span className="text-[#FF5A1F] drop-shadow-[0_0_32px_rgba(255,90,31,0.45)]">sem contratar.</span>
                </span>
              </h1>
              <div className="flex items-center justify-center gap-3 my-9">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#00CC7A]/40" />
                <div className="w-2 h-2 rounded-full bg-[#FF5A1F] shadow-[0_0_8px_rgba(255,90,31,0.7)] animate-pulse" />
                <div className="h-px w-4 bg-[#00CC7A]/30" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#00CC7A]/60" />
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#00CC7A]/40" />
              </div>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="text-[#A8C8B8] text-lg leading-relaxed max-w-xl mx-auto font-normal"
              >
                Cobrança, estoque e nota fiscal automatizados pelo WhatsApp.
                <br className="hidden sm:block" />
                R$200/mês, sem cartão, sem contrato.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
              >
                <motion.button
                  onClick={() => scrollTo("qualificacao")}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-[#FF5A1F] text-[#1A0500] font-bold px-7 py-3.5 rounded-full text-[15px] tracking-wide transition-shadow hover:shadow-[0_0_44px_rgba(255,90,31,0.55)] w-full sm:w-auto inline-flex items-center justify-center gap-3 group"
                >
                  Garantir minha vaga
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#1A0500]/20 group-hover:bg-[#1A0500]/30 transition-colors flex-shrink-0">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </motion.button>
                <motion.button
                  onClick={() => scrollTo("demo")}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="liquid-glass-nexus inline-flex items-center gap-2.5 text-[#C4DDD0] hover:text-white text-[15px] font-medium transition-colors rounded-full px-6 py-3 group"
                >
                  Ver como funciona
                  <span className="flex items-center justify-center w-6 h-6 rounded-full border border-[#2A4A38] group-hover:border-[#7AA88E] transition-colors">
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE STRIP ── */}
      <AutoMarquee />

      {/* ── 2. STATS ── */}
      <section className="relative bg-[#060F0A] px-6 py-20 overflow-hidden">
        {/* Radial green glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(0,204,122,0.07) 0%, transparent 70%)"
        }} />
        <GridOverlay opacity={0.025} />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#1E3828] border border-[#1E3828] rounded-2xl overflow-hidden">
            {[
              { num: "97%",   countTo: 97,  suffix: "%", label: "Cobranças resolvidas", sub: "sem intervenção humana" },
              { num: "R$200", countTo: null, suffix: "",  label: "Por mês, tudo incluso", sub: "21 módulos integrados" },
              { num: "24h",   countTo: 24,  suffix: "h", label: "Setup assistido", sub: "após a assinatura" },
              { num: "Zero",  countTo: null, suffix: "",  label: "Contrato de fidelidade", sub: "cancele quando quiser" },
            ].map((s, i) => (
              <motion.div
                key={i}
                custom={i * 0.08}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                whileHover={{ backgroundColor: "#0C1A12" }}
                transition={{ backgroundColor: { duration: 0.2 } }}
                className="bg-[#060F0A] px-8 py-8 cursor-default"
              >
                <div className="font-syne font-extrabold text-4xl text-white">
                  {s.countTo != null ? <CountUp to={s.countTo} suffix={s.suffix} /> : s.num}
                </div>
                <div className="text-white text-sm font-semibold mt-2">{s.label}</div>
                <div className="text-[#4A6A58] text-xs mt-0.5">{s.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. PROBLEMA ── */}
      <section className="relative bg-[#060F0A] px-6 py-24 border-t border-[#1E3828] overflow-hidden">
        {/* Xero-inspired radial arc — orange glow from top-right */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 50% 60% at 90% 0%, rgba(255,90,31,0.09) 0%, rgba(255,90,31,0.04) 40%, transparent 70%)"
        }} />
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div
            custom={0}
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp}
          >
            <p className="text-[#FF5A1F] text-xs font-semibold tracking-[0.15em] uppercase mb-5">O Problema</p>
            <h2 className="font-syne font-bold text-3xl md:text-4xl text-white leading-snug tracking-tight">
              Você está administrando
              <br />um negócio ou apagando
              <br /><span className="text-[#FF5A1F] drop-shadow-[0_0_20px_rgba(255,90,31,0.3)]">incêndios?</span>
            </h2>
            <p className="text-[#7AA88E] text-base leading-relaxed mt-6 max-w-sm">
              Cobrança manual, estoque no Excel, nota fiscal atrasada — cada dia perdido custa mais do que você imagina.
            </p>
            <div className="mt-8 space-y-3">
              {[
                "4h por dia desperdiçadas em cobranças que a IA faz em 8 segundos",
                "Notas fiscais atrasadas geram multa e perda de credibilidade",
                "87% das empreendedoras de semijoias relatam esgotamento operacional",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  custom={i * 0.1 + 0.2}
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                  variants={fadeUp}
                  className="flex items-start gap-3"
                >
                  <div className="w-1 h-1 rounded-full bg-[#FF5A1F] mt-2.5 flex-shrink-0" />
                  <span className="text-[#C4DDD0] text-[15px] leading-relaxed">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-4">
            {[
              { num: "4h/dia", label: "gastas em cobrança manual", accent: true },
              { num: "68%", label: "das cobranças não resolvidas por falta de follow-up", accent: false },
              { num: "R$ 0", label: "de NF emitida quando você está sem tempo", accent: false },
            ].map((card, i) => (
              <motion.div
                key={i}
                custom={i * 0.1 + 0.1}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp}
                whileHover={{ scale: 1.02, y: -3 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`rounded-2xl px-7 py-6 border cursor-default ${
                  card.accent
                    ? "border-[#FF5A1F]/30 bg-[#FF5A1F]/5 hover:border-[#FF5A1F]/50 hover:bg-[#FF5A1F]/8"
                    : "border-[#1E3828] bg-[#0C1A12] hover:border-[#1E3828]/80"
                }`}
              >
                <div className={`font-syne font-extrabold text-3xl ${card.accent ? "text-[#FF5A1F]" : "text-white"}`}>{card.num}</div>
                <div className="text-[#7AA88E] text-sm mt-1.5 leading-snug">{card.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. AMANDA AI — rounded top, pulled up ── */}
      <section className="relative bg-[#0C1A12] px-6 py-24 border-t border-[#1E3828] rounded-t-[40px] md:rounded-t-[56px] -mt-8 overflow-hidden">
        {/* Subtle green radial glow from top-left */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 55% 45% at 10% 0%, rgba(0,204,122,0.06) 0%, transparent 60%)"
        }} />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="max-w-2xl mb-14">
            <motion.p
              custom={0}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp}
              className="text-[#FF5A1F] text-xs font-semibold tracking-[0.15em] uppercase mb-5"
            >
              Amanda AI
            </motion.p>
            <motion.h2
              custom={0.08}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp}
              className="font-syne font-bold text-3xl md:text-4xl text-white leading-snug tracking-tight"
            >
              A funcionária que nunca falta,
              nunca esquece,
              <span className="text-[#FF5A1F] drop-shadow-[0_0_20px_rgba(255,90,31,0.3)]"> nunca cansa.</span>
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: "Cobrança Automática",
                desc: "Régua inteligente via WhatsApp. Mensagem certa, hora certa, para cada revendedora.",
                icon: <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none"><path d="M10 2a8 8 0 100 16A8 8 0 0010 2zm0 4v4l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
              },
              {
                title: "Emissão Fiscal",
                desc: "NF-e e NFS-e emitidas em segundos após cada venda. Zero burocracia.",
                icon: <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none"><rect x="4" y="2" width="12" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M7 7h6M7 10h6M7 13h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
              },
              {
                title: "Gestão de Estoque",
                desc: "Maletas, peças e devoluções atualizadas em tempo real, automaticamente.",
                icon: <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none"><path d="M3 7l7-4 7 4v6l-7 4-7-4V7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>,
              },
              {
                title: "Comissões",
                desc: "Cálculo automático para toda a rede. Relatório individual por revendedora.",
                icon: <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M10 6v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
              },
              {
                title: "Dashboard Completo",
                desc: "Faturamento, inadimplência, desempenho por revendedora — tudo numa tela.",
                icon: <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none"><rect x="3" y="10" width="4" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="8" y="6" width="4" height="11" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="13" y="3" width="4" height="14" rx="1" stroke="currentColor" strokeWidth="1.5"/></svg>,
              },
              {
                title: "WhatsApp Business",
                desc: "API oficial do WhatsApp. Mensagens confiáveis, sem risco de bloqueio.",
                icon: <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none"><path d="M10 2C5.6 2 2 5.6 2 10c0 1.4.4 2.8 1 3.9L2 18l4.2-1C7.3 17.6 8.6 18 10 18c4.4 0 8-3.6 8-8s-3.6-8-8-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>,
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                custom={i * 0.07}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp}
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="rounded-2xl p-7 group cursor-default glow-card"
              >
                <div className="w-9 h-9 rounded-lg bg-[#1E3828] text-[#C4DDD0] flex items-center justify-center mb-5 group-hover:bg-[#FF5A1F]/10 group-hover:text-[#FF5A1F] transition-colors duration-300">
                  {f.icon}
                </div>
                <h3 className="font-syne font-bold text-[17px] text-white mb-2">{f.title}</h3>
                <p className="text-[#7AA88E] text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            custom={0.4}
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp}
            className="mt-10 flex items-center gap-4"
          >
            <motion.button
              onClick={() => scrollTo("qualificacao")}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="bg-[#FF5A1F] text-[#1A0500] font-bold px-8 py-3 rounded-full text-sm tracking-wide hover:shadow-[0_0_32px_rgba(255,90,31,0.45)] transition-shadow"
            >
              Quero a Amanda AI
            </motion.button>
            <span className="text-[#4A6A58] text-sm">R$200/mês · 7 dias grátis · sem cartão</span>
          </motion.div>
        </div>
      </section>

      {/* ── 5. DEMO AO VIVO ── */}
      <DemoSection />

      {/* ── 6. ROI CALCULATOR ── */}
      <ROICalculator />

      {/* ── 6b. TESTIMONIALS ── */}
      <TestimonialsSection />

      {/* ── 7. PRICING — rounded top, pulled up ── */}
      <section id="preco" className="relative bg-[#060F0A] px-6 py-24 border-t border-[#1E3828] rounded-t-[40px] md:rounded-t-[56px] -mt-8 overflow-hidden">
        {/* Radial arc: green center glow (Xero-inspired) */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(0,204,122,0.06) 0%, transparent 60%)"
        }} />
        <GridOverlay opacity={0.02} />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="max-w-xl mb-14">
            <motion.h2
              custom={0}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp}
              className="font-syne font-bold text-3xl md:text-4xl text-white leading-snug tracking-tight"
            >
              Simples, transparente,{" "}
              <span className="text-[#FF5A1F] drop-shadow-[0_0_20px_rgba(255,90,31,0.3)]">sem surpresas.</span>
            </motion.h2>
            <motion.p
              custom={0.1}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp}
              className="text-[#7AA88E] text-base mt-4 leading-relaxed max-w-sm"
            >
              Um plano. 21 módulos. Tudo incluso pelo preço de um almoço por semana.
            </motion.p>
          </div>

          <motion.div
            custom={0.15}
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp}
            className="grid md:grid-cols-2 rounded-2xl overflow-hidden border border-[#1E3828]"
          >
            {/* Left — o que você paga hoje */}
            <div className="bg-[#0C1A12] p-10 border-b md:border-b-0 md:border-r border-[#1E3828]">
              <p className="text-[#4A6A58] text-sm font-medium mb-7 uppercase tracking-wider">O que você paga hoje</p>
              <div className="space-y-4 mb-8">
                {[
                  { label: "Cobrador / funcionário", val: "R$ 800+" },
                  { label: "Software de estoque", val: "R$ 150" },
                  { label: "Emissão de NF", val: "R$ 100" },
                  { label: "WhatsApp Business API", val: "R$ 50" },
                  { label: "Seu tempo (4h/dia × R$40/h)", val: "R$ 3.200" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-[#4A6A58] text-sm line-through">{item.label}</span>
                    <span className="text-[#4A6A58] text-sm line-through">{item.val}</span>
                  </div>
                ))}
              </div>
              <div className="pt-5 border-t border-[#1E3828]">
                <div className="text-[#EF4444] font-syne font-extrabold text-3xl">R$4.300+/mês</div>
                <div className="text-[#4A6A58] text-sm mt-1">sem contar esgotamento</div>
              </div>
            </div>

            {/* Right — Nexus */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="bg-[#FF5A1F] p-10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-7">
                  <NexusIconSm size={32} />
                  <p className="text-[#1A0500] text-sm font-semibold uppercase tracking-wider">Nexus Intelligence</p>
                </div>
                <div className="mb-2">
                  <span className="font-syne font-extrabold text-[56px] text-[#1A0500] leading-none">R$200</span>
                  <span className="text-[#5C1A00] text-lg font-semibold ml-1">/mês</span>
                </div>
                <p className="text-[#5C1A00] text-sm font-medium mb-8">21 módulos · sem taxas · sem fidelidade</p>
                <ul className="space-y-2.5 mb-8">
                  {[
                    "Amanda AI — cobrança, NF e estoque",
                    "WhatsApp Business API integrada",
                    "Setup assistido em 24h",
                    "Relatórios automáticos",
                    "Suporte via WhatsApp",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-[#1A0500] text-sm font-medium">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2.5 7l3 3 6-6" stroke="#1A0500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <motion.button
                onClick={() => scrollTo("qualificacao")}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="bg-[#1A0500] text-[#FF5A1F] font-bold py-3.5 rounded-full text-[15px] hover:shadow-[0_0_24px_rgba(26,5,0,0.5)] transition-shadow w-full tracking-wide"
              >
                Começar 7 dias grátis
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Social proof bar */}
          <motion.div
            custom={0.25}
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp}
            className="mt-6 grid grid-cols-3 gap-px bg-[#1E3828] border border-[#1E3828] rounded-xl overflow-hidden text-center"
          >
            {[
              "Mais de 300 revendedoras automatizadas",
              "Setup em até 24h após assinatura",
              "94% mantêm o serviço após o primeiro mês",
            ].map((item, i) => (
              <div key={i} className="bg-[#060F0A] px-4 py-4 text-[#7AA88E] text-xs leading-snug">
                {item}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 8. QUALIFICATION FORM ── */}
      <QualificationForm />

      {/* ── 8b. FAQ ── */}
      <FAQSection />

      {/* ── 9. CTA FINAL — watermark + radial glow ── */}
      <section className="relative bg-[#0C1A12] border-t border-[#1E3828] px-6 py-28 overflow-hidden rounded-t-[40px] md:rounded-t-[56px] -mt-8">
        {/* Radial green glow from center */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,204,122,0.07) 0%, transparent 70%)"
        }} />

        {/* NEXUS watermark — Kresna-style faded wordmark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden" aria-hidden>
          <span
            className="font-syne font-extrabold select-none"
            style={{
              fontSize: "clamp(80px, 18vw, 220px)",
              color: "transparent",
              WebkitTextStroke: "1px rgba(0,204,122,0.06)",
              letterSpacing: "-0.04em",
              lineHeight: 1,
              userSelect: "none",
            }}
          >
            NEXUS
          </span>
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            custom={0}
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="flex items-center justify-center gap-3 mb-10">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#1E3828]" />
              <div className="w-2 h-2 rounded-full bg-[#FF5A1F] shadow-[0_0_8px_rgba(255,90,31,0.6)] animate-pulse" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#1E3828]" />
            </div>

            <h2 className="font-syne font-bold text-3xl md:text-4xl text-white leading-snug tracking-tight">
              Pare de trabalhar no negócio.{" "}
              <span className="text-[#FF5A1F] drop-shadow-[0_0_24px_rgba(255,90,31,0.35)]">Comece a trabalhar nele.</span>
            </h2>
            <motion.p
              custom={0.1}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp}
              className="text-[#7AA88E] text-base mt-6 max-w-lg mx-auto leading-relaxed"
            >
              Junte-se às empreendedoras que pararam de apagar incêndios e voltaram a crescer.
            </motion.p>

            <motion.div
              custom={0.2}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
            >
              <motion.button
                onClick={() => scrollTo("qualificacao")}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="bg-[#FF5A1F] text-[#1A0500] font-bold px-10 py-3.5 rounded-full text-[15px] tracking-wide hover:shadow-[0_0_40px_rgba(255,90,31,0.5)] transition-shadow"
              >
                Receber proposta personalizada
              </motion.button>
              <motion.button
                onClick={() => scrollTo("demo")}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 text-[#7AA88E] hover:text-white text-[15px] font-medium transition-colors"
              >
                Ver demonstração <IconArrow />
              </motion.button>
            </motion.div>

            <motion.div
              custom={0.3}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp}
              className="flex items-center justify-center gap-6 mt-10 text-xs text-[#4A6A58]"
            >
              <span className="flex items-center gap-1.5"><IconCheck />7 dias grátis</span>
              <span className="flex items-center gap-1.5"><IconCheck />Sem cartão de crédito</span>
              <span className="flex items-center gap-1.5"><IconCheck />Cancele quando quiser</span>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
