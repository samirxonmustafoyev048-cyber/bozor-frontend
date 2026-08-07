import { Truck, ShieldCheck, CreditCard, MapPin, Check, Leaf } from "lucide-react";

const badges = [
  { icon: Truck, title: "Tez yetkazib berish", subtitle: "1-3 soat ichida" },
  { icon: ShieldCheck, title: "Xavfsiz qadoqlash", subtitle: "Sifat kafolati" },
  { icon: CreditCard, title: "Qulay to'lov", subtitle: "Bir necha usulda" },
  { icon: MapPin, title: "Butun O'zbekiston", subtitle: "Barcha yirik shaharlarda" },
];

const buildings = [
  { left: "2%", width: "9%", height: "55%", color: "bg-brand-100" },
  { left: "12%", width: "7%", height: "75%", color: "bg-sky-100" },
  { left: "20%", width: "10%", height: "45%", color: "bg-brand-200/70" },
  { left: "32%", width: "8%", height: "90%", color: "bg-sky-200/70" },
  { left: "42%", width: "9%", height: "60%", color: "bg-brand-100" },
  { left: "53%", width: "7%", height: "80%", color: "bg-sky-100" },
  { left: "62%", width: "10%", height: "50%", color: "bg-brand-200/70" },
  { left: "74%", width: "8%", height: "70%", color: "bg-sky-200/70" },
  { left: "84%", width: "9%", height: "58%", color: "bg-brand-100" },
];

export default function DeliveryHero() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-50 to-white">
      <div className="relative grid gap-6 px-6 py-8 sm:px-10 sm:py-10 lg:grid-cols-[minmax(0,1fr)_1.1fr] lg:items-center">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
            <Truck aria-hidden className="h-3.5 w-3.5" />
            Tez va ishonchli yetkazib berish
          </span>
          <h1 className="mt-3 text-2xl font-extrabold leading-tight text-foreground sm:text-3xl">
            Yetkazib berish – <span className="text-brand-600">uyingizgacha!</span>
          </h1>
          <p className="mt-2 max-w-md text-sm text-muted">
            Sevimli mahsulotlaringizni endi yetkazib berish xizmatimiz orqali
            uyingizga yoki ofisingizga qulay va tez qabul qiling.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
            {badges.map((b) => (
              <div key={b.title} className="flex items-start gap-2">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                  <b.icon aria-hidden className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-xs font-semibold text-foreground">
                    {b.title}
                  </span>
                  <span className="block text-[11px] text-muted">{b.subtitle}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Illustrated delivery scene */}
        <div className="relative hidden h-52 overflow-hidden rounded-2xl bg-gradient-to-b from-sky-100 via-sky-50 to-brand-50 lg:block">
          <div aria-hidden className="absolute inset-x-0 bottom-14 h-2/3 w-full">
            {buildings.map((b, i) => (
              <span
                key={i}
                className={`absolute bottom-0 ${b.color}`}
                style={{ left: b.left, width: b.width, height: b.height }}
              />
            ))}
          </div>

          {/* Road */}
          <div className="absolute inset-x-0 bottom-0 h-14 bg-white/70" />
          <div className="absolute inset-x-0 bottom-7 h-1 bg-white [mask-image:repeating-linear-gradient(90deg,black_0,black_10px,transparent_10px,transparent_20px)]" />

          {/* Boxes */}
          <div className="absolute bottom-8 left-6 h-6 w-6 -rotate-6 rounded-sm border border-amber-300 bg-amber-100 shadow-sm" />
          <div className="absolute bottom-8 left-12 h-8 w-8 rotate-3 rounded-sm border border-amber-300 bg-amber-100 shadow-sm" />

          {/* Van */}
          <div className="absolute bottom-6 left-1/2 h-24 w-64 -translate-x-1/2">
            <svg
              aria-hidden
              viewBox="0 0 300 120"
              className="absolute inset-0 h-full w-full overflow-visible"
            >
              <defs>
                <linearGradient id="vanBody" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="75%" stopColor="#f4f5f7" />
                  <stop offset="100%" stopColor="#e2e4e8" />
                </linearGradient>
                <linearGradient id="vanCab" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#15803d" />
                </linearGradient>
                <linearGradient id="vanGlass" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#e0f2fe" />
                  <stop offset="55%" stopColor="#bae6fd" />
                  <stop offset="100%" stopColor="#7dd3fc" />
                </linearGradient>
                <linearGradient id="vanStripe" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4ade80" />
                  <stop offset="100%" stopColor="#16a34a" />
                </linearGradient>
                <radialGradient id="wheelRim" cx="0.4" cy="0.35" r="0.7">
                  <stop offset="0%" stopColor="#9ca3af" />
                  <stop offset="100%" stopColor="#4b5563" />
                </radialGradient>
              </defs>

              {/* Ground shadow */}
              <ellipse cx="145" cy="100" rx="130" ry="7" fill="#0f172a" opacity="0.12" />

              {/* Body */}
              <path
                d="M25,15 Q15,15 15,25 L15,92 L271,92 L271,88 L271,75 Q271,66 262,66 L244,66 L212,35 L180,35 L180,15 Z"
                fill="url(#vanBody)"
                className="stroke-neutral-300"
                strokeWidth="1.25"
              />
              {/* Roof highlight */}
              <path d="M25,16 Q16,16 15.5,24 L15.5,20 L180,20 L180,16 Z" fill="#ffffff" opacity="0.9" />
              {/* Cab front (below windshield) */}
              <path
                d="M212,50 L237,50 L244,66 L262,66 Q271,66 271,75 L271,88 L212,88 Z"
                fill="url(#vanCab)"
              />
              {/* Windshield */}
              <path
                d="M183,38 L209,38 L237,64 L183,64 Z"
                fill="url(#vanGlass)"
                className="stroke-neutral-300"
                strokeWidth="1"
              />
              <path d="M188,40 L198,40 L212,53 L200,53 Z" fill="#ffffff" opacity="0.35" />
              {/* Side mirror */}
              <path d="M180,42 L172,44 L172,50 L180,49 Z" className="fill-neutral-700" />

              {/* Green stripe */}
              <rect x="15" y="76" width="256" height="7" fill="url(#vanStripe)" />
              <rect x="15" y="76" width="256" height="2" fill="#ffffff" opacity="0.3" />

              {/* Cargo panel line + rear light */}
              <line x1="150" y1="24" x2="150" y2="76" className="stroke-neutral-200" strokeWidth="1.25" />
              <line x1="15" y1="55" x2="180" y2="55" className="stroke-neutral-200" strokeWidth="1" />
              <rect x="18" y="62" width="6" height="10" rx="2" className="fill-danger-500" opacity="0.85" />

              {/* Grille + headlight */}
              <rect x="252" y="70" width="10" height="5" rx="1" className="fill-neutral-700" />
              <circle cx="264" cy="80" r="3.5" fill="#fde68a" className="stroke-neutral-400" strokeWidth="0.5" />

              {/* Wheels */}
              <circle cx="62" cy="92" r="18" className="fill-neutral-900" />
              <circle cx="62" cy="92" r="18" fill="none" className="stroke-neutral-700" strokeWidth="1" />
              <circle cx="62" cy="92" r="8" fill="url(#wheelRim)" />
              <circle cx="62" cy="92" r="2.5" className="fill-neutral-300" />
              <circle cx="228" cy="92" r="18" className="fill-neutral-900" />
              <circle cx="228" cy="92" r="18" fill="none" className="stroke-neutral-700" strokeWidth="1" />
              <circle cx="228" cy="92" r="8" fill="url(#wheelRim)" />
              <circle cx="228" cy="92" r="2.5" className="fill-neutral-300" />
            </svg>

            <div className="absolute left-[7%] top-[38%] flex w-[43%] -translate-y-1/2 flex-col items-center drop-shadow-sm">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-white shadow-sm">
                <Leaf aria-hidden className="h-4 w-4" />
              </span>
              <span className="mt-1 whitespace-nowrap text-xs font-extrabold text-brand-700">
                Olma Market
              </span>
            </div>
          </div>

          <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-lg">
            <Check aria-hidden className="h-3.5 w-3.5 rounded-full bg-brand-600 p-0.5 text-white" />
            Buyurtmangiz yo&apos;lda!
          </span>

          <span className="absolute bottom-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-600 shadow-lg">
            <MapPin aria-hidden className="h-5 w-5 fill-current" />
          </span>
        </div>
      </div>
    </section>
  );
}
