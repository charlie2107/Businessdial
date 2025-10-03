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

  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: "52px",
      height: "52px",
      fontSize: "18px",
      borderRadius: "999px",
      borderColor: state.isFocused ? "#f472b6" : "#E5E7EB",
      boxShadow: state.isFocused ? "0 0 0 3px #fbcffe55" : "none",
      background: "#fff",
      borderWidth: "2px"
    }),
    indicatorSeparator: () => ({ display: "none" }),
    menuPortal: base => ({ ...base, zIndex: 9999 }),
    menu: provided => ({ ...provided, zIndex: 9999 }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "0 8px"
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: '16px',
      backgroundColor: state.isSelected ? "#fa8fc7" : state.isFocused ? "#ffe4f4" : "white",
      color: "#22223b",
      padding: 14,
      borderRadius: "10px",
      margin: 2,
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: 8
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: "52px"
    }),
  };

  return (
    <section className="relative min-h-[520px] flex flex-col items-center justify-center px-4 text-center bg-gradient-to-r from-indigo-50 via-white to-pink-50">
      <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight text-gray-900">
        Find Local Businesses
        <br /><span className="text-indigo-600">Near You</span>
      </h1>
      <p className="text-lg md:text-xl mb-8 max-w-2xl text-gray-700">
        Discover amazing local businesses in your city. From restaurants to services, find everything you need with just one search.
      </p>

      <div className="w-full max-w-4xl mb-14">
        <div
          className="flex flex-row items-center bg-white/95 backdrop-blur-md rounded-full shadow-2xl border border-gray-100 px-4 py-4 gap-4"
          style={{ boxShadow: "0 8px 32px 0 #ECBDF2cc, 0 1.5px 8px #fbcffe2d" }}
        >
          {/* Location pill: MapPin + Select, perfectly aligned */}
          <div style={{ minWidth: 120 }}>
            <div className="flex items-center">
              <div className="flex items-center bg-white mr-2">
                <MapPin className="h-6 w-6 text-pink-400 ml-2" />
              </div>
              <div style={{ minWidth: 120, width: 120 }}>
                <Select
                  menuPortalTarget={typeof window !== "undefined" ? document.body : null}
                  options={cities}
                  value={selectedCity}
                  onChange={option => setSelectedCity(option)}
                  placeholder="Choose city"
                  styles={customSelectStyles}
                  isSearchable={true}
                  menuPlacement="bottom"
                  maxMenuHeight={220}
                  theme={theme => ({
                    ...theme,
                    borderRadius: 14,
                    colors: {
                      ...theme.colors,
                      primary25: '#ffe6fa',
                      primary: '#f472b6',
                    },
                  })}
                />
              </div>
            </div>
          </div>

          {/* Search Input */}
          <div className="flex-1 relative flex items-center px-3">
            <Search className="absolute left-7 top-1/2 transform -translate-y-1/2 h-7 w-7 text-pink-400" />
            <input
              type="text"
              placeholder="Search for restaurants, shops, services..."
              className="pl-16 pr-6 h-16 md:h-16 rounded-full bg-white border-2 border-transparent focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition-all text-2xl font-semibold text-gray-800 w-full outline-none"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="ml-2 rounded-full flex items-center justify-center px-12 py-4 text-2xl font-bold bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 text-white shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-pink-300"
            style={{ minWidth: "135px", letterSpacing: "0.02em", height: 64 }}
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
