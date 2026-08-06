import type { Metadata } from "next";
import Link from "next/link";
import { Truck, Store, Clock, Wallet, CreditCard, MapPin } from "lucide-react";
import { getBranches } from "@/lib/api";
import { formatSom } from "@/lib/format";

export const metadata: Metadata = {
  title: "Yetkazib berish — Olma Market",
};

export const revalidate = 300;

const DELIVERY_FEE = 15000;

const paymentMethods = [
  { icon: Wallet, label: "Naqd pul" },
  { icon: CreditCard, label: "Bank kartasi" },
  { icon: CreditCard, label: "Payme" },
  { icon: CreditCard, label: "Click" },
];

export default async function DeliveryInfoPage() {
  const branches = await getBranches({ revalidate: 300 });

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
      <h1 className="text-xl font-bold text-foreground sm:text-2xl">
        Yetkazib berish
      </h1>
      <p className="mt-1 text-sm text-muted">
        Buyurtmangizni qanday olishni tanlang — uyingizga yetkazib beramiz
        yoki yaqin filialdan o&apos;zingiz olib ketasiz.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-surface p-5">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
            <Truck aria-hidden className="h-5 w-5" />
          </span>
          <h2 className="mt-3 font-bold text-foreground">
            Manzilga yetkazib berish
          </h2>
          <p className="mt-1 text-sm text-muted">
            Buyurtmangiz ko&apos;rsatgan manzilingizga kuryer orqali
            yetkaziladi.
          </p>
          <dl className="mt-4 flex flex-col gap-2 text-sm">
            <div className="flex items-center justify-between">
              <dt className="flex items-center gap-1.5 text-muted">
                <Clock aria-hidden className="h-4 w-4" />
                Taxminiy vaqt
              </dt>
              <dd className="font-medium text-foreground">~2 soat ichida</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted">Yetkazib berish narxi</dt>
              <dd className="font-medium text-foreground">
                {formatSom(DELIVERY_FEE)}
              </dd>
            </div>
          </dl>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-5">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
            <Store aria-hidden className="h-5 w-5" />
          </span>
          <h2 className="mt-3 font-bold text-foreground">
            Filialdan olib ketish
          </h2>
          <p className="mt-1 text-sm text-muted">
            Buyurtma tayyor bo&apos;lgach, yaqin filialdan o&apos;zingiz
            olib ketasiz.
          </p>
          <dl className="mt-4 flex flex-col gap-2 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-muted">Olib ketish narxi</dt>
              <dd className="font-medium text-brand-600">Tekin</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted">Filiallar soni</dt>
              <dd className="font-medium text-foreground">
                {branches.length} ta
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-surface p-5">
        <h2 className="font-bold text-foreground">To&apos;lov usullari</h2>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {paymentMethods.map((m) => (
            <div
              key={m.label}
              className="flex flex-col items-center gap-2 rounded-xl border border-border p-3 text-center"
            >
              <m.icon aria-hidden className="h-5 w-5 text-brand-600" />
              <span className="text-xs font-medium text-foreground">
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-foreground">
            Olib ketish uchun filiallar
          </h2>
          <Link
            href="/filiallar"
            className="text-sm font-medium text-brand-700 hover:underline"
          >
            Xaritada ko&apos;rish
          </Link>
        </div>
        <ul className="mt-3 flex flex-col gap-2">
          {branches.map((b) => (
            <li
              key={b.id}
              className="flex items-start gap-2 rounded-lg border border-border bg-surface px-4 py-3 text-sm"
            >
              <MapPin aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
              <span>
                <span className="block font-medium text-foreground">
                  {b.name}
                </span>
                <span className="block text-muted">{b.address}</span>
              </span>
            </li>
          ))}
          {branches.length === 0 && (
            <p className="text-sm text-muted">Filiallar topilmadi.</p>
          )}
        </ul>
      </div>

      <div className="mt-8 flex justify-center">
        <Link
          href="/katalog"
          className="rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Xarid qilishni boshlash
        </Link>
      </div>
    </div>
  );
}
