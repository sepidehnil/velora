"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, Search, Tent } from "lucide-react";
import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/products?category=backpacks", label: "Backpacks" },
  { href: "/products?category=tents", label: "Tents" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const initStore = useStore((s) => s.init);
  const cartCount = useStore((s) => s.getCartCount());
  const displayCartCount = mounted ? cartCount : 0;

  useEffect(() => {
    setMounted(true);
    void initStore();
  }, [initStore]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        scrolled || mobileOpen
          ? "border-b border-sand/70 bg-white/95 py-3 shadow-sm backdrop-blur-md"
          : "bg-transparent py-5"
      )}
    >
      <div className="container-main flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-charcoal hover:text-sage-dark"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sage text-cream">
            <Tent size={17} strokeWidth={2.25} />
          </span>
          <span className="font-brand text-lg tracking-[0.08em] sm:text-xl">
            VENTURA
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-charcoal/70 transition-colors hover:bg-sage-soft hover:text-sage-dark"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/products"
            className="hidden h-10 w-10 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-sage-soft sm:inline-flex"
            aria-label="Search products"
          >
            <Search size={18} strokeWidth={1.75} />
          </Link>
          <Link
            href="/cart"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-sage text-cream transition-colors hover:bg-sage-dark"
            aria-label={`Shopping cart, ${displayCartCount} items`}
          >
            <ShoppingBag size={17} strokeWidth={1.75} />
            {displayCartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-cream">
                {displayCartCount}
              </span>
            )}
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-charcoal hover:bg-sage-soft lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-sand bg-white lg:hidden"
            aria-label="Mobile"
          >
            <div className="container-main flex flex-col gap-1 py-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm font-medium text-charcoal hover:bg-sage-soft"
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
