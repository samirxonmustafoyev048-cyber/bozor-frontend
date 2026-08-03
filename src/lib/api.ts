import type { AuthResponse, Branch, Category, Order, Product, User } from "@/types/product";

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

export function createOrder(
  payload: CreateOrderPayload,
  accessToken?: string
): Promise<Order> {
  return apiFetch<Order>("/orders", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
  });
}

export function getOrder(idOrNumber: string): Promise<Order> {
  return apiFetch<Order>(`/orders/${idOrNumber}`);
}

export function getMyOrders(accessToken: string): Promise<Order[]> {
  return apiFetch<Order[]>("/orders/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}

export function requestOtp(phone: string): Promise<{ message: string; devCode: string }> {
  return apiFetch("/auth/otp/request", {
    method: "POST",
    body: JSON.stringify({ phone }),
  });
}

export function verifyOtp(
  phone: string,
  code: string,
  name?: string
): Promise<AuthResponse> {
  return apiFetch<AuthResponse>("/auth/otp/verify", {
    method: "POST",
    body: JSON.stringify({ phone, code, name }),
  });
}

export function register(
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> {
  return apiFetch<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
}

export function login(email: string, password: string): Promise<AuthResponse> {
  return apiFetch<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function refreshTokens(refreshToken: string): Promise<AuthResponse> {
  return apiFetch<AuthResponse>("/auth/refresh", {
    method: "POST",
    body: JSON.stringify({ refreshToken }),
  });
}

export interface PaymentLinks {
  paymeUrl: string;
  clickUrl: string;
  paid: boolean;
}

export function getPaymentLinks(orderId: string): Promise<PaymentLinks> {
  return apiFetch<PaymentLinks>(`/payments/link/${orderId}`);
}

export function getMe(accessToken: string): Promise<User> {
  return apiFetch<User>("/auth/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}

export function updateProfile(accessToken: string, name: string): Promise<User> {
  return apiFetch<User>("/auth/me", {
    method: "PATCH",
    body: JSON.stringify({ name }),
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}

// ---- Admin ----

function authHeaders(accessToken: string) {
  return { Authorization: `Bearer ${accessToken}` };
}

export interface AdminStats {
  totalOrders: number;
  totalUsers: number;
  totalProducts: number;
  totalRevenue: number;
  ordersByStatus: { status: string; count: number }[];
  popularProducts: { product: Product; totalSold: number }[];
}

export function adminGetStats(accessToken: string): Promise<AdminStats> {
  return apiFetch<AdminStats>("/admin/stats", { headers: authHeaders(accessToken) });
}

export interface AdminUser extends User {
  _count: { orders: number };
}

export function adminGetUsers(accessToken: string): Promise<AdminUser[]> {
  return apiFetch<AdminUser[]>("/users", { headers: authHeaders(accessToken) });
}

export function adminGetOrders(accessToken: string): Promise<Order[]> {
  return apiFetch<Order[]>("/orders", { headers: authHeaders(accessToken) });
}

export function adminUpdateOrderStatus(
  accessToken: string,
  orderId: string,
  status: string
): Promise<Order> {
  return apiFetch<Order>(`/orders/${orderId}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
    headers: authHeaders(accessToken),
  });
}

export interface ProductPayload {
  slug: string;
  name: string;
  description: string;
  composition?: string;
  price: number;
  discountPrice?: number;
  unit: string;
  emoji: string;
  categoryId: string;
  stock?: number;
  isPopular?: boolean;
  rating?: number;
}

export function adminCreateProduct(
  accessToken: string,
  payload: ProductPayload
): Promise<Product> {
  return apiFetch<Product>("/products", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: authHeaders(accessToken),
  });
}

export function adminUpdateProduct(
  accessToken: string,
  id: string,
  payload: Partial<ProductPayload>
): Promise<Product> {
  return apiFetch<Product>(`/products/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
    headers: authHeaders(accessToken),
  });
}

export function adminDeleteProduct(accessToken: string, id: string): Promise<{ success: boolean }> {
  return apiFetch(`/products/${id}`, {
    method: "DELETE",
    headers: authHeaders(accessToken),
  });
}

export interface CategoryPayload {
  slug: string;
  name: string;
  icon: string;
  parentId?: string;
}

export function adminCreateCategory(
  accessToken: string,
  payload: CategoryPayload
): Promise<Category> {
  return apiFetch<Category>("/categories", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: authHeaders(accessToken),
  });
}

export function adminUpdateCategory(
  accessToken: string,
  id: string,
  payload: Partial<CategoryPayload>
): Promise<Category> {
  return apiFetch<Category>(`/categories/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
    headers: authHeaders(accessToken),
  });
}

export function adminDeleteCategory(accessToken: string, id: string): Promise<{ success: boolean }> {
  return apiFetch(`/categories/${id}`, {
    method: "DELETE",
    headers: authHeaders(accessToken),
  });
}

export interface BranchPayload {
  name: string;
  address: string;
  lat?: number;
  lng?: number;
}

export function adminCreateBranch(
  accessToken: string,
  payload: BranchPayload
): Promise<Branch> {
  return apiFetch<Branch>("/branches", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: authHeaders(accessToken),
  });
}

export function adminUpdateBranch(
  accessToken: string,
  id: string,
  payload: Partial<BranchPayload>
): Promise<Branch> {
  return apiFetch<Branch>(`/branches/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
    headers: authHeaders(accessToken),
  });
}

export function adminDeleteBranch(accessToken: string, id: string): Promise<{ success: boolean }> {
  return apiFetch(`/branches/${id}`, {
    method: "DELETE",
    headers: authHeaders(accessToken),
  });
}
