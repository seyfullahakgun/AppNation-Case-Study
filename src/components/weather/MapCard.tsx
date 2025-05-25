"use client";

import { WeatherData } from "@/types";
import Card from "@/components/ui/Card";
import { useSettingsStore } from "@/store";
import dynamic from "next/dynamic";
import { useWeather } from "@/hooks/useWeather";
import Skeleton from "@/components/ui/Skeleton";

// Harita bileşenini dinamik olarak import et
const Map = dynamic(() => import("@/components/weather/Map"), {
  loading: () => (
    <div className="h-full w-full rounded-lg bg-gray-100 dark:bg-gray-700 animate-pulse" />
  ),
  ssr: false,
});

export default function MapCard() {
  const { selectedCity } = useSettingsStore();
  const { data, isLoading } = useWeather(selectedCity);

  if (isLoading) {
    return (
      <Card className="p-6 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-200 rounded-lg h-full transition-all duration-300">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Skeleton className="w-32 h-6 bg-gray-100 dark:bg-gray-700" />
            <Skeleton className="w-40 h-4 bg-gray-100 dark:bg-gray-700" />
          </div>
          <div className="h-[300px] w-full rounded-lg bg-gray-100 dark:bg-gray-700 animate-pulse" />
        </div>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="p-6 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-200 rounded-lg h-full transition-all duration-300">
        <div className="flex items-center justify-center h-[300px]">
          <p>Location data not found.</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-200 rounded-lg h-full transition-all duration-300">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Location Map</h3>
        </div>
        <div className="h-[350px] w-full rounded-lg overflow-hidden">
          <Map position={[data.lat, data.lon]} cityName={selectedCity?.name} />
        </div>
      </div>
    </Card>
  );
}
