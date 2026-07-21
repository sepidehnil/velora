"use client";

import Link from "next/link";
import Container from "@/components/ui/Container";
import ProductCard from "@/components/products/ProductCard";
import ScrollReveal, { StaggerReveal, StaggerItem } from "@/components/motion/ScrollReveal";
import { useCatalog } from "@/hooks/useCatalog";
import type { Product } from "@/types";

export default function NewArrivals() {
  const { products } = useCatalog();
  const ids = ["3", "5", "6", "9"];
  const items = ids
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

  return (
    <section className="bg-[#F7FAF7] py-12 md:py-16">
      <Container>
        <ScrollReveal className="mb-6 flex items-center justify-between md:mb-8">
          <h2 className="text-xl font-bold text-charcoal md:text-2xl">
            New & Essential
          </h2>
          <Link
            href="/products"
            className="text-sm font-medium text-sage-dark hover:text-charcoal"
          >
            View all
          </Link>
        </ScrollReveal>

        <StaggerReveal className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-5">
          {items.map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerReveal>
      </Container>
    </section>
  );
}
