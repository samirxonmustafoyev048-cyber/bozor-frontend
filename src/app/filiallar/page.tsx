import type { Metadata } from "next";
import { MapPin, ArrowUpRight, Store, Map } from "lucide-react";
import { getBranches } from "@/lib/api";
import { googleMapsUrl, yandexMapsUrl } from "@/lib/maps";
import type { Branch } from "@/types/product";
import { getStoreName } from "@/lib/store-name";
import { assignBranchPhotos } from "@/lib/branch-photos";

export async function generateMetadata(): Promise<Metadata> {
  const storeName = await getStoreName();
  return {
    title: "Filiallar",
    description:
      `O'zbekiston bo'ylab joylashgan ${storeName} filiallari: manzillar va xaritada yo'nalish.`,
  };
}

// Branch names, addresses and photos are edited from the admin panel, so a
// five-minute window made a fresh edit look like it had not saved. A minute
// keeps the page cheap to serve without that confusion.
export const revalidate = 60;

export default async function BranchesPage() {
  const [branches, storeName] = await Promise.all([
    getBranches({ revalidate: 60 }),
    getStoreName(),
  ]);
  const photos = assignBranchPhotos(branches);

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
      {/* The mock-up sweeps a leaf across the top-right corner; it sits behind
          the cards and never crosses the column the text runs in. */}
      <svg
        aria-hidden
        viewBox="0 0 200 200"
        className="pointer-events-none absolute -right-10 -top-16 hidden h-80 w-80 text-brand-500/25 lg:block"
        fill="none"
      >
        <path
          d="M20 180C20 100 80 30 180 20c10 90-50 150-130 160"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M60 150c30-50 70-80 110-95"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
          Bizning filiallarimiz
        </p>
        <h1 className="mt-2 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
          Sizga eng yaqin {storeName}ni toping
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-white/60">
          O&apos;zbekiston bo&apos;ylab joylashgan {storeName} filiallaridan
          o&apos;zingizga eng qulayini tanlang.
        </p>

        {branches.length === 0 ? (
          <p className="mt-10 rounded-2xl border border-white/10 bg-white/5 px-5 py-12 text-center text-sm text-white/60">
            Filiallar ro&apos;yxati hozircha bo&apos;sh.
          </p>
        ) : (
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {branches.map((branch, i) => (
              <BranchCard key={branch.id} branch={branch} photo={photos[i]} />
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

function BranchCard({ branch, photo }: { branch: Branch; photo: string }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 transition-colors hover:border-white/25">
      {photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photo}
          alt={`${branch.name} binosi`}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        // Most branches have no storefront photo yet. A flat tint read as a
        // loading failure, so the card keeps the same shape with a deliberate
        // pattern behind the shop mark.
        <div className="absolute inset-0 bg-gradient-to-br from-brand-800 to-[#0b2417]">
          <span
            aria-hidden
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.16) 1.2px, transparent 1.2px)",
              backgroundSize: "18px 18px",
            }}
          />
          <span className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 flex-col items-center gap-2">
            <Store aria-hidden className="h-11 w-11 text-white/35" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35">
              Filial
            </span>
          </span>
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
            pinColor="#EA4335"
          />
          <MapLink
            href={yandexMapsUrl(branch)}
            label="Yandex Maps"
            className="border border-white/20 bg-black/40 text-white backdrop-blur-sm hover:bg-black/60"
            pinColor="#FC3F1D"
          />
        </div>
      </div>
    </article>
  );
}

/**
 * The provider's pin, drawn inline. The real logos are trademarked artwork we
 * cannot ship, and loading them from the provider would put an external
 * request on every card — the pin in their colour reads the same at this size.
 */
function ProviderPin({ color }: { color: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0"
      fill="none"
    >
      <circle cx="12" cy="12" r="11" fill="white" />
      <path
        d="M12 5.5c-2.6 0-4.7 2.1-4.7 4.7 0 3.5 4.7 8.3 4.7 8.3s4.7-4.8 4.7-8.3c0-2.6-2.1-4.7-4.7-4.7Z"
        fill={color}
      />
      <circle cx="12" cy="10.2" r="1.7" fill="white" />
    </svg>
  );
}

function MapLink({
  href,
  label,
  className,
  pinColor,
}: {
  href: string;
  label: string;
  className: string;
  pinColor: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${className}`}
    >
      <ProviderPin color={pinColor} />
      {label}
      <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
    </a>
  );
}
