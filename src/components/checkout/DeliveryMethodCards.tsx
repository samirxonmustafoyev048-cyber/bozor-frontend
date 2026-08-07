"use client";

import { Truck, Store, Clock, Check } from "lucide-react";
import { formatSom } from "@/lib/format";

export type DeliveryType = "yetkazish" | "olib-ketish";

export default function DeliveryMethodCards({
  value,
  onChange,
  deliveryFee,
}: {
  value: DeliveryType;
  onChange: (value: DeliveryType) => void;
  deliveryFee: number;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <button
        type="button"
        onClick={() => onChange("yetkazish")}
        className={`relative rounded-2xl border p-4 text-left transition-colors ${
          value === "yetkazish"
            ? "border-brand-500 bg-brand-50/60"
            : "border-border bg-surface hover:border-brand-200"
        }`}
      >
        {value === "yetkazish" && (
          <span className="absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-white">
            <Check aria-hidden className="h-3 w-3" />
          </span>
        )}
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
          <Truck aria-hidden className="h-5 w-5" />
        </span>
        <div className="mt-2 flex items-center gap-2">
          <h2 className="font-bold text-foreground">Manzilga yetkazib berish</h2>
          <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-semibold text-brand-700">
            Tavsiya etiladi
          </span>
        </div>
        <p className="mt-1 text-xs text-muted">
          Buyurtmangiz ko&apos;rsatilgan manzilingizga kuryer orqali
          yetkaziladi.
        </p>
        <div className="mt-3 flex items-center justify-between rounded-lg bg-white px-3 py-2 text-xs">
          <span className="flex items-center gap-1.5 text-muted">
            <Clock aria-hidden className="h-3.5 w-3.5" />
            Taxminiy vaqt: <span className="font-semibold text-foreground">1-3 soat</span>
          </span>
          <span className="font-bold text-brand-700">{formatSom(deliveryFee)}</span>
        </div>
      </button>

      <button
        type="button"
        onClick={() => onChange("olib-ketish")}
        className={`relative rounded-2xl border p-4 text-left transition-colors ${
          value === "olib-ketish"
            ? "border-brand-500 bg-brand-50/60"
            : "border-border bg-surface hover:border-brand-200"
        }`}
      >
        {value === "olib-ketish" && (
          <span className="absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-white">
            <Check aria-hidden className="h-3 w-3" />
          </span>
        )}
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
          <Store aria-hidden className="h-5 w-5" />
        </span>
        <h2 className="mt-2 font-bold text-foreground">Filialdan olib ketish</h2>
        <p className="mt-1 text-xs text-muted">
          Buyurtma tayyor bo&apos;lgach, yaqin filialdan o&apos;zingiz olib
          ketasiz.
        </p>
        <div className="mt-3 flex items-center justify-between rounded-lg bg-white px-3 py-2 text-xs">
          <span className="flex items-center gap-1.5 text-muted">
            <Clock aria-hidden className="h-3.5 w-3.5" />
            Tayyor bo&apos;lish vaqti: <span className="font-semibold text-foreground">15-30 daqiqa</span>
          </span>
          <span className="font-bold text-brand-700">Bepul</span>
        </div>
      </button>
    </div>
  );
}
