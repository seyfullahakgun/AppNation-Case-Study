"use client";

import { WeatherData } from "@/types";
import Card from "@/components/ui/Card";
import { useSettingsStore } from "@/store";
import dynamic from "next/dynamic";

// Harita bileşenini dinamik olarak import et
const Map = dynamic(
  () => import("@/components/weather/Map"), // Map bileşenini ayrı bir dosyada oluşturacağız
  {
    loading: () => (
      <div className="h-full w-full rounded-lg bg-card-background animate-pulse" />
    ),
    ssr: false, // Sunucu tarafında render etme
  }
);

interface MapCardProps {
  data: WeatherData;
}

export default function MapCard({ data }: MapCardProps) {
  const { selectedCity } = useSettingsStore();

  return (
    <Card>
      <div className="h-full w-full rounded-lg overflow-hidden">
        <Map
          position={[data.lat, data.lon]}
          cityName={selectedCity?.name}
        />
      </div>
    </Card>
  );
}
