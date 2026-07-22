import { ShieldCheck, Truck, RotateCcw, Leaf } from "lucide-react";
import Container from "@/components/ui/Container";

const badges = [
  {
    icon: Truck,
    title: "Free shipping $150+",
    text: "Flat $12 under that threshold",
  },
  {
    icon: RotateCcw,
    title: "30-day returns",
    text: "Unused gear, original packaging",
  },
  {
    icon: ShieldCheck,
    title: "Secure checkout",
    text: "Encrypted payments & order confirmation",
  },
  {
    icon: Leaf,
    title: "Trail-ready picks",
    text: "Curated outdoor brands only",
  },
];

export default function TrustBar() {
  return (
    <section className="border-y border-sand bg-white py-8 md:py-10">
      <Container>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {badges.map((badge) => (
            <div key={badge.title} className="flex gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sage-soft text-sage-dark">
                <badge.icon size={18} />
              </span>
              <div>
                <p className="text-sm font-semibold text-charcoal">
                  {badge.title}
                </p>
                <p className="mt-0.5 text-xs text-stone">{badge.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
