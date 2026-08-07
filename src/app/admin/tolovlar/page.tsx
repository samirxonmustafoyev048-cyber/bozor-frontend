"use client";

import { useEffect, useState } from "react";
import { Wallet2, Clock, XCircle, CreditCard } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { adminGetPayments, type AdminPayments } from "@/lib/api";
import { formatSom } from "@/lib/format";

const PROVIDER_LABELS: Record<string, string> = {
  PAYME: "Payme",
  CLICK: "Click",
};

function stateLabel(state: number): { label: string; color: string } {
  if (state === 2) return { label: "Muvaffaqiyatli", color: "#16a34a" };
  if (state === 1) return { label: "Kutilmoqda", color: "#eb6834" };
  return { label: "Bekor qilindi", color: "#dc2626" };
}

export default function AdminPaymentsPage() {
  const { auth } = useAuth();
  const [data, setData] = useState<AdminPayments | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!auth) return;
    adminGetPayments(auth.accessToken)
      .then(setData)
      .catch(() => setError(true));
  }, [auth]);

  if (error) {
    return <p className="text-danger-600">Ma&apos;lumotlarni yuklab bo&apos;lmadi.</p>;
  }

  if (!data) {
    return <p className="text-muted">Yuklanmoqda...</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold text-foreground sm:text-2xl">
          To&apos;lovlar
        </h1>
        <p className="mt-0.5 text-sm text-muted">
          Payme va Click orqali amalga oshirilgan onlayn to&apos;lov
          tranzaksiyalari
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <div className="rounded-2xl border border-border bg-surface p-5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
            <Wallet2 aria-hidden className="h-5 w-5" />
          </span>
          <p className="mt-3 text-xs text-muted">Jami undirilgan</p>
          <p className="mt-0.5 text-xl font-bold text-foreground">
            {formatSom(data.totalCollected)}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
            <Clock aria-hidden className="h-5 w-5" />
          </span>
          <p className="mt-3 text-xs text-muted">Kutilmoqda</p>
          <p className="mt-0.5 text-xl font-bold text-foreground">
            {data.pendingCount}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-danger-600">
            <XCircle aria-hidden className="h-5 w-5" />
          </span>
          <p className="mt-3 text-xs text-muted">Bekor qilingan</p>
          <p className="mt-0.5 text-xl font-bold text-foreground">
            {data.cancelledCount}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
            <CreditCard aria-hidden className="h-5 w-5" />
          </span>
          <p className="mt-3 text-xs text-muted">Jami tranzaksiyalar</p>
          <p className="mt-0.5 text-xl font-bold text-foreground">
            {data.totalCount}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
        <h2 className="font-bold text-foreground">Tranzaksiyalar tarixi</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted">
                <th className="pb-2 font-medium">Buyurtma</th>
                <th className="pb-2 font-medium">Mijoz</th>
                <th className="pb-2 font-medium">Usul</th>
                <th className="pb-2 font-medium">Summa</th>
                <th className="pb-2 font-medium">Holat</th>
                <th className="pb-2 font-medium">Sana</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {data.payments.map((p) => {
                const s = stateLabel(p.state);
                return (
                  <tr key={p.id}>
                    <td className="py-2.5 font-medium text-foreground">
                      #{p.orderNumber}
                    </td>
                    <td className="py-2.5 text-foreground/80">{p.customerName}</td>
                    <td className="py-2.5 text-foreground/80">
                      {PROVIDER_LABELS[p.provider] ?? p.provider}
                    </td>
                    <td className="py-2.5 font-medium text-foreground">
                      {formatSom(p.amount)}
                    </td>
                    <td className="py-2.5">
                      <span
                        className="rounded-full px-2 py-1 text-xs font-medium"
                        style={{ backgroundColor: `${s.color}1a`, color: s.color }}
                      >
                        {s.label}
                      </span>
                    </td>
                    <td className="py-2.5 whitespace-nowrap text-foreground/80">
                      {new Date(p.createTime).toLocaleDateString("uz-UZ")}{" "}
                      {new Date(p.createTime).toLocaleTimeString("uz-UZ", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                );
              })}
              {data.payments.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-4 text-center text-muted">
                    Hali tranzaksiyalar yo&apos;q.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
