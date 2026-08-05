"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductImage from "@/components/product/ProductImage";
import { formatSom } from "@/lib/format";
import type { Product } from "@/types/product";

export default function PromoProductShowcase({
  products,
}: {
  products: Product[];
}) {
  const [active, setActive] = useState(0);
  const items = products.slice(0, 6);

  useEffect(() => {
    if (items.length < 2) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % items.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [items.length]);

  if (items.length === 0) return null;

  return (
    <div className="pointer-events-none absolute bottom-0 right-0 h-40 w-40 sm:h-56 sm:w-56">
      {items.map((product, i) => (
        <div
          key={product.id}
          className={`absolute inset-0 flex flex-col items-center justify-end transition-opacity duration-700 ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        >
          <Link
            href={`/mahsulot/${product.slug}`}
            className="pointer-events-auto flex flex-col items-center gap-2"
          >
            <span className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-white shadow-xl sm:h-32 sm:w-32">
              <ProductImage
                product={product}
                iconClassName="h-12 w-12 text-brand-500 sm:h-16 sm:w-16"
              />
            </span>
            <span className="rounded-full bg-white/95 px-3 py-1 text-center text-xs font-semibold text-brand-900 shadow">
              {product.name}
              {product.discountPrice && (
                <span className="ml-1.5 text-danger-600">
                  {formatSom(product.discountPrice)}
                </span>
              )}
            </span>
          </Link>
        </div>
      ))}

      {items.length > 1 && (
        <div className="pointer-events-none absolute -bottom-1 left-1/2 flex -translate-x-1/2 gap-1.5">
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
