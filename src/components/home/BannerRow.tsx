import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Banner } from "@/lib/api";

function BannerCard({ banner }: { banner: Banner }) {
  const content = (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={banner.imageUrl}
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <span className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />
      <span className="relative flex h-full flex-col justify-end p-5 sm:p-6">
        <span className="text-lg font-extrabold leading-tight text-white sm:text-xl">
          {banner.title}
        </span>
        {banner.subtitle && (
          <span className="mt-1 text-sm text-white/85">{banner.subtitle}</span>
        )}
        {banner.linkUrl && (
          <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-semibold text-brand-700">
            Ko&apos;rish
            <ArrowRight aria-hidden className="h-3.5 w-3.5" />
          </span>
        )}
      </span>
    </>
  );

  const className =
    "group relative h-44 overflow-hidden rounded-2xl bg-brand-50 sm:h-52";

  return banner.linkUrl ? (
    <Link href={banner.linkUrl} className={className}>
      {content}
    </Link>
  ) : (
    <div className={className}>{content}</div>
  );
}

/**
 * Renders the banners managed in the admin panel. Returns nothing when there
 * are none, so the homepage looks exactly as it does today until an admin
 * actually publishes one.
 */
export default function BannerRow({ banners }: { banners: Banner[] }) {
  if (banners.length === 0) return null;

  return (
    <section
      className={`grid gap-4 ${banners.length === 1 ? "" : "sm:grid-cols-2"}`}
    >
      {banners.map((banner) => (
        <BannerCard key={banner.id} banner={banner} />
      ))}
    </section>
  );
}
