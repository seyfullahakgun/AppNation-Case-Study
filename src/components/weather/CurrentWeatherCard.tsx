import { WeatherData } from "@/types";
import Card from "@/components/ui/Card";
import { useSettingsStore } from "@/store";
import Image from "next/image";
import { useWeatherIcon } from "@/hooks/useWeatherIcon";

interface CurrentWeatherCardProps {
  data: WeatherData;
}

export default function CurrentWeatherCard({ data }: CurrentWeatherCardProps) {
  const { units, theme, selectedCity } = useSettingsStore();
  const current = data.current;
  const { iconPath } = useWeatherIcon(current.weather[0]);

  // Yerel saat dilimine göre saat formatı
  const localTime = new Date(
    (data.timezone_offset + current.dt) * 1000
  ).toLocaleTimeString("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Card title="Current Weather" className="p-6">
      <div className="flex flex-col justify-between h-full space-y-6">
        {/* Şehir Bilgileri */}
        <div className="flex flex-col">
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
          <div className="flex items-center justify-around gap-2 border border-border-dark rounded-md p-2">
            <Image
              src={`/icons/wind-${theme === "dark" ? "light" : "dark"}.svg`}
              alt="Rüzgar"
              width={24}
              height={24}
            />
            <p className="font-semibold">
              {Math.round(current.wind_speed)} km/s
            </p>
          </div>
          <div className="flex items-center justify-around gap-2 border border-border-dark rounded-md p-2">
            <Image
              src={`/icons/moisture-${theme === "dark" ? "light" : "dark"}.svg`}
              alt="Nem"
              width={24}
              height={24}
            />
            <p className="font-semibold">{current.humidity}%</p>
          </div>
          <div className="flex items-center justify-around gap-2 border border-border-dark rounded-md p-2">
            <Image
              src={`/icons/temperature-${
                theme === "dark" ? "light" : "dark"
              }.svg`}
              alt="Hissedilen"
              width={24}
              height={24}
            />
            <p className="font-semibold">
              {Math.round(current.feels_like)}°{units === "metric" ? "C" : "F"}
            </p>
          </div>
          <div className="flex items-center justify-around gap-2 border border-border-dark rounded-md p-2">
            <Image
              src={`/icons/sunrise-${theme === "dark" ? "light" : "dark"}.svg`}
              alt="Gün Doğumu"
              width={24}
              height={24}
            />
            <p className="font-semibold">
              {new Date(current.sunrise * 1000).toLocaleTimeString("tr-TR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
