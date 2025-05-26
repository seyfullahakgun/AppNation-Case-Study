"use client";

import Card from "@/components/ui/Card";
import Image from "next/image";
import { useSettingsStore } from "@/store";
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
import type { HourlyWeather, WeatherCondition } from "@/types";
import { useMemo } from "react";
import { useWeatherIcon } from "@/hooks/useWeatherIcon";

// ------------- Main Component -------------
export default function HourlyForecastCard() {
  const { theme, selectedCity, units } = useSettingsStore();
  const { data, isLoading } = useWeather(selectedCity);

  if (!selectedCity) {
    return <ErrorCard message="No city selected." />;
  }
  if (isLoading) {
    return <LoadingSkeleton />;
  }
  if (!data?.hourly) {
    return <ErrorCard />;
  }

  // Send only raw hourly data to sub-component
  return (
    <ContentCard
      hourly={data.hourly.slice(0, 48)}
      theme={theme}
      units={units}
    />
  );
}

// ------------- Sub-Components -------------

function LoadingSkeleton() {
  return (
    <Card className="col-span-1 sm:col-span-2 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-200 rounded-lg h-full">
      <div className="px-6 pt-6">
        <Skeleton className="w-32 h-6" />
      </div>
      <div className="w-full overflow-x-auto mt-4">
        <div style={{ width: "2000px", height: "300px" }} className="relative">
          <div className="w-full h-full bg-gray-100 dark:bg-gray-700 rounded-lg" />
        </div>
      </div>
    </Card>
  );
}

interface ErrorCardProps {
  message?: string;
}
function ErrorCard({ message = "Data not found." }: ErrorCardProps) {
  return (
    <Card className="col-span-1 sm:col-span-2 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-200 rounded-lg h-full flex items-center justify-center">
      <p>{message}</p>
    </Card>
  );
}

interface ContentCardProps {
  hourly: HourlyWeather[];
  theme: string;
  units: string;
}
function ContentCard({ hourly, theme }: ContentCardProps) {
  // 1) Convert hourly data to chart format
  const chartData = useMemo(
    () =>
      hourly.map((hour, index) => ({
        time: new Date(hour.dt * 1000).toLocaleTimeString("tr-TR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        temp: Math.round(hour.temp),
        weather: hour.weather[0] as WeatherCondition,
        index: index,
      })),
    [hourly]
  );

  // 2) Get all icon paths at once using top-level hook
  // Ignoring ESLint warning
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const iconPaths = chartData.map((d) => useWeatherIcon(d.weather).iconPath);

  // 3) Data to show every 2 hours
  const iconsData = chartData.filter((_, i) => i % 2 === 0);

  // 4) Chart calculations
  const temps = chartData.map((d) => d.temp);
  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);
  const range = maxTemp - minTemp || 1;
  const nextHour = (new Date().getHours() + 1) % 24;
  const nextHourIndex = chartData.findIndex(
    (d) => parseInt(d.time.split(":")[0]) === nextHour
  );

  // 5) Tooltip type definition
  interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{ payload: (typeof chartData)[0] }>;
  }
  const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      const point = payload[0].payload;
      // Use the index we added to the data point
      const iconPath = iconPaths[point.index];

      return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg z-20">
          <div className="flex items-center gap-2 mb-2">
            <Image
              src={iconPath}
              alt={point.weather.description}
              width={32}
              height={32}
            />
            <span className="font-medium text-gray-600 dark:text-gray-200">
              {point.time}
            </span>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {point.weather.description}
          </div>
          <div className="text-lg font-semibold mt-1 text-gray-600 dark:text-gray-200">
            {point.temp}°
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="col-span-1 sm:col-span-2 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-200 rounded-lg h-full">
      {/* Title */}
      <div className="px-6 pt-6">
        <h3 className="text-lg font-semibold">Hourly Forecast</h3>
      </div>

      {/* Canvas */}
      <div className="w-full overflow-x-auto mt-4">
        <div style={{ width: "2000px", height: "300px" }} className="relative">
          {/* Icons every 2 hours */}
          <div className="absolute top-0 left-0 w-full">
            {iconsData.map((d, idx) => {
              const originalIndex = idx * 2;
              const x = originalIndex * 42.5;
              const y = ((maxTemp - d.temp) / range) * 50 + 20;
              const iconPath = iconPaths[originalIndex];

              return (
                <div
                  key={originalIndex}
                  className="absolute z-50"
                  style={{
                    left: `${x}px`,
                    top: `${y}px`,
                    transform: "translateX(-50%)",
                  }}
                >
                  <Image
                    src={iconPath}
                    alt={d.weather.description}
                    width={32}
                    height={32}
                  />
                </div>
              );
            })}
          </div>

          {/* Chart */}
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
              <YAxis hide />

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
    </Card>
  );
}
