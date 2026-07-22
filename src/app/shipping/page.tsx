import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import ContentHero from "@/components/layout/ContentHero";
import Container from "@/components/ui/Container";
import PageTransition from "@/components/motion/PageTransition";
import ScrollReveal from "@/components/motion/ScrollReveal";

export const metadata = {
  title: "Shipping & Returns — Ventura",
  description:
    "Ventura shipping rates, delivery times, and return policy for outdoor gear orders.",
};

const sections = [
  {
    title: "Shipping",
    items: [
      "Free standard shipping on orders over $150.",
      "Flat $12 shipping for orders under $150.",
      "Orders typically leave our warehouse within 1–2 business days.",
      "Estimated delivery: 3–7 business days in the continental US.",
    ],
  },
  {
    title: "Returns",
    items: [
      "30-day return window for unused items in original packaging.",
      "Return shipping is customer-paid unless the item arrived damaged.",
      "Refunds are issued to the original payment method after inspection.",
      "Final-sale promo items are marked clearly on the product page.",
    ],
  },
  {
    title: "Damaged or missing gear",
    items: [
      "Contact us within 48 hours of delivery with photos of the issue.",
      "We’ll replace or refund eligible damaged items quickly.",
      "Use the Contact page for order support requests.",
    ],
  },
];

export default function ShippingPage() {
  return (
    <MainLayout>
      <PageTransition>
        <ContentHero
          eyebrow="Policies"
          title="Shipping & Returns"
          description="Clear policies so you can order trail gear with confidence."
        />

        <Container className="section-padding">
          <div className="mx-auto grid max-w-4xl gap-8">
            {sections.map((section, i) => (
              <ScrollReveal key={section.title} delay={i * 0.05}>
                <div className="rounded-card border border-sand bg-white p-6 shadow-card md:p-8">
                  <h2 className="font-heading text-2xl font-semibold text-charcoal">
                    {section.title}
                  </h2>
                  <ul className="mt-4 space-y-3 text-sm leading-relaxed text-stone">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sage" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}

            <ScrollReveal className="text-center">
              <p className="text-sm text-stone">Still need help?</p>
              <Link
                href="/contact"
                className="btn-primary mt-4 inline-flex px-8 py-3"
              >
                Contact support
              </Link>
            </ScrollReveal>
          </div>
        </Container>
      </PageTransition>
    </MainLayout>
  );
}
