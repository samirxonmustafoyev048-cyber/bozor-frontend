import type { MetadataRoute } from "next";
import { getCategories, getProducts } from "@/lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "daily", priority: 1 },
    { url: `${siteUrl}/katalog`, changeFrequency: "daily", priority: 0.9 },
  ];

  try {
    const [categories, { items: products }] = await Promise.all([
      getCategories(),
      getProducts({ pageSize: 500 }),
    ]);

    const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
      url: `${siteUrl}/katalog/${c.slug}`,
      changeFrequency: "daily",
      priority: 0.8,
    }));

    const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
      url: `${siteUrl}/mahsulot/${p.slug}`,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    return [...staticRoutes, ...categoryRoutes, ...productRoutes];
  } catch {
    return staticRoutes;
  }
}
