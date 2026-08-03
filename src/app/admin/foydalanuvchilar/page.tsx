"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { adminGetUsers, type AdminUser } from "@/lib/api";

export default function AdminUsersPage() {
  const { auth } = useAuth();
  const [users, setUsers] = useState<AdminUser[]>([]);

  useEffect(() => {
    if (!auth) return;
    adminGetUsers(auth.accessToken)
      .then(setUsers)
      .catch(() => {});
  }, [auth]);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-bold text-foreground sm:text-2xl">
        Foydalanuvchilar
      </h1>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="min-w-full divide-y divide-border text-sm">
          <thead className="bg-brand-50 text-left">
            <tr>
              <th className="px-3 py-2">Ism</th>
              <th className="px-3 py-2">Telefon</th>
              <th className="px-3 py-2">Email</th>
              <th className="px-3 py-2">Rol</th>
              <th className="px-3 py-2">Buyurtmalar</th>
              <th className="px-3 py-2">Ro&apos;yxatdan o&apos;tgan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {users.map((u) => (
              <tr key={u.id}>
                <td className="px-3 py-2 font-medium text-foreground">
                  {u.name}
                </td>
                <td className="px-3 py-2 text-muted">{u.phone ?? "—"}</td>
                <td className="px-3 py-2 text-muted">{u.email ?? "—"}</td>
                <td className="px-3 py-2">
                  <span
                    className={
                      u.role === "ADMIN"
                        ? "rounded-full bg-brand-100 px-2 py-0.5 text-xs font-medium text-brand-800"
                        : "text-muted"
                    }
                  >
                    {u.role}
                  </span>
                </td>
                <td className="px-3 py-2 text-muted">{u._count.orders}</td>
                <td className="px-3 py-2 text-muted">
                  {new Date(u.createdAt).toLocaleDateString("uz-UZ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
