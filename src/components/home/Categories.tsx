"use client";

import ProductImage from "@/components/ui/ProductImage";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import ScrollReveal, { StaggerReveal, StaggerItem } from "@/components/motion/ScrollReveal";
import { categories } from "@/data/categories";

export default function Categories() {
  return (
    <section className="section-padding bg-charcoal">
      <Container>
        <ScrollReveal className="mb-12 text-center md:mb-16">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-accent-light">
            Browse by Style
          </p>
          <h2 className="font-heading text-4xl font-bold text-cream md:text-5xl">
            Shop Categories
          </h2>
        </ScrollReveal>

        <StaggerReveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {categories.map((category) => (
            <StaggerItem key={category.id}>
              <Link href={`/products?category=${category.id}`}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative aspect-[3/4] overflow-hidden"
                >
                  <ProductImage
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-end justify-between">
                      <div>
                        <h3 className="font-heading text-2xl font-bold text-cream">
                          {category.name}
                        </h3>
                        <p className="mt-1 text-sm text-cream/70">
                          {category.productCount} Products
                        </p>
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center border border-cream/30 text-cream transition-all duration-300 group-hover:border-accent group-hover:bg-accent">
                        <ArrowUpRight size={18} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </Container>
    </section>
  );
}
