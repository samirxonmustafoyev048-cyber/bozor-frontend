"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import type { Product } from "@/types/product";

export default function WishlistButton({ product }: { product: Product }) {
  const { isWishlisted, toggle } = useWishlist();
  const active = isWishlisted(product.id);

  return (
    <button
      type="button"
      aria-label={
        active
          ? `${product.name} sevimlilardan olib tashlash`
          : `${product.name} sevimlilarga qo'shish`
      }
      onClick={(e) => {
        e.preventDefault();
        toggle(product);
      }}
      className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow-sm hover:bg-white"
    >
      <Heart
        aria-hidden
        className={`h-3.5 w-3.5 ${active ? "fill-danger-500 text-danger-500" : "text-muted"}`}
      />
    </button>
  );
}
