"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Banner } from "@/lib/api";

/** How long each banner holds before the next one slides in. */
const INTERVAL_MS = 6000;

/**
 * The banners published in the admin panel, shown one at a time.
 *
 * Each image is finished artwork — the headline, the discount and the call to
 * action are drawn into it — so nothing is painted on top and nothing is
 * cropped away: every banner is stored at the same 2:1 shape the slot uses.
 */
export default function BannerCarousel({ banners }: { banners: Banner[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = banners.length;

  const go = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count]
  );

  // Someone reading the banner, or tabbing through its link, should not have
  // it slide out from under them — pausing tears the timer down and resuming
  // starts a fresh full interval.
  useEffect(() => {
    if (count < 2 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = setInterval(() => setIndex((i) => (i + 1) % count), INTERVAL_MS);
    return () => clearInterval(timer);
  }, [count, paused]);

  if (count === 0) return null;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Aksiyalar"
      className="group relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* The slot owns the height; the track fills it absolutely so each slide
          has a real box to size against rather than an automatic one. */}
      <div className="relative aspect-[2/1] w-full overflow-hidden rounded-2xl">
        <div
          className="absolute inset-0 flex transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {banners.map((banner, i) => {
            const image = (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={banner.imageUrl}
                alt={[banner.title, banner.subtitle].filter(Boolean).join(" — ")}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                className="h-full w-full object-cover"
              />
            );
            return (
              <div
                key={banner.id}
                className="h-full w-full shrink-0"
                aria-hidden={i !== index}
              >
                {banner.linkUrl ? (
                  <Link
                    href={banner.linkUrl}
                    className="block h-full w-full"
                    // A slide that is off-screen must not be a tab stop.
                    tabIndex={i === index ? undefined : -1}
                  >
                    {image}
                  </Link>
                ) : (
                  image
                )}
              </div>
            );
          })}
        </div>
      </div>

      {count > 1 && (
        <>
          <Arrow side="left" onClick={() => go(index - 1)} />
          <Arrow side="right" onClick={() => go(index + 1)} />

          <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
            {banners.map((banner, i) => (
              <button
                key={banner.id}
                type="button"
                onClick={() => go(i)}
                aria-label={`${i + 1}-banner`}
                aria-current={i === index}
                className={`h-2 rounded-full transition-all ${
                  i === index
                    ? "w-5 bg-white"
                    : "w-2 bg-white/60 hover:bg-white/90"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

function Arrow({
  side,
  onClick,
}: {
  side: "left" | "right";
  onClick: () => void;
}) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Oldingi banner" : "Keyingi banner"}
      className={`absolute top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-foreground shadow-md backdrop-blur-sm transition-opacity hover:bg-white sm:h-11 sm:w-11
        ${side === "left" ? "left-3" : "right-3"}
        opacity-0 focus-visible:opacity-100 group-hover:opacity-100 sm:opacity-70`}
    >
      <Icon aria-hidden className="h-5 w-5" />
    </button>
  );
}
