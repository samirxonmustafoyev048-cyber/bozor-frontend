import {
  Milk,
  Croissant,
  Beef,
  Carrot,
  CupSoda,
  SprayCan,
  Package,
  type LucideIcon,
} from "lucide-react";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "sut-mahsulotlari": Milk,
  "non-va-nonushta": Croissant,
  "gosht-va-baliq": Beef,
  "sabzavot-va-meva": Carrot,
  ichimliklar: CupSoda,
  "uy-rozgor": SprayCan,
};

export function getCategoryIcon(slug: string): LucideIcon {
  return CATEGORY_ICONS[slug] ?? Package;
}
