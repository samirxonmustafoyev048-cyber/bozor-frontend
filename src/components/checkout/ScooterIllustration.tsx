export default function ScooterIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 120" className={className} aria-hidden>
      <defs>
        <linearGradient id="scooterBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>
        <linearGradient id="scooterBox" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
      </defs>

      <ellipse cx="70" cy="105" rx="55" ry="6" fill="#0f172a" opacity="0.08" />

      {/* Delivery box on the back */}
      <rect x="18" y="42" width="34" height="30" rx="4" fill="url(#scooterBox)" stroke="#d97706" strokeWidth="1" />
      <line x1="35" y1="42" x2="35" y2="72" stroke="#d97706" strokeWidth="1" opacity="0.6" />

      {/* Rear mudguard + body */}
      <path
        d="M40,72 Q40,60 55,58 L78,58 Q95,58 100,72 L100,80 L40,80 Z"
        fill="url(#scooterBody)"
      />
      {/* Seat */}
      <rect x="52" y="48" width="26" height="10" rx="4" className="fill-neutral-800" />
      {/* Front leg shield */}
      <path d="M96,45 Q104,45 106,58 L106,80 L96,80 Z" fill="url(#scooterBody)" />
      {/* Handlebar mast */}
      <line x1="104" y1="45" x2="104" y2="30" className="stroke-neutral-700" strokeWidth="3" strokeLinecap="round" />
      <line x1="95" y1="27" x2="113" y2="27" className="stroke-neutral-700" strokeWidth="3" strokeLinecap="round" />
      {/* Headlight */}
      <circle cx="106" cy="52" r="3" fill="#fde68a" />

      {/* Wheels */}
      <circle cx="48" cy="88" r="16" className="fill-neutral-900" />
      <circle cx="48" cy="88" r="7" className="fill-neutral-400" />
      <circle cx="102" cy="88" r="16" className="fill-neutral-900" />
      <circle cx="102" cy="88" r="7" className="fill-neutral-400" />
      <rect x="40" y="80" width="70" height="6" className="fill-neutral-800" />
    </svg>
  );
}
