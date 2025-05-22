import { WeatherData } from "@/types";
import Card from "@/components/ui/Card";
import { useSettingsStore } from "@/store";
import Image from "next/image";
import { useWeatherIcon } from "@/hooks/useWeatherIcon";

interface DailyForecastCardProps {
  data: WeatherData;
}

export default function DailyForecastCard({ data }: DailyForecastCardProps) {
  const { units, theme } = useSettingsStore();

  // İlk 5 günlük tahmini al
  const dailyForecasts = data.daily.slice(0, 5);

  return (
    <Card title="5-Day Forecast" titleClassName="px-6 pt-6">
      <div className="divide-y divide-border-light">
        {dailyForecasts.map((forecast, index) => {
          const { iconPath } = useWeatherIcon(forecast.weather[0]);
          const date = new Date(forecast.dt * 1000);
          const dayName = date.toLocaleDateString("tr-TR", { weekday: "long" });

          return (
            <div
              key={forecast.dt}
              className="flex items-center justify-between p-3"
            >
              {/* Hava Durumu İkonu */}
              <div className="flex items-center gap-2">
                <Image
                  src={iconPath}
                  alt={forecast.weather[0].description}
                  width={40}
                  height={40}
                  className="w-10 h-10"
                />
                <div className="flex items-center gap-1">
                  <Image
                    src={`/icons/temperature-${
                      theme === "dark" ? "light" : "dark"
                    }.svg`}
                    alt="Maksimum"
                    width={16}
                    height={16}
                  />
                  <p className="font-semibold">
                    {Math.round(forecast.temp.max)}° / {Math.round(forecast.temp.min)}°
                  </p> 
                </div>
              </div>

              {/* Gün */}
              <div className="w-24 text-right">
                <p className="font-semibold capitalize">{dayName}</p>
                <p className="text-sm text-secondary">
                  {date.toLocaleDateString("tr-TR", {
                    day: "numeric",
                    month: "short",
                  })}
                </p>
              </div>

              {/* Sıcaklık */}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
