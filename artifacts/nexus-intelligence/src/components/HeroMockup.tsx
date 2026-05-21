import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FEED = [
  { icon: "check", label: "Cobrança enviada", sub: "Fernanda R.", tag: "+ R$ 380", color: "#00CC7A" },
  { icon: "doc",   label: "NF-e #4521 emitida", sub: "automático · há 1 min", tag: "", color: "#FF5A1F" },
  { icon: "coin",  label: "Comissão calculada", sub: "Carla M. — R$ 54,00", tag: "", color: "#00CC7A" },
  { icon: "box",   label: "Estoque atualizado", sub: "Maleta 7 · 12 peças", tag: "", color: "#7AA88E" },
  { icon: "check", label: "Cobrança enviada", sub: "Ana Paula — R$ 210", tag: "+ R$ 210", color: "#00CC7A" },
];

function MiniCountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / 1400);
          const ease = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(ease * to));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

function FeedIcon({ type, color }: { type: string; color: string }) {
  return (
    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${color}18` }}>
      {type === "check" && <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 5.5l2.5 2.5 4.5-4.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>}
      {type === "doc"   && <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><rect x="2" y="1" width="7" height="9" rx="1" stroke={color} strokeWidth="1.2"/><path d="M3.5 4.5h4M3.5 6.5h2.5" stroke={color} strokeWidth="1" strokeLinecap="round"/></svg>}
      {type === "coin"  && <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><circle cx="5.5" cy="5.5" r="3.5" stroke={color} strokeWidth="1.2"/><path d="M5.5 3.8v3.4M4.2 5.5h2.6" stroke={color} strokeWidth="1" strokeLinecap="round"/></svg>}
      {type === "box"   && <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M1.5 4L5.5 2l4 2v3l-4 2-4-2V4z" stroke={color} strokeWidth="1.2" strokeLinejoin="round"/></svg>}
    </div>
  );
}

export default function HeroMockup() {
  const [visible, setVisible] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let count = 0;
    const add = () => {
      count++;
      setVisible(count);
      if (count < FEED.length) {
        timerRef.current = setTimeout(add, 1100);
      } else {
        timerRef.current = setTimeout(() => { count = 0; setVisible(0); timerRef.current = setTimeout(add, 500); }, 3200);
      }
    };
    timerRef.current = setTimeout(add, 900);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  return (
    <motion.div
      className="relative w-full max-w-md mx-auto lg:mx-0"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
      style={{ filter: "drop-shadow(0 48px 80px rgba(0,0,0,0.6))" }}
    >
      {/* Ambient glow behind window */}
      <div className="absolute -inset-6 rounded-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(0,204,122,0.08) 0%, rgba(255,90,31,0.04) 50%, transparent 80%)" }} />

      {/* Floating chip — top right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 2.0, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -top-3 -right-3 z-20 hidden lg:flex items-center gap-1.5 bg-[#0C1A12] border border-[#00CC7A]/35 rounded-full pl-2.5 pr-3 py-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
      >
        <div className="w-2 h-2 rounded-full bg-[#00CC7A] animate-pulse flex-shrink-0" />
        <span className="text-[#00CC7A] text-[11px] font-semibold whitespace-nowrap">R$ 380 confirmado</span>
      </motion.div>

      {/* Floating chip — bottom left */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -bottom-3 -left-3 z-20 hidden lg:flex items-center gap-1.5 bg-[#0C1A12] border border-[#FF5A1F]/35 rounded-full pl-2.5 pr-3 py-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
      >
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" className="flex-shrink-0">
          <rect x="2" y="1" width="7" height="9" rx="1" stroke="#FF5A1F" strokeWidth="1.2"/>
          <path d="M3.5 4.5h4M3.5 6.5h2.5" stroke="#FF5A1F" strokeWidth="1" strokeLinecap="round"/>
        </svg>
        <span className="text-[#FF5A1F] text-[11px] font-semibold whitespace-nowrap">NF-e emitida</span>
      </motion.div>

      {/* macOS window */}
      <div className="relative rounded-2xl overflow-hidden border border-[#1E3828]"
        style={{ background: "#0A1810", boxShadow: "0 0 0 1px rgba(0,204,122,0.07), inset 0 1px 0 rgba(0,204,122,0.09)" }}>

        {/* Title bar */}
        <div className="flex items-center px-4 py-3 bg-[#060F0A] border-b border-[#1E3828]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
            <div className="w-3 h-3 rounded-full bg-[#28C840]" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-[#3A5A48] text-xs font-medium tracking-wide select-none">Amanda AI — Dashboard</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00CC7A] animate-pulse" />
            <span className="text-[#00CC7A] text-[10px] font-medium">ao vivo</span>
          </div>
        </div>

        {/* Dashboard content */}
        <div className="p-4">

          {/* Metric cards */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-[#060F0A] rounded-xl p-3.5 border border-[#1E3828]">
              <div className="text-[#4A6A58] text-[10px] uppercase tracking-wider mb-1.5">Cobranças hoje</div>
              <div className="font-syne font-bold text-xl text-white leading-none mb-2">
                <MiniCountUp to={97} suffix="%" />
              </div>
              <div className="h-1 bg-[#1E3828] rounded-full overflow-hidden mb-1.5">
                <motion.div className="h-full rounded-full bg-[#00CC7A]"
                  initial={{ width: 0 }} animate={{ width: "97%" }}
                  transition={{ duration: 1.6, delay: 1, ease: "easeOut" }} />
              </div>
              <div className="text-[#00CC7A] text-[9px] font-medium">automáticas ✓</div>
            </div>
            <div className="bg-[#060F0A] rounded-xl p-3.5 border border-[#1E3828]">
              <div className="text-[#4A6A58] text-[10px] uppercase tracking-wider mb-1.5">NF-e emitidas</div>
              <div className="font-syne font-bold text-xl text-white leading-none mb-2">
                <MiniCountUp to={18} suffix="" />
              </div>
              <div className="flex gap-0.5 mb-1.5">
                {Array.from({ length: 7 }).map((_, i) => (
                  <motion.div key={i} className="flex-1 rounded-sm bg-[#FF5A1F]/25"
                    style={{ height: `${[8, 14, 10, 18, 12, 16, 20][i]}px` }}
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={{ scaleY: 1, opacity: 1 }}
                    transition={{ delay: 1.3 + i * 0.07, duration: 0.3 }}
                  />
                ))}
              </div>
              <div className="text-[#FF5A1F] text-[9px] font-medium">hoje · auto</div>
            </div>
          </div>

          {/* Activity feed */}
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[#4A6A58] text-[10px] uppercase tracking-wider font-medium">Atividade ao vivo</span>
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 rounded-full bg-[#00CC7A] animate-pulse" />
              <span className="text-[#00CC7A] text-[9px]">tempo real</span>
            </div>
          </div>

          <div className="space-y-1.5 min-h-[150px]">
            <AnimatePresence initial={false}>
              {FEED.slice(0, visible).map((item, i) => (
                <motion.div key={`${i}-${visible}`}
                  initial={{ opacity: 0, x: -10, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, x: 0, height: "auto", marginBottom: 6 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-2.5 bg-[#060F0A] rounded-lg px-3 py-2.5 border border-[#1E3828]"
                >
                  <FeedIcon type={item.icon} color={item.color} />
                  <div className="flex-1 min-w-0">
                    <div className="text-[#C4DDD0] text-[11px] font-medium leading-none mb-0.5">{item.label}</div>
                    <div className="text-[#4A6A58] text-[10px] leading-none truncate">{item.sub}</div>
                  </div>
                  {item.tag && (
                    <span className="text-[#00CC7A] text-[10px] font-bold flex-shrink-0 tabular-nums">{item.tag}</span>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="px-4 py-3 bg-[#060F0A] border-t border-[#1E3828] flex items-center justify-between">
          <span className="text-[#4A6A58] text-[10px]">Última ação: agora</span>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00CC7A]" />
            <span className="text-[#00CC7A] text-[10px] font-medium">Amanda ativa</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
