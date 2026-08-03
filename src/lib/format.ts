export function formatSom(price: number): string {
  return `${new Intl.NumberFormat("uz-UZ").format(price)} so'm`;
}

export function discountPercent(price: number, discountPrice: number): number {
  return Math.round(((price - discountPrice) / price) * 100);
}
