import { Brand, Category, Product } from "@/types";

export const brands: Brand[] = [
  "Nike",
  "Adidas",
  "Puma",
  "Reebok",
  "New Balance",
  "Converse",
  "Asics",
  "K-Swiss",
];

export const products: Product[] = [
  {
    id: "1",
    name: "K-Swiss Vista Trainer",
    brand: "K-Swiss",
    category: "training",
    price: 85,
    image: "/images/products/1.png",
    description:
      "Premium training shoes built for comfort and performance. Engineered mesh upper with responsive cushioning for all-day wear.",
    sizes: [40, 41, 42, 43],
    rating: 4.5,
    reviewCount: 128,
    isPopular: true,
    isNew: true,
  },
  {
    id: "2",
    name: "Air Jordan 3 Retro",
    brand: "Nike",
    category: "basketball",
    price: 210,
    originalPrice: 250,
    image: "/images/products/2.png",
    description:
      "Iconic retro basketball sneakers with premium leather upper. A timeless silhouette that defined an era of court culture.",
    sizes: [40, 41, 42, 43, 44],
    rating: 4.9,
    reviewCount: 342,
    isPopular: true,
  },
  {
    id: "3",
    name: "Nike Air Max 97",
    brand: "Nike",
    category: "lifestyle",
    price: 175,
    image: "/images/products/3.png",
    description:
      "Full-length Max Air cushioning delivers all-day comfort. Sleek design inspired by Japanese bullet trains.",
    sizes: [40, 41, 42, 43],
    rating: 4.7,
    reviewCount: 256,
    isPopular: true,
  },
  {
    id: "4",
    name: "Nike React Infinity Run",
    brand: "Nike",
    category: "running",
    price: 160,
    image: "/images/products/4.png",
    description:
      "Engineered to help reduce injury and keep you running. React foam provides a soft, responsive ride mile after mile.",
    sizes: [39, 40, 41, 42, 43],
    rating: 4.8,
    reviewCount: 189,
    isPopular: true,
    isNew: true,
  },
  {
    id: "5",
    name: "Nike Air Zoom Rival",
    brand: "Nike",
    category: "running",
    price: 130,
    image: "/images/products/5.png",
    description:
      "Lightweight racing shoe with Zoom Air unit for responsive cushioning on race day. Built for speed.",
    sizes: [40, 41, 42],
    rating: 4.6,
    reviewCount: 94,
    isPopular: true,
  },
  {
    id: "6",
    name: "Adidas Ultraboost 22",
    brand: "Adidas",
    category: "running",
    price: 190,
    image: "/images/products/6.png",
    description:
      "Responsive Boost midsole and Primeknit upper for a sock-like fit and incredible energy return.",
    sizes: [40, 41, 42, 43],
    rating: 4.9,
    reviewCount: 412,
    isNew: true,
  },
  {
    id: "7",
    name: "Puma RS-X Reinvent",
    brand: "Puma",
    category: "lifestyle",
    price: 120,
    image: "/images/products/7.png",
    description:
      "Bold retro runner with chunky silhouette and RS cushioning technology for everyday comfort.",
    sizes: [39, 40, 41, 42],
    rating: 4.4,
    reviewCount: 67,
  },
  {
    id: "8",
    name: "Reebok Classic Leather",
    brand: "Reebok",
    category: "lifestyle",
    price: 95,
    image: "/images/products/8.png",
    description:
      "Timeless leather sneaker that never goes out of style. Soft garment leather upper with heritage detailing.",
    sizes: [40, 41, 42, 43],
    rating: 4.5,
    reviewCount: 203,
  },
  {
    id: "9",
    name: "Asics Gel-Kayano 29",
    brand: "Asics",
    category: "running",
    price: 165,
    image: "/images/products/9.png",
    description:
      "Stability running shoe with GEL technology cushioning and FlyteFoam midsole for long-distance comfort.",
    sizes: [40, 41, 42, 43, 44],
    rating: 4.8,
    reviewCount: 178,
  },
  {
    id: "10",
    name: "Converse Chuck 70",
    brand: "Converse",
    category: "lifestyle",
    price: 90,
    image: "/images/products/10.png",
    description:
      "Premium take on the classic Chuck Taylor with thicker canvas and cushioned footbed for modern comfort.",
    sizes: [39, 40, 41, 42, 43],
    rating: 4.6,
    reviewCount: 291,
  },
  {
    id: "11",
    name: "New Balance 990v5",
    brand: "New Balance",
    category: "lifestyle",
    price: 185,
    image: "/images/products/11.png",
    description:
      "Made in USA heritage runner with ENCAP midsole technology. The gold standard of premium casual footwear.",
    sizes: [40, 41, 42, 43, 44],
    rating: 4.9,
    reviewCount: 156,
    isNew: true,
  },
  {
    id: "12",
    name: "Nike LeBron XX",
    brand: "Nike",
    category: "basketball",
    price: 200,
    image: "/images/products/12.png",
    description:
      "Maximum cushioning and lockdown support for explosive court performance. Built for the game's greatest.",
    sizes: [42, 43, 44, 45],
    rating: 4.7,
    reviewCount: 88,
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByBrand(brand: Brand | "All"): Product[] {
  if (brand === "All") return products;
  return products.filter((p) => p.brand === brand);
}

export function getProductsByCategory(category: Category | "all"): Product[] {
  if (category === "all") return products;
  return products.filter((p) => p.category === category);
}

export function getPopularProducts(): Product[] {
  return products.filter((p) => p.isPopular);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return products;
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
  );
}
