import type { AuthResponse, Branch, Category, Order, OrderStatus, Product, Role, User } from "@/types/product";

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

interface ApiFetchInit extends RequestInit {
  /** Seconds to cache a GET response for (Next.js ISR). Omit for always-fresh data. */
  revalidate?: number;
}

async function apiFetch<T>(path: string, init?: ApiFetchInit): Promise<T> {
  const { revalidate, ...rest } = init ?? {};
  const cachingOptions = revalidate
    ? { next: { revalidate } }
    : { cache: "no-store" as const };

  const res = await fetch(`${getApiUrl()}${path}`, {
    ...rest,
    ...cachingOptions,
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

export function getCategories(options?: { revalidate?: number }): Promise<Category[]> {
  return apiFetch<Category[]>("/categories", options);
}

export function getCategoryBySlug(
  slug: string,
  options?: { revalidate?: number }
): Promise<Category> {
  return apiFetch<Category>(`/categories/${slug}`, options);
}

export function getProducts(
  query: ProductQuery = {},
  options?: { revalidate?: number }
): Promise<ProductListResult> {
  return apiFetch<ProductListResult>(`/products${toQueryString(query)}`, options);
}

export function getProductBySlug(
  slug: string,
  options?: { revalidate?: number }
): Promise<Product> {
  return apiFetch<Product>(`/products/${slug}`, options);
}

export function getRelatedProducts(
  slug: string,
  options?: { revalidate?: number }
): Promise<Product[]> {
  return apiFetch<Product[]>(`/products/${slug}/related`, options);
}

export function getBranches(options?: { revalidate?: number }): Promise<Branch[]> {
  return apiFetch<Branch[]>("/branches", options);
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

/**
 * Signs in by phone number, creating the account on first use. The backend
 * still exposes the SMS-code endpoints for when a gateway is connected.
 */
export function phoneLogin(
  phone: string,
  firstName: string,
  lastName: string
): Promise<AuthResponse> {
  return apiFetch<AuthResponse>("/auth/phone-login", {
    method: "POST",
    body: JSON.stringify({ phone, firstName, lastName }),
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
  ordersByStatus: { status: OrderStatus; count: number }[];
  popularProducts: { product: Product; totalSold: number }[];
  dailySales: { day: number; current: number; previous: number }[];
  recentOrders: {
    id: string;
    orderNumber: string;
    customerName: string;
    itemCount: number;
    totalPrice: number;
    status: OrderStatus;
    createdAt: string;
  }[];
  lowStockProducts: {
    id: string;
    name: string;
    slug: string;
    stock: number;
    imageUrl: string | null;
    category: Category;
  }[];
  trends: {
    orders: number;
    revenue: number;
    users: number;
    products: number;
  };
  sparklines: {
    orders: number[];
    revenue: number[];
    users: number[];
    products: number[];
  };
}

export function adminGetStats(accessToken: string): Promise<AdminStats> {
  return apiFetch<AdminStats>("/admin/stats", { headers: authHeaders(accessToken) });
}

export type CourierStatus = "ONLINE" | "OFFLINE";

export interface DeliveryStats {
  totalOrders: number;
  totalRevenue: number;
  statusCounts: {
    kuryerda: number;
    yetkazilmoqda: number;
    yetkazildi: number;
    bekorQilingan: number;
  };
  trends: {
    totalOrders: number;
    delivering: number;
    delivered: number;
    cancelled: number;
    revenue: number;
  };
  activeCouriers: {
    id: string;
    name: string;
    status: CourierStatus;
    efficiencyPercent: number;
    activeOrders: number;
  }[];
  onlineCourierCount: number;
  avgDeliveryMinutes: number;
  avgCourierEfficiency: number;
  deliveryTrend: { date: string; count: number }[];
  recentOrders: {
    id: string;
    orderNumber: string;
    customerName: string;
    address: string | null;
    courierName: string | null;
    itemCount: number;
    totalPrice: number;
    status: OrderStatus;
    createdAt: string;
  }[];
  branches: {
    id: string;
    name: string;
    address: string;
    lat: number | null;
    lng: number | null;
  }[];
}

export function adminGetDeliveryStats(accessToken: string): Promise<DeliveryStats> {
  return apiFetch<DeliveryStats>("/admin/delivery-stats", {
    headers: authHeaders(accessToken),
  });
}

export interface AdminPayments {
  totalCollected: number;
  pendingCount: number;
  cancelledCount: number;
  totalCount: number;
  payments: {
    id: string;
    provider: "PAYME" | "CLICK";
    amount: number;
    state: number;
    orderNumber: string;
    customerName: string;
    createTime: string;
    performTime: string | null;
    cancelTime: string | null;
  }[];
}

export function adminGetPayments(accessToken: string): Promise<AdminPayments> {
  return apiFetch<AdminPayments>("/admin/payments", {
    headers: authHeaders(accessToken),
  });
}

export interface StoreSettings {
  id: string;
  storeName: string;
  contactPhone: string;
  contactEmail: string;
  deliveryFee: number;
  telegramUrl: string | null;
  instagramUrl: string | null;
  facebookUrl: string | null;
  updatedAt: string;
}

export function getSettings(options?: { revalidate?: number }): Promise<StoreSettings> {
  return apiFetch<StoreSettings>("/settings", options);
}

export function adminUpdateSettings(
  accessToken: string,
  payload: Partial<
    Pick<
      StoreSettings,
      | "storeName"
      | "contactPhone"
      | "contactEmail"
      | "deliveryFee"
      | "telegramUrl"
      | "instagramUrl"
      | "facebookUrl"
    >
  >
): Promise<StoreSettings> {
  return apiFetch<StoreSettings>("/settings", {
    method: "PATCH",
    body: JSON.stringify(payload),
    headers: authHeaders(accessToken),
  });
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

export interface PosSalePayload {
  items: { productId: string; quantity: number }[];
  paymentMethod: "NAQD" | "KARTA" | "PAYME" | "CLICK";
  branchId?: string;
  phone?: string;
}

/** Rings up an in-store sale: already paid, no delivery, closed immediately. */
export function createPosSale(
  accessToken: string,
  payload: PosSalePayload
): Promise<Order> {
  return apiFetch<Order>("/orders/pos", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: authHeaders(accessToken),
  });
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
  imageUrl?: string;
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

export type PromoCodeType = "PERCENT" | "AMOUNT";

export interface PromoCode {
  id: string;
  code: string;
  type: PromoCodeType;
  value: number;
  minOrderAmount: number;
  maxUses: number | null;
  usedCount: number;
  active: boolean;
  expiresAt: string | null;
  createdAt: string;
}

export interface PromoCodePayload {
  code: string;
  type: PromoCodeType;
  value: number;
  minOrderAmount?: number;
  maxUses?: number;
  active?: boolean;
  expiresAt?: string;
}

export function adminGetPromoCodes(accessToken: string): Promise<PromoCode[]> {
  return apiFetch<PromoCode[]>("/promo-codes", { headers: authHeaders(accessToken) });
}

export function adminCreatePromoCode(
  accessToken: string,
  payload: PromoCodePayload
): Promise<PromoCode> {
  return apiFetch<PromoCode>("/promo-codes", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: authHeaders(accessToken),
  });
}

export function adminUpdatePromoCode(
  accessToken: string,
  id: string,
  payload: Partial<PromoCodePayload>
): Promise<PromoCode> {
  return apiFetch<PromoCode>(`/promo-codes/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
    headers: authHeaders(accessToken),
  });
}

export function adminDeletePromoCode(
  accessToken: string,
  id: string
): Promise<{ success: boolean }> {
  return apiFetch(`/promo-codes/${id}`, {
    method: "DELETE",
    headers: authHeaders(accessToken),
  });
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string | null;
  imageUrl: string;
  linkUrl: string | null;
  active: boolean;
  sortOrder: number;
  createdAt: string;
}

export interface BannerPayload {
  title: string;
  subtitle?: string;
  imageUrl: string;
  linkUrl?: string;
  active?: boolean;
  sortOrder?: number;
}

/** Public callers get only active banners; admins pass `all` for the full list. */
export function getBanners(options?: { all?: boolean; revalidate?: number }): Promise<Banner[]> {
  return apiFetch<Banner[]>(`/banners${options?.all ? "?all=true" : ""}`, {
    revalidate: options?.revalidate,
  });
}

export function adminCreateBanner(
  accessToken: string,
  payload: BannerPayload
): Promise<Banner> {
  return apiFetch<Banner>("/banners", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: authHeaders(accessToken),
  });
}

export function adminUpdateBanner(
  accessToken: string,
  id: string,
  payload: Partial<BannerPayload>
): Promise<Banner> {
  return apiFetch<Banner>(`/banners/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
    headers: authHeaders(accessToken),
  });
}

export function adminDeleteBanner(
  accessToken: string,
  id: string
): Promise<{ success: boolean }> {
  return apiFetch(`/banners/${id}`, {
    method: "DELETE",
    headers: authHeaders(accessToken),
  });
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
}

export function adminGetNotifications(
  accessToken: string,
  options?: { unreadOnly?: boolean }
): Promise<Notification[]> {
  return apiFetch<Notification[]>(
    `/notifications${options?.unreadOnly ? "?unread=true" : ""}`,
    { headers: authHeaders(accessToken) }
  );
}

export function adminGetUnreadCount(accessToken: string): Promise<number> {
  return apiFetch<number>("/notifications/unread-count", {
    headers: authHeaders(accessToken),
  });
}

export function adminCreateNotification(
  accessToken: string,
  payload: { title: string; body: string }
): Promise<Notification> {
  return apiFetch<Notification>("/notifications", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: authHeaders(accessToken),
  });
}

export function adminMarkNotificationRead(
  accessToken: string,
  id: string
): Promise<Notification> {
  return apiFetch<Notification>(`/notifications/${id}/read`, {
    method: "PATCH",
    headers: authHeaders(accessToken),
  });
}

export function adminMarkAllNotificationsRead(
  accessToken: string
): Promise<{ success: boolean; count: number }> {
  return apiFetch("/notifications/read-all", {
    method: "PATCH",
    headers: authHeaders(accessToken),
  });
}

export function adminDeleteNotification(
  accessToken: string,
  id: string
): Promise<{ success: boolean }> {
  return apiFetch(`/notifications/${id}`, {
    method: "DELETE",
    headers: authHeaders(accessToken),
  });
}

export function adminDeleteReadNotifications(
  accessToken: string
): Promise<{ success: boolean; count: number }> {
  return apiFetch("/notifications/read", {
    method: "DELETE",
    headers: authHeaders(accessToken),
  });
}

export interface AuditLogEntry {
  id: string;
  action: string;
  entity: string;
  entityId: string | null;
  actorName: string;
  createdAt: string;
}

export function adminGetAuditLogs(
  accessToken: string,
  filters?: { entity?: string; action?: string }
): Promise<AuditLogEntry[]> {
  return apiFetch<AuditLogEntry[]>(`/audit-logs${toQueryString(filters ?? {})}`, {
    headers: authHeaders(accessToken),
  });
}

export function adminGetAuditEntities(accessToken: string): Promise<string[]> {
  return apiFetch<string[]>("/audit-logs/entities", {
    headers: authHeaders(accessToken),
  });
}

export function adminClearAuditLogs(
  accessToken: string
): Promise<{ success: boolean; count: number }> {
  return apiFetch("/audit-logs", {
    method: "DELETE",
    headers: authHeaders(accessToken),
  });
}

export function adminUpdateUserRole(
  accessToken: string,
  id: string,
  role: Role
): Promise<AdminUser> {
  return apiFetch<AdminUser>(`/users/${id}/role`, {
    method: "PATCH",
    body: JSON.stringify({ role }),
    headers: authHeaders(accessToken),
  });
}

export type StockMovementType = "KIRIM" | "CHIQIM" | "TUZATISH";

export interface StockOverview {
  lowStockThreshold: number;
  outOfStock: number;
  lowStock: number;
  totalUnits: number;
  products: Product[];
}

export interface StockMovement {
  id: string;
  type: StockMovementType;
  quantity: number;
  stockAfter: number;
  reason: string | null;
  actorName: string;
  createdAt: string;
  product: { name: string; unit: string };
}

export function getStockOverview(
  accessToken: string,
  search?: string
): Promise<StockOverview> {
  return apiFetch<StockOverview>(`/stock${toQueryString({ q: search })}`, {
    headers: authHeaders(accessToken),
  });
}

export function getStockMovements(accessToken: string): Promise<StockMovement[]> {
  return apiFetch<StockMovement[]>("/stock/movements", {
    headers: authHeaders(accessToken),
  });
}

export function adjustStock(
  accessToken: string,
  productId: string,
  payload: { type: StockMovementType; quantity: number; reason?: string }
): Promise<Product> {
  return apiFetch<Product>(`/stock/${productId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
    headers: authHeaders(accessToken),
  });
}
