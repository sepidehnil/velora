"use client";

import { useState } from "react";
import ProductImage from "@/components/ui/ProductImage";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const testimonial = testimonials[current];

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () =>
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="section-padding bg-sand/50">
      <Container>
        <ScrollReveal className="mb-12 text-center md:mb-16">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Testimonials
          </p>
          <h2 className="font-heading text-4xl font-bold text-charcoal md:text-5xl">
            Loved by Thousands
          </h2>
        </ScrollReveal>

        <div className="relative mx-auto max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <Quote
                size={32}
                className="mx-auto mb-6 text-accent/40"
                strokeWidth={1}
              />
              <p className="font-heading text-xl leading-relaxed text-charcoal md:text-2xl lg:text-3xl">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div className="mt-8 flex items-center justify-center gap-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <ProductImage
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-charcoal">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-stone">{testimonial.role}</p>
                </div>
              </div>
              <div className="mt-4 flex justify-center gap-0.5">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} size={14} className="fill-accent text-accent" />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={prev}
              className="flex h-11 w-11 items-center justify-center border border-charcoal/20 transition-colors hover:border-charcoal hover:bg-charcoal hover:text-cream"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? "w-8 bg-charcoal" : "w-1.5 bg-charcoal/20"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              className="flex h-11 w-11 items-center justify-center border border-charcoal/20 transition-colors hover:border-charcoal hover:bg-charcoal hover:text-cream"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
