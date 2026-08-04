import { createElement } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FilterSidebar from "@/components/catalog/FilterSidebar";
import SortDropdown from "@/components/catalog/SortDropdown";
import ProductCard from "@/components/product/ProductCard";
import { ApiError, getCategories, getCategoryBySlug, getProducts } from "@/lib/api";
import { parseCatalogFilters, type CatalogSearchParams } from "@/lib/catalog-params";
import { getCategoryIcon } from "@/lib/category-icons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  try {
    const found = await getCategoryBySlug(category, { revalidate: 300 });
    return { title: `${found.name} — Olma Market` };
  } catch {
    return { title: "Katalog — Olma Market" };
  }
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<CatalogSearchParams>;
}) {
  const { category } = await params;

  let activeCategory;
  try {
    activeCategory = await getCategoryBySlug(category, { revalidate: 300 });
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) {
      notFound();
    }
    throw err;
  }

  const resolvedSearchParams = await searchParams;
  const filters = parseCatalogFilters(resolvedSearchParams, category);

  const [categories, result] = await Promise.all([
    getCategories({ revalidate: 300 }),
    getProducts(
      {
        category,
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
            <h1 className="flex items-center gap-2 text-lg font-bold text-foreground sm:text-xl">
              {createElement(getCategoryIcon(activeCategory.slug), {
                "aria-hidden": true,
                className: "h-5 w-5 text-brand-600",
              })}
              {activeCategory.name}
            </h1>
            <p className="text-sm text-muted">{result.total} ta mahsulot</p>
          </div>
          <SortDropdown current={filters.sort ?? "popular"} />
        </div>

        {result.items.length === 0 ? (
          <p className="mt-10 text-center text-muted">
            Ushbu kategoriyada hozircha mahsulot yo&apos;q.
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
