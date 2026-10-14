import type { GardenSnapshot } from "@/types/garden";

// Fixed fictional scenario: never present these values as live measurements.
export const demoSnapshot: GardenSnapshot = {
  mode: "demo",
  scenarioDate: "2026-10-08",
  garden: {
    id: "demo-garden-01",
    name: "สวนของคุณยาย",
    location: "อ.มหาชนะชัย จ.ยโสธร",
    coordinates: { latitude: 15.52891, longitude: 104.2419 },
    crops: ["พริก", "ถั่วฝักยาว", "มะนาว", "ผักสวนครัว"],
    areaLabel: "ยังไม่ได้ระบุขนาดพื้นที่",
  },
  weather: {
    temperature: 31,
    humidity: 72,
    rainfall: 2.4,
    rainProbability: 65,
    windSpeed: 9,
  },
  forecast: [
    {
      date: "2026-10-08",
      label: "วันนี้",
      condition: "cloud",
      high: 31,
      low: 24,
      rainProbability: 65,
      rainfall: 2.4,
    },
    {
      date: "2026-10-09",
      label: "ศุกร์",
      condition: "rain",
      high: 29,
      low: 23,
      rainProbability: 80,
      rainfall: 12,
    },
    {
      date: "2026-10-10",
      label: "เสาร์",
      condition: "rain",
      high: 28,
      low: 23,
      rainProbability: 75,
      rainfall: 8.5,
    },
    {
      date: "2026-10-11",
      label: "อาทิตย์",
      condition: "cloud",
      high: 30,
      low: 24,
      rainProbability: 35,
      rainfall: 1.2,
    },
    {
      date: "2026-10-12",
      label: "จันทร์",
      condition: "sun",
      high: 32,
      low: 24,
      rainProbability: 15,
      rainfall: 0,
    },
  ],
  history: [
    { date: "2026-10-02", label: "2 ต.ค.", rainfall: 0, temperature: 33 },
    { date: "2026-10-03", label: "3 ต.ค.", rainfall: 4.5, temperature: 31 },
    { date: "2026-10-04", label: "4 ต.ค.", rainfall: 11.8, temperature: 29 },
    { date: "2026-10-05", label: "5 ต.ค.", rainfall: 6.2, temperature: 30 },
    { date: "2026-10-06", label: "6 ต.ค.", rainfall: 0, temperature: 32 },
    { date: "2026-10-07", label: "7 ต.ค.", rainfall: 0.8, temperature: 32 },
    { date: "2026-10-08", label: "8 ต.ค.", rainfall: 2.4, temperature: 31 },
  ],
  recommendation: {
    mode: "demo",
    title: "ลองดูพยากรณ์ฝน ก่อนวางแผนไปสวน",
    description:
      "ตัวอย่างสถานการณ์: หากมีฝนในวันถัดไป อาจพิจารณาปรับเวลาไปสวน โดยตรวจสภาพดินและพืชจริงก่อนตัดสินใจรดน้ำ",
  },
  activities: [
    {
      id: "weather",
      time: "08:00",
      title: "ตัวอย่างสรุปสภาพอากาศ",
      description: "แสดงอุณหภูมิและฝนจากชุดข้อมูลสมมติ",
    },
    {
      id: "forecast",
      time: "07:30",
      title: "ตัวอย่างพยากรณ์ 5 วัน",
      description: "จำลองสถานการณ์ฝนสำหรับออกแบบหน้าจอ",
    },
    {
      id: "garden",
      time: "07:00",
      title: "เตรียมข้อมูลสวนตัวอย่าง",
      description: "พิกัดและชนิดพืชเพื่อทดลองใช้งาน",
    },
  ],
};

export const plannedMetrics = [
  {
    key: "NDVI",
    title: "ความเขียวของพืช",
    description:
      "ดัชนีจากการสะท้อนแสง ช่วยดูแนวโน้มความเขียวของพืชในพื้นที่ภาพดาวเทียม ไม่ใช่การวินิจฉัยพืชแต่ละต้น",
  },
  {
    key: "NDMI",
    title: "ความชื้นในพืช",
    description:
      "ดัชนีที่สัมพันธ์กับน้ำในเรือนยอดพืช ไม่ใช่ค่าความชื้นในดินของผักแต่ละต้น",
  },
  {
    key: "ET0",
    title: "การคายระเหยอ้างอิง",
    description:
      "ค่าประมาณความต้องการระเหยน้ำของพื้นผิวอ้างอิง ต้องมีข้อมูลอากาศและบริบทพืชเพิ่มเติมก่อนใช้วางแผนน้ำ",
  },
];

export const dataSources = [
  {
    name: "Open-Meteo",
    purpose: "ข้อมูลอากาศและพยากรณ์ฝน",
    status: "ยังไม่เชื่อมต่อ",
  },
  {
    name: "Sentinel Hub",
    purpose: "ภาพดาวเทียมและดัชนีพืช",
    status: "ยังไม่เชื่อมต่อ",
  },
  {
    name: "Supabase",
    purpose: "ข้อมูลสวนและการตั้งค่า",
    status: "ยังไม่เชื่อมต่อ",
  },
];
