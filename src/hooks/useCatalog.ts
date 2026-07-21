"use client";

import { useEffect, useState } from "react";
import { CategoryItem, Product, ShowcaseItem } from "@/types";

interface BrandItem {
  name: string;
  label: string;
}

interface CatalogPayload {
  products: Product[];
  categories: CategoryItem[];
  brands: BrandItem[];
  showcase: ShowcaseItem[];
}

const defaultCatalog: CatalogPayload = {
  products: [],
  categories: [],
  brands: [],
  showcase: [],
};

let cache: CatalogPayload | null = null;

export function useCatalog() {
  const [data, setData] = useState<CatalogPayload>(cache ?? defaultCatalog);
  const [loading, setLoading] = useState(!cache);

  useEffect(() => {
    if (cache) return;

    let active = true;
    setLoading(true);

    fetch("/api/catalog")
      .then((res) => res.json())
      .then((json: CatalogPayload) => {
        cache = json;
        if (active) {
          setData(json);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return { ...data, loading };
}

