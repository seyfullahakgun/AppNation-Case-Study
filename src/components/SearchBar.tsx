"use client";

import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { City } from "@/types";
import { useSettingsStore } from "@/store";
import { api } from "@/lib/axios";

const RECENT_SEARCHES_KEY = "recentSearches";

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [recentSearches, setRecentSearches] = useState<City[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { selectedCity, setSelectedCity } = useSettingsStore();
  const { theme } = useSettingsStore();

  // localStorage'dan recentSearches'i yükle
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

  // recentSearches değiştiğinde localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(recentSearches));
  }, [recentSearches]);

  // Initialize search value with selected city
  useEffect(() => {
    if (selectedCity) {
      setSearchValue(selectedCity.name);
    }
  }, [selectedCity]);

  // Debounce process
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(searchValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        // Always restore the selected city name when clicking outside
        if (selectedCity) {
          setSearchValue(selectedCity.name);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectedCity]);

  // City search query with Axios
  const {
    data: cities,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cities", debouncedValue],
    queryFn: async () => {
      if (!debouncedValue) return [];
      try {
        const { data } = await api.get(`/cities?q=${debouncedValue}`);
        return data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(
            error.response?.data?.message || "Failed to fetch cities"
          );
        }
        throw error;
      }
    },
    enabled: debouncedValue.length > 0,
  });

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
    setSearchValue(city.name);
    setRecentSearches((prev) => {
      const newSearches = [
        city,
        ...prev.filter((c) => c.name !== city.name),
      ].slice(0, 5);
      return newSearches;
    });
    setIsOpen(false);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
    // Clear input only if there's a selected city
    if (selectedCity) {
      setSearchValue("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          value={searchValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder="Search for a city..."
          className="w-full px-4 py-2 pl-10 text-gray-600 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary border border-gray-200 dark:border-gray-400 transition-all duration-300"
        />
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
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute w-full mt-2 p-2 text-gray-600 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-400"
          >
            {searchValue ? (
              <>
                {isLoading && (
                  <div className="p-4 text-center text-secondary">
                    Loading...
                  </div>
                )}
                {error && (
                  <div className="p-4 text-center text-red-500">
                    {error instanceof Error
                      ? error.message
                      : "An error occurred"}
                  </div>
                )}
                {!isLoading && !error && cities?.length === 0 && (
                  <div className="p-4 text-center text-secondary">
                    No results found for "{searchValue}"
                  </div>
                )}
                {cities?.map((city: City, index: number) => (
                  <motion.button
                    key={`${city.name}-${city.country}-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
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
                  </motion.button>
                ))}
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
                    <motion.button
                      key={`${city.name}-${city.country}-${index}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
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
                    </motion.button>
                  ))
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
