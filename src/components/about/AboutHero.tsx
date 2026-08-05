import Link from "next/link";
import { Leaf, ArrowRight, Award, ShieldCheck, Headset } from "lucide-react";

const values = [
  { icon: Award, title: "Sifat", subtitle: "Faqat eng yaxshi mahsulotlar" },
  { icon: ShieldCheck, title: "Ishonch", subtitle: "Mijozlar ishonchini qadrlaymiz" },
  { icon: Headset, title: "Xizmat", subtitle: "Tez va samimiy xizmat ko'rsatish" },
];

export default function AboutHero() {
  return (
    <section className="grid gap-10 lg:grid-cols-2 lg:items-center">
      <div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-700">
          <Leaf aria-hidden className="h-3.5 w-3.5" />
          Biz haqimizda
        </span>
        <h1 className="mt-4 text-3xl font-extrabold leading-tight text-foreground sm:text-4xl lg:text-5xl">
          Olma Market – sifatli mahsulotlar va ishonchli xizmat
        </h1>
        <p className="mt-4 text-sm text-muted sm:text-base">
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
        <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800">
          <Leaf aria-hidden className="h-32 w-32 text-white/20" />
          <span className="absolute left-6 top-6 flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-600 shadow-lg">
            <Leaf aria-hidden className="h-6 w-6" />
          </span>
          <span className="absolute bottom-6 right-6 rounded-xl bg-white px-4 py-2 text-sm font-bold text-brand-700 shadow-lg">
            Olma Market
          </span>
        </div>

        <div className="relative -mt-10 ml-4 w-64 rounded-2xl border border-border bg-surface p-5 shadow-xl sm:ml-10 sm:w-72">
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
