import { STATUS_COLORS, STATUS_LABELS, STATUS_ORDER } from "@/lib/order-status";
import type { OrderStatus } from "@/types/product";

const SIZE = 180;
const STROKE = 22;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function OrdersDonutChart({
  data,
}: {
  data: { status: OrderStatus; count: number }[];
}) {
  const countByStatus = new Map(data.map((d) => [d.status, d.count]));
  const total = data.reduce((s, d) => s + d.count, 0) || 1;

  const segments = STATUS_ORDER.reduce<
    { status: OrderStatus; count: number; fraction: number; dash: number; offset: number; color: string }[]
  >((acc, status) => {
    const count = countByStatus.get(status) ?? 0;
    const fraction = count / total;
    const dash = fraction * CIRCUMFERENCE;
    const prevOffset = acc.length > 0 ? acc[acc.length - 1].offset + acc[acc.length - 1].dash : 0;
    acc.push({
      status,
      count,
      fraction,
      dash,
      offset: prevOffset,
      color: STATUS_COLORS[status],
    });
    return acc;
  }, []);

  return (
    <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
      <h3 className="font-bold text-foreground">Buyurtmalar statistikasi</h3>

      <div className="mt-4 flex flex-col items-center gap-6 sm:flex-row">
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          width={SIZE}
          height={SIZE}
          className="shrink-0 -rotate-90"
        >
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="var(--color-border)"
            strokeWidth={STROKE}
          />
          {segments
            .filter((s) => s.count > 0)
            .map((s) => (
              <circle
                key={s.status}
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
            Jami
          </text>
        </svg>

        <ul className="flex flex-1 flex-col gap-2.5 text-sm">
          {segments.map((s) => (
            <li key={s.status} className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-foreground/80">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: s.color }}
                />
                {STATUS_LABELS[s.status]}
              </span>
              <span className="font-semibold text-foreground">
                {s.count}{" "}
                <span className="font-normal text-muted">
                  ({Math.round(s.fraction * 100)}%)
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
