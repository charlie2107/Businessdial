import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const footerLinks = {
  business: [
    { name: "List Your Business", href: "/list-business" },
    { name: "Business Login", href: "/business/login" },
    { name: "Pricing", href: "/pricing" },
    { name: "Success Stories", href: "/success-stories" },
  ],
  categories: [
    { name: "Restaurants", href: "/category/restaurants" },
    { name: "Shopping", href: "/category/shopping" },
    { name: "Healthcare", href: "/category/healthcare" },
    { name: "Home Services", href: "/category/home-services" },
  ],
  cities: [
    { name: "Mumbai", href: "/city/mumbai" },
    { name: "Delhi", href: "/city/delhi" },
    { name: "Bangalore", href: "/city/bangalore" },
    { name: "Chennai", href: "/city/chennai" },
  ],
  support: [
    { name: "Help Center", href: "/help" },
    { name: "Contact Us", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-secondary border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand and Contact */}
          <div className="lg:col-span-2">
            <div className="text-2xl font-bold text-primary mb-4">
              BusinessHub
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Your trusted local business directory. Connecting customers with 
              amazing businesses across India since 2024.
            </p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <span>support@businesshub.in</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <span>+91 99999 00000</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Instagram className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Business Links & Pricing */}
          <div>
            <h3 className="font-semibold mb-4">For Business</h3>
            <div className="bg-primary/5 rounded-lg p-4 mb-4">
              <div className="text-2xl font-bold text-primary mb-1">₹149</div>
              <div className="text-sm text-muted-foreground">One-time listing fee</div>
              <div className="text-xs text-muted-foreground">Lifetime visibility</div>
            </div>
            <ul className="space-y-3">
              {footerLinks.business.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Popular Categories</h3>
            <ul className="space-y-3">
              {footerLinks.categories.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2024 BusinessHub. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy Policy
            </a>
            <a href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Terms of Service
            </a>
            <a href="/sitemap" className="text-sm text-muted-foreground hover:text-foreground">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}