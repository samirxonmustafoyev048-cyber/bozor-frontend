"use client";

import { useCallback, useEffect, useState } from "react";
import { Bell, BellOff, CheckCheck, Trash2, Plus } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useAdminBadges } from "@/context/AdminBadgesContext";
import {
  adminCreateNotification,
  adminDeleteNotification,
  adminDeleteReadNotifications,
  adminGetNotifications,
  adminMarkAllNotificationsRead,
  adminMarkNotificationRead,
  type Notification,
} from "@/lib/api";
import { formatRelativeTime } from "@/lib/format";
import Modal from "@/components/admin/Modal";
import ErrorBanner from "@/components/admin/ErrorBanner";
import { errorMessage } from "@/lib/error-message";

const inputClass =
  "rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-500";

export default function AdminNotificationsPage() {
  const { auth } = useAuth();
  const { refresh: refreshBadges } = useAdminBadges();
  const [items, setItems] = useState<Notification[]>([]);
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", body: "" });
  const [error, setError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    if (!auth) return;
    adminGetNotifications(auth.accessToken, { unreadOnly })
      .then(setItems)
      .catch(() => setError("Xabarnomalarni yuklab bo'lmadi"))
      .finally(() => setLoading(false));
  }, [auth, unreadOnly]);

  useEffect(load, [load]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!auth) return;
    setError(null);
    try {
      await adminCreateNotification(auth.accessToken, {
        title: form.title.trim(),
        body: form.body.trim(),
      });
      setForm({ title: "", body: "" });
      setShowForm(false);
      load();
      refreshBadges();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Saqlashda xatolik");
    }
  }

  async function markRead(item: Notification) {
    if (!auth || item.read) return;
    setActionError(null);
    try {
      await adminMarkNotificationRead(auth.accessToken, item.id);
      load();
      refreshBadges();
    } catch (err) {
      setActionError(errorMessage(err));
    }
  }

  async function markAllRead() {
    if (!auth) return;
    setActionError(null);
    try {
      await adminMarkAllNotificationsRead(auth.accessToken);
      load();
      refreshBadges();
    } catch (err) {
      setActionError(errorMessage(err));
    }
  }

  async function remove(item: Notification) {
    if (!auth) return;
    setActionError(null);
    try {
      await adminDeleteNotification(auth.accessToken, item.id);
      load();
      refreshBadges();
    } catch (err) {
      setActionError(errorMessage(err));
    }
  }

  async function clearRead() {
    if (!auth) return;
    if (!confirm("O'qilgan barcha xabarnomalar o'chirilsinmi?")) return;
    setActionError(null);
    try {
      await adminDeleteReadNotifications(auth.accessToken);
      load();
      refreshBadges();
    } catch (err) {
      setActionError(errorMessage(err));
    }
  }

  const unreadCount = items.filter((n) => !n.read).length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-foreground sm:text-2xl">Xabarnomalar</h1>
          <p className="text-sm text-muted">
            Yangi buyurtmalar avtomatik shu yerga tushadi.
            {unreadCount > 0 && ` ${unreadCount} ta o'qilmagan.`}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="flex items-center gap-1.5 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          <Plus aria-hidden className="h-4 w-4" />
          Qo&apos;lda qo&apos;shish
        </button>
      </div>

      <ErrorBanner
        message={actionError}
        onDismiss={() => setActionError(null)}
      />

      <Modal
        open={showForm}
        onClose={() => setShowForm(false)}
        title="Yangi xabarnoma"
        widthClassName="max-w-lg"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            required
            placeholder="Sarlavha"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className={inputClass}
          />
          <textarea
            required
            rows={2}
            placeholder="Xabar matni"
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
            className={inputClass}
          />
          {error && <p className="text-sm text-danger-600">{error}</p>}
          <div className="flex gap-2">
            <button
              type="submit"
              className="rounded-full bg-brand-600 px-6 py-2 text-sm font-semibold text-white hover:bg-brand-700"
            >
              Qo&apos;shish
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

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setUnreadOnly(false)}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
            !unreadOnly ? "bg-brand-600 text-white" : "border border-border text-muted hover:bg-brand-50"
          }`}
        >
          Barchasi
        </button>
        <button
          type="button"
          onClick={() => setUnreadOnly(true)}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
            unreadOnly ? "bg-brand-600 text-white" : "border border-border text-muted hover:bg-brand-50"
          }`}
        >
          O&apos;qilmaganlar
        </button>

        <span className="ml-auto flex gap-2">
          <button
            type="button"
            onClick={markAllRead}
            className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted hover:bg-brand-50 hover:text-brand-700"
          >
            <CheckCheck aria-hidden className="h-3.5 w-3.5" />
            Hammasini o&apos;qilgan deb belgilash
          </button>
          <button
            type="button"
            onClick={clearRead}
            className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-danger-600 hover:bg-danger-500/10"
          >
            <Trash2 aria-hidden className="h-3.5 w-3.5" />
            O&apos;qilganlarni tozalash
          </button>
        </span>
      </div>

      {loading ? (
        <p className="rounded-2xl border border-border bg-surface px-5 py-10 text-center text-sm text-muted">
          Yuklanmoqda...
        </p>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-surface px-5 py-14 text-center">
          <BellOff aria-hidden className="h-8 w-8 text-muted/50" />
          <p className="text-sm text-muted">
            {unreadOnly ? "O'qilmagan xabarnoma yo'q." : "Hozircha xabarnoma yo'q."}
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {items.map((item) => (
            <li
              key={item.id}
              className={`flex items-start gap-3 rounded-2xl border p-4 ${
                item.read
                  ? "border-border bg-surface"
                  : "border-brand-200 bg-brand-50/40"
              }`}
            >
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                  item.read ? "bg-neutral-100 text-muted" : "bg-brand-100 text-brand-600"
                }`}
              >
                <Bell aria-hidden className="h-4 w-4" />
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  {!item.read && (
                    <span className="rounded-full bg-brand-600 px-2 py-0.5 text-[10px] font-bold text-white">
                      Yangi
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-sm text-muted">{item.body}</p>
                <p className="mt-1 text-xs text-muted/70">
                  {formatRelativeTime(item.createdAt)}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                {!item.read && (
                  <button
                    type="button"
                    onClick={() => markRead(item)}
                    className="text-xs font-medium text-brand-700 hover:underline"
                  >
                    O&apos;qildi
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => remove(item)}
                  aria-label="O'chirish"
                  title="O'chirish"
                  className="text-muted hover:text-danger-600"
                >
                  <Trash2 aria-hidden className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
