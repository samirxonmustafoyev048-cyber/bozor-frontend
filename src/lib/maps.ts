export function googleMapsUrl(branch: { name: string; address: string; lat: number | null; lng: number | null }) {
  if (branch.lat != null && branch.lng != null) {
    return `https://www.google.com/maps/search/?api=1&query=${branch.lat},${branch.lng}`;
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${branch.name}, ${branch.address}`)}`;
}

export function googleMapsEmbedUrl(branch: { address: string; lat: number | null; lng: number | null }) {
  const query = branch.lat != null && branch.lng != null ? `${branch.lat},${branch.lng}` : branch.address;
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

export function yandexMapsUrl(branch: {
  name: string;
  address: string;
  lat: number | null;
  lng: number | null;
}) {
  // Yandex takes ll as lon,lat — the reverse of Google's order.
  if (branch.lat != null && branch.lng != null) {
    return `https://yandex.uz/maps/?ll=${branch.lng},${branch.lat}&z=17&pt=${branch.lng},${branch.lat}`;
  }
  return `https://yandex.uz/maps/?text=${encodeURIComponent(`${branch.name}, ${branch.address}`)}`;
}
