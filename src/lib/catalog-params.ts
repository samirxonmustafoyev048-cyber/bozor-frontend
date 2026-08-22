export type SortOption = "popular" | "price-asc" | "price-desc" | "new";

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  discountOnly?: boolean;
  query?: string;
  sort?: SortOption;
}

export type CatalogSearchParams = { [key: string]: string | string[] | undefined };

const SORT_VALUES: SortOption[] = ["popular", "price-asc", "price-desc", "new"];

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export function parseCatalogFilters(
  searchParams: CatalogSearchParams,
  category?: string
): ProductFilters {
  const min = first(searchParams.min);
  const max = first(searchParams.max);
  const sort = first(searchParams.saralash);

  return {
    category,
    minPrice: min ? Number(min) : undefined,
    maxPrice: max ? Number(max) : undefined,
    // Left undefined rather than false when the box is unticked, so the
    // filter never reaches the API as a parameter it has to interpret.
    discountOnly: first(searchParams.chegirma) === "true" ? true : undefined,
    query: first(searchParams.q),
    sort: SORT_VALUES.includes(sort as SortOption) ? (sort as SortOption) : "popular",
  };
}
