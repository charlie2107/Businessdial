import { MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { State, City } from "country-state-city";
import Select from "react-select";

export function Hero() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState({ value: "Mumbai", label: "Mumbai" });
  const [cities, setCities] = useState<{ value: string, label: string }[]>([]);

  useEffect(() => {
    const allCities: { value: string, label: string }[] = [];
    const states = State.getStatesOfCountry("IN");
    states.forEach((state) => {
      const stateCities = City.getCitiesOfState("IN", state.isoCode);
      stateCities.forEach((city) => allCities.push({ value: city.name, label: city.name }));
    });
    setCities(allCities.sort((a, b) => a.label.localeCompare(b.label)));
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(
        `/search?q=${encodeURIComponent(searchQuery)}&city=${encodeURIComponent(selectedCity.value)}`
      );
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Responsive select styles
  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: 44,
      height: 44,
      fontSize: 15,
      borderRadius: 999,
      borderColor: state.isFocused ? "#f472b6" : "#E5E7EB",
      boxShadow: state.isFocused ? "0 0 0 3px #fbcffe55" : "none",
      background: "#fff",
      borderWidth: 2,
      width: "100%"
    }),
    indicatorSeparator: () => ({ display: "none" }),
    menuPortal: base => ({ ...base, zIndex: 9999 }),
    menu: provided => ({
      ...provided,
      zIndex: 9999,
      minWidth: 100,
      maxWidth: 200
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "0 8px"
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: 15,
      backgroundColor: state.isSelected ? "#fa8fc7" : state.isFocused ? "#ffe4f4" : "white",
      color: "#22223b",
      padding: 12,
      borderRadius: 8,
      margin: 2,
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: 8
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: 44
    }),
  };

  return (
    <section className="relative min-h-[450px] flex flex-col items-center justify-center px-2 sm:px-4 text-center bg-gradient-to-r from-indigo-50 via-white to-pink-50">
      <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold mb-4 leading-tight text-gray-900">
        Find Local Businesses
        <br /><span className="text-indigo-600">Near You</span>
      </h1>
      <p className="text-base sm:text-lg md:text-xl mb-8 max-w-2xl text-gray-700">
        Discover amazing local businesses in your city. From restaurants to services, find everything with just one search.
      </p>

      <div className="w-full max-w-4xl mb-10">
        {/* Responsive: stack on mobile, row on desktop */}
        <div className="flex flex-col md:flex-row items-stretch gap-2 md:gap-4 bg-white/95 backdrop-blur-md rounded-full shadow-2xl border border-gray-100 px-2 md:px-4 py-3 md:py-4"
          style={{ boxShadow: "0 8px 32px 0 #ECBDF2cc, 0 1.5px 8px #fbcffe2d" }}>
          
          {/* Location pill */}
          <div className="flex items-center bg-white rounded-full px-2 w-full md:w-auto md:min-w-[135px] md:max-w-[210px]">
            <MapPin className="h-5 w-5 mr-2 text-pink-400" />
            <div className="w-full">
              <Select
                menuPortalTarget={typeof window !== "undefined" ? document.body : null}
                options={cities}
                value={selectedCity}
                onChange={option => setSelectedCity(option)}
                placeholder="City"
                styles={customSelectStyles}
                isSearchable={true}
                menuPlacement="bottom"
                maxMenuHeight={220}
                theme={theme => ({
                  ...theme,
                  borderRadius: 12,
                  colors: {
                    ...theme.colors,
                    primary25: '#ffe6fa',
                    primary: '#f472b6',
                  },
                })}
              />
            </div>
          </div>

          {/* Search Input */}
          <div className="relative flex items-center w-full">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-pink-400" />
            <input
              type="text"
              placeholder="Search for restaurants, shops, services..."
              className="pl-10 pr-4 h-11 md:h-16 rounded-full bg-white border-2 border-transparent focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition-all text-base sm:text-xl md:text-2xl font-semibold text-gray-800 w-full outline-none"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
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
