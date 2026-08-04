"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Carrot, Gift, Bike, Leaf, Percent, Truck, type LucideIcon } from "lucide-react";

interface Slide {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  icon: LucideIcon;
}

const slides: Slide[] = [
  {
    id: "s1",
    eyebrow: "Sizga mehr bilan",
    title: "Yanada arzon narx!",
    subtitle: "Sabzavot va mevalarga -30% gacha chegirma taklif etamiz",
    cta: "Xarid qilish",
    href: "/katalog/sabzavot-va-meva",
    icon: Carrot,
  },
  {
    id: "s2",
    eyebrow: "Yangi mijozlarga",
    title: "Birinchi buyurtmaga sovg'a!",
    subtitle: "Ro'yxatdan o'ting va 20% chegirma kuponini qo'lga kiriting",
    cta: "Batafsil",
    href: "/kirish",
    icon: Gift,
  },
  {
    id: "s3",
    eyebrow: "Tezkor yetkazib berish",
    title: "60 daqiqada eshigingizda!",
    subtitle: "Olma Market bilan xaridingiz doim vaqtida yetib boradi",
    cta: "Buyurtma berish",
    href: "/katalog",
    icon: Bike,
  },
];

const badges = [
  { icon: Leaf, label: "100% tabiiy" },
  { icon: Percent, label: "Har kuni chegirma" },
  { icon: Truck, label: "Tez yetkazish" },
];

export default function HeroBanner() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[active];

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800">
      <div className="relative flex min-h-64 flex-col items-center justify-between gap-6 px-6 py-10 text-white sm:min-h-80 sm:flex-row sm:px-12">
        <div className="max-w-lg text-center sm:text-left">
          <span className="text-sm font-semibold uppercase tracking-wide text-brand-100">
            {slide.eyebrow}
          </span>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight sm:text-5xl">
            {slide.title}
          </h1>
          <p className="mt-3 text-sm text-white/90 sm:text-base">
            {slide.subtitle}
          </p>
          <Link
            href={slide.href}
            className="mt-6 inline-block rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-50"
          >
            {slide.cta}
          </Link>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:justify-start">
            {badges.map((b) => (
              <span
                key={b.label}
                className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium backdrop-blur-sm"
              >
                <b.icon aria-hidden className="h-3.5 w-3.5" />
                {b.label}
              </span>
            ))}
          </div>
        </div>

        <div
          aria-hidden
          className="flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-white/10 sm:h-56 sm:w-56"
        >
          <slide.icon className="h-16 w-16 text-white sm:h-28 sm:w-28" />
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            aria-label={`Slayd ${i + 1}`}
            onClick={() => setActive(i)}
            className={`h-2 rounded-full transition-all ${
              i === active ? "w-6 bg-white" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
