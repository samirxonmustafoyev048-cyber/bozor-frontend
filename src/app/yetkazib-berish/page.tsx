"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  MapPin,
  ShieldCheck,
  Headset,
  Leaf,
  ArrowRight,
  ShoppingCart,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { getBranches } from "@/lib/api";
import { formatSom } from "@/lib/format";
import DeliveryHero from "@/components/checkout/DeliveryHero";
import DeliveryMethodCards, {
  DELIVERY_FEE,
  type DeliveryType,
} from "@/components/checkout/DeliveryMethodCards";
import PaymentMethodGrid, { type PaymentMethod } from "@/components/checkout/PaymentMethodGrid";
import BranchList from "@/components/checkout/BranchList";
import type { Branch } from "@/types/product";

const trustBadges = [
  { icon: ShieldCheck, label: "Sifat kafolati" },
  { icon: Headset, label: "24/7 qo'llab-quvvatlash" },
  { icon: Leaf, label: "Tabiatni asraymiz" },
];

export default function DeliveryInfoPage() {
  const { lines, subtotal, isLoaded } = useCart();

  const [branches, setBranches] = useState<Branch[]>([]);
  const [deliveryType, setDeliveryType] = useState<DeliveryType>("yetkazish");
  const [branchId, setBranchId] = useState("");
  const [payment, setPayment] = useState<PaymentMethod>("naqd");

  useEffect(() => {
    getBranches()
      .then((data) => {
        setBranches(data);
        setBranchId((current) => current || data[0]?.id || "");
      })
      .catch(() => {});
  }, []);

  const deliveryFee = deliveryType === "yetkazish" ? DELIVERY_FEE : 0;
  const total = subtotal + deliveryFee;
  const hasItems = isLoaded && lines.length > 0;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      <DeliveryHero />

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="flex flex-col gap-5">
          <DeliveryMethodCards value={deliveryType} onChange={setDeliveryType} />

          {deliveryType === "olib-ketish" && (
            <BranchList branches={branches} value={branchId} onChange={setBranchId} />
          )}

          <PaymentMethodGrid value={payment} onChange={setPayment} />
        </div>

        <aside className="h-fit rounded-2xl border border-border bg-surface p-5">
          <h2 className="flex items-center gap-2 font-bold text-foreground">
            <ShoppingCart aria-hidden className="h-4 w-4 text-brand-600" />
            Buyurtma ma&apos;lumotlari
          </h2>

          {hasItems ? (
            <>
              <p className="text-xs text-muted">{lines.length} ta mahsulot</p>
              <ul className="mt-3 flex flex-col gap-2.5 text-sm">
                {lines.map(({ product, quantity, lineTotal }) => (
                  <li key={product.id} className="flex justify-between gap-2">
                    <span className="text-muted">
                      {product.name}
                      <span className="block text-xs text-muted/70">
                        {product.unit} × {quantity}
                      </span>
                    </span>
                    <span className="shrink-0 font-medium text-foreground">
                      {formatSom(lineTotal)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-col gap-1 border-t border-border pt-4 text-sm">
                <div className="flex justify-between text-muted">
                  <span>Mahsulotlar summasi</span>
                  <span>{formatSom(subtotal)}</span>
                </div>
                <div className="flex justify-between text-muted">
                  <span>Yetkazib berish</span>
                  <span>{deliveryFee ? formatSom(deliveryFee) : "Tekin"}</span>
                </div>
                <div className="mt-2 flex items-center justify-between border-t border-border pt-3">
                  <span className="font-bold text-foreground">Jami to&apos;lov</span>
                  <span className="text-lg font-extrabold text-brand-700">
                    {formatSom(total)}
                  </span>
                </div>
              </div>

              <Link
                href="/buyurtma"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 py-3 text-sm font-semibold text-white hover:bg-brand-700"
              >
                Buyurtmani rasmiylashtirish
                <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
            </>
          ) : (
            <>
              <p className="mt-2 text-sm text-muted">
                Savatingiz hozircha bo&apos;sh. Xarid qilishni boshlang va
                yetkazib berish jarayonini shu yerdan kuzating.
              </p>
              <Link
                href="/katalog"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 py-3 text-sm font-semibold text-white hover:bg-brand-700"
              >
                Xarid qilishni boshlash
                <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
            </>
          )}

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4 text-[11px] text-muted">
            {trustBadges.map((b) => (
              <span key={b.label} className="flex items-center gap-1">
                <b.icon aria-hidden className="h-3.5 w-3.5 text-brand-600" />
                {b.label}
              </span>
            ))}
          </div>
        </aside>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-1.5 font-bold text-foreground">
            <MapPin aria-hidden className="h-4 w-4 text-brand-600" />
            Barcha filiallarimiz
          </h2>
          <Link href="/filiallar" className="text-sm font-medium text-brand-700 hover:underline">
            Xaritada ko&apos;rish →
          </Link>
        </div>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {branches.map((b) => (
            <li
              key={b.id}
              className="flex items-start gap-2 rounded-lg border border-border bg-surface px-4 py-3 text-sm"
            >
              <MapPin aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
              <span>
                <span className="block font-medium text-foreground">{b.name}</span>
                <span className="block text-muted">{b.address}</span>
              </span>
            </li>
          ))}
          {branches.length === 0 && (
            <p className="text-sm text-muted">Filiallar topilmadi.</p>
          )}
        </ul>
      </div>
    </div>
  );
}
