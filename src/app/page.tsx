import HeroBanner from "@/components/home/HeroBanner";
import FeatureStrip from "@/components/home/FeatureStrip";
import BannerRow from "@/components/home/BannerRow";
import CategoryPills from "@/components/home/CategoryPills";
import PromoGrid from "@/components/home/PromoGrid";
import ProductTabs from "@/components/home/ProductTabs";
import TrustBar from "@/components/home/TrustBar";
import {
  getBanners,
  getCategories,
  getProducts,
  type Banner,
  type ProductListResult,
} from "@/lib/api";
import type { Category } from "@/types/product";

export default async function Home() {
  let categories: Category[] = [];
  let discounted: ProductListResult = { items: [], total: 0, page: 1, pageSize: 0 };
  let popular: ProductListResult = { items: [], total: 0, page: 1, pageSize: 0 };
  let newest: ProductListResult = { items: [], total: 0, page: 1, pageSize: 0 };
  let banners: Banner[] = [];
  let hasError = false;

  try {
    const revalidate = { revalidate: 60 };
    [categories, discounted, popular, newest] = await Promise.all([
      getCategories(revalidate),
      getProducts({ discountOnly: true, sort: "popular", pageSize: 12 }, revalidate),
      getProducts({ sort: "popular", pageSize: 12 }, revalidate),
      getProducts({ sort: "new", pageSize: 12 }, revalidate),
    ]);
    // Banners are optional decoration — a failure here must not blank the page.
    banners = await getBanners({ revalidate: 60 }).catch(() => []);
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
      {/* The strip reads as the banner's base, so it sits tight against it
          rather than picking up the page's section spacing. */}
      <div className="flex flex-col gap-3">
        <HeroBanner />
        <FeatureStrip />
      </div>

      <BannerRow banners={banners} />

      <section>
        <h2 className="flex items-center gap-2 text-xl font-bold text-foreground sm:text-2xl">
          🍃 Mahsulotlar
        </h2>
        <p className="mt-1 text-sm text-muted">
          Sifatli mahsulotlar, qulay narxlar va tez yetkazib berish
        </p>
        <div className="mt-5">
          <CategoryPills categories={categories} />
        </div>
      </section>

      <PromoGrid discounted={discounted.items} />

      <ProductTabs
        discounted={discounted.items}
        popular={popular.items}
        newest={newest.items}
      />

      <TrustBar />
    </div>
  );
}
