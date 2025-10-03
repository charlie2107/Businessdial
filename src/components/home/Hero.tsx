import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// Custom CSS for gradient animation
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
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Typing animation states
  const fullTitle = "Find Local Businesses Near You";
  const fullSubtitle = "Discover amazing local businesses. From restaurants to services, find everything with just one search.";
  const [titleText, setTitleText] = useState("");
  const [subtitleText, setSubtitleText] = useState("");

  useEffect(() => {
    let titleIndex = 0;
    let subtitleIndex = 0;

    // Animate title typing
    const titleInterval = setInterval(() => {
      setTitleText(fullTitle.substr(0, titleIndex));
      titleIndex++;
      if (titleIndex > fullTitle.length) {
        clearInterval(titleInterval);
        // After title done, start subtitle
        const subtitleInterval = setInterval(() => {
          setSubtitleText(fullSubtitle.substr(0, subtitleIndex));
          subtitleIndex++;
          if (subtitleIndex > fullSubtitle.length) {
            clearInterval(subtitleInterval);
          }
        }, 30);
      }
    }, 50);

    // Cleanup
    return () => {
      clearInterval(titleInterval);
    };
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="relative min-h-[450px] flex flex-col items-center justify-center px-2 sm:px-4 text-center bg-gradient-to-r from-indigo-50 via-white to-pink-50">
      {/* Inject gradient animation */}
      <style>{gradientAnimationStyle}</style>
      <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold mb-4 leading-tight text-gray-900">
        <span className="animated-gradient">
          {titleText}
        </span>
      </h1>
      <p className="text-base sm:text-lg md:text-xl mb-8 max-w-2xl text-gray-700 whitespace-pre-wrap">
        <span className="animated-gradient">{subtitleText}</span>
      </p>

      <div className="w-full max-w-4xl mb-10">
        <div className="flex flex-col md:flex-row items-stretch gap-2 md:gap-4">
          {/* Search Input */}
          <div className="relative flex items-center w-full">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-pink-400" />
            <input
              type="text"
              placeholder="Search for restaurants, shops, services..."
              className="pl-10 pr-4 h-11 md:h-16 rounded-full border-2 border-pink-300 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition-all text-base sm:text-xl md:text-2xl font-semibold text-gray-800 w-full outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="w-full md:w-auto md:ml-2 rounded-full flex items-center justify-center px-6 py-3 md:px-12 md:py-4 text-base sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 text-white shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-pink-300"
            style={{ letterSpacing: "0.02em", height: "auto", minWidth: 100 }}
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
