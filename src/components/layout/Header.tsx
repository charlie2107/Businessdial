import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/60 backdrop-blur-md shadow-md border-b border-gray-200">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-0">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="text-3xl font-extrabold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient">
            BusinessHub
          </div>
        </Link>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <Button
            variant="gradient"
            size="sm"
            className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 transform hover:scale-105 transition-all duration-300"
            asChild
          >
            <Link to="/list-business">List Your Business</Link>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            asChild
            className="flex items-center space-x-2 hover:text-indigo-500 transition-colors"
          >
            <Link to="/sign-in">
              <User className="h-5 w-5" />
              <span className="hidden sm:inline ml-1 font-medium">Sign In</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
