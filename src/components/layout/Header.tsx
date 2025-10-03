import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-lg border-b border-pink-100">
      {/* Use a wider container on desktop screens */}
      <div className="mx-auto max-w-screen-xl flex items-center justify-between h-20 px-4 md:px-10">
        {/* Logo aligned left */}
        <Link to="/" className="flex items-center">
          <span className="text-base xs:text-lg sm:text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            BusinessHub
          </span>
        </Link>
        {/* Button Actions aligned right and spaced */}
        <div className="flex items-center gap-2 md:gap-6">
          <Button
            variant="gradient"
            size="sm"
            className="text-xs xs:text-sm sm:text-base md:text-lg bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 hover:from-pink-500 hover:to-orange-500 rounded-xl font-semibold px-4 sm:px-6 py-2 shadow-md whitespace-nowrap min-w-[110px]"
            asChild
          >
            <Link to="/list-business">
              List Your Business
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="flex items-center hover:text-pink-500 rounded-full p-2 transition-colors"
          >
            <Link to="/sign-in" className="flex items-center">
              <User className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="hidden md:inline ml-2 font-medium text-xs sm:text-base">
                Sign In
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
