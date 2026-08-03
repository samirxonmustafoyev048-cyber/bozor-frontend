import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FilterSidebar from "@/components/catalog/FilterSidebar";
import SortDropdown from "@/components/catalog/SortDropdown";
import ProductCard from "@/components/product/ProductCard";
import { categories } from "@/lib/mock/categories";
import { filterProducts } from "@/lib/mock/products";
import { parseCatalogFilters, type CatalogSearchParams } from "@/lib/catalog-params";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const found = categories.find((c) => c.slug === category);
  return { title: found ? `${found.name} — Bozor` : "Katalog — Bozor" };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<CatalogSearchParams>;
}) {
  const { category } = await params;
  const activeCategory = categories.find((c) => c.slug === category);
  if (!activeCategory) {
    notFound();
  }

  const resolvedSearchParams = await searchParams;
  const filters = parseCatalogFilters(resolvedSearchParams, category);
  const result = filterProducts(filters);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:flex-row sm:px-6 sm:py-8">
      <FilterSidebar
        formAction={`/katalog/${category}`}
        activeCategory={category}
        minPrice={filters.minPrice}
        maxPrice={filters.maxPrice}
        discountOnly={filters.discountOnly}
        sort={filters.sort}
        query={filters.query}
      />

      <section className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-foreground sm:text-xl">
              {activeCategory.icon} {activeCategory.name}
            </h1>
            <p className="text-sm text-muted">{result.length} ta mahsulot</p>
          </div>
          <SortDropdown current={filters.sort ?? "popular"} />
        </div>

        {result.length === 0 ? (
          <p className="mt-10 text-center text-muted">
            Ushbu kategoriyada hozircha mahsulot yo&apos;q.
          </p>
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {result.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
