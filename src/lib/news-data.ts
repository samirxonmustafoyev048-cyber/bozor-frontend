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
  title: "{store} yangi logotip va brend identitetini taqdim etdi!",
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
  {
    id: "sifatli-mahsulot",
    category: "Maqolalar",
    date: "21 Aprel, 2024",
    title: "Sifatli mahsulotni qanday tanlash kerak?",
    description:
      "Meva-sabzavot, sut va go'sht mahsulotlarini tanlashda e'tibor beriladigan oddiy belgilar haqida.",
    image: STOCK_PHOTOS.qualityProduce,
    views: 1340,
    comments: 31,
  },
  {
    id: "kuryerlar-safi",
    category: "Yangiliklar",
    date: "19 Aprel, 2024",
    title: "Kuryerlar safi 40 foizga kengaydi",
    description:
      "Bahorgi buyurtmalar oqimiga tayyorgarlik doirasida jamoamizga 60 dan ortiq yangi kuryer qo'shildi.",
    image: STOCK_PHOTOS.courierBike,
    views: 980,
    comments: 17,
  },
  {
    id: "tolov-xavfsizligi",
    category: "Maqolalar",
    date: "17 Aprel, 2024",
    title: "Onlayn to'lov xavfsizligi: bilishingiz kerak bo'lgan 5 qoida",
    description:
      "Karta ma'lumotlarini himoyalash, ishonchli saytlarni ajratish va firibgarlikdan saqlanish bo'yicha maslahatlar.",
    image: STOCK_PHOTOS.securePayment,
    views: 1560,
    comments: 42,
  },
  {
    id: "yangi-filial-sergeli",
    category: "E'lonlar",
    date: "15 Aprel, 2024",
    title: "Sergelida yangi filial ochildi",
    description:
      "Yangi filial har kuni ertalab 8:00 dan kechqurun 22:00 gacha xizmat ko'rsatadi.",
    image: STOCK_PHOTOS.groceryAisle,
    views: 1120,
    comments: 23,
  },
  {
    id: "mijozlar-kuni",
    category: "Tadbirlar",
    date: "12 Aprel, 2024",
    title: "Mijozlar kuni: filiallarimizda tanlovlar va sovg'alar",
    description:
      "Bir kun davomida barcha filiallarda degustatsiya, bolalar uchun o'yinlar va qur'a o'ynaldi.",
    image: STOCK_PHOTOS.customerService,
    views: 890,
    comments: 15,
  },
  {
    id: "fermerlar-bilan",
    category: "Hamkorlik",
    date: "9 Aprel, 2024",
    title: "Mahalliy fermerlardan to'g'ridan-to'g'ri xaridlar boshlandi",
    description:
      "Vositachisiz xarid meva-sabzavotni bir kun ichida javonga chiqarish va narxni pasaytirish imkonini berdi.",
    image: STOCK_PHOTOS.vegetableBasket,
    views: 1030,
    comments: 19,
  },
  {
    id: "jamoa-treningi",
    category: "Tadbirlar",
    date: "5 Aprel, 2024",
    title: "Xodimlar uchun xizmat ko'rsatish bo'yicha trening o'tkazildi",
    description:
      "Kassir va omborchilar uchun ikki kunlik amaliy mashg'ulotda 120 dan ortiq xodim qatnashdi.",
    image: STOCK_PHOTOS.teamMeeting,
    views: 640,
    comments: 8,
  },
  {
    id: "tez-yetkazish",
    category: "Yangiliklar",
    date: "2 Aprel, 2024",
    title: "Ikki soatlik yetkazib berish endi kechqurun ham ishlaydi",
    description:
      "Tez yetkazib berish oynasi 22:00 gacha uzaytirildi — kechki buyurtmalar ham o'sha kuni yetib boradi.",
    image: STOCK_PHOTOS.fastDelivery,
    views: 1410,
    comments: 27,
  },
];

export const mostRead: { id: string; title: string; views: number; image: string }[] = [
  { id: "1", title: "{store}da bahor chegirmalari boshlandi", views: 2400, image: STOCK_PHOTOS.qualityProduce },
  { id: "2", title: "Yetkazib berish vaqtlari yangicha tizimda ishlaydi", views: 1800, image: STOCK_PHOTOS.deliveryTruck },
  { id: "3", title: "Mobil ilova orqali buyurtma qilish bo'yicha qo'llanma", views: 1600, image: STOCK_PHOTOS.mobileCheckout },
  { id: "4", title: "Sifatli mahsulot – sog'lom hayot kaliti", views: 1300, image: STOCK_PHOTOS.vegetableBasket },
  { id: "5", title: "Yangi filialimiz ochilishi munosabati bilan aksiyalar!", views: 1100, image: STOCK_PHOTOS.storeAisle },
];

const CATEGORY_ORDER: NewsCategory[] = [
  "Yangiliklar",
  "E'lonlar",
  "Tadbirlar",
  "Hamkorlik",
  "Maqolalar",
];

/** Counted from the articles themselves, so the badges cannot drift from the list. */
export const newsCategories: { name: NewsCategory; count: number }[] =
  CATEGORY_ORDER.map((name) => ({
    name,
    count: newsItems.filter((n) => n.category === name).length,
  }));

export function formatViews(views: number): string {
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  }
  return String(views);
}
