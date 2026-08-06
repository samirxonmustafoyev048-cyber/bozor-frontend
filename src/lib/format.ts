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
