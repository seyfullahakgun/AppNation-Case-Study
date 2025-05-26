"use client";

import Card from "@/components/ui/Card";
import Image from "next/image";
import { useSettingsStore } from "@/store";
import { useWeather } from "@/hooks/useWeather";
import { useWeatherIcon } from "@/hooks/useWeatherIcon";
import Skeleton from "@/components/ui/Skeleton";
import type { CurrentWeather, City } from "@/types";
import moment from "moment-timezone";

// ------------- Ana komponent -------------
export default function CurrentWeatherCard() {
  const { units, selectedCity } = useSettingsStore();
  const { data, isLoading } = useWeather(selectedCity);

  // Şehir seçimi yoksa hata
  if (!selectedCity) {
    return <ErrorCard message="Şehir seçilmedi." />;
  }

  if (isLoading) {
    return <LoadingSkeleton />;
  }
  if (!data?.current) {
    return <ErrorCard />;
  }

  return (
    <ContentCard
      current={data.current}
      units={units}
      selectedCity={selectedCity}
      timezoneOffset={data.timezone_offset}
    />
  );
}
// ------------- Alt-komponentler -------------

function LoadingSkeleton() {
  return (
    <Card className="p-6 bg-gradient-to-br from-blue-500 to-purple-600 text-white h-full w-full">
      <div className="flex flex-col justify-between h-full space-y-6">
        {/* City Information Skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="w-8 h-6" />
            <div className="flex flex-col gap-2">
              <Skeleton className="w-32 h-8" />
              <Skeleton className="w-24 h-4" />
            </div>
          </div>
          <Skeleton className="w-16 h-4" />
        </div>

        {/* Weather and Temperature Skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Skeleton className="w-20 h-20" />
            <div className="flex flex-col gap-2">
              <Skeleton className="w-24 h-12" />
              <Skeleton className="w-32 h-6" />
            </div>
          </div>
        </div>

        {/* Details Skeleton */}
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-4 bg-white/20 rounded-lg p-3"
            >
              <Skeleton className="w-6 h-6" />
              <div className="flex flex-col gap-2">
                <Skeleton className="w-16 h-4" />
                <Skeleton className="w-12 h-4" />
              </div>
            </div>
          ))}
        </div>

        {/* Sunrise/Sunset Skeleton */}
        <div className="flex items-center justify-between mt-2 border-t border-white/20 pt-4">
          <div className="flex items-center gap-4">
            <Skeleton className="w-6 h-6" />
            <Skeleton className="w-16 h-4" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="w-6 h-6" />
            <Skeleton className="w-16 h-4" />
          </div>
        </div>
      </div>
    </Card>
  );
}

interface ErrorCardProps {
  message?: string;
}
function ErrorCard({
  message = "Hava durumu bilgisi bulunamadı.",
}: ErrorCardProps) {
  return (
    <Card className="p-6 bg-gradient-to-br from-blue-500 to-purple-600 text-white h-full w-full">
      <div className="flex items-center justify-center h-48">
        <p>{message}</p>
      </div>
    </Card>
  );
}

interface ContentCardProps {
  current: CurrentWeather;
  units: string;
  selectedCity: City;
  timezoneOffset: number;
}

function ContentCard({
  current,
  selectedCity,
  units,
  timezoneOffset,
}: ContentCardProps) {
  const { iconPath } = useWeatherIcon(current.weather[0]);

  // Get UTC offset in hours (API provides in seconds)
  const offsetInHours = timezoneOffset / 3600;
  
  // Determine timezone based on offset
  const getTimezoneFromOffset = (offset: number) => {
    // Get all timezones from moment-timezone
    const allTimezones = moment.tz.names();
    
    // Filter timezones by offset
    const matchingTimezones = allTimezones.filter(tz => {
      const tzOffset = moment.tz(tz).utcOffset() / 60; // Convert to hours
      return tzOffset === offset;
    });

    // If matching timezones found, return the first one
    if (matchingTimezones.length > 0) {
      // First filter by country code
      const countryTimezones = matchingTimezones.filter(tz => 
        tz.toLowerCase().includes(selectedCity.country.toLowerCase())
      );
      
      // Use country-specific timezone if found, otherwise use first matching timezone
      return countryTimezones.length > 0 ? countryTimezones[0] : matchingTimezones[0];
    }

    // Fallback to UTC if no match found
    return "UTC";
  };

  const timezone = getTimezoneFromOffset(offsetInHours);

  // Calculate local time for the city
  const localTime = moment.unix(current.dt).tz(timezone).format("hh:mm A");

  // Helper function for sunrise and sunset times
  const formatTime = (timestamp: number) => {
    return moment.unix(timestamp).tz(timezone).format("hh:mm A");
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-blue-500 to-purple-600 text-white h-full w-full">
      <div className="flex flex-col justify-between h-full space-y-6">
        {/* City Information */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${selectedCity.country}.svg`}
              alt={selectedCity.country || ""}
              width={32}
              height={24}
              className="rounded-sm"
            />
            <div className="flex items-end gap-2">
              <h2 className="text-2xl font-bold uppercase">
                {selectedCity.name}
              </h2>
              <p className="text-secondary capitalize">
                {selectedCity.state && `${selectedCity.state}, `}
                {selectedCity.country}
              </p>
            </div>
          </div>

          {/* Time */}
          <p className="text-secondary text-sm">{localTime}</p>
        </div>

        {/* Weather and Temperature */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src={iconPath}
              alt={current.weather[0].description}
              width={80}
              height={80}
              className="w-20 h-20"
            />
            <div>
              <p className="text-4xl font-bold">
                {Math.round(current.temp)}°{units === "metric" ? "C" : "F"}
              </p>
              <p className="text-secondary capitalize">
                {current.weather[0].description}
              </p>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-4 bg-white/20 rounded-lg p-3">
            <Image
              src={"/icons/wind-light.svg"}
              alt="Wind"
              width={24}
              height={24}
            />
            <div className="flex flex-col text-sm">
              <p className="text-secondary capitalize">Wind </p>
              <p className="font-semibold">
                {Math.round(current.wind_speed)} km/s
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white/20 rounded-lg p-3">
            <Image
              src={"/icons/moisture-light.svg"}
              alt="Humidity"
              width={24}
              height={24}
            />
            <div className="flex flex-col text-sm">
              <p className="text-secondary capitalize">Humidity </p>
              <p className="font-semibold">{current.humidity}%</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white/20 rounded-lg p-3">
            <Image
              src={"/icons/temperature-light.svg"}
              alt="Feels Like"
              width={24}
              height={24}
            />
            <div className="flex flex-col text-sm">
              <p className="text-secondary capitalize">Feels Like </p>
              <p className="font-semibold">
                {Math.round(current.feels_like)}°
                {units === "metric" ? "C" : "F"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white/20 rounded-lg p-3">
            <Image
              src={"/icons/visibility.svg"}
              alt="Visibility"
              width={24}
              height={24}
            />
            <div className="flex flex-col text-sm">
              <p className="text-secondary capitalize">Visibility </p>
              <p className="font-semibold">
                {Math.round(current.visibility / 1000)} km
              </p>
            </div>
          </div>
        </div>

        {/* Sunrise and Sunset */}
        <div className="flex items-center justify-between mt-2 border-t border-white/20 pt-4">
          <div className="flex items-center gap-4">
            <Image
              src={"/icons/sunrise-light.svg"}
              alt="Sunrise"
              width={24}
              height={24}
            />
            <p className="text-sm">
              {formatTime(current.sunrise)}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Image
              src={"/icons/sunset.svg"}
              alt="Sunset"
              width={24}
              height={24}
            />
            <p className="text-sm">
              {formatTime(current.sunset)}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
