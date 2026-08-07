"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  ShieldCheck,
  Headset,
  Leaf,
  ArrowRight,
  ShoppingCart,
  Pencil,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { createOrder, getBranches } from "@/lib/api";
import { formatSom } from "@/lib/format";
import DeliveryHero from "@/components/checkout/DeliveryHero";
import DeliveryMethodCards, {
  DELIVERY_FEE,
  type DeliveryType,
} from "@/components/checkout/DeliveryMethodCards";
import PaymentMethodGrid, { type PaymentMethod } from "@/components/checkout/PaymentMethodGrid";
import BranchList from "@/components/checkout/BranchList";
import type { Branch } from "@/types/product";

const PAYMENT_METHOD_MAP: Record<PaymentMethod, "NAQD" | "KARTA" | "PAYME" | "CLICK"> = {
  naqd: "NAQD",
  karta: "KARTA",
  payme: "PAYME",
  click: "CLICK",
};

const trustBadges = [
  { icon: ShieldCheck, label: "Sifat kafolati" },
  { icon: Headset, label: "24/7 qo'llab-quvvatlash" },
  { icon: Leaf, label: "Tabiatni asraymiz" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { lines, subtotal, isLoaded, clear } = useCart();
  const { auth } = useAuth();

  const [branches, setBranches] = useState<Branch[]>([]);
  const [deliveryType, setDeliveryType] = useState<DeliveryType>("yetkazish");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState(() => auth?.user.phone ?? "");
  const [branchId, setBranchId] = useState("");
  const [payment, setPayment] = useState<PaymentMethod>("naqd");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getBranches()
      .then((data) => {
        setBranches(data);
        setBranchId((current) => current || data[0]?.id || "");
      })
      .catch(() => setError("Filiallar ro'yxatini yuklab bo'lmadi"));
  }, []);

  const deliveryFee = deliveryType === "yetkazish" ? DELIVERY_FEE : 0;
  const total = subtotal + deliveryFee;

  const canSubmit =
    lines.length > 0 &&
    phone.trim().length > 0 &&
    (deliveryType === "olib-ketish" ? !!branchId : address.trim().length > 0);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);

    try {
      const order = await createOrder(
        {
          deliveryType: deliveryType === "yetkazish" ? "YETKAZISH" : "OLIB_KETISH",
          address: deliveryType === "yetkazish" ? address : undefined,
          branchId: deliveryType === "olib-ketish" ? branchId : undefined,
          phone,
          paymentMethod: PAYMENT_METHOD_MAP[payment],
          items: lines.map((line) => ({
            productId: line.product.id,
            quantity: line.quantity,
          })),
        },
        auth?.accessToken
      );
      clear();
      router.push(`/buyurtma/tasdiqlandi?order=${order.orderNumber}`);
    } catch {
      setError("Buyurtmani yuborishda xatolik yuz berdi. Qayta urinib ko'ring.");
      setSubmitting(false);
    }
  }

  if (isLoaded && lines.length === 0) {
    return (
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 py-20 text-center sm:px-6">
        <h1 className="text-xl font-bold text-foreground">
          Savatingiz bo&apos;sh
        </h1>
        <p className="text-muted">
          Buyurtma berish uchun avval savatga mahsulot qo&apos;shing.
        </p>
        <Link
          href="/katalog"
          className="rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Katalogga o&apos;tish
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      <DeliveryHero />

      <form onSubmit={handleSubmit} className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="flex flex-col gap-5">
          <DeliveryMethodCards value={deliveryType} onChange={setDeliveryType} />

          {deliveryType === "yetkazish" ? (
            <div className="rounded-2xl border border-border bg-surface p-4">
              <label className="text-sm font-semibold text-foreground">
                Yetkazib berish manzili
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="To'liq manzilni kiriting"
                rows={2}
                className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-500"
              />
            </div>
          ) : (
            <BranchList branches={branches} value={branchId} onChange={setBranchId} />
          )}

          <div className="rounded-2xl border border-border bg-surface p-4">
            <label className="text-sm font-semibold text-foreground">
              Aloqa telefon raqami
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+998 90 123 45 67"
              className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-500"
            />
          </div>

          <PaymentMethodGrid value={payment} onChange={setPayment} />
        </div>

        <aside className="h-fit rounded-2xl border border-border bg-surface p-5">
          <h2 className="flex items-center gap-2 font-bold text-foreground">
            <ShoppingCart aria-hidden className="h-4 w-4 text-brand-600" />
            Buyurtma ma&apos;lumotlari
          </h2>
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
              <span className="text-lg font-extrabold text-brand-700">{formatSom(total)}</span>
            </div>
          </div>

          {deliveryType === "yetkazish" && address && (
            <div className="mt-4 flex items-start justify-between gap-2 rounded-lg bg-brand-50 px-3 py-2.5 text-xs">
              <span className="flex items-start gap-1.5 text-brand-900">
                <MapPin aria-hidden className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                {address}
              </span>
              <Pencil aria-hidden className="h-3.5 w-3.5 shrink-0 text-brand-600" />
            </div>
          )}

          {error && <p className="mt-3 text-sm text-danger-600">{error}</p>}

          <button
            type="submit"
            disabled={!canSubmit || submitting}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 py-3 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? "Yuborilmoqda..." : "Buyurtmani rasmiylashtirish"}
            {!submitting && <ArrowRight aria-hidden className="h-4 w-4" />}
          </button>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4 text-[11px] text-muted">
            {trustBadges.map((b) => (
              <span key={b.label} className="flex items-center gap-1">
                <b.icon aria-hidden className="h-3.5 w-3.5 text-brand-600" />
                {b.label}
              </span>
            ))}
          </div>
        </aside>
      </form>
    </div>
  );
}
