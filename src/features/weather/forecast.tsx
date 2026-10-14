import { CloudRain, CloudSun, Droplets, Sun } from "lucide-react";
import type { ForecastDay } from "@/types/garden";
import { Card, Badge } from "@/components/ui";
import { formatThaiDate, weatherConditions } from "@/lib/locale";

const conditionIcons = { sun: Sun, cloud: CloudSun, rain: CloudRain };

export function Forecast({ days }: { days: ForecastDay[] }) {
  const firstDay = days.at(0);
  const lastDay = days.at(-1);
  const period =
    firstDay && lastDay
      ? `${formatThaiDate(firstDay.date, true)} – ${formatThaiDate(lastDay.date, true)}`
      : "ไม่มีข้อมูลตัวอย่าง";
  return (
    <Card
      title={`พยากรณ์อากาศ ${days.length} วัน`}
      subtitle={`สถานการณ์สมมติ · ${period}`}
      action={<Badge tone="neutral">ข้อมูลตัวอย่าง</Badge>}
    >
      <div className="forecast-grid">
        {days.map((day, index) => {
          const Icon = conditionIcons[day.condition];
          return (
            <div
              className={`forecast-day ${index === 0 ? "forecast-today" : ""}`}
              key={day.date}
            >
              <strong>{day.label}</strong>
              <span className="forecast-date">
                {new Intl.DateTimeFormat("th-TH", {
                  day: "numeric",
                  month: "short",
                  timeZone: "Asia/Bangkok",
                }).format(new Date(`${day.date}T12:00:00+07:00`))}
              </span>
              <Icon
                className={`weather-icon weather-${day.condition}`}
                size={33}
                strokeWidth={1.6}
                role="img"
                aria-label={weatherConditions[day.condition]}
              />
              <span className="forecast-temp">
                {day.high}° <span>{day.low}°</span>
              </span>
              <span className="rain-chance">
                <Droplets size={14} aria-hidden="true" />
                {day.rainProbability}%
              </span>
            </div>
          );
        })}
      </div>
      <p className="forecast-note">
        เปอร์เซ็นต์แสดงโอกาสฝนในข้อมูลสมมติ ไม่ใช่พยากรณ์จริง
      </p>
    </Card>
  );
}
