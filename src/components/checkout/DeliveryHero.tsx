import type { CSSProperties } from "react";
import { Truck, Zap, ShieldCheck, CreditCard, MapPin } from "lucide-react";

const badges = [
  { icon: Zap, title: "Tez yetkazib berish", subtitle: "1–3 soat ichida" },
  { icon: ShieldCheck, title: "Xavfsiz qadoqlash", subtitle: "Sifat kafolati" },
  { icon: CreditCard, title: "Qulay to'lov", subtitle: "Bir necha usulda" },
  { icon: MapPin, title: "Butun O'zbekiston", subtitle: "Barcha yirik shaharlarda" },
];

// The scene (van, city, boxes, map pin) was cut out of the reference mockup
// design/yetkazib-berish-hero.png at 878,112 568x229 with sharp. `contain`
// keeps it whole at every breakpoint; on wide screens the banner is close
// enough to the image's own 568x229 ratio that it reads as a full bleed.
const scene: CSSProperties = {
  backgroundImage: "url(/yetkazib-berish-sahna.webp)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  backgroundPosition: "right center",
};

// Melts the scene's left edge into the banner's green gradient instead of
// letting it end on a hard vertical line.
const leftFade = "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.45) 6%, #000 18%)";

export default function DeliveryHero() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-brand-100 bg-gradient-to-r from-brand-50 via-brand-50/50 to-white">
      {/* Bleeds to the banner's top, right and bottom edges */}
      <div
        role="img"
        aria-label="Yetkazib berish mashinasi shahar ko'chasida"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] md:block xl:w-[48%]"
        style={{ ...scene, maskImage: leftFade, WebkitMaskImage: leftFade }}
      />

      <div className="relative px-5 py-5 sm:px-8 sm:py-6">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
          <Truck aria-hidden className="h-3.5 w-3.5" />
          Tez va ishonchli yetkazib berish
        </span>
        <h1 className="mt-2.5 text-2xl font-extrabold leading-tight text-foreground">
          Yetkazib berish – <span className="text-brand-600">uyingizgacha!</span>
        </h1>
        <p className="mt-1.5 max-w-[460px] text-[13px] leading-relaxed text-muted">
          Sevimli mahsulotlaringizni endi yetkazib berish xizmatimiz orqali
          uyingizga yoki ofisingizga qulay va tez qabul qiling.
        </p>

        <div className="mt-5 grid max-w-[430px] grid-cols-1 gap-2.5 sm:grid-cols-2 xl:max-w-[600px] xl:grid-cols-4">
          {badges.map((b) => (
            <div
              key={b.title}
              className="flex items-center gap-2 rounded-2xl border border-brand-100 bg-white/90 px-2.5 py-2 backdrop-blur-sm"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <b.icon aria-hidden className="h-3.5 w-3.5" />
              </span>
              <span className="min-w-0">
                <span className="block text-[11px] font-bold leading-tight text-foreground">
                  {b.title}
                </span>
                <span className="block text-[10px] leading-tight text-muted">
                  {b.subtitle}
                </span>
              </span>
            </div>
          ))}
        </div>

        {/* Narrow screens have no room beside the text, so the scene sits below it */}
        <div
          role="img"
          aria-label="Yetkazib berish mashinasi shahar ko'chasida"
          className="mt-5 h-28 w-full rounded-xl md:hidden"
          style={{ ...scene, backgroundPosition: "center" }}
        />
      </div>
    </section>
  );
}
