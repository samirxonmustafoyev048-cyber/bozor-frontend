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
import { getCategoryIcon } from "@/lib/category-icons";
import type { Category } from "@/types/product";
import Modal from "@/components/admin/Modal";

const emptyForm: CategoryPayload = { slug: "", name: "", icon: "" };

export default function AdminCategoriesPage() {
  const { auth } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<CategoryPayload>(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    setForm({ slug: c.slug, name: c.name, icon: c.icon });
    setShowForm(true);
    setError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!auth) return;
    try {
      if (editingId) {
        await adminUpdateCategory(auth.accessToken, editingId, form);
      } else {
        await adminCreateCategory(auth.accessToken, form);
      }
      setShowForm(false);
      loadCategories();
    } catch {
      setError("Saqlashda xatolik. Slug allaqachon band bo'lishi mumkin.");
    }
  }

  async function handleDelete(id: string) {
    if (!auth) return;
    if (!confirm("Kategoriyani o'chirishga ishonchingiz komilmi?")) return;
    await adminDeleteCategory(auth.accessToken, id);
    loadCategories();
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
          <input
            required
            placeholder="Ikonka (emoji)"
            value={form.icon}
            onChange={(e) => setForm({ ...form, icon: e.target.value })}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-500"
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
            <span className="flex items-center gap-2 text-sm">
              {createElement(getCategoryIcon(c.slug, c.name), {
                "aria-hidden": true,
                className: "h-4 w-4 text-brand-600",
              })}
              {c.name}{" "}
              <span className="text-xs text-muted">({c.slug})</span>
            </span>
            <span>
              <button
                type="button"
                onClick={() => startEdit(c)}
                className="mr-3 text-sm text-brand-700 hover:underline"
              >
                Tahrirlash
              </button>
              <button
                type="button"
                onClick={() => handleDelete(c.id)}
                className="text-sm text-danger-600 hover:underline"
              >
                O&apos;chirish
              </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
