export type Brand =
  | "Nike"
  | "Reebok"
  | "Adidas"
  | "New Balance"
  | "Puma"
  | "Converse"
  | "Asics"
  | "K-Swiss";

export type Category = "running" | "lifestyle" | "basketball" | "training";

export interface Product {
  id: string;
  name: string;
  brand: Brand;
  category: Category;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  description: string;
  sizes: number[];
  rating: number;
  reviewCount: number;
  isPopular?: boolean;
  isNew?: boolean;
  colors?: string[];
}

export interface CartItem {
  product: Product;
  size: number;
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

export interface CategoryItem {
  id: Category;
  name: string;
  description: string;
  image: string;
  productCount: number;
}

export interface ShowcaseItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta: string;
  href: string;
}
