import Link from "next/link";
import { Send, Camera, ThumbsUp, Heart } from "lucide-react";

const columns = [
  {
    title: "Kompaniya",
    links: [
      { label: "Biz haqimizda", href: "/haqida" },
      { label: "Filiallar", href: "/filiallar" },
      { label: "Vakansiyalar", href: "/vakansiyalar" },
    ],
  },
  {
    title: "Mijozlarga",
    links: [
      { label: "Yetkazib berish shartlari", href: "/yetkazib-berish" },
      { label: "To'lov usullari", href: "/tolov" },
      { label: "Qaytarish siyosati", href: "/qaytarish" },
      { label: "Ko'p so'raladigan savollar", href: "/savollar" },
    ],
  },
  {
    title: "Huquqiy",
    links: [
      { label: "Foydalanish shartlari", href: "/shartlar" },
      { label: "Maxfiylik siyosati", href: "/maxfiylik" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-10 sm:px-6 md:grid-cols-5">
        <div className="col-span-2">
          <span className="text-xl font-extrabold tracking-tight text-brand-700">
            Olma Market
          </span>
          <p className="mt-2 max-w-xs text-sm text-muted">
            Kundalik oziq-ovqat va maishiy mahsulotlarni tez va qulay
            yetkazib berish xizmati.
          </p>
          <div className="mt-4 flex gap-3 text-sm">
            <a
              href="#"
              aria-label="Telegram"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 hover:bg-brand-100"
            >
              <Send className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 hover:bg-brand-100"
            >
              <Camera className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 hover:bg-brand-100"
            >
              <ThumbsUp className="h-4 w-4" />
            </a>
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-semibold text-foreground">
              {col.title}
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-brand-700">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-muted sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} Olma Market. Barcha huquqlar himoyalangan.</p>
          <p className="flex items-center gap-1">
            Ishlab chiqildi O&apos;zbekiston uchun
            <Heart aria-hidden className="h-3.5 w-3.5 fill-current text-brand-600" />
            bilan
          </p>
        </div>
      </div>
    </footer>
  );
}
