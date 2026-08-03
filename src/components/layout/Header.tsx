import Link from "next/link";

const categories = [
  { label: "Sut mahsulotlari", href: "/katalog/sut-mahsulotlari" },
  { label: "Non va nonushta", href: "/katalog/non-va-nonushta" },
  { label: "Go'sht va baliq", href: "/katalog/gosht-va-baliq" },
  { label: "Sabzavot va meva", href: "/katalog/sabzavot-va-meva" },
  { label: "Ichimliklar", href: "/katalog/ichimliklar" },
  { label: "Uy-ro'zg'or", href: "/katalog/uy-rozgor" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface">
      {/* Top bar */}
      <div className="border-b border-border bg-brand-700 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-xs sm:px-6">
          <button
            type="button"
            className="flex items-center gap-1 hover:underline"
          >
            <span aria-hidden>📍</span>
            Filialni tanlang
          </button>
          <nav className="hidden items-center gap-4 sm:flex">
            <Link href="/yetkazib-berish" className="hover:underline">
              Yetkazib berish
            </Link>
            <Link href="/aloqa" className="hover:underline">
              Aloqa
            </Link>
          </nav>
        </div>
      </div>

      {/* Main bar */}
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:gap-6 sm:px-6">
        <Link
          href="/"
          className="shrink-0 text-xl font-extrabold tracking-tight text-brand-700 sm:text-2xl"
        >
          Bozor
        </Link>

        <form
          action="/katalog"
          className="flex min-w-0 flex-1 items-center rounded-full border border-border bg-background px-3 py-2 focus-within:border-brand-500"
        >
          <span aria-hidden className="text-muted">
            🔍
          </span>
          <input
            type="search"
            name="q"
            placeholder="Mahsulot qidirish..."
            className="w-full min-w-0 bg-transparent px-2 text-sm outline-none placeholder:text-muted"
          />
        </form>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <Link
            href="/profil"
            className="flex flex-col items-center rounded-lg px-2 py-1 text-xs text-foreground hover:bg-brand-50"
          >
            <span aria-hidden className="text-lg">
              👤
            </span>
            <span className="hidden sm:inline">Profil</span>
          </Link>
          <Link
            href="/sevimlilar"
            className="flex flex-col items-center rounded-lg px-2 py-1 text-xs text-foreground hover:bg-brand-50"
          >
            <span aria-hidden className="text-lg">
              ♡
            </span>
            <span className="hidden sm:inline">Sevimli</span>
          </Link>
          <Link
            href="/savat"
            className="flex flex-col items-center rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-brand-700"
          >
            <span aria-hidden className="text-lg">
              🛒
            </span>
            <span className="hidden sm:inline">Savat</span>
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
