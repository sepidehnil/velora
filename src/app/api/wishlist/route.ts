import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOrCreateGuest } from "@/lib/guest";

export const dynamic = "force-dynamic";

async function payload(guestId: string) {
  const rows = await prisma.wishlistItem.findMany({
    where: { guestId },
    select: { productId: true },
  });
  return { wishlist: rows.map((r) => r.productId) };
}

export async function GET() {
  const guest = await getOrCreateGuest();
  return NextResponse.json(await payload(guest.id));
}

export async function POST(req: Request) {
  const guest = await getOrCreateGuest();
  const body = await req.json();
  const { productId } = body as { productId?: string };
  if (!productId) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  await prisma.wishlistItem.upsert({
    where: {
      guestId_productId: {
        guestId: guest.id,
        productId,
      },
    },
    update: {},
    create: {
      guestId: guest.id,
      productId,
    },
  });

  return NextResponse.json(await payload(guest.id));
}

export async function DELETE(req: Request) {
  const guest = await getOrCreateGuest();
  const body = await req.json();
  const { productId } = body as { productId?: string };
  if (!productId) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  await prisma.wishlistItem.deleteMany({
    where: { guestId: guest.id, productId },
  });
  return NextResponse.json(await payload(guest.id));
}

