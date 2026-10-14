"use client";

import { useState } from "react";
import { Bell, RotateCcw, SlidersHorizontal } from "lucide-react";
import { Badge, Card } from "@/components/ui";
import type { Garden } from "@/types/garden";

export function SettingsForm({ garden }: { garden: Garden }) {
  const [name, setName] = useState(garden.name);
  const [location, setLocation] = useState(garden.location);
  const [latitude, setLatitude] = useState(
    garden.coordinates.latitude.toFixed(5),
  );
  const [longitude, setLongitude] = useState(
    garden.coordinates.longitude.toFixed(5),
  );
  const [crops, setCrops] = useState(garden.crops);
  const [rainAlerts, setRainAlerts] = useState(true);
  const [gardenAlerts, setGardenAlerts] = useState(false);
  const [message, setMessage] = useState("");

  function reset() {
    setName(garden.name);
    setLocation(garden.location);
    setLatitude(garden.coordinates.latitude.toFixed(5));
    setLongitude(garden.coordinates.longitude.toFixed(5));
    setCrops(garden.crops);
    setRainAlerts(true);
    setGardenAlerts(false);
    setMessage("คืนค่าข้อมูลตัวอย่างแล้ว การเปลี่ยนแปลงไม่ได้บันทึกถาวร");
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setMessage(
          "ทดลองใช้ค่าในแบบฟอร์มนี้แล้ว ค่าจะหายเมื่อออกจากหน้า ไม่มีการบันทึกหรือส่งการแจ้งเตือนจริง",
        );
      }}
    >
      <div className="two-columns">
        <Card
          title="ข้อมูลสวนและตำแหน่ง"
          subtitle="แก้ไขเพื่อทดลองหน้าจอเท่านั้น"
          action={<SlidersHorizontal size={21} aria-hidden="true" />}
        >
          <div className="form-fields">
            <label htmlFor="garden-name">
              ชื่อสวน
              <input
                id="garden-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                maxLength={80}
                autoComplete="off"
              />
            </label>
            <label htmlFor="garden-location">
              ที่ตั้ง
              <input
                id="garden-location"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                required
                maxLength={160}
                autoComplete="off"
              />
            </label>
            <div className="form-row">
              <label htmlFor="latitude">
                ละติจูด
                <input
                  id="latitude"
                  type="number"
                  value={latitude}
                  onChange={(event) => setLatitude(event.target.value)}
                  min={-90}
                  max={90}
                  step="any"
                  required
                />
              </label>
              <label htmlFor="longitude">
                ลองจิจูด
                <input
                  id="longitude"
                  type="number"
                  value={longitude}
                  onChange={(event) => setLongitude(event.target.value)}
                  min={-180}
                  max={180}
                  step="any"
                  required
                />
              </label>
            </div>
            <p className="field-note">
              พิกัดตั้งต้นเป็นตำแหน่งสาธิต ไม่ใช่สวนจริง
            </p>
          </div>
        </Card>
        <Card title="พืชในสวน" subtitle="เลือกชนิดพืชเพื่อทดลองการตั้งค่า">
          <fieldset className="crop-options">
            <legend>ชนิดพืชตัวอย่าง</legend>
            {garden.crops.map((crop) => (
              <label key={crop}>
                <input
                  type="checkbox"
                  checked={crops.includes(crop)}
                  onChange={(event) =>
                    setCrops(
                      event.target.checked
                        ? [...crops, crop]
                        : crops.filter((item) => item !== crop),
                    )
                  }
                />
                <span>{crop}</span>
              </label>
            ))}
          </fieldset>
          <p className="field-note">
            ยังไม่รองรับการเพิ่มพืชหรือกำหนดระยะการเติบโต
          </p>
        </Card>
      </div>
      <Card
        title="การแจ้งเตือน"
        subtitle="สวิตช์ตัวอย่าง ยังไม่มีการส่งการแจ้งเตือน"
        action={<Bell size={21} aria-hidden="true" />}
      >
        <div className="notification-row">
          <div>
            <label htmlFor="rain-alerts">แจ้งเตือนแนวโน้มฝน</label>
            <p>ตัวอย่างการรับข่าวสารก่อนวางแผนไปสวน</p>
          </div>
          <input
            className="switch"
            id="rain-alerts"
            type="checkbox"
            role="switch"
            checked={rainAlerts}
            onChange={(event) => setRainAlerts(event.target.checked)}
          />
        </div>
        <div className="notification-row">
          <div>
            <label htmlFor="garden-alerts">สรุปสภาพสวน</label>
            <p>ตัวอย่างการแจ้งข้อมูลภาพรวมของสวน</p>
          </div>
          <input
            className="switch"
            id="garden-alerts"
            type="checkbox"
            role="switch"
            checked={gardenAlerts}
            onChange={(event) => setGardenAlerts(event.target.checked)}
          />
        </div>
      </Card>
      <div className="form-actions">
        <Badge tone="yellow">ทดลองเท่านั้น · ไม่บันทึกถาวร</Badge>
        <div>
          <button
            className="button button-secondary"
            type="button"
            onClick={reset}
          >
            <RotateCcw size={17} aria-hidden="true" />
            คืนค่าตัวอย่าง
          </button>
          <button className="button button-primary" type="submit">
            ทดลองใช้ค่าในแบบฟอร์ม
          </button>
        </div>
      </div>
      <p className="form-status" role="status" aria-live="polite">
        {message}
      </p>
    </form>
  );
}
