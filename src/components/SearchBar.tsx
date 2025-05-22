'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { City } from '@/types'
import { useSettingsStore } from '@/store'

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [debouncedValue, setDebouncedValue] = useState('')
  const [recentSearches, setRecentSearches] = useState<City[]>([])
  const wrapperRef = useRef<HTMLDivElement>(null)

  const { selectedCity, setSelectedCity } = useSettingsStore()

  // Initialize search value with selected city
  useEffect(() => {
    if (selectedCity) {
      setSearchValue(selectedCity.name)
    }
  }, [selectedCity])

  // Debounce process
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(searchValue)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchValue])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        // Always restore the selected city name when clicking outside
        if (selectedCity) {
          setSearchValue(selectedCity.name)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [selectedCity])

  // City search query
  const { data: cities, isLoading, error } = useQuery({
    queryKey: ['cities', debouncedValue],
    queryFn: async () => {
      if (!debouncedValue) return []
      const response = await fetch(`/api/cities?q=${debouncedValue}`)
      if (!response.ok) throw new Error('Failed to fetch cities')
      return response.json()
    },
    enabled: debouncedValue.length > 0,
  })

  const handleCitySelect = (city: City) => {
    setSelectedCity(city)
    setSearchValue(city.name)
    setRecentSearches(prev => {
      const newSearches = [city, ...prev.filter(c => c.name !== city.name)].slice(0, 5)
      return newSearches
    })
    setIsOpen(false)
  }

  const handleInputFocus = () => {
    setIsOpen(true)
    // Clear input only if there's a selected city
    if (selectedCity) {
      setSearchValue('')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          value={searchValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder="Search for a city..."
          className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
          <Image
            src="/icons/search.svg"
            alt="Search"
            width={20}
            height={20}
            className="dark:invert opacity-50 dark:text-white "
          />
        </div>
      </div>

      <div 
        className={`
          absolute w-full mt-1 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg
          transition-all duration-300 ease-in-out transform origin-top
          ${isOpen 
            ? 'opacity-100 scale-y-100' 
            : 'opacity-0 scale-y-0 pointer-events-none'
          }
        `}
      >
        {searchValue ? (
          <>
            {isLoading && (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">Loading...</div>
            )}
            {error && (
              <div className="p-4 text-center text-red-500">An error occurred</div>
            )}
            {!isLoading && !error && cities?.length === 0 && (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                No results found for "{searchValue}"
              </div>
            )}
            {cities?.map((city: City, index: number) => (
              <button
                key={`${city.name}-${city.country}-${index}`}
                onClick={() => handleCitySelect(city)}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 dark:text-white"
              >
                <Image
                  src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${city.country}.svg`}
                  alt={city.country}
                  width={24}
                  height={16}
                />
                <span>{city.name}</span>
                {city.state && <span className="text-gray-500 dark:text-gray-400">({city.state})</span>}
              </button>
            ))}
          </>
        ) : (
          <div className="p-2">
            <h3 className="px-2 py-1 text-sm font-semibold text-gray-500 dark:text-gray-400">Recent Searches</h3>
            {recentSearches.length === 0 ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                No recent searches
              </div>
            ) : (
              recentSearches.map((city, index) => (
                <button
                  key={`${city.name}-${city.country}-${index}`}
                  onClick={() => handleCitySelect(city)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 dark:text-white"
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
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchBar