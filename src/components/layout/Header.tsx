import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/60 backdrop-blur-md shadow-md border-b border-gray-200">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between h-auto sm:h-20 px-2 sm:px-4 py-2 sm:py-0 gap-y-2">
        {/* Logo */}
        <Link to="/" className="flex items-center w-full sm:w-auto justify-center sm:justify-start mb-2 sm:mb-0">
          <span className="text-xl sm:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient">
            BusinessHub
          </span>
        </Link>

        {/* Button Actions */}
        <div className="flex items-center w-full sm:w-auto justify-center sm:justify-end space-x-2">
          <Button
            variant="gradient"
            size="sm"
            className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 transform hover:scale-105 transition-all duration-300 text-sm sm:text-base px-4 py-2"
            asChild
          >
            <Link to="/list-business" className="whitespace-nowrap">
              List Your Business
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="flex items-center hover:text-indigo-500 transition-colors px-2 py-2"
          >
            <Link to="/sign-in">
              <User className="h-5 w-5" />
              <span className="hidden sm:inline ml-1 font-medium">
                Sign In
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
