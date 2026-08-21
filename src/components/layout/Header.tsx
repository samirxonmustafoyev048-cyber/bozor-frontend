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
import CartSummary from "@/components/cart/CartSummary";
import WishlistIndicator from "@/components/product/WishlistIndicator";
import UserMenu from "@/components/layout/UserMenu";
import { getStoreName, splitStoreName } from "@/lib/store-name";

const navItems = [
  { label: "Aksiyalar", href: "/katalog?chegirma=true", icon: BadgePercent },
  { label: "Yetkazib berish", href: "/yetkazib-berish", icon: Truck },
  { label: "Karyera", href: "/karyera", icon: Briefcase },
  { label: "Biz haqimizda", href: "/haqida", icon: Info },
  { label: "Do'konlar", href: "/filiallar", icon: Store },
  { label: "Yangiliklar", href: "/yangiliklar", icon: Newspaper },
];

export default async function Header() {
  const [firstWord, rest] = splitStoreName(await getStoreName());

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface">
      {/* Main bar */}
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-white">
            <Apple aria-hidden className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-lg font-extrabold leading-none tracking-tight sm:text-xl">
              <span className="text-brand-600">{firstWord}</span>{" "}
              <span className="text-sky-600">{rest}</span>
            </span>
            <span className="hidden text-[10px] text-muted sm:block">
              Toza, sifatli va qulay
            </span>
          </span>
        </Link>

        <Link
          href="/katalog"
          className="hidden shrink-0 items-center gap-1.5 rounded-full bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 sm:flex"
        >
          <LayoutGrid aria-hidden className="h-4 w-4" />
          Kategoriyalar
        </Link>

        <form
          action="/katalog"
          className="flex min-w-0 flex-1 items-center rounded-full border border-border bg-background px-3 py-2 focus-within:border-brand-500"
        >
          <input
            type="search"
            name="q"
            placeholder="Mahsulot yoki kategoriya qidirish..."
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
          <Link
            href="/yetkazib-berish"
            className="hidden items-center gap-2 rounded-lg px-2 py-1 hover:bg-brand-50 xl:flex"
          >
            <Truck aria-hidden className="h-5 w-5 text-brand-600" />
            <span className="text-left">
              <span className="block text-xs font-semibold leading-tight text-foreground">
                Yetkazib berish
              </span>
              <span className="block text-[11px] leading-tight text-muted">
                2 soat ichida
              </span>
            </span>
          </Link>
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
          <CartSummary />
          <UserMenu />
        </div>
      </div>

      {/* Secondary nav */}
      <nav className="hidden border-t border-border md:block">
        {/* Spread across the same width as the bar above, so the row reads as
            part of it rather than a short cluster under the logo. gap-6 is the
            floor, which keeps the links apart on a narrow window too. */}
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 overflow-x-auto px-4 py-2.5 text-sm sm:px-6">
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
        </div>
      </nav>
    </header>
  );
}
