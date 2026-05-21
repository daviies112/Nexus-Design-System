export interface NexusIconProps {
  size?: number;
  stroke?: string;
  white?: string;
  nodeColor?: string;
  className?: string;
}

export function NexusIcon({ size = 96, stroke = "#FF5A1F", className }: NexusIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
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
}

export function NexusIconSm({ size = 44, stroke = "#FF5A1F", className }: NexusIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
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
}
