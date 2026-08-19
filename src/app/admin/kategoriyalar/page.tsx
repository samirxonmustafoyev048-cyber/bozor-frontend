"use client";

import { createElement, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  adminCreateCategory,
  adminDeleteCategory,
  adminUpdateCategory,
  getCategories,
  type CategoryPayload,
} from "@/lib/api";
import {
  CATEGORY_ICON_CHOICES,
  getCategoryIcon,
} from "@/lib/category-icons";
import type { Category } from "@/types/product";
import Modal from "@/components/admin/Modal";
import ErrorBanner from "@/components/admin/ErrorBanner";
import RowActions from "@/components/admin/RowActions";
import { errorMessage } from "@/lib/error-message";

const emptyForm: CategoryPayload = { slug: "", name: "", icon: "", imageUrl: "" };

export default function AdminCategoriesPage() {
  const { auth } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<CategoryPayload>(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  function loadCategories() {
    getCategories()
      .then(setCategories)
      .catch(() => {});
  }

  useEffect(loadCategories, []);

  function startCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
    setError(null);
  }

  function startEdit(c: Category) {
    setEditingId(c.id);
    setForm({
      slug: c.slug,
      name: c.name,
      icon: c.icon,
      imageUrl: c.imageUrl ?? "",
    });
    setShowForm(true);
    setError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!auth) return;
    // The API rejects an empty string for the optional photo, so drop it.
    const payload = { ...form, imageUrl: form.imageUrl?.trim() || undefined };
    try {
      if (editingId) {
        await adminUpdateCategory(auth.accessToken, editingId, payload);
      } else {
        await adminCreateCategory(auth.accessToken, payload);
      }
      setShowForm(false);
      loadCategories();
    } catch (err) {
      setError(errorMessage(err, "Saqlashda xatolik yuz berdi."));
    }
  }

  async function handleDelete(id: string) {
    if (!auth) return;
    if (!confirm("Kategoriyani o'chirishga ishonchingiz komilmi?")) return;
    setActionError(null);
    try {
      await adminDeleteCategory(auth.accessToken, id);
      loadCategories();
    } catch (err) {
      setActionError(errorMessage(err));
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground sm:text-2xl">
          Kategoriyalar
        </h1>
        <button
          type="button"
          onClick={startCreate}
          className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          + Yangi kategoriya
        </button>
      </div>

      <ErrorBanner
        message={actionError}
        onDismiss={() => setActionError(null)}
      />

      <Modal
        open={showForm}
        onClose={() => setShowForm(false)}
        title={editingId ? "Kategoriyani tahrirlash" : "Yangi kategoriya"}
        widthClassName="max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-3">
          <input
            required
            placeholder="Slug"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-500"
          />
          <input
            required
            placeholder="Nomi"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-500"
          />
          <span className="flex items-center gap-2">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50">
              {createElement(getCategoryIcon(form.slug, form.name, form.icon), {
                "aria-hidden": true,
                className: "h-4 w-4 text-brand-600",
              })}
            </span>
            <select
              required
              value={form.icon}
              onChange={(e) => setForm({ ...form, icon: e.target.value })}
              className="min-w-0 flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-500"
            >
              <option value="">Ikonka tanlang</option>
              {CATEGORY_ICON_CHOICES.map((choice) => (
                <option key={choice.name} value={choice.name}>
                  {choice.label}
                </option>
              ))}
            </select>
          </span>
          <input
            placeholder="Rasm manzili (masalan: /photos/categories/muzqaymoq.webp)"
            value={form.imageUrl ?? ""}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-500 sm:col-span-3"
          />

          {error && <p className="text-sm text-danger-600 sm:col-span-3">{error}</p>}

          <div className="flex gap-2 sm:col-span-3">
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

      <ul className="flex flex-col gap-2">
        {categories.map((c) => (
          <li
            key={c.id}
            className="flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-3"
          >
            <span className="flex min-w-0 items-center gap-2.5 text-sm">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-brand-50">
                {c.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={c.imageUrl}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  createElement(getCategoryIcon(c.slug, c.name, c.icon), {
                    "aria-hidden": true,
                    className: "h-4 w-4 text-brand-600",
                  })
                )}
              </span>
              <span className="min-w-0 truncate">
                {c.name}{" "}
                <span className="text-xs text-muted">({c.slug})</span>
              </span>
            </span>
            <RowActions
              onEdit={() => startEdit(c)}
              onDelete={() => handleDelete(c.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
