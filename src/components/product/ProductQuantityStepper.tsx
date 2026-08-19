"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types/product";

export default function ProductQuantityStepper({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  function handleAdd() {
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      aria-label={`${product.name} savatga qo'shish`}
      className="flex w-full items-center justify-center gap-1.5 rounded-full border border-border bg-white py-2 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-brand-50 hover:text-brand-700"
    >
      {added && <Check aria-hidden className="h-4 w-4 text-brand-600" />}
      {added ? "Qo'shildi" : "Sotib olish"}
    </button>
  );
}
