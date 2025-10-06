import React, { useEffect, useState } from "react";
import * as LucideIcons from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getAllCategories } from "@/contexts/CategoriesService";

// Category interface from API
interface CategorySummary {
  _id: string;
  name: string;
  slug: string;
  icon: string;
  count: number;
}

const CategoriesPage = () => {
  const [categories, setCategories] = useState<CategorySummary[]>([]);
  const [loading, setLoading] = useState(true);

const fetchCategories = async () => {
  try {
    const data: CategorySummary[] = await getAllCategories(); // getAllCategories should return JSON already
    setCategories(data);
  } catch (err) {
    console.error("Error fetching categories:", err);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading categories...</p>
      </div>
    );
  }

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
              Explore local businesses organized by category. Find the services and products you need in your area.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => {
              const IconComponent =
                LucideIcons[category.icon as keyof typeof LucideIcons] || LucideIcons.HelpCircle;
              return (
                <Link key={category._id} to={`/category/${category._id}`}>
                  <Button
                    variant="business"
                    className="h-auto flex-col p-6 space-y-3 text-center w-full"
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-base">{category.name}</div>
                      <div className="text-sm text-muted-foreground">{category.count}+</div>
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
