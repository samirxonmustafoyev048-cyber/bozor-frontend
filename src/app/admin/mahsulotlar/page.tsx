"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  adminCreateProduct,
  adminDeleteProduct,
  adminUpdateProduct,
  getCategories,
  getProducts,
  type ProductPayload,
} from "@/lib/api";
import { formatSom } from "@/lib/format";
import type { Category, Product } from "@/types/product";

const emptyForm: ProductPayload = {
  slug: "",
  name: "",
  description: "",
  price: 0,
  unit: "",
  emoji: "",
  categoryId: "",
};

export default function AdminProductsPage() {
  const { auth } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductPayload>(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function loadProducts() {
    getProducts({ pageSize: 200 }).then((res) => setProducts(res.items));
  }

  useEffect(() => {
    loadProducts();
    getCategories().then(setCategories);
  }, []);

  function startCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
    setError(null);
  }

  function startEdit(p: Product) {
    setEditingId(p.id);
    setForm({
      slug: p.slug,
      name: p.name,
      description: p.description,
      composition: p.composition ?? undefined,
      price: p.price,
      discountPrice: p.discountPrice ?? undefined,
      unit: p.unit,
      emoji: p.emoji,
      categoryId: p.categoryId,
      stock: p.stock,
      isPopular: p.isPopular,
      rating: p.rating ?? undefined,
    });
    setShowForm(true);
    setError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!auth) return;
    setSaving(true);
    setError(null);
    try {
      if (editingId) {
        await adminUpdateProduct(auth.accessToken, editingId, form);
      } else {
        await adminCreateProduct(auth.accessToken, form);
      }
      setShowForm(false);
      loadProducts();
    } catch {
      setError("Saqlashda xatolik yuz berdi. Maydonlarni tekshiring.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!auth) return;
    if (!confirm("Mahsulotni o'chirishga ishonchingiz komilmi?")) return;
    await adminDeleteProduct(auth.accessToken, id);
    loadProducts();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground sm:text-2xl">
          Mahsulotlar
        </h1>
        <button
          type="button"
          onClick={startCreate}
          className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          + Yangi mahsulot
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="grid gap-3 rounded-lg border border-border bg-surface p-4 sm:grid-cols-2"
        >
          <input
            required
            placeholder="Slug (masalan: yangi-non)"
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
          <select
            required
            value={form.categoryId}
            onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-500"
          >
            <option value="">Kategoriya tanlang</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <input
            required
            placeholder="Birlik (masalan: 1 kg)"
            value={form.unit}
            onChange={(e) => setForm({ ...form, unit: e.target.value })}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-500"
          />
          <input
            required
            placeholder="Emoji (masalan: 🍅)"
            value={form.emoji}
            onChange={(e) => setForm({ ...form, emoji: e.target.value })}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-500"
          />
          <input
            required
            type="number"
            placeholder="Narxi (so'm)"
            value={form.price || ""}
            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-500"
          />
          <input
            type="number"
            placeholder="Chegirma narxi (ixtiyoriy)"
            value={form.discountPrice ?? ""}
            onChange={(e) =>
              setForm({
                ...form,
                discountPrice: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-500"
          />
          <input
            type="number"
            placeholder="Ombordagi miqdor"
            value={form.stock ?? ""}
            onChange={(e) =>
              setForm({ ...form, stock: e.target.value ? Number(e.target.value) : undefined })
            }
            className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-500"
          />
          <textarea
            required
            placeholder="Tavsif"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-500 sm:col-span-2"
          />
          <input
            placeholder="Tarkibi (ixtiyoriy)"
            value={form.composition ?? ""}
            onChange={(e) => setForm({ ...form, composition: e.target.value })}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-500 sm:col-span-2"
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.isPopular ?? false}
              onChange={(e) => setForm({ ...form, isPopular: e.target.checked })}
              className="h-4 w-4 text-brand-600"
            />
            Ommabop mahsulot
          </label>

          {error && <p className="text-sm text-danger-600 sm:col-span-2">{error}</p>}

          <div className="flex gap-2 sm:col-span-2">
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-brand-600 px-6 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
            >
              {saving ? "Saqlanmoqda..." : "Saqlash"}
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
      )}

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="min-w-full divide-y divide-border text-sm">
          <thead className="bg-brand-50 text-left">
            <tr>
              <th className="px-3 py-2">Mahsulot</th>
              <th className="px-3 py-2">Kategoriya</th>
              <th className="px-3 py-2">Narx</th>
              <th className="px-3 py-2">Ombor</th>
              <th className="px-3 py-2"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.map((p) => (
              <tr key={p.id}>
                <td className="px-3 py-2">
                  <span aria-hidden className="mr-1">
                    {p.emoji}
                  </span>
                  {p.name}
                </td>
                <td className="px-3 py-2 text-muted">{p.category.name}</td>
                <td className="px-3 py-2">
                  {p.discountPrice ? (
                    <>
                      <span className="text-danger-600">
                        {formatSom(p.discountPrice)}
                      </span>{" "}
                      <span className="text-xs text-muted line-through">
                        {formatSom(p.price)}
                      </span>
                    </>
                  ) : (
                    formatSom(p.price)
                  )}
                </td>
                <td className="px-3 py-2 text-muted">{p.stock}</td>
                <td className="px-3 py-2 text-right">
                  <button
                    type="button"
                    onClick={() => startEdit(p)}
                    className="mr-3 text-brand-700 hover:underline"
                  >
                    Tahrirlash
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(p.id)}
                    className="text-danger-600 hover:underline"
                  >
                    O&apos;chirish
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
