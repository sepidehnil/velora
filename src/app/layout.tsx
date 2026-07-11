import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shoea — Premium Footwear",
  description:
    "Discover curated premium sneakers and shoes from the world's most iconic brands.",
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
