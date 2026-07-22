"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import Container from "@/components/ui/Container";
import ProductCard from "@/components/products/ProductCard";
import PageTransition from "@/components/motion/PageTransition";
import ScrollReveal, {
  StaggerReveal,
  StaggerItem,
} from "@/components/motion/ScrollReveal";
import { useStore } from "@/store/useStore";
import { useCatalog } from "@/hooks/useCatalog";

export default function WishlistPage() {
  const { wishlist, init } = useStore();
  const { products, loading } = useCatalog();

  useEffect(() => {
    void init();
  }, [init]);

  const items = products.filter((p) => wishlist.includes(p.id));

  return (
    <MainLayout>
      <PageTransition>
        <section className="bg-sage pb-12 pt-28 md:pt-32">
          <Container>
            <h1 className="font-heading text-4xl font-semibold text-cream md:text-5xl">
              Wishlist
            </h1>
            <p className="mt-2 text-sm text-cream/75">
              {items.length} saved item{items.length !== 1 ? "s" : ""}
            </p>
          </Container>
        </section>

        <Container className="section-padding !pt-10">
          {loading ? (
            <p className="py-20 text-center text-stone">Loading wishlist...</p>
          ) : items.length === 0 ? (
            <ScrollReveal className="flex min-h-[40vh] flex-col items-center justify-center gap-6 text-center">
              <Heart size={48} className="text-sand" strokeWidth={1} />
              <div>
                <h2 className="text-2xl font-bold text-charcoal">
                  Your wishlist is empty
                </h2>
                <p className="mt-2 text-sm text-stone">
                  Save gear you love and come back when you&apos;re ready to pack.
                </p>
              </div>
              <Link
                href="/products"
                className="btn-primary inline-flex min-h-[48px] items-center gap-2 px-8 py-3 text-sm"
              >
                Browse products
                <ArrowRight size={16} />
              </Link>
            </ScrollReveal>
          ) : (
            <StaggerReveal className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
              {items.map((product) => (
                <StaggerItem key={product.id}>
                  <ProductCard product={product} />
                </StaggerItem>
              ))}
            </StaggerReveal>
          )}
        </Container>
      </PageTransition>
    </MainLayout>
  );
}
