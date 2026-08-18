"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Apple, ScanLine, Boxes, Settings, Store, type LucideIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import UserMenu from "@/components/layout/UserMenu";
import type { Role } from "@/types/product";

interface Panel {
  label: string;
  href: string;
  icon: LucideIcon;
  roles: Role[];
}

/** Only the panels a role may actually open — the same gates the pages enforce. */
const PANELS: Panel[] = [
  { label: "Kassa", href: "/kassa", icon: ScanLine, roles: ["ADMIN", "KASSIR"] },
  { label: "Ombor", href: "/ombor", icon: Boxes, roles: ["ADMIN", "OMBORCHI"] },
  { label: "Admin", href: "/admin", icon: Settings, roles: ["ADMIN"] },
];

/**
 * The staff panels' own navigation. The shop header does not belong here — its
 * search, cart and category links are for customers — but without something in
 * its place a cashier lands on a page with no way out. This is the minimum:
 * where you are, which other panels you may open, and who you are signed in as.
 */
export default function StaffBar() {
  const pathname = usePathname();
  const { auth } = useAuth();

  const panels = auth
    ? PANELS.filter((panel) => panel.roles.includes(auth.user.role))
    : [];

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-white">
            <Apple aria-hidden className="h-4 w-4" />
          </span>
          <span className="hidden text-base font-extrabold leading-none tracking-tight sm:block">
            <span className="text-brand-600">Olma</span>{" "}
            <span className="text-sky-600">Market</span>
          </span>
        </Link>

        <nav aria-label="Xodimlar panellari" className="flex min-w-0 items-center gap-1 overflow-x-auto">
          {panels.map((panel) => {
            const active =
              pathname === panel.href || pathname.startsWith(`${panel.href}/`);
            return (
              <Link
                key={panel.href}
                href={panel.href}
                aria-current={active ? "page" : undefined}
                className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold transition-colors ${
                  active
                    ? "bg-brand-600 text-white"
                    : "text-muted hover:bg-brand-50 hover:text-brand-700"
                }`}
              >
                <panel.icon aria-hidden className="h-4 w-4" />
                {panel.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <Link
            href="/"
            className="hidden items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm font-medium text-foreground hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 sm:flex"
          >
            <Store aria-hidden className="h-4 w-4" />
            Do&apos;kon
          </Link>
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
