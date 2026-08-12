import type { CSSProperties } from "react";

export interface FruitSpec {
  /** Cut out from a studio photo — see scripts note in public/hero. */
  src: string;
  /** Tailwind position + size classes for this piece. */
  className: string;
  /** Drift cycle length; varying it keeps the fruits out of lockstep. */
  duration: string;
  delay: string;
  tilt: string;
}

/**
 * One drifting fruit. Purely decorative, so it is hidden from assistive tech
 * and never intercepts clicks on the banner's button or links.
 */
export default function FloatingFruit({ fruit }: { fruit: FruitSpec }) {
  return (
    <span
      aria-hidden
      className={`hero-float pointer-events-none absolute select-none ${fruit.className}`}
      style={
        {
          "--dur": fruit.duration,
          "--delay": fruit.delay,
          "--tilt": fruit.tilt,
        } as CSSProperties
      }
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={fruit.src}
        alt=""
        loading="lazy"
        className="h-full w-full object-contain drop-shadow-[0_6px_10px_rgba(15,23,42,0.18)]"
      />
    </span>
  );
}
