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
          <div className="absolute bottom-8 left-1/2 h-20 w-52 -translate-x-1/2">
            <div className="absolute bottom-3 left-0 flex h-16 w-40 flex-col items-center justify-center rounded-xl border border-border bg-white shadow-lg">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-white">
                <Leaf aria-hidden className="h-4 w-4" />
              </span>
              <span className="mt-1 text-xs font-extrabold text-brand-700">
                Olma Market
              </span>
            </div>
            <div className="absolute bottom-3 right-0 h-14 w-14 rounded-r-xl rounded-l-md bg-brand-600 shadow-lg">
              <div className="absolute left-2 top-2 h-5 w-8 rounded-sm bg-sky-100/90" />
            </div>
            <span className="absolute bottom-4 left-0 h-1.5 w-40 rounded-full bg-brand-500" />
            <span className="absolute -bottom-1 left-7 h-6 w-6 rounded-full bg-neutral-800">
              <span className="absolute inset-1.5 rounded-full bg-neutral-300" />
            </span>
            <span className="absolute -bottom-1 right-6 h-6 w-6 rounded-full bg-neutral-800">
              <span className="absolute inset-1.5 rounded-full bg-neutral-300" />
            </span>
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
