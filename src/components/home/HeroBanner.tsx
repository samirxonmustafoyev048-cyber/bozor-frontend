import type { CSSProperties } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Truck,
  CreditCard,
  Headset,
  Heart,
  Apple,
  Bell,
  Milk,
  Beef,
  CupSoda,
  Croissant,
  Leaf,
  Home,
  LayoutGrid,
  ShoppingCart,
  User,
  type LucideIcon,
} from "lucide-react";

const badges: { icon: LucideIcon; title: string; subtitle: string }[] = [
  { icon: BadgeCheck, title: "100%", subtitle: "Sifat kafolati" },
  { icon: Truck, title: "Tez", subtitle: "yetkazib berish" },
  { icon: CreditCard, title: "Qulay", subtitle: "to'lov usullari" },
  { icon: Headset, title: "24/7", subtitle: "qo'llab-quvvatlash" },
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

const phoneProducts = [
  { image: "/hero/olma-qizil.webp", name: "Olma Golden", price: "18 900 so'm", off: "-20%" },
  { image: "/hero/qulupnay.webp", name: "Qulupnay", price: "27 500 so'm", off: "-15%" },
];

const phoneTabs: LucideIcon[] = [Home, LayoutGrid, ShoppingCart, Heart, User];

/**
 * Decorative cut-outs scattered around the basket. Positions are percentages of
 * the illustration column, and each drifts on its own cycle so the group never
 * pulses in unison.
 */
const fruits: {
  src: string;
  width: number;
  height: number;
  className: string;
  duration: string;
  delay: string;
  tilt: string;
}[] = [
  {
    src: "/hero/qulupnay.webp", width: 131, height: 160,
    className: "left-[42%] top-[1%] w-9 sm:w-11",
    duration: "7s", delay: "0s", tilt: "10deg",
  },
  {
    src: "/hero/olma-yashil.webp", width: 155, height: 160,
    className: "right-[6%] top-[6%] hidden w-10 sm:block sm:w-12",
    duration: "8.5s", delay: "-1.4s", tilt: "-7deg",
  },
  {
    src: "/hero/mandarin.webp", width: 96, height: 160,
    className: "left-[4%] top-[30%] hidden w-8 lg:block lg:w-10",
    duration: "9s", delay: "-2.6s", tilt: "8deg",
  },
  {
    src: "/hero/olma-yashil.webp", width: 155, height: 160,
    className: "bottom-[2%] left-[30%] w-10 sm:w-14",
    duration: "6.8s", delay: "-3.2s", tilt: "6deg",
  },
  {
    src: "/hero/olma-qizil.webp", width: 145, height: 160,
    className: "bottom-[16%] right-[2%] hidden w-9 sm:block sm:w-11",
    duration: "7.8s", delay: "-1.9s", tilt: "-11deg",
  },
];

export default function HeroBanner() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-brand-50/40 to-brand-50">
      {/* Soft organic wash in the lower right, mirroring the mock-up */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-16 h-80 w-[42rem] rounded-full bg-gradient-to-tr from-brand-200/50 to-brand-100/20 blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-8 h-64 w-64 rounded-full bg-sky-100/40 blur-3xl"
      />

      <div className="relative z-10 grid gap-8 px-6 py-10 sm:px-10 sm:py-12 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-4">
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-700">
            <BadgeCheck aria-hidden className="h-3.5 w-3.5" />
            Sifat • Tezlik • Ishonch
          </span>

          <h1 className="mt-4 text-3xl font-extrabold leading-[1.15] text-foreground sm:text-4xl lg:text-[2.75rem]">
            <span className="text-brand-600">Olma</span>{" "}
            <span className="text-sky-600">Market</span> –
            <br className="hidden sm:block" /> Xarid qilishning eng oson
            yo&apos;li!
          </h1>

          <p className="mt-3 max-w-md text-sm text-muted sm:text-base lg:mx-0">
            Sifatli mahsulotlar, qulay narxlar va tez yetkazib berish xizmati.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 lg:justify-start">
            {badges.map((b) => (
              <div key={b.subtitle} className="flex items-center gap-2">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-brand-600 shadow-sm ring-1 ring-brand-100">
                  <b.icon aria-hidden className="h-4 w-4" />
                </span>
                <span className="text-left">
                  <span className="block text-sm font-bold leading-tight text-foreground">
                    {b.title}
                  </span>
                  <span className="block text-[11px] leading-tight text-muted">
                    {b.subtitle}
                  </span>
                </span>
              </div>
            ))}
          </div>

          <Link
            href="/katalog"
            className="group mt-8 inline-flex items-center gap-3 rounded-full bg-brand-600 py-2 pl-6 pr-2 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-colors hover:bg-brand-700"
          >
            Hoziroq xarid qilish
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:translate-x-0.5">
              <ArrowRight aria-hidden className="h-4 w-4" />
            </span>
          </Link>
        </div>

        {/* Basket + handset */}
        <div className="relative mx-auto h-80 w-full max-w-sm sm:h-96 lg:h-[26rem] lg:max-w-none">
          {fruits.map((fruit, i) => (
            <span
              key={`${fruit.src}-${i}`}
              aria-hidden
              className={`hero-float pointer-events-none absolute z-20 select-none ${fruit.className}`}
              style={
                {
                  "--dur": fruit.duration,
                  "--delay": fruit.delay,
                  "--tilt": fruit.tilt,
                } as CSSProperties
              }
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={fruit.src}
                alt=""
                width={fruit.width}
                height={fruit.height}
                // Above the fold, so lazy would only make them pop in late.
                fetchPriority="low"
                decoding="async"
                className="h-full w-full object-contain drop-shadow-[0_6px_10px_rgba(15,23,42,0.18)]"
              />
            </span>
          ))}

          <div className="absolute bottom-0 left-0 h-[92%] w-[78%] sm:w-[74%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero/savat.webp"
              alt="To'qilgan savatda turli mevalar"
              width={760}
              height={757}
              // Largest element in the viewport on load, so it leads the queue.
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-contain object-bottom drop-shadow-2xl"
            />
          </div>

          {/* Round call-out riding the basket's top-left shoulder */}
          <span className="absolute left-[6%] top-[6%] z-30 hidden h-24 w-24 flex-col items-center justify-center rounded-full bg-sky-500 text-center text-white shadow-xl sm:flex">
            <Heart aria-hidden className="h-4 w-4" />
            <span className="mt-1 px-2 text-[10px] font-bold leading-tight">
              Yangi mahsulotlar har kuni!
            </span>
          </span>

          <div className="hero-phone absolute bottom-2 right-0 z-20 h-72 w-36 rounded-[1.6rem] border-4 border-neutral-900 bg-neutral-900 shadow-2xl sm:h-80 sm:w-40">
            <div className="flex h-full w-full flex-col overflow-hidden rounded-[1.2rem] bg-white">
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

              <div className="mt-auto flex items-center justify-around border-t border-neutral-100 px-1 py-1.5">
                {phoneTabs.map((Tab, i) => (
                  <Tab
                    key={i}
                    aria-hidden
                    className={`h-2.5 w-2.5 ${i === 0 ? "text-brand-600" : "text-neutral-300"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
