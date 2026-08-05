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
  Package,
  Leaf,
  type LucideIcon,
} from "lucide-react";

const badges: { icon: LucideIcon; title: string; subtitle: string }[] = [
  { icon: BadgeCheck, title: "100%", subtitle: "Sifat kafolati" },
  { icon: Truck, title: "Tez", subtitle: "yetkazib berish" },
  { icon: CreditCard, title: "Qulay", subtitle: "to'lov usullari" },
];

const miniCategories: { icon: LucideIcon; label: string }[] = [
  { icon: Apple, label: "Mevalar" },
  { icon: Leaf, label: "Sabzavot" },
  { icon: Beef, label: "Go'sht" },
  { icon: Milk, label: "Sut mahsulotlari" },
  { icon: Croissant, label: "Non mahsulotlari" },
  { icon: CupSoda, label: "Ichimlik" },
];

export default function HeroBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sky-50 to-white">
      <div
        className="absolute inset-y-0 right-0 hidden w-[45%] bg-gradient-to-br from-sky-500 to-blue-600 lg:block"
        style={{ clipPath: "polygon(35% 0, 100% 0, 100% 100%, 0 100%)" }}
      />

      <div className="relative grid gap-10 px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-2 lg:items-center">
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

        {/* Illustration */}
        <div className="relative mx-auto h-72 w-full max-w-xs sm:h-80 sm:max-w-sm lg:h-96">
          {/* Basket */}
          <div
            aria-hidden
            className="absolute bottom-4 left-2 h-32 w-40 rounded-b-2xl rounded-t-md bg-brand-600 shadow-xl sm:h-40 sm:w-48"
            style={{ clipPath: "polygon(8% 0, 92% 0, 100% 100%, 0 100%)" }}
          >
            <div className="absolute inset-x-0 top-0 h-2 rounded-t-md bg-brand-700" />
          </div>
          <div
            aria-hidden
            className="absolute bottom-[6.5rem] left-4 h-8 w-36 rounded-full bg-brand-800/40 sm:bottom-[9.5rem] sm:w-44"
          />

          {/* Produce piled above the basket rim */}
          <div
            aria-hidden
            className="absolute bottom-24 left-3 flex h-16 w-36 items-end gap-1 sm:bottom-32 sm:w-44"
          >
            <span className="h-10 w-10 rounded-full bg-emerald-600 shadow sm:h-12 sm:w-12" />
            <span className="h-14 w-12 rounded-full bg-red-500 shadow sm:h-16 sm:w-14" />
            <span className="h-11 w-11 rounded-full bg-amber-500 shadow sm:h-14 sm:w-14" />
            <span className="h-9 w-9 rounded-full bg-emerald-500 shadow sm:h-11 sm:w-11" />
          </div>

          {/* Phone mockup */}
          <div className="absolute bottom-0 right-0 h-64 w-32 -rotate-3 rounded-[1.5rem] border-4 border-neutral-900 bg-neutral-900 shadow-2xl sm:h-72 sm:w-36">
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
                    <span className="text-center text-[5px] leading-none text-neutral-500">
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
                <div className="relative rounded-md bg-neutral-50 p-1">
                  <span className="absolute right-1 top-1 rounded bg-danger-500 px-1 text-[5px] font-bold text-white">
                    -20%
                  </span>
                  <span className="block h-5 w-5 rounded-full bg-amber-400" />
                  <p className="mt-0.5 text-[5.5px] font-medium text-neutral-700">
                    Olma Golden
                  </p>
                  <p className="text-[5.5px] font-bold text-neutral-900">
                    18 900 so&apos;m
                  </p>
                </div>
                <div className="relative rounded-md bg-neutral-50 p-1">
                  <span className="absolute right-1 top-1 rounded bg-danger-500 px-1 text-[5px] font-bold text-white">
                    -15%
                  </span>
                  <span className="block h-5 w-5 rounded-full bg-yellow-400" />
                  <p className="mt-0.5 text-[5.5px] font-medium text-neutral-700">
                    Banan
                  </p>
                  <p className="text-[5.5px] font-bold text-neutral-900">
                    15 900 so&apos;m
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Floating badges */}
          <span className="absolute left-0 top-2 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg sm:h-16 sm:w-16">
            <Apple aria-hidden className="h-7 w-7 text-red-500 sm:h-8 sm:w-8" />
          </span>
          <span className="absolute right-8 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg sm:h-14 sm:w-14">
            <span className="h-7 w-7 rounded-full bg-orange-400 sm:h-8 sm:w-8" />
          </span>
          <span className="absolute right-0 top-1/3 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-sky-600 text-center text-white shadow-lg sm:h-20 sm:w-20">
            <Truck aria-hidden className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="mt-0.5 text-[7px] font-semibold leading-tight sm:text-[8px]">
              Tez yetkazib
              <br />
              berish
            </span>
          </span>
          <Leaf
            aria-hidden
            className="absolute left-1/3 top-0 h-5 w-5 -rotate-12 text-emerald-500 sm:h-6 sm:w-6"
          />
          <Leaf
            aria-hidden
            className="absolute bottom-1/3 left-0 h-5 w-5 rotate-45 text-emerald-500 sm:h-6 sm:w-6"
          />
          <div className="absolute bottom-0 right-2 flex h-11 w-14 flex-col items-center justify-center rounded-md bg-amber-200 text-amber-800 shadow sm:h-14 sm:w-16">
            <Package aria-hidden className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="mt-0.5 text-[6px] font-bold leading-none sm:text-[7px]">
              Olma Market
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
