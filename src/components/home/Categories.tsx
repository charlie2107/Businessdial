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
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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

export function Categories() {
  return (
    <section className="py-16 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore Business Categories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse through our comprehensive directory of local businesses 
            organized by categories that matter to you.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Link
                key={category.name}
                to={`/category/${category.slug}`}
              >
                <Button
                  variant="business"
                  className="h-auto flex-col p-6 space-y-3 text-center w-full"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{category.name}</div>
                    <div className="text-xs text-muted-foreground">{category.count}</div>
                  </div>
                </Button>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link to="/categories">View All Categories</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}