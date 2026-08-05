"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/types/product";

export default function PromoProductShowcase({
  products,
}: {
  products: Product[];
}) {
  const [active, setActive] = useState(0);
  const items = products.slice(0, 6).filter((p) => p.imageUrl);

  useEffect(() => {
    if (items.length < 2) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % items.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [items.length]);

  if (items.length === 0) return null;

  return (
    <div className="absolute inset-0 z-0">
      {items.map((product, i) => (
        <div
          key={product.id}
          aria-hidden={i !== active}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${product.imageUrl})` }}
        />
      ))}
      <div className="absolute inset-0 bg-brand-900/85" />

      {items.length > 1 && (
        <div className="absolute bottom-4 right-4 flex gap-1.5 sm:bottom-6 sm:right-6">
          {items.map((product, i) => (
            <span
              key={product.id}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-4 bg-white" : "w-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
