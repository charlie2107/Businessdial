import { Link } from "react-router-dom";
import { 
  UtensilsCrossed, 
  ShoppingBag, 
  Car, 
  Stethoscope, 
  GraduationCap, 
  Wrench,
  Scissors,
  Building2,
  Shirt,
  Home,
  Dumbbell,
  Camera
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

const categories = [
  { name: "Restaurants", icon: UtensilsCrossed, count: "2,450+", slug: "restaurants" },
  { name: "Shopping", icon: ShoppingBag, count: "1,890+", slug: "shopping" },
  { name: "Automotive", icon: Car, count: "980+", slug: "automotive" },
  { name: "Healthcare", icon: Stethoscope, count: "1,200+", slug: "healthcare" },
  { name: "Education", icon: GraduationCap, count: "750+", slug: "education" },
  { name: "Home Services", icon: Wrench, count: "1,500+", slug: "home-services" },
  { name: "Beauty & Spa", icon: Scissors, count: "890+", slug: "beauty-spa" },
  { name: "Real Estate", icon: Building2, count: "650+", slug: "real-estate" },
  { name: "Fashion", icon: Shirt, count: "1,100+", slug: "fashion" },
  { name: "Home & Garden", icon: Home, count: "780+", slug: "home-garden" },
  { name: "Fitness", icon: Dumbbell, count: "520+", slug: "fitness" },
  { name: "Photography", icon: Camera, count: "380+", slug: "photography" },
];

const CategoriesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Browse All Categories
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore local businesses organized by category. Find the services 
              and products you need in your area.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Link
                  key={category.slug}
                  to={`/category/${category.slug}`}
                >
                  <Button
                    variant="business"
                    className="h-auto flex-col p-6 space-y-3 text-center w-full"
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-base">{category.name}</div>
                      <div className="text-sm text-muted-foreground">{category.count}</div>
                    </div>
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoriesPage;
