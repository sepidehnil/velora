"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import Container from "@/components/ui/Container";
import ProductCard from "@/components/products/ProductCard";
import PageTransition from "@/components/motion/PageTransition";
import ScrollReveal, { StaggerReveal, StaggerItem } from "@/components/motion/ScrollReveal";
import { useCatalog } from "@/hooks/useCatalog";
import { Brand, Category } from "@/types";
import { cn } from "@/lib/utils";

const categories: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "backpacks", label: "Backpacks" },
  { id: "tents", label: "Tents" },
  { id: "lighting", label: "Lighting" },
  { id: "furniture", label: "Furniture" },
  { id: "accessories", label: "Accessories" },
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
  const { products, brands: catalogBrands } = useCatalog();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category | "all">(initialCategory);
  const [brand, setBrand] = useState<Brand | "All">("All");
  const [sort, setSort] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result =
      category === "all"
        ? products
        : products.filter((p) => p.category === category);

    if (brand !== "All") {
      result = result.filter((p) => p.brand === brand);
    }

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
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
  }, [search, category, brand, sort, products]);

  return (
    <MainLayout>
      <PageTransition>
        <section className="bg-sage pb-16 pt-28 md:pb-20 md:pt-32">
          <Container>
            <ScrollReveal>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-sage-light">
                Outdoor catalog
              </p>
              <h1 className="text-4xl font-bold text-cream md:text-6xl">
                Shop All Gear
              </h1>
              <p className="mt-4 max-w-lg text-sm text-cream/80">
                Backpacks, tents, lighting, and camp essentials from trusted
                outdoor brands.
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
                placeholder="Search camping gear..."
                className="min-h-[48px] w-full rounded-full border border-sand bg-white py-3 pl-11 pr-4 text-sm focus:border-sage focus:outline-none"
                aria-label="Search products"
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="btn-outline flex !min-h-[48px] items-center gap-2 md:hidden"
              >
                <SlidersHorizontal size={16} />
                Filters
              </button>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="min-h-[48px] rounded-full border border-sand bg-white px-4 text-sm focus:border-sage focus:outline-none"
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
                        "block w-full cursor-pointer rounded-lg py-2 text-left text-sm transition-colors",
                        category === cat.id
                          ? "font-semibold text-sage-dark"
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
                      "block w-full cursor-pointer rounded-lg py-2 text-left text-sm transition-colors",
                      brand === "All"
                        ? "font-semibold text-sage-dark"
                        : "text-stone hover:text-charcoal"
                    )}
                  >
                    All Brands
                  </button>
                  {catalogBrands.map((b) => (
                    <button
                      key={b.name}
                      type="button"
                      onClick={() => setBrand(b.name as Brand)}
                      className={cn(
                        "block w-full cursor-pointer rounded-lg py-2 text-left text-sm transition-colors",
                        brand === b.name
                          ? "font-semibold text-sage-dark"
                          : "text-stone hover:text-charcoal"
                      )}
                    >
                      {b.label}
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
