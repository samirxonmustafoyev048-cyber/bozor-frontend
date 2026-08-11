"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  ChevronDown,
  ClipboardList,
  Heart,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function UserMenu() {
  const { auth, isLoaded, logout } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function handleLogout() {
    setOpen(false);
    logout();
    router.push("/");
  }

  // Auth lives in localStorage, so the server render never knows about it.
  // Showing "Kirish" until hydration keeps both renders identical.
  if (!isLoaded || !auth) {
    return (
      <Link
        href="/kirish"
        className="flex shrink-0 items-center gap-1.5 rounded-full border border-border px-3 py-2 text-sm font-medium text-foreground hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
      >
        <User aria-hidden className="h-4 w-4" />
        <span className="hidden sm:inline">Kirish</span>
      </Link>
    );
  }

  const isAdmin = auth.user.role === "ADMIN";
  const firstName = auth.user.name.split(" ")[0];
  const initial = auth.user.name.slice(0, 1).toUpperCase();

  return (
    <div ref={menuRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={`flex items-center gap-2 rounded-full border py-1.5 pl-1.5 pr-2 transition-colors sm:pr-3 ${
          open
            ? "border-brand-300 bg-brand-50"
            : "border-border hover:border-brand-300 hover:bg-brand-50"
        }`}
      >
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
          {initial}
        </span>
        <span className="hidden max-w-20 truncate text-sm font-medium text-foreground sm:inline">
          {firstName}
        </span>
        <ChevronDown
          aria-hidden
          className={`hidden h-3.5 w-3.5 text-muted transition-transform sm:block ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-60 overflow-hidden rounded-2xl border border-border bg-surface shadow-lg"
        >
          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
              {initial}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold text-foreground">
                {auth.user.name}
              </span>
              <span className="block truncate text-xs text-muted">
                {auth.user.email ?? auth.user.phone ?? "—"}
              </span>
            </span>
          </div>

          {isAdmin && (
            <span className="block bg-brand-50 px-4 py-1.5 text-[11px] font-semibold text-brand-700">
              Administrator
            </span>
          )}

          <div className="flex flex-col py-1">
            <MenuLink href="/profil" icon={User} onNavigate={() => setOpen(false)}>
              Mening profilim
            </MenuLink>
            <MenuLink
              href="/profil"
              icon={ClipboardList}
              onNavigate={() => setOpen(false)}
            >
              Buyurtmalarim
            </MenuLink>
            <MenuLink href="/sevimlilar" icon={Heart} onNavigate={() => setOpen(false)}>
              Sevimlilar
            </MenuLink>
            {isAdmin && (
              <MenuLink href="/admin" icon={Settings} onNavigate={() => setOpen(false)}>
                Admin panel
              </MenuLink>
            )}
          </div>

          <div className="border-t border-border py-1">
            <button
              type="button"
              role="menuitem"
              onClick={handleLogout}
              className="flex w-full items-center gap-2.5 px-4 py-2 text-left text-sm text-danger-600 hover:bg-danger-500/10"
            >
              <LogOut aria-hidden className="h-4 w-4" />
              Chiqish
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function MenuLink({
  href,
  icon: Icon,
  onNavigate,
  children,
}: {
  href: string;
  icon: typeof User;
  onNavigate: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      role="menuitem"
      onClick={onNavigate}
      className="flex items-center gap-2.5 px-4 py-2 text-sm text-foreground hover:bg-brand-50 hover:text-brand-700"
    >
      <Icon aria-hidden className="h-4 w-4 text-muted" />
      {children}
    </Link>
  );
}
