"use client";

import { useState } from "react";
import { Eye, MessageCircle, ArrowRight } from "lucide-react";
import { newsItems, type NewsCategory } from "@/lib/news-data";
import { NEWS_CATEGORY_COLOR, NEWS_CATEGORY_LABEL } from "@/lib/news-category-style";
import { formatViews } from "@/lib/news-data";

type FilterKey = "Barchasi" | NewsCategory;

const tabs: FilterKey[] = ["Barchasi", "E'lonlar", "Yangiliklar", "Tadbirlar", "Hamkorlik", "Maqolalar"];

export default function NewsGrid() {
  const [filter, setFilter] = useState<FilterKey>("Barchasi");

  const filtered = newsItems.filter(
    (n) => filter === "Barchasi" || n.category === filter
  );

  return (
    <section>
      <div className="flex flex-wrap gap-1 border-b border-border pb-3 text-sm">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setFilter(tab)}
            className={`rounded-full px-3.5 py-1.5 font-medium ${
              filter === tab
                ? "bg-brand-600 text-white"
                : "text-muted hover:bg-brand-50 hover:text-brand-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">
          So&apos;nggi yangiliklar
        </h2>
        <button
          type="button"
          className="flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-brand-50"
        >
          Barchasini ko&apos;rish
          <ArrowRight aria-hidden className="h-3.5 w-3.5" />
        </button>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-8 text-center text-sm text-muted">
          Bu bo&apos;lim bo&apos;yicha hozircha yangilik yo&apos;q.
        </p>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((item) => (
            <article
              key={item.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-border bg-surface"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <span
                  className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold text-white ${NEWS_CATEGORY_COLOR[item.category]}`}
                >
                  {NEWS_CATEGORY_LABEL[item.category]}
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <p className="text-xs text-muted">{item.date}</p>
                <h3 className="mt-1 line-clamp-2 text-sm font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-xs text-muted">
                  {item.description}
                </p>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="flex items-center gap-3 text-xs text-muted">
                    <span className="flex items-center gap-1">
                      <Eye aria-hidden className="h-3.5 w-3.5" />
                      {formatViews(item.views)}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle aria-hidden className="h-3.5 w-3.5" />
                      {item.comments}
                    </span>
                  </div>
                  <button
                    type="button"
                    aria-label={`${item.title} - batafsil`}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-50 text-brand-600 hover:bg-brand-100"
                  >
                    <ArrowRight aria-hidden className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
