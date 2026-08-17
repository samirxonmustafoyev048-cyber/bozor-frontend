"use client";

import { useCart } from "@/context/CartContext";
import { formatSom } from "@/lib/format";

/**
 * Running cart total beside the header's cart icon.
 *
 * The cart lives in localStorage, so the server render knows nothing about it —
 * showing a zero total until hydration keeps both renders identical.
 */
export default function CartSummary() {
  const { subtotal, isLoaded } = useCart();

  return (
    <span className="hidden text-sm font-bold text-foreground lg:block">
      {formatSom(isLoaded ? subtotal : 0)}
    </span>
  );
}
