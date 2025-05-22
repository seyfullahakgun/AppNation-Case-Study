"use client";

import { useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import ThemeSwitch from "@/components/ThemeSwitch";
import UnitSwitch from "@/components/UnitSwitch";
import SettingsMenu from "@/components/SettingsMenu";
import { useSettingsStore } from "@/store";
import { useWeather } from "@/hooks/useWeather";
import CurrentWeatherCard from "@/components/weather/CurrentWeatherCard";
import DailyForecastCard from "@/components/weather/DailyForecastCard";
import MapCard from "@/components/weather/MapCard";

export default function Home() {
  const { setTheme, selectedCity, units } = useSettingsStore();
  const { data: weatherData, isLoading, error } = useWeather(selectedCity);

  // Sayfa ilk yüklendiğinde tema ayarını uygula
  useEffect(() => {
    // localStorage'dan tema değerini al
    const savedTheme = localStorage.getItem("weather-dashboard-settings");
    if (savedTheme) {
      const { state } = JSON.parse(savedTheme);
      // Eğer kaydedilmiş bir tema varsa onu kullan
      if (state.theme) {
        setTheme(state.theme);
      }
    }
  }, [setTheme]);

  return (
    <main className="min-h-screen">
      <div className="container mx-auto max-w-7xl">
        <div className="flex justify-between items-center mb-8 gap-4">
          <SearchBar />
          {/* Masaüstü görünümü */}
          <div className="hidden md:flex items-center gap-4">
            <UnitSwitch />
            <ThemeSwitch />
          </div>
          {/* Mobil görünüm */}
          <div className="md:hidden">
            <SettingsMenu />
          </div>
        </div>

        {/* Hava Durumu Bilgileri */}
        {selectedCity && (
          <div className="mt-8">
            {isLoading ? (
              <div className="text-center">Yükleniyor...</div>
            ) : error ? (
              <div className="text-center text-red-500">
                Hava durumu bilgileri alınamadı
              </div>
            ) : weatherData ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <CurrentWeatherCard data={weatherData} />
                <DailyForecastCard data={weatherData} />
                <MapCard data={weatherData} />
              </div>
            ) : null}
          </div>
        )}
      </div>
    </main>
  );
}
