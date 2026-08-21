import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import StatsBar from "@/components/about/StatsBar";
import FeatureGrid from "@/components/about/FeatureGrid";
import { getStoreName } from "@/lib/store-name";

export async function generateMetadata(): Promise<Metadata> {
  const storeName = await getStoreName();
  return {
    title: "Biz haqimizda",
    description:
      `${storeName} — sifatli mahsulotlar, qulay narxlar va ishonchli yetkazib berish xizmati.`,
  };
}

export default async function AboutPage() {
  const storeName = await getStoreName();

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-10 sm:px-6 sm:py-14">
      <AboutHero />
      <StatsBar />
      <FeatureGrid />

      <blockquote className="mx-auto max-w-2xl text-center text-base font-medium italic text-muted sm:text-lg">
        <span aria-hidden className="text-2xl text-brand-300">
          &ldquo;
        </span>
        {storeName} – Sifatli mahsulot, qulay narx va ishonchli xizmat bir
        joyda!
        <span aria-hidden className="text-2xl text-brand-300">
          &rdquo;
        </span>
      </blockquote>
    </div>
  );
}
