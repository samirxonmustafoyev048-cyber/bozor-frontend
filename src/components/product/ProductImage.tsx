import { createElement } from "react";
import { getCategoryIcon } from "@/lib/category-icons";
import type { Product } from "@/types/product";

export default function ProductImage({
  product,
  className,
  iconClassName,
}: {
  product: Pick<Product, "imageUrl" | "name" | "category">;
  className?: string;
  iconClassName?: string;
}) {
  if (product.imageUrl) {
    return (
      <img
        src={product.imageUrl}
        alt={product.name}
        className={className ?? "h-full w-full object-cover"}
      />
    );
  }

  return createElement(getCategoryIcon(product.category.slug, product.category.name), {
    "aria-hidden": true,
    className: iconClassName ?? "h-12 w-12 text-brand-500",
  });
}
