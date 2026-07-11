"use client";

import ProductImage from "@/components/ui/ProductImage";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <ProductImage
          src="/images/hero.png"
          alt="Premium sneakers collection"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/70 via-charcoal/40 to-transparent" />
      </motion.div>

      <Container className="relative z-10 pt-24">
        <motion.div style={{ opacity }} className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-accent-light"
          >
            Spring Collection 2026
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-5xl font-bold leading-[1.1] text-cream sm:text-6xl md:text-7xl lg:text-8xl"
          >
            Step Into
            <br />
            <span className="italic text-accent-light">Excellence</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-6 max-w-md text-base leading-relaxed text-cream/80 md:text-lg"
          >
            Curated premium footwear from the world&apos;s most iconic brands.
            Crafted for those who demand more.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link href="/products">
              <Button className="bg-cream text-charcoal hover:bg-accent hover:text-cream">
                Shop Collection
                <ArrowRight size={16} />
              </Button>
            </Link>
            <Link href="/products?category=running">
              <Button variant="outline" className="border-cream text-cream hover:bg-cream hover:text-charcoal">
                Explore Running
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </Container>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex h-10 w-6 items-start justify-center rounded-full border border-cream/40 p-1.5"
        >
          <div className="h-2 w-0.5 rounded-full bg-cream/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
