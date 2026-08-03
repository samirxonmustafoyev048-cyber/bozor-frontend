"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function OrderConfirmation() {
  const searchParams = useSearchParams();
  const order = searchParams.get("order") ?? "BZR-000000";

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-20 text-center sm:px-6">
      <span aria-hidden className="text-6xl">
        ✅
      </span>
      <h1 className="text-2xl font-bold text-foreground">
        Buyurtmangiz qabul qilindi!
      </h1>
      <p className="text-muted">
        Buyurtma raqami:{" "}
        <span className="font-semibold text-foreground">{order}</span>
      </p>
      <p className="text-sm text-muted">
        Tez orada operatorlarimiz siz bilan bog&apos;lanib, buyurtmani
        tasdiqlaydi. Buyurtma holatini profilingizdan kuzatishingiz mumkin.
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
