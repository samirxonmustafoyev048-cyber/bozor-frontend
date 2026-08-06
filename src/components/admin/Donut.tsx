const SIZE = 180;
const STROKE = 22;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export interface DonutSegment {
  key: string;
  label: string;
  count: number;
  color: string;
}

export default function Donut({
  segments,
  centerLabel = "Jami",
}: {
  segments: { key: string; label: string; count: number; color: string }[];
  centerLabel?: string;
}) {
  const total = segments.reduce((s, seg) => s + seg.count, 0) || 1;

  const withGeometry = segments.reduce<
    (DonutSegment & { fraction: number; dash: number; offset: number })[]
  >((acc, seg) => {
    const fraction = seg.count / total;
    const dash = fraction * CIRCUMFERENCE;
    const prevOffset = acc.length > 0 ? acc[acc.length - 1].offset + acc[acc.length - 1].dash : 0;
    acc.push({ ...seg, fraction, dash, offset: prevOffset });
    return acc;
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} width={SIZE} height={SIZE} className="shrink-0 -rotate-90">
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth={STROKE}
        />
        {withGeometry
          .filter((s) => s.count > 0)
          .map((s) => (
            <circle
              key={s.key}
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke={s.color}
              strokeWidth={STROKE}
              strokeDasharray={`${s.dash} ${CIRCUMFERENCE - s.dash}`}
              strokeDashoffset={-s.offset}
            />
          ))}
        <text
          x={SIZE / 2}
          y={SIZE / 2 - 6}
          textAnchor="middle"
          fontSize={26}
          fontWeight={700}
          fill="var(--color-foreground)"
          className="rotate-90"
          style={{ transformOrigin: "center", transformBox: "fill-box" }}
        >
          {total}
        </text>
        <text
          x={SIZE / 2}
          y={SIZE / 2 + 16}
          textAnchor="middle"
          fontSize={12}
          fill="#898781"
          className="rotate-90"
          style={{ transformOrigin: "center", transformBox: "fill-box" }}
        >
          {centerLabel}
        </text>
      </svg>

      <ul className="flex flex-1 flex-col gap-2.5 text-sm">
        {withGeometry.map((s) => (
          <li key={s.key} className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2 text-foreground/80">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: s.color }} />
              {s.label}
            </span>
            <span className="font-semibold text-foreground">
              {s.count} <span className="font-normal text-muted">({Math.round(s.fraction * 100)}%)</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
