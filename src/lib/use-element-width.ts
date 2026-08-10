"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Tracks an element's rendered width in CSS pixels.
 *
 * Charts use this to draw their SVG at 1:1 instead of scaling a fixed viewBox
 * up to the container: a 400-unit viewBox stretched across a full-width admin
 * card is magnified almost 4x, and the axis labels grow with it.
 *
 * Returns 0 until the first measurement, so callers should hold the layout
 * height and skip drawing until it is non-zero.
 */
export function useElementWidth<T extends HTMLElement>(): [RefObject<T | null>, number] {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setWidth(el.clientWidth);
    const observer = new ResizeObserver((entries) =>
      setWidth(entries[0].contentRect.width)
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, width];
}
