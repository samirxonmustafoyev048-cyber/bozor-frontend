"use client";

import Link from "next/link";
import { ChevronRight, PieChart } from "lucide-react";
import { getCategoryIcon } from "@/lib/category-icons";
import { formatSom } from "@/lib/format";
import type { AdminStats } from "@/lib/api";

type CategorySales = AdminStats["salesByCategory"][number];

/**
 * Where the money comes from, by department.
 *
 * The neighbouring card ranks individual products; this rolls the same order
 * lines up to their categories, which is the view that answers "is the meat
 * counter carrying us, or the drinks fridge?".
 */
export default function CategorySalesCard({ data }: { data: CategorySales[] }) {
  const total = data.reduce((sum, c) => sum + c.revenue, 0);
  // Bars are scaled against the leader, not the total: with one dominant
  // category every other bar would otherwise be a sliver.
  const leader = data[0]?.revenue ?? 0;

  return (
    <div className="flex flex-col rounded-2xl border border-border bg-surface p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="flex items-center gap-2 font-bold text-foreground">
            <PieChart aria-hidden className="h-4 w-4 text-brand-600" />
            Kategoriyalar bo&apos;yicha savdo
          </h3>
          <p className="mt-0.5 text-xs text-muted">
            Jami{" "}
            <span className="font-semibold text-foreground">
              {formatSom(total)}
            </span>{" "}
            · barcha buyurtmalar bo&apos;yicha
          </p>
        </div>
        <Link
          href="/admin/kategoriyalar"
          className="flex shrink-0 items-center gap-1 text-sm font-medium text-brand-700 hover:underline"
        >
          Kategoriyalar
          <ChevronRight aria-hidden className="h-4 w-4" />
        </Link>
      </div>

      {data.length === 0 ? (
        <p className="mt-6 text-sm text-muted">
          Hali sotuv bo&apos;lmagani uchun ma&apos;lumot yo&apos;q.
        </p>
      ) : (
        <ul className="mt-4 flex flex-col gap-3">
          {data.map((category) => {
            const Icon = getCategoryIcon(category.slug, category.name, category.icon);
            const share = total > 0 ? (category.revenue / total) * 100 : 0;
            const width = leader > 0 ? (category.revenue / leader) * 100 : 0;

            return (
              <li key={category.id} className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50">
                  <Icon aria-hidden className="h-4 w-4 text-brand-600" />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="truncate text-sm font-medium text-foreground">
                      {category.name}
                    </span>
                    <span className="shrink-0 text-sm font-semibold text-foreground">
                      {formatSom(category.revenue)}
                    </span>
                  </span>

                  <span className="mt-1 flex items-center gap-2">
                    <span
                      aria-hidden
                      className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-brand-50"
                    >
                      <span
                        className="block h-full rounded-full bg-brand-500"
                        style={{ width: `${width}%` }}
                      />
                    </span>
                    <span className="shrink-0 text-xs tabular-nums text-muted">
                      {share.toFixed(1)}% · {category.quantity} dona
                    </span>
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
