"use client";

import { useCart } from "@/context/CartContext";

export default function CartIndicator() {
  const { totalCount, isLoaded } = useCart();

  if (!isLoaded || totalCount === 0) return null;

  return (
    <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-600 px-1 text-[10px] font-semibold text-white">
      {totalCount > 99 ? "99+" : totalCount}
    </span>
  );
}
