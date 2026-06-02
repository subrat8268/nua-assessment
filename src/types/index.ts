// ── Product from Fake Store API ──────────────────────────────────────
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

// ── Variant data (local mock augmentation) ──────────────────────────
export interface ColorOption {
  name: string;
  hex: string;
}

export interface SizeOption {
  label: string;
  stock: number; // 0 = sold out
}

export interface ProductVariant {
  color: ColorOption;
  sizes: SizeOption[];
  images: string[];
  originalPrice?: number; // set when item is on sale
}

// ── Enriched product combining API + mock data ──────────────────────
export interface EnrichedProduct extends Product {
  variants: ProductVariant[];
  specs: Specification[];
}

export interface Specification {
  label: string;
  value: string;
}

// ── Cart ─────────────────────────────────────────────────────────────
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

// ── Reviews ──────────────────────────────────────────────────────────
export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
}

// ── Cart Actions ─────────────────────────────────────────────────────
export type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { productId: number; color: string; size: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: number; color: string; size: string; quantity: number } }
  | { type: 'CLEAR_CART' };
