import Link from "next/link";
import { Eye, Send, Camera, ThumbsUp, Video, Megaphone } from "lucide-react";
import { mostRead, newsCategories, formatViews } from "@/lib/news-data";

export default function NewsSidebar() {
  return (
    <aside className="flex flex-col gap-6">
      <div className="rounded-2xl border border-border bg-surface p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-foreground">
            Eng ko&apos;p o&apos;qilganlar
          </h2>
          <Link href="/yangiliklar" className="text-xs font-medium text-brand-700 hover:underline">
            Barchasi →
          </Link>
        </div>
        <ol className="mt-4 flex flex-col gap-3">
          {mostRead.map((item, i) => (
            <li key={item.id} className="flex items-center gap-3">
              <span className="w-4 text-sm font-bold text-muted">{i + 1}</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.title}
                className="h-11 w-11 shrink-0 rounded-lg object-cover"
              />
              <div className="min-w-0">
                <p className="line-clamp-2 text-xs font-semibold text-foreground">
                  {item.title}
                </p>
                <span className="mt-0.5 flex items-center gap-1 text-[11px] text-muted">
                  <Eye aria-hidden className="h-3 w-3" />
                  {formatViews(item.views)}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-5">
        <h2 className="text-sm font-bold text-foreground">Kategoriyalar</h2>
        <ul className="mt-4 flex flex-col gap-2.5">
          {newsCategories.map((c) => (
            <li key={c.name} className="flex items-center justify-between text-sm">
              <span className="text-foreground/80">{c.name}</span>
              <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand-700">
                {c.count}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl bg-brand-50 p-5">
        <Megaphone aria-hidden className="h-8 w-8 text-brand-600" />
        <h2 className="mt-3 text-sm font-bold text-brand-900">
          Muhim yangiliklarni o&apos;tkazib yubormang!
        </h2>
        <p className="mt-1 text-xs text-brand-800/80">
          Bizning ijtimoiy tarmoqlarimizga obuna bo&apos;ling
        </p>
        <div className="mt-4 flex gap-2">
          {[Send, Camera, ThumbsUp, Video].map((Icon, i) => (
            <a
              key={i}
              href="#"
              aria-label="Ijtimoiy tarmoq"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-600 hover:bg-brand-100"
            >
              <Icon aria-hidden className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
