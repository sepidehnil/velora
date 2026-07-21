"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowLeft } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import PageTransition from "@/components/motion/PageTransition";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { useStore } from "@/store/useStore";
import { formatPrice } from "@/lib/utils";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, getCartTotal, clearCart, init } = useStore();
  const [step, setStep] = useState<"form" | "success">("form");
  const [loading, setLoading] = useState(false);

  const total = getCartTotal();
  const shipping = total > 150 ? 0 : 12;
  const grandTotal = total + shipping;

  useEffect(() => {
    void init();
  }, [init]);

  useEffect(() => {
    if (cart.length === 0 && step === "form") {
      router.push("/cart");
    }
  }, [cart.length, step, router]);

  if (cart.length === 0 && step === "form") {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      firstName: String(formData.get("firstName") ?? ""),
      lastName: String(formData.get("lastName") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      streetAddress: String(formData.get("streetAddress") ?? ""),
      city: String(formData.get("city") ?? ""),
      state: String(formData.get("state") ?? ""),
      zipCode: String(formData.get("zipCode") ?? ""),
    };

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);
    if (res.ok) {
      setStep("success");
      clearCart();
    }
  };

  if (step === "success") {
    return (
      <MainLayout>
        <PageTransition>
          <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-6 pt-32 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-accent"
            >
              <Check size={36} className="text-cream" />
            </motion.div>
            <div>
              <h1 className="font-heading text-3xl font-bold text-charcoal md:text-4xl">
                Order Confirmed!
              </h1>
              <p className="mt-3 max-w-md text-sm text-stone">
                Thank you for your purchase. You&apos;ll receive a confirmation
                email shortly with tracking details.
              </p>
            </div>
            <Link
              href="/products"
              className="btn-primary inline-flex min-h-[48px] items-center px-8 py-3 text-sm"
            >
              Continue Shopping
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
            <Link
              href="/cart"
              className="mb-4 inline-flex items-center gap-2 text-sm text-stone/70 transition-colors hover:text-cream"
            >
              <ArrowLeft size={16} />
              Back to Cart
            </Link>
            <h1 className="font-heading text-4xl font-bold text-cream md:text-5xl">
              Checkout
            </h1>
          </Container>
        </section>

        <Container className="section-padding !pt-10">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-12 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-10">
                <ScrollReveal>
                  <fieldset>
                    <legend className="mb-4 font-heading text-xl font-bold text-charcoal">
                      Contact Information
                    </legend>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <input
                        name="firstName"
                        type="text"
                        placeholder="First Name"
                        required
                        className="min-h-[48px] border border-sand bg-cream px-4 text-sm focus:border-accent focus:outline-none"
                      />
                      <input
                        name="lastName"
                        type="text"
                        placeholder="Last Name"
                        required
                        className="min-h-[48px] border border-sand bg-cream px-4 text-sm focus:border-accent focus:outline-none"
                      />
                      <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        required
                        className="min-h-[48px] border border-sand bg-cream px-4 text-sm focus:border-accent focus:outline-none sm:col-span-2"
                      />
                      <input
                        name="phone"
                        type="tel"
                        placeholder="Phone"
                        required
                        className="min-h-[48px] border border-sand bg-cream px-4 text-sm focus:border-accent focus:outline-none sm:col-span-2"
                      />
                    </div>
                  </fieldset>
                </ScrollReveal>

                <ScrollReveal delay={0.1}>
                  <fieldset>
                    <legend className="mb-4 font-heading text-xl font-bold text-charcoal">
                      Shipping Address
                    </legend>
                    <div className="grid gap-4">
                      <input
                        name="streetAddress"
                        type="text"
                        placeholder="Street Address"
                        required
                        className="min-h-[48px] border border-sand bg-cream px-4 text-sm focus:border-accent focus:outline-none"
                      />
                      <div className="grid gap-4 sm:grid-cols-3">
                        <input
                          name="city"
                          type="text"
                          placeholder="City"
                          required
                          className="min-h-[48px] border border-sand bg-cream px-4 text-sm focus:border-accent focus:outline-none"
                        />
                        <input
                          name="state"
                          type="text"
                          placeholder="State"
                          required
                          className="min-h-[48px] border border-sand bg-cream px-4 text-sm focus:border-accent focus:outline-none"
                        />
                        <input
                          name="zipCode"
                          type="text"
                          placeholder="ZIP Code"
                          required
                          className="min-h-[48px] border border-sand bg-cream px-4 text-sm focus:border-accent focus:outline-none"
                        />
                      </div>
                    </div>
                  </fieldset>
                </ScrollReveal>

                <ScrollReveal delay={0.2}>
                  <fieldset>
                    <legend className="mb-4 font-heading text-xl font-bold text-charcoal">
                      Payment
                    </legend>
                    <div className="grid gap-4">
                      <input
                        type="text"
                        placeholder="Card Number"
                        required
                        className="min-h-[48px] border border-sand bg-cream px-4 text-sm focus:border-accent focus:outline-none"
                      />
                      <div className="grid gap-4 sm:grid-cols-2">
                        <input
                          type="text"
                          placeholder="MM / YY"
                          required
                          className="min-h-[48px] border border-sand bg-cream px-4 text-sm focus:border-accent focus:outline-none"
                        />
                        <input
                          type="text"
                          placeholder="CVC"
                          required
                          className="min-h-[48px] border border-sand bg-cream px-4 text-sm focus:border-accent focus:outline-none"
                        />
                      </div>
                    </div>
                  </fieldset>
                </ScrollReveal>
              </div>

              <ScrollReveal delay={0.15} className="h-fit">
                <div className="border border-sand bg-cream p-6 md:p-8">
                  <h2 className="font-heading text-xl font-bold text-charcoal">
                    Order Summary
                  </h2>
                  <div className="mt-4 max-h-48 space-y-3 overflow-y-auto">
                    {cart.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-stone">
                          {item.product.name} × {item.quantity}
                        </span>
                        <span className="font-medium text-charcoal">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 space-y-2 border-t border-sand pt-4 text-sm">
                    <div className="flex justify-between text-stone">
                      <span>Subtotal</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                    <div className="flex justify-between text-stone">
                      <span>Shipping</span>
                      <span>
                        {shipping === 0 ? "Free" : formatPrice(shipping)}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 text-base font-semibold text-charcoal">
                      <span>Total</span>
                      <span>{formatPrice(grandTotal)}</span>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="mt-6 w-full disabled:opacity-60"
                  >
                    <AnimatePresence mode="wait">
                      {loading ? (
                        <motion.span
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          Processing...
                        </motion.span>
                      ) : (
                        <motion.span
                          key="place"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          Place Order — {formatPrice(grandTotal)}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </form>
        </Container>
      </PageTransition>
    </MainLayout>
  );
}
