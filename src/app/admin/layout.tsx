"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { adminGetStats, adminGetUnreadCount } from "@/lib/api";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import { AdminBadgesProvider } from "@/context/AdminBadgesContext";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { auth, isLoaded } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  // Also called by pages that change these numbers, so a notification marked
  // read clears its badge without a reload.
  const refreshBadges = useCallback(() => {
    if (!auth) return;
    adminGetStats(auth.accessToken)
      .then((stats) => {
        const pending = stats.ordersByStatus.find(
          (s) => s.status === "QABUL_QILINDI"
        );
        setPendingOrders(pending?.count ?? 0);
      })
      .catch(() => {});
    adminGetUnreadCount(auth.accessToken)
      .then(setUnreadNotifications)
      .catch(() => {});
  }, [auth]);

  useEffect(refreshBadges, [refreshBadges]);

  if (!isLoaded) {
    return null;
  }

  if (!auth || auth.user.role !== "ADMIN") {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-20 text-center sm:px-6">
        <h1 className="text-xl font-bold text-foreground">
          Bu bo&apos;lim faqat administratorlar uchun
        </h1>
        <Link
          href="/kirish"
          className="rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Admin sifatida kirish
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <AdminSidebar
        pendingOrders={pendingOrders}
        unreadNotifications={unreadNotifications}
        open={sidebarOpen}
        onNavigate={() => setSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar
          unreadNotifications={unreadNotifications}
          onMenuClick={() => setSidebarOpen((v) => !v)}
        />
        <main className="min-w-0 flex-1 p-4 sm:p-6">
          <AdminBadgesProvider refresh={refreshBadges}>
            {children}
          </AdminBadgesProvider>
        </main>
      </div>
    </div>
  );
}
