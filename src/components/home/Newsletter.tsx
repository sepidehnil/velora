"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/motion/ScrollReveal";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="section-padding bg-charcoal">
      <Container>
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-accent-light">
            Stay Connected
          </p>
          <h2 className="font-heading text-4xl font-bold text-cream md:text-5xl">
            Join the Inner Circle
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-stone/70">
            Be the first to know about new arrivals, exclusive offers, and
            style inspiration delivered to your inbox.
          </p>

          {submitted ? (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 text-accent-light"
            >
              Thank you for subscribing!
            </motion.p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="min-h-[48px] flex-1 border border-stone/30 bg-transparent px-5 text-sm text-cream placeholder:text-stone/50 focus:border-accent focus:outline-none"
                aria-label="Email address"
              />
              <motion.button
                type="submit"
                whileTap={{ scale: 0.98 }}
                className="btn-primary flex items-center justify-center gap-2 bg-accent hover:bg-accent-light"
              >
                Subscribe
                <Send size={16} />
              </motion.button>
            </form>
          )}
        </ScrollReveal>
      </Container>
    </section>
  );
}
