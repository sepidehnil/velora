import MainLayout from "@/components/layout/MainLayout";
import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Categories from "@/components/home/Categories";
import ProductShowcase from "@/components/home/ProductShowcase";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";

export default function HomePage() {
  return (
    <MainLayout>
      <Hero />
      <FeaturedProducts />
      <Categories />
      <ProductShowcase />
      <Testimonials />
      <Newsletter />
    </MainLayout>
  );
}
