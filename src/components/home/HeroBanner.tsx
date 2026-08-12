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
import ParallaxScene from "@/components/home/ParallaxScene";

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

/** The handset's shelf, using the same cut-outs as the floating fruit. */
const phoneProducts = [
  { image: "/hero/olma-qizil.webp", name: "Olma Golden", price: "18 900 so'm", off: "-20%" },
  { image: "/hero/qulupnay.webp", name: "Qulupnay", price: "27 500 so'm", off: "-15%" },
];

const RED = { src: "/hero/olma-qizil.webp", width: 145, height: 160 };
const GREEN = { src: "/hero/olma-yashil.webp", width: 155, height: 160 };
const MANDARIN = { src: "/hero/mandarin.webp", width: 96, height: 160 };
const BERRY = { src: "/hero/qulupnay.webp", width: 131, height: 160 };

/**
 * Scattered around the edges rather than over the copy, and each piece drifts
 * on its own cycle so the group never pulses in unison.
 *
 * Everything in the upper band is hidden below `sm`: the heading is centred and
 * full-width there, so a fruit at the top has nowhere to sit that is not behind
 * text. What remains on phones sits around the basket and the handset.
 */
const fruits: FruitSpec[] = [
  { ...RED, className: "left-[1%] top-[5%] hidden w-11 sm:block sm:w-14", duration: "7s", delay: "0s", tilt: "-8deg", depth: "16px" },
  { ...BERRY, className: "left-[26%] top-[2%] hidden w-9 sm:block sm:w-11", duration: "8.5s", delay: "-1.2s", tilt: "10deg", depth: "9px" },
  { ...GREEN, className: "left-[45%] top-[6%] hidden w-11 lg:block lg:w-14", duration: "6.5s", delay: "-0.6s", tilt: "-5deg", depth: "14px" },
  { ...MANDARIN, className: "left-[0.5%] top-[44%] hidden w-9 sm:block sm:w-11", duration: "9s", delay: "-2.4s", tilt: "6deg", depth: "8px" },
  { ...BERRY, className: "bottom-[4%] left-[2%] w-11 sm:w-12", duration: "7.5s", delay: "-3s", tilt: "-12deg", depth: "13px" },
  { ...GREEN, className: "bottom-[2%] left-[30%] hidden w-9 sm:block sm:w-11", duration: "8s", delay: "-1.8s", tilt: "8deg", depth: "7px" },
  { ...MANDARIN, className: "right-[30%] top-[12%] hidden w-10 lg:block lg:w-12", duration: "7s", delay: "-2.1s", tilt: "-6deg", depth: "11px" },
  { ...BERRY, className: "right-[5%] top-[7%] hidden w-9 sm:block sm:w-11", duration: "9.5s", delay: "-0.9s", tilt: "12deg", depth: "8px" },
  { ...RED, className: "bottom-[7%] right-[2%] w-12 sm:w-14", duration: "6.8s", delay: "-3.6s", tilt: "7deg", depth: "17px" },
  { ...MANDARIN, className: "bottom-[28%] right-[37%] hidden w-8 lg:block lg:w-10", duration: "8.2s", delay: "-1.5s", tilt: "-10deg", depth: "6px" },
];

export default function HeroBanner() {
  return (
    <ParallaxScene className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sky-50 to-white">
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

          {/* Rides in front of the basket, and moves the most with the pointer */}
          <span
            aria-hidden
            className="hero-parallax pointer-events-none absolute bottom-[6%] left-[8%] z-20 w-12 sm:w-14"
            style={{ "--depth": "22px" } as CSSProperties}
          >
            <span
              className="hero-float block"
              style={
                { "--dur": "7.8s", "--delay": "-2.7s", "--tilt": "-9deg" } as CSSProperties
              }
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={RED.src}
                alt=""
                width={RED.width}
                height={RED.height}
                fetchPriority="low"
                decoding="async"
                className="h-full w-full object-contain drop-shadow-lg"
              />
            </span>
          </span>
        </div>
      </div>
    </ParallaxScene>
  );
}
