"use client";

import { useCallback, useEffect, useState } from "react";
import { Shield, UserCog, Check, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { adminGetUsers, adminUpdateUserRole, type AdminUser } from "@/lib/api";
import { formatDate } from "@/lib/format";
import type { Role } from "@/types/product";

/**
 * The API enforces access with a single ADMIN/USER flag, so this matrix
 * documents what that flag actually unlocks rather than inventing a
 * finer-grained permission model the backend does not have.
 */
const PERMISSIONS: { label: string; user: boolean; admin: boolean }[] = [
  { label: "Katalogni ko'rish va xarid qilish", user: true, admin: true },
  { label: "O'z buyurtmalarini kuzatish", user: true, admin: true },
  { label: "Profilni tahrirlash", user: true, admin: true },
  { label: "Barcha buyurtmalarni ko'rish va holatini o'zgartirish", user: false, admin: true },
  { label: "Mahsulot va kategoriyalarni boshqarish", user: false, admin: true },
  { label: "Filiallar va yetkazib berishni boshqarish", user: false, admin: true },
  { label: "Chegirma va bannerlarni boshqarish", user: false, admin: true },
  { label: "To'lovlarni ko'rish", user: false, admin: true },
  { label: "Foydalanuvchi rollarini o'zgartirish", user: false, admin: true },
  { label: "Tizim loglari va sozlamalar", user: false, admin: true },
];

const ROLE_LABELS: Record<Role, string> = {
  ADMIN: "Administrator",
  USER: "Foydalanuvchi",
};

export default function AdminRolesPage() {
  const { auth } = useAuth();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    if (!auth) return;
    adminGetUsers(auth.accessToken)
      .then(setUsers)
      .catch(() => setError("Foydalanuvchilarni yuklab bo'lmadi"))
      .finally(() => setLoading(false));
  }, [auth]);

  useEffect(load, [load]);

  async function changeRole(user: AdminUser, role: Role) {
    if (!auth || user.role === role) return;
    setError(null);
    setSavingId(user.id);
    try {
      await adminUpdateUserRole(auth.accessToken, user.id, role);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Rolni o'zgartirib bo'lmadi");
    } finally {
      setSavingId(null);
    }
  }

  const adminCount = users.filter((u) => u.role === "ADMIN").length;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold text-foreground sm:text-2xl">
          Rollar va ruxsatlar
        </h1>
        <p className="text-sm text-muted">
          {users.length} ta foydalanuvchi, shundan {adminCount} tasi administrator.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <RoleCard
          icon={Shield}
          title="Administrator"
          description="Admin panelga to'liq kirish huquqi. Barcha ma'lumotlarni ko'radi va o'zgartiradi."
          count={adminCount}
          accent="bg-brand-100 text-brand-600"
        />
        <RoleCard
          icon={UserCog}
          title="Foydalanuvchi"
          description="Oddiy mijoz. Faqat o'z buyurtmalari va profilini boshqaradi."
          count={users.length - adminCount}
          accent="bg-sky-100 text-sky-600"
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-surface">
        <h2 className="border-b border-border px-5 py-4 font-bold text-foreground">
          Ruxsatlar jadvali
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted">
                <th className="px-5 py-3 text-left font-medium">Ruxsat</th>
                <th className="px-5 py-3 text-center font-medium">Foydalanuvchi</th>
                <th className="px-5 py-3 text-center font-medium">Administrator</th>
              </tr>
            </thead>
            <tbody>
              {PERMISSIONS.map((permission) => (
                <tr key={permission.label} className="border-b border-border last:border-0">
                  <td className="px-5 py-3 text-foreground">{permission.label}</td>
                  <td className="px-5 py-3 text-center">
                    <PermissionMark allowed={permission.user} />
                  </td>
                  <td className="px-5 py-3 text-center">
                    <PermissionMark allowed={permission.admin} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {error && (
        <p className="rounded-xl border border-danger-500/30 bg-danger-500/10 px-4 py-3 text-sm text-danger-600">
          {error}
        </p>
      )}

      <div className="overflow-hidden rounded-2xl border border-border bg-surface">
        <h2 className="border-b border-border px-5 py-4 font-bold text-foreground">
          Foydalanuvchilarning rollari
        </h2>

        {loading ? (
          <p className="px-5 py-10 text-center text-sm text-muted">Yuklanmoqda...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted">
                  <th className="px-5 py-3 font-medium">Foydalanuvchi</th>
                  <th className="px-5 py-3 font-medium">Aloqa</th>
                  <th className="px-5 py-3 font-medium">Buyurtmalar</th>
                  <th className="px-5 py-3 font-medium">Ro&apos;yxatdan o&apos;tgan</th>
                  <th className="px-5 py-3 font-medium">Rol</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-border last:border-0">
                    <td className="px-5 py-3">
                      <span className="flex items-center gap-2.5">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
                          {user.name.slice(0, 1).toUpperCase()}
                        </span>
                        <span className="font-medium text-foreground">{user.name}</span>
                        {user.id === auth?.user.id && (
                          <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-semibold text-muted">
                            Siz
                          </span>
                        )}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-muted">
                      {user.email ?? user.phone ?? "—"}
                    </td>
                    <td className="px-5 py-3 text-muted">{user._count.orders} ta</td>
                    <td className="px-5 py-3 text-muted">{formatDate(user.createdAt)}</td>
                    <td className="px-5 py-3">
                      <select
                        value={user.role}
                        disabled={savingId === user.id}
                        onChange={(e) => changeRole(user, e.target.value as Role)}
                        className={`rounded-md border px-2.5 py-1.5 text-xs font-semibold outline-none focus:border-brand-500 disabled:opacity-50 ${
                          user.role === "ADMIN"
                            ? "border-brand-200 bg-brand-50 text-brand-700"
                            : "border-border bg-background text-muted"
                        }`}
                      >
                        <option value="USER">{ROLE_LABELS.USER}</option>
                        <option value="ADMIN">{ROLE_LABELS.ADMIN}</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function RoleCard({
  icon: Icon,
  title,
  description,
  count,
  accent,
}: {
  icon: typeof Shield;
  title: string;
  description: string;
  count: number;
  accent: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <div className="flex items-center gap-3">
        <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${accent}`}>
          <Icon aria-hidden className="h-5 w-5" />
        </span>
        <div>
          <h2 className="font-bold text-foreground">{title}</h2>
          <p className="text-xs text-muted">{count} ta foydalanuvchi</p>
        </div>
      </div>
      <p className="mt-3 text-sm text-muted">{description}</p>
    </div>
  );
}

function PermissionMark({ allowed }: { allowed: boolean }) {
  return allowed ? (
    <Check aria-label="Ruxsat berilgan" className="mx-auto h-4 w-4 text-brand-600" />
  ) : (
    <X aria-label="Ruxsat yo'q" className="mx-auto h-4 w-4 text-muted/40" />
  );
}
