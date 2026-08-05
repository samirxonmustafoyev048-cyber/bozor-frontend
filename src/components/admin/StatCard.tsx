import { TrendingUp, TrendingDown, type LucideIcon } from "lucide-react";
import Sparkline from "@/components/admin/Sparkline";

export default function StatCard({
  icon: Icon,
  iconBg,
  iconColor,
  label,
  value,
  trend,
  sparkline,
  sparklineColor,
}: {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  label: string;
  value: string;
  trend: number;
  sparkline: number[];
  sparklineColor: string;
}) {
  const isUp = trend >= 0;
  const TrendIcon = isUp ? TrendingUp : TrendingDown;

  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <div className="flex items-start justify-between">
        <div>
          <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}>
            <Icon aria-hidden className="h-5 w-5" />
          </span>
          <p className="mt-3 text-xs text-muted">{label}</p>
          <p className="mt-0.5 text-xl font-bold text-foreground">{value}</p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between gap-2">
        <span
          className={`inline-flex items-center gap-1 text-xs font-semibold ${
            isUp ? "text-brand-600" : "text-danger-600"
          }`}
        >
          <TrendIcon aria-hidden className="h-3.5 w-3.5" />
          {Math.abs(trend)}%
          <span className="font-normal text-muted">oldingi 14 kunga nisbatan</span>
        </span>
        <Sparkline data={sparkline} color={sparklineColor} className="h-8 w-16 shrink-0" />
      </div>
    </div>
  );
}
