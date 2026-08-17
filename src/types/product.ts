export interface Category {
  id: string;
  slug: string;
  name: string;
  icon: string;
  parentId: string | null;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  composition: string | null;
  price: number;
  discountPrice: number | null;
  unit: string;
  emoji: string;
  imageUrl: string | null;
  stock: number;
  isPopular: boolean;
  rating: number | null;
  createdAt: string;
  categoryId: string;
  category: Category;
}

export type Role = "USER" | "ADMIN" | "KASSIR" | "OMBORCHI";

export interface User {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  role: Role;
  createdAt: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  lat: number | null;
  lng: number | null;
}

export type OrderStatus =
  | "QABUL_QILINDI"
  | "TAYYORLANMOQDA"
  | "YOLDA"
  | "YETKAZILDI"
  | "BEKOR_QILINDI";

export type DeliveryType = "YETKAZISH" | "OLIB_KETISH";

export type PaymentMethod = "NAQD" | "KARTA" | "PAYME" | "CLICK";

export interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  productId: string;
  product: Product;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  deliveryType: DeliveryType;
  address: string | null;
  phone: string | null;
  paymentMethod: PaymentMethod;
  deliveryFee: number;
  totalPrice: number;
  cardLast4: string | null;
  paid: boolean;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
  branchId: string | null;
  branch: Branch | null;
  items: OrderItem[];
}
