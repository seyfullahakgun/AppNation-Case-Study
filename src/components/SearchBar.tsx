"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import axios from "axios";
import { City } from "@/types";
import { useSettingsStore } from "@/store";
import { api } from "@/lib/axios";

const RECENT_SEARCHES_KEY = "recentSearches";

export default function SearchBar() {
  const { selectedCity, setSelectedCity, theme, showToast } =
    useSettingsStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [debouncedValue, setDebouncedValue] = useState("");
  const [recentSearches, setRecentSearches] = useState<City[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Memoize handlers
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    []
  );

  const handleInputFocus = useCallback(() => {
    setIsOpen(true);
    if (selectedCity) {
      setSearchQuery("");
    }
  }, [selectedCity]);

  const handleCitySelect = useCallback(
    (city: City) => {
      setSelectedCity(city);
      setSearchQuery(city.name);
      setRecentSearches((prev) => {
        const newSearches = [
          city,
          ...prev.filter((c) => c.name !== city.name),
        ].slice(0, 5);
        return newSearches;
      });
      setIsOpen(false);
    },
    [setSelectedCity]
  );

  // Memoize search icon
  const searchIcon = useMemo(
    () => (
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary">
        {theme === "dark" ? (
          <Image
            src="/icons/search-light.svg"
            alt="Search"
            width={20}
            height={20}
            className="opacity-50"
          />
        ) : (
          <Image
            src="/icons/search-dark.svg"
            alt="Search"
            width={20}
            height={20}
            className="opacity-50"
          />
        )}
      </div>
    ),
    [theme]
  );

  // Load recent searches
  useEffect(() => {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (stored) {
      try {
        setRecentSearches(JSON.parse(stored));
      } catch {
        setRecentSearches([]);
      }
    }
  }, []);

  // Save recent searches
  useEffect(() => {
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(recentSearches));
  }, [recentSearches]);

  // Initialize search value
  useEffect(() => {
    if (selectedCity) {
      setSearchQuery(selectedCity.name);
    }
  }, [selectedCity]);

  // Debounce search
  useEffect(() => {
    setErrorMessage("");
    const timer = setTimeout(() => {
      setDebouncedValue(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        if (selectedCity) {
          setSearchQuery(selectedCity.name);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectedCity]);

  // City search query
  const { data: cities, isPending } = useQuery({
    queryKey: ["cities", debouncedValue],
    queryFn: async () => {
      if (!debouncedValue) return [];
      try {
        const { data } = await api.get(`/cities?q=${debouncedValue}`);
        return data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const errorMessage = error.message || "Failed to fetch cities";
          setErrorMessage(errorMessage);
          showToast({
            message: errorMessage,
            type: "error",
          });
          throw new Error(errorMessage);
        }
        showToast({
          message:
            error instanceof Error
              ? error.message
              : "An unexpected error occurred",
          type: "error",
        });
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "An unexpected error occurred"
        );
        throw error;
      }
    },
    enabled: debouncedValue.length > 0,
  });

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder="Search for a city..."
          className="w-full px-4 py-2 pl-10 text-gray-600 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary border border-gray-200 dark:border-gray-400 transition-all duration-300"
        />
        {searchIcon}
      </div>

      <div
        className={`absolute w-full mt-2 p-2 text-gray-600 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-400 transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        {searchQuery ? (
          <>
            {errorMessage ? (
              <div className="p-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <Image
                    src="/icons/danger.svg"
                    alt="Error"
                    width={20}
                    height={20}
                  />
                  <span>{errorMessage}</span>
                </div>
              </div>
            ) : isPending ? (
              <div className="p-4 text-center text-secondary">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <span>Searching...</span>
                </div>
              </div>
            ) : cities?.length === 0 ? (
              <div className="p-4 text-center text-secondary">
                No results found for {searchQuery}
              </div>
            ) : (
              cities?.map((city: City, index: number) => (
                <button
                  key={`${city.name}-${city.country}-${index}`}
                  onClick={() => handleCitySelect(city)}
                  className="w-full px-4 py-2 text-left rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center gap-2 text-foreground cursor-pointer"
                >
                  <Image
                    src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${city.country}.svg`}
                    alt={city.country}
                    width={24}
                    height={16}
                  />
                  <span>{city.name}</span>
                  {city.state && (
                    <span className="text-secondary">({city.state})</span>
                  )}
                </button>
              ))
            )}
          </>
        ) : (
          <>
            <h3 className="px-2 py-1 text-sm font-semibold text-secondary">
              Recent Searches
            </h3>
            {recentSearches.length === 0 ? (
              <div className="p-4 text-center text-secondary">
                No recent searches
              </div>
            ) : (
              recentSearches.map((city, index) => (
                <button
                  key={`${city.name}-${city.country}-${index}`}
                  onClick={() => handleCitySelect(city)}
                  className="w-full px-4 py-2 text-left rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center gap-2 text-card-foreground cursor-pointer"
                >
                  <Image
                    src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${city.country}.svg`}
                    alt={city.country}
                    width={24}
                    height={16}
                  />
                  <span>{city.name}</span>
                </button>
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
}
