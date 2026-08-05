"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types/product";

export default function ProductQuantityStepper({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  function handleAdd() {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <div className="flex items-center overflow-hidden rounded-full border border-border">
      <button
        type="button"
        aria-label="Miqdorni kamaytirish"
        onClick={() => setQty((q) => Math.max(1, q - 1))}
        className="flex h-8 w-7 items-center justify-center text-foreground hover:text-brand-700"
      >
        <Minus aria-hidden className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        onClick={handleAdd}
        aria-label={`${product.name} savatga qo'shish`}
        className="flex h-8 flex-1 items-center justify-center gap-1 bg-brand-600 px-2 text-white hover:bg-brand-700"
      >
        {added ? (
          <Check aria-hidden className="h-3.5 w-3.5" />
        ) : (
          <ShoppingCart aria-hidden className="h-3.5 w-3.5" />
        )}
        <span className="text-xs font-semibold tabular-nums">{qty}</span>
      </button>
      <button
        type="button"
        aria-label="Miqdorni oshirish"
        onClick={() => setQty((q) => q + 1)}
        className="flex h-8 w-7 items-center justify-center text-foreground hover:text-brand-700"
      >
        <Plus aria-hidden className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
