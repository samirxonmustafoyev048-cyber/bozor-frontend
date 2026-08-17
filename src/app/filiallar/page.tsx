import type { Metadata } from "next";
import { MapPin, ArrowUpRight, Store, Map } from "lucide-react";
import { getBranches } from "@/lib/api";
import { googleMapsUrl, yandexMapsUrl } from "@/lib/maps";
import type { Branch } from "@/types/product";

export const metadata: Metadata = {
  title: "Filiallar — Olma Market",
  description:
    "O'zbekiston bo'ylab joylashgan Olma Market filiallari: manzillar va xaritada yo'nalish.",
};

// Branch names, addresses and photos are edited from the admin panel, so a
// five-minute window made a fresh edit look like it had not saved. A minute
// keeps the page cheap to serve without that confusion.
export const revalidate = 60;

export default async function BranchesPage() {
  const branches = await getBranches({ revalidate: 60 });

  return (
    <section className="relative overflow-hidden bg-[#0b2417] py-12 sm:py-16">
      {/* Decoration: a leaf swirl in the corner and a faint dot field, both
          well outside the reading area so the copy keeps its contrast. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full bg-brand-500/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-8 top-6 hidden h-20 w-40 lg:block"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.18) 1.4px, transparent 1.4px)",
          backgroundSize: "14px 14px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
          Bizning filiallarimiz
        </p>
        <h1 className="mt-2 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
          Sizga eng yaqin Olma Marketni toping
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-white/60">
          O&apos;zbekiston bo&apos;ylab joylashgan Olma Market filiallaridan
          o&apos;zingizga eng qulayini tanlang.
        </p>

        {branches.length === 0 ? (
          <p className="mt-10 rounded-2xl border border-white/10 bg-white/5 px-5 py-12 text-center text-sm text-white/60">
            Filiallar ro&apos;yxati hozircha bo&apos;sh.
          </p>
        ) : (
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {branches.map((branch) => (
              <BranchCard key={branch.id} branch={branch} />
            ))}
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <a
            href="https://www.google.com/maps/search/?api=1&query=Olma+Market"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Barcha filiallarni xaritada ko&apos;rish
            <Map aria-hidden className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function BranchCard({ branch }: { branch: Branch }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 transition-colors hover:border-white/25">
      {branch.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={branch.imageUrl}
          alt={`${branch.name} binosi`}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        // Until a storefront photo is set in the admin panel, a tinted panel
        // keeps the card's proportions instead of collapsing it.
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-900/70 to-brand-800/40">
          <Store aria-hidden className="h-10 w-10 text-white/25" />
        </div>
      )}

      {/* The copy sits on the photo, so it needs its own floor to stay legible */}
      <span
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/10"
      />

      <div className="relative flex min-h-[19rem] flex-col justify-end p-5 sm:min-h-[21rem]">
        <h2 className="flex items-center gap-2.5 text-lg font-bold text-white sm:text-xl">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-600">
            <MapPin aria-hidden className="h-4 w-4 text-white" />
          </span>
          {branch.name}
        </h2>

        <p className="mt-2 flex items-start gap-1.5 text-sm text-white/75">
          <MapPin aria-hidden className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          {branch.address}
        </p>

        <div className="mt-4 flex flex-wrap gap-2.5">
          <MapLink
            href={googleMapsUrl(branch)}
            label="Google Maps"
            className="bg-brand-600 text-white hover:bg-brand-700"
            dotClassName="bg-white"
          />
          <MapLink
            href={yandexMapsUrl(branch)}
            label="Yandex Maps"
            className="border border-white/20 bg-black/40 text-white backdrop-blur-sm hover:bg-black/60"
            dotClassName="bg-red-500"
          />
        </div>
      </div>
    </article>
  );
}

function MapLink({
  href,
  label,
  className,
  dotClassName,
}: {
  href: string;
  label: string;
  className: string;
  dotClassName: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${className}`}
    >
      {/* Stands in for the provider's logo, which we cannot ship as an asset. */}
      <span
        aria-hidden
        className={`h-2.5 w-2.5 shrink-0 rounded-full ${dotClassName}`}
      />
      {label}
      <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
    </a>
  );
}
