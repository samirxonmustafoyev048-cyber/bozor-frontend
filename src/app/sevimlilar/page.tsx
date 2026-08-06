"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import ProductCard from "@/components/product/ProductCard";

export default function WishlistPage() {
  const { products, isLoaded, clear } = useWishlist();

  if (!isLoaded) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center text-muted sm:px-6">
        Yuklanmoqda...
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 py-20 text-center sm:px-6">
        <Heart aria-hidden className="h-16 w-16 text-brand-500" />
        <h1 className="text-xl font-bold text-foreground">
          Sevimlilar ro&apos;yxati bo&apos;sh
        </h1>
        <p className="text-muted">
          Yoqtirgan mahsulotlaringizni yurak belgisi orqali shu yerga
          qo&apos;shing.
        </p>
        <Link
          href="/katalog"
          className="rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Katalogga o&apos;tish
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground sm:text-2xl">
          Sevimlilar
        </h1>
        <button
          type="button"
          onClick={clear}
          className="text-sm text-muted hover:text-danger-600"
        >
          Hammasini tozalash
        </button>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
