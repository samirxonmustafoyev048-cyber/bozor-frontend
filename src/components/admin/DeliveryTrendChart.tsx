"use client";

import { useState } from "react";
import { useElementWidth } from "@/lib/use-element-width";

const HEIGHT = 170;
const PADDING_LEFT = 34;
const PADDING_RIGHT = 24;
const PADDING_TOP = 12;
const PADDING_BOTTOM = 24;

const UZ_MONTHS = [
  "yan", "fev", "mar", "apr", "may", "iyn",
  "iyl", "avg", "sen", "okt", "noy", "dek",
];

// Dates arrive from the API as plain "YYYY-MM-DD" day keys. Formatting them
// with `new Date(...).toLocaleDateString("uz-UZ", { month: "short" })` is wrong
// twice over: Uzbek CLDR abbreviates months as "M01".."M12", and the bare date
// string parses as UTC midnight so the day can land on the wrong slot. Read the
// parts straight off the string instead.
function formatDayLabel(isoDay: string) {
  const [, month, day] = isoDay.split("-");
  return `${Number(day)} ${UZ_MONTHS[Number(month) - 1] ?? ""}`;
}

export default function DeliveryTrendChart({
  data,
}: {
  data: { date: string; count: number }[];
}) {
  const [wrapRef, width] = useElementWidth<HTMLDivElement>();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const max = Math.max(...data.map((d) => d.count), 4);
  const plotWidth = Math.max(width - PADDING_LEFT - PADDING_RIGHT, 1);
  const plotHeight = HEIGHT - PADDING_TOP - PADDING_BOTTOM;
  const step = data.length > 1 ? plotWidth / (data.length - 1) : 0;

  const xAt = (i: number) => PADDING_LEFT + i * step;
  const yAt = (v: number) => PADDING_TOP + plotHeight - (v / max) * plotHeight;
  const baseline = PADDING_TOP + plotHeight;

  const points = data.map((d, i) => `${xAt(i)},${yAt(d.count)}`);
  const areaPath = `M${points.join(" L")} L${xAt(data.length - 1)},${baseline} L${xAt(0)},${baseline} Z`;

  function handleMove(e: React.MouseEvent<SVGSVGElement>) {
    if (step === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const i = Math.round((e.clientX - rect.left - PADDING_LEFT) / step);
    setHoverIndex(Math.min(Math.max(i, 0), data.length - 1));
  }

  const hovered = hoverIndex !== null ? data[hoverIndex] : null;

  if (data.length === 0) {
    return (
      <div
        className="flex items-center justify-center text-sm text-muted"
        style={{ height: HEIGHT }}
      >
        Hozircha ma&apos;lumot yo&apos;q
      </div>
    );
  }

  return (
    <div ref={wrapRef} className="relative" style={{ height: HEIGHT }}>
      {width > 0 && (
        <svg
          width={width}
          height={HEIGHT}
          className="touch-none"
          onMouseMove={handleMove}
          onMouseLeave={() => setHoverIndex(null)}
        >
          {[0, 0.5, 1].map((f) => (
            <line
              key={f}
              x1={PADDING_LEFT}
              x2={width - PADDING_RIGHT}
              y1={PADDING_TOP + plotHeight * (1 - f)}
              y2={PADDING_TOP + plotHeight * (1 - f)}
              stroke="var(--color-border)"
              strokeWidth={1}
            />
          ))}
          {[0, 0.5, 1].map((f) => (
            <text
              key={f}
              x={PADDING_LEFT - 8}
              y={PADDING_TOP + plotHeight * (1 - f) + 4}
              fontSize={11}
              fill="var(--color-muted)"
              textAnchor="end"
            >
              {Math.round(max * f)}
            </text>
          ))}

          <path d={areaPath} fill="var(--color-brand-500)" opacity={0.12} stroke="none" />
          <polyline
            points={points.join(" ")}
            fill="none"
            stroke="var(--color-brand-600)"
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {data.map((d, i) => (
            <text
              key={d.date}
              x={xAt(i)}
              y={HEIGHT - 6}
              fontSize={11}
              fill="var(--color-muted)"
              // Anchoring the outermost labels inward keeps them from being
              // clipped by the chart's edges.
              textAnchor={i === 0 ? "start" : i === data.length - 1 ? "end" : "middle"}
            >
              {formatDayLabel(d.date)}
            </text>
          ))}

          {hoverIndex !== null && (
            <g>
              <line
                x1={xAt(hoverIndex)}
                x2={xAt(hoverIndex)}
                y1={PADDING_TOP}
                y2={baseline}
                stroke="var(--color-border)"
                strokeDasharray="3,3"
              />
              <circle
                cx={xAt(hoverIndex)}
                cy={yAt(data[hoverIndex].count)}
                r={4}
                fill="var(--color-brand-600)"
              />
            </g>
          )}
        </svg>
      )}

      {hovered && hoverIndex !== null && (
        <div
          className="pointer-events-none absolute top-0 rounded-lg border border-border bg-neutral-900 px-2.5 py-1.5 text-xs text-white shadow-lg"
          style={{
            left: xAt(hoverIndex),
            transform:
              hoverIndex > data.length / 2 ? "translateX(-105%)" : "translateX(8px)",
          }}
        >
          <p className="font-semibold">{formatDayLabel(hovered.date)}</p>
          <p>Yetkazib berildi: {hovered.count} ta</p>
        </div>
      )}
    </div>
  );
}
