import Card from "@/components/ui/Card";
import Image from "next/image";
import { useSettingsStore } from "@/store";
import { WeatherData } from "@/types";
import { useWeatherIcon } from "@/hooks/useWeatherIcon";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

interface HourlyForecastCardProps {
  data: WeatherData;
}

export default function HourlyForecastCard({ data }: HourlyForecastCardProps) {
  const { theme } = useSettingsStore();

  // Saatlik verileri grafik için hazırla
  const chartData = data.hourly.slice(0, 48).map((hour) => ({
    time: new Date(hour.dt * 1000).toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    temp: Math.round(hour.temp),
    weather: hour.weather[0],
  }));

  // Şu anki saatten 1 saat sonrasını bul
  const currentHour = new Date().getHours();
  const nextHourIndex = chartData.findIndex(
    (data) => parseInt(data.time.split(":")[0]) === (currentHour + 1) % 24
  );

  // Tooltip içeriği
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const { iconPath } = useWeatherIcon(data.weather);

      return (
        <div className="bg-background border border-border-dark rounded-lg p-3 shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <Image
              src={iconPath}
              alt={data.weather.description}
              width={24}
              height={24}
            />
            <span className="font-medium">{data.time}</span>
          </div>
          <div className="text-sm text-secondary">
            {data.weather.description}
          </div>
          <div className="text-lg font-semibold mt-1">{data.temp}°</div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card
      title="Saatlik Tahmin"
      titleClassName="px-6 pt-6"
      className="col-span-1 sm:col-span-2"
    >
      <div>
        <div className="w-full overflow-x-auto">
          <div style={{ width: "2000px", height: "300px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 0, left: 0, bottom: 20 }}
              >
                <defs>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--primary)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--primary)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="time"
                  interval={1}
                  tick={{ fill: "var(--secondary)", fontSize: 12 }}
                  tickLine={{ stroke: "var(--border-dark)" }}
                  axisLine={{ stroke: "var(--border-dark)" }}
                  height={5}
                  tickCount={24}
                  minTickGap={50}
                />
                <YAxis
                  hide={true}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ stroke: "var(--primary)", strokeWidth: 2 }}
                  isAnimationActive
                />
                <Area
                  type="monotone"
                  dataKey="temp"
                  stroke="var(--primary)"
                  fillOpacity={1}
                  fill="url(#colorTemp)"
                />
                {nextHourIndex !== -1 && (
                  <ReferenceLine
                    x={nextHourIndex}
                    stroke="var(--primary)"
                    strokeWidth={2}
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
