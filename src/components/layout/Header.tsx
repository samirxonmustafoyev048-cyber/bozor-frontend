import Link from "next/link";
import {
  Leaf,
  Search,
  Heart,
  ShoppingCart,
  BookOpen,
  BadgePercent,
  Truck,
  Briefcase,
  Info,
  Store,
  Newspaper,
} from "lucide-react";
import CartIndicator from "@/components/cart/CartIndicator";
import ProfileLink from "@/components/layout/ProfileLink";
import AdminLink from "@/components/layout/AdminLink";

const categories = [
  { label: "Sut mahsulotlari", href: "/katalog/sut-mahsulotlari" },
  { label: "Non va nonushta", href: "/katalog/non-va-nonushta" },
  { label: "Go'sht va baliq", href: "/katalog/gosht-va-baliq" },
  { label: "Sabzavot va meva", href: "/katalog/sabzavot-va-meva" },
  { label: "Ichimliklar", href: "/katalog/ichimliklar" },
  { label: "Uy-ro'zg'or", href: "/katalog/uy-rozgor" },
];

const navItems = [
  { label: "Katalog", href: "/katalog", icon: BookOpen },
  { label: "Aksiyalar", href: "/katalog?chegirma=true", icon: BadgePercent },
  { label: "Yetkazib berish", href: "/yetkazib-berish", icon: Truck },
  { label: "Karyera", href: "/karyera", icon: Briefcase },
  { label: "Biz haqimizda", href: "/haqida", icon: Info },
  { label: "Do'konlar", href: "/filiallar", icon: Store },
  { label: "Yangiliklar", href: "/yangiliklar", icon: Newspaper },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface">
      {/* Main bar */}
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-white">
            <Leaf aria-hidden className="h-5 w-5" />
          </span>
          <span className="text-lg font-extrabold tracking-tight text-brand-700 sm:text-xl">
            Olma Market
          </span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-0.5 rounded-lg px-2.5 py-1.5 text-center text-[11px] font-medium text-foreground/80 hover:bg-brand-50 hover:text-brand-700"
            >
              <item.icon aria-hidden className="h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center gap-2 lg:hidden">
          <form
            action="/katalog"
            className="flex min-w-0 flex-1 items-center rounded-full border border-border bg-background px-3 py-2 focus-within:border-brand-500"
          >
            <Search aria-hidden className="h-4 w-4 text-muted" />
            <input
              type="search"
              name="q"
              placeholder="Mahsulot qidirish..."
              className="w-full min-w-0 bg-transparent px-2 text-sm outline-none placeholder:text-muted"
            />
          </form>
        </div>

        <div className="hidden shrink-0 lg:block">
          <Link
            href="/katalog"
            aria-label="Qidirish"
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-brand-50"
          >
            <Search aria-hidden className="h-5 w-5 text-foreground" />
          </Link>
        </div>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <AdminLink />
          <ProfileLink />
          <Link
            href="/sevimlilar"
            className="flex flex-col items-center rounded-lg px-2 py-1 text-xs text-foreground hover:bg-brand-50"
          >
            <Heart aria-hidden className="h-5 w-5" />
            <span className="hidden sm:inline">Sevimli</span>
          </Link>
          <Link
            href="/savat"
            className="relative flex flex-col items-center rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-brand-700"
          >
            <ShoppingCart aria-hidden className="h-5 w-5" />
            <span className="hidden sm:inline">Savat</span>
            <CartIndicator />
          </Link>
        </div>
      </div>

      {/* Category nav */}
      <nav className="hidden border-t border-border md:block">
        <div className="mx-auto flex max-w-7xl items-center gap-6 overflow-x-auto px-4 py-2 text-sm sm:px-6">
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="whitespace-nowrap text-foreground/80 hover:text-brand-700"
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
