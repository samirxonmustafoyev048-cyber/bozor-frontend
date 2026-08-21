import { getSettings } from "@/lib/api";

/**
 * The shop's name, shown wherever the brand appears. Admins change it under
 * Sozlamalar, so nothing in the UI should spell it out.
 *
 * Used when settings cannot be read — the brand is the last thing that should
 * disappear because the API is briefly down.
 */
export const FALLBACK_STORE_NAME = "Olma Market";

/**
 * Server-side read of the shop name. Cached for a minute like the rest of the
 * storefront data, so a rename shows up quickly without a request per render.
 */
export async function getStoreName(): Promise<string> {
  try {
    const settings = await getSettings({ revalidate: 60 });
    return settings.storeName?.trim() || FALLBACK_STORE_NAME;
  } catch {
    return FALLBACK_STORE_NAME;
  }
}

/**
 * Splits the name for the two-tone logo: the first word takes the brand green,
 * the rest the blue. A single-word name simply loses the second half.
 */
export function splitStoreName(name: string): [string, string] {
  const trimmed = name.trim();
  const space = trimmed.indexOf(" ");
  if (space === -1) return [trimmed, ""];
  return [trimmed.slice(0, space), trimmed.slice(space + 1)];
}

/**
 * Substitutes the shop name into editorial copy. Sample articles and quotes
 * carry a `{store}` placeholder rather than a literal name, so a rename
 * reaches them too.
 */
export function withStoreName(text: string, storeName: string): string {
  return text.replaceAll("{store}", storeName);
}
