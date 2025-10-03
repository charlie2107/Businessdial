import { useParams, Link } from "react-router-dom";
import { Star, MapPin, Phone, Clock, ExternalLink } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockBusinesses } from "@/data/mockBusinesses";

const CategoryPage = () => {
  const { slug } = useParams();
  
  // Filter businesses by category
  const categoryBusinesses = mockBusinesses.filter(
    business => business.categorySlug === slug
  );

  // Get category name
  const categoryName = categoryBusinesses[0]?.category || "Category";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {categoryName}
            </h1>
            <p className="text-xl text-muted-foreground">
              Showing {categoryBusinesses.length} businesses in {categoryName}
            </p>
          </div>

          {/* Businesses Grid */}
          {categoryBusinesses.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryBusinesses.map((business) => (
                <div 
                  key={business.id}
                  className="bg-card rounded-lg border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Business Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={business.image}
                      alt={business.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-background/90">
                        {business.category}
                      </Badge>
                    </div>
                    {business.verified && (
                      <div className="absolute top-4 right-4">
                        <Badge variant="default" className="bg-success text-success-foreground">
                          Verified
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Business Info */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-semibold">{business.name}</h3>
                      <div className="flex items-center space-x-1 text-sm">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{business.rating}</span>
                        <span className="text-muted-foreground">({business.reviews})</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {business.description}
                    </p>

                    <div className="space-y-2 mb-6">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{business.address}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>{business.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Clock className="h-4 w-4" />
                        <span className={business.isOpen ? "text-success" : "text-destructive"}>
                          {business.isOpen ? "Open Now" : "Closed"}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <Button variant="default" size="sm" className="flex-1" asChild>
                        <a href={`tel:${business.phone}`}>
                          <Phone className="h-4 w-4 mr-2" />
                          Call
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1" asChild>
                        <Link to={`/business/${business.id}`}>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground mb-6">
                No businesses found in this category yet.
              </p>
              <Button variant="outline" asChild>
                <Link to="/categories">Browse All Categories</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
