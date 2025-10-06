import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { searchBusinesses } from "@/services/businessService";

const gradientAnimationStyle = `
  .animated-gradient {
    background: linear-gradient(90deg,#6366f1,#a21caf,#ec4899,#f59e42,#6366f1);
    background-size: 400% 400%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
    animation: gradient-move 6s ease-in-out infinite;
  }
  @keyframes gradient-move {
    0%,100% {background-position:0% 50%;}
    50% {background-position:100% 50%;}
  }
`;

export function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Typing animation
  const fullTitle = "Find Local Businesses Near You";
  const fullSubtitle =
    "Discover amazing local businesses. From restaurants to services, find everything with just one search.";
  const [titleText, setTitleText] = useState("");
  const [showSubtitle, setShowSubtitle] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTitleText(fullTitle.substring(0, i));
      i++;
      if (i > fullTitle.length) {
        clearInterval(interval);
        setShowSubtitle(true);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Fetch results
useEffect(() => {
  const timeout = setTimeout(async () => {
    if (searchQuery.trim().length > 0) {
      const data = await searchBusinesses(searchQuery);
      setResults(data);
      setShowDropdown(true);
    } else {
      setResults([]);
      setShowDropdown(false);
    }
  }, 300);

  return () => clearTimeout(timeout);
}, [searchQuery]);

  return (
    <section className="relative min-h-[450px] flex flex-col items-center justify-center px-2 sm:px-4 text-center bg-gradient-to-r from-indigo-50 via-white to-pink-50">
      <style>{gradientAnimationStyle}</style>

      <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold mb-4 leading-tight text-gray-900">
        <span className="animated-gradient">{titleText}</span>
      </h1>

      <p className="text-base sm:text-lg md:text-xl mb-8 max-w-2xl text-gray-700 whitespace-pre-wrap">
        {showSubtitle && fullSubtitle}
      </p>

      <div className="w-full max-w-4xl mb-10 relative">
        <div className="flex flex-col md:flex-row items-stretch gap-2 md:gap-4 relative">
          {/* Search Input */}
          <div className="relative flex items-center w-full">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-pink-400" />
            <input
              type="text"
              placeholder="Search for restaurants, shops, services..."
              className="pl-10 pr-4 h-11 md:h-16 rounded-full border-2 border-pink-300 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition-all text-base sm:text-xl md:text-2xl font-semibold text-gray-800 w-full outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => results.length && setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
            />

            {/* 🔥 Attractive Dropdown */}
            {showDropdown && results.length > 0 && (
              <ul className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-xl shadow-lg mt-2 z-50 max-h-72 overflow-auto text-left scrollbar-thin scrollbar-thumb-pink-300 scrollbar-track-gray-100">
                {results.map((business) => (
                  <li key={business._id} className="px-3 py-2 hover:bg-pink-50 transition-colors rounded-lg m-1">
                    <Link
                      to={`/category/${business.category._id}`}
                      className="flex justify-between items-center w-full text-gray-800 font-medium"
                      onClick={() => setShowDropdown(false)}
                    >
                      <span>{business.name}</span>
                      <span className="text-sm bg-pink-100 text-pink-600 px-2 py-1 rounded-full font-semibold">
                        {business.category.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Search Button (disabled) */}
          <button
            disabled
            className="w-full md:w-auto md:ml-2 rounded-full flex items-center justify-center px-6 py-3 md:px-12 md:py-4 text-base sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-pink-400 to-orange-300 text-white shadow-md opacity-60 cursor-not-allowed"
          >
            Search
          </button>
        </div>
      </div>

      <div>
        <p className="text-gray-600 mb-4">Own a business? Get listed today!</p>
        <Button size="lg" variant="secondary" className="px-8 py-3" asChild>
          <Link to="/list-business">List Your Business</Link>
        </Button>
      </div>
    </section>
  );
}
