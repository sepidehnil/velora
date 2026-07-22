import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import ContentHero from "@/components/layout/ContentHero";
import Container from "@/components/ui/Container";
import PageTransition from "@/components/motion/PageTransition";
import ScrollReveal from "@/components/motion/ScrollReveal";

export const metadata = {
  title: "About — Ventura",
  description:
    "Ventura outfits outdoor trips with trail-ready camping gear from trusted brands.",
};

export default function AboutPage() {
  return (
    <MainLayout>
      <PageTransition>
        <ContentHero
          eyebrow="Our story"
          title="Built for the trail"
          description="Ventura is a camping and outdoor gear shop for people who pack light, hike far, and care about reliable equipment."
        />

        <Container className="section-padding space-y-12 md:space-y-16">
          <ScrollReveal className="mx-auto max-w-3xl space-y-5 text-sm leading-relaxed text-stone md:text-base">
            <p>
              We started Ventura with a simple idea: outdoor shopping should feel
              as calm and clear as a quiet campsite at dawn. No clutter, no
              gimmicks — just carefully chosen packs, tents, lighting, and camp
              essentials.
            </p>
            <p>
              Every product in our catalog is selected for durability, comfort,
              and real trail use. Whether you&apos;re planning a weekend escape
              or a multi-day trek, we help you pack with confidence.
            </p>
          </ScrollReveal>

          <ScrollReveal className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Trail-tested picks",
                text: "Gear chosen for weather resistance, packability, and everyday outdoor reliability.",
              },
              {
                title: "Honest shopping",
                text: "Clear pricing, free shipping over $150, and product details that help you decide faster.",
              },
              {
                title: "Outdoor-first shopping",
                text: "A calm, clear experience built around finding the right gear for your next adventure.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-card border border-sand bg-white p-6 shadow-card"
              >
                <h2 className="font-heading text-xl font-semibold text-charcoal">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-stone">
                  {item.text}
                </p>
              </div>
            ))}
          </ScrollReveal>

          <ScrollReveal className="text-center">
            <Link href="/products" className="btn-primary inline-flex px-8 py-3">
              Explore the gear
            </Link>
          </ScrollReveal>
        </Container>
      </PageTransition>
    </MainLayout>
  );
}
