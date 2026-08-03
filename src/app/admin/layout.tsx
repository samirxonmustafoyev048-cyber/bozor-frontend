"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { href: "/admin", label: "Bosh sahifa" },
  { href: "/admin/mahsulotlar", label: "Mahsulotlar" },
  { href: "/admin/kategoriyalar", label: "Kategoriyalar" },
  { href: "/admin/buyurtmalar", label: "Buyurtmalar" },
  { href: "/admin/filiallar", label: "Filiallar" },
  { href: "/admin/foydalanuvchilar", label: "Foydalanuvchilar" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { auth, isLoaded } = useAuth();
  const pathname = usePathname();

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
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:flex-row sm:px-6 sm:py-8">
      <aside className="w-full shrink-0 sm:w-48">
        <h2 className="text-lg font-bold text-foreground">Admin panel</h2>
        <nav className="mt-4 flex flex-row flex-wrap gap-1 sm:flex-col">
          {navItems.map((item) => {
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm ${
                  active
                    ? "bg-brand-100 font-medium text-brand-800"
                    : "text-foreground/80 hover:bg-brand-50"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
