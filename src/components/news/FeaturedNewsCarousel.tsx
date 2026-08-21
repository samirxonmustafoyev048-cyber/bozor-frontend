"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { newsItems, featuredNews, type NewsItem } from "@/lib/news-data";
import { NEWS_CATEGORY_COLOR, NEWS_CATEGORY_LABEL } from "@/lib/news-category-style";
import { useStoreName } from "@/context/StoreNameContext";
import { withStoreName } from "@/lib/store-name";

const slides: NewsItem[] = [featuredNews, ...newsItems.slice(0, 3)];

export default function FeaturedNewsCarousel() {
  const storeName = useStoreName();
  const [active, setActive] = useState(0);
  const item = slides[active];

  function go(delta: number) {
    setActive((prev) => (prev + delta + slides.length) % slides.length);
  }

  return (
    <section className="relative overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="grid gap-0 lg:grid-cols-2 lg:items-center">
        <div className="order-2 p-6 sm:p-8 lg:order-1">
          <div className="flex items-center gap-2 text-xs">
            <span className={`rounded-full px-2.5 py-1 font-bold text-white ${NEWS_CATEGORY_COLOR[item.category]}`}>
              {NEWS_CATEGORY_LABEL[item.category]}
            </span>
            <span className="text-muted">{item.date}</span>
          </div>
          <h2 className="mt-3 text-2xl font-extrabold leading-tight text-foreground sm:text-3xl">
            {withStoreName(item.title, storeName)}
          </h2>
          <p className="mt-3 max-w-md text-sm text-muted">{item.description}</p>
          <Link
            href="/yangiliklar"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Batafsil o&apos;qish
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </div>

        <div className="relative order-1 aspect-[16/10] lg:order-2 lg:aspect-auto lg:h-80">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.image}
            alt={withStoreName(item.title, storeName)}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <button
        type="button"
        aria-label="Oldingi"
        onClick={() => go(-1)}
        className="absolute left-3 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-foreground shadow-md hover:bg-brand-50 lg:flex"
      >
        <ChevronLeft aria-hidden className="h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label="Keyingi"
        onClick={() => go(1)}
        className="absolute right-3 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-foreground shadow-md hover:bg-brand-50 lg:flex"
      >
        <ChevronRight aria-hidden className="h-5 w-5" />
      </button>

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 lg:hidden">
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            aria-label={`Slayd ${i + 1}`}
            onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === active ? "w-5 bg-brand-600" : "w-1.5 bg-border"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
