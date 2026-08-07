"use client";

import { Scooter, Store, TreePine, Package, Clock, Tag, MapPin } from "lucide-react";
import { formatSom } from "@/lib/format";

export type DeliveryType = "yetkazish" | "olib-ketish";

function InfoRow({
  icon: Icon,
  label,
  value,
  valueClassName,
}: {
  icon: typeof Clock;
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="flex items-center justify-between border-t border-border py-2.5 text-sm">
      <span className="flex items-center gap-1.5 text-muted">
        <Icon aria-hidden className="h-4 w-4" />
        {label}
      </span>
      <span className={valueClassName ?? "font-semibold text-foreground"}>{value}</span>
    </div>
  );
}

export default function DeliveryMethodCards({
  value,
  onChange,
  deliveryFee,
  branchesCount,
}: {
  value: DeliveryType;
  onChange: (value: DeliveryType) => void;
  deliveryFee: number;
  branchesCount?: number;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <button
        type="button"
        onClick={() => onChange("yetkazish")}
        className={`relative rounded-2xl border-2 bg-surface p-5 text-left transition-colors ${
          value === "yetkazish"
            ? "border-brand-500 bg-brand-50/40"
            : "border-border hover:border-brand-200"
        }`}
      >
        {value === "yetkazish" && (
          <span className="absolute left-5 top-5 h-3 w-3 rounded-full bg-brand-600 ring-4 ring-brand-100" />
        )}

        <div className="flex items-start gap-4">
          <span className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand-50">
            <Scooter aria-hidden className="h-9 w-9 text-brand-600" />
            <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-md bg-amber-200 text-amber-800">
              <Package aria-hidden className="h-3 w-3" />
            </span>
          </span>

          <div className="min-w-0 pt-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-bold text-foreground">Manzilga yetkazib berish</h2>
              <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-semibold text-brand-700">
                Tavsiya etamiz
              </span>
            </div>
            <p className="mt-1 text-sm text-muted">
              Buyurtmangiz kuryer orqali ko&apos;rsatilgan manzilingizga
              yetkazib beriladi.
            </p>
          </div>
        </div>

        <div className="mt-4">
          <InfoRow icon={Clock} label="Taxminiy vaqt" value="~2 soat ichida" />
          <InfoRow
            icon={Tag}
            label="Yetkazib berish narxi"
            value={formatSom(deliveryFee)}
            valueClassName="font-bold text-brand-700"
          />
        </div>
      </button>

      <button
        type="button"
        onClick={() => onChange("olib-ketish")}
        className={`relative rounded-2xl border-2 bg-surface p-5 text-left transition-colors ${
          value === "olib-ketish"
            ? "border-brand-500 bg-brand-50/40"
            : "border-border hover:border-brand-200"
        }`}
      >
        {value === "olib-ketish" && (
          <span className="absolute left-5 top-5 h-3 w-3 rounded-full bg-brand-600 ring-4 ring-brand-100" />
        )}

        <div className="flex items-start gap-4">
          <span className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-50">
            <Store aria-hidden className="h-9 w-9 text-blue-600" />
            <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-md bg-emerald-200 text-emerald-800">
              <TreePine aria-hidden className="h-3 w-3" />
            </span>
          </span>

          <div className="min-w-0 pt-1">
            <h2 className="font-bold text-foreground">Filialdan olib ketish</h2>
            <p className="mt-1 text-sm text-muted">
              Buyurtma tayyor bo&apos;lgach, yaqin filialdan o&apos;zingiz
              olib ketasiz.
            </p>
          </div>
        </div>

        <div className="mt-4">
          <InfoRow icon={Tag} label="Olib ketish narxi" value="Bepul" valueClassName="font-bold text-brand-700" />
          {typeof branchesCount === "number" && (
            <InfoRow
              icon={MapPin}
              label="Mavjud filiallar"
              value={`${branchesCount} ta`}
              valueClassName="font-bold text-brand-700"
            />
          )}
        </div>
      </button>
    </div>
  );
}
