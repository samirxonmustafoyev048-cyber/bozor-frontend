import { Flame } from "lucide-react";
import HeroBanner from "@/components/home/HeroBanner";
import ProductRow from "@/components/home/ProductRow";
import CategoryTiles from "@/components/home/CategoryTiles";
import FeatureStrip from "@/components/home/FeatureStrip";
import WhyUs from "@/components/home/WhyUs";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import SignupCta from "@/components/home/SignupCta";
import BannerRow from "@/components/home/BannerRow";
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
  let banners: Banner[] = [];
  let hasError = false;

  try {
    const revalidate = { revalidate: 60 };
    [categories, discounted, popular] = await Promise.all([
      getCategories(revalidate),
      getProducts({ discountOnly: true, sort: "popular", pageSize: 12 }, revalidate),
      getProducts({ sort: "popular", pageSize: 12 }, revalidate),
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

      <ProductRow
        title="Bugungi aksiyalar"
        icon={Flame}
        href="/katalog?chegirma=true"
        products={discounted.items}
      />

      <CategoryTiles categories={categories} />

      <ProductRow
        title="Eng ko'p sotilganlar"
        href="/katalog"
        products={popular.items}
      />

      <BannerRow banners={banners} />

      <WhyUs />
      <HowItWorks />
      <Testimonials />
      <SignupCta />
    </div>
  );
}
