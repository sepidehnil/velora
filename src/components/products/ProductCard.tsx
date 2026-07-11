"use client";

import ProductImage from "@/components/ui/ProductImage";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Star, ShoppingBag } from "lucide-react";
import { Product } from "@/types";
import { useStore } from "@/store/useStore";
import { formatPrice } from "@/lib/utils";
import { staggerItem, hoverScale, tapScale } from "@/lib/animations";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { toggleWishlist, isInWishlist, addToCart } = useStore();
  const wished = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ product, size: product.sizes[0], quantity: 1 });
  };

  return (
    <motion.article variants={staggerItem} className="group">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative overflow-hidden bg-sand">
          <motion.div
            className="relative aspect-[4/5] overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProductImage
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </motion.div>

          <div className="absolute left-3 top-3 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-charcoal px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-cream">
                New
              </span>
            )}
            {product.originalPrice && (
              <span className="bg-accent px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-cream">
                Sale
              </span>
            )}
          </div>

          <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <motion.button
              type="button"
              whileTap={tapScale}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleWishlist(product.id);
              }}
              className="flex h-10 w-10 items-center justify-center bg-cream/90 backdrop-blur-sm transition-colors hover:bg-cream"
              aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart
                size={18}
                className={wished ? "fill-accent text-accent" : "text-charcoal"}
              />
            </motion.button>
            <motion.button
              type="button"
              whileTap={tapScale}
              onClick={handleAddToCart}
              className="flex h-10 w-10 items-center justify-center bg-charcoal text-cream transition-colors hover:bg-accent"
              aria-label="Add to cart"
            >
              <ShoppingBag size={18} />
            </motion.button>
          </div>
        </div>

        <div className="mt-4 space-y-1">
          <p className="text-[10px] font-medium uppercase tracking-widest text-stone">
            {product.brand}
          </p>
          <h3 className="font-heading text-lg font-semibold text-charcoal transition-colors group-hover:text-accent">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              <Star size={12} className="fill-accent text-accent" />
              <span className="text-xs text-stone">{product.rating}</span>
            </div>
            <span className="text-xs text-stone/60">
              ({product.reviewCount})
            </span>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <span className="text-sm font-semibold text-charcoal">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-stone line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
