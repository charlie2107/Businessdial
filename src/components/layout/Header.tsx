import { User, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [location, setLocation] = useState<string>("");

  const handleLogout = () => {
    logout(); // Clear auth state / tokens
    navigate("/"); // Redirect to home page
  };

  // Fetch user city
  useEffect(() => {
    const fetchLocation = async (lat: number, lon: number) => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
        );
        const data = await res.json();
        const city =
          data.address.city ||
          data.address.town ||
          data.address.village ||
          data.address.county ||
          "";
        setLocation(city);
      } catch (err) {
        console.error("Failed to fetch location:", err);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchLocation(latitude, longitude);
        },
        (err) => {
          console.error("Geolocation error:", err);
        }
      );
    }
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-lg border-b border-gray-200">
      <div className="mx-auto max-w-screen-xl flex flex-wrap items-center justify-between h-20 px-4 md:px-10">
        {/* Logo */}
        <Link to="/" className="flex items-center flex-shrink-0">
          <span className="text-lg sm:text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            BusinessHub
          </span>
        </Link>

        {/* Right actions */}
        <div className="flex items-center gap-2 md:gap-4 lg:gap-6 mt-2 md:mt-0 flex-wrap">
          {/* Location Badge */}
          {location && (
            <div className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 shadow-sm whitespace-nowrap">
              <MapPin className="w-4 h-4 text-red-500" />
              <span>{location}</span>
            </div>
          )}

          {/* List Your Business */}
          <Button
            variant="gradient"
            size="sm"
            className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 hover:from-pink-500 hover:to-orange-500 rounded-xl font-semibold px-4 py-2 text-sm sm:text-base shadow-md whitespace-nowrap"
            asChild
          >
            <Link to="/list-business">List Your Business</Link>
          </Button>

          {/* Auth Buttons */}
          {user ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-sm font-medium text-red-500 hover:text-red-600 rounded-xl px-4 py-2 transition-colors whitespace-nowrap"
            >
              Logout
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="flex items-center hover:text-pink-500 rounded-full p-2 transition-colors whitespace-nowrap"
            >
              <Link to="/sign-in" className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline font-medium text-sm sm:text-base">Sign In</span>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
