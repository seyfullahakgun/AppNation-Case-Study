"use client";

import Card from "@/components/ui/Card";
import Image from "next/image";
import { useSettingsStore } from "@/store";
import { useWeather } from "@/hooks/useWeather";
import Skeleton from "@/components/ui/Skeleton";

export default function WeatherAlertCard() {
  const { theme, selectedCity } = useSettingsStore();
  const { data, isLoading } = useWeather(selectedCity);

  // Uyarı seviyesine göre ikon ve renk belirleme
  const getAlertStyles = (severity: string) => {
    switch (severity) {
      case "warning":
        return {
          icon: "warning",
          color: "text-yellow-500",
          bgColor: "bg-yellow-500/10",
          borderColor: "border-l-yellow-500",
        };
      case "danger":
        return {
          icon: "danger",
          color: "text-red-500",
          bgColor: "bg-red-500/10",
          borderColor: "border-l-red-500",
        };
      default:
        return {
          icon: "info",
          color: "text-blue-500",
          bgColor: "bg-blue-500/10",
          borderColor: "border-l-blue-500",
        };
    }
  };

  if (isLoading) {
    return (
      <Card className="flex flex-col gap-4 p-6 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-200 rounded-lg h-full transition-all duration-300">
        <div className="flex items-center justify-between">
          <Skeleton className="w-32 h-6 bg-gray-100 dark:bg-gray-700" />
          <Skeleton className="w-40 h-4 bg-gray-100 dark:bg-gray-700" />
        </div>
        <div className="space-y-4">
          {[...Array(2)].map((_, index) => (
            <div key={index} className="flex items-start gap-4">
              <Skeleton className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700" />
              <div className="flex-1 space-y-2">
                <Skeleton className="w-3/4 h-5 bg-gray-100 dark:bg-gray-700" />
                <Skeleton className="w-full h-4 bg-gray-100 dark:bg-gray-700" />
                <Skeleton className="w-1/2 h-4 bg-gray-100 dark:bg-gray-700" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col gap-4 p-6 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-200 rounded-lg h-full transition-all duration-300">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Weather Alerts</h3>
      </div>

      <div className="overflow-y-auto max-h-[350px] pr-2 space-y-4">
        {!data?.alerts || data.alerts.length === 0 ? (
          <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 border-l-4 border-l-green-500 transition-all duration-300">
            <div className="p-2 rounded-full bg-green-500/10">
              <Image
                src={`/icons/check.svg`}
                alt="Safe"
                width={24}
                height={24}
                className="text-green-500"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-green-500">All Clear</h3>
              <p className="text-sm text-secondary mt-1">
                No active weather alerts in your area.
              </p>
            </div>
          </div>
        ) : (
          data.alerts.map((alert, index) => {
            const styles = getAlertStyles(alert.severity);

            return (
              <div
                key={index}
                className={`flex items-start gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 border-l-4 transition-all duration-300 ${styles.borderColor}`}
              >
                {/* Alert Icon */}
                <div className={`p-2 rounded-full ${styles.bgColor}`}>
                  <Image
                    src={`/icons/${styles.icon}.svg`}
                    alt={alert.event}
                    width={24}
                    height={24}
                    className={styles.color}
                  />
                </div>

                {/* Alert Details */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{alert.event}</h3>
                    <span className="text-sm text-secondary">
                      {new Date(alert.start * 1000).toLocaleTimeString(
                        "en-US",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </span>
                  </div>
                  <p className="text-sm text-secondary">{alert.description}</p>
                  <div className="flex items-center gap-2 text-sm text-secondary">
                    <Image
                      src={`/icons/clock-${
                        theme === "dark" ? "light" : "dark"
                      }.svg`}
                      alt="Duration"
                      width={16}
                      height={16}
                    />
                    <span>
                      {new Date(alert.start * 1000).toLocaleDateString(
                        "en-US",
                        {
                          day: "numeric",
                          month: "short",
                        }
                      )}{" "}
                      -{" "}
                      {new Date(alert.end * 1000).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
}
