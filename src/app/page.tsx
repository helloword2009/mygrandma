import Link from "next/link";
import {
  ArrowRight,
  CloudRain,
  Droplets,
  Satellite,
  Thermometer,
  Clock3,
  ShieldCheck,
  Sprout,
} from "lucide-react";
import {
  Badge,
  Card,
  GardenOverview,
  InfoNote,
  MetricCard,
  PageHeading,
  RecommendationCard,
} from "@/components/ui";
import { GardenIllustration } from "@/components/garden-illustration";
import { Forecast } from "@/features/weather/forecast";
import { MonitoringChart } from "@/features/analytics/monitoring-chart";
import { gardenDataService } from "@/services/garden-service";
import { formatThaiDate, ui } from "@/lib/locale";

export default async function DashboardPage() {
  const data = await gardenDataService.getSnapshot();
  return (
    <>
      <PageHeading
        eyebrow="YOUR GARDEN, AT A GLANCE"
        title="ดูแลสวน ใกล้คุณยายมากขึ้น"
        description={ui.th.subtitle}
      >
        <span className="scenario-date">
          <Clock3 size={16} aria-hidden="true" />
          สถานการณ์ตัวอย่าง · {formatThaiDate(data.scenarioDate)}
        </span>
      </PageHeading>
      <section className="welcome-card">
        <div className="welcome-copy">
          <Badge>
            <span className="status-dot" />
            สวนตัวอย่างของคุณยาย
          </Badge>
          <h2>
            สวนเล็ก ๆ<br />
            ความห่วงใยที่ยิ่งใหญ่
          </h2>
          <p>
            รู้จักสภาพแวดล้อมของสวน
            <br />
            เพื่อช่วยวางแผนดูแลในวันที่อยู่ไกล
          </p>
          <Link className="button button-primary" href="/garden">
            สำรวจสวนของยาย <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <GardenIllustration />
        <span className="hero-caption">
          <Sprout size={15} aria-hidden="true" />
          Grandma Garden Watch
        </span>
      </section>
      <div className="section-label">
        <h2>ภาพรวมของสวน</h2>
        <span>
          <span className="status-dot" />
          โหมดสาธิต · ยังไม่เชื่อมข้อมูลจริง
        </span>
      </div>
      <div className="metrics-grid">
        <MetricCard
          icon={Thermometer}
          label="อุณหภูมิ"
          value={String(data.weather.temperature)}
          unit="°C"
          note="อากาศช่วงกลางวัน · ค่าสมมติ"
          tone="yellow"
        />
        <MetricCard
          icon={CloudRain}
          label="ปริมาณฝนวันนี้"
          value={String(data.weather.rainfall)}
          unit="มม."
          note="ปริมาณสะสม · ค่าสมมติ"
          tone="blue"
        />
        <MetricCard
          icon={Droplets}
          label="ความชื้นในดิน"
          value="—"
          note="ยังไม่มีข้อมูลตรวจวัด"
        />
        <MetricCard
          icon={Satellite}
          label="การติดตามดาวเทียม"
          value="รอเชื่อมต่อ"
          note="เตรียมรองรับในระยะถัดไป"
          tone="neutral"
        />
      </div>
      <div className="dashboard-middle">
        <RecommendationCard recommendation={data.recommendation} />
        <div className="garden-stack">
          <GardenOverview garden={data.garden} />
          <div className="risk-preview">
            <span className="icon-box icon-yellow">
              <ShieldCheck size={23} aria-hidden="true" />
            </span>
            <div>
              <h3>การประเมินความเสี่ยงการให้น้ำ</h3>
              <p>ยังไม่ประเมิน · ระบบวิเคราะห์อยู่ระหว่างพัฒนา</p>
            </div>
          </div>
        </div>
      </div>
      <div className="two-columns">
        <MonitoringChart points={data.history} />
        <Forecast days={data.forecast} />
      </div>
      <Card
        title="กิจกรรมตัวอย่างล่าสุด"
        subtitle="จำลองรูปแบบบันทึกกิจกรรม ไม่ใช่ประวัติการตรวจวัดจริง"
        action={<Badge tone="neutral">DEMO LOG</Badge>}
      >
        <div className="activity-list">
          {data.activities.map((activity) => (
            <div className="activity" key={activity.id}>
              <span className="activity-icon">
                <Clock3 size={18} aria-hidden="true" />
              </span>
              <div>
                <h3>{activity.title}</h3>
                <p>{activity.description}</p>
              </div>
              <span className="activity-time">
                {activity.time}
                <span>เวลาสมมติ</span>
              </span>
            </div>
          ))}
        </div>
      </Card>
      <InfoNote>
        ระบบนี้ช่วยประกอบการตัดสินใจเท่านั้น
        ภาพดาวเทียมไม่สามารถวัดความชื้นในดินของผักแต่ละต้นได้
        ควรตรวจสภาพสวนจริงก่อนตัดสินใจรดน้ำ
      </InfoNote>
    </>
  );
}
