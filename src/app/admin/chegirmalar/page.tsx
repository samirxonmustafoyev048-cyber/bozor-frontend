"use client";

import { useCallback, useEffect, useState } from "react";
import { Tag, Percent, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
  adminCreatePromoCode,
  adminDeletePromoCode,
  adminGetPromoCodes,
  adminUpdatePromoCode,
  type PromoCode,
  type PromoCodePayload,
} from "@/lib/api";
import { formatSom } from "@/lib/format";
import Modal from "@/components/admin/Modal";

const emptyForm: PromoCodePayload = {
  code: "",
  type: "PERCENT",
  value: 10,
  minOrderAmount: 0,
  active: true,
};

const inputClass =
  "rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-500";

/** `expiresAt` arrives as a full ISO timestamp but <input type="date"> wants YYYY-MM-DD. */
function toDateInput(iso: string | null) {
  return iso ? iso.slice(0, 10) : "";
}

function isExpired(promo: PromoCode) {
  return promo.expiresAt !== null && new Date(promo.expiresAt) < new Date();
}

function isUsedUp(promo: PromoCode) {
  return promo.maxUses !== null && promo.usedCount >= promo.maxUses;
}

export default function AdminPromoCodesPage() {
  const { auth } = useAuth();
  const [promos, setPromos] = useState<PromoCode[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<PromoCodePayload>(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    if (!auth) return;
    adminGetPromoCodes(auth.accessToken)
      .then(setPromos)
      .catch(() => setError("Chegirmalarni yuklab bo'lmadi"))
      .finally(() => setLoading(false));
  }, [auth]);

  useEffect(load, [load]);

  function startCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setError(null);
    setShowForm(true);
  }

  function startEdit(promo: PromoCode) {
    setEditingId(promo.id);
    setForm({
      code: promo.code,
      type: promo.type,
      value: promo.value,
      minOrderAmount: promo.minOrderAmount,
      maxUses: promo.maxUses ?? undefined,
      active: promo.active,
      expiresAt: toDateInput(promo.expiresAt),
    });
    setError(null);
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!auth) return;
    setError(null);

    // The API rejects an empty string for these, so drop them when unset.
    const payload: PromoCodePayload = {
      ...form,
      code: form.code.trim().toUpperCase(),
      expiresAt: form.expiresAt
        ? new Date(form.expiresAt).toISOString()
        : undefined,
      maxUses: form.maxUses || undefined,
    };

    try {
      if (editingId) {
        await adminUpdatePromoCode(auth.accessToken, editingId, payload);
      } else {
        await adminCreatePromoCode(auth.accessToken, payload);
      }
      setShowForm(false);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Saqlashda xatolik");
    }
  }

  async function toggleActive(promo: PromoCode) {
    if (!auth) return;
    await adminUpdatePromoCode(auth.accessToken, promo.id, { active: !promo.active });
    load();
  }

  async function handleDelete(promo: PromoCode) {
    if (!auth) return;
    if (!confirm(`"${promo.code}" chegirmasini o'chirishga ishonchingiz komilmi?`)) return;
    await adminDeletePromoCode(auth.accessToken, promo.id);
    load();
  }

  const activeCount = promos.filter((p) => p.active && !isExpired(p) && !isUsedUp(p)).length;
  const totalUses = promos.reduce((sum, p) => sum + p.usedCount, 0);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-foreground sm:text-2xl">Chegirmalar</h1>
          <p className="text-sm text-muted">
            Promo-kodlarni yarating va ularning ishlatilishini kuzating.
          </p>
        </div>
        <button
          type="button"
          onClick={startCreate}
          className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          + Yangi chegirma
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <SummaryCard icon={Tag} label="Jami promo-kodlar" value={String(promos.length)} />
        <SummaryCard icon={CheckCircle2} label="Faol" value={String(activeCount)} />
        <SummaryCard icon={Percent} label="Jami ishlatilgan" value={`${totalUses} marta`} />
      </div>

      <Modal
        open={showForm}
        onClose={() => setShowForm(false)}
        title={editingId ? "Chegirmani tahrirlash" : "Yangi chegirma"}
      >
        <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1 text-xs font-medium text-muted">
            Promo-kod
            <input
              required
              placeholder="MASALAN: YANGIYIL25"
              value={form.code}
              onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
              className={inputClass}
            />
          </label>

          <label className="flex flex-col gap-1 text-xs font-medium text-muted">
            Chegirma turi
            <select
              value={form.type}
              onChange={(e) =>
                setForm({ ...form, type: e.target.value as PromoCodePayload["type"] })
              }
              className={inputClass}
            >
              <option value="PERCENT">Foizda (%)</option>
              <option value="AMOUNT">So&apos;mda</option>
            </select>
          </label>

          <label className="flex flex-col gap-1 text-xs font-medium text-muted">
            {form.type === "PERCENT" ? "Chegirma foizi" : "Chegirma summasi (so'm)"}
            <input
              required
              type="number"
              min={1}
              max={form.type === "PERCENT" ? 100 : undefined}
              value={form.value}
              onChange={(e) => setForm({ ...form, value: Number(e.target.value) })}
              className={inputClass}
            />
          </label>

          <label className="flex flex-col gap-1 text-xs font-medium text-muted">
            Minimal buyurtma summasi (so&apos;m)
            <input
              type="number"
              min={0}
              value={form.minOrderAmount ?? 0}
              onChange={(e) => setForm({ ...form, minOrderAmount: Number(e.target.value) })}
              className={inputClass}
            />
          </label>

          <label className="flex flex-col gap-1 text-xs font-medium text-muted">
            Foydalanish limiti (bo&apos;sh = cheksiz)
            <input
              type="number"
              min={1}
              value={form.maxUses ?? ""}
              onChange={(e) =>
                setForm({ ...form, maxUses: e.target.value ? Number(e.target.value) : undefined })
              }
              className={inputClass}
            />
          </label>

          <label className="flex flex-col gap-1 text-xs font-medium text-muted">
            Amal qilish muddati (bo&apos;sh = muddatsiz)
            <input
              type="date"
              value={form.expiresAt ? toDateInput(form.expiresAt) : ""}
              onChange={(e) => setForm({ ...form, expiresAt: e.target.value })}
              className={inputClass}
            />
          </label>

          <label className="flex items-center gap-2 text-sm text-foreground sm:col-span-2">
            <input
              type="checkbox"
              checked={form.active ?? true}
              onChange={(e) => setForm({ ...form, active: e.target.checked })}
              className="h-4 w-4 accent-brand-600"
            />
            Faol
          </label>

          {error && <p className="text-sm text-danger-600 sm:col-span-2">{error}</p>}

          <div className="flex gap-2 sm:col-span-2">
            <button
              type="submit"
              className="rounded-full bg-brand-600 px-6 py-2 text-sm font-semibold text-white hover:bg-brand-700"
            >
              Saqlash
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-full border border-border px-6 py-2 text-sm font-semibold text-foreground hover:bg-brand-50"
            >
              Bekor qilish
            </button>
          </div>
        </form>
      </Modal>

      <div className="overflow-hidden rounded-2xl border border-border bg-surface">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted">
                <th className="px-5 py-3 font-medium">Kod</th>
                <th className="px-5 py-3 font-medium">Chegirma</th>
                <th className="px-5 py-3 font-medium">Min. buyurtma</th>
                <th className="px-5 py-3 font-medium">Ishlatilgan</th>
                <th className="px-5 py-3 font-medium">Muddati</th>
                <th className="px-5 py-3 font-medium">Holat</th>
                <th className="px-5 py-3 font-medium" />
              </tr>
            </thead>
            <tbody>
              {promos.map((promo) => {
                const expired = isExpired(promo);
                const usedUp = isUsedUp(promo);
                return (
                  <tr key={promo.id} className="border-b border-border last:border-0">
                    <td className="px-5 py-3">
                      <span className="rounded-md bg-brand-50 px-2 py-1 font-mono text-xs font-bold text-brand-700">
                        {promo.code}
                      </span>
                    </td>
                    <td className="px-5 py-3 font-semibold text-foreground">
                      {promo.type === "PERCENT"
                        ? `${promo.value}%`
                        : formatSom(promo.value)}
                    </td>
                    <td className="px-5 py-3 text-muted">
                      {promo.minOrderAmount ? formatSom(promo.minOrderAmount) : "—"}
                    </td>
                    <td className="px-5 py-3 text-muted">
                      {promo.usedCount}
                      {promo.maxUses !== null ? ` / ${promo.maxUses}` : ""}
                    </td>
                    <td className="px-5 py-3 text-muted">
                      {promo.expiresAt ? toDateInput(promo.expiresAt) : "Muddatsiz"}
                    </td>
                    <td className="px-5 py-3">
                      <StatusBadge
                        active={promo.active}
                        expired={expired}
                        usedUp={usedUp}
                      />
                    </td>
                    <td className="px-5 py-3 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => toggleActive(promo)}
                        className="mr-3 text-xs font-medium text-muted hover:underline"
                      >
                        {promo.active ? "O'chirib qo'yish" : "Yoqish"}
                      </button>
                      <button
                        type="button"
                        onClick={() => startEdit(promo)}
                        className="mr-3 text-xs font-medium text-brand-700 hover:underline"
                      >
                        Tahrirlash
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(promo)}
                        className="text-xs font-medium text-danger-600 hover:underline"
                      >
                        O&apos;chirish
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {!loading && promos.length === 0 && (
          <p className="px-5 py-10 text-center text-sm text-muted">
            Hozircha chegirma yo&apos;q. Birinchi promo-kodni yarating.
          </p>
        )}
        {loading && (
          <p className="px-5 py-10 text-center text-sm text-muted">Yuklanmoqda...</p>
        )}
      </div>
    </div>
  );
}

function SummaryCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Tag;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-5">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
        <Icon aria-hidden className="h-5 w-5" />
      </span>
      <span>
        <span className="block text-xs text-muted">{label}</span>
        <span className="block text-lg font-bold text-foreground">{value}</span>
      </span>
    </div>
  );
}

function StatusBadge({
  active,
  expired,
  usedUp,
}: {
  active: boolean;
  expired: boolean;
  usedUp: boolean;
}) {
  // An inactive code is inactive whatever else is true, so check that first.
  const { label, className } = !active
    ? { label: "O'chirilgan", className: "bg-neutral-100 text-muted" }
    : expired
      ? { label: "Muddati tugagan", className: "bg-danger-500/10 text-danger-600" }
      : usedUp
        ? { label: "Limit tugagan", className: "bg-accent-500/10 text-accent-600" }
        : { label: "Faol", className: "bg-brand-100 text-brand-700" };

  return (
    <span className={`rounded-full px-2 py-1 text-[11px] font-semibold ${className}`}>
      {label}
    </span>
  );
}
