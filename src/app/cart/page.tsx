"use client";

import ProductImage from "@/components/ui/ProductImage";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import PageTransition from "@/components/motion/PageTransition";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { useStore } from "@/store/useStore";
import { formatPrice } from "@/lib/utils";
import { tapScale } from "@/lib/animations";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart } =
    useStore();
  const total = getCartTotal();
  const shipping = total > 150 ? 0 : 12;
  const grandTotal = total + shipping;

  if (cart.length === 0) {
    return (
      <MainLayout>
        <PageTransition>
          <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-6 pt-32 text-center">
            <ShoppingBag size={48} className="text-sand" strokeWidth={1} />
            <div>
              <h1 className="font-heading text-3xl font-bold text-charcoal">
                Your Cart is Empty
              </h1>
              <p className="mt-2 text-sm text-stone">
                Discover our premium collection and find your perfect pair.
              </p>
            </div>
            <Link href="/products">
              <Button>
                Continue Shopping
                <ArrowRight size={16} />
              </Button>
            </Link>
          </Container>
        </PageTransition>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <PageTransition>
        <section className="bg-charcoal pt-28 pb-12 md:pt-32">
          <Container>
            <h1 className="font-heading text-4xl font-bold text-cream md:text-5xl">
              Shopping Cart
            </h1>
            <p className="mt-2 text-sm text-stone/70">
              {cart.length} item{cart.length !== 1 ? "s" : ""} in your cart
            </p>
          </Container>
        </section>

        <Container className="section-padding !pt-10">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div
                    key={`${item.product.id}-${item.size}`}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="flex gap-4 border border-sand p-4 md:gap-6 md:p-6"
                  >
                    <Link
                      href={`/products/${item.product.id}`}
                      className="relative h-28 w-24 shrink-0 overflow-hidden bg-sand md:h-32 md:w-28"
                    >
                      <ProductImage
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-[10px] font-medium uppercase tracking-widest text-accent">
                            {item.product.brand}
                          </p>
                          <Link
                            href={`/products/${item.product.id}`}
                            className="font-heading text-lg font-semibold text-charcoal transition-colors hover:text-accent"
                          >
                            {item.product.name}
                          </Link>
                          <p className="mt-1 text-xs text-stone">
                            Size: {item.size}
                          </p>
                        </div>
                        <motion.button
                          type="button"
                          whileTap={tapScale}
                          onClick={() =>
                            removeFromCart(item.product.id, item.size)
                          }
                          className="text-stone transition-colors hover:text-charcoal"
                          aria-label="Remove item"
                        >
                          <Trash2 size={18} />
                        </motion.button>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-4">
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.size,
                                item.quantity - 1
                              )
                            }
                            className="flex h-8 w-8 items-center justify-center border border-sand transition-colors hover:border-charcoal"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-6 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.size,
                                item.quantity + 1
                              )
                            }
                            className="flex h-8 w-8 items-center justify-center border border-sand transition-colors hover:border-charcoal"
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <p className="text-sm font-semibold text-charcoal">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <ScrollReveal className="h-fit">
              <div className="border border-sand bg-cream p-6 md:p-8">
                <h2 className="font-heading text-xl font-bold text-charcoal">
                  Order Summary
                </h2>
                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between text-stone">
                    <span>Subtotal</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-stone">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-accent">Free</span>
                      ) : (
                        formatPrice(shipping)
                      )}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-stone">
                      Free shipping on orders over $150
                    </p>
                  )}
                  <div className="flex justify-between border-t border-sand pt-3 text-base font-semibold text-charcoal">
                    <span>Total</span>
                    <span>{formatPrice(grandTotal)}</span>
                  </div>
                </div>
                <Link href="/checkout" className="mt-6 block">
                  <Button className="w-full">
                    Proceed to Checkout
                    <ArrowRight size={16} />
                  </Button>
                </Link>
                <button
                  type="button"
                  onClick={clearCart}
                  className="mt-3 w-full py-2 text-xs text-stone transition-colors hover:text-charcoal"
                >
                  Clear Cart
                </button>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </PageTransition>
    </MainLayout>
  );
}
