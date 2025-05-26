"use client";

import Card from "@/components/ui/Card";
import Image from "next/image";
import { useSettingsStore } from "@/store";
import { useWeather } from "@/hooks/useWeather";
import { useWeatherIcon } from "@/hooks/useWeatherIcon";
import Skeleton from "@/components/ui/Skeleton";
import type { DailyWeather } from "@/types";

// ------------- Ana komponent -------------
export default function DailyForecastCard() {
  const { theme, selectedCity } = useSettingsStore();
  const { data, isLoading } = useWeather(selectedCity);

  if (!selectedCity) {
    return <ErrorCard message="Şehir seçilmedi." />;
  }
  if (isLoading) {
    return <LoadingSkeleton />;
  }
  if (!data?.daily) {
    return <ErrorCard />;
  }

  // İlk 5 günlük tahmin
  const forecasts: DailyWeather[] = data.daily.slice(0, 5);
  return <ContentCard forecasts={forecasts} theme={theme} />;
}

// ------------- Alt-komponentler -------------

function LoadingSkeleton() {
  return (
    <Card className="flex flex-col gap-4 p-6 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-200 rounded-lg h-full w-full transition-all duration-300">
      {/* Başlık Skeleton */}
      <div className="flex items-center justify-between">
        <Skeleton className="w-32 h-6" />
        <Skeleton className="w-40 h-4" />
      </div>

      {/* Günlük Tahmin Skeletonları */}
      <div className="flex flex-col gap-2">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg bg-gray-50/50 dark:bg-gray-700/50 transition-all duration-300"
          >
            <div className="flex items-center gap-2">
              <div className="w-24">
                <Skeleton className="w-20 h-5 mb-1" />
                <Skeleton className="w-16 h-4" />
              </div>
              <Skeleton className="w-10 h-10 rounded-full" />
            </div>
            <div className="flex items-center gap-1">
              <Skeleton className="w-4 h-4" />
              <Skeleton className="w-24 h-5" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

interface ErrorCardProps {
  message?: string;
}
function ErrorCard({ message = "Veri alınamadı." }: ErrorCardProps) {
  return (
    <Card className="p-6 bg-red-100 text-red-800 rounded-lg h-full w-full">
      <div className="flex items-center justify-center h-48">
        <p>{message}</p>
      </div>
    </Card>
  );
}

interface ContentCardProps {
  forecasts: DailyWeather[];
  theme: string;
}
function ContentCard({ forecasts, theme }: ContentCardProps) {
  // Hook çağrılarını döngüden önce, sabit sıra ile yapıyoruz
  // forecasts array always length 5
  const [f0, f1, f2, f3, f4] = forecasts;
  const icon0 = useWeatherIcon(f0.weather[0]).iconPath;
  const icon1 = useWeatherIcon(f1.weather[0]).iconPath;
  const icon2 = useWeatherIcon(f2.weather[0]).iconPath;
  const icon3 = useWeatherIcon(f3.weather[0]).iconPath;
  const icon4 = useWeatherIcon(f4.weather[0]).iconPath;
  const icons = [icon0, icon1, icon2, icon3, icon4];
  
  return (
    <Card className="flex flex-col gap-4 p-6 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-200 rounded-lg h-full w-full transition-all duration-300">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">5-Day Forecast</h3>
      </div>
      <div className="flex flex-col gap-2">
        {forecasts.map((forecast, idx) => {
          const date = new Date(forecast.dt * 1000);
          const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
          const iconPath = icons[idx];

          return (
            <div
              key={forecast.dt}
              className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-600/50 transition-all duration-300"
            >
              {/* Gün ve İkon */}
              <div className="flex items-center gap-2">
                <div className="w-24">
                  <p className="font-semibold capitalize">{dayName}</p>
                  <p className="text-sm text-secondary">
                    {date.toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                    })}
                  </p>
                </div>
                <Image
                  src={iconPath}
                  alt={forecast.weather[0].description}
                  width={40}
                  height={40}
                  className="w-10 h-10"
                />
              </div>

              {/* Sıcaklık */}
              <div className="flex items-center gap-1">
                <Image
                  src={`/icons/temperature-${
                    theme === "dark" ? "light" : "dark"
                  }.svg`}
                  alt="Temperature"
                  width={16}
                  height={16}
                />
                <p className="font-semibold">
                  {Math.round(forecast.temp.max)}° /{" "}
                  {Math.round(forecast.temp.min)}°
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
