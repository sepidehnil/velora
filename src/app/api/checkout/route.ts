import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOrCreateGuest } from "@/lib/guest";

export async function POST(req: Request) {
  const guest = await getOrCreateGuest();
  const body = await req.json();

  const required = [
    "firstName",
    "lastName",
    "email",
    "phone",
    "streetAddress",
    "city",
    "state",
    "zipCode",
  ] as const;

  for (const field of required) {
    if (!body[field] || typeof body[field] !== "string") {
      return NextResponse.json(
        { error: `Missing field: ${field}` },
        { status: 400 }
      );
    }
  }

  const cart = await prisma.cart.findUnique({
    where: { guestId: guest.id },
    include: {
      items: {
        include: { product: true },
      },
    },
  });

  if (!cart || cart.items.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  const total = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = total > 150 ? 0 : 12;
  const grandTotal = total + shipping;

  const order = await prisma.order.create({
    data: {
      guestId: guest.id,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      streetAddress: body.streetAddress,
      city: body.city,
      state: body.state,
      zipCode: body.zipCode,
      shipping,
      total,
      grandTotal,
      items: {
        create: cart.items.map((item) => ({
          productId: item.productId,
          productName: item.product.name,
          unitPrice: item.product.price,
          quantity: item.quantity,
        })),
      },
    },
    include: { items: true },
  });

  await prisma.cartItem.deleteMany({
    where: { cartId: cart.id },
  });

  return NextResponse.json({ orderId: order.id });
}

