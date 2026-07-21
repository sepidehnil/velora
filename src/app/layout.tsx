import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ventura — Camping & Outdoor Gear",
  description:
    "Premium camping equipment, backpacks, tents, and outdoor essentials for your next adventure.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
