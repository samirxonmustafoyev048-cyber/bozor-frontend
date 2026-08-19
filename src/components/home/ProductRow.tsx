import Link from "next/link";
import { ChevronRight, type LucideIcon } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import type { Product } from "@/types/product";

/**
 * A titled band of products with a "see all" link — the shape the landing page
 * repeats for today's deals and the best sellers.
 *
 * Renders nothing when there are no products, so an empty catalogue leaves a
 * clean page instead of a heading over a gap.
 */
export default function ProductRow({
  title,
  icon: Icon,
  href,
  products,
  limit = 6,
}: {
  title: string;
  /** Optional mark beside the heading, e.g. a flame on the deals row. */
  icon?: LucideIcon;
  href: string;
  products: Product[];
  limit?: number;
}) {
  if (products.length === 0) return null;

  return (
    <section>
      <div className="flex items-end justify-between gap-3">
        <h2 className="flex items-center gap-2 text-xl font-bold text-foreground sm:text-2xl">
          {title}
          {Icon && <Icon aria-hidden className="h-5 w-5 text-danger-500" />}
        </h2>
        <Link
          href={href}
          className="flex shrink-0 items-center gap-0.5 text-sm font-medium text-muted hover:text-brand-700"
        >
          Barchasini ko&apos;rish
          <ChevronRight aria-hidden className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {products.slice(0, limit).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
