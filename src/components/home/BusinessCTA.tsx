import { Check, TrendingUp, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const benefits = [
  { icon: TrendingUp, text: "Increase visibility and reach new customers" },
  { icon: Users, text: "Connect with local community members" },
  { icon: MapPin, text: "Get found easily on maps and search" },
  { icon: Check, text: "Build trust with verified business profile" },
];

export function BusinessCTA() {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Join thousands of successful businesses already listed on BusinessHub. 
            Get discovered by customers in your area today!
          </p>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="flex items-center space-x-4 text-left">
                  <div className="w-12 h-12 bg-primary-foreground/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <p className="text-lg">{benefit.text}</p>
                </div>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3" asChild>
              <Link to="/list-business">
                List Your Business Now
              </Link>
            </Button>
            <div className="text-sm text-primary-foreground/70">
              ✓ Fast approval process • ✓ Professional support
            </div>
          </div>

          <p className="text-sm text-primary-foreground/60">
            Already have an account? 
            <Button variant="link" className="text-primary-foreground underline p-0 ml-1 h-auto">
              Sign in to manage your listing
            </Button>
          </p>
        </div>
      </div>
    </section>
  );
}