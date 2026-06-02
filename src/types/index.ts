export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface ColorOption {
  name: string;
  hex: string;
}

export interface SizeOption {
  label: string;
  stock: number;
}

export interface ProductVariant {
  color: ColorOption;
  sizes: SizeOption[];
  images: string[];
  originalPrice?: number;
}

export interface EnrichedProduct extends Product {
  variants: ProductVariant[];
  specs: Specification[];
}

export interface Specification {
  label: string;
  value: string;
}

export interface CartItem {
  productId: number;
  title: string;
  image: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  maxStock: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
}

export type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { productId: number; color: string; size: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: number; color: string; size: string; quantity: number } }
  | { type: 'CLEAR_CART' };
