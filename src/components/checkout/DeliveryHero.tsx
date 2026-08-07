import { Truck, ShieldCheck, CreditCard, MapPin, Check, Package } from "lucide-react";

const badges = [
  { icon: Truck, title: "Tez yetkazib berish", subtitle: "1-3 soat ichida" },
  { icon: ShieldCheck, title: "Xavfsiz qadoqlash", subtitle: "Sifat kafolati" },
  { icon: CreditCard, title: "Qulay to'lov", subtitle: "Bir necha usulda" },
  { icon: MapPin, title: "Butun O'zbekiston", subtitle: "Barcha yirik shaharlarda" },
];

export default function DeliveryHero() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-50 to-white">
      <div className="relative grid gap-6 px-6 py-8 sm:px-10 sm:py-10 lg:grid-cols-2 lg:items-center">
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

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
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

        <div className="relative mx-auto hidden h-40 w-full max-w-sm lg:block">
          <span className="absolute right-2 top-0 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-lg">
            <Check aria-hidden className="h-3.5 w-3.5 rounded-full bg-brand-600 p-0.5 text-white" />
            Buyurtmangiz yo&apos;lda!
          </span>

          <div className="absolute bottom-2 left-4 flex h-24 w-56 items-center justify-center rounded-2xl bg-brand-600 shadow-xl">
            <div className="flex flex-col items-center text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                <Package aria-hidden className="h-5 w-5" />
              </span>
              <span className="mt-1 text-xs font-bold">Olma Market</span>
            </div>
          </div>
          <span className="absolute -bottom-1 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-600 shadow-lg">
            <MapPin aria-hidden className="h-5 w-5 fill-current" />
          </span>
        </div>
      </div>
    </section>
  );
}
