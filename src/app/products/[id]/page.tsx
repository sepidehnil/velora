"use client";

import { useState } from "react";
import { useEffect } from "react";
import ProductImage from "@/components/ui/ProductImage";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Heart,
  Star,
  Minus,
  Plus,
  ShoppingBag,
  Check,
} from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import ProductCard from "@/components/products/ProductCard";
import PageTransition from "@/components/motion/PageTransition";
import ScrollReveal, { StaggerReveal, StaggerItem } from "@/components/motion/ScrollReveal";
import { useCatalog } from "@/hooks/useCatalog";
import { useStore } from "@/store/useStore";
import { formatPrice } from "@/lib/utils";
import { tapScale } from "@/lib/animations";
import { Product } from "@/types";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { products } = useCatalog();
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart, toggleWishlist, isInWishlist } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const local = products.find((p) => p.id === (params.id as string));
    if (local) {
      setProduct(local);
      return;
    }

    fetch(`/api/products/${params.id as string}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.product) setProduct(data.product as Product);
      });
  }, [params.id, products]);

  if (!product) {
    return (
      <MainLayout>
        <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-4 pt-32">
          <p className="text-stone">Product not found</p>
          <Link href="/products" className="btn-primary">
            Back to Shop
          </Link>
        </Container>
      </MainLayout>
    );
  }

  const related = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);
  const wished = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart({ product, quantity });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <MainLayout>
      <PageTransition>
        <Container className="pb-8 pt-28 md:pt-32">
          <button
            type="button"
            onClick={() => router.back()}
            className="btn-ghost mb-8 flex items-center gap-2"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <ScrollReveal direction="left">
              <div className="relative aspect-square overflow-hidden rounded-card bg-sage-soft">
                <ProductImage
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.1}>
              <div className="flex flex-col">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-sage">
                      {product.brand}
                    </p>
                    <h1 className="mt-2 text-3xl font-bold text-charcoal md:text-4xl">
                      {product.name}
                    </h1>
                  </div>
                  <motion.button
                    type="button"
                    whileTap={tapScale}
                    onClick={() => toggleWishlist(product.id)}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-sand transition-colors hover:border-sage"
                    aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart
                      size={20}
                      className={wished ? "fill-accent text-accent" : "text-charcoal"}
                    />
                  </motion.button>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={
                          i < Math.floor(product.rating)
                            ? "fill-accent text-accent"
                            : "text-sand"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-sm text-stone">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <span className="text-2xl font-bold text-charcoal">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-stone line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                <p className="mt-6 text-sm leading-relaxed text-stone">
                  {product.description}
                </p>

                <div className="mt-8">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-charcoal">
                    Quantity
                  </p>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-sand transition-colors hover:border-sage"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-sand transition-colors hover:border-sage"
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <Button onClick={handleAddToCart} className="flex-1">
                    <AnimatePresence mode="wait">
                      {added ? (
                        <motion.span
                          key="added"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <Check size={18} />
                          Added to Cart
                        </motion.span>
                      ) : (
                        <motion.span
                          key="add"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <ShoppingBag size={18} />
                          Add to Cart
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                  <Link
                    href="/cart"
                    className="btn-outline flex min-h-[48px] flex-1 items-center justify-center px-8 py-3 text-sm"
                  >
                    View Cart
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Container>

        {related.length > 0 && (
          <section className="section-padding bg-sage-soft">
            <Container>
              <ScrollReveal className="mb-10">
                <h2 className="text-3xl font-bold text-charcoal">
                  You May Also Like
                </h2>
              </ScrollReveal>
              <StaggerReveal className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
                {related.map((p) => (
                  <StaggerItem key={p.id}>
                    <ProductCard product={p} />
                  </StaggerItem>
                ))}
              </StaggerReveal>
            </Container>
          </section>
        )}
      </PageTransition>
    </MainLayout>
  );
}
