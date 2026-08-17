import Link from "next/link";
import { createElement } from "react";
import { ChevronRight } from "lucide-react";
import { getCategoryIcon } from "@/lib/category-icons";
import type { Category } from "@/types/product";

/**
 * Tinted tiles, one per category. The mock-up uses a photo per tile; until
 * those exist the category icon carries the tile, with the tint doing the
 * colour-coding work the photos would.
 */
const TINTS = [
  "bg-red-50",
  "bg-brand-50",
  "bg-rose-50",
  "bg-sky-50",
  "bg-orange-50",
  "bg-amber-50",
  "bg-yellow-50",
  "bg-violet-50",
];

export default function CategoryTiles({ categories }: { categories: Category[] }) {
  if (categories.length === 0) return null;

  return (
    <section>
      <div className="flex items-end justify-between gap-3">
        <h2 className="text-xl font-bold text-foreground sm:text-2xl">
          Kategoriyalar
        </h2>
        <Link
          href="/katalog"
          className="flex shrink-0 items-center gap-0.5 text-sm font-medium text-muted hover:text-brand-700"
        >
          Barchasini ko&apos;rish
          <ChevronRight aria-hidden className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
        {categories.slice(0, 8).map((cat, i) => (
          <Link
            key={cat.slug}
            href={`/katalog/${cat.slug}`}
            className="group overflow-hidden rounded-2xl border border-border bg-surface transition-shadow hover:shadow-md"
          >
            <span
              className={`flex h-20 items-center justify-center ${TINTS[i % TINTS.length]}`}
            >
              {createElement(getCategoryIcon(cat.slug, cat.name), {
                "aria-hidden": true,
                className:
                  "h-9 w-9 text-brand-600 transition-transform group-hover:scale-110",
              })}
            </span>
            <span className="block px-2 py-2.5 text-center text-xs font-semibold text-foreground">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
