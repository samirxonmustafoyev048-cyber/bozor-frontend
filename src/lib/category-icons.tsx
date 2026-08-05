import {
  Milk,
  Croissant,
  Beef,
  Carrot,
  CupSoda,
  SprayCan,
  IceCreamCone,
  Candy,
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
  muzqaymoq: IceCreamCone,
  shirinliklar: Candy,
};

const NAME_KEYWORD_ICONS: [RegExp, LucideIcon][] = [
  [/sut/i, Milk],
  [/non/i, Croissant],
  [/go'sht|gosht|baliq/i, Beef],
  [/sabzavot|meva/i, Carrot],
  [/ichimlik/i, CupSoda],
  [/uy.?ro'zg'or|uy.?rozgor/i, SprayCan],
  [/muzqaymoq/i, IceCreamCone],
  [/shirinlik/i, Candy],
];

export function getCategoryIcon(slug: string, name?: string): LucideIcon {
  if (CATEGORY_ICONS[slug]) return CATEGORY_ICONS[slug];
  if (name) {
    const match = NAME_KEYWORD_ICONS.find(([re]) => re.test(name));
    if (match) return match[1];
  }
  return Package;
}
