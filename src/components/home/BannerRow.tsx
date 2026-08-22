import BannerCarousel from "@/components/home/BannerCarousel";
import type { Banner } from "@/lib/api";

/**
 * Renders the banners managed in the admin panel. Returns nothing when there
 * are none, so the homepage looks exactly as it does today until an admin
 * actually publishes one.
 */
export default function BannerRow({ banners }: { banners: Banner[] }) {
  if (banners.length === 0) return null;

  return <BannerCarousel banners={banners} />;
}
