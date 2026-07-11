"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import ProductCard from "@/components/products/ProductCard";
import ScrollReveal, { StaggerReveal, StaggerItem } from "@/components/motion/ScrollReveal";
import { getPopularProducts } from "@/data/products";

export default function FeaturedProducts() {
  const products = getPopularProducts();

  return (
    <section className="section-padding bg-cream">
      <Container>
        <ScrollReveal className="mb-12 flex items-end justify-between md:mb-16">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Curated Selection
            </p>
            <h2 className="font-heading text-4xl font-bold text-charcoal md:text-5xl">
              Featured Products
            </h2>
          </div>
          <Link
            href="/products"
            className="group hidden items-center gap-2 text-sm font-medium uppercase tracking-widest text-charcoal transition-colors hover:text-accent md:flex"
          >
            View All
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </ScrollReveal>

        <StaggerReveal className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-8">
          {products.map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerReveal>

        <div className="mt-10 text-center md:hidden">
          <Link href="/products" className="btn-outline">
            View All Products
          </Link>
        </div>
      </Container>
    </section>
  );
}
