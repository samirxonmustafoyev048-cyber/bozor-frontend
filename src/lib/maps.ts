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
