import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOrCreateGuest } from "@/lib/guest";
import { mapDbProduct } from "@/lib/catalog";

export const dynamic = "force-dynamic";

async function ensureCart(guestId: string) {
  const existing = await prisma.cart.findUnique({
    where: { guestId },
  });
  if (existing) return existing;
  return prisma.cart.create({ data: { guestId } });
}

async function getCartPayload(guestId: string) {
  const cart = await prisma.cart.findUnique({
    where: { guestId },
    include: {
      items: {
        include: {
          product: {
            include: { brand: true, category: true },
          },
        },
      },
    },
  });

  return {
    cart:
      cart?.items.map((item) => ({
        product: mapDbProduct(item.product),
        quantity: item.quantity,
      })) ?? [],
  };
}

export async function GET() {
  const guest = await getOrCreateGuest();
  return NextResponse.json(await getCartPayload(guest.id));
}

export async function POST(req: Request) {
  const guest = await getOrCreateGuest();
  const body = await req.json();
  const { productId, quantity } = body as {
    productId?: string;
    quantity?: number;
  };

  if (!productId || !quantity || quantity <= 0) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const cart = await ensureCart(guest.id);

  await prisma.cartItem.upsert({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId,
      },
    },
    update: {
      quantity: {
        increment: quantity,
      },
    },
    create: {
      cartId: cart.id,
      productId,
      quantity,
    },
  });

  return NextResponse.json(await getCartPayload(guest.id));
}

export async function PATCH(req: Request) {
  const guest = await getOrCreateGuest();
  const body = await req.json();
  const { productId, quantity } = body as {
    productId?: string;
    quantity?: number;
  };

  if (!productId || typeof quantity !== "number") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const cart = await ensureCart(guest.id);

  if (quantity <= 0) {
    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id, productId },
    });
  } else {
    await prisma.cartItem.upsert({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
      update: {
        quantity,
      },
      create: {
        cartId: cart.id,
        productId,
        quantity,
      },
    });
  }

  return NextResponse.json(await getCartPayload(guest.id));
}

export async function DELETE(req: Request) {
  const guest = await getOrCreateGuest();
  const body = await req.json().catch(() => ({}));
  const { productId } = body as { productId?: string };

  const cart = await ensureCart(guest.id);

  if (productId) {
    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id, productId },
    });
  } else {
    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });
  }

  return NextResponse.json(await getCartPayload(guest.id));
}

