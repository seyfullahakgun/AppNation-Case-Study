"use client";

import { WeatherData } from "@/types";
import Card from "@/components/ui/Card";
import { useSettingsStore } from "@/store";
import Image from "next/image";
import { useWeatherIcon } from "@/hooks/useWeatherIcon";
import { useWeather } from "@/hooks/useWeather";
import Skeleton from "@/components/ui/Skeleton";

export default function CurrentWeatherCard() {
  const { units, selectedCity } = useSettingsStore();
  const { data, isLoading } = useWeather(selectedCity);

  if (isLoading) {
    return (
      <Card className="p-6 bg-gradient-to-br from-blue-500 to-purple-600 text-white h-full w-full">
        <div className="flex flex-col justify-between h-full space-y-6">
          {/* Şehir Bilgileri Skeleton */}
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

          {/* Hava Durumu ve Sıcaklık Skeleton */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Skeleton className="w-20 h-20" />
              <div className="flex flex-col gap-2">
                <Skeleton className="w-24 h-12" />
                <Skeleton className="w-32 h-6" />
              </div>
            </div>
          </div>

          {/* Detaylar Skeleton */}
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

          {/* Gün Doğumu/Batımı Skeleton */}
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

  if (!data || !data.current) {
    return (
      <Card className="p-6 bg-gradient-to-br from-blue-500 to-purple-600 text-white h-full w-full">
        <div className="flex items-center justify-center h-48">
          <p>Hava durumu bilgisi bulunamadı.</p>
        </div>
      </Card>
    );
  }

  const current = data.current;
  const { iconPath } = useWeatherIcon(current.weather[0]);
  const localTime = new Date(current.dt * 1000).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Istanbul",
  });
  return (
    <Card className="p-6 bg-gradient-to-br from-blue-500 to-purple-600 text-white h-full w-full">
      <div className="flex flex-col justify-between h-full space-y-6">
        {/* Şehir Bilgileri */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${selectedCity?.country}.svg`}
              alt={selectedCity?.country || ""}
              width={32}
              height={24}
              className="rounded-sm"
            />
            <div className="flex items-end gap-2">
              <h2 className="text-2xl font-bold uppercase">
                {selectedCity?.name}
              </h2>
              <p className="text-secondary capitalize">
                {selectedCity?.state && `${selectedCity.state}, `}
                {selectedCity?.country}
              </p>
            </div>
          </div>

          {/* Saat */}
          <p className="text-secondary text-sm">{localTime}</p>
        </div>

        {/* Hava Durumu ve Sıcaklık */}
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

        {/* Detaylar */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-4 bg-white/20 rounded-lg p-3">
            <Image
              src={"/icons/wind-light.svg"}
              alt="Rüzgar"
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
              alt="Nem"
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
              alt="Hissedilen"
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
              alt="Gün Doğumu"
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

        <div className="flex items-center justify-between mt-2 border-t border-white/20 pt-4">
          <div className="flex items-center gap-4">
            <Image
              src={"/icons/sunrise-light.svg"}
              alt="Gün Doğumu"
              width={24}
              height={24}
            />
            <p className="text-sm">
              {new Date(
                (current.sunrise + data.timezone_offset) * 1000
              ).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "Europe/Istanbul",
              })}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Image
              src={"/icons/sunset.svg"}
              alt="Gün Batımı"
              width={24}
              height={24}
            />
            <p className="text-sm">
              {new Date(
                (current.sunset + data.timezone_offset) * 1000
              ).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "Europe/Istanbul",
              })}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
