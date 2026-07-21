"use client";

import ProductImage from "@/components/ui/ProductImage";
import Link from "next/link";
import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { useCatalog } from "@/hooks/useCatalog";

export default function ProductShowcase() {
  const { showcase } = useCatalog();
  const item = showcase[0];

  if (!item) return null;

  return (
    <section className="bg-[#F3EEE6] py-12 md:py-16">
      <Container>
        <ScrollReveal>
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] sm:rounded-[2rem]">
              <ProductImage
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage-dark">
                {item.subtitle}
              </p>
              <h2 className="mt-3 text-3xl font-bold text-charcoal md:text-4xl">
                {item.title}
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-stone md:text-base">
                {item.description}
              </p>
              <div className="mt-7">
                <Link
                  href={item.href}
                  className="btn-primary inline-flex min-h-[48px] items-center bg-charcoal px-8 py-3 text-sm text-cream hover:bg-sage-dark"
                >
                  {item.cta}
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
