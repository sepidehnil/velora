import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { mapDbProduct } from "@/lib/catalog";

export async function GET() {
  const [productsDb, categories, brands, showcase] = await Promise.all([
    prisma.product.findMany({
      include: { brand: true, category: true },
      orderBy: { id: "asc" },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.brand.findMany({ orderBy: { name: "asc" } }),
    prisma.showcaseItem.findMany({ orderBy: { id: "asc" } }),
  ]);

  const products = productsDb.map(mapDbProduct);

  return NextResponse.json({
    products,
    categories,
    brands: brands.map((b) => ({ name: b.id, label: b.label ?? b.name })),
    showcase,
  });
}

