export const navigation = [
  { href: "/", label: "ภาพรวม", english: "Dashboard", icon: "dashboard" },
  { href: "/garden", label: "สวนของยาย", english: "Garden", icon: "garden" },
  { href: "/weather", label: "สภาพอากาศ", english: "Weather", icon: "weather" },
  {
    href: "/analytics",
    label: "การวิเคราะห์",
    english: "Analytics",
    icon: "analytics",
  },
  {
    href: "/settings",
    label: "ตั้งค่า",
    english: "Settings",
    icon: "settings",
  },
] as const;

export const ui = {
  th: {
    appName: "Grandma Garden Watch",
    subtitle: "ระบบติดตามและช่วยตัดสินใจดูแลสวน",
    demo: "ข้อมูลตัวอย่าง",
    demoDescription:
      "ข้อมูลทั้งหมดเป็นข้อมูลสมมติ เพื่อสาธิตหน้าจอ ไม่ใช่ข้อมูลตรวจวัดจริงหรือคำแนะนำให้รดน้ำ",
    expandSidebar: "ขยายเมนูด้านข้าง",
    collapseSidebar: "ย่อเมนูด้านข้าง",
    openNavigation: "เปิดเมนู",
    closeNavigation: "ปิดเมนู",
    navigationTitle: "เมนูดูแลสวน",
  },
};

// Explicit timezone keeps scenario labels stable across server/client environments.
export function formatThaiDate(date: string, short = false): string {
  return new Intl.DateTimeFormat("th-TH", {
    day: "numeric",
    month: short ? "short" : "long",
    year: "numeric",
    timeZone: "Asia/Bangkok",
  }).format(new Date(`${date}T12:00:00+07:00`));
}

export const weatherConditions = {
  sun: "แดดออก",
  cloud: "มีเมฆบางส่วน",
  rain: "มีฝน",
} as const;
