"use client";

import { useRef, useState } from "react";

const WIDTH = 400;
const HEIGHT = 160;
const PADDING_LEFT = 30;
const PADDING_BOTTOM = 20;
const PADDING_TOP = 12;

export default function DeliveryTrendChart({
  data,
}: {
  data: { date: string; count: number }[];
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const max = Math.max(...data.map((d) => d.count), 4);
  const plotWidth = WIDTH - PADDING_LEFT - 8;
  const plotHeight = HEIGHT - PADDING_TOP - PADDING_BOTTOM;
  const step = data.length > 1 ? plotWidth / (data.length - 1) : plotWidth;

  const xAt = (i: number) => PADDING_LEFT + i * step;
  const yAt = (v: number) => PADDING_TOP + plotHeight - (v / max) * plotHeight;

  const points = data.map((d, i) => `${xAt(i)},${yAt(d.count)}`);
  const areaPath = `M${points.join(" L")} L${xAt(data.length - 1)},${PADDING_TOP + plotHeight} L${xAt(0)},${PADDING_TOP + plotHeight} Z`;

  function handleMove(e: React.MouseEvent<SVGSVGElement>) {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const relX = ((e.clientX - rect.left) / rect.width) * WIDTH;
    const i = Math.round((relX - PADDING_LEFT) / step);
    setHoverIndex(Math.min(Math.max(i, 0), data.length - 1));
  }

  const hovered = hoverIndex !== null ? data[hoverIndex] : null;

  return (
    <div className="relative">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full touch-none"
        onMouseMove={handleMove}
        onMouseLeave={() => setHoverIndex(null)}
      >
        {[0, 0.5, 1].map((f) => (
          <line
            key={f}
            x1={PADDING_LEFT}
            x2={WIDTH}
            y1={PADDING_TOP + plotHeight * (1 - f)}
            y2={PADDING_TOP + plotHeight * (1 - f)}
            stroke="var(--color-border)"
            strokeWidth={1}
          />
        ))}
        {[0, 0.5, 1].map((f) => (
          <text
            key={f}
            x={0}
            y={PADDING_TOP + plotHeight * (1 - f) + 3}
            fontSize={9}
            fill="#898781"
          >
            {Math.round(max * f)}
          </text>
        ))}

        <path d={areaPath} fill="var(--color-brand-500)" opacity={0.1} stroke="none" />
        <polyline
          points={points.join(" ")}
          fill="none"
          stroke="var(--color-brand-600)"
          strokeWidth={2.5}
        />

        {data.map((d, i) => (
          <text
            key={d.date}
            x={xAt(i)}
            y={HEIGHT - 4}
            fontSize={9}
            fill="#898781"
            textAnchor="middle"
          >
            {new Date(d.date).getDate()}{" "}
            {new Date(d.date).toLocaleDateString("uz-UZ", { month: "short" })}
          </text>
        ))}

        {hoverIndex !== null && (
          <g>
            <line
              x1={xAt(hoverIndex)}
              x2={xAt(hoverIndex)}
              y1={PADDING_TOP}
              y2={PADDING_TOP + plotHeight}
              stroke="var(--color-border)"
              strokeDasharray="3,3"
            />
            <circle cx={xAt(hoverIndex)} cy={yAt(data[hoverIndex].count)} r={4} fill="var(--color-brand-600)" />
          </g>
        )}
      </svg>

      {hovered && hoverIndex !== null && (
        <div
          className="pointer-events-none absolute top-0 rounded-lg border border-border bg-neutral-900 px-2.5 py-1.5 text-xs text-white shadow-lg"
          style={{
            left: `${(xAt(hoverIndex) / WIDTH) * 100}%`,
            transform:
              hoverIndex > data.length / 2 ? "translateX(-105%)" : "translateX(8px)",
          }}
        >
          <p className="font-semibold">
            {new Date(hovered.date).getDate()}{" "}
            {new Date(hovered.date).toLocaleDateString("uz-UZ", { month: "short" })}
          </p>
          <p>Yetkazib berildi: {hovered.count} ta</p>
        </div>
      )}
    </div>
  );
}
