import { Category, Product } from "@/types";

type ProductWithRelations = {
  id: string;
  name: string;
  price: number;
  originalPrice: number | null;
  description: string;
  rating: number;
  reviewCount: number;
  isPopular: boolean;
  isNew: boolean;
  image: string;
  brand: { id: string };
  category: { id: string };
};

export function mapDbProduct(p: ProductWithRelations): Product {
  return {
    id: p.id,
    name: p.name,
    brand: p.brand.id as Product["brand"],
    category: p.category.id as Category,
    price: p.price,
    originalPrice: p.originalPrice ?? undefined,
    description: p.description,
    rating: p.rating,
    reviewCount: p.reviewCount,
    isPopular: p.isPopular,
    isNew: p.isNew,
    image: p.image,
  };
}

