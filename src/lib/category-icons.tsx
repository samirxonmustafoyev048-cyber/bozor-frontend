import {
  Milk,
  Croissant,
  Beef,
  Fish,
  Carrot,
  Apple,
  Grape,
  CupSoda,
  Coffee,
  SprayCan,
  IceCreamCone,
  Candy,
  Cookie,
  Egg,
  Wheat,
  Soup,
  Drumstick,
  Salad,
  Popcorn,
  ShoppingBasket,
  Refrigerator,
  Baby,
  PawPrint,
  Pill,
  Shirt,
  Package,
  type LucideIcon,
} from "lucide-react";

/**
 * Icons an admin can pick for a category, keyed by the name stored in the
 * database. The column used to hold an emoji, which nothing ever rendered —
 * the site draws these line icons instead, so the stored value now names one.
 */
export const CATEGORY_ICON_CHOICES: { name: string; label: string; icon: LucideIcon }[] = [
  { name: "Milk", label: "Sut", icon: Milk },
  { name: "Croissant", label: "Non", icon: Croissant },
  { name: "Wheat", label: "Don", icon: Wheat },
  { name: "Egg", label: "Tuxum", icon: Egg },
  { name: "Beef", label: "Go'sht", icon: Beef },
  { name: "Drumstick", label: "Parranda", icon: Drumstick },
  { name: "Fish", label: "Baliq", icon: Fish },
  { name: "Carrot", label: "Sabzavot", icon: Carrot },
  { name: "Salad", label: "Ko'katlar", icon: Salad },
  { name: "Apple", label: "Meva", icon: Apple },
  { name: "Grape", label: "Uzum", icon: Grape },
  { name: "Soup", label: "Tayyor taom", icon: Soup },
  { name: "CupSoda", label: "Ichimlik", icon: CupSoda },
  { name: "Coffee", label: "Choy va qahva", icon: Coffee },
  { name: "Candy", label: "Shirinlik", icon: Candy },
  { name: "Cookie", label: "Pechene", icon: Cookie },
  { name: "IceCreamCone", label: "Muzqaymoq", icon: IceCreamCone },
  { name: "Popcorn", label: "Gazak", icon: Popcorn },
  { name: "Refrigerator", label: "Muzlatilgan", icon: Refrigerator },
  { name: "SprayCan", label: "Uy-ro'zg'or", icon: SprayCan },
  { name: "Shirt", label: "Kiyim", icon: Shirt },
  { name: "Baby", label: "Bolalar", icon: Baby },
  { name: "PawPrint", label: "Hayvonlar", icon: PawPrint },
  { name: "Pill", label: "Dorixona", icon: Pill },
  { name: "ShoppingBasket", label: "Boshqa", icon: ShoppingBasket },
];

const BY_NAME: Record<string, LucideIcon> = Object.fromEntries(
  CATEGORY_ICON_CHOICES.map((c) => [c.name, c.icon])
);

/** Fallbacks for rows saved before the icon column held a name. */
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

/**
 * The icon for a category. An explicitly saved icon name wins; otherwise the
 * slug and then the name are matched, so a row still carrying an old emoji —
 * or a category added without picking one — lands on something sensible.
 */
export function getCategoryIcon(
  slug: string,
  name?: string,
  iconName?: string | null
): LucideIcon {
  if (iconName && BY_NAME[iconName]) return BY_NAME[iconName];
  if (CATEGORY_ICONS[slug]) return CATEGORY_ICONS[slug];
  if (name) {
    const match = NAME_KEYWORD_ICONS.find(([re]) => re.test(name));
    if (match) return match[1];
  }
  return Package;
}
