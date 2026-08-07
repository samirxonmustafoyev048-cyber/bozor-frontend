export default function ShopIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 120" className={className} aria-hidden>
      <defs>
        <linearGradient id="shopAwning" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="shopGlass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
      </defs>

      <ellipse cx="70" cy="107" rx="58" ry="6" fill="#0f172a" opacity="0.08" />

      {/* Trees */}
      <g>
        <rect x="21" y="70" width="4" height="22" className="fill-amber-800" />
        <circle cx="23" cy="65" r="13" className="fill-emerald-500" />
        <circle cx="15" cy="72" r="9" className="fill-emerald-600" />
        <circle cx="31" cy="72" r="9" className="fill-emerald-600" />
      </g>
      <g>
        <rect x="113" y="70" width="4" height="22" className="fill-amber-800" />
        <circle cx="115" cy="65" r="13" className="fill-emerald-500" />
        <circle cx="107" cy="72" r="9" className="fill-emerald-600" />
        <circle cx="123" cy="72" r="9" className="fill-emerald-600" />
      </g>

      {/* Building */}
      <rect x="38" y="42" width="64" height="50" rx="3" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
      {/* Awning */}
      <rect x="34" y="34" width="72" height="12" rx="3" fill="url(#shopAwning)" />
      <circle cx="70" cy="40" r="4" className="fill-brand-600" />
      {/* Glass storefront */}
      <rect x="44" y="52" width="52" height="26" rx="2" fill="url(#shopGlass)" />
      <rect x="48" y="55" width="14" height="20" fill="#ffffff" opacity="0.12" />
      {/* Door */}
      <rect x="62" y="78" width="16" height="14" rx="1" className="fill-neutral-800" />
      <circle cx="75" cy="85" r="0.9" fill="#fde68a" />
    </svg>
  );
}
