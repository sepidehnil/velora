"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import ProductCard from "@/components/products/ProductCard";
import DealCard from "@/components/home/DealCard";
import ScrollReveal, { StaggerReveal, StaggerItem } from "@/components/motion/ScrollReveal";
import { useCatalog } from "@/hooks/useCatalog";

export default function FeaturedProducts() {
  const { products: allProducts } = useCatalog();
  const products = allProducts.filter((p) => p.isPopular).slice(0, 3);

  return (
    <section className="bg-[#F7FAF7] py-12 md:py-16">
      <Container>
        <ScrollReveal className="mb-6 flex items-center justify-between md:mb-8">
          <h2 className="text-xl font-bold text-charcoal md:text-2xl">
            Featured Products
          </h2>
          <Link
            href="/products"
            className="group flex items-center gap-1.5 text-sm font-medium text-sage-dark hover:text-charcoal"
          >
            View all
            <ArrowRight
              size={15}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </ScrollReveal>

        <StaggerReveal className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {products.map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
          <StaggerItem className="col-span-2 lg:col-span-1">
            <DealCard />
          </StaggerItem>
        </StaggerReveal>
      </Container>
    </section>
  );
}
