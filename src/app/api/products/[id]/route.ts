import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { mapDbProduct } from "@/lib/catalog";

export const dynamic = "force-dynamic";

interface Params {
  params: { id: string };
}

export async function GET(_: Request, { params }: Params) {
  const productDb = await prisma.product.findUnique({
    where: { id: params.id },
    include: { brand: true, category: true },
  });

  if (!productDb) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({ product: mapDbProduct(productDb) });
}

