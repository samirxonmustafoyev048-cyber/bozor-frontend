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

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

/**
 * "07.08.2026".
 *
 * Built by hand rather than with `toLocaleDateString("uz-UZ")`. Browsers ship
 * far less ICU data than Node does: for `uz-UZ` Node prints "07/08/2026" and
 * real month names, while browsers fall back to a different order entirely and
 * abbreviate months as "M01".."M12". That is both wrong on screen and, when a
 * date is rendered on the server, a hydration mismatch.
 */
export function formatDate(value: string | Date): string {
  const d = typeof value === "string" ? new Date(value) : value;
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`;
}

/** "07.08.2026, 14:32" — see {@link formatDate} for why this is hand-rolled. */
export function formatDateTime(value: string | Date): string {
  const d = typeof value === "string" ? new Date(value) : value;
  return `${formatDate(d)}, ${pad(d.getHours())}:${pad(d.getMinutes())}`;
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

  return formatDate(iso);
}
