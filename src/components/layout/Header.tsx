import Link from "next/link";
import {
  Apple,
  Search,
  Heart,
  ShoppingCart,
  LayoutGrid,
  BadgePercent,
  Truck,
  Briefcase,
  Info,
  Store,
  Newspaper,
} from "lucide-react";
import CartIndicator from "@/components/cart/CartIndicator";
import WishlistIndicator from "@/components/product/WishlistIndicator";
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
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-white">
            <Apple aria-hidden className="h-5 w-5" />
          </span>
          <span className="text-lg font-extrabold tracking-tight sm:text-xl">
            <span className="text-brand-600">Olma</span>{" "}
            <span className="text-sky-600">Market</span>
          </span>
        </Link>

        <Link
          href="/katalog"
          className="hidden shrink-0 items-center gap-1.5 rounded-full bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 sm:flex"
        >
          <LayoutGrid aria-hidden className="h-4 w-4" />
          Katalog
        </Link>

        <form
          action="/katalog"
          className="flex min-w-0 flex-1 items-center rounded-full border border-border bg-background px-3 py-2 focus-within:border-brand-500"
        >
          <input
            type="search"
            name="q"
            placeholder="Mahsulotlarni qidirish..."
            className="w-full min-w-0 bg-transparent px-2 text-sm outline-none placeholder:text-muted"
          />
          <button
            type="submit"
            aria-label="Qidirish"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted hover:bg-brand-50 hover:text-brand-700"
          >
            <Search aria-hidden className="h-4 w-4" />
          </button>
        </form>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <AdminLink />
          <ProfileLink />
          <Link
            href="/sevimlilar"
            className="relative hidden flex-col items-center rounded-lg px-2 py-1 text-xs text-foreground hover:bg-brand-50 sm:flex"
          >
            <Heart aria-hidden className="h-5 w-5" />
            Sevimli
            <WishlistIndicator />
          </Link>
          <Link
            href="/savat"
            className="relative flex flex-col items-center rounded-lg px-2 py-1 text-xs text-foreground hover:bg-brand-50"
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
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-1.5 whitespace-nowrap text-foreground/80 hover:text-brand-700"
            >
              <item.icon aria-hidden className="h-3.5 w-3.5" />
              {item.label}
            </Link>
          ))}
          <span className="h-4 w-px shrink-0 bg-border" />
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
