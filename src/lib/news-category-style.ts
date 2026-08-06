import type { NewsCategory } from "@/lib/news-data";

export const NEWS_CATEGORY_LABEL: Record<NewsCategory, string> = {
  Yangiliklar: "YANGILIK",
  "E'lonlar": "E'LON",
  Tadbirlar: "TADBIR",
  Hamkorlik: "HAMKORLIK",
  Maqolalar: "MAQOLA",
};

export const NEWS_CATEGORY_COLOR: Record<NewsCategory, string> = {
  Yangiliklar: "bg-brand-600",
  "E'lonlar": "bg-orange-500",
  Tadbirlar: "bg-purple-500",
  Hamkorlik: "bg-blue-500",
  Maqolalar: "bg-teal-500",
};
