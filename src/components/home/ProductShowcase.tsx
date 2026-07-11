"use client";

import ProductImage from "@/components/ui/ProductImage";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { showcaseItems } from "@/data/showcase";

function ShowcaseBlock({
  item,
  reversed,
}: {
  item: (typeof showcaseItems)[0];
  reversed?: boolean;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center gap-8 lg:gap-16 ${
        reversed ? "lg:flex-row-reverse" : "lg:flex-row"
      }`}
    >
      <motion.div style={{ y: imageY }} className="relative w-full lg:w-1/2">
        <div className="relative aspect-[4/3] overflow-hidden">
          <ProductImage
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </motion.div>

      <ScrollReveal
        direction={reversed ? "left" : "right"}
        className="w-full lg:w-1/2"
      >
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-accent">
          {item.subtitle}
        </p>
        <h3 className="font-heading text-3xl font-bold text-charcoal md:text-4xl lg:text-5xl">
          {item.title}
        </h3>
        <p className="mt-4 max-w-md text-base leading-relaxed text-stone">
          {item.description}
        </p>
        <Link
          href={item.href}
          className="group mt-8 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-charcoal transition-colors hover:text-accent"
        >
          {item.cta}
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </ScrollReveal>
    </div>
  );
}

export default function ProductShowcase() {
  return (
    <section className="section-padding bg-cream">
      <Container className="space-y-24 md:space-y-32">
        {showcaseItems.map((item, i) => (
          <ShowcaseBlock key={item.id} item={item} reversed={i % 2 !== 0} />
        ))}
      </Container>
    </section>
  );
}
