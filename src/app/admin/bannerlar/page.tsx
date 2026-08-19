"use client";

import { useCallback, useEffect, useState } from "react";
import { Image as ImageIcon, Eye, EyeOff, ArrowUp, ArrowDown } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
  adminCreateBanner,
  adminDeleteBanner,
  adminUpdateBanner,
  getBanners,
  type Banner,
  type BannerPayload,
} from "@/lib/api";
import Modal from "@/components/admin/Modal";
import ErrorBanner from "@/components/admin/ErrorBanner";
import { DeleteButton, EditButton } from "@/components/admin/RowActions";
import { errorMessage } from "@/lib/error-message";

const emptyForm: BannerPayload = {
  title: "",
  subtitle: "",
  imageUrl: "",
  linkUrl: "",
  active: true,
  sortOrder: 0,
};

const inputClass =
  "rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-500";

export default function AdminBannersPage() {
  const { auth } = useAuth();
  const [banners, setBanners] = useState<Banner[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<BannerPayload>(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    getBanners({ all: true })
      .then(setBanners)
      .catch(() => setError("Bannerlarni yuklab bo'lmadi"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(load, [load]);

  function startCreate() {
    setEditingId(null);
    // Put a new banner at the end of the running order.
    setForm({ ...emptyForm, sortOrder: banners.length });
    setError(null);
    setShowForm(true);
  }

  function startEdit(banner: Banner) {
    setEditingId(banner.id);
    setForm({
      title: banner.title,
      subtitle: banner.subtitle ?? "",
      imageUrl: banner.imageUrl,
      linkUrl: banner.linkUrl ?? "",
      active: banner.active,
      sortOrder: banner.sortOrder,
    });
    setError(null);
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!auth) return;
    setError(null);

    // Optional text fields are rejected as empty strings, so send them unset.
    const payload: BannerPayload = {
      ...form,
      title: form.title.trim(),
      imageUrl: form.imageUrl.trim(),
      subtitle: form.subtitle?.trim() || undefined,
      linkUrl: form.linkUrl?.trim() || undefined,
    };

    try {
      if (editingId) {
        await adminUpdateBanner(auth.accessToken, editingId, payload);
      } else {
        await adminCreateBanner(auth.accessToken, payload);
      }
      setShowForm(false);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Saqlashda xatolik");
    }
  }

  async function toggleActive(banner: Banner) {
    if (!auth) return;
    setActionError(null);
    try {
      await adminUpdateBanner(auth.accessToken, banner.id, {
        active: !banner.active,
      });
      load();
    } catch (err) {
      setActionError(errorMessage(err));
    }
  }

  /** Swaps a banner's sortOrder with its neighbour so admins can reorder without typing numbers. */
  async function move(banner: Banner, direction: -1 | 1) {
    if (!auth) return;
    const index = banners.findIndex((b) => b.id === banner.id);
    const neighbour = banners[index + direction];
    if (!neighbour) return;

    setActionError(null);
    try {
      await Promise.all([
        adminUpdateBanner(auth.accessToken, banner.id, {
          sortOrder: neighbour.sortOrder,
        }),
        adminUpdateBanner(auth.accessToken, neighbour.id, {
          sortOrder: banner.sortOrder,
        }),
      ]);
      load();
    } catch (err) {
      setActionError(errorMessage(err));
    }
  }

  async function handleDelete(banner: Banner) {
    if (!auth) return;
    if (!confirm(`"${banner.title}" bannerini o'chirishga ishonchingiz komilmi?`)) return;
    setActionError(null);
    try {
      await adminDeleteBanner(auth.accessToken, banner.id);
      load();
    } catch (err) {
      setActionError(errorMessage(err));
    }
  }

  const activeCount = banners.filter((b) => b.active).length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-foreground sm:text-2xl">Bannerlar</h1>
          <p className="text-sm text-muted">
            {banners.length} ta banner, shundan {activeCount} tasi saytda ko&apos;rinadi.
          </p>
        </div>
        <button
          type="button"
          onClick={startCreate}
          className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          + Yangi banner
        </button>
      </div>

      <ErrorBanner
        message={actionError}
        onDismiss={() => setActionError(null)}
      />

      <Modal
        open={showForm}
        onClose={() => setShowForm(false)}
        title={editingId ? "Bannerni tahrirlash" : "Yangi banner"}
        widthClassName="max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1 text-xs font-medium text-muted">
            Sarlavha
            <input
              required
              placeholder="Masalan: Yangi yil chegirmalari"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className={inputClass}
            />
          </label>

          <label className="flex flex-col gap-1 text-xs font-medium text-muted">
            Qo&apos;shimcha matn
            <input
              placeholder="Masalan: 50% gacha chegirma"
              value={form.subtitle ?? ""}
              onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
              className={inputClass}
            />
          </label>

          <label className="flex flex-col gap-1 text-xs font-medium text-muted sm:col-span-2">
            Rasm manzili
            <input
              required
              placeholder="/photos/storeAisle.jpg yoki https://..."
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              className={inputClass}
            />
          </label>

          <label className="flex flex-col gap-1 text-xs font-medium text-muted">
            Havola (bosilganda o&apos;tadigan sahifa)
            <input
              placeholder="/katalog/sabzavot-va-meva"
              value={form.linkUrl ?? ""}
              onChange={(e) => setForm({ ...form, linkUrl: e.target.value })}
              className={inputClass}
            />
          </label>

          <label className="flex flex-col gap-1 text-xs font-medium text-muted">
            Tartib raqami
            <input
              type="number"
              min={0}
              value={form.sortOrder ?? 0}
              onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })}
              className={inputClass}
            />
          </label>

          {form.imageUrl && (
            <div className="sm:col-span-2">
              <p className="mb-1.5 text-xs font-medium text-muted">Ko&apos;rinishi</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={form.imageUrl}
                alt=""
                className="h-32 w-full rounded-xl border border-border object-cover"
              />
            </div>
          )}

          <label className="flex items-center gap-2 text-sm text-foreground sm:col-span-2">
            <input
              type="checkbox"
              checked={form.active ?? true}
              onChange={(e) => setForm({ ...form, active: e.target.checked })}
              className="h-4 w-4 accent-brand-600"
            />
            Saytda ko&apos;rsatilsin
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

      {loading ? (
        <p className="rounded-2xl border border-border bg-surface px-5 py-10 text-center text-sm text-muted">
          Yuklanmoqda...
        </p>
      ) : banners.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-surface px-5 py-14 text-center">
          <ImageIcon aria-hidden className="h-8 w-8 text-muted/50" />
          <p className="text-sm text-muted">
            Hozircha banner yo&apos;q. Bosh sahifa uchun birinchi bannerni qo&apos;shing.
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {banners.map((banner, index) => (
            <li
              key={banner.id}
              className={`flex flex-col gap-4 rounded-2xl border bg-surface p-4 sm:flex-row sm:items-center ${
                banner.active ? "border-border" : "border-dashed border-border opacity-70"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={banner.imageUrl}
                alt=""
                className="h-24 w-full shrink-0 rounded-xl border border-border object-cover sm:w-40"
              />

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-bold text-foreground">{banner.title}</h3>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                      banner.active
                        ? "bg-brand-100 text-brand-700"
                        : "bg-neutral-100 text-muted"
                    }`}
                  >
                    {banner.active ? "Faol" : "Yashirilgan"}
                  </span>
                </div>
                {banner.subtitle && (
                  <p className="mt-0.5 text-sm text-muted">{banner.subtitle}</p>
                )}
                {banner.linkUrl && (
                  <p className="mt-1 truncate text-xs text-brand-700">{banner.linkUrl}</p>
                )}
              </div>

              <div className="flex shrink-0 flex-wrap items-center justify-end gap-1.5">
                <IconButton
                  label="Yuqoriga"
                  icon={ArrowUp}
                  disabled={index === 0}
                  onClick={() => move(banner, -1)}
                />
                <IconButton
                  label="Pastga"
                  icon={ArrowDown}
                  disabled={index === banners.length - 1}
                  onClick={() => move(banner, 1)}
                />
                <IconButton
                  label={banner.active ? "Yashirish" : "Ko'rsatish"}
                  icon={banner.active ? EyeOff : Eye}
                  onClick={() => toggleActive(banner)}
                />
                <EditButton onClick={() => startEdit(banner)} />
                <DeleteButton onClick={() => handleDelete(banner)} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function IconButton({
  label,
  icon: Icon,
  onClick,
  disabled,
}: {
  label: string;
  icon: typeof Eye;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={label}
      aria-label={label}
      className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted hover:bg-brand-50 hover:text-brand-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-muted"
    >
      <Icon aria-hidden className="h-4 w-4" />
    </button>
  );
}
