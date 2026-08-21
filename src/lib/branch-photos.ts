/**
 * Storefront photos of our own shops, cropped from the brand mock-up and
 * served from this origin.
 *
 * Only four branches have a photo of their own so far. Rather than leave the
 * rest as empty panels, a branch without one borrows a house photo — every
 * shop in the chain carries the same signage, so the card still shows an Olma
 * Market storefront rather than a placeholder. A real photo set in the admin
 * panel always wins over this.
 */
const HOUSE_PHOTOS = [
  "/branches/chilonzor.webp",
  "/branches/sergeli.webp",
  "/branches/yunusobod.webp",
  "/branches/boyxotun.webp",
];

/**
 * Picks a photo for every branch in one pass.
 *
 * It has to see the whole list: a branch with its own photo sits wherever it
 * sits, so a borrowed photo can only avoid repeating next to it by looking at
 * what the neighbours already got. The two cards to avoid are the previous one
 * (the card to the left in the two-column grid, or directly above it on a
 * phone) and the one two back (directly above in two columns). With four
 * photos and at most two to dodge there is always a free choice.
 */
export function assignBranchPhotos(
  branches: { imageUrl: string | null }[]
): string[] {
  const chosen: string[] = [];

  branches.forEach((branch, i) => {
    if (branch.imageUrl) {
      chosen.push(branch.imageUrl);
      return;
    }

    const avoid = [chosen[i - 1], chosen[i - 2]];
    // Start the search at a rotating offset so the borrowed photos vary
    // instead of every free slot landing on the first one in the list.
    const start = i % HOUSE_PHOTOS.length;
    for (let k = 0; k < HOUSE_PHOTOS.length; k++) {
      const candidate = HOUSE_PHOTOS[(start + k) % HOUSE_PHOTOS.length];
      if (!avoid.includes(candidate)) {
        chosen.push(candidate);
        return;
      }
    }
    chosen.push(HOUSE_PHOTOS[start]);
  });

  return chosen;
}
