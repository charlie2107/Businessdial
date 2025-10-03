import { useParams } from "react-router-dom";
import { Star, MapPin, Phone, Clock, ExternalLink, Share2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

// Mock business data - in real app this would come from database
const businessData = {
  1: {
    id: 1,
    name: "Royal Biryani House",
    category: "Restaurant",
    images: [
      "https://images.unsplash.com/photo-1563379091339-03246963d719?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop"
    ],
    rating: 4.8,
    reviews: 1250,
    address: "Shop 15, Bandra West, Mumbai, Maharashtra 400050",
    phone: "+91 98765 43210",
    website: "www.royalbiryanihouse.com",
    isOpen: true,
    verified: true,
    description: "Authentic Hyderabadi biryani and Mughlai cuisine. Family recipes passed down for generations. We use only the finest basmati rice and premium spices to create unforgettable dining experiences.",
    openingHours: {
      "Monday": "11:00 AM - 11:00 PM",
      "Tuesday": "11:00 AM - 11:00 PM", 
      "Wednesday": "11:00 AM - 11:00 PM",
      "Thursday": "11:00 AM - 11:00 PM",
      "Friday": "11:00 AM - 11:00 PM",
      "Saturday": "11:00 AM - 11:30 PM",
      "Sunday": "11:00 AM - 11:30 PM"
    }
  },
  2: {
    id: 2,
    name: "TechFix Solutions",
    category: "Electronics Repair",
    images: [
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop"
    ],
    rating: 4.6,
    reviews: 890,
    address: "A-wing, 2nd Floor, Andheri East, Mumbai, Maharashtra 400069",
    phone: "+91 98765 43211",
    website: "www.techfixsolutions.in",
    isOpen: true,
    verified: true,
    description: "Expert laptop and mobile repair services with genuine parts and warranty. Specializing in iPhone, Samsung, Dell, HP repairs.",
    openingHours: {
      "Monday": "10:00 AM - 8:00 PM",
      "Tuesday": "10:00 AM - 8:00 PM", 
      "Wednesday": "10:00 AM - 8:00 PM",
      "Thursday": "10:00 AM - 8:00 PM",
      "Friday": "10:00 AM - 8:00 PM",
      "Saturday": "10:00 AM - 6:00 PM",
      "Sunday": "Closed"
    }
  },
  3: {
    id: 3,
    name: "Green Salon & Spa",
    category: "Beauty & Wellness", 
    images: [
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop"
    ],
    rating: 4.9,
    reviews: 650,
    address: "Green Tower, Powai, Mumbai, Maharashtra 400076",
    phone: "+91 98765 43212",
    website: "www.greensalonspa.com",
    isOpen: false,
    verified: true,
    description: "Premium salon services using organic products. Hair, beauty, and wellness treatments in a serene environment.",
    openingHours: {
      "Monday": "9:00 AM - 8:00 PM",
      "Tuesday": "9:00 AM - 8:00 PM", 
      "Wednesday": "9:00 AM - 8:00 PM",
      "Thursday": "9:00 AM - 8:00 PM",
      "Friday": "9:00 AM - 8:00 PM",
      "Saturday": "9:00 AM - 9:00 PM",
      "Sunday": "10:00 AM - 7:00 PM"
    }
  }
};

const BusinessDetail = () => {
  const { id } = useParams();
  const business = businessData[Number(id) as keyof typeof businessData];

  if (!business) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Business not found</h1>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-video rounded-lg overflow-hidden">
              <img 
                src={business.images[0]}
                alt={business.name}
                className="w-full h-full object-cover"
              />
            </div>
            {business.images.length > 1 && (
              <div className="grid grid-cols-3 gap-2">
                {business.images.slice(1, 4).map((image, index) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden">
                    <img 
                      src={image}
                      alt={`${business.name} ${index + 2}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Business Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">{business.name}</h1>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary">{business.category}</Badge>
                    {business.verified && (
                      <Badge variant="default" className="bg-success text-success-foreground">
                        Verified
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < Math.floor(business.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="font-medium">{business.rating}</span>
                <span className="text-muted-foreground">({business.reviews} reviews)</span>
              </div>

              <p className="text-muted-foreground mb-6">{business.description}</p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm">{business.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-sm">{business.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-primary" />
                <span className={`text-sm ${business.isOpen ? "text-success" : "text-destructive"}`}>
                  {business.isOpen ? "Open Now" : "Closed"}
                </span>
              </div>
              {business.website && (
                <div className="flex items-center gap-3">
                  <ExternalLink className="h-4 w-4 text-primary" />
                  <a href={`https://${business.website}`} className="text-sm text-primary hover:underline">
                    {business.website}
                  </a>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button className="w-full">
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </Button>
              <Button variant="outline" className="w-full">
                <MapPin className="h-4 w-4 mr-2" />
                Directions
              </Button>
            </div>
          </div>
        </div>

        {/* Opening Hours */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Opening Hours</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {Object.entries(business.openingHours).map(([day, hours]) => (
              <div key={day} className="flex justify-between">
                <span className="font-medium">{day}</span>
                <span className="text-muted-foreground">{hours}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Reviews Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
          
          {/* Write Review */}
          <div className="border rounded-lg p-4 mb-6">
            <h3 className="font-medium mb-3">Write a Review</h3>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm">Rating:</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-gray-300 hover:text-yellow-400 cursor-pointer transition-colors" />
                ))}
              </div>
            </div>
            <Textarea placeholder="Share your experience..." className="mb-3" />
            <Button>Submit Review</Button>
          </div>

          {/* Sample Reviews */}
          <div className="space-y-4">
            <div className="border-b pb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium">A</span>
                </div>
                <div>
                  <div className="font-medium text-sm">Anonymous User</div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Amazing food quality and excellent service. The biryani was perfectly cooked and very flavorful.
              </p>
            </div>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default BusinessDetail;