import type { OrderStatus } from "@/types/product";

export const STATUS_LABELS: Record<OrderStatus, string> = {
  QABUL_QILINDI: "Yangi",
  TAYYORLANMOQDA: "Qayta ishlanmoqda",
  YOLDA: "Yuborildi",
  YETKAZILDI: "Yetkazildi",
  BEKOR_QILINDI: "Bekor qilingan",
};

export const STATUS_COLORS: Record<OrderStatus, string> = {
  QABUL_QILINDI: "#2a78d6",
  TAYYORLANMOQDA: "#eb6834",
  YOLDA: "#4a3aa7",
  YETKAZILDI: "#16a34a",
  BEKOR_QILINDI: "#dc2626",
};

export const STATUS_ORDER: OrderStatus[] = [
  "QABUL_QILINDI",
  "TAYYORLANMOQDA",
  "YOLDA",
  "YETKAZILDI",
  "BEKOR_QILINDI",
];
