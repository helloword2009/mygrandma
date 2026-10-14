import type { Metadata } from "next";
import { Droplets, Leaf, ShieldCheck, Satellite } from "lucide-react";
import {
  Badge,
  Card,
  EmptyState,
  InfoNote,
  PageHeading,
} from "@/components/ui";
import { MonitoringChart } from "@/features/analytics/monitoring-chart";
import { plannedMetrics } from "@/data/demo-garden";
import { gardenDataService } from "@/services/garden-service";

export const metadata: Metadata = { title: "การวิเคราะห์" };

export default async function AnalyticsPage() {
  const data = await gardenDataService.getSnapshot();
  return (
    <>
      <PageHeading
        eyebrow="UNDERSTAND BEFORE YOU WATER"
        title="เข้าใจสวน ผ่านข้อมูล"
        description="พื้นที่สำหรับดูแนวโน้มและเตรียมการวิเคราะห์ในอนาคต"
      >
        <Badge tone="yellow">ยังไม่มีการวิเคราะห์จริง</Badge>
      </PageHeading>
      <div className="two-columns">
        <Card
          title="ภาพรวมความเสี่ยงการให้น้ำ"
          action={<Badge tone="neutral">ยังไม่ประเมิน</Badge>}
        >
          <EmptyState
            icon={ShieldCheck}
            title="รอข้อมูลและวิธีประเมิน"
            description="ยังไม่คำนวณความเสี่ยง หรือให้คะแนนความจำเป็นในการรดน้ำ ต้องตรวจสอบข้อมูลและวิธีประเมินก่อนใช้งานจริง"
          />
        </Card>
        <Card
          title="ความต้องการน้ำของพืช"
          action={<Badge tone="neutral">ยังไม่คำนวณ</Badge>}
        >
          <EmptyState
            icon={Droplets}
            title="เตรียมวิเคราะห์การใช้น้ำ"
            description="ระยะถัดไปจะพิจารณาฝน สภาพอากาศ ชนิดพืช และช่วงการเติบโต เพื่อช่วยวางแผนน้ำ"
          />
        </Card>
      </div>
      <MonitoringChart points={data.history} switchable />
      <div className="section-label">
        <h2>รู้จักดัชนีทางการเกษตร</h2>
        <span>คำอธิบายสำหรับการพัฒนาในอนาคต</span>
      </div>
      <div className="three-columns">
        {plannedMetrics.map((metric, index) => (
          <Card key={metric.key} className="index-card">
            <span className="icon-box icon-green">
              {index === 0 ? (
                <Leaf aria-hidden="true" />
              ) : index === 1 ? (
                <Satellite aria-hidden="true" />
              ) : (
                <Droplets aria-hidden="true" />
              )}
            </span>
            <div className="index-value">
              {metric.key}
              <span>—</span>
            </div>
            <h2>{metric.title}</h2>
            <p>{metric.description}</p>
            <Badge tone="neutral">ยังไม่มีข้อมูล / ยังไม่คำนวณ</Badge>
          </Card>
        ))}
      </div>
      <Card
        title="สุขภาพพืชจากภาพดาวเทียม"
        subtitle="พื้นที่สำหรับข้อมูลระดับแปลงในอนาคต"
      >
        <EmptyState
          icon={Satellite}
          title="ยังไม่มีภาพหรือผลวิเคราะห์ดาวเทียม"
          description="ข้อมูลดาวเทียมขึ้นอยู่กับความละเอียดภาพ เมฆ และวันที่ถ่ายภาพ สวนขนาดเล็กอาจเล็กกว่าพิกเซลของข้อมูล"
        />
      </Card>
      <InfoNote>
        NDVI และ NDMI เป็นดัชนีจากภาพดาวเทียม
        ไม่ใช่การวัดความชื้นในดินของผักแต่ละต้น
        ระบบช่วยประกอบการตัดสินใจเท่านั้น
        และยังไม่มีการคำนวณทางการเกษตรในเวอร์ชันนี้
      </InfoNote>
    </>
  );
}
