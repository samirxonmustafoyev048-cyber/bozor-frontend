import Link from "next/link";
import type { Category } from "@/types/product";

export default function FilterSidebar({
  categories,
  activeCategory,
  minPrice,
  maxPrice,
  discountOnly,
  sort,
  query,
  formAction,
}: {
  categories: Category[];
  activeCategory?: string;
  minPrice?: number;
  maxPrice?: number;
  discountOnly?: boolean;
  sort?: string;
  query?: string;
  formAction: string;
}) {
  return (
    <aside className="flex w-full flex-col gap-6 sm:w-56 sm:shrink-0">
      <div>
        <h3 className="text-sm font-semibold text-foreground">
          Kategoriyalar
        </h3>
        <ul className="mt-3 space-y-1 text-sm">
          <li>
            <Link
              href="/katalog"
              className={`block rounded-md px-2 py-1.5 ${
                !activeCategory
                  ? "bg-brand-100 font-medium text-brand-800"
                  : "text-foreground/80 hover:bg-brand-50"
              }`}
            >
              Barcha mahsulotlar
            </Link>
          </li>
          {categories.map((cat) => (
            <li key={cat.slug}>
              <Link
                href={`/katalog/${cat.slug}`}
                className={`flex items-center gap-2 rounded-md px-2 py-1.5 ${
                  activeCategory === cat.slug
                    ? "bg-brand-100 font-medium text-brand-800"
                    : "text-foreground/80 hover:bg-brand-50"
                }`}
              >
                <span aria-hidden>{cat.icon}</span>
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <form method="get" action={formAction} className="flex flex-col gap-4">
        {sort && <input type="hidden" name="saralash" value={sort} />}
        {query && <input type="hidden" name="q" value={query} />}
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Narx oralig&apos;i
          </h3>
          <div className="mt-3 flex items-center gap-2">
            <input
              type="number"
              name="min"
              min={0}
              placeholder="dan"
              defaultValue={minPrice ?? ""}
              className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm outline-none focus:border-brand-500"
            />
            <span className="text-muted">—</span>
            <input
              type="number"
              name="max"
              min={0}
              placeholder="gacha"
              defaultValue={maxPrice ?? ""}
              className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm outline-none focus:border-brand-500"
            />
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-foreground">
          <input
            type="checkbox"
            name="chegirma"
            value="true"
            defaultChecked={discountOnly}
            className="h-4 w-4 rounded border-border text-brand-600 focus:ring-brand-500"
          />
          Faqat chegirmadagilar
        </label>

        <button
          type="submit"
          className="rounded-full bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
        >
          Filtrlash
        </button>
      </form>
    </aside>
  );
}
