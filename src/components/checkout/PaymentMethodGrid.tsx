"use client";

import { Wallet, CreditCard, ShieldCheck, Check } from "lucide-react";

export type PaymentMethod = "naqd" | "karta" | "payme" | "click";

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

export default function PaymentMethodGrid({
  value,
  onChange,
}: {
  value: PaymentMethod;
  onChange: (value: PaymentMethod) => void;
}) {
  return (
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
            onClick={() => onChange(opt.value)}
            className={`relative flex flex-col items-center gap-2 rounded-xl border px-3 py-3 text-center transition-colors ${
              value === opt.value
                ? "border-brand-500 bg-brand-50/60"
                : "border-border hover:border-brand-200"
            }`}
          >
            {value === opt.value && (
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
  );
}
