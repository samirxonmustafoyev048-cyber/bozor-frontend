"use client";

import { useCallback, useEffect, useState } from "react";
import { History, Plus, Pencil, Trash2, RotateCw } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
  adminClearAuditLogs,
  adminGetAuditEntities,
  adminGetAuditLogs,
  type AuditLogEntry,
} from "@/lib/api";
import { formatDateTime, formatRelativeTime } from "@/lib/format";
import ErrorBanner from "@/components/admin/ErrorBanner";
import { errorMessage } from "@/lib/error-message";

const ACTION_STYLE: Record<string, { label: string; className: string; icon: typeof Plus }> = {
  CREATE: {
    label: "Yaratildi",
    className: "bg-brand-100 text-brand-700",
    icon: Plus,
  },
  UPDATE: {
    label: "O'zgartirildi",
    className: "bg-sky-100 text-sky-700",
    icon: Pencil,
  },
  DELETE: {
    label: "O'chirildi",
    className: "bg-danger-500/10 text-danger-600",
    icon: Trash2,
  },
};

/** API path segments are English; the log reads better in Uzbek. */
const ENTITY_LABELS: Record<string, string> = {
  products: "Mahsulotlar",
  categories: "Kategoriyalar",
  orders: "Buyurtmalar",
  branches: "Filiallar",
  users: "Foydalanuvchilar",
  settings: "Sozlamalar",
  "promo-codes": "Chegirmalar",
  banners: "Bannerlar",
  notifications: "Xabarnomalar",
  payments: "To'lovlar",
};

function entityLabel(entity: string) {
  return ENTITY_LABELS[entity] ?? entity;
}

export default function AdminAuditLogPage() {
  const { auth } = useAuth();
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [entities, setEntities] = useState<string[]>([]);
  const [entity, setEntity] = useState("");
  const [action, setAction] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionError, setActionError] = useState<string | null>(null);

  const load = useCallback(() => {
    if (!auth) return;
    adminGetAuditLogs(auth.accessToken, { entity, action })
      .then(setLogs)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [auth, entity, action]);

  useEffect(load, [load]);

  useEffect(() => {
    if (!auth) return;
    adminGetAuditEntities(auth.accessToken)
      .then(setEntities)
      .catch(() => {});
  }, [auth]);

  async function clearAll() {
    if (!auth) return;
    if (!confirm("Barcha loglar o'chirilsinmi? Bu amalni qaytarib bo'lmaydi.")) return;
    setActionError(null);
    try {
      await adminClearAuditLogs(auth.accessToken);
      load();
    } catch (err) {
      setActionError(errorMessage(err));
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-foreground sm:text-2xl">Tizim loglari</h1>
          <p className="text-sm text-muted">
            Tizimda bajarilgan barcha o&apos;zgartirishlar tarixi.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={load}
            className="flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-brand-50"
          >
            <RotateCw aria-hidden className="h-3.5 w-3.5" />
            Yangilash
          </button>
          <button
            type="button"
            onClick={clearAll}
            className="rounded-full border border-border px-4 py-2 text-sm font-medium text-danger-600 hover:bg-danger-500/10"
          >
            Tozalash
          </button>
        </div>
      </div>

      <ErrorBanner
        message={actionError}
        onDismiss={() => setActionError(null)}
      />

      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-surface p-4">
        <label className="flex items-center gap-2 text-xs font-medium text-muted">
          Bo&apos;lim
          <select
            value={entity}
            onChange={(e) => setEntity(e.target.value)}
            className="rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground outline-none focus:border-brand-500"
          >
            <option value="">Barchasi</option>
            {entities.map((name) => (
              <option key={name} value={name}>
                {entityLabel(name)}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2 text-xs font-medium text-muted">
          Amal
          <select
            value={action}
            onChange={(e) => setAction(e.target.value)}
            className="rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground outline-none focus:border-brand-500"
          >
            <option value="">Barchasi</option>
            <option value="CREATE">Yaratildi</option>
            <option value="UPDATE">O&apos;zgartirildi</option>
            <option value="DELETE">O&apos;chirildi</option>
          </select>
        </label>

        <span className="ml-auto text-xs text-muted">{logs.length} ta yozuv</span>
      </div>

      {loading ? (
        <p className="rounded-2xl border border-border bg-surface px-5 py-10 text-center text-sm text-muted">
          Yuklanmoqda...
        </p>
      ) : logs.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-surface px-5 py-14 text-center">
          <History aria-hidden className="h-8 w-8 text-muted/50" />
          <p className="text-sm text-muted">
            Log topilmadi. Admin panelda biror o&apos;zgartirish qilsangiz, u shu
            yerda paydo bo&apos;ladi.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-surface">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted">
                  <th className="px-5 py-3 font-medium">Amal</th>
                  <th className="px-5 py-3 font-medium">Bo&apos;lim</th>
                  <th className="px-5 py-3 font-medium">Obyekt ID</th>
                  <th className="px-5 py-3 font-medium">Kim</th>
                  <th className="px-5 py-3 font-medium">Qachon</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => {
                  const style = ACTION_STYLE[log.action] ?? {
                    label: log.action,
                    className: "bg-neutral-100 text-muted",
                    icon: History,
                  };
                  return (
                    <tr key={log.id} className="border-b border-border last:border-0">
                      <td className="px-5 py-3">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[11px] font-semibold ${style.className}`}
                        >
                          <style.icon aria-hidden className="h-3 w-3" />
                          {style.label}
                        </span>
                      </td>
                      <td className="px-5 py-3 font-medium text-foreground">
                        {entityLabel(log.entity)}
                      </td>
                      <td className="px-5 py-3">
                        {log.entityId ? (
                          <span className="font-mono text-xs text-muted">{log.entityId}</span>
                        ) : (
                          <span className="text-muted">—</span>
                        )}
                      </td>
                      <td className="px-5 py-3 text-muted">{log.actorName}</td>
                      <td className="px-5 py-3 text-muted" title={formatDateTime(log.createdAt)}>
                        {formatRelativeTime(log.createdAt)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
