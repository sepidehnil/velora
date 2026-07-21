import { PrismaClient } from "@prisma/client";
import { categories } from "../src/data/categories";
import { partnerBrands } from "../src/data/brands";
import { showcaseItems } from "../src/data/showcase";
import { products, brands as productBrands } from "../src/data/products";

const prisma = new PrismaClient();

async function main() {
  // Upsert categories
  for (const cat of categories) {
    await prisma.category.upsert({
      where: { id: cat.id },
      update: {
        name: cat.name,
        image: cat.image,
        productCount: cat.productCount,
      },
      create: {
        id: cat.id,
        name: cat.name,
        image: cat.image,
        productCount: cat.productCount,
      },
    });
  }

  // Upsert brands
  for (const b of productBrands) {
    const display = partnerBrands.find((pb) => pb.name === b)?.label ?? b;
    await prisma.brand.upsert({
      where: { id: b },
      update: { name: b, label: display },
      create: { id: b, name: b, label: display },
    });
  }

  // Upsert products
  for (const p of products) {
    await prisma.product.upsert({
      where: { id: p.id },
      update: {
        name: p.name,
        price: p.price,
        originalPrice: p.originalPrice ?? null,
        description: p.description,
        rating: p.rating,
        reviewCount: p.reviewCount,
        isPopular: p.isPopular ?? false,
        isNew: p.isNew ?? false,
        image: p.image,
        brandId: p.brand,
        categoryId: p.category,
      },
      create: {
        id: p.id,
        name: p.name,
        price: p.price,
        originalPrice: p.originalPrice ?? null,
        description: p.description,
        rating: p.rating,
        reviewCount: p.reviewCount,
        isPopular: p.isPopular ?? false,
        isNew: p.isNew ?? false,
        image: p.image,
        brandId: p.brand,
        categoryId: p.category,
      },
    });
  }

  // Upsert showcase
  for (const s of showcaseItems) {
    await prisma.showcaseItem.upsert({
      where: { id: s.id },
      update: {
        title: s.title,
        subtitle: s.subtitle,
        description: s.description,
        image: s.image,
        cta: s.cta,
        href: s.href,
      },
      create: {
        id: s.id,
        title: s.title,
        subtitle: s.subtitle,
        description: s.description,
        image: s.image,
        cta: s.cta,
        href: s.href,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

