import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Truck } from "lucide-react";

const promises = [
  "2 soat ichida yetkazish",
  "100% sifat kafolati",
  "Qulay narxlar",
];

/**
 * Cut-outs drifting around the basket. Positions are percentages of the
 * illustration column, and each runs on its own cycle so the group never
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
    className: "left-[40%] top-0 w-8 sm:w-10",
    duration: "7s", delay: "0s", tilt: "10deg",
  },
  {
    src: "/hero/olma-yashil.webp", width: 155, height: 160,
    className: "left-[2%] top-[24%] hidden w-9 sm:block sm:w-11",
    duration: "8.5s", delay: "-1.4s", tilt: "-7deg",
  },
  {
    src: "/hero/olma-qizil.webp", width: 145, height: 160,
    className: "bottom-[6%] left-[6%] w-9 sm:w-12",
    duration: "6.8s", delay: "-3.2s", tilt: "6deg",
  },
];

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-50 via-brand-50/60 to-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-20 hidden h-[130%] w-1/2 rotate-12 rounded-[6rem] bg-gradient-to-br from-brand-100/80 to-brand-200/40 lg:block"
      />

      <div className="relative z-10 grid items-center gap-8 px-6 py-10 sm:px-10 sm:py-12 lg:grid-cols-[1fr_1fr]">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-extrabold leading-[1.15] text-foreground sm:text-4xl lg:text-5xl">
            Kundalik xaridingiz
            <br />
            <span className="text-brand-600">o&apos;son va tez!</span>
          </h1>

          <p className="mt-4 text-sm text-muted sm:text-base">
            Yangi va sifatli mahsulotlarni
            <br className="hidden sm:block" /> uyingizga yetkazib beramiz
          </p>

          <Link
            href="/katalog"
            className="group mt-7 inline-flex items-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-colors hover:bg-brand-700"
          >
            Xarid qilish
            <ArrowRight
              aria-hidden
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            />
          </Link>

          <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 lg:justify-start">
            {promises.map((promise) => (
              <li key={promise} className="flex items-center gap-1.5 text-xs text-muted">
                <CheckCircle2 aria-hidden className="h-4 w-4 shrink-0 text-brand-600" />
                {promise}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto h-64 w-full max-w-sm sm:h-80 lg:h-[22rem] lg:max-w-none">
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

          <div className="absolute -bottom-1 right-0 z-30 flex items-center gap-2.5 rounded-2xl bg-surface px-4 py-3 shadow-xl ring-1 ring-black/5 sm:right-2">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <Truck aria-hidden className="h-4 w-4" />
            </span>
            <span>
              <span className="block text-xs font-bold leading-tight text-foreground">
                Bepul yetkazish
              </span>
              <span className="block text-[11px] leading-tight text-muted">
                150 000 so&apos;mdan yuqori buyurtmalarga
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
