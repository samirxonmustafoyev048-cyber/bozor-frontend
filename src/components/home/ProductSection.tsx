import Link from "next/link";
import type { Product } from "@/types/product";
import ProductCard from "@/components/product/ProductCard";

export default function ProductSection({
  title,
  viewAllHref,
  products,
}: {
  title: string;
  viewAllHref: string;
  products: Product[];
}) {
  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground sm:text-xl">
          {title}
        </h2>
        <Link
          href={viewAllHref}
          className="text-sm font-medium text-brand-700 hover:underline"
        >
          Barchasini ko&apos;rish →
        </Link>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
