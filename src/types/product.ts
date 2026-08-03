export interface Category {
  slug: string;
  name: string;
  icon: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  categorySlug: string;
  price: number;
  discountPrice?: number;
  unit: string;
  emoji: string;
  isPopular?: boolean;
  rating?: number;
  description: string;
  composition?: string;
}
