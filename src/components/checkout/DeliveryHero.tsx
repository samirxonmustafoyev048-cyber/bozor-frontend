import { Truck, ShieldCheck, CreditCard, MapPin } from "lucide-react";

const badges = [
  { icon: Truck, title: "Tez yetkazib berish", subtitle: "1-3 soat ichida" },
  { icon: ShieldCheck, title: "Xavfsiz qadoqlash", subtitle: "Sifat kafolati" },
  { icon: CreditCard, title: "Qulay to'lov", subtitle: "Bir necha usulda" },
  { icon: MapPin, title: "Butun O'zbekiston", subtitle: "Barcha yirik shaharlarda" },
];

// Cropped from the full reference mockup (public/yetkazib-berish-hero.png,
// 1536x1024) — keeping just the van/city/pin slice of the banner.
const SOURCE_W = 1536;
const SOURCE_H = 1024;
const CROP_X = 780;
const CROP_Y = 0;
const CROP_W = 756;
const CROP_H = 345;
const DISPLAY_W = 480;
const SCALE = DISPLAY_W / CROP_W;
const DISPLAY_H = Math.round(CROP_H * SCALE);

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

        {/* Delivery scene, cropped from the reference mockup image */}
        <div
          aria-label="Yetkazib berish mashinasi shahar ko'chasida"
          role="img"
          className="relative mx-auto hidden overflow-hidden rounded-2xl bg-sky-50 shadow-sm lg:block"
          style={{
            width: DISPLAY_W,
            height: DISPLAY_H,
            backgroundImage: "url(/yetkazib-berish-hero.png)",
            backgroundSize: `${SOURCE_W * SCALE}px ${SOURCE_H * SCALE}px`,
            backgroundPosition: `${-CROP_X * SCALE}px ${-CROP_Y * SCALE}px`,
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>
    </section>
  );
}
