"use client";

import { useWishlist } from "@/context/WishlistContext";

export default function WishlistIndicator() {
  const { products, isLoaded } = useWishlist();

  if (!isLoaded || products.length === 0) return null;

  return (
    <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger-500 px-1 text-[10px] font-semibold text-white">
      {products.length > 99 ? "99+" : products.length}
    </span>
  );
}
