import { Check, Upload, MapPin, Phone, Mail, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const benefits = [
  "Lifetime listing - No monthly fees",
  "Show up in local search results",
  "Add photos, logo, and business hours",
  "Get customer reviews and ratings",
  "Share QR code for easy access",
  "Professional business profile page",
  "Fast approval within 24-48 hours",
  "Edit and update anytime"
];

const ListingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              List Your Business Online
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get discovered by thousands of local customers. Create your professional 
              business listing in minutes.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Listing Form */}
            <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6">Business Information</h2>
              <form className="space-y-6">
                <div>
                  <Label htmlFor="businessName">Business Name *</Label>
                  <Input id="businessName" placeholder="Enter your business name" />
                </div>

                <div>
                  <Label htmlFor="category">Category *</Label>
                  <select 
                    id="category"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">Select category</option>
                    <option value="restaurants">Restaurants</option>
                    <option value="shopping">Shopping</option>
                    <option value="automotive">Automotive</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="education">Education</option>
                    <option value="home-services">Home Services</option>
                    <option value="beauty-spa">Beauty & Spa</option>
                    <option value="real-estate">Real Estate</option>
                    <option value="fashion">Fashion</option>
                    <option value="home-garden">Home & Garden</option>
                    <option value="fitness">Fitness</option>
                    <option value="photography">Photography</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe your business, services, and what makes you unique"
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="address">Address *</Label>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <Input id="address" placeholder="Full business address" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <Input id="phone" placeholder="+91 XXXXX XXXXX" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <Input id="email" type="email" placeholder="your@email.com" />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="website">Website (Optional)</Label>
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <Input id="website" placeholder="https://yourwebsite.com" />
                  </div>
                </div>

                <div>
                  <Label>Upload Photos</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag & drop images or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Upload logo and business photos (Max 8 images, 5MB each)
                    </p>
                  </div>
                </div>
              </form>
            </Card>

            {/* Pricing & Benefits */}
            <div className="space-y-6">
              {/* Pricing Card */}
              <Card className="p-8 bg-primary text-primary-foreground">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">Simple Pricing</h3>
                  <div className="text-6xl font-bold mb-2">₹149</div>
                  <div className="text-xl mb-1">One-time payment</div>
                  <div className="text-sm opacity-90">No monthly fees • Lifetime listing</div>
                </div>
                
                <Button size="lg" variant="secondary" className="w-full text-lg">
                  Continue to Payment
                </Button>
                
                <p className="text-center text-sm mt-4 opacity-80">
                  100% Secure Payment • Fast Approval
                </p>
              </Card>

              {/* Benefits Card */}
              <Card className="p-8">
                <h3 className="text-xl font-bold mb-6">What's Included</h3>
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Support */}
              <div className="text-center p-6 bg-secondary/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">
                  Need help? Our team is here to assist you
                </p>
                <Button variant="outline" size="sm">
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ListingPage;
