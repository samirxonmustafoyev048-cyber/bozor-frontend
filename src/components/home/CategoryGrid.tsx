import Link from "next/link";
import type { Category } from "@/types/product";

export default function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <section>
      <h2 className="text-lg font-bold text-foreground sm:text-xl">
        Kategoriyalar
      </h2>
      <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-8">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/katalog/${cat.slug}`}
            className="flex flex-col items-center gap-2 rounded-xl border border-border bg-surface p-4 text-center hover:border-brand-300 hover:bg-brand-50"
          >
            <span aria-hidden className="text-3xl">
              {cat.icon}
            </span>
            <span className="text-xs font-medium text-foreground sm:text-sm">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
