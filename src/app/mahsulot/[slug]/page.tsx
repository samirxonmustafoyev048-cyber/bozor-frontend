import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Star } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import AddToCartControl from "@/components/product/AddToCartControl";
import ProductImage from "@/components/product/ProductImage";
import { ApiError, getProductBySlug, getRelatedProducts } from "@/lib/api";
import { discountPercent, formatSom } from "@/lib/format";

// The page reads the product fresh on every request, so no page-level window.

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const product = await getProductBySlug(slug);
    return {
      title: `${product.name}`,
      description: product.description,
      openGraph: {
        title: product.name,
        description: product.description,
      },
    };
  } catch {
    return { title: "Mahsulot" };
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: product.category.name,
    offers: {
      "@type": "Offer",
      price: product.discountPrice ?? product.price,
      priceCurrency: "UZS",
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
    ...(product.rating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            bestRating: 5,
          },
        }
      : {}),
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
        <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-brand-50">
          {hasDiscount && (
            <span className="absolute left-4 top-4 rounded-full bg-danger-500 px-3 py-1 text-sm font-semibold text-white">
              -{discountPercent(product.price, product.discountPrice!)}%
            </span>
          )}
          <ProductImage product={product} iconClassName="h-32 w-32 text-brand-500" />
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-foreground">
            {product.name}
          </h1>

          {product.rating && (
            <div className="flex items-center gap-1 text-sm text-muted">
              <Star aria-hidden className="h-4 w-4 fill-current text-accent-500" />
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
