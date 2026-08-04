"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CreditCard, CheckCircle2 } from "lucide-react";
import { getOrder, getPaymentLinks, type PaymentLinks } from "@/lib/api";
import type { Order } from "@/types/product";

const PAYMENT_LOGOS: Record<string, string> = {
  PAYME: "Payme",
  CLICK: "Click",
};

function OrderConfirmation() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order") ?? "";

  const [order, setOrder] = useState<Order | null>(null);
  const [links, setLinks] = useState<PaymentLinks | null>(null);

  useEffect(() => {
    if (!orderNumber) return;
    getOrder(orderNumber)
      .then((data) => {
        setOrder(data);
        if (
          (data.paymentMethod === "PAYME" || data.paymentMethod === "CLICK") &&
          !data.paid
        ) {
          getPaymentLinks(data.id).then(setLinks).catch(() => {});
        }
      })
      .catch(() => {});
  }, [orderNumber]);

  const needsOnlinePayment =
    order &&
    (order.paymentMethod === "PAYME" || order.paymentMethod === "CLICK") &&
    !order.paid;

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-20 text-center sm:px-6">
      {needsOnlinePayment ? (
        <CreditCard aria-hidden className="h-16 w-16 text-brand-600" />
      ) : (
        <CheckCircle2 aria-hidden className="h-16 w-16 text-brand-600" />
      )}
      <h1 className="text-2xl font-bold text-foreground">
        {needsOnlinePayment
          ? "Buyurtma qabul qilindi — to'lovni yakunlang"
          : "Buyurtmangiz qabul qilindi!"}
      </h1>
      <p className="text-muted">
        Buyurtma raqami:{" "}
        <span className="font-semibold text-foreground">{orderNumber}</span>
      </p>

      {needsOnlinePayment && links && (
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <a
            href={links.paymeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
          >
            {PAYMENT_LOGOS.PAYME} orqali to&apos;lash
          </a>
          <a
            href={links.clickUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-accent-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-accent-500"
          >
            {PAYMENT_LOGOS.CLICK} orqali to&apos;lash
          </a>
        </div>
      )}

      <p className="text-sm text-muted">
        {needsOnlinePayment
          ? "To'lovni amalga oshirgach, buyurtma holati avtomatik yangilanadi."
          : "Tez orada operatorlarimiz siz bilan bog'lanib, buyurtmani tasdiqlaydi. Buyurtma holatini profilingizdan kuzatishingiz mumkin."}
      </p>

      <div className="mt-4 flex gap-3">
        <Link
          href="/"
          className="rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Bosh sahifaga qaytish
        </Link>
        <Link
          href="/katalog"
          className="rounded-full border border-border px-6 py-2.5 text-sm font-semibold text-foreground hover:bg-brand-50"
        >
          Xaridni davom ettirish
        </Link>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={null}>
      <OrderConfirmation />
    </Suspense>
  );
}
