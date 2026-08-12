import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Truck,
  CreditCard,
  Apple,
  Bell,
  Milk,
  Beef,
  CupSoda,
  Croissant,
  Leaf,
  type LucideIcon,
} from "lucide-react";
const badges: { icon: LucideIcon; title: string; subtitle: string }[] = [
  { icon: BadgeCheck, title: "100%", subtitle: "Sifat kafolati" },
  { icon: Truck, title: "Tez", subtitle: "yetkazib berish" },
  { icon: CreditCard, title: "Qulay", subtitle: "to'lov usullari" },
];

// Labels are kept to one short word: the tile is ~38px wide, so anything
// longer wrapped into unreadable slivers.
const miniCategories: { icon: LucideIcon; label: string }[] = [
  { icon: Apple, label: "Meva" },
  { icon: Leaf, label: "Sabzavot" },
  { icon: Beef, label: "Go'sht" },
  { icon: Milk, label: "Sut" },
  { icon: Croissant, label: "Non" },
  { icon: CupSoda, label: "Ichimlik" },
];

/** The handset's shelf. Same cut-outs the banner used to scatter around. */
const phoneProducts = [
  { image: "/hero/olma-qizil.webp", name: "Olma Golden", price: "18 900 so'm", off: "-20%" },
  { image: "/hero/qulupnay.webp", name: "Qulupnay", price: "27 500 so'm", off: "-15%" },
];

export default function HeroBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sky-50 to-white">
      <div
        className="absolute inset-y-0 right-0 hidden w-[45%] bg-gradient-to-br from-sky-500 to-blue-600 lg:block"
        style={{ clipPath: "polygon(35% 0, 100% 0, 100% 100%, 0 100%)" }}
      />

      <div className="relative z-10 grid gap-10 px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-2 lg:items-center">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-extrabold leading-tight text-foreground sm:text-4xl lg:text-5xl">
            <span className="text-brand-600">Olma</span>{" "}
            <span className="text-sky-600">Market</span> - Xarid qilishning
            eng oson yo&apos;li!
          </h1>
          <p className="mt-4 text-sm text-muted sm:text-base">
            Sifatli mahsulotlar, qulay narxlar va tez yetkazib berish
            xizmati.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 lg:justify-start">
            {badges.map((b) => (
              <div key={b.subtitle} className="flex items-center gap-2.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                  <b.icon aria-hidden className="h-5 w-5" />
                </span>
                <span className="text-left">
                  <span className="block text-sm font-bold text-foreground">
                    {b.title}
                  </span>
                  <span className="block text-xs text-muted">
                    {b.subtitle}
                  </span>
                </span>
              </div>
            ))}
          </div>

          <Link
            href="/katalog"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Hoziroq xarid qilish
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </div>

        {/* Basket photo + phone mockup */}
        <div className="relative mx-auto h-72 w-full max-w-xs sm:h-80 sm:max-w-sm lg:h-96 lg:max-w-none">
          {/* A soft radial mask washed the photo out, so it stays a crisp card. */}
          <div className="absolute bottom-2 left-0 h-[78%] w-[68%] overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5 sm:w-[66%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero/savat.webp"
              alt="Yangi mevalar solingan savat"
              width={760}
              height={507}
              // Largest element in the viewport on load, so it leads the queue.
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover object-bottom"
            />
          </div>

          <div className="hero-phone absolute bottom-0 right-0 h-64 w-32 rounded-[1.5rem] border-4 border-neutral-900 bg-neutral-900 shadow-2xl sm:h-72 sm:w-36">
            <div className="h-full w-full overflow-hidden rounded-[1.1rem] bg-white">
              <div className="flex items-center justify-between bg-brand-600 px-2 py-1.5">
                <span className="flex items-center gap-1 text-[9px] font-bold text-white">
                  <Apple aria-hidden className="h-2.5 w-2.5" />
                  Olma Market
                </span>
                <Bell aria-hidden className="h-2.5 w-2.5 text-white" />
              </div>

              <div className="m-1.5 rounded-md bg-brand-50 p-1.5">
                <p className="text-[8px] font-semibold leading-tight text-brand-800">
                  Yangi mahsulotlar
                  <br />
                  har kuni!
                </p>
                <span className="mt-1 inline-block rounded-full bg-brand-600 px-1.5 py-0.5 text-[6px] font-semibold text-white">
                  Ko&apos;rish →
                </span>
              </div>

              <div className="mx-1.5 grid grid-cols-3 gap-1">
                {miniCategories.map((c) => (
                  <div
                    key={c.label}
                    className="flex flex-col items-center gap-0.5 rounded-md bg-neutral-50 py-1"
                  >
                    <c.icon aria-hidden className="h-2.5 w-2.5 text-brand-600" />
                    <span className="text-center text-[6px] leading-none text-neutral-500">
                      {c.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mx-1.5 mt-1.5 flex items-center justify-between">
                <span className="text-[7px] font-semibold text-neutral-700">
                  Aksiya
                </span>
                <span className="text-[6px] text-brand-600">Barchasi &gt;</span>
              </div>

              <div className="mx-1.5 mt-1 grid grid-cols-2 gap-1">
                {phoneProducts.map((p) => (
                  <div key={p.name} className="relative rounded-md bg-neutral-50 p-1">
                    <span className="absolute right-1 top-1 z-10 rounded bg-danger-500 px-1 text-[5px] font-bold text-white">
                      {p.off}
                    </span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.image}
                      alt=""
                      width={64}
                      height={64}
                      fetchPriority="low"
                      decoding="async"
                      className="h-6 w-6 object-contain"
                    />
                    <p className="mt-0.5 text-[6px] font-medium leading-tight text-neutral-700">
                      {p.name}
                    </p>
                    <p className="text-[6px] font-bold text-neutral-900">{p.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
