"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  Boxes,
  Search,
  ArrowDownToLine,
  ArrowUpFromLine,
  Wrench,
  AlertTriangle,
  PackageX,
  History,
  type LucideIcon,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
  adjustStock,
  getStockMovements,
  getStockOverview,
  type StockMovement,
  type StockMovementType,
  type StockOverview,
} from "@/lib/api";
import { formatRelativeTime } from "@/lib/format";
import Modal from "@/components/admin/Modal";
import ProductImage from "@/components/product/ProductImage";
import type { Product } from "@/types/product";

const MOVEMENT_STYLE: Record<
  StockMovementType,
  { label: string; icon: LucideIcon; className: string; sign: string }
> = {
  KIRIM: {
    label: "Kirim",
    icon: ArrowDownToLine,
    className: "bg-brand-100 text-brand-700",
    sign: "+",
  },
  CHIQIM: {
    label: "Chiqim",
    icon: ArrowUpFromLine,
    className: "bg-danger-500/10 text-danger-600",
    sign: "−",
  },
  TUZATISH: {
    label: "Tuzatish",
    icon: Wrench,
    className: "bg-sky-100 text-sky-700",
    sign: "+",
  },
};

export default function WarehousePage() {
  const { auth, isLoaded } = useAuth();

  const [data, setData] = useState<StockOverview | null>(null);
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<{
    type: StockMovementType;
    quantity: number;
    reason: string;
  }>({ type: "KIRIM", quantity: 1, reason: "" });
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const load = useCallback(() => {
    if (!auth) return;
    getStockOverview(auth.accessToken, query || undefined)
      .then(setData)
      .catch(() => setError("Zaxira ma'lumotlarini yuklab bo'lmadi"));
    getStockMovements(auth.accessToken).then(setMovements).catch(() => {});
  }, [auth, query]);

  useEffect(load, [load]);

  function startAdjust(product: Product) {
    setEditing(product);
    setForm({ type: "KIRIM", quantity: 1, reason: "" });
    setFormError(null);
  }

  async function handleAdjust(e: React.FormEvent) {
    e.preventDefault();
    if (!auth || !editing) return;
    setSaving(true);
    setFormError(null);
    try {
      await adjustStock(auth.accessToken, editing.id, {
        type: form.type,
        quantity: form.quantity,
        reason: form.reason.trim() || undefined,
      });
      setEditing(null);
      load();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Saqlashda xatolik");
    } finally {
      setSaving(false);
    }
  }

  if (!isLoaded) return null;

  if (!auth || !["ADMIN", "OMBORCHI"].includes(auth.user.role)) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-20 text-center sm:px-6">
        <h1 className="text-xl font-bold text-foreground">
          Ombor paneli faqat xodimlar uchun
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

  const threshold = data?.lowStockThreshold ?? 10;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <div>
        <h1 className="flex items-center gap-2 text-xl font-bold text-foreground sm:text-2xl">
          <Boxes aria-hidden className="h-6 w-6 text-brand-600" />
          Ombor
        </h1>
        <p className="text-sm text-muted">
          Omborchi: {auth.user.name} · Zaxirani qabul qiling, chiqaring va
          hisobdan tuzating.
        </p>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <SummaryCard
          icon={PackageX}
          label="Tugagan"
          value={String(data?.outOfStock ?? 0)}
          accent="bg-danger-500/10 text-danger-600"
        />
        <SummaryCard
          icon={AlertTriangle}
          label={`Kam qolgan (${threshold} dan kam)`}
          value={String(data?.lowStock ?? 0)}
          accent="bg-amber-100 text-amber-600"
        />
        <SummaryCard
          icon={Boxes}
          label="Jami birlik"
          value={String(data?.totalUnits ?? 0)}
          accent="bg-brand-100 text-brand-600"
        />
      </div>

      {error && (
        <p className="mt-4 rounded-xl border border-danger-500/30 bg-danger-500/10 px-4 py-3 text-sm text-danger-600">
          {error}
        </p>
      )}

      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_20rem]">
        <div className="overflow-hidden rounded-2xl border border-border bg-surface">
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <Search aria-hidden className="h-4 w-4 shrink-0 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Mahsulot qidirish..."
              className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-muted"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted">
                  <th className="px-4 py-3 font-medium">Mahsulot</th>
                  <th className="px-4 py-3 font-medium">Kategoriya</th>
                  <th className="px-4 py-3 font-medium">Zaxira</th>
                  <th className="px-4 py-3 font-medium" />
                </tr>
              </thead>
              <tbody>
                {(data?.products ?? []).map((product) => (
                  <tr key={product.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-2.5">
                      <span className="flex items-center gap-2.5">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-brand-50">
                          <ProductImage
                            product={product}
                            iconClassName="h-4 w-4 text-brand-600"
                          />
                        </span>
                        <span className="font-medium text-foreground">
                          {product.name}
                        </span>
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-muted">{product.category.name}</td>
                    <td className="px-4 py-2.5">
                      <StockBadge stock={product.stock} unit={product.unit} threshold={threshold} />
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      <button
                        type="button"
                        onClick={() => startAdjust(product)}
                        className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-brand-50 hover:text-brand-700"
                      >
                        O&apos;zgartirish
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {data && data.products.length === 0 && (
            <p className="px-4 py-10 text-center text-sm text-muted">
              Mahsulot topilmadi.
            </p>
          )}
        </div>

        <aside className="h-fit overflow-hidden rounded-2xl border border-border bg-surface">
          <h2 className="flex items-center gap-2 border-b border-border px-4 py-3 font-bold text-foreground">
            <History aria-hidden className="h-4 w-4 text-brand-600" />
            Oxirgi harakatlar
          </h2>

          {movements.length === 0 ? (
            <p className="px-4 py-10 text-center text-sm text-muted">
              Hozircha harakat yo&apos;q.
            </p>
          ) : (
            <ul className="max-h-[32rem] divide-y divide-border overflow-y-auto">
              {movements.map((m) => {
                const style = MOVEMENT_STYLE[m.type];
                return (
                  <li key={m.id} className="flex items-start gap-2.5 px-4 py-3">
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${style.className}`}
                    >
                      <style.icon aria-hidden className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-foreground">
                        {m.product.name}
                      </span>
                      <span className="block text-xs text-muted">
                        {style.label} {style.sign}
                        {m.quantity} {m.product.unit} → {m.stockAfter}
                      </span>
                      {m.reason && (
                        <span className="block truncate text-xs text-muted/70">
                          {m.reason}
                        </span>
                      )}
                      <span className="block text-[11px] text-muted/70">
                        {m.actorName} · {formatRelativeTime(m.createdAt)}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </aside>
      </div>

      <Modal
        open={editing !== null}
        onClose={() => setEditing(null)}
        title={editing ? `${editing.name} — zaxira` : ""}
        widthClassName="max-w-md"
      >
        {editing && (
          <form onSubmit={handleAdjust} className="flex flex-col gap-3">
            <p className="rounded-lg bg-brand-50 px-3 py-2 text-sm text-brand-800">
              Joriy zaxira: <strong>{editing.stock}</strong> {editing.unit}
            </p>

            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(MOVEMENT_STYLE) as StockMovementType[]).map((type) => {
                const style = MOVEMENT_STYLE[type];
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setForm({ ...form, type })}
                    className={`flex flex-col items-center gap-1 rounded-xl border-2 py-2.5 text-xs font-semibold ${
                      form.type === type
                        ? "border-brand-500 bg-brand-50 text-brand-700"
                        : "border-border text-muted hover:border-brand-200"
                    }`}
                  >
                    <style.icon aria-hidden className="h-4 w-4" />
                    {style.label}
                  </button>
                );
              })}
            </div>

            <label className="flex flex-col gap-1 text-xs font-medium text-muted">
              Miqdor ({editing.unit})
              <input
                required
                type="number"
                min={1}
                value={form.quantity || ""}
                onChange={(e) =>
                  setForm({ ...form, quantity: Number(e.target.value) || 0 })
                }
                className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-500"
              />
            </label>

            <label className="flex flex-col gap-1 text-xs font-medium text-muted">
              Izoh (ixtiyoriy)
              <input
                value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
                placeholder="Masalan: yetkazib beruvchidan qabul qilindi"
                className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-500"
              />
            </label>

            <p className="text-xs text-muted">
              Natija:{" "}
              <strong className="text-foreground">
                {form.type === "CHIQIM"
                  ? editing.stock - form.quantity
                  : editing.stock + form.quantity}
              </strong>{" "}
              {editing.unit}
            </p>

            {formError && <p className="text-sm text-danger-600">{formError}</p>}

            <div className="mt-1 flex gap-2">
              <button
                type="submit"
                disabled={saving || form.quantity < 1}
                className="rounded-full bg-brand-600 px-6 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? "Saqlanmoqda..." : "Saqlash"}
              </button>
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="rounded-full border border-border px-6 py-2 text-sm font-semibold text-foreground hover:bg-brand-50"
              >
                Bekor qilish
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-5">
      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${accent}`}>
        <Icon aria-hidden className="h-5 w-5" />
      </span>
      <span>
        <span className="block text-xs text-muted">{label}</span>
        <span className="block text-lg font-bold text-foreground">{value}</span>
      </span>
    </div>
  );
}

function StockBadge({
  stock,
  unit,
  threshold,
}: {
  stock: number;
  unit: string;
  threshold: number;
}) {
  const { className, label } =
    stock <= 0
      ? { className: "bg-danger-500/10 text-danger-600", label: "Tugagan" }
      : stock <= threshold
        ? { className: "bg-amber-100 text-amber-700", label: "Kam qoldi" }
        : { className: "bg-brand-100 text-brand-700", label: "Yetarli" };

  return (
    <span className="flex items-center gap-2">
      <span className="font-semibold tabular-nums text-foreground">
        {stock} {unit}
      </span>
      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${className}`}>
        {label}
      </span>
    </span>
  );
}
