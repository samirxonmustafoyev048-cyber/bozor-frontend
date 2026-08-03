"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { branches } from "@/lib/mock/branches";
import { formatSom } from "@/lib/format";

type DeliveryType = "yetkazish" | "olib-ketish";
type PaymentMethod = "naqd" | "karta" | "payme" | "click";

const DELIVERY_FEE = 15000;

function generateOrderNumber(): string {
  return `BZR-${Math.floor(100000 + Math.random() * 900000)}`;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { lines, subtotal, isLoaded, clear } = useCart();

  const [deliveryType, setDeliveryType] = useState<DeliveryType>("yetkazish");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [branchId, setBranchId] = useState(branches[0].id);
  const [payment, setPayment] = useState<PaymentMethod>("naqd");
  const [submitting, setSubmitting] = useState(false);

  const deliveryFee = deliveryType === "yetkazish" ? DELIVERY_FEE : 0;
  const total = subtotal + deliveryFee;

  const canSubmit =
    lines.length > 0 &&
    phone.trim().length > 0 &&
    (deliveryType === "olib-ketish" || address.trim().length > 0);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    const orderNumber = generateOrderNumber();
    clear();
    router.push(`/buyurtma/tasdiqlandi?order=${orderNumber}`);
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
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
      <h1 className="text-xl font-bold text-foreground sm:text-2xl">
        Buyurtmani rasmiylashtirish
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-6 grid gap-8 md:grid-cols-[1fr_320px]"
      >
        <div className="flex flex-col gap-6">
          <fieldset className="rounded-lg border border-border p-4">
            <legend className="px-1 text-sm font-semibold text-foreground">
              Yetkazib berish usuli
            </legend>
            <div className="mt-2 flex flex-col gap-3">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="delivery"
                  checked={deliveryType === "yetkazish"}
                  onChange={() => setDeliveryType("yetkazish")}
                  className="h-4 w-4 text-brand-600 focus:ring-brand-500"
                />
                Manzilga yetkazib berish ({formatSom(DELIVERY_FEE)})
              </label>
              {deliveryType === "yetkazish" && (
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="To'liq manzilni kiriting"
                  rows={2}
                  className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-500"
                />
              )}

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="delivery"
                  checked={deliveryType === "olib-ketish"}
                  onChange={() => setDeliveryType("olib-ketish")}
                  className="h-4 w-4 text-brand-600 focus:ring-brand-500"
                />
                Filialdan olib ketish (tekin)
              </label>
              {deliveryType === "olib-ketish" && (
                <select
                  value={branchId}
                  onChange={(e) => setBranchId(e.target.value)}
                  className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-500"
                >
                  {branches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} — {b.address}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </fieldset>

          <fieldset className="rounded-lg border border-border p-4">
            <legend className="px-1 text-sm font-semibold text-foreground">
              Aloqa telefon raqami
            </legend>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+998 90 123 45 67"
              className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-500"
            />
          </fieldset>

          <fieldset className="rounded-lg border border-border p-4">
            <legend className="px-1 text-sm font-semibold text-foreground">
              To&apos;lov usuli
            </legend>
            <div className="mt-2 grid grid-cols-2 gap-3">
              {(
                [
                  { value: "naqd", label: "Naqd pul" },
                  { value: "karta", label: "Karta orqali" },
                  { value: "payme", label: "Payme" },
                  { value: "click", label: "Click" },
                ] as { value: PaymentMethod; label: string }[]
              ).map((opt) => (
                <label
                  key={opt.value}
                  className={`flex items-center gap-2 rounded-md border px-3 py-2 text-sm ${
                    payment === opt.value
                      ? "border-brand-500 bg-brand-50"
                      : "border-border"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={payment === opt.value}
                    onChange={() => setPayment(opt.value)}
                    className="h-4 w-4 text-brand-600 focus:ring-brand-500"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <aside className="h-fit rounded-lg border border-border bg-surface p-4">
          <h2 className="text-sm font-semibold text-foreground">
            Buyurtma tarkibi
          </h2>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            {lines.map(({ product, quantity, lineTotal }) => (
              <li key={product.id} className="flex justify-between gap-2">
                <span className="text-muted">
                  {product.name} × {quantity}
                </span>
                <span className="shrink-0 font-medium text-foreground">
                  {formatSom(lineTotal)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-col gap-1 border-t border-border pt-4 text-sm">
            <div className="flex justify-between text-muted">
              <span>Mahsulotlar</span>
              <span>{formatSom(subtotal)}</span>
            </div>
            <div className="flex justify-between text-muted">
              <span>Yetkazib berish</span>
              <span>{deliveryFee ? formatSom(deliveryFee) : "Tekin"}</span>
            </div>
            <div className="mt-2 flex justify-between text-base font-bold text-foreground">
              <span>Jami</span>
              <span>{formatSom(total)}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={!canSubmit || submitting}
            className="mt-4 w-full rounded-full bg-brand-600 py-3 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Buyurtmani tasdiqlash
          </button>
        </aside>
      </form>
    </div>
  );
}
