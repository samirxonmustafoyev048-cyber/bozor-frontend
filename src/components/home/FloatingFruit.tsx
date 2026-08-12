import type { CSSProperties } from "react";

export interface FruitSpec {
  /** Cut out from a studio photo — see public/hero. */
  src: string;
  /** Intrinsic pixel size, so the browser can reserve the box before decoding. */
  width: number;
  height: number;
  /** Tailwind position + size classes for this piece. */
  className: string;
  /** Drift cycle length; varying it keeps the fruits out of lockstep. */
  duration: string;
  delay: string;
  tilt: string;
  /** How far this piece shifts with the pointer. Nearer fruit moves more. */
  depth?: string;
}

/**
 * One drifting fruit. Purely decorative, so it is hidden from assistive tech
 * and never intercepts clicks on the banner's button or links.
 *
 * Two nested spans on purpose: the outer one is offset by the pointer and the
 * inner one runs the drift keyframes. Both effects are transforms, so a single
 * element could only carry one of them.
 */
export default function FloatingFruit({ fruit }: { fruit: FruitSpec }) {
  return (
    <span
      aria-hidden
      className={`hero-parallax pointer-events-none absolute select-none ${fruit.className}`}
      style={{ "--depth": fruit.depth ?? "10px" } as CSSProperties}
    >
      <span
        className="hero-float block"
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
          width={fruit.width}
          height={fruit.height}
          // Above the fold, so lazy-loading would only make them pop in late.
          // Eager but de-prioritised keeps them behind the basket in the queue.
          fetchPriority="low"
          decoding="async"
          className="h-full w-full object-contain drop-shadow-[0_6px_10px_rgba(15,23,42,0.18)]"
        />
      </span>
    </span>
  );
}
