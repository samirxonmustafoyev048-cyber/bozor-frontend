import type { Metadata } from "next";
import FeaturedNewsCarousel from "@/components/news/FeaturedNewsCarousel";
import NewsGrid from "@/components/news/NewsGrid";
import NewsSidebar from "@/components/news/NewsSidebar";
import NewsletterBar from "@/components/news/NewsletterBar";

export const metadata: Metadata = {
  title: "Yangiliklar — Olma Market",
  description: "Olma Marketdagi barcha yangiliklar va e'lonlar",
};

export default function NewsPage() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 sm:py-8">
      <div>
        <h1 className="text-xl font-bold text-foreground sm:text-2xl">
          Yangiliklar
        </h1>
        <p className="mt-1 text-sm text-muted">
          Olma Marketdagi barcha yangiliklar va e&apos;lonlar
        </p>
      </div>

      <FeaturedNewsCarousel />

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <NewsGrid />
        <NewsSidebar />
      </div>

      <NewsletterBar />
    </div>
  );
}
