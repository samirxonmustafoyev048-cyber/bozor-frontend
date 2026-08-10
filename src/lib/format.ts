export function formatSom(price: number): string {
  // Intl.NumberFormat("uz-UZ") picks a different group separator on the
  // server (Node's full ICU) than in some browsers (partial ICU), which
  // causes a hydration mismatch. Format manually so it's identical everywhere.
  const grouped = Math.round(price)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${grouped} so'm`;
}

export function discountPercent(price: number, discountPrice: number): number {
  return Math.round(((price - discountPrice) / price) * 100);
}

const UZ_MONTHS = [
  "yanvar", "fevral", "mart", "aprel", "may", "iyun",
  "iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr",
];

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

/**
 * "7 avgust, 14:32".
 *
 * Built by hand rather than with `toLocaleDateString("uz-UZ")`, whose Uzbek
 * month names are missing from most browsers' ICU data — they fall back to
 * "M01".."M12" while Node prints real names, which also breaks hydration.
 */
export function formatDateTime(iso: string): string {
  const d = new Date(iso);
  return `${d.getDate()} ${UZ_MONTHS[d.getMonth()]}, ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/** "5 daqiqa oldin", falling back to an absolute date after a week. */
export function formatRelativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diffMs / 60_000);

  if (minutes < 1) return "Hozirgina";
  if (minutes < 60) return `${minutes} daqiqa oldin`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} soat oldin`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} kun oldin`;

  return formatDateTime(iso);
}
