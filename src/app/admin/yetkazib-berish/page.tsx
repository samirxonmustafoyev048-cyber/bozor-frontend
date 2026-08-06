"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  ClipboardList,
  Navigation,
  CheckCircle2,
  XCircle,
  Wallet2,
  MoreVertical,
  Maximize,
  Users,
  Clock,
  Gauge,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { adminGetDeliveryStats, type DeliveryStats } from "@/lib/api";
import { formatSom } from "@/lib/format";
import { STATUS_COLORS, STATUS_LABELS } from "@/lib/order-status";
import StatCard from "@/components/admin/StatCard";
import Donut from "@/components/admin/Donut";
import CourierList from "@/components/admin/CourierList";
import DeliveryTrendChart from "@/components/admin/DeliveryTrendChart";

const DeliveryMap = dynamic(() => import("@/components/admin/DeliveryMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center text-sm text-muted">
      Xarita yuklanmoqda...
    </div>
  ),
});

type FilterTab = "barchasi" | "TAYYORLANMOQDA" | "YOLDA" | "YETKAZILDI" | "BEKOR_QILINDI";

export default function DeliveryDashboardPage() {
  const { auth } = useAuth();
  const [stats, setStats] = useState<DeliveryStats | null>(null);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState<FilterTab>("barchasi");
  const mapCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!auth) return;
    adminGetDeliveryStats(auth.accessToken)
      .then(setStats)
      .catch(() => setError(true));
  }, [auth]);

  if (error) {
    return <p className="text-danger-600">Ma&apos;lumotlarni yuklab bo&apos;lmadi.</p>;
  }

  if (!stats) {
    return <p className="text-muted">Yuklanmoqda...</p>;
  }

  const { statusCounts } = stats;

  const donutSegments = [
    { key: "yetkazildi", label: "Yetkazib berildi", count: statusCounts.yetkazildi, color: STATUS_COLORS.YETKAZILDI },
    { key: "yetkazilmoqda", label: "Yetkazib berilmoqda", count: statusCounts.yetkazilmoqda, color: STATUS_COLORS.YOLDA },
    { key: "kuryerda", label: "Kuryerda", count: statusCounts.kuryerda, color: STATUS_COLORS.TAYYORLANMOQDA },
    { key: "bekorQilingan", label: "Bekor qilingan", count: statusCounts.bekorQilingan, color: STATUS_COLORS.BEKOR_QILINDI },
  ];

  const tabs: { key: FilterTab; label: string }[] = [
    { key: "barchasi", label: "Barchasi" },
    { key: "TAYYORLANMOQDA", label: "Kuryerda" },
    { key: "YOLDA", label: "Yetkazib berilmoqda" },
    { key: "YETKAZILDI", label: "Yetkazib berildi" },
    { key: "BEKOR_QILINDI", label: "Bekor qilingan" },
  ];

  const filteredOrders =
    activeTab === "barchasi"
      ? stats.recentOrders
      : stats.recentOrders.filter((o) => o.status === activeTab);

  function toggleMapFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      mapCardRef.current?.requestFullscreen().catch(() => {});
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold text-foreground sm:text-2xl">
          Yetkazib berish
        </h1>
        <p className="mt-0.5 text-sm text-muted">
          Barcha buyurtmalar va yetkazib berish jarayonlarini boshqaring
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
        <StatCard
          icon={ClipboardList}
          iconBg="bg-brand-100"
          iconColor="text-brand-600"
          label="Jami buyurtmalar"
          value={String(stats.totalOrders)}
          trend={stats.trends.totalOrders}
        />
        <StatCard
          icon={Navigation}
          iconBg="bg-sky-100"
          iconColor="text-sky-600"
          label="Yetkazib berilmoqda"
          value={String(statusCounts.yetkazilmoqda)}
          trend={stats.trends.delivering}
        />
        <StatCard
          icon={CheckCircle2}
          iconBg="bg-amber-100"
          iconColor="text-amber-600"
          label="Yetkazib berildi"
          value={String(statusCounts.yetkazildi)}
          trend={stats.trends.delivered}
        />
        <StatCard
          icon={XCircle}
          iconBg="bg-violet-100"
          iconColor="text-violet-600"
          label="Bekor qilingan"
          value={String(statusCounts.bekorQilingan)}
          trend={stats.trends.cancelled}
        />
        <div className="col-span-2 flex flex-col justify-between rounded-2xl bg-gradient-to-br from-brand-600 to-brand-700 p-5 text-white lg:col-span-1">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
            <Wallet2 aria-hidden className="h-5 w-5" />
          </span>
          <div className="mt-3">
            <p className="text-xs text-white/80">Umumiy daromad</p>
            <p className="mt-0.5 text-xl font-bold">{formatSom(stats.totalRevenue)}</p>
          </div>
          <span className="mt-3 inline-flex w-fit items-center gap-1 rounded-full bg-white/15 px-2 py-1 text-xs font-semibold">
            {stats.trends.revenue >= 0 ? "↗" : "↘"} {Math.abs(stats.trends.revenue)}%
          </span>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div
          ref={mapCardRef}
          className="overflow-hidden rounded-2xl border border-border bg-surface lg:col-span-2"
        >
          <div className="flex items-center justify-between p-5 pb-0 sm:p-6 sm:pb-0">
            <h3 className="font-bold text-foreground">Yetkazib berish xaritasi</h3>
            <button
              type="button"
              onClick={toggleMapFullscreen}
              className="flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-foreground/80 hover:bg-brand-50"
            >
              <Maximize aria-hidden className="h-3.5 w-3.5" />
              To&apos;liq ekran
            </button>
          </div>
          <div className="relative mt-4 h-72 sm:h-80">
            <div className="pointer-events-none absolute left-3 top-3 z-[400] rounded-xl border border-border bg-surface/95 p-3 text-xs shadow-md backdrop-blur-sm">
              <p className="mb-1.5 flex items-center gap-1.5 font-semibold text-foreground">
                <Users aria-hidden className="h-3.5 w-3.5 text-brand-600" />
                Aktiv kuryerlar <span className="ml-auto">{stats.onlineCourierCount}</span>
              </p>
              <p className="flex items-center gap-1.5 text-foreground/80">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: STATUS_COLORS.YOLDA }} />
                Yetkazib berilmoqda <span className="ml-auto font-medium">{statusCounts.yetkazilmoqda}</span>
              </p>
              <p className="flex items-center gap-1.5 text-foreground/80">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: STATUS_COLORS.YETKAZILDI }} />
                Yetkazib berildi <span className="ml-auto font-medium">{statusCounts.yetkazildi}</span>
              </p>
              <p className="flex items-center gap-1.5 text-foreground/80">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: STATUS_COLORS.TAYYORLANMOQDA }} />
                Kuryerda <span className="ml-auto font-medium">{statusCounts.kuryerda}</span>
              </p>
            </div>
            <DeliveryMap branches={stats.branches} />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
          <h3 className="font-bold text-foreground">Yetkazib berish holatlari</h3>
          <div className="mt-4">
            <Donut segments={donutSegments} />
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6 lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-bold text-foreground">So&apos;nggi buyurtmalar</h3>
            <div className="flex flex-wrap gap-1.5">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setActiveTab(t.key)}
                  className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                    activeTab === t.key
                      ? "bg-brand-600 text-white"
                      : "bg-neutral-100 text-foreground/70 hover:bg-neutral-200"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted">
                  <th className="pb-2 font-medium">Buyurtma</th>
                  <th className="pb-2 font-medium">Mijoz</th>
                  <th className="pb-2 font-medium">Manzil</th>
                  <th className="pb-2 font-medium">Kuryer</th>
                  <th className="pb-2 font-medium">Holat</th>
                  <th className="pb-2 font-medium">Summa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredOrders.map((o) => (
                  <tr key={o.id}>
                    <td className="py-2.5 font-medium text-foreground">#{o.orderNumber}</td>
                    <td className="py-2.5 text-foreground/80">{o.customerName}</td>
                    <td className="py-2.5 max-w-[160px] truncate text-foreground/80">
                      {o.address ?? "—"}
                    </td>
                    <td className="py-2.5 text-foreground/80">{o.courierName ?? "—"}</td>
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
                    <td className="py-2.5 font-medium text-foreground">
                      {formatSom(o.totalPrice)}
                    </td>
                    <td className="py-2.5 text-right">
                      <MoreVertical aria-hidden className="ml-auto h-4 w-4 text-muted" />
                    </td>
                  </tr>
                ))}
                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-4 text-center text-muted">
                      Bu holatda buyurtmalar yo&apos;q.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-foreground">Aktiv kuryerlar</h3>
            <span className="text-sm text-muted">{stats.onlineCourierCount} online</span>
          </div>
          <div className="mt-4">
            <CourierList couriers={stats.activeCouriers} />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
        <h3 className="font-bold text-foreground">
          Yetkazib berish samaradorligi (so&apos;nggi 7 kun)
        </h3>
        <div className="mt-4">
          <DeliveryTrendChart data={stats.deliveryTrend} />
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-xl border border-border p-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-600">
              <Clock aria-hidden className="h-4 w-4" />
            </span>
            <span>
              <span className="block text-xs text-muted">O&apos;rtacha yetkazish vaqti</span>
              <span className="block text-sm font-bold text-foreground">
                {stats.avgDeliveryMinutes > 0 ? `${stats.avgDeliveryMinutes} daqiqa` : "Ma'lumot yo'q"}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-border p-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600">
              <Gauge aria-hidden className="h-4 w-4" />
            </span>
            <span>
              <span className="block text-xs text-muted">O&apos;rtacha kuryer samaradorligi</span>
              <span className="block text-sm font-bold text-foreground">
                {stats.avgCourierEfficiency}%
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
