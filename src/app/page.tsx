import HeroBanner from "@/components/home/HeroBanner";
import CategoryGrid from "@/components/home/CategoryGrid";
import ProductSection from "@/components/home/ProductSection";
import TrustBlock from "@/components/home/TrustBlock";
import { getCategories, getProducts, type ProductListResult } from "@/lib/api";
import type { Category } from "@/types/product";

export default async function Home() {
  let categories: Category[] = [];
  let discounted: ProductListResult = { items: [], total: 0, page: 1, pageSize: 0 };
  let popular: ProductListResult = { items: [], total: 0, page: 1, pageSize: 0 };
  let hasError = false;

  try {
    const revalidate = { revalidate: 60 };
    [categories, discounted, popular] = await Promise.all([
      getCategories(revalidate),
      getProducts({ discountOnly: true, sort: "popular", pageSize: 8 }, revalidate),
      getProducts({ sort: "popular", pageSize: 8 }, revalidate),
    ]);
  } catch {
    hasError = true;
  }

  if (hasError) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6">
        <h1 className="text-xl font-bold text-foreground">
          Backend serverga ulanib bo&apos;lmadi
        </h1>
        <p className="mt-2 text-muted">
          Iltimos, backend serverni ishga tushiring (
          <code>cd backend && npm run start:dev</code>) va sahifani
          yangilang.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-6 sm:px-6 sm:py-8">
      <HeroBanner />
      <CategoryGrid categories={categories} />
      <ProductSection
        title="Kunning aksiyasi"
        viewAllHref="/katalog?chegirma=true"
        products={discounted.items}
      />
      <ProductSection
        title="Ommabop mahsulotlar"
        viewAllHref="/katalog?saralash=popular"
        products={popular.items}
      />
      <TrustBlock />
    </div>
  );
}
