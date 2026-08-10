import Link from "next/link";
import { ChevronRight, type LucideIcon } from "lucide-react";

/**
 * Shared shell for the static information pages linked from the footer
 * (terms, privacy, returns, payment, FAQ) so they read as one family.
 */
export default function InfoPage({
  icon: Icon,
  title,
  intro,
  updatedAt,
  children,
}: {
  icon: LucideIcon;
  title: string;
  intro: string;
  updatedAt?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
      <nav className="flex items-center gap-1 text-xs text-muted">
        <Link href="/" className="hover:text-brand-700">
          Bosh sahifa
        </Link>
        <ChevronRight aria-hidden className="h-3 w-3" />
        <span className="text-foreground">{title}</span>
      </nav>

      <header className="mt-4 flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
          <Icon aria-hidden className="h-6 w-6" />
        </span>
        <div>
          <h1 className="text-2xl font-extrabold text-foreground sm:text-3xl">
            {title}
          </h1>
          <p className="mt-1 text-sm text-muted">{intro}</p>
        </div>
      </header>

      <div className="mt-8 flex flex-col gap-6">{children}</div>

      {updatedAt && (
        <p className="mt-10 border-t border-border pt-4 text-xs text-muted">
          Oxirgi yangilanish: {updatedAt}
        </p>
      )}
    </div>
  );
}

export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
      <h2 className="font-bold text-foreground">{title}</h2>
      <div className="mt-2 flex flex-col gap-2 text-sm leading-relaxed text-muted">
        {children}
      </div>
    </section>
  );
}

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-1.5">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-500" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
