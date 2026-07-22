export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Colorways were briefly stored as fake IDs like `12__charcoal`.
 * Resolve those back to the real product id (+ optional color slug).
 */
export function parseProductRouteId(rawId: string): {
  productId: string;
  colorSlug?: string;
} {
  const sep = rawId.indexOf("__");
  if (sep === -1) return { productId: rawId };
  return {
    productId: rawId.slice(0, sep),
    colorSlug: rawId.slice(sep + 2),
  };
}
