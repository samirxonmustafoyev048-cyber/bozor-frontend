/**
 * Uzbek numbers are 12 digits: country code 998 plus a 9-digit subscriber
 * number. Inputs keep the bare digits in state and only add the "+" when
 * talking to the API, which stores everything as "+998901234567".
 */
export const PHONE_LENGTH = 12;

const VALID_PHONE = /^998\d{9}$/;

/** Keeps only digits and caps the length — safe to run on every keystroke. */
export function toPhoneDigits(value: string): string {
  return value.replace(/\D/g, "").slice(0, PHONE_LENGTH);
}

export function isValidPhone(digits: string): boolean {
  return VALID_PHONE.test(digits);
}

/**
 * Why the number is not acceptable yet, or null when it is fine.
 *
 * Says precisely what is wrong instead of restating the rule: "998" and "988"
 * look alike at a glance, and a bare "12 ta raqam kerak" next to a 12/12
 * counter reads as though nothing is wrong at all.
 */
export function phoneError(digits: string): string | null {
  if (digits.length === 0) return null;

  // Wait for three digits so the prefix is not flagged mid-typing.
  if (digits.length >= 3 && !digits.startsWith("998")) {
    return `Raqam 998 bilan boshlanishi kerak — siz "${digits.slice(0, 3)}" deb boshladingiz`;
  }
  if (digits.length < PHONE_LENGTH) {
    return `Yana ${PHONE_LENGTH - digits.length} ta raqam kerak`;
  }
  return null;
}

/** "998901234567" -> "+998901234567", the form the API expects. */
export function toApiPhone(digits: string): string {
  return `+${digits}`;
}

/** "998901234567" -> "998 90 123 45 67" for read-only display. */
export function formatPhone(value: string): string {
  const d = toPhoneDigits(value);
  if (d.length < PHONE_LENGTH) return d;
  return `${d.slice(0, 3)} ${d.slice(3, 5)} ${d.slice(5, 8)} ${d.slice(8, 10)} ${d.slice(10)}`;
}
