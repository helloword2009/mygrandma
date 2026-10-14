import type { Metadata } from "next";
import { CloudRain, Droplets, Thermometer, Umbrella, Wind } from "lucide-react";
import {
  Badge,
  Card,
  InfoNote,
  MetricCard,
  PageHeading,
} from "@/components/ui";
import { Forecast } from "@/features/weather/forecast";
import { MonitoringChart } from "@/features/analytics/monitoring-chart";
import { formatThaiDate, weatherConditions } from "@/lib/locale";
import { gardenDataService } from "@/services/garden-service";

export const metadata: Metadata = { title: "สภาพอากาศ" };

export default async function WeatherPage() {
  const data = await gardenDataService.getSnapshot();
  return (
    <>
      <PageHeading
        eyebrow="WEATHER & THE GARDEN"
        title="สภาพอากาศรอบสวน"
        description="ดูตัวอย่างแนวโน้มอากาศและฝน เพื่อเตรียมวางแผนดูแลสวน"
      >
        <Badge tone="yellow">ข้อมูลอากาศสมมติ</Badge>
      </PageHeading>
      <div className="weather-overview">
        <div>
          <span className="eyebrow">
            {data.garden.location} · สถานการณ์{" "}
            {formatThaiDate(data.scenarioDate, true)}
          </span>
          <div className="current-temperature">
            <Thermometer size={44} strokeWidth={1.4} aria-hidden="true" />
            <strong>
              {data.weather.temperature}
              <span>°C</span>
            </strong>
          </div>
          <h2>
            {data.forecast[0]
              ? weatherConditions[data.forecast[0].condition]
              : "ไม่มีข้อมูล"}{" "}
            · ตัวอย่างสภาพอากาศ
          </h2>
          <p>
            <Wind size={17} aria-hidden="true" />
            ลมสมมติ {data.weather.windSpeed} กม./ชม.
          </p>
        </div>
        <div className="weather-overview-note">
          <CloudRain size={65} strokeWidth={1.3} aria-hidden="true" />
          <Badge tone="neutral">ยังไม่เชื่อมต่อ Open-Meteo</Badge>
        </div>
      </div>
      <div className="metrics-grid">
        <MetricCard
          icon={Thermometer}
          label="อุณหภูมิ"
          value={String(data.weather.temperature)}
          unit="°C"
          note="ข้อมูลสมมติ"
          tone="yellow"
        />
        <MetricCard
          icon={Droplets}
          label="ความชื้นในอากาศ"
          value={String(data.weather.humidity)}
          unit="%"
          note="ไม่ใช่ความชื้นในดิน"
        />
        <MetricCard
          icon={CloudRain}
          label="ปริมาณฝน"
          value={String(data.weather.rainfall)}
          unit="มม."
          note="ปริมาณสมมติใน 24 ชั่วโมง"
          tone="blue"
        />
        <MetricCard
          icon={Umbrella}
          label="โอกาสฝน"
          value={String(data.weather.rainProbability)}
          unit="%"
          note="ตัวอย่าง ไม่ใช่พยากรณ์จริง"
          tone="blue"
        />
      </div>
      <div className="two-columns">
        <Forecast days={data.forecast} />
        <MonitoringChart points={data.history} />
      </div>
      <Card
        title="เกี่ยวกับข้อมูลอากาศ"
        subtitle="เตรียมรองรับแหล่งข้อมูลจริงในระยะถัดไป"
      >
        <InfoNote>
          ขณะนี้ยังไม่มีการเรียก API ข้อมูลบนหน้านี้เป็นชุดข้อมูลสมมติแบบคงที่
          เมื่อเชื่อมต่อ Open-Meteo จะต้องแสดงเวลาอัปเดต ตำแหน่ง
          และสถานะข้อมูลให้ชัดเจน
        </InfoNote>
      </Card>
    </>
  );
}
