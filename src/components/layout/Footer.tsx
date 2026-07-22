import Link from "next/link";
import { Tent, Mail } from "lucide-react";
import Container from "@/components/ui/Container";

const shopLinks = [
  { href: "/products", label: "All gear" },
  { href: "/products?category=backpacks", label: "Backpacks" },
  { href: "/products?category=tents", label: "Tents" },
  { href: "/wishlist", label: "Wishlist" },
  { href: "/cart", label: "Cart" },
];

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
  { href: "/shipping", label: "Shipping & Returns" },
];

export default function Footer() {
  return (
    <footer className="border-t border-sand bg-white">
      <Container className="py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 text-charcoal">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sage text-cream">
                <Tent size={16} />
              </span>
              <span className="font-brand text-lg tracking-[0.08em]">VENTURA</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-stone">
              Trail-ready camping gear for weekends away and longer adventures —
              packs, tents, lighting, and camp essentials.
            </p>
            <a
              href="mailto:hello@ventura.gear"
              className="mt-5 inline-flex items-center gap-2 text-sm text-sage-dark hover:text-charcoal"
            >
              <Mail size={15} />
              hello@ventura.gear
            </a>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal">
              Shop
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-stone">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-sage-dark">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-stone">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-sage-dark">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal">
              Trust
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-stone">
              <li>Free shipping over $150</li>
              <li>30-day returns</li>
              <li>Secure checkout</li>
              <li>Curated outdoor brands</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-sand pt-6 sm:flex-row">
          <p className="text-xs text-stone/70">
            © {new Date().getFullYear()} Ventura. All rights reserved.
          </p>
          <p className="text-xs text-stone/70">Camping & outdoor gear</p>
        </div>
      </Container>
    </footer>
  );
}
