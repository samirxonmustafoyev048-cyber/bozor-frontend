"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Apple,
  Home,
  Boxes,
  Grid3x3,
  ClipboardList,
  Store,
  Truck,
  Wallet,
  ScanLine,
  Boxes as BoxesIcon,
  Tag,
  Image as ImageIcon,
  UserCog,
  Shield,
  Settings,
  Bell,
  History,
  type LucideIcon,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
}

export default function AdminSidebar({
  pendingOrders,
  unreadNotifications,
  open,
  onNavigate,
}: {
  pendingOrders: number;
  unreadNotifications: number;
  open: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const { auth } = useAuth();

  const boshqaruv: NavItem[] = [
    { label: "Bosh panel", href: "/admin", icon: Home },
    { label: "Mahsulotlar", href: "/admin/mahsulotlar", icon: Boxes },
    { label: "Kategoriyalar", href: "/admin/kategoriyalar", icon: Grid3x3 },
    {
      label: "Buyurtmalar",
      href: "/admin/buyurtmalar",
      icon: ClipboardList,
      badge: pendingOrders || undefined,
    },
    { label: "Filiallar", href: "/admin/filiallar", icon: Store },
    { label: "Yetkazib berish", href: "/admin/yetkazib-berish", icon: Truck },
    { label: "To'lovlar", href: "/admin/tolovlar", icon: Wallet },
    { label: "Kassa", href: "/kassa", icon: ScanLine },
    { label: "Ombor", href: "/ombor", icon: BoxesIcon },
    { label: "Chegirmalar", href: "/admin/chegirmalar", icon: Tag },
    { label: "Bannerlar", href: "/admin/bannerlar", icon: ImageIcon },
  ];

  const tizim: NavItem[] = [
    { label: "Foydalanuvchilar", href: "/admin/foydalanuvchilar", icon: UserCog },
    { label: "Rollar va ruxsatlar", href: "/admin/rollar", icon: Shield },
    { label: "Sozlamalar", href: "/admin/sozlamalar", icon: Settings },
    {
      label: "Xabarnomalar",
      href: "/admin/xabarnomalar",
      icon: Bell,
      badge: unreadNotifications || undefined,
    },
    { label: "Tizim loglari", href: "/admin/loglar", icon: History },
  ];

  function renderItem(item: NavItem) {
    const active =
      item.href === "/admin"
        ? pathname === "/admin"
        : pathname.startsWith(item.href);

    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={onNavigate}
        className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
          active
            ? "bg-brand-600 text-white"
            : "text-foreground/80 hover:bg-brand-50 hover:text-brand-700"
        }`}
      >
        <item.icon aria-hidden className="h-4 w-4 shrink-0" />
        <span className="flex-1 truncate">{item.label}</span>
        {item.badge ? (
          <span className="rounded-full bg-danger-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
            {item.badge}
          </span>
        ) : null}
      </Link>
    );
  }

  return (
    <aside
      // Sticky and exactly one screen tall, so the menu keeps its own scrollbar
      // instead of growing with the page: on a long report the bottom entries
      // used to sit below the fold, reachable only by scrolling the content.
      className={`fixed inset-y-0 left-0 z-40 flex w-64 shrink-0 flex-col border-r border-border bg-surface transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <Link href="/" className="flex shrink-0 items-center gap-2 px-5 py-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-white">
          <Apple aria-hidden className="h-5 w-5" />
        </span>
        <span className="text-lg font-extrabold tracking-tight">
          <span className="text-brand-600">Olma</span>{" "}
          <span className="text-sky-600">Market</span>
        </span>
      </Link>

      <nav className="flex-1 overflow-y-auto px-3 pb-4">
        <p className="mb-1.5 mt-2 px-3 text-[11px] font-semibold tracking-wide text-muted">
          BOSHQARUV
        </p>
        <div className="flex flex-col gap-0.5">{boshqaruv.map(renderItem)}</div>

        <p className="mb-1.5 mt-5 px-3 text-[11px] font-semibold tracking-wide text-muted">
          TIZIM
        </p>
        <div className="flex flex-col gap-0.5">{tizim.map(renderItem)}</div>
      </nav>

      {auth && (
        <div className="flex shrink-0 items-center gap-2.5 border-t border-border p-4">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
            {auth.user.name.slice(0, 1).toUpperCase()}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold text-foreground">
              {auth.user.name}
            </span>
            <span className="block text-xs text-muted">Super Admin</span>
          </span>
        </div>
      )}
    </aside>
  );
}
