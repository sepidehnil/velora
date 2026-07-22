"use client";

import { useId } from "react";
import ProductImage from "@/components/ui/ProductImage";
import { cn } from "@/lib/utils";

interface ProductColorImageProps {
  src: string;
  alt: string;
  /** Target colorway hex — applied only to product pixels, not the studio background */
  hex: string;
  /** When false, show the original photo with no tint */
  tint?: boolean;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * Recolors only the product (darker pixels). Light studio backgrounds are
 * masked out via an SVG luminance threshold so they stay unchanged.
 */
export default function ProductColorImage({
  src,
  alt,
  hex,
  tint = true,
  fill,
  className,
  sizes,
  priority,
}: ProductColorImageProps) {
  const uid = useId().replace(/:/g, "");
  const filterId = `product-recolor-${uid}`;

  return (
    <div
      className={cn(
        "relative isolate h-full w-full",
        fill && "absolute inset-0"
      )}
    >
      {tint && (
        <svg
          aria-hidden
          className="pointer-events-none absolute h-0 w-0 overflow-hidden"
        >
          <defs>
            <filter
              id={filterId}
              colorInterpolationFilters="sRGB"
              x="0%"
              y="0%"
              width="100%"
              height="100%"
            >
              {/* Alpha = inverted luminance → product opaque, light bg transparent */}
              <feColorMatrix
                in="SourceGraphic"
                type="matrix"
                values="
                  0 0 0 0 0
                  0 0 0 0 0
                  0 0 0 0 0
                  -0.2126 -0.7152 -0.0722 0 1"
                result="invLuma"
              />
              {/* Soft cutoff: ignore near-white bg / soft shadows */}
              <feComponentTransfer in="invLuma" result="mask">
                <feFuncA
                  type="table"
                  tableValues="0 0 0.02 0.15 0.45 0.75 0.92 1 1 1"
                />
              </feComponentTransfer>

              {/* Recolor grayscale product with selected hue/saturation */}
              <feColorMatrix
                in="SourceGraphic"
                type="saturate"
                values="0"
                result="gray"
              />
              <feFlood floodColor={hex} result="flood" />
              <feBlend
                in="flood"
                in2="gray"
                mode="color"
                result="recolored"
              />

              {/* Keep original background; swap in recolored product only */}
              <feComposite
                in="recolored"
                in2="mask"
                operator="in"
                result="productOnly"
              />
              <feComposite
                in="SourceGraphic"
                in2="mask"
                operator="out"
                result="background"
              />
              <feMerge>
                <feMergeNode in="background" />
                <feMergeNode in="productOnly" />
              </feMerge>
            </filter>
          </defs>
        </svg>
      )}

      <div
        className="absolute inset-0"
        style={tint ? { filter: `url(#${filterId})` } : undefined}
      >
        <ProductImage
          src={src}
          alt={alt}
          fill
          className={cn("object-cover", className)}
          sizes={sizes}
          priority={priority}
        />
      </div>
    </div>
  );
}
