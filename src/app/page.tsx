import HeroBanner from "@/components/home/HeroBanner";
import CategoryGrid from "@/components/home/CategoryGrid";
import ProductSection from "@/components/home/ProductSection";
import TrustBlock from "@/components/home/TrustBlock";
import { getDiscountedProducts, getPopularProducts } from "@/lib/mock/products";

export default function Home() {
  const discounted = getDiscountedProducts();
  const popular = getPopularProducts();

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-6 sm:px-6 sm:py-8">
      <HeroBanner />
      <CategoryGrid />
      <ProductSection
        title="Kunning aksiyasi"
        viewAllHref="/katalog?chegirma=true"
        products={discounted}
      />
      <ProductSection
        title="Ommabop mahsulotlar"
        viewAllHref="/katalog?saralash=ommabop"
        products={popular}
      />
      <TrustBlock />
    </div>
  );
}
