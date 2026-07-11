"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import Container from "@/components/ui/Container";
import ProductCard from "@/components/products/ProductCard";
import PageTransition from "@/components/motion/PageTransition";
import ScrollReveal, { StaggerReveal, StaggerItem } from "@/components/motion/ScrollReveal";
import { products, brands, searchProducts, getProductsByCategory } from "@/data/products";
import { Brand, Category } from "@/types";
import { cn } from "@/lib/utils";

const categories: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "running", label: "Running" },
  { id: "lifestyle", label: "Lifestyle" },
  { id: "basketball", label: "Basketball" },
  { id: "training", label: "Training" },
];

const sortOptions = [
  { id: "popular", label: "Popular" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "rating", label: "Top Rated" },
];

export default function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = (searchParams.get("category") as Category) || "all";

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category | "all">(initialCategory);
  const [brand, setBrand] = useState<Brand | "All">("All");
  const [sort, setSort] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result =
      category === "all" ? products : getProductsByCategory(category);

    if (brand !== "All") {
      result = result.filter((p) => p.brand === brand);
    }

    if (search.trim()) {
      const ids = new Set(searchProducts(search).map((p) => p.id));
      result = result.filter((p) => ids.has(p.id));
    }

    switch (sort) {
      case "price-asc":
        return [...result].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...result].sort((a, b) => b.price - a.price);
      case "rating":
        return [...result].sort((a, b) => b.rating - a.rating);
      default:
        return [...result].sort(
          (a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0)
        );
    }
  }, [search, category, brand, sort]);

  return (
    <MainLayout>
      <PageTransition>
        <section className="bg-charcoal pt-28 pb-16 md:pt-32 md:pb-20">
          <Container>
            <ScrollReveal>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-accent-light">
                Collection
              </p>
              <h1 className="font-heading text-4xl font-bold text-cream md:text-6xl">
                Shop All
              </h1>
              <p className="mt-4 max-w-lg text-sm text-stone/70">
                Explore our curated selection of premium footwear from the
                world&apos;s leading brands.
              </p>
            </ScrollReveal>
          </Container>
        </section>

        <Container className="section-padding !pt-10">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 md:max-w-md">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-stone"
              />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full min-h-[48px] border border-sand bg-cream py-3 pl-11 pr-4 text-sm focus:border-accent focus:outline-none"
                aria-label="Search products"
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="btn-outline flex items-center gap-2 !min-h-[48px] md:hidden"
              >
                <SlidersHorizontal size={16} />
                Filters
              </button>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="min-h-[48px] border border-sand bg-cream px-4 text-sm focus:border-accent focus:outline-none"
                aria-label="Sort products"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-8">
            <aside
              className={cn(
                "w-56 shrink-0 space-y-8",
                showFilters ? "block" : "hidden md:block"
              )}
            >
              <div>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-charcoal">
                  Category
                </h3>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id)}
                      className={cn(
                        "block w-full cursor-pointer py-2 text-left text-sm transition-colors",
                        category === cat.id
                          ? "font-semibold text-accent"
                          : "text-stone hover:text-charcoal"
                      )}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-charcoal">
                  Brand
                </h3>
                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() => setBrand("All")}
                    className={cn(
                      "block w-full cursor-pointer py-2 text-left text-sm transition-colors",
                      brand === "All"
                        ? "font-semibold text-accent"
                        : "text-stone hover:text-charcoal"
                    )}
                  >
                    All Brands
                  </button>
                  {brands.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBrand(b)}
                      className={cn(
                        "block w-full cursor-pointer py-2 text-left text-sm transition-colors",
                        brand === b
                          ? "font-semibold text-accent"
                          : "text-stone hover:text-charcoal"
                      )}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            <div className="flex-1">
              <p className="mb-6 text-sm text-stone">
                {filtered.length} product{filtered.length !== 1 ? "s" : ""}
              </p>
              <StaggerReveal className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                {filtered.map((product) => (
                  <StaggerItem key={product.id}>
                    <ProductCard product={product} />
                  </StaggerItem>
                ))}
              </StaggerReveal>
              {filtered.length === 0 && (
                <p className="py-20 text-center text-stone">
                  No products found. Try adjusting your filters.
                </p>
              )}
            </div>
          </div>
        </Container>
      </PageTransition>
    </MainLayout>
  );
}
