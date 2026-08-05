import Link from "next/link";
import { Leaf, ArrowRight, Award, ShieldCheck, Headset } from "lucide-react";
import { STOCK_PHOTOS } from "@/lib/stock-photos";

const values = [
  { icon: Award, title: "Sifat", subtitle: "Faqat eng yaxshi mahsulotlar" },
  { icon: ShieldCheck, title: "Ishonch", subtitle: "Mijozlar ishonchini qadrlaymiz" },
  { icon: Headset, title: "Xizmat", subtitle: "Tez va samimiy xizmat ko'rsatish" },
];

export default function AboutHero() {
  return (
    <section className="grid gap-16 lg:grid-cols-2 lg:items-center">
      <div className="relative z-10">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-700">
          <Leaf aria-hidden className="h-3.5 w-3.5" />
          Biz haqimizda
        </span>
        <h1 className="mt-4 text-3xl font-extrabold leading-tight text-foreground sm:text-4xl lg:text-5xl">
          Olma Market – sifatli mahsulotlar va ishonchli xizmat
        </h1>
        <p className="mt-4 max-w-md text-sm text-muted sm:text-base">
          Olma Market 2023-yilda tashkil etilgan bo&apos;lib, maqsadimiz — har
          bir mijozga eng sifatli mahsulotlarni qulay narxda va tez yetkazib
          berish orqali taqdim etish. Biz sizning vaqtingizni qadrlaymiz va
          har doim sifat hamda xizmatni birinchi o&apos;ringa qo&apos;yamiz.
        </p>
        <Link
          href="/katalog"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Ko&apos;proq bilish
          <ArrowRight aria-hidden className="h-4 w-4" />
        </Link>
      </div>

      <div className="relative">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={STOCK_PHOTOS.storeAisle}
            alt="Olma Market do'koni"
            className="h-full w-full object-cover"
          />
          <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-extrabold text-brand-700 shadow-lg">
            <Leaf aria-hidden className="h-4 w-4 fill-current" />
            Olma Market
          </span>
        </div>

        <div className="absolute -bottom-8 -right-4 h-32 w-32 overflow-hidden rounded-2xl border-4 border-white shadow-xl sm:-right-8 sm:h-40 sm:w-40">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={STOCK_PHOTOS.vegetableBasket}
            alt="Yangi sabzavot va mevalar"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="absolute -left-6 top-1/2 w-64 -translate-y-1/2 rounded-2xl border border-border bg-surface p-5 shadow-xl sm:-left-16 sm:w-72">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-danger-500 text-white">
              <Award aria-hidden className="h-4 w-4" />
            </span>
            <h2 className="text-sm font-bold text-foreground">
              Bizning qadriyatlarimiz
            </h2>
          </div>
          <ul className="mt-4 flex flex-col gap-3">
            {values.map((v) => (
              <li key={v.title} className="flex items-start gap-2.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <v.icon aria-hidden className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-foreground">
                    {v.title}
                  </span>
                  <span className="block text-xs text-muted">
                    {v.subtitle}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
