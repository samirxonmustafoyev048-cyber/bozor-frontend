import Link from "next/link";
import type { Banner } from "@/lib/api";

/**
 * A banner is finished artwork: the headline, the discount and the call to
 * action are already drawn into the image the admin uploads.
 *
 * So it is shown whole — its own proportions, no crop, and nothing painted on
 * top. An earlier version cropped it to a short card and laid a dark gradient
 * and its own heading over it, which buried whatever the designer had put
 * there. The title now describes the image for screen readers instead.
 */
function BannerCard({ banner }: { banner: Banner }) {
  const image = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={banner.imageUrl}
      alt={[banner.title, banner.subtitle].filter(Boolean).join(" — ")}
      loading="lazy"
      decoding="async"
      className="w-full rounded-2xl transition-transform duration-300 group-hover:scale-[1.01]"
    />
  );

  const className = "group block overflow-hidden rounded-2xl";

  return banner.linkUrl ? (
    <Link href={banner.linkUrl} className={className}>
      {image}
    </Link>
  ) : (
    <div className={className}>{image}</div>
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
