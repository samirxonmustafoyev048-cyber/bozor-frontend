import { STOCK_PHOTOS } from "@/lib/stock-photos";

export type NewsCategory = "Yangiliklar" | "E'lonlar" | "Tadbirlar" | "Hamkorlik" | "Maqolalar";

export interface NewsItem {
  id: string;
  category: NewsCategory;
  date: string;
  title: string;
  description: string;
  image: string;
  views: number;
  comments: number;
}

export const featuredNews: NewsItem = {
  id: "yangi-logotip",
  category: "Yangiliklar",
  date: "1 May, 2024",
  title: "Olma Market yangi logotip va brend identitetini taqdim etdi!",
  description:
    "Yangi logotipimiz orqali biz yanada zamonaviy, ishonchli va qulay xizmatlarni taqdim etishni maqsad qilganmiz.",
  image: STOCK_PHOTOS.storeAisle,
  views: 2400,
  comments: 0,
};

export const newsItems: NewsItem[] = [
  {
    id: "yetkazish-hududi",
    category: "Yangiliklar",
    date: "29 Aprel, 2024",
    title: "Tez yetkazib berish hududi kengaytirildi",
    description:
      "Endilikda Toshkent viloyatining yana 15 ta yangi hududiga tez yetkazib berish xizmati mavjud.",
    image: STOCK_PHOTOS.deliveryTruck,
    views: 1200,
    comments: 24,
  },
  {
    id: "yashil-kelajak",
    category: "Tadbirlar",
    date: "27 Aprel, 2024",
    title: "“Yashil kelajak” aksiyasi o'tkazildi",
    description:
      "Jamoamiz a'zolari ishtirokida navbatdagi daraxt ekish aksiyasi muvaffaqiyatli o'tkazildi.",
    image: STOCK_PHOTOS.treePlanting,
    views: 852,
    comments: 18,
  },
  {
    id: "mobil-ilova",
    category: "E'lonlar",
    date: "25 Aprel, 2024",
    title: "Mobil ilovamiz yangilandi! Yangi funksiyalar qo'shildi",
    description:
      "Ilovamizga qator yangi funksiyalar qo'shildi. Endi xarid qilish yanada qulayroq.",
    image: STOCK_PHOTOS.mobileCheckout,
    views: 1500,
    comments: 36,
  },
  {
    id: "yangi-hamkor",
    category: "Hamkorlik",
    date: "23 Aprel, 2024",
    title: "Yangi hamkor: Agro Product bilan hamkorlik o'rnatildi",
    description:
      "Mahsulot assortimentini kengaytirish maqsadida Agro Product kompaniyasi bilan hamkorlik boshlandi.",
    image: STOCK_PHOTOS.partnershipHandshake,
    views: 764,
    comments: 12,
  },
];

export const mostRead: { id: string; title: string; views: number; image: string }[] = [
  { id: "1", title: "Olma Marketda bahor chegirmalari boshlandi", views: 2400, image: STOCK_PHOTOS.qualityProduce },
  { id: "2", title: "Yetkazib berish vaqtlari yangicha tizimda ishlaydi", views: 1800, image: STOCK_PHOTOS.deliveryTruck },
  { id: "3", title: "Mobil ilova orqali buyurtma qilish bo'yicha qo'llanma", views: 1600, image: STOCK_PHOTOS.mobileCheckout },
  { id: "4", title: "Sifatli mahsulot – sog'lom hayot kaliti", views: 1300, image: STOCK_PHOTOS.vegetableBasket },
  { id: "5", title: "Yangi filialimiz ochilishi munosabati bilan aksiyalar!", views: 1100, image: STOCK_PHOTOS.storeAisle },
];

export const newsCategories: { name: NewsCategory; count: number }[] = [
  { name: "Yangiliklar", count: 24 },
  { name: "E'lonlar", count: 8 },
  { name: "Tadbirlar", count: 12 },
  { name: "Hamkorlik", count: 6 },
  { name: "Maqolalar", count: 15 },
];

export function formatViews(views: number): string {
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  }
  return String(views);
}
