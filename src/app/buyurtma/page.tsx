"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Truck,
  Store,
  Clock,
  Check,
  MapPin,
  Wallet,
  CreditCard,
  ShieldCheck,
  Headset,
  Leaf,
  ChevronDown,
  ArrowRight,
  ShoppingCart,
  Pencil,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { createOrder, getBranches } from "@/lib/api";
import { formatSom } from "@/lib/format";
import DeliveryHero from "@/components/checkout/DeliveryHero";
import type { Branch } from "@/types/product";

type DeliveryType = "yetkazish" | "olib-ketish";
type PaymentMethod = "naqd" | "karta" | "payme" | "click";

const DELIVERY_FEE = 15000;

const PAYMENT_METHOD_MAP: Record<PaymentMethod, "NAQD" | "KARTA" | "PAYME" | "CLICK"> = {
  naqd: "NAQD",
  karta: "KARTA",
  payme: "PAYME",
  click: "CLICK",
};

const paymentOptions: {
  value: PaymentMethod;
  label: string;
  icon?: typeof Wallet;
  letter?: string;
  letterClass?: string;
}[] = [
  { value: "naqd", label: "Naqd pul", icon: Wallet },
  { value: "karta", label: "Bank kartasi", icon: CreditCard },
  { value: "payme", label: "Payme", letter: "P", letterClass: "bg-sky-100 text-sky-600" },
  { value: "click", label: "Click", letter: "C", letterClass: "bg-blue-100 text-blue-600" },
];

const trustBadges = [
  { icon: ShieldCheck, label: "Sifat kafolati" },
  { icon: Headset, label: "24/7 qo'llab-quvvatlash" },
  { icon: Leaf, label: "Tabiatni asraymiz" },
];

const BRANCH_PREVIEW_COUNT = 3;

export default function CheckoutPage() {
  const router = useRouter();
  const { lines, subtotal, isLoaded, clear } = useCart();
  const { auth } = useAuth();

  const [branches, setBranches] = useState<Branch[]>([]);
  const [deliveryType, setDeliveryType] = useState<DeliveryType>("yetkazish");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState(() => auth?.user.phone ?? "");
  const [branchId, setBranchId] = useState("");
  const [showAllBranches, setShowAllBranches] = useState(false);
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
  const visibleBranches = showAllBranches ? branches : branches.slice(0, BRANCH_PREVIEW_COUNT);

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
          <div className="grid gap-4 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setDeliveryType("yetkazish")}
              className={`relative rounded-2xl border p-4 text-left transition-colors ${
                deliveryType === "yetkazish"
                  ? "border-brand-500 bg-brand-50/60"
                  : "border-border bg-surface hover:border-brand-200"
              }`}
            >
              {deliveryType === "yetkazish" && (
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
                <span className="font-bold text-brand-700">{formatSom(DELIVERY_FEE)}</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setDeliveryType("olib-ketish")}
              className={`relative rounded-2xl border p-4 text-left transition-colors ${
                deliveryType === "olib-ketish"
                  ? "border-brand-500 bg-brand-50/60"
                  : "border-border bg-surface hover:border-brand-200"
              }`}
            >
              {deliveryType === "olib-ketish" && (
                <span className="absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-white">
                  <Check aria-hidden className="h-3 w-3" />
                </span>
              )}
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <Store aria-hidden className="h-5 w-5" />
              </span>
              <h2 className="mt-2 font-bold text-foreground">Filialdan olib ketish</h2>
              <p className="mt-1 text-xs text-muted">
                Buyurtma tayyor bo&apos;lgach, yaqin filialdan o&apos;zingiz
                olib ketasiz.
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
            <div className="rounded-2xl border border-border bg-surface p-4">
              <div className="flex items-center justify-between">
                <h2 className="flex items-center gap-1.5 font-bold text-foreground">
                  <MapPin aria-hidden className="h-4 w-4 text-brand-600" />
                  Olib ketish uchun filiallar
                </h2>
                <Link href="/filiallar" className="text-xs font-medium text-brand-700 hover:underline">
                  Xaritada ko&apos;rish →
                </Link>
              </div>
              <div className="mt-3 flex flex-col gap-2">
                {visibleBranches.map((b, i) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setBranchId(b.id)}
                    className={`flex items-center justify-between gap-3 rounded-xl border px-3.5 py-3 text-left text-sm transition-colors ${
                      branchId === b.id
                        ? "border-brand-500 bg-brand-50/60"
                        : "border-border hover:border-brand-200"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <MapPin aria-hidden className="h-4 w-4 shrink-0 text-brand-600" />
                      <span>
                        <span className="flex items-center gap-2">
                          <span className="font-semibold text-foreground">{b.name}</span>
                          {i === 0 && (
                            <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-semibold text-brand-700">
                              Eng yaqin
                            </span>
                          )}
                        </span>
                        <span className="block text-xs text-muted">{b.address}</span>
                      </span>
                    </span>
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                        branchId === b.id
                          ? "border-brand-600 bg-brand-600 text-white"
                          : "border-border"
                      }`}
                    >
                      {branchId === b.id && <Check aria-hidden className="h-3 w-3" />}
                    </span>
                  </button>
                ))}
                {branches.length === 0 && (
                  <p className="text-sm text-muted">Filiallar topilmadi.</p>
                )}
              </div>
              {branches.length > BRANCH_PREVIEW_COUNT && !showAllBranches && (
                <button
                  type="button"
                  onClick={() => setShowAllBranches(true)}
                  className="mt-3 flex w-full items-center justify-center gap-1 text-sm font-medium text-brand-700 hover:underline"
                >
                  Yana {branches.length - BRANCH_PREVIEW_COUNT} ta filialni ko&apos;rish
                  <ChevronDown aria-hidden className="h-4 w-4" />
                </button>
              )}
            </div>
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

          <div className="rounded-2xl border border-border bg-surface p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-foreground">To&apos;lov usullari</h2>
              <span className="flex items-center gap-1 text-xs text-muted">
                <ShieldCheck aria-hidden className="h-3.5 w-3.5 text-brand-600" />
                To&apos;lovlar 100% xavfsiz
              </span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {paymentOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setPayment(opt.value)}
                  className={`relative flex flex-col items-center gap-2 rounded-xl border px-3 py-3 text-center transition-colors ${
                    payment === opt.value
                      ? "border-brand-500 bg-brand-50/60"
                      : "border-border hover:border-brand-200"
                  }`}
                >
                  {payment === opt.value && (
                    <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-brand-600 text-white">
                      <Check aria-hidden className="h-2.5 w-2.5" />
                    </span>
                  )}
                  {opt.icon ? (
                    <opt.icon aria-hidden className="h-5 w-5 text-foreground" />
                  ) : (
                    <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-extrabold ${opt.letterClass}`}>
                      {opt.letter}
                    </span>
                  )}
                  <span className="text-xs font-medium text-foreground">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
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
