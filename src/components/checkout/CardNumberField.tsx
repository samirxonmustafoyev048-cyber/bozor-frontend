"use client";

import { CreditCard } from "lucide-react";
import {
  CARD_LENGTH,
  cardBrandLabel,
  formatCard,
  isValidCard,
  toCardDigits,
} from "@/lib/card";

/**
 * Card entry shown once "Bank kartasi" is picked — at the till and at
 * checkout alike.
 *
 * Holds the typed digits locally and hands them back through `onChange`; only
 * the caller's last-four slice is ever sent onward. See lib/card.ts for why the
 * full number stays on the device.
 */
export default function CardNumberField({
  value,
  onChange,
  className = "",
}: {
  value: string;
  onChange: (digits: string) => void;
  className?: string;
}) {
  const complete = isValidCard(value);

  return (
    <div className={className}>
      <label className="text-xs font-medium text-muted">
        Karta raqami
        <span
          className={`mt-1 flex items-center rounded-lg border bg-background px-3 py-2 ${
            value.length > 0 && !complete
              ? "border-danger-500 focus-within:border-danger-600"
              : "border-border focus-within:border-brand-500"
          }`}
        >
          <CreditCard aria-hidden className="mr-2 h-4 w-4 shrink-0 text-muted" />
          <input
            inputMode="numeric"
            autoComplete="off"
            value={formatCard(value)}
            onChange={(e) => onChange(toCardDigits(e.target.value))}
            placeholder="8600 0000 0000 0000"
            aria-invalid={value.length > 0 && !complete}
            className="w-full min-w-0 bg-transparent font-mono text-sm tracking-wider outline-none"
          />
        </span>
      </label>

      <p className="mt-1 flex items-center justify-between text-[11px]">
        <span className="font-semibold text-brand-700">
          {value.length >= 4 ? cardBrandLabel(value) : " "}
        </span>
        <span className={complete ? "text-muted" : "text-danger-600"}>
          {value.length}/{CARD_LENGTH}
        </span>
      </p>

      <p className="text-[11px] text-muted/70">
        To&apos;liq raqam saqlanmaydi — faqat oxirgi 4 raqam qoladi.
      </p>
    </div>
  );
}
