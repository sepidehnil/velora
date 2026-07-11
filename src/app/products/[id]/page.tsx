"use client";

import { useState } from "react";
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
import { getProductById, getRelatedProducts } from "@/data/products";
import { useStore } from "@/store/useStore";
import { formatPrice } from "@/lib/utils";
import { tapScale } from "@/lib/animations";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const product = getProductById(params.id as string);
  const { addToCart, toggleWishlist, isInWishlist } = useStore();

  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

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

  const related = getRelatedProducts(product);
  const wished = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addToCart({ product, size: selectedSize, quantity });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <MainLayout>
      <PageTransition>
        <Container className="pt-28 pb-8 md:pt-32">
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
              <div className="relative aspect-square overflow-hidden bg-sand">
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
                    <p className="text-xs font-medium uppercase tracking-widest text-accent">
                      {product.brand}
                    </p>
                    <h1 className="mt-2 font-heading text-3xl font-bold text-charcoal md:text-4xl lg:text-5xl">
                      {product.name}
                    </h1>
                  </div>
                  <motion.button
                    type="button"
                    whileTap={tapScale}
                    onClick={() => toggleWishlist(product.id)}
                    className="flex h-11 w-11 items-center justify-center border border-sand transition-colors hover:border-accent"
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
                  <span className="text-2xl font-semibold text-charcoal">
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
                    Select Size
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <motion.button
                        key={size}
                        type="button"
                        whileTap={tapScale}
                        onClick={() => setSelectedSize(size)}
                        className={`flex h-12 min-w-[48px] cursor-pointer items-center justify-center border px-4 text-sm font-medium transition-all duration-200 ${
                          selectedSize === size
                            ? "border-charcoal bg-charcoal text-cream"
                            : "border-sand text-charcoal hover:border-charcoal"
                        }`}
                      >
                        {size}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-charcoal">
                    Quantity
                  </p>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="flex h-10 w-10 items-center justify-center border border-sand transition-colors hover:border-charcoal"
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
                      className="flex h-10 w-10 items-center justify-center border border-sand transition-colors hover:border-charcoal"
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <Button
                    onClick={handleAddToCart}
                    disabled={!selectedSize}
                    className="flex-1 disabled:cursor-not-allowed disabled:opacity-50"
                  >
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
                  <Link href="/cart" className="flex-1">
                    <Button variant="outline" className="w-full">
                      View Cart
                    </Button>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Container>

        {related.length > 0 && (
          <section className="section-padding bg-sand/30">
            <Container>
              <ScrollReveal className="mb-10">
                <h2 className="font-heading text-3xl font-bold text-charcoal md:text-4xl">
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
