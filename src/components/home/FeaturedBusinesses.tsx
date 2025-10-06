import { useEffect, useState } from "react";
import { Star, MapPin, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { getAllBusinesses } from "@/contexts/businessService";

export function FeaturedBusinesses() {
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const data = await getAllBusinesses();
        setBusinesses(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load businesses");
      } finally {
        setLoading(false);
      }
    };
    fetchBusinesses();
  }, []);

  if (loading) {
    return (
      <section className="py-16 text-center">
        <p className="text-muted-foreground">Loading featured businesses...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 text-center">
        <p className="text-destructive">{error}</p>
      </section>
    );
  }

  const featuredBusinesses = businesses.slice(0, 6);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Businesses
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover top-rated local businesses that our community loves. 
            Verified, trusted, and ready to serve you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredBusinesses.map((business) => (
            <div
              key={business._id}
              onClick={() => navigate(`/business/${business._id}`)} // ✅ Entire card clickable
              className="bg-card rounded-lg border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
            >
              {/* Business Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={business.photos?.[0] || "/placeholder.png"}
                  alt={business.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-background/90">
                  {business.category?.name || "No Category"}
                  </Badge>
                </div>
              </div>

              {/* Business Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold">{business.name}</h3>
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
                    <span className="text-success">Open Now</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                  {/* ✅ Call opens phone dialer */}
                  <Button
                    variant="default"
                    size="sm"
                    className="flex-1"
                    asChild
                  >
                    <a href={`tel:${business.phone}`}>
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </a>
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    asChild
                  >
                    <Link to={`/business/${business._id}`}>
                      View
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Explore More Businesses
          </Button>
        </div>
      </div>
    </section>
  );
}
