"use client";

import Link from "next/link";
import { ShoppingCart, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatSom } from "@/lib/format";
import ProductImage from "@/components/product/ProductImage";

export default function CartPage() {
  const { lines, subtotal, isLoaded, setQuantity, removeItem } = useCart();

  if (!isLoaded) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center text-muted sm:px-6">
        Yuklanmoqda...
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 py-20 text-center sm:px-6">
        <ShoppingCart aria-hidden className="h-16 w-16 text-brand-500" />
        <h1 className="text-xl font-bold text-foreground">
          Savatingiz bo&apos;sh
        </h1>
        <p className="text-muted">
          Xarid qilishni boshlash uchun katalogga o&apos;ting.
        </p>
        <Link
          href="/katalog"
          className="rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Katalogga o&apos;tish
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
      <h1 className="text-xl font-bold text-foreground sm:text-2xl">Savat</h1>

      <div className="mt-6 flex flex-col gap-3">
        {lines.map(({ product, quantity, lineTotal }) => (
          <div
            key={product.id}
            className="flex items-center gap-3 rounded-lg border border-border bg-surface p-3"
          >
            <Link
              href={`/mahsulot/${product.slug}`}
              className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-brand-50"
            >
              <ProductImage product={product} iconClassName="h-8 w-8 text-brand-500" />
            </Link>

            <div className="min-w-0 flex-1">
              <Link
                href={`/mahsulot/${product.slug}`}
                className="line-clamp-1 text-sm font-medium text-foreground hover:text-brand-700"
              >
                {product.name}
              </Link>
              <p className="text-xs text-muted">{product.unit}</p>
            </div>

            <div className="flex items-center rounded-full border border-border">
              <button
                type="button"
                aria-label="Miqdorni kamaytirish"
                onClick={() => setQuantity(product.id, quantity - 1)}
                className="flex h-8 w-8 items-center justify-center text-foreground hover:text-brand-700"
              >
                −
              </button>
              <span className="w-8 text-center text-sm font-medium">
                {quantity}
              </span>
              <button
                type="button"
                aria-label="Miqdorni oshirish"
                onClick={() => setQuantity(product.id, quantity + 1)}
                className="flex h-8 w-8 items-center justify-center text-foreground hover:text-brand-700"
              >
                +
              </button>
            </div>

            <span className="w-24 shrink-0 text-right text-sm font-semibold text-foreground">
              {formatSom(lineTotal)}
            </span>

            <button
              type="button"
              aria-label={`${product.name} savatdan o'chirish`}
              onClick={() => removeItem(product.id)}
              className="shrink-0 text-muted hover:text-danger-600"
            >
              <X aria-hidden className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col items-end gap-3 border-t border-border pt-6">
        <div className="flex items-center gap-3 text-lg">
          <span className="text-muted">Jami:</span>
          <span className="font-bold text-foreground">
            {formatSom(subtotal)}
          </span>
        </div>
        <Link
          href="/buyurtma"
          className="rounded-full bg-brand-600 px-8 py-3 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Buyurtma berish
        </Link>
      </div>
    </div>
  );
}
