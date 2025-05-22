import Card from "@/components/ui/Card";
import Image from "next/image";
import { useSettingsStore } from "@/store";
import { WeatherData } from "@/types";

interface WeatherAlertCardProps {
  data: WeatherData;
}

export default function WeatherAlertCard({ data }: WeatherAlertCardProps) {
  const { theme } = useSettingsStore();

  // Uyarı seviyesine göre ikon ve renk belirleme
  const getAlertStyles = (severity: string) => {
    switch (severity) {
      case "warning":
        return {
          icon: "warning",
          color: "text-yellow-500",
          bgColor: "bg-yellow-500/10",
        };
      case "danger":
        return {
          icon: "danger",
          color: "text-red-500",
          bgColor: "bg-red-500/10",
        };
      default:
        return {
          icon: "info",
          color: "text-blue-500",
          bgColor: "bg-blue-500/10",
        };
    }
  };

  return (
    <Card title="Hava Durumu Uyarıları" titleClassName="px-6 pt-6">
      <div className="divide-y divide-border-dark">
        {!data.alerts || data.alerts.length === 0 ? (
          <div className="p-4">
            <div className="flex items-center justify-center gap-3 text-secondary">
              <Image
                src={`/icons/check-${theme === "dark" ? "light" : "dark"}.svg`}
                alt="Güvenli"
                width={24}
                height={24}
              />
              <p>Bölgenizde aktif hava durumu uyarısı bulunmuyor.</p>
            </div>
          </div>
        ) : (
          data.alerts.map((alert, index) => {
            const styles = getAlertStyles(alert.severity);

            return (
              <div key={index} className="p-4">
                <div className="flex items-start gap-4">
                  {/* Uyarı İkonu */}
                  <div className={`p-2 rounded-full ${styles.bgColor}`}>
                    <Image
                      src={`/icons/${styles.icon}-${theme === "dark" ? "light" : "dark"}.svg`}
                      alt={alert.event}
                      width={24}
                      height={24}
                      className={styles.color}
                    />
                  </div>

                  {/* Uyarı Detayları */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{alert.event}</h3>
                      <span className="text-sm text-secondary">
                        {new Date(alert.start * 1000).toLocaleTimeString("tr-TR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-secondary">{alert.description}</p>
                    <div className="flex items-center gap-2 text-sm text-secondary">
                      <Image
                        src={`/icons/clock-${theme === "dark" ? "light" : "dark"}.svg`}
                        alt="Süre"
                        width={16}
                        height={16}
                      />
                      <span>
                        {new Date(alert.start * 1000).toLocaleDateString("tr-TR", {
                          day: "numeric",
                          month: "short",
                        })}{" "}
                        -{" "}
                        {new Date(alert.end * 1000).toLocaleDateString("tr-TR", {
                          day: "numeric",
                          month: "short",
                        })}
                      </span>
                    </div>
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