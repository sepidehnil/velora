"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, Search, Heart } from "lucide-react";
import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/products?category=running", label: "Running" },
  { href: "/products?category=lifestyle", label: "Lifestyle" },
];

const darkTopPages = ["/", "/products", "/cart", "/checkout"];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartCount = useStore((s) => s.getCartCount());
  const wishlist = useStore((s) => s.wishlist);

  const hasDarkTop =
    pathname === "/" ||
    darkTopPages.some(
      (p) => p !== "/" && (pathname === p || pathname.startsWith(`${p}/`))
    );

  const isSolid = scrolled || mobileOpen;
  const isLight = hasDarkTop && !isSolid;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const linkClass = cn(
    "text-xs font-medium uppercase tracking-widest transition-colors duration-200",
    isLight
      ? "text-cream/90 hover:text-cream"
      : "text-charcoal hover:text-accent"
  );

  const iconClass = cn(
    "inline-flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-none px-2 py-2 transition-all duration-200",
    isLight
      ? "text-cream hover:text-accent-light"
      : "text-charcoal hover:text-accent"
  );

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-500",
        isSolid
          ? "bg-cream/95 py-3 shadow-sm backdrop-blur-md"
          : isLight
            ? "bg-charcoal/20 py-5 backdrop-blur-sm"
            : "bg-transparent py-5"
      )}
    >
      <div className="container-main flex items-center justify-between">
        <Link
          href="/"
          className={cn(
            "font-heading text-2xl font-bold tracking-tight transition-colors md:text-3xl",
            isLight
              ? "text-cream hover:text-accent-light"
              : "text-charcoal hover:text-accent"
          )}
        >
          Shoea
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 md:gap-2">
          <Link
            href="/products"
            className={cn(iconClass, "hidden sm:inline-flex")}
            aria-label="Search products"
          >
            <Search size={20} strokeWidth={1.5} />
          </Link>
          <Link
            href="/products"
            className={cn(iconClass, "relative")}
            aria-label={`Wishlist, ${wishlist.length} items`}
          >
            <Heart size={20} strokeWidth={1.5} />
            {wishlist.length > 0 && (
              <span className="absolute right-0 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-cream">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link
            href="/cart"
            className={cn(iconClass, "relative")}
            aria-label={`Shopping cart, ${cartCount} items`}
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span
                className={cn(
                  "absolute right-0 top-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold",
                  isLight
                    ? "bg-cream text-charcoal"
                    : "bg-charcoal text-cream"
                )}
              >
                {cartCount}
              </span>
            )}
          </Link>
          <button
            type="button"
            className={cn(iconClass, "lg:hidden")}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-sand bg-cream lg:hidden"
            aria-label="Mobile"
          >
            <div className="container-main flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 text-sm font-medium uppercase tracking-widest text-charcoal transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
