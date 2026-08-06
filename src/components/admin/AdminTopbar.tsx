"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Search, Bell, Maximize, ChevronDown, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const TITLES: Record<string, string> = {
  "/admin": "Bosh panel",
  "/admin/mahsulotlar": "Mahsulotlar",
  "/admin/kategoriyalar": "Kategoriyalar",
  "/admin/buyurtmalar": "Buyurtmalar",
  "/admin/filiallar": "Filiallar",
  "/admin/foydalanuvchilar": "Foydalanuvchilar",
  "/admin/yetkazib-berish": "Yetkazib berish",
};

export default function AdminTopbar({
  pendingOrders,
  onMenuClick,
}: {
  pendingOrders: number;
  onMenuClick: () => void;
}) {
  const pathname = usePathname();
  const { auth, logout } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const title =
    TITLES[pathname] ??
    Object.entries(TITLES).find(([href]) => pathname.startsWith(href))?.[1] ??
    "Admin panel";

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  function toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  }

  function handleLogout() {
    logout();
    router.push("/kirish");
  }

  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-surface px-4 py-3 sm:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Menyu"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg hover:bg-brand-50 lg:hidden"
      >
        <Menu aria-hidden className="h-5 w-5" />
      </button>

      <h1 className="hidden shrink-0 text-lg font-bold text-foreground sm:block">
        {title}
      </h1>

      <div className="ml-auto flex min-w-0 flex-1 items-center justify-end gap-2 sm:gap-3">
        <div className="hidden min-w-0 max-w-xs flex-1 items-center gap-2 rounded-full border border-border bg-background px-3 py-2 sm:flex">
          <Search aria-hidden className="h-4 w-4 shrink-0 text-muted" />
          <input
            type="search"
            placeholder="Qidirish..."
            className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-muted"
          />
          <kbd className="hidden shrink-0 rounded border border-border px-1.5 py-0.5 text-[10px] text-muted md:inline">
            ⌘K
          </kbd>
        </div>

        <button
          type="button"
          aria-label="Xabarnomalar"
          className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg hover:bg-brand-50"
        >
          <Bell aria-hidden className="h-5 w-5 text-foreground/80" />
          {pendingOrders > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger-500 px-1 text-[10px] font-bold text-white">
              {pendingOrders > 99 ? "99+" : pendingOrders}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={toggleFullscreen}
          aria-label="To'liq ekran"
          className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg hover:bg-brand-50 sm:flex"
        >
          <Maximize aria-hidden className="h-5 w-5 text-foreground/80" />
        </button>

        {auth && (
          <div ref={menuRef} className="relative shrink-0">
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="flex items-center gap-1.5 rounded-full py-1 pl-1 pr-2 hover:bg-brand-50"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                {auth.user.name.slice(0, 1).toUpperCase()}
              </span>
              <ChevronDown aria-hidden className="h-4 w-4 text-muted" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg border border-border bg-surface py-1 shadow-lg">
                <div className="px-3 py-2 text-sm">
                  <p className="font-semibold text-foreground">{auth.user.name}</p>
                  <p className="text-xs text-muted">Super Admin</p>
                </div>
                <div className="my-1 border-t border-border" />
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-danger-600 hover:bg-danger-50"
                >
                  <LogOut aria-hidden className="h-4 w-4" />
                  Chiqish
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
