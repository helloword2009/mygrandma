import type { Metadata } from "next";
import { MapPin, Navigation, Ruler, Sprout, Layers } from "lucide-react";
import {
  Badge,
  Card,
  EmptyState,
  InfoNote,
  PageHeading,
} from "@/components/ui";
import { MapPlaceholder } from "@/components/map-placeholder";
import { gardenDataService } from "@/services/garden-service";

export const metadata: Metadata = { title: "สวนของยาย" };

export default async function GardenPage() {
  const { garden } = await gardenDataService.getSnapshot();
  return (
    <>
      <PageHeading
        eyebrow="A LITTLE PATCH OF HOME"
        title="สวนของยาย"
        description="ทำความรู้จักพื้นที่และพืชที่เราช่วยกันดูแล"
      >
        <Badge tone="yellow">สวนและพิกัดตัวอย่าง</Badge>
      </PageHeading>
      <div className="garden-page-grid">
        <Card
          title="ตำแหน่งสวน"
          subtitle="ภาพประกอบสำหรับเตรียมระบบแผนที่"
          action={<Badge tone="neutral">ยังไม่ใช่แผนที่จริง</Badge>}
          className="map-card"
        >
          <MapPlaceholder garden={garden} />
          <InfoNote>
            พิกัดนี้ใช้สาธิตเท่านั้น ไม่ใช่ที่ตั้งสวนจริงของคุณยาย
            ขอบเขตและเส้นทางในภาพเป็นภาพสมมติ
          </InfoNote>
        </Card>
        <Card title="ข้อมูลสวน" subtitle="สวนตัวอย่าง 01">
          <div className="garden-title">
            <span className="icon-box icon-green">
              <Sprout size={25} aria-hidden="true" />
            </span>
            <h3 className="garden-name">{garden.name}</h3>
          </div>
          <dl className="garden-details">
            <div>
              <dt>
                <MapPin size={17} aria-hidden="true" />
                ที่ตั้ง
              </dt>
              <dd>
                {garden.location}
                <span>ประเทศไทย</span>
              </dd>
            </div>
            <div>
              <dt>
                <Navigation size={17} aria-hidden="true" />
                พิกัดทดสอบ · ไม่ใช่ตำแหน่งสวนจริง
              </dt>
              <dd className="coordinates">
                <span className="coordinate-row">
                  <span>ละติจูด</span>
                  <strong>{garden.coordinates.latitude.toFixed(5)}</strong>
                </span>
                <span className="coordinate-row">
                  <span>ลองจิจูด</span>
                  <strong>{garden.coordinates.longitude.toFixed(5)}</strong>
                </span>
              </dd>
            </div>
            <div>
              <dt>
                <Ruler size={17} aria-hidden="true" />
                ขนาดพื้นที่สวน
              </dt>
              <dd>{garden.areaLabel}</dd>
            </div>
          </dl>
          <h3 className="small-heading">พืชในสวนตัวอย่าง</h3>
          <div className="crop-list garden-crops">
            {garden.crops.map((crop) => (
              <span key={crop}>{crop}</span>
            ))}
          </div>
        </Card>
      </div>
      <Card
        title="พื้นที่สำหรับการติดตามในอนาคต"
        subtitle="เตรียมโครงสร้างไว้สำหรับสวนที่เติบโตไปด้วยกัน"
      >
        <div className="three-columns">
          <EmptyState
            icon={MapPin}
            title="สวนหลายพื้นที่"
            description="วางแผนรองรับการจัดการสวนมากกว่าหนึ่งแปลง"
          />
          <EmptyState
            icon={Layers}
            title="ขอบเขตแปลงสวน"
            description="วางแผนใช้ Leaflet แสดงขอบเขตและข้อมูลพืช"
          />
          <EmptyState
            title="ภาพดาวเทียม"
            description="แสดงภาพระดับพื้นที่พร้อมวันที่และข้อจำกัดของข้อมูล"
          />
        </div>
      </Card>
    </>
  );
}
