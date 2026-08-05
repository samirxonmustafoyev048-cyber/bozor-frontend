"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/types/product";
import ProductCard from "@/components/product/ProductCard";

type TabKey = "barchasi" | "aksiya" | "yangi" | "tavsiya";

function dedupe(products: Product[]): Product[] {
  const seen = new Set<string>();
  return products.filter((p) => {
    if (seen.has(p.id)) return false;
    seen.add(p.id);
    return true;
  });
}

export default function ProductTabs({
  discounted,
  popular,
  newest,
}: {
  discounted: Product[];
  popular: Product[];
  newest: Product[];
}) {
  const [tab, setTab] = useState<TabKey>("barchasi");

  const tabs: { key: TabKey; label: string; products: Product[] }[] = [
    { key: "barchasi", label: "Barchasi", products: dedupe([...popular, ...discounted, ...newest]) },
    { key: "aksiya", label: "Aksiya", products: discounted },
    { key: "yangi", label: "Yangi", products: newest },
    { key: "tavsiya", label: "Tavsiya etilgan", products: popular },
  ];

  const active = tabs.find((t) => t.key === tab) ?? tabs[0];

  return (
    <section>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="flex items-center gap-2 text-lg font-bold text-foreground sm:text-xl">
          🔥 Mashhur mahsulotlar
        </h2>

        <div className="flex items-center gap-1 overflow-x-auto rounded-full bg-brand-50 p-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors sm:text-sm ${
                tab === t.key
                  ? "bg-brand-600 text-white"
                  : "text-brand-800 hover:bg-brand-100"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <Link
          href="/katalog"
          className="shrink-0 text-sm font-medium text-brand-700 hover:underline"
        >
          Barchasini ko&apos;rish →
        </Link>
      </div>

      {active.products.length === 0 ? (
        <p className="mt-8 text-center text-sm text-muted">
          Bu bo&apos;limda hozircha mahsulot yo&apos;q.
        </p>
      ) : (
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {active.products.slice(0, 12).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
