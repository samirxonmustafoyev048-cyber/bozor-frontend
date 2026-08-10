"use client";

import { useState } from "react";
import { formatSom } from "@/lib/format";
import { useElementWidth } from "@/lib/use-element-width";

const HEIGHT = 220;
const PADDING_LEFT = 44;
const PADDING_RIGHT = 16;
const PADDING_BOTTOM = 24;
const PADDING_TOP = 12;

export default function SalesChart({
  data,
  monthLabel,
}: {
  data: { day: number; current: number; previous: number }[];
  monthLabel: string;
}) {
  const [wrapRef, width] = useElementWidth<HTMLDivElement>();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const max = Math.max(...data.map((d) => Math.max(d.current, d.previous)), 1);
  const plotWidth = Math.max(width - PADDING_LEFT - PADDING_RIGHT, 1);
  const plotHeight = HEIGHT - PADDING_TOP - PADDING_BOTTOM;
  const step = data.length > 1 ? plotWidth / (data.length - 1) : 0;

  const xAt = (i: number) => PADDING_LEFT + i * step;
  const yAt = (v: number) => PADDING_TOP + plotHeight - (v / max) * plotHeight;
  const baseline = PADDING_TOP + plotHeight;

  const currentPoints = data.map((d, i) => `${xAt(i)},${yAt(d.current)}`);
  const previousPoints = data.map((d, i) => `${xAt(i)},${yAt(d.previous)}`);
  const areaPath = `M${currentPoints.join(" L")} L${xAt(data.length - 1)},${baseline} L${xAt(0)},${baseline} Z`;

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round(max * f));
  const tickEvery = Math.ceil(data.length / 5);

  function handleMove(e: React.MouseEvent<SVGSVGElement>) {
    if (step === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const i = Math.round((e.clientX - rect.left - PADDING_LEFT) / step);
    setHoverIndex(Math.min(Math.max(i, 0), data.length - 1));
  }

  const hovered = hoverIndex !== null ? data[hoverIndex] : null;

  return (
    <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-bold text-foreground">Savdo statistikasi</h3>
          <p className="text-xs text-muted">{monthLabel}</p>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted">
          <span className="flex items-center gap-1.5">
            <span className="h-0.5 w-4 rounded bg-brand-600" />
            Joriy oy
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-0.5 w-4 rounded border-t-2 border-dashed border-neutral-400" />
            O&apos;tgan oy
          </span>
        </div>
      </div>

      <div ref={wrapRef} className="relative mt-4" style={{ height: HEIGHT }}>
        {width > 0 && (
        <svg
          width={width}
          height={HEIGHT}
          className="touch-none"
          onMouseMove={handleMove}
          onMouseLeave={() => setHoverIndex(null)}
        >
          {yTicks.map((t) => (
            <g key={t}>
              <line
                x1={PADDING_LEFT}
                x2={width - PADDING_RIGHT}
                y1={yAt(t)}
                y2={yAt(t)}
                stroke="var(--color-border)"
                strokeWidth={1}
              />
              <text
                x={PADDING_LEFT - 8}
                y={yAt(t) + 4}
                fontSize={11}
                fill="var(--color-muted)"
                textAnchor="end"
              >
                {t >= 1000000 ? `${Math.round(t / 1000000)}M` : t >= 1000 ? `${Math.round(t / 1000)}k` : t}
              </text>
            </g>
          ))}

          <path d={areaPath} fill="var(--color-brand-500)" opacity={0.08} stroke="none" />
          <polyline
            points={previousPoints.join(" ")}
            fill="none"
            stroke="#a3a3a3"
            strokeWidth={2}
            strokeDasharray="5,4"
          />
          <polyline
            points={currentPoints.join(" ")}
            fill="none"
            stroke="var(--color-brand-600)"
            strokeWidth={2.5}
          />

          {data.map((d, i) =>
            i % tickEvery === 0 ? (
              <text
                key={d.day}
                x={xAt(i)}
                y={HEIGHT - 6}
                fontSize={11}
                fill="var(--color-muted)"
                textAnchor={i === 0 ? "start" : "middle"}
              >
                {d.day}
              </text>
            ) : null
          )}

          {hoverIndex !== null && (
            <g>
              <line
                x1={xAt(hoverIndex)}
                x2={xAt(hoverIndex)}
                y1={PADDING_TOP}
                y2={PADDING_TOP + plotHeight}
                stroke="var(--color-border)"
                strokeWidth={1}
                strokeDasharray="3,3"
              />
              <circle cx={xAt(hoverIndex)} cy={yAt(data[hoverIndex].current)} r={4} fill="var(--color-brand-600)" />
              <circle cx={xAt(hoverIndex)} cy={yAt(data[hoverIndex].previous)} r={3.5} fill="#a3a3a3" />
            </g>
          )}
        </svg>
        )}

        {hovered && hoverIndex !== null && (
          <div
            className="pointer-events-none absolute top-0 rounded-lg border border-border bg-neutral-900 px-3 py-2 text-xs text-white shadow-lg"
            style={{
              left: xAt(hoverIndex),
              transform:
                hoverIndex > data.length / 2
                  ? "translateX(-105%)"
                  : "translateX(8px)",
            }}
          >
            <p className="font-semibold">
              {hovered.day} {monthLabel}
            </p>
            <p className="mt-1 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
              Joriy oy: {formatSom(hovered.current)}
            </p>
            <p className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-400" />
              O&apos;tgan oy: {formatSom(hovered.previous)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
