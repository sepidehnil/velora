import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import { prisma } from "@/lib/prisma";

const GUEST_COOKIE = "ventura_guest";

export async function getOrCreateGuest() {
  const cookieStore = cookies();
  let token = cookieStore.get(GUEST_COOKIE)?.value;

  if (!token) {
    token = randomUUID();
    cookieStore.set(GUEST_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  let guest = await prisma.guest.findUnique({ where: { token } });
  if (!guest) {
    guest = await prisma.guest.create({
      data: {
        token,
      },
    });
  }

  return guest;
}

