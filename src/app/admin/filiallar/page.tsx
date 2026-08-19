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
import Modal from "@/components/admin/Modal";
import ErrorBanner from "@/components/admin/ErrorBanner";
import RowActions, { rowActionClass } from "@/components/admin/RowActions";
import { errorMessage } from "@/lib/error-message";

const emptyForm: BranchPayload = { name: "", address: "" };

export default function AdminBranchesPage() {
  const { auth } = useAuth();
  const [branches, setBranches] = useState<Branch[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<BranchPayload>(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

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
      imageUrl: b.imageUrl ?? undefined,
      lat: b.lat ?? undefined,
      lng: b.lng ?? undefined,
    });
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!auth) return;
    const payload = { ...form, imageUrl: form.imageUrl?.trim() || undefined };
    setActionError(null);
    try {
      if (editingId) {
        await adminUpdateBranch(auth.accessToken, editingId, payload);
      } else {
        await adminCreateBranch(auth.accessToken, payload);
      }
      setShowForm(false);
      loadBranches();
    } catch (err) {
      setActionError(errorMessage(err));
    }
  }

  async function handleDelete(id: string) {
    if (!auth) return;
    if (!confirm("Filialni o'chirishga ishonchingiz komilmi?")) return;
    setActionError(null);
    try {
      await adminDeleteBranch(auth.accessToken, id);
      loadBranches();
    } catch (err) {
      setActionError(errorMessage(err));
    }
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

      <ErrorBanner
        message={actionError}
        onDismiss={() => setActionError(null)}
      />

      <Modal
        open={showForm}
        onClose={() => setShowForm(false)}
        title={editingId ? "Filialni tahrirlash" : "Yangi filial"}
        widthClassName="max-w-xl"
      >
        <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-2">
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
            placeholder="Bino rasmi manzili (ixtiyoriy)"
            value={form.imageUrl ?? ""}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-500 sm:col-span-2"
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
      </Modal>

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
            <RowActions
              onEdit={() => startEdit(b)}
              onDelete={() => handleDelete(b.id)}
            >
              <a
                href={googleMapsUrl(b)}
                target="_blank"
                rel="noopener noreferrer"
                className={rowActionClass}
              >
                <MapPin aria-hidden className="h-3.5 w-3.5" />
                Xaritada
              </a>
            </RowActions>
          </li>
        ))}
      </ul>
    </div>
  );
}
