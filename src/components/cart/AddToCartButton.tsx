"use client";

import { useCart } from "@/context/CartContext";
import type { Product } from "@/types/product";

export default function AddToCartButton({
  product,
  quantity = 1,
  className,
  children,
}: {
  product: Product;
  quantity?: number;
  className?: string;
  children?: React.ReactNode;
}) {
  const { addItem } = useCart();

  return (
    <button
      type="button"
      aria-label={`${product.name} savatga qo'shish`}
      onClick={(e) => {
        e.preventDefault();
        addItem(product, quantity);
      }}
      className={
        className ??
        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white hover:bg-brand-700"
      }
    >
      {children ?? "+"}
    </button>
  );
}
