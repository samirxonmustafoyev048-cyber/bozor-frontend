"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types/product";

export default function AddToCartControl({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  function handleAdd() {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-4">
        <div className="flex items-center rounded-full border border-border">
          <button
            type="button"
            aria-label="Miqdorni kamaytirish"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="flex h-10 w-10 items-center justify-center text-lg text-foreground hover:text-brand-700"
          >
            −
          </button>
          <span className="w-10 text-center text-sm font-medium">{qty}</span>
          <button
            type="button"
            aria-label="Miqdorni oshirish"
            onClick={() => setQty((q) => q + 1)}
            className="flex h-10 w-10 items-center justify-center text-lg text-foreground hover:text-brand-700"
          >
            +
          </button>
        </div>
        <span className="text-sm text-muted">
          {qty} × {product.unit}
        </span>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        className="w-full rounded-full bg-brand-600 py-3 text-sm font-semibold text-white hover:bg-brand-700 sm:w-auto sm:px-8"
      >
        {added ? "Savatga qo'shildi ✓" : "Savatga qo'shish"}
      </button>
    </div>
  );
}
