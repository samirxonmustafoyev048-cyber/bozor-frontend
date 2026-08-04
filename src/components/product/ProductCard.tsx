import { createElement } from "react";
import Link from "next/link";
import type { Product } from "@/types/product";
import { discountPercent, formatSom } from "@/lib/format";
import { getCategoryIcon } from "@/lib/category-icons";
import AddToCartButton from "@/components/cart/AddToCartButton";

export default function ProductCard({ product }: { product: Product }) {
  const hasDiscount = !!product.discountPrice;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-surface transition-shadow hover:shadow-md">
      {hasDiscount && (
        <span className="absolute left-2 top-2 z-10 rounded-full bg-danger-500 px-2 py-0.5 text-xs font-semibold text-white">
          -{discountPercent(product.price, product.discountPrice!)}%
        </span>
      )}

      <Link
        href={`/mahsulot/${product.slug}`}
        className="flex aspect-square items-center justify-center bg-brand-50"
      >
        {createElement(getCategoryIcon(product.category.slug), {
          "aria-hidden": true,
          className: "h-12 w-12 text-brand-500",
        })}
      </Link>

      <div className="flex flex-1 flex-col gap-1 p-3">
        <Link
          href={`/mahsulot/${product.slug}`}
          className="line-clamp-2 text-sm font-medium text-foreground hover:text-brand-700"
        >
          {product.name}
        </Link>
        <span className="text-xs text-muted">{product.unit}</span>

        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <div className="flex flex-col">
            {hasDiscount ? (
              <>
                <span className="text-xs text-muted line-through">
                  {formatSom(product.price)}
                </span>
                <span className="text-sm font-semibold text-danger-600">
                  {formatSom(product.discountPrice!)}
                </span>
              </>
            ) : (
              <span className="text-sm font-semibold text-foreground">
                {formatSom(product.price)}
              </span>
            )}
          </div>

          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
