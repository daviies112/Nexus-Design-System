/* ─────────────────────────────────────────────────────
   NexusNetworkLines
   Expands the logo's visual DNA (pillars + N-diagonals +
   nodes) into a decorative background/section element.
   ───────────────────────────────────────────────────── */
export function NexusNetworkLines({
  color = "#FF5A1F",
  className = "",
  style = {},
}: {
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const pillars = [70, 210, 350, 490];
  const top = 22;
  const bot = 178;
  const mid = 100;

  return (
    <svg
      viewBox="0 0 560 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${className}`}
      style={style}
    >
      <defs>
        <linearGradient id="nlg" x1="70" y1="100" x2="490" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {/* Orbital ellipse — dashed, very faint */}
      <ellipse cx="280" cy="100" rx="265" ry="82"
        stroke={color} strokeWidth="0.6" strokeDasharray="4 11" opacity="0.45" />

      {/* Vertical pillars */}
      {pillars.map(x => (
        <line key={x} x1={x} y1={top} x2={x} y2={bot}
          stroke={color} strokeWidth="1.2" opacity="0.7" />
      ))}

      {/* N-diagonals — flowing up-right, logo-identical logic */}
      <line x1="70"  y1={mid} x2="210" y2={top} stroke="url(#nlg)" strokeWidth="1.8" />
      <line x1="210" y1={bot} x2="350" y2={mid} stroke="url(#nlg)" strokeWidth="1.8" />
      <line x1="350" y1={mid} x2="490" y2={top} stroke="url(#nlg)" strokeWidth="1.8" />

      {/* Action nodes (mid-row) */}
      <circle cx="70"  cy={mid} r="6.5" fill={color} />
      <circle cx="350" cy={mid} r="6.5" fill={color} />

      {/* Diagonal-end nodes */}
      <circle cx="210" cy={top} r="5"   fill={color} opacity="0.9" />
      <circle cx="210" cy={bot} r="5"   fill={color} opacity="0.9" />
      <circle cx="490" cy={top} r="5"   fill={color} opacity="0.9" />

      {/* Pillar endpoint nodes (subtle) */}
      {pillars.map(x => (
        <g key={x}>
          <circle cx={x} cy={top} r="3.5" fill={color} opacity="0.4" />
          <circle cx={x} cy={bot} r="3.5" fill={color} opacity="0.4" />
        </g>
      ))}
    </svg>
  );
}

export interface NexusIconProps {
  size?: number;
  stroke?: string;
  white?: string;
  nodeColor?: string;
  className?: string;
}

export function NexusIcon({ size = 96, stroke = "#FF5A1F", white = "#FF5A1F", nodeColor = "#FF5A1F", className }: NexusIconProps) {
  const h = (size * 80) / 112;
  return (
    <svg width={size} height={h} viewBox="0 0 112 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="grad" x1="56" y1="16" x2="56" y2="64">
          <stop offset="0%" stopColor={stroke} />
          <stop offset="100%" stopColor={stroke} stopOpacity="0.65" />
        </linearGradient>
      </defs>
      {/* Orbital arc */}
      <circle cx="56" cy="40" r="38" stroke={stroke} strokeWidth="0.75" strokeDasharray="3 7" opacity="0.4" fill="none" />
      {/* Three vertical pillars */}
      <line x1="28" y1="16" x2="28" y2="64" stroke={white} strokeWidth="3.5" />
      <line x1="56" y1="16" x2="56" y2="64" stroke={white} strokeWidth="3.5" />
      <line x1="84" y1="16" x2="84" y2="64" stroke={white} strokeWidth="3.5" />
      {/* N diagonal — full stroke top-left to bottom-right + accent halves */}
      <line x1="28" y1="16" x2="84" y2="64" stroke="url(#grad)" strokeWidth="4" />
      <line x1="28" y1="40" x2="56" y2="16" stroke="url(#grad)" strokeWidth="2.5" opacity="0.5" />
      <line x1="56" y1="64" x2="84" y2="40" stroke="url(#grad)" strokeWidth="2.5" opacity="0.5" />
      {/* Action nodes */}
      <circle cx="28" cy="40" r="5.5" fill={nodeColor} />
      <circle cx="84" cy="40" r="5.5" fill={nodeColor} />
      {/* Structural nodes */}
      <circle cx="56" cy="16" r="4" fill={stroke} />
      <circle cx="56" cy="64" r="4" fill={stroke} />
      <circle cx="28" cy="16" r="4" fill={white} opacity="0.6" />
      <circle cx="28" cy="64" r="4" fill={white} opacity="0.6" />
      <circle cx="84" cy="16" r="4" fill={white} opacity="0.6" />
      <circle cx="84" cy="64" r="4" fill={white} opacity="0.6" />
    </svg>
  );
}

export function NexusIconSm({ size = 44, stroke = "#FF5A1F", white = "#FF5A1F", nodeColor = "#FF5A1F", className }: NexusIconProps) {
  const h = (size * 80) / 112;
  return (
    <svg width={size} height={h} viewBox="0 0 112 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="grad_sm" x1="56" y1="16" x2="56" y2="64">
          <stop offset="0%" stopColor={stroke} />
          <stop offset="100%" stopColor={stroke} stopOpacity="0.65" />
        </linearGradient>
      </defs>
      {/* Orbital arc */}
      <circle cx="56" cy="40" r="38" stroke={stroke} strokeWidth="0.75" strokeDasharray="3 7" opacity="0.4" fill="none" />
      {/* Three vertical pillars */}
      <line x1="28" y1="16" x2="28" y2="64" stroke={white} strokeWidth="3.5" />
      <line x1="56" y1="16" x2="56" y2="64" stroke={white} strokeWidth="3.5" />
      <line x1="84" y1="16" x2="84" y2="64" stroke={white} strokeWidth="3.5" />
      {/* N diagonal — full stroke top-left to bottom-right + accent halves */}
      <line x1="28" y1="16" x2="84" y2="64" stroke="url(#grad_sm)" strokeWidth="4" />
      <line x1="28" y1="40" x2="56" y2="16" stroke="url(#grad_sm)" strokeWidth="2.5" opacity="0.5" />
      <line x1="56" y1="64" x2="84" y2="40" stroke="url(#grad_sm)" strokeWidth="2.5" opacity="0.5" />
      {/* Action nodes */}
      <circle cx="28" cy="40" r="5.5" fill={nodeColor} />
      <circle cx="84" cy="40" r="5.5" fill={nodeColor} />
      {/* Structural nodes */}
      <circle cx="56" cy="16" r="4" fill={stroke} />
      <circle cx="56" cy="64" r="4" fill={stroke} />
      <circle cx="28" cy="16" r="4" fill={white} opacity="0.6" />
      <circle cx="28" cy="64" r="4" fill={white} opacity="0.6" />
      <circle cx="84" cy="16" r="4" fill={white} opacity="0.6" />
      <circle cx="84" cy="64" r="4" fill={white} opacity="0.6" />
    </svg>
  );
}
