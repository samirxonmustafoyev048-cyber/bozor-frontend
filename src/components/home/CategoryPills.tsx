import Link from "next/link";
import { createElement } from "react";
import { LayoutGrid } from "lucide-react";
import type { Category } from "@/types/product";
import { getCategoryIcon } from "@/lib/category-icons";

export default function CategoryPills({ categories }: { categories: Category[] }) {
  return (
    <div className="flex items-center gap-4 overflow-x-auto pb-1">
      {categories.slice(0, 7).map((cat) => (
        <Link
          key={cat.slug}
          href={`/katalog/${cat.slug}`}
          className="flex shrink-0 flex-col items-center gap-1.5"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-surface transition-colors hover:border-brand-300 hover:bg-brand-50">
            {createElement(getCategoryIcon(cat.slug, cat.name), {
              "aria-hidden": true,
              className: "h-6 w-6 text-brand-600",
            })}
          </span>
          <span className="text-xs font-medium text-foreground">
            {cat.name}
          </span>
        </Link>
      ))}
      <Link
        href="/katalog"
        className="flex shrink-0 flex-col items-center gap-1.5"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-dashed border-brand-300 bg-brand-50 text-brand-700">
          <LayoutGrid aria-hidden className="h-6 w-6" />
        </span>
        <span className="text-xs font-medium text-foreground">
          Yana ko&apos;p
        </span>
      </Link>
    </div>
  );
}
