"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import ContentHero from "@/components/layout/ContentHero";
import Container from "@/components/ui/Container";
import PageTransition from "@/components/motion/PageTransition";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "Do you offer free shipping?",
    a: "Yes. Orders over $150 ship free within the continental US. Orders under $150 have a flat $12 shipping fee.",
  },
  {
    q: "How long does delivery take?",
    a: "Most orders ship within 1–2 business days and arrive in 3–7 business days depending on your location.",
  },
  {
    q: "Can I return outdoor gear?",
    a: "Unused items in original packaging can be returned within 30 days. See our Shipping & Returns page for full details.",
  },
  {
    q: "How do product ratings work?",
    a: "Ratings and reviews come from verified buyers after delivery. Counts update as new reviews are submitted.",
  },
  {
    q: "How does checkout work?",
    a: "Enter your contact and shipping details, then place your order. You’ll receive an order ID to keep for tracking and support.",
  },
];

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <MainLayout>
      <PageTransition>
        <ContentHero
          eyebrow="Help center"
          title="FAQ"
          description="Quick answers about shipping, returns, payments, and ordering with Ventura."
        />

        <Container className="section-padding">
          <ScrollReveal className="mx-auto max-w-3xl space-y-3">
            {faqs.map((item, index) => {
              const isOpen = open === index;
              return (
                <div
                  key={item.q}
                  className="overflow-hidden rounded-2xl border border-sand bg-white"
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-medium text-charcoal">{item.q}</span>
                    <ChevronDown
                      size={18}
                      className={cn(
                        "shrink-0 text-stone transition-transform",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>
                  {isOpen && (
                    <p className="border-t border-sand px-5 py-4 text-sm leading-relaxed text-stone">
                      {item.a}
                    </p>
                  )}
                </div>
              );
            })}
          </ScrollReveal>
        </Container>
      </PageTransition>
    </MainLayout>
  );
}
