"use client";

import Card from "@/components/ui/Card";
import Image from "next/image";
import { useSettingsStore } from "@/store";
import { useWeatherIcon } from "@/hooks/useWeatherIcon";
import { useWeather } from "@/hooks/useWeather";
import Skeleton from "@/components/ui/Skeleton";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { useMemo } from "react";

export default function HourlyForecastCard() {
  const { theme, selectedCity, units } = useSettingsStore();
  const { data, isLoading } = useWeather(selectedCity);

  // Chart verilerini memoize et
  const { chartData, weatherIcons, nextHourIndex, tempRange, maxTemp } =
    useMemo(() => {
      if (!data)
        return {
          chartData: [],
          weatherIcons: [],
          nextHourIndex: -1,
          tempRange: 0,
          maxTemp: 0,
        };

      const chartData = data.hourly.slice(0, 48).map((hour) => ({
        time: new Date(hour.dt * 1000).toLocaleTimeString("tr-TR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        temp: Math.round(hour.temp),
        weather: hour.weather[0],
      }));

      const weatherIcons = chartData.filter((_, index) => index % 2 === 0);

      const currentHour = new Date().getHours();
      const nextHourIndex = chartData.findIndex(
        (data) => parseInt(data.time.split(":")[0]) === (currentHour + 1) % 24
      );

      const temps = chartData.map((d) => d.temp);
      const minTemp = Math.min(...temps);
      const maxTemp = Math.max(...temps);
      const tempRange = maxTemp - minTemp;

      return { chartData, weatherIcons, nextHourIndex, tempRange, maxTemp };
    }, [data]);

  if (isLoading) {
    return (
      <Card className="col-span-1 sm:col-span-2 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-200 rounded-lg h-full">
        <div className="px-6 pt-6">
          <Skeleton className="w-32 h-6 bg-gray-100 dark:bg-gray-700" />
        </div>
        <div className="w-full overflow-x-auto mt-4">
          <div
            style={{ width: "2000px", height: "300px" }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gray-100 dark:bg-gray-700 animate-pulse rounded-lg" />
          </div>
        </div>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="col-span-1 sm:col-span-2 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-200 rounded-lg h-full">
        <div className="px-6 pt-6">
          <h3 className="text-lg font-semibold">Saatlik Tahmin</h3>
        </div>
        <div className="flex items-center justify-center h-[300px]">
          <p>Veri bulunamadı.</p>
        </div>
      </Card>
    );
  }

  // Tooltip içeriği
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const { iconPath } = useWeatherIcon(data.weather);

      return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg z-20">
          <div className="flex items-center gap-2 mb-2">
            <Image
              src={iconPath}
              alt={data.weather.description}
              width={32}
              height={32}
            />
            <span className="font-medium text-gray-600 dark:text-gray-200">
              {data.time}
            </span>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {data.weather.description}
          </div>
          <div className="text-lg font-semibold mt-1 text-gray-600 dark:text-gray-200">
            {data.temp}°
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="col-span-1 sm:col-span-2 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-200 rounded-lg h-full ">
      <div className="px-6 pt-6">
        <h3 className="text-lg font-semibold">Saatlik Tahmin</h3>
      </div>
      <div>
        <div className="w-full overflow-x-auto mt-4">
          <div
            style={{ width: "2000px", height: "300px" }}
            className="relative"
          >
            {/* Hava Durumu İkonları */}
            <div className="absolute top-0 left-0 w-full">
              {weatherIcons.map((data, index) => {
                const { iconPath } = useWeatherIcon(data.weather);
                const position = index * 85;
                const yPosition =
                  ((maxTemp - data.temp) / tempRange) * 50 +
                  (units === "metric" ? 10 : 40);

                return (
                  <div
                    key={index}
                    className={`${
                      index === 0 && "hidden"
                    } flex flex-col items-center justify-center absolute`}
                    style={{
                      left: `${position}px`,
                      top: `${yPosition}px`,
                      transform: "translateX(-50%)",
                    }}
                  >
                    <Image
                      src={iconPath}
                      alt={data.weather.description}
                      width={32}
                      height={32}
                      className="mb-1"
                    />
                  </div>
                );
              })}
            </div>

            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 60, right: 0, left: 0, bottom: 20 }}
              >
                <defs>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={theme === "dark" ? "#60A5FA" : "#3B82F6"}
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor={theme === "dark" ? "#60A5FA" : "#3B82F6"}
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="time"
                  interval={1}
                  tick={{
                    fill: theme === "dark" ? "#9CA3AF" : "#6B7280",
                    fontSize: 12,
                  }}
                  tickLine={{
                    stroke: theme === "dark" ? "#374151" : "#E5E7EB",
                  }}
                  axisLine={{
                    stroke: theme === "dark" ? "#374151" : "#E5E7EB",
                  }}
                  height={5}
                  tickCount={24}
                  minTickGap={50}
                />
                <YAxis hide={true} />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{
                    stroke: theme === "dark" ? "#60A5FA" : "#3B82F6",
                    strokeWidth: 2,
                  }}
                  isAnimationActive={false}
                />
                <Area
                  type="monotone"
                  dataKey="temp"
                  stroke={theme === "dark" ? "#60A5FA" : "#3B82F6"}
                  fillOpacity={1}
                  fill="url(#colorTemp)"
                  isAnimationActive={false}
                />
                {nextHourIndex !== -1 && (
                  <ReferenceLine
                    x={nextHourIndex}
                    stroke={theme === "dark" ? "#60A5FA" : "#3B82F6"}
                    strokeWidth={1}
                    strokeDasharray="3 3"
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Card>
  );
}
