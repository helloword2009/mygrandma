import type { Metadata } from "next";
import { Database } from "lucide-react";
import { Badge, Card, InfoNote, PageHeading } from "@/components/ui";
import { SettingsForm } from "@/features/settings/settings-form";
import { dataSources } from "@/data/demo-garden";
import { gardenDataService } from "@/services/garden-service";

export const metadata: Metadata = { title: "ตั้งค่า" };

export default async function SettingsPage() {
  const { garden } = await gardenDataService.getSnapshot();
  return (
    <>
      <PageHeading
        eyebrow="MAKE ROOM FOR YOUR GARDEN"
        title="ตั้งค่าการดูแลสวน"
        description="ทดลองจัดการข้อมูลสวนและรูปแบบการแจ้งเตือน"
      >
        <Badge tone="yellow">แบบฟอร์มสาธิต</Badge>
      </PageHeading>
      <InfoNote>
        การแก้ไขมีผลเฉพาะแบบฟอร์มนี้และจะหายเมื่อออกจากหน้าหรือโหลดใหม่
        ยังไม่มีฐานข้อมูล การบันทึกถาวร หรือการแจ้งเตือนจริง
      </InfoNote>
      <SettingsForm garden={garden} />
      <Card
        title="แหล่งข้อมูล"
        subtitle="สถานะการเชื่อมต่อสำหรับการพัฒนาในอนาคต"
      >
        <div className="source-list">
          {dataSources.map((source) => (
            <div className="source-row" key={source.name}>
              <span className="icon-box icon-green">
                <Database size={21} aria-hidden="true" />
              </span>
              <div>
                <h3>{source.name}</h3>
                <p>{source.purpose}</p>
              </div>
              <Badge tone="neutral">{source.status}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
