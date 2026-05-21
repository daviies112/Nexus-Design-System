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
      {/* Vertical pillars */}
      <line x1="28" y1="16" x2="28" y2="64" stroke={white} strokeWidth="3.5" />
      <line x1="84" y1="16" x2="84" y2="64" stroke={white} strokeWidth="3.5" />
      {/* N diagonals */}
      <line x1="28" y1="40" x2="56" y2="16" stroke="url(#grad)" strokeWidth="4" />
      <line x1="56" y1="16" x2="56" y2="64" stroke="url(#grad)" strokeWidth="4" />
      <line x1="56" y1="64" x2="84" y2="40" stroke="url(#grad)" strokeWidth="4" />
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
      {/* Vertical pillars */}
      <line x1="28" y1="16" x2="28" y2="64" stroke={white} strokeWidth="3.5" />
      <line x1="84" y1="16" x2="84" y2="64" stroke={white} strokeWidth="3.5" />
      {/* N diagonals */}
      <line x1="28" y1="40" x2="56" y2="16" stroke="url(#grad_sm)" strokeWidth="4" />
      <line x1="56" y1="16" x2="56" y2="64" stroke="url(#grad_sm)" strokeWidth="4" />
      <line x1="56" y1="64" x2="84" y2="40" stroke="url(#grad_sm)" strokeWidth="4" />
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
