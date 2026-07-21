"use client";

import ProductImage from "@/components/ui/ProductImage";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Star, Plus } from "lucide-react";
import { Product } from "@/types";
import { useStore } from "@/store/useStore";
import { formatPrice } from "@/lib/utils";
import { staggerItem, tapScale } from "@/lib/animations";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toggleWishlist, isInWishlist, addToCart } = useStore();
  const wished = isInWishlist(product.id);
  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100
        )
      : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ product, quantity: 1 });
  };

  return (
    <motion.article
      variants={staggerItem}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group h-full overflow-hidden rounded-card border border-sand/70 bg-white shadow-card hover:shadow-lift"
    >
      <Link href={`/products/${product.id}`} className="flex h-full flex-col">
        <div className="relative overflow-hidden bg-gradient-to-b from-sage-soft to-sage-mist/40">
          <div className="relative aspect-[4/5]">
            <ProductImage
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 ease-premium group-hover:scale-110"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>

          {discount > 0 && (
            <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold tracking-wide text-cream shadow-sm">
              -{discount}%
            </span>
          )}
          {product.isNew && !discount && (
            <span className="absolute left-3 top-3 rounded-full bg-charcoal px-2.5 py-1 text-[10px] font-bold tracking-wide text-cream shadow-sm">
              New
            </span>
          )}

          <motion.button
            type="button"
            whileTap={tapScale}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-charcoal shadow-sm backdrop-blur-sm transition-colors hover:text-accent"
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              size={16}
              className={wished ? "fill-accent text-accent" : ""}
            />
          </motion.button>
        </div>

        <div className="flex flex-1 flex-col space-y-2 p-4 md:p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage">
            {product.brand}
          </p>
          <div className="flex items-center gap-1.5">
            <Star size={12} className="fill-accent text-accent" />
            <span className="text-xs font-medium text-stone">
              {product.rating}
            </span>
            <span className="text-xs text-stone/50">
              ({product.reviewCount})
            </span>
          </div>
          <h3 className="font-heading line-clamp-2 text-lg font-semibold leading-snug text-charcoal transition-colors group-hover:text-sage-dark">
            {product.name}
          </h3>
          <div className="mt-auto flex items-center justify-between gap-2 pt-3">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-charcoal">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-stone line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <motion.button
              type="button"
              whileTap={tapScale}
              whileHover={{ scale: 1.08 }}
              onClick={handleAddToCart}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-sage text-cream shadow-glow transition-colors hover:bg-sage-dark"
              aria-label="Add to cart"
            >
              <Plus size={18} strokeWidth={2.5} />
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
