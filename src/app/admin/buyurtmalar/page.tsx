"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useAdminBadges } from "@/context/AdminBadgesContext";
import { adminGetOrders, adminUpdateOrderStatus } from "@/lib/api";
import { formatSom, formatDate } from "@/lib/format";
import type { Order, OrderStatus } from "@/types/product";
import ErrorBanner from "@/components/admin/ErrorBanner";
import { errorMessage } from "@/lib/error-message";

const STATUS_OPTIONS: { value: OrderStatus; label: string }[] = [
  { value: "QABUL_QILINDI", label: "Qabul qilindi" },
  { value: "TAYYORLANMOQDA", label: "Tayyorlanmoqda" },
  { value: "YOLDA", label: "Yo'lda" },
  { value: "YETKAZILDI", label: "Yetkazildi" },
  { value: "BEKOR_QILINDI", label: "Bekor qilindi" },
];

export default function AdminOrdersPage() {
  const { auth } = useAuth();
  const { refresh: refreshBadges } = useAdminBadges();
  const [orders, setOrders] = useState<Order[]>([]);
  const [actionError, setActionError] = useState<string | null>(null);

  function loadOrders() {
    if (!auth) return;
    adminGetOrders(auth.accessToken)
      .then(setOrders)
      .catch(() => {});
  }

  useEffect(loadOrders, [auth]);

  async function handleStatusChange(orderId: string, status: string) {
    if (!auth) return;
    setActionError(null);
    try {
      await adminUpdateOrderStatus(auth.accessToken, orderId, status);
      loadOrders();
      refreshBadges();
    } catch (err) {
      setActionError(errorMessage(err));
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-bold text-foreground sm:text-2xl">
        Buyurtmalar
      </h1>

      <ErrorBanner
        message={actionError}
        onDismiss={() => setActionError(null)}
      />

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="min-w-full divide-y divide-border text-sm">
          <thead className="bg-brand-50 text-left">
            <tr>
              <th className="px-3 py-2">Raqami</th>
              <th className="px-3 py-2">Telefon</th>
              <th className="px-3 py-2">Summa</th>
              <th className="px-3 py-2">To&apos;lov</th>
              <th className="px-3 py-2">Sana</th>
              <th className="px-3 py-2">Holat</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {orders.map((o) => (
              <tr key={o.id}>
                <td className="px-3 py-2 font-medium text-foreground">
                  {o.orderNumber}
                </td>
                <td className="px-3 py-2 text-muted">{o.phone ?? "—"}</td>
                <td className="px-3 py-2">{formatSom(o.totalPrice)}</td>
                <td className="px-3 py-2 text-muted">
                  {o.paymentMethod}
                  {o.paid && <Check aria-hidden className="ml-1 inline h-3.5 w-3.5 text-brand-600" />}
                </td>
                <td className="px-3 py-2 text-muted">{formatDate(o.createdAt)}</td>
                <td className="px-3 py-2">
                  <select
                    value={o.status}
                    onChange={(e) => handleStatusChange(o.id, e.target.value)}
                    className="rounded-md border border-border bg-background px-2 py-1 text-sm outline-none focus:border-brand-500"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
