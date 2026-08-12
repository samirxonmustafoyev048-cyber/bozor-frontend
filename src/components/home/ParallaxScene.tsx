"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Publishes the pointer's position over the banner as `--px` / `--py`
 * (-1…1, from the centre). Children opt in by reading those variables, so the
 * work here is one listener and two custom properties — the compositor does
 * the rest.
 *
 * Stays inert without a real pointer or when the visitor asked for less
 * motion; in both cases the variables keep their 0 defaults.
 */
export default function ParallaxScene({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }

    let frame = 0;
    let px = 0;
    let py = 0;

    function apply() {
      frame = 0;
      el?.style.setProperty("--px", px.toFixed(3));
      el?.style.setProperty("--py", py.toFixed(3));
    }

    function schedule() {
      // Coalesce bursts of pointer events into one write per frame.
      if (!frame) frame = requestAnimationFrame(apply);
    }

    function onMove(e: PointerEvent) {
      const r = el!.getBoundingClientRect();
      px = ((e.clientX - r.left) / r.width) * 2 - 1;
      py = ((e.clientY - r.top) / r.height) * 2 - 1;
      schedule();
    }

    function onLeave() {
      px = 0;
      py = 0;
      schedule();
    }

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
