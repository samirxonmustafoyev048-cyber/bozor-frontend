import type { CSSProperties } from "react";
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
import FloatingFruit, { type FruitSpec } from "@/components/home/FloatingFruit";

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

const RED = "/hero/olma-qizil.webp";
const GREEN = "/hero/olma-yashil.webp";
const MANDARIN = "/hero/mandarin.webp";
const BERRY = "/hero/qulupnay.webp";

/**
 * Scattered around the edges rather than over the copy, and each piece drifts
 * on its own cycle so the group never pulses in unison. The denser ones drop
 * out on small screens, where there is no room for them.
 */
const fruits: FruitSpec[] = [
  { src: RED, className: "left-[1%] top-[5%] w-11 sm:w-14", duration: "7s", delay: "0s", tilt: "-8deg" },
  { src: BERRY, className: "left-[26%] top-[2%] hidden w-9 sm:block sm:w-11", duration: "8.5s", delay: "-1.2s", tilt: "10deg" },
  { src: GREEN, className: "left-[45%] top-[6%] hidden w-11 lg:block lg:w-14", duration: "6.5s", delay: "-0.6s", tilt: "-5deg" },
  { src: MANDARIN, className: "left-[0.5%] top-[44%] hidden w-9 sm:block sm:w-11", duration: "9s", delay: "-2.4s", tilt: "6deg" },
  { src: BERRY, className: "bottom-[4%] left-[2%] w-9 sm:w-12", duration: "7.5s", delay: "-3s", tilt: "-12deg" },
  { src: GREEN, className: "bottom-[2%] left-[30%] hidden w-9 sm:block sm:w-11", duration: "8s", delay: "-1.8s", tilt: "8deg" },
  { src: MANDARIN, className: "right-[30%] top-[12%] hidden w-10 lg:block lg:w-12", duration: "7s", delay: "-2.1s", tilt: "-6deg" },
  { src: BERRY, className: "right-[5%] top-[7%] w-9 sm:w-11", duration: "9.5s", delay: "-0.9s", tilt: "12deg" },
  { src: RED, className: "bottom-[7%] right-[2%] w-10 sm:w-14", duration: "6.8s", delay: "-3.6s", tilt: "7deg" },
  { src: MANDARIN, className: "bottom-[28%] right-[37%] hidden w-8 lg:block lg:w-10", duration: "8.2s", delay: "-1.5s", tilt: "-10deg" },
];

export default function HeroBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sky-50 to-white">
      <div
        className="absolute inset-y-0 right-0 hidden w-[45%] bg-gradient-to-br from-sky-500 to-blue-600 lg:block"
        style={{ clipPath: "polygon(35% 0, 100% 0, 100% 100%, 0 100%)" }}
      />

      {/* Above the background wash, behind the copy */}
      <div className="pointer-events-none absolute inset-0 z-[1]">
        {fruits.map((fruit, i) => (
          <FloatingFruit key={`${fruit.src}-${i}`} fruit={fruit} />
        ))}
      </div>

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
          {/* A soft radial mask washed the photo out, so it stays a crisp card
              and the floating fruit supplies the depth instead. */}
          <div className="absolute bottom-2 left-0 h-[78%] w-[68%] overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5 sm:w-[66%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero/savat.webp"
              alt="Yangi mevalar solingan savat"
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

          {/* Rides in front of the basket for depth */}
          <span
            aria-hidden
            className="hero-float pointer-events-none absolute bottom-[6%] left-[8%] z-20 w-12 sm:w-14"
            style={
              { "--dur": "7.8s", "--delay": "-2.7s", "--tilt": "-9deg" } as CSSProperties
            }
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={RED}
              alt=""
              className="h-full w-full object-contain drop-shadow-lg"
            />
          </span>
        </div>
      </div>
    </div>
  );
}
