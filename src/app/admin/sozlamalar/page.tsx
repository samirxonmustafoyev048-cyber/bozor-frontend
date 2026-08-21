"use client";

import { useEffect, useState } from "react";
import { Save, Check } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
  getSettings,
  adminUpdateSettings,
  type StoreSettings,
} from "@/lib/api";

type FormState = Pick<
  StoreSettings,
  | "storeName"
  | "contactPhone"
  | "contactEmail"
  | "deliveryFee"
  | "telegramUrl"
  | "instagramUrl"
  | "facebookUrl"
>;

const emptyForm: FormState = {
  storeName: "",
  contactPhone: "",
  contactEmail: "",
  deliveryFee: 0,
  telegramUrl: "",
  instagramUrl: "",
  facebookUrl: "",
};

export default function AdminSettingsPage() {
  const { auth } = useAuth();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getSettings()
      .then((s) => {
        setForm({
          storeName: s.storeName,
          contactPhone: s.contactPhone,
          contactEmail: s.contactEmail,
          deliveryFee: s.deliveryFee,
          telegramUrl: s.telegramUrl ?? "",
          instagramUrl: s.instagramUrl ?? "",
          facebookUrl: s.facebookUrl ?? "",
        });
        setLoaded(true);
      })
      .catch(() => setError("Sozlamalarni yuklab bo'lmadi."));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!auth) return;
    setSaving(true);
    setError(null);
    try {
      await adminUpdateSettings(auth.accessToken, form);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      setError("Saqlashda xatolik yuz berdi.");
    } finally {
      setSaving(false);
    }
  }

  if (!loaded) {
    return <p className="text-muted">Yuklanmoqda...</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold text-foreground sm:text-2xl">
          Sozlamalar
        </h1>
        <p className="mt-0.5 text-sm text-muted">
          Do&apos;kon ma&apos;lumotlari va saytda ko&apos;rsatiladigan
          sozlamalarni boshqaring
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-6xl">
        <div className="grid items-start gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
            <h2 className="font-bold text-foreground">
              Do&apos;kon ma&apos;lumotlari
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5 text-sm">
                Do&apos;kon nomi
                <input
                  required
                  value={form.storeName}
                  onChange={(e) =>
                    setForm({ ...form, storeName: e.target.value })
                  }
                  className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-500"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-sm">
                Yetkazib berish narxi (so&apos;m)
                <input
                  required
                  type="number"
                  min={0}
                  value={form.deliveryFee}
                  onChange={(e) =>
                    setForm({ ...form, deliveryFee: Number(e.target.value) })
                  }
                  className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-500"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-sm">
                Aloqa telefoni
                <input
                  required
                  value={form.contactPhone}
                  onChange={(e) =>
                    setForm({ ...form, contactPhone: e.target.value })
                  }
                  className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-500"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-sm">
                Aloqa emaili
                <input
                  required
                  type="email"
                  value={form.contactEmail}
                  onChange={(e) =>
                    setForm({ ...form, contactEmail: e.target.value })
                  }
                  className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-500"
                />
              </label>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
            <h2 className="font-bold text-foreground">Ijtimoiy tarmoqlar</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5 text-sm">
                Telegram
                <input
                  placeholder="https://t.me/..."
                  value={form.telegramUrl ?? ""}
                  onChange={(e) =>
                    setForm({ ...form, telegramUrl: e.target.value })
                  }
                  className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-500"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-sm">
                Instagram
                <input
                  placeholder="https://instagram.com/..."
                  value={form.instagramUrl ?? ""}
                  onChange={(e) =>
                    setForm({ ...form, instagramUrl: e.target.value })
                  }
                  className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-500"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-sm">
                Facebook
                <input
                  placeholder="https://facebook.com/..."
                  value={form.facebookUrl ?? ""}
                  onChange={(e) =>
                    setForm({ ...form, facebookUrl: e.target.value })
                  }
                  className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-500"
                />
              </label>
            </div>
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-danger-600">{error}</p>}

        <div className="mt-6 flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
          >
            {saved ? (
              <>
                <Check aria-hidden className="h-4 w-4" />
                Saqlandi
              </>
            ) : (
              <>
                <Save aria-hidden className="h-4 w-4" />
                {saving ? "Saqlanmoqda..." : "Saqlash"}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
