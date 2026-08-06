import { STATUS_COLORS, STATUS_LABELS, STATUS_ORDER } from "@/lib/order-status";
import Donut from "@/components/admin/Donut";
import type { OrderStatus } from "@/types/product";

export default function OrdersDonutChart({
  data,
}: {
  data: { status: OrderStatus; count: number }[];
}) {
  const countByStatus = new Map(data.map((d) => [d.status, d.count]));
  const segments = STATUS_ORDER.map((status) => ({
    key: status,
    label: STATUS_LABELS[status],
    count: countByStatus.get(status) ?? 0,
    color: STATUS_COLORS[status],
  }));

  return (
    <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
      <h3 className="font-bold text-foreground">Buyurtmalar statistikasi</h3>
      <div className="mt-4">
        <Donut segments={segments} />
      </div>
    </div>
  );
}
