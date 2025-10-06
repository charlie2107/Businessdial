"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Star, MapPin, Phone, Clock, ExternalLink, Share2, Heart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { getBusinessById } from "@/contexts/BusinessService";

const BusinessDetail = () => {
  const { id } = useParams();
  const [business, setBusiness] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string>("");

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        if (!id) return;
        const data = await getBusinessById(id);
        setBusiness(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load business details");
      } finally {
        setLoading(false);
      }
    };
    fetchBusiness();
  }, [id]);

  const openLightbox = (image: string) => {
    setLightboxImage(image);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxImage("");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading business details...</p>
      </div>
    );
  }

  if (error || !business) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">{error || "Business not found"}</h1>
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
            <div
              className="aspect-video rounded-lg overflow-hidden cursor-pointer"
              onClick={() => openLightbox(business.photos?.[0] || "/placeholder.png")}
            >
              <img
                src={business.photos?.[0] || "/placeholder.png"}
                alt={business.name}
                className="w-full h-full object-cover"
              />
            </div>
            {business.photos?.length > 1 && (
              <div className="grid grid-cols-3 gap-2">
                {business.photos.slice(1, 4).map((image: string, index: number) => (
                  <div
                    key={index}
                    className="aspect-square rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => openLightbox(image)}
                  >
                    <img
                      src={image}
                      alt={`${business.name} ${index + 2}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
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
                    <Badge variant="secondary">{business.category?.name}</Badge>
                    <Badge variant="default" className="bg-success text-success-foreground">
                      Verified
                    </Badge>
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
                <span className="text-sm text-success">Open Now</span>
              </div>
              {business.website && (
                <div className="flex items-center gap-3">
                  <ExternalLink className="h-4 w-4 text-primary" />
                  <a
                    href={business.website}
                    target="_blank"
                    className="text-sm text-primary hover:underline"
                  >
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

        {/* Reviews Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
          <div className="border rounded-lg p-4 mb-6">
            <h3 className="font-medium mb-3">Write a Review</h3>
            <Textarea placeholder="Share your experience..." className="mb-3" />
            <Button>Submit Review</Button>
          </div>
          <p className="text-muted-foreground text-sm">No reviews yet.</p>
        </Card>
      </main>

      {/* Lightbox Overlay */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white"
            onClick={closeLightbox}
          >
            <X className="h-6 w-6" />
          </button>
          <img
            src={lightboxImage}
            alt="Full view"
            className="max-h-[90%] max-w-[90%] object-contain"
          />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default BusinessDetail;
