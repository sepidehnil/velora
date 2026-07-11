import Link from "next/link";
import { Share2, Mail, Globe } from "lucide-react";
import Container from "@/components/ui/Container";

const footerLinks = {
  shop: [
    { label: "All Products", href: "/products" },
    { label: "Running", href: "/products?category=running" },
    { label: "Lifestyle", href: "/products?category=lifestyle" },
    { label: "Basketball", href: "/products?category=basketball" },
    { label: "Training", href: "/products?category=training" },
  ],
  company: [
    { label: "About Us", href: "#" },
    { label: "Sustainability", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
  ],
  support: [
    { label: "Contact", href: "#" },
    { label: "Shipping", href: "#" },
    { label: "Returns", href: "#" },
    { label: "Size Guide", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-sand bg-charcoal text-cream">
      <Container className="section-padding !py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="font-heading text-3xl font-bold">
              Shoea
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-stone/80">
              Premium footwear curated for those who appreciate craftsmanship,
              comfort, and timeless design.
            </p>
            <div className="mt-6 flex gap-4">
              {[Share2, Mail, Globe].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-stone/30 text-stone/80 transition-colors duration-200 hover:border-accent hover:text-accent"
                  aria-label="Social link"
                >
                  <Icon size={18} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-accent-light">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-stone/70 transition-colors duration-200 hover:text-cream"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-stone/20 pt-8 md:flex-row">
          <p className="text-xs text-stone/60">
            &copy; {new Date().getFullYear()} Shoea. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-stone/60">
            <Link href="#" className="transition-colors hover:text-cream">
              Privacy Policy
            </Link>
            <Link href="#" className="transition-colors hover:text-cream">
              Terms of Service
            </Link>
            <Link href="#" className="transition-colors hover:text-cream">
              Cookies
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
