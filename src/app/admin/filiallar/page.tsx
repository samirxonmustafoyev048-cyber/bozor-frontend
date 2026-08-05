"use client";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
  adminCreateBranch,
  adminDeleteBranch,
  adminUpdateBranch,
  getBranches,
  type BranchPayload,
} from "@/lib/api";
import { googleMapsUrl } from "@/lib/maps";
import type { Branch } from "@/types/product";

const emptyForm: BranchPayload = { name: "", address: "" };

export default function AdminBranchesPage() {
  const { auth } = useAuth();
  const [branches, setBranches] = useState<Branch[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<BranchPayload>(emptyForm);
  const [showForm, setShowForm] = useState(false);

  function loadBranches() {
    getBranches()
      .then(setBranches)
      .catch(() => {});
  }

  useEffect(loadBranches, []);

  function startCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function startEdit(b: Branch) {
    setEditingId(b.id);
    setForm({
      name: b.name,
      address: b.address,
      lat: b.lat ?? undefined,
      lng: b.lng ?? undefined,
    });
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!auth) return;
    if (editingId) {
      await adminUpdateBranch(auth.accessToken, editingId, form);
    } else {
      await adminCreateBranch(auth.accessToken, form);
    }
    setShowForm(false);
    loadBranches();
  }

  async function handleDelete(id: string) {
    if (!auth) return;
    if (!confirm("Filialni o'chirishga ishonchingiz komilmi?")) return;
    await adminDeleteBranch(auth.accessToken, id);
    loadBranches();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground sm:text-2xl">
          Filiallar
        </h1>
        <button
          type="button"
          onClick={startCreate}
          className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          + Yangi filial
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="grid gap-3 rounded-lg border border-border bg-surface p-4 sm:grid-cols-2"
        >
          <input
            required
            placeholder="Filial nomi"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-500"
          />
          <input
            required
            placeholder="Manzil"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-500"
          />
          <input
            type="number"
            step="any"
            placeholder="Kenglik (lat), masalan: 41.2995"
            value={form.lat ?? ""}
            onChange={(e) =>
              setForm({ ...form, lat: e.target.value ? Number(e.target.value) : undefined })
            }
            className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-500"
          />
          <input
            type="number"
            step="any"
            placeholder="Uzunlik (lng), masalan: 69.2401"
            value={form.lng ?? ""}
            onChange={(e) =>
              setForm({ ...form, lng: e.target.value ? Number(e.target.value) : undefined })
            }
            className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-500"
          />
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
      )}

      <ul className="flex flex-col gap-2">
        {branches.map((b) => (
          <li
            key={b.id}
            className="flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-3"
          >
            <span className="text-sm">
              <span className="font-medium text-foreground">{b.name}</span>{" "}
              <span className="text-muted">— {b.address}</span>
            </span>
            <span>
              <a
                href={googleMapsUrl(b)}
                target="_blank"
                rel="noopener noreferrer"
                className="mr-3 inline-flex items-center gap-1 text-sm text-brand-700 hover:underline"
              >
                <MapPin className="h-3.5 w-3.5" />
                Xaritada
              </a>
              <button
                type="button"
                onClick={() => startEdit(b)}
                className="mr-3 text-sm text-brand-700 hover:underline"
              >
                Tahrirlash
              </button>
              <button
                type="button"
                onClick={() => handleDelete(b.id)}
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
