import React, { useEffect, useState } from "react";
import * as LucideIcons from "lucide-react";
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

export function Categories() {
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
      <section className="py-16 text-center">
        <p>Loading categories...</p>
      </section>
    );
  }

  if (categories.length === 0) {
    return (
      <section className="py-16 text-center">
        <p>No categories found.</p>
      </section>
    );
  }

  return (
    <section className="py-16 bg-secondary/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore Business Categories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse through our comprehensive directory of local businesses 
            organized by categories that matter to you.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {categories.map((category) => {
            const IconComponent =
              (LucideIcons as any)[category.icon] || LucideIcons.HelpCircle;

            return (
              <Link key={category._id} to={`/category/${category._id}`}>
                <Button
                  variant="business"
                  className="h-auto flex-col p-6 space-y-3 text-center w-full"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{category.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {category.count > 0 ? `${category.count}+` : "0"}
                    </div>
                  </div>
                </Button>
              </Link>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link to="/categories">View All Categories</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
