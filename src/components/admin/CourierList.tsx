import type { CourierStatus } from "@/lib/api";

const AVATAR_COLORS = [
  "bg-brand-100 text-brand-700",
  "bg-sky-100 text-sky-700",
  "bg-violet-100 text-violet-700",
  "bg-amber-100 text-amber-700",
  "bg-rose-100 text-rose-700",
];

export default function CourierList({
  couriers,
}: {
  couriers: {
    id: string;
    name: string;
    status: CourierStatus;
    efficiencyPercent: number;
    activeOrders: number;
  }[];
}) {
  return (
    <ul className="flex flex-col gap-3">
      {couriers.map((c, i) => {
        const onRoute = c.status === "ONLINE" && c.activeOrders > 0;
        const dotColor = onRoute
          ? "bg-accent-500"
          : c.status === "ONLINE"
            ? "bg-brand-500"
            : "bg-neutral-300";
        const statusLabel = onRoute ? "Yo'lda" : c.status === "ONLINE" ? "Online" : "Offline";

        return (
          <li key={c.id} className="flex items-center gap-3">
            <span
              className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                AVATAR_COLORS[i % AVATAR_COLORS.length]
              }`}
            >
              {c.name.slice(0, 1)}
              <span
                className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-surface ${dotColor}`}
              />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium text-foreground">
                {c.name}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted">
                <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`} />
                {statusLabel}
              </span>
            </span>
            <span className="shrink-0 text-right text-xs">
              <span className="block font-semibold text-foreground">
                {c.activeOrders} ta
              </span>
              <span className="block text-muted">buyurtma</span>
            </span>
            <span className="shrink-0 text-right text-xs">
              <span className="block font-semibold text-brand-600">
                {c.efficiencyPercent}%
              </span>
              <span className="block text-muted">samaradorlik</span>
            </span>
          </li>
        );
      })}
      {couriers.length === 0 && (
        <p className="text-sm text-muted">Kuryerlar mavjud emas.</p>
      )}
    </ul>
  );
}
