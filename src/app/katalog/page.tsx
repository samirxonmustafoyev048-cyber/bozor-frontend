import type { Metadata } from "next";
import FilterSidebar from "@/components/catalog/FilterSidebar";
import SortDropdown from "@/components/catalog/SortDropdown";
import ProductCard from "@/components/product/ProductCard";
import { getCategories, getProducts } from "@/lib/api";
import { parseCatalogFilters, type CatalogSearchParams } from "@/lib/catalog-params";

export const metadata: Metadata = {
  title: "Katalog — Olma Market",
};

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<CatalogSearchParams>;
}) {
  const resolvedSearchParams = await searchParams;
  const filters = parseCatalogFilters(resolvedSearchParams);

  const [categories, result] = await Promise.all([
    getCategories({ revalidate: 300 }),
    getProducts(
      {
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        discountOnly: filters.discountOnly,
        q: filters.query,
        sort: filters.sort,
        pageSize: 100,
      },
      { revalidate: 60 }
    ),
  ]);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:flex-row sm:px-6 sm:py-8">
      <FilterSidebar
        categories={categories}
        formAction="/katalog"
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
              Barcha mahsulotlar
            </h1>
            <p className="text-sm text-muted">{result.total} ta mahsulot</p>
          </div>
          <SortDropdown current={filters.sort ?? "popular"} />
        </div>

        {result.items.length === 0 ? (
          <p className="mt-10 text-center text-muted">
            Ushbu filtrlar bo&apos;yicha mahsulot topilmadi.
          </p>
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {result.items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
