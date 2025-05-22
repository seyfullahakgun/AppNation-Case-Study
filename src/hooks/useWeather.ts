import { useQuery } from "@tanstack/react-query";
import { City, WeatherData } from "@/types";
import { useSettingsStore } from "@/store";
import { api } from "@/lib/axios";

export const useWeather = (city: City | null) => {
  const { units } = useSettingsStore();

  return useQuery({
    queryKey: ["weather", city?.lat, city?.lon, units],
    queryFn: async () => {
      if (!city) return null;

      try {
        const { data } = await api.get<WeatherData>(
          `/weather?lat=${city.lat}&lon=${city.lon}&units=${units}`
        );
        return data;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Hava durumu verisi alınamadı: ${error.message}`);
        }
        throw new Error("Hava durumu verisi alınamadı");
      }
    },
    enabled: !!city,
    staleTime: 1000 * 60 * 5, // 5 dakika
    refetchInterval: 1000 * 60 * 5, // Her 5 dakikada bir yenile
    retry: 2, // Hata durumunda 2 kez daha dene
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Üstel geri çekilme
  });
}; 