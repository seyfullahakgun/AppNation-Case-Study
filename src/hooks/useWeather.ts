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
          throw new Error(`Failed to fetch weather data: ${error.message}`);
        }
        throw new Error("Failed to fetch weather data");
      }
    },
    enabled: !!city,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 1000 * 60 * 5, // Refresh every 5 minutes
    retry: 2, // Retry 2 more times on error
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
  });
}; 