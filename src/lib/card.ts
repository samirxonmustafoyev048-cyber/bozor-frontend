/**
 * Card entry helpers for the till.
 *
 * Only the last four digits ever leave this module — a full PAN is never sent
 * to the API or stored, which is both the PCI rule and simply unnecessary: the
 * money moves through the payment terminal, and four digits are enough to tie
 * a receipt back to a terminal slip.
 */

export const CARD_LENGTH = 16;

export type CardBrand = "UZCARD" | "HUMO" | "VISA" | "MASTERCARD" | "UNKNOWN";

const BRAND_LABELS: Record<CardBrand, string> = {
  UZCARD: "Uzcard",
  HUMO: "Humo",
  VISA: "Visa",
  MASTERCARD: "Mastercard",
  UNKNOWN: "Karta",
};

/** Keeps only digits and caps the length — safe to run on every keystroke. */
export function toCardDigits(value: string): string {
  return value.replace(/\D/g, "").slice(0, CARD_LENGTH);
}

/** "8600123456789012" -> "8600 1234 5678 9012" */
export function formatCard(digits: string): string {
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

export function cardBrand(digits: string): CardBrand {
  if (digits.startsWith("8600")) return "UZCARD";
  if (digits.startsWith("9860")) return "HUMO";
  if (digits.startsWith("4")) return "VISA";
  if (/^5[1-5]/.test(digits)) return "MASTERCARD";
  return "UNKNOWN";
}

export function cardBrandLabel(digits: string): string {
  return BRAND_LABELS[cardBrand(digits)];
}

export function isValidCard(digits: string): boolean {
  return digits.length === CARD_LENGTH;
}

export function cardLast4(digits: string): string {
  return digits.slice(-4);
}
