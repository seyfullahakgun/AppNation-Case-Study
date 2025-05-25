import Navbar from "@/components/Navbar";
import CurrentWeatherCard from "@/components/weather/CurrentWeatherCard";
import DailyForecastCard from "@/components/weather/DailyForecastCard";
import MapCard from "@/components/weather/MapCard";
import WeatherAlertCard from "@/components/weather/WeatherAlertCard";
import HourlyForecastCard from "@/components/weather/HourlyForecastCard";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="container max-w-screen-2xl mx-auto mt-4 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CurrentWeatherCard />
          <DailyForecastCard />
          <MapCard />
          <WeatherAlertCard />
          <HourlyForecastCard />
        </div>
      </div>
    </main>
  );
}
