import { Suspense } from "react";
import ProductsContent from "./ProductsContent";

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream pt-32" />}>
      <ProductsContent />
    </Suspense>
  );
}
