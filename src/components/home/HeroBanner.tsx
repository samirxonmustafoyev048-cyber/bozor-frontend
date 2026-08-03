"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  bgClass: string;
  emoji: string;
}

const slides: Slide[] = [
  {
    id: "s1",
    title: "Haftaning aksiyasi",
    subtitle: "Sabzavot va mevalarga -30% gacha chegirma",
    cta: "Xarid qilish",
    href: "/katalog/sabzavot-va-meva",
    bgClass: "bg-brand-600",
    emoji: "🥦",
  },
  {
    id: "s2",
    title: "Birinchi buyurtmaga chegirma",
    subtitle: "Yangi mijozlar uchun 20% chegirma kuponi",
    cta: "Batafsil",
    href: "/aksiyalar",
    bgClass: "bg-accent-600",
    emoji: "🎁",
  },
  {
    id: "s3",
    title: "Tez yetkazib berish",
    subtitle: "Buyurtmangiz 60 daqiqada eshigingiz oldida",
    cta: "Buyurtma berish",
    href: "/katalog",
    bgClass: "bg-brand-800",
    emoji: "🚴",
  },
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
    <div className="relative overflow-hidden rounded-2xl">
      <div
        className={`flex min-h-48 items-center justify-between gap-4 px-6 py-8 text-white transition-colors sm:min-h-64 sm:px-12 ${slide.bgClass}`}
      >
        <div className="max-w-md">
          <h2 className="text-xl font-bold sm:text-3xl">{slide.title}</h2>
          <p className="mt-2 text-sm text-white/90 sm:text-base">
            {slide.subtitle}
          </p>
          <Link
            href={slide.href}
            className="mt-5 inline-block rounded-full bg-white px-5 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"
          >
            {slide.cta}
          </Link>
        </div>
        <div
          aria-hidden
          className="hidden text-7xl sm:block sm:text-8xl"
        >
          {slide.emoji}
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
