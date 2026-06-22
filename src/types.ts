export type Page = 'home' | 'shop' | 'product' | 'about' | 'contact';

export interface Product {
  id: string;
  name: string;
  category: 'Necklace Sets' | 'Earrings' | 'Chokers' | 'Temple Jewellery';
  price: number;
  originalPrice?: number;
  images: string[]; // At least 2 images for hover or thumbnail-gallery effects
  badge?: 'Bestseller' | 'New' | 'Sale' | 'Limited';
  occasion: 'Festive' | 'Wedding' | 'Daily';
  rating: number;
  reviewCount: number;
  description: string;
  included: string;
  isBestseller?: boolean;
  isNewArrival?: boolean;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  occasion?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FilterState {
  category: string;
  priceRange: string;
  occasion: string;
  sort: string;
  search: string;
}
