import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOrCreateGuest } from "@/lib/guest";
import { mapDbProduct } from "@/lib/catalog";
import { parseProductRouteId } from "@/lib/utils";

export const dynamic = "force-dynamic";

function normalizeColor(color?: string | null) {
  return (color ?? "").trim();
}

function resolveProductId(rawId: string) {
  return parseProductRouteId(rawId).productId;
}

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
        color: item.color || undefined,
      })) ?? [],
  };
}

async function setLineQuantity(
  cartId: string,
  productId: string,
  color: string,
  quantity: number
) {
  if (quantity <= 0) {
    await prisma.cartItem.deleteMany({
      where: { cartId, productId, color },
    });
    return;
  }

  const updated = await prisma.cartItem.updateMany({
    where: { cartId, productId, color },
    data: { quantity },
  });

  if (updated.count === 0) {
    await prisma.cartItem.create({
      data: { cartId, productId, quantity, color },
    });
  }
}

async function incrementLine(
  cartId: string,
  productId: string,
  color: string,
  quantity: number
) {
  const existing = await prisma.cartItem.findFirst({
    where: { cartId, productId, color },
  });

  if (existing) {
    await prisma.cartItem.updateMany({
      where: { cartId, productId, color },
      data: { quantity: existing.quantity + quantity },
    });
    return;
  }

  await prisma.cartItem.create({
    data: { cartId, productId, quantity, color },
  });
}

export async function GET() {
  const guest = await getOrCreateGuest();
  return NextResponse.json(await getCartPayload(guest.id));
}

/** Replace the server cart with the client cart (used before checkout). */
export async function PUT(req: Request) {
  try {
    const guest = await getOrCreateGuest();
    const body = await req.json();
    const items = (body?.items ?? []) as Array<{
      productId?: string;
      quantity?: number;
      color?: string;
    }>;

    if (!Array.isArray(items)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const cart = await ensureCart(guest.id);
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

    for (const item of items) {
      if (!item.productId || !item.quantity || item.quantity <= 0) continue;

      const productId = resolveProductId(item.productId);
      const product = await prisma.product.findUnique({
        where: { id: productId },
      });
      if (!product) continue;

      const colorKey = normalizeColor(item.color);
      await incrementLine(cart.id, productId, colorKey, item.quantity);
    }

    return NextResponse.json(await getCartPayload(guest.id));
  } catch (error) {
    console.error("PUT /api/cart", error);
    return NextResponse.json(
      { error: "Failed to sync cart" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const guest = await getOrCreateGuest();
    const body = await req.json();
    const { productId: rawProductId, quantity, color } = body as {
      productId?: string;
      quantity?: number;
      color?: string;
    };

    if (!rawProductId || !quantity || quantity <= 0) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const productId = resolveProductId(rawProductId);
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const cart = await ensureCart(guest.id);
    await incrementLine(cart.id, productId, normalizeColor(color), quantity);

    return NextResponse.json(await getCartPayload(guest.id));
  } catch (error) {
    console.error("POST /api/cart", error);
    return NextResponse.json(
      { error: "Failed to update cart" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const guest = await getOrCreateGuest();
    const body = await req.json();
    const { productId: rawProductId, quantity, color } = body as {
      productId?: string;
      quantity?: number;
      color?: string;
    };

    if (!rawProductId || typeof quantity !== "number") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const productId = resolveProductId(rawProductId);
    const cart = await ensureCart(guest.id);
    const colorKey = normalizeColor(color);

    if (quantity > 0) {
      const product = await prisma.product.findUnique({
        where: { id: productId },
      });
      if (!product) {
        return NextResponse.json(
          { error: "Product not found" },
          { status: 404 }
        );
      }
    }

    await setLineQuantity(cart.id, productId, colorKey, quantity);

    return NextResponse.json(await getCartPayload(guest.id));
  } catch (error) {
    console.error("PATCH /api/cart", error);
    return NextResponse.json(
      { error: "Failed to update cart" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const guest = await getOrCreateGuest();
    const body = await req.json().catch(() => ({}));
    const { productId: rawProductId, color } = body as {
      productId?: string;
      color?: string;
    };

    const cart = await ensureCart(guest.id);

    if (rawProductId) {
      const productId = resolveProductId(rawProductId);
      await prisma.cartItem.deleteMany({
        where: {
          cartId: cart.id,
          productId,
          color: normalizeColor(color),
        },
      });
    } else {
      await prisma.cartItem.deleteMany({
        where: { cartId: cart.id },
      });
    }

    return NextResponse.json(await getCartPayload(guest.id));
  } catch (error) {
    console.error("DELETE /api/cart", error);
    return NextResponse.json(
      { error: "Failed to update cart" },
      { status: 500 }
    );
  }
}
