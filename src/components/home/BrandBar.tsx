"use client";

import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { useCatalog } from "@/hooks/useCatalog";

export default function BrandBar() {
  const { brands } = useCatalog();

  return (
    <section className="border-y border-sand bg-white py-12 md:py-16">
      <Container>
        <ScrollReveal>
          <p className="mb-8 text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-stone">
            Trusted outdoor brands
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {brands.map((brand) => (
              <div
                key={brand.name}
                className="rounded-full border border-sand bg-cream/80 px-7 py-3.5 text-sm font-bold tracking-[0.2em] text-stone/65 transition-all duration-300 hover:-translate-y-0.5 hover:border-sage/35 hover:bg-sage-soft hover:text-sage-dark hover:shadow-card"
              >
                {brand.label}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
