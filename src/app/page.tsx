import MainLayout from "@/components/layout/MainLayout";
import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import ProductShowcase from "@/components/home/ProductShowcase";
import NewArrivals from "@/components/home/NewArrivals";
import BrandBar from "@/components/home/BrandBar";

export default function HomePage() {
  return (
    <MainLayout>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <ProductShowcase />
      <NewArrivals />
      <BrandBar />
    </MainLayout>
  );
}
