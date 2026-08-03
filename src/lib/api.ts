import type { Branch, Category, Order, Product } from "@/types/product";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

function getApiUrl(): string {
  if (typeof window === "undefined") {
    return process.env.API_URL ?? "http://localhost:4000/api";
  }
  return process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${getApiUrl()}${path}`, {
    ...init,
    cache: "no-store",
    headers: { "Content-Type": "application/json", ...init?.headers },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    const message = body?.message ?? `So'rov xato qaytardi: ${res.status}`;
    throw new ApiError(
      Array.isArray(message) ? message.join(", ") : message,
      res.status
    );
  }

  return res.json() as Promise<T>;
}

export interface ProductListResult {
  items: Product[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ProductQuery {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  discountOnly?: boolean;
  q?: string;
  sort?: "popular" | "price-asc" | "price-desc" | "new";
  page?: number;
  pageSize?: number;
}

function toQueryString(query: object): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== null && value !== "") {
      params.set(key, String(value));
    }
  }
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

export function getCategories(): Promise<Category[]> {
  return apiFetch<Category[]>("/categories");
}

export function getCategoryBySlug(slug: string): Promise<Category> {
  return apiFetch<Category>(`/categories/${slug}`);
}

export function getProducts(query: ProductQuery = {}): Promise<ProductListResult> {
  return apiFetch<ProductListResult>(`/products${toQueryString(query)}`);
}

export function getProductBySlug(slug: string): Promise<Product> {
  return apiFetch<Product>(`/products/${slug}`);
}

export function getRelatedProducts(slug: string): Promise<Product[]> {
  return apiFetch<Product[]>(`/products/${slug}/related`);
}

export function getBranches(): Promise<Branch[]> {
  return apiFetch<Branch[]>("/branches");
}

export interface CreateOrderPayload {
  deliveryType: "YETKAZISH" | "OLIB_KETISH";
  address?: string;
  branchId?: string;
  phone: string;
  paymentMethod: "NAQD" | "KARTA" | "PAYME" | "CLICK";
  items: { productId: string; quantity: number }[];
}

export function createOrder(payload: CreateOrderPayload): Promise<Order> {
  return apiFetch<Order>("/orders", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getOrder(idOrNumber: string): Promise<Order> {
  return apiFetch<Order>(`/orders/${idOrNumber}`);
}
