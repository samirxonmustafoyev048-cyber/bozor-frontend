import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "p1",
    name: "Farmon sut 2.5%",
    slug: "farmon-sut-2-5",
    categorySlug: "sut-mahsulotlari",
    price: 14000,
    discountPrice: 11500,
    unit: "1 l",
    emoji: "🥛",
    isPopular: true,
    rating: 4.8,
    description:
      "Tabiiy sigir sutidan tayyorlangan, pasterizatsiyadan o'tgan sut. Kundalik iste'mol uchun qulay qadoqda.",
    composition: "Pasterizangan sigir suti, yog'lilik 2.5%",
  },
  {
    id: "p2",
    name: "Qatiq",
    slug: "qatiq",
    categorySlug: "sut-mahsulotlari",
    price: 9000,
    unit: "500 g",
    emoji: "🍶",
    isPopular: true,
    rating: 4.6,
    description:
      "Foydali bakteriyalarga boy, tabiiy achitqida tayyorlangan qatiq. Ovqat hazm qilishni yaxshilaydi.",
    composition: "Sut, achitqi kulturasi",
  },
  {
    id: "p3",
    name: "Oq non",
    slug: "oq-non",
    categorySlug: "non-va-nonushta",
    price: 4000,
    unit: "1 dona",
    emoji: "🍞",
    isPopular: true,
    rating: 4.9,
    description: "Har kuni yangi pishiriladigan an'anaviy oq non.",
    composition: "Un, suv, tuz, achitqi",
  },
  {
    id: "p4",
    name: "Tovuq filesi",
    slug: "tovuq-filesi",
    categorySlug: "gosht-va-baliq",
    price: 55000,
    discountPrice: 45000,
    unit: "1 kg",
    emoji: "🍗",
    rating: 4.7,
    description: "Muzlatilgan, sifat nazoratidan o'tgan tovuq ko'krak filesi.",
    composition: "100% tovuq go'shti",
  },
  {
    id: "p5",
    name: "Mol go'shti",
    slug: "mol-goshti",
    categorySlug: "gosht-va-baliq",
    price: 95000,
    unit: "1 kg",
    emoji: "🥩",
    rating: 4.5,
    description: "Yangi, mahalliy fermerlardan yetkazib beriladigan mol go'shti.",
    composition: "100% mol go'shti",
  },
  {
    id: "p6",
    name: "Pomidor",
    slug: "pomidor",
    categorySlug: "sabzavot-va-meva",
    price: 12000,
    discountPrice: 8000,
    unit: "1 kg",
    emoji: "🍅",
    isPopular: true,
    rating: 4.4,
    description: "Yetilgan, sershira mahalliy pomidorlar.",
  },
  {
    id: "p7",
    name: "Olma (qizil)",
    slug: "olma-qizil",
    categorySlug: "sabzavot-va-meva",
    price: 16000,
    unit: "1 kg",
    emoji: "🍎",
    isPopular: true,
    rating: 4.6,
    description: "Shirin va sersuv qizil olmalar, bevosita bog'dan.",
  },
  {
    id: "p8",
    name: "Banan",
    slug: "banan",
    categorySlug: "sabzavot-va-meva",
    price: 18000,
    discountPrice: 14000,
    unit: "1 kg",
    emoji: "🍌",
    rating: 4.7,
    description: "Yetilgan, shirin bananlar. Vitamin va kaliyga boy.",
  },
  {
    id: "p9",
    name: "Coca-Cola",
    slug: "coca-cola",
    categorySlug: "ichimliklar",
    price: 13000,
    unit: "1.5 l",
    emoji: "🥤",
    isPopular: true,
    rating: 4.8,
    description: "Gazlangan alkogolsiz ichimlik, 1.5 litrli qadoqda.",
  },
  {
    id: "p10",
    name: "Tabiiy sharbat (olma)",
    slug: "tabiiy-sharbat-olma",
    categorySlug: "ichimliklar",
    price: 17000,
    discountPrice: 13500,
    unit: "1 l",
    emoji: "🧃",
    rating: 4.5,
    description: "100% tabiiy olma sharbati, qo'shimcha shakarsiz.",
    composition: "Olma sharbati konsentrati, suv",
  },
  {
    id: "p11",
    name: "Idish yuvish suyuqligi",
    slug: "idish-yuvish-suyuqligi",
    categorySlug: "uy-rozgor",
    price: 22000,
    unit: "500 ml",
    emoji: "🧴",
    rating: 4.3,
    description: "Yog'ni samarali eritadigan, qo'llarga shikast yetkazmaydigan formula.",
  },
  {
    id: "p12",
    name: "Tualet qog'ozi (4 dona)",
    slug: "tualet-qogozi",
    categorySlug: "uy-rozgor",
    price: 21000,
    discountPrice: 17000,
    unit: "4 dona",
    emoji: "🧻",
    isPopular: true,
    rating: 4.6,
    description: "Yumshoq, 3 qatlamli tualet qog'ozi, 4 donali o'ram.",
  },
  {
    id: "p13",
    name: "Shokolad batonchasi",
    slug: "shokolad-batonchasi",
    categorySlug: "shirinliklar",
    price: 7000,
    unit: "1 dona",
    emoji: "🍫",
    rating: 4.7,
    description: "Sut shokoladi va yong'oq bilan to'ldirilgan batonchasi.",
  },
  {
    id: "p14",
    name: "Muzqaymoq (vafli)",
    slug: "muzqaymoq-vafli",
    categorySlug: "muzqaymoq",
    price: 6000,
    discountPrice: 4500,
    unit: "1 dona",
    emoji: "🍦",
    isPopular: true,
    rating: 4.9,
    description: "Vafli qadoqdagi klassik plombir muzqaymoq.",
  },
  {
    id: "p15",
    name: "Cheese cake",
    slug: "cheese-cake",
    categorySlug: "shirinliklar",
    price: 28000,
    unit: "1 dona",
    emoji: "🍰",
    rating: 4.8,
    description: "Nyu-York uslubidagi krem-pishloqli tort bo'lagi.",
  },
  {
    id: "p16",
    name: "Bulg'or qalampiri",
    slug: "bulgor-qalampiri",
    categorySlug: "sabzavot-va-meva",
    price: 20000,
    discountPrice: 15000,
    unit: "1 kg",
    emoji: "🫑",
    rating: 4.4,
    description: "Rang-barang, xrustli bulg'or qalampiri aralashmasi.",
  },
];

export function getDiscountedProducts(limit = 8): Product[] {
  return products.filter((p) => p.discountPrice).slice(0, limit);
}

export function getPopularProducts(limit = 8): Product[] {
  return products.filter((p) => p.isPopular).slice(0, limit);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 5): Product[] {
  return products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, limit);
}

export type SortOption = "popular" | "price-asc" | "price-desc" | "new";

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  discountOnly?: boolean;
  query?: string;
  sort?: SortOption;
}

function effectivePrice(p: Product): number {
  return p.discountPrice ?? p.price;
}

export function filterProducts(filters: ProductFilters): Product[] {
  let result = [...products];

  if (filters.category) {
    result = result.filter((p) => p.categorySlug === filters.category);
  }
  if (filters.discountOnly) {
    result = result.filter((p) => !!p.discountPrice);
  }
  if (typeof filters.minPrice === "number") {
    result = result.filter((p) => effectivePrice(p) >= filters.minPrice!);
  }
  if (typeof filters.maxPrice === "number") {
    result = result.filter((p) => effectivePrice(p) <= filters.maxPrice!);
  }
  if (filters.query) {
    const q = filters.query.trim().toLowerCase();
    result = result.filter((p) => p.name.toLowerCase().includes(q));
  }

  switch (filters.sort) {
    case "price-asc":
      result.sort((a, b) => effectivePrice(a) - effectivePrice(b));
      break;
    case "price-desc":
      result.sort((a, b) => effectivePrice(b) - effectivePrice(a));
      break;
    case "new":
      result.reverse();
      break;
    case "popular":
    default:
      result.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
      break;
  }

  return result;
}
