import Link from "next/link";
import { Tent } from "lucide-react";
import Container from "@/components/ui/Container";

export default function Footer() {
  return (
    <footer className="border-t border-sand bg-white py-10">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <Link href="/" className="inline-flex items-center gap-2 text-charcoal">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sage text-cream">
              <Tent size={16} />
            </span>
            <span className="font-brand text-lg tracking-[0.08em]">VENTURA</span>
          </Link>
          <div className="flex flex-wrap justify-center gap-5 text-sm text-stone">
            <Link href="/products" className="hover:text-sage-dark">
              Shop
            </Link>
            <Link
              href="/products?category=backpacks"
              className="hover:text-sage-dark"
            >
              Backpacks
            </Link>
            <Link href="/products?category=tents" className="hover:text-sage-dark">
              Tents
            </Link>
            <Link href="/cart" className="hover:text-sage-dark">
              Cart
            </Link>
          </div>
          <p className="text-xs text-stone/70">
            © {new Date().getFullYear()} Ventura
          </p>
        </div>
      </Container>
    </footer>
  );
}
