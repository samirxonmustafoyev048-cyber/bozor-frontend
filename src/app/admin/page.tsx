"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ClipboardList,
  Wallet2,
  Users,
  Boxes,
  CalendarDays,
  MoreVertical,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { adminGetStats, type AdminStats } from "@/lib/api";
import { formatSom, formatDate, formatDateTime } from "@/lib/format";
import { STATUS_COLORS, STATUS_LABELS } from "@/lib/order-status";
import ProductImage from "@/components/product/ProductImage";
import StatCard from "@/components/admin/StatCard";
import SalesChart from "@/components/admin/SalesChart";
import OrdersDonutChart from "@/components/admin/OrdersDonutChart";
import CategorySalesCard from "@/components/admin/CategorySalesCard";

const MONTHS = [
  "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
  "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr",
];

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
    return <p className="text-danger-600">Statistikani yuklab bo&apos;lmadi.</p>;
  }

  if (!stats) {
    return <p className="text-muted">Yuklanmoqda...</p>;
  }

  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const monthLabel = MONTHS[now.getMonth()];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-foreground sm:text-2xl">
            Xush kelibsiz, {auth?.user.name.split(" ")[0]}!
          </h1>
          <p className="mt-0.5 text-sm text-muted">
            Bugungi savdo va statistik ma&apos;lumotlar
          </p>
        </div>
        <span className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground/80">
          <CalendarDays aria-hidden className="h-4 w-4 text-muted" />
          {formatDate(monthStart)} - {formatDate(monthEnd)}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard
          icon={ClipboardList}
          iconBg="bg-brand-100"
          iconColor="text-brand-600"
          label="Jami buyurtmalar"
          value={String(stats.totalOrders)}
          trend={stats.trends.orders}
          sparkline={stats.sparklines.orders}
          sparklineColor="#16a34a"
        />
        <StatCard
          icon={Wallet2}
          iconBg="bg-sky-100"
          iconColor="text-sky-600"
          label="Jami savdo"
          value={formatSom(stats.totalRevenue)}
          trend={stats.trends.revenue}
          sparkline={stats.sparklines.revenue}
          sparklineColor="#2a78d6"
        />
        <StatCard
          icon={Users}
          iconBg="bg-violet-100"
          iconColor="text-violet-600"
          label="Jami mijozlar"
          value={String(stats.totalUsers)}
          trend={stats.trends.users}
          sparkline={stats.sparklines.users}
          sparklineColor="#4a3aa7"
        />
        <StatCard
          icon={Boxes}
          iconBg="bg-amber-100"
          iconColor="text-amber-600"
          label="Jami mahsulotlar"
          value={String(stats.totalProducts)}
          trend={stats.trends.products}
          sparkline={stats.sparklines.products}
          sparklineColor="#eb6834"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SalesChart data={stats.dailySales} monthLabel={monthLabel} />
        </div>
        <OrdersDonutChart data={stats.ordersByStatus} />

        <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6 lg:col-span-1">
          <h3 className="font-bold text-foreground">
            Eng ko&apos;p sotilgan mahsulotlar
          </h3>
          <ol className="mt-3 flex flex-col gap-3">
            {stats.popularProducts.map((p, i) => (
              <li key={p.product.id} className="flex items-center gap-3">
                <span className="w-4 shrink-0 text-sm font-semibold text-muted">
                  {i + 1}
                </span>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-brand-50">
                  <ProductImage product={p.product} iconClassName="h-4 w-4 text-brand-600" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-foreground">
                    {p.product.name}
                  </span>
                  <span className="block text-xs text-muted">
                    {p.totalSold} dona
                  </span>
                </span>
                <span className="shrink-0 text-sm font-semibold text-foreground">
                  {formatSom((p.product.discountPrice ?? p.product.price) * p.totalSold)}
                </span>
              </li>
            ))}
            {stats.popularProducts.length === 0 && (
              <p className="text-sm text-muted">Ma&apos;lumot yo&apos;q.</p>
            )}
          </ol>
        </div>

        <div className="lg:col-span-2">
          <CategorySalesCard data={stats.salesByCategory} />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-foreground">So&apos;nggi buyurtmalar</h3>
            <Link
              href="/admin/buyurtmalar"
              className="flex items-center gap-1 text-sm font-medium text-brand-700 hover:underline"
            >
              Barchasini ko&apos;rish
              <ChevronRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[520px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted">
                  <th className="pb-2 font-medium">ID</th>
                  <th className="pb-2 font-medium">Mijoz</th>
                  <th className="pb-2 font-medium">Mahsulotlar soni</th>
                  <th className="pb-2 font-medium">Jami summa</th>
                  <th className="pb-2 font-medium">Holat</th>
                  <th className="pb-2 font-medium">Sana</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {stats.recentOrders.map((o) => (
                  <tr key={o.id}>
                    <td className="py-2.5 font-medium text-foreground">
                      #{o.orderNumber}
                    </td>
                    <td className="py-2.5 text-foreground/80">{o.customerName}</td>
                    <td className="py-2.5 text-foreground/80">{o.itemCount} ta</td>
                    <td className="py-2.5 font-medium text-foreground">
                      {formatSom(o.totalPrice)}
                    </td>
                    <td className="py-2.5">
                      <span
                        className="rounded-full px-2 py-1 text-xs font-medium"
                        style={{
                          backgroundColor: `${STATUS_COLORS[o.status]}1a`,
                          color: STATUS_COLORS[o.status],
                        }}
                      >
                        {STATUS_LABELS[o.status]}
                      </span>
                    </td>
                    <td className="py-2.5 whitespace-nowrap text-foreground/80">
                      {formatDateTime(o.createdAt)}
                    </td>
                    <td className="py-2.5 text-right">
                      <MoreVertical aria-hidden className="ml-auto h-4 w-4 text-muted" />
                    </td>
                  </tr>
                ))}
                {stats.recentOrders.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-4 text-center text-muted">
                      Hali buyurtmalar yo&apos;q.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-foreground">Past stok mahsulotlar</h3>
            <Link
              href="/admin/mahsulotlar"
              className="flex items-center gap-1 text-sm font-medium text-brand-700 hover:underline"
            >
              Barchasini ko&apos;rish
              <ChevronRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>
          <ul className="mt-3 flex flex-col gap-3">
            {stats.lowStockProducts.map((p) => (
              <li key={p.id} className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-brand-50">
                  <ProductImage product={p} iconClassName="h-4 w-4 text-brand-600" />
                </span>
                <span className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">
                  {p.name}
                </span>
                <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-danger-600">
                  <AlertTriangle aria-hidden className="h-3.5 w-3.5" />
                  Qoldiq: {p.stock} dona
                </span>
              </li>
            ))}
            {stats.lowStockProducts.length === 0 && (
              <p className="text-sm text-muted">
                Qoldig&apos;i kam mahsulotlar yo&apos;q.
              </p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
