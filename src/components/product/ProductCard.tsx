import Link from "next/link";
import { Star } from "lucide-react";
import type { Product } from "@/types/product";
import { discountPercent, formatSom } from "@/lib/format";
import ProductImage from "@/components/product/ProductImage";
import ProductQuantityStepper from "@/components/product/ProductQuantityStepper";
import WishlistButton from "@/components/product/WishlistButton";

export default function ProductCard({ product }: { product: Product }) {
  const hasDiscount = !!product.discountPrice;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-surface transition-shadow hover:shadow-md">
      {hasDiscount && (
        <span className="absolute left-2 top-2 z-10 rounded-full bg-danger-500 px-2 py-0.5 text-xs font-semibold text-white">
          -{discountPercent(product.price, product.discountPrice!)}%
        </span>
      )}
      <WishlistButton product={product} />

      <Link
        href={`/mahsulot/${product.slug}`}
        className="flex aspect-square items-center justify-center overflow-hidden bg-brand-50"
      >
        <ProductImage product={product} iconClassName="h-12 w-12 text-brand-500" />
      </Link>

      <div className="flex flex-1 flex-col gap-1 p-3">
        <Link
          href={`/mahsulot/${product.slug}`}
          className="line-clamp-2 text-sm font-medium text-foreground hover:text-brand-700"
        >
          {product.name}
        </Link>
        <span className="text-xs text-muted">{product.unit}</span>

        {product.rating && (
          <span className="flex items-center gap-1 text-xs text-muted">
            <Star aria-hidden className="h-3 w-3 fill-current text-accent-500" />
            {product.rating.toFixed(1)}
          </span>
        )}

        <div className="mt-auto flex flex-col gap-2 pt-2">
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

          <ProductQuantityStepper product={product} />
        </div>
      </div>
    </div>
  );
}
