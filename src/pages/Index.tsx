import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/home/Hero";
import { Categories } from "@/components/home/Categories";
import { FeaturedBusinesses } from "@/components/home/FeaturedBusinesses";
import { BusinessCTA } from "@/components/home/BusinessCTA";
import { Footer } from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <FeaturedBusinesses />
        <Categories />
        <BusinessCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
