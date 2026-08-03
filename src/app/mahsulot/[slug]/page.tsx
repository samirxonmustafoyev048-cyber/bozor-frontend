import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import AddToCartControl from "@/components/product/AddToCartControl";
import { ApiError, getProductBySlug, getRelatedProducts } from "@/lib/api";
import { discountPercent, formatSom } from "@/lib/format";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const product = await getProductBySlug(slug);
    return { title: `${product.name} — Bozor` };
  } catch {
    return { title: "Mahsulot — Bozor" };
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let product;
  try {
    product = await getProductBySlug(slug);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) {
      notFound();
    }
    throw err;
  }

  const related = await getRelatedProducts(slug);
  const hasDiscount = !!product.discountPrice;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      <nav className="text-sm text-muted">
        <Link href="/" className="hover:text-brand-700">
          Bosh sahifa
        </Link>{" "}
        /{" "}
        <Link
          href={`/katalog/${product.category.slug}`}
          className="hover:text-brand-700"
        >
          Katalog
        </Link>{" "}
        / <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="mt-4 grid gap-8 md:grid-cols-2">
        <div className="relative flex aspect-square items-center justify-center rounded-2xl bg-brand-50 text-9xl">
          {hasDiscount && (
            <span className="absolute left-4 top-4 rounded-full bg-danger-500 px-3 py-1 text-sm font-semibold text-white">
              -{discountPercent(product.price, product.discountPrice!)}%
            </span>
          )}
          <span aria-hidden>{product.emoji}</span>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-foreground">
            {product.name}
          </h1>

          {product.rating && (
            <div className="flex items-center gap-1 text-sm text-muted">
              <span aria-hidden className="text-accent-500">
                ★
              </span>
              {product.rating.toFixed(1)}
            </div>
          )}

          <div className="flex items-end gap-3">
            {hasDiscount ? (
              <>
                <span className="text-2xl font-bold text-danger-600">
                  {formatSom(product.discountPrice!)}
                </span>
                <span className="text-lg text-muted line-through">
                  {formatSom(product.price)}
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold text-foreground">
                {formatSom(product.price)}
              </span>
            )}
            <span className="text-sm text-muted">/ {product.unit}</span>
          </div>

          <AddToCartControl product={product} />

          <div className="mt-2 border-t border-border pt-4">
            <h2 className="text-sm font-semibold text-foreground">Tavsif</h2>
            <p className="mt-2 text-sm text-muted">{product.description}</p>
          </div>

          {product.composition && (
            <div>
              <h2 className="text-sm font-semibold text-foreground">
                Tarkibi
              </h2>
              <p className="mt-2 text-sm text-muted">{product.composition}</p>
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-bold text-foreground sm:text-xl">
            O&apos;xshash mahsulotlar
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
