"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getMyOrders } from "@/lib/api";
import { formatSom, formatDate } from "@/lib/format";
import type { Order, OrderStatus } from "@/types/product";

const STATUS_LABELS: Record<OrderStatus, string> = {
  QABUL_QILINDI: "Qabul qilindi",
  TAYYORLANMOQDA: "Tayyorlanmoqda",
  YOLDA: "Yo'lda",
  YETKAZILDI: "Yetkazildi",
  BEKOR_QILINDI: "Bekor qilindi",
};

export default function ProfilePage() {
  const { auth, isLoaded, updateName, logout } = useAuth();
  // `null` means "untouched, mirror the saved name". An empty string is a real
  // edit, so it must survive — falling back to the saved name whenever the box
  // is empty would refill it the moment you cleared it.
  const [draftName, setDraftName] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[] | null>(null);

  useEffect(() => {
    if (auth) {
      getMyOrders(auth.accessToken)
        .then(setOrders)
        .catch(() => setOrders([]));
    }
  }, [auth]);

  if (!isLoaded) {
    return null;
  }

  if (!auth) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-20 text-center sm:px-6">
        <h1 className="text-xl font-bold text-foreground">
          Profilni ko&apos;rish uchun tizimga kiring
        </h1>
        <Link
          href="/kirish"
          className="rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Kirish
        </Link>
      </div>
    );
  }

  const displayName = draftName ?? auth.user.name;
  const trimmedName = displayName.trim();
  const isUnchanged = trimmedName === auth.user.name;

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!auth) return;

    if (!trimmedName) {
      setError("Ism bo'sh bo'lishi mumkin emas");
      return;
    }

    setSaving(true);
    setSaved(false);
    setError(null);
    try {
      await updateName(trimmedName);
      // Track the saved value again so a later token refresh cannot revive
      // a stale draft.
      setDraftName(null);
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Saqlashda xatolik yuz berdi");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground sm:text-2xl">
          Profil
        </h1>
        <button
          type="button"
          onClick={logout}
          className="text-sm text-muted hover:text-danger-600"
        >
          Chiqish
        </button>
      </div>

      <form
        onSubmit={handleSave}
        className="mt-6 flex flex-col gap-4 rounded-lg border border-border bg-surface p-4"
      >
        <label className="flex flex-col gap-1.5 text-sm">
          Ism
          <input
            type="text"
            value={displayName}
            onChange={(e) => {
              setDraftName(e.target.value);
              setError(null);
            }}
            className="rounded-md border border-border bg-background px-3 py-2 outline-none focus:border-brand-500"
          />
        </label>
        {auth.user.phone && (
          <p className="text-sm text-muted">Telefon: {auth.user.phone}</p>
        )}
        {auth.user.email && (
          <p className="text-sm text-muted">Email: {auth.user.email}</p>
        )}
        {error && <p className="text-sm text-danger-600">{error}</p>}
        <button
          type="submit"
          disabled={saving || isUnchanged}
          className="w-fit rounded-full bg-brand-600 px-6 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saved ? (
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-4 w-4" />
              Saqlandi
            </span>
          ) : saving ? (
            "Saqlanmoqda..."
          ) : (
            "Saqlash"
          )}
        </button>
      </form>

      <h2 className="mt-8 text-lg font-bold text-foreground">
        Buyurtmalar tarixi
      </h2>
      {orders === null ? (
        <p className="mt-3 text-sm text-muted">Yuklanmoqda...</p>
      ) : orders.length === 0 ? (
        <p className="mt-3 text-sm text-muted">Hali buyurtmalar yo&apos;q.</p>
      ) : (
        <ul className="mt-3 flex flex-col gap-3">
          {orders.map((order) => (
            <li
              key={order.id}
              className="rounded-lg border border-border bg-surface p-4"
            >
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-foreground">
                  {order.orderNumber}
                </span>
                <span className="text-muted">
                  {STATUS_LABELS[order.status]}
                </span>
              </div>
              <div className="mt-1 flex items-center justify-between text-sm text-muted">
                <span>{formatDate(order.createdAt)}</span>
                <span className="font-medium text-foreground">
                  {formatSom(order.totalPrice)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
