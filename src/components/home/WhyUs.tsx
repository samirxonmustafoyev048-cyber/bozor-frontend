import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { STOCK_PHOTOS } from "@/lib/stock-photos";

const points = [
  "1000+ mahsulot turi",
  "10 000+ mamnun mijoz",
  "O'zbekiston bo'ylab yetkazish",
];

export default function WhyUs() {
  return (
    <section className="grid items-center gap-6 overflow-hidden rounded-3xl bg-gradient-to-br from-brand-50 to-white p-6 sm:p-8 lg:grid-cols-2 lg:gap-10">
      <div>
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
          Nega <span className="text-brand-600">Olma Market</span>?
        </h2>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
          Biz sizga eng sifatli mahsulotlarni qulay narxlarda taqdim etamiz.
          Maqsadimiz — har bir mijozimizning ishonchini qozonish va kundalik
          hayotini osonlashtirish.
        </p>

        <ul className="mt-5 flex flex-col gap-2.5">
          {points.map((point) => (
            <li key={point} className="flex items-center gap-2 text-sm text-foreground">
              <CheckCircle2 aria-hidden className="h-4 w-4 shrink-0 text-brand-600" />
              {point}
            </li>
          ))}
        </ul>

        <Link
          href="/haqida"
          className="group mt-6 inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Biz haqimizda ko&apos;proq
          <ArrowRight
            aria-hidden
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={STOCK_PHOTOS.customerService}
          alt="Olma Market xaridorlari"
          loading="lazy"
          decoding="async"
          className="h-56 w-full object-cover sm:h-72"
        />
      </div>
    </section>
  );
}
