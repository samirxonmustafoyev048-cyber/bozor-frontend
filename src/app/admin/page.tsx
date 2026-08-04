"use client";

import { createElement, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { adminGetStats, type AdminStats } from "@/lib/api";
import { formatSom } from "@/lib/format";
import { getCategoryIcon } from "@/lib/category-icons";

const STATUS_LABELS: Record<string, string> = {
  QABUL_QILINDI: "Qabul qilindi",
  TAYYORLANMOQDA: "Tayyorlanmoqda",
  YOLDA: "Yo'lda",
  YETKAZILDI: "Yetkazildi",
  BEKOR_QILINDI: "Bekor qilindi",
};

export default function AdminDashboardPage() {
  const { auth } = useAuth();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!auth) return;
    adminGetStats(auth.accessToken)
      .then(setStats)
      .catch(() => setError(true));
  }, [auth]);

  if (error) {
    return (
      <p className="text-danger-600">
        Statistikani yuklab bo&apos;lmadi.
      </p>
    );
  }

  if (!stats) {
    return <p className="text-muted">Yuklanmoqda...</p>;
  }

  const cards = [
    { label: "Jami buyurtmalar", value: stats.totalOrders },
    { label: "Jami foydalanuvchilar", value: stats.totalUsers },
    { label: "Jami mahsulotlar", value: stats.totalProducts },
    { label: "Jami tushum (to'langan)", value: formatSom(stats.totalRevenue) },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-xl font-bold text-foreground sm:text-2xl">
          Statistika
        </h1>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {cards.map((c) => (
            <div
              key={c.label}
              className="rounded-lg border border-border bg-surface p-4"
            >
              <p className="text-xs text-muted">{c.label}</p>
              <p className="mt-1 text-lg font-bold text-foreground">
                {c.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-foreground">
          Buyurtmalar holati bo&apos;yicha
        </h2>
        <div className="mt-3 flex flex-wrap gap-3">
          {stats.ordersByStatus.map((s) => (
            <div
              key={s.status}
              className="rounded-lg border border-border bg-surface px-4 py-2 text-sm"
            >
              <span className="text-muted">
                {STATUS_LABELS[s.status] ?? s.status}:
              </span>{" "}
              <span className="font-semibold text-foreground">
                {s.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-foreground">
          Eng ko&apos;p sotilgan mahsulotlar
        </h2>
        <ul className="mt-3 flex flex-col gap-2">
          {stats.popularProducts.map((p) => (
            <li
              key={p.product.id}
              className="flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-2 text-sm"
            >
              <span className="flex items-center gap-2">
                {createElement(getCategoryIcon(p.product.category.slug), {
                  "aria-hidden": true,
                  className: "h-4 w-4 text-brand-600",
                })}
                {p.product.name}
              </span>
              <span className="font-semibold text-foreground">
                {p.totalSold} dona sotilgan
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
