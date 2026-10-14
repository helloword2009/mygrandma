"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { MonitoringPoint } from "@/types/garden";
import { formatThaiDate } from "@/lib/locale";
import { Badge, Card } from "@/components/ui";

export function MonitoringChart({
  points,
  kind = "rainfall",
  switchable = false,
}: {
  points: MonitoringPoint[];
  kind?: "rainfall" | "temperature";
  switchable?: boolean;
}) {
  const [metric, setMetric] = useState(kind);
  const rainfall = metric === "rainfall";
  const unit = rainfall ? "มม." : "°C";
  const first = points.at(0);
  const last = points.at(-1);
  const period =
    first && last
      ? `${formatThaiDate(first.date, true)} – ${formatThaiDate(last.date, true)}`
      : "ไม่มีข้อมูล";
  const label = rainfall ? "ปริมาณฝน" : "อุณหภูมิ";

  return (
    <Card
      title={
        switchable
          ? "แนวโน้มสภาพแวดล้อม"
          : `${label}ย้อนหลัง ${points.length} วัน`
      }
      subtitle={`${period} · ข้อมูลสมมติ`}
      action={<Badge tone="neutral">ข้อมูลตัวอย่าง</Badge>}
    >
      {switchable && (
        <div className="chart-tabs" role="group" aria-label="เลือกข้อมูลกราฟ">
          <button aria-pressed={rainfall} onClick={() => setMetric("rainfall")}>
            ปริมาณฝน
          </button>
          <button
            aria-pressed={!rainfall}
            onClick={() => setMetric("temperature")}
          >
            อุณหภูมิ
          </button>
        </div>
      )}
      <div className="chart-unit">
        {label} ({unit})
      </div>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          {rainfall ? (
            <BarChart
              data={points}
              margin={{ top: 8, right: 8, left: -22, bottom: 8 }}
              accessibilityLayer
            >
              <CartesianGrid
                strokeDasharray="4 5"
                vertical={false}
                stroke="#e8ece5"
              />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: "#66746b" }}
                dy={8}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: "#66746b" }}
              />
              <Tooltip
                cursor={{ fill: "#eff4ec" }}
                formatter={(value) => [`${value} มม.`, "ปริมาณฝนจำลอง"]}
                contentStyle={{ borderRadius: 12, border: "1px solid #e2e8df" }}
              />
              <Bar
                dataKey="rainfall"
                fill="#608269"
                radius={[5, 5, 0, 0]}
                maxBarSize={38}
              />
            </BarChart>
          ) : (
            <AreaChart
              data={points}
              margin={{ top: 8, right: 8, left: -22, bottom: 8 }}
              accessibilityLayer
            >
              <CartesianGrid
                strokeDasharray="4 5"
                vertical={false}
                stroke="#e8ece5"
              />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: "#66746b" }}
                dy={8}
              />
              <YAxis
                domain={[20, 40]}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: "#66746b" }}
              />
              <Tooltip
                formatter={(value) => [`${value} °C`, "อุณหภูมิจำลอง"]}
                contentStyle={{ borderRadius: 12 }}
              />
              <Area
                type="monotone"
                dataKey="temperature"
                stroke="#b68a38"
                fill="#f5e9cb"
                strokeWidth={3}
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
      <details className="chart-table">
        <summary>ดูข้อมูลตัวเลขในกราฟ</summary>
        <div className="table-scroll">
          <table>
            <caption>
              {label}สมมติ · {period}
            </caption>
            <thead>
              <tr>
                <th scope="col">วันที่</th>
                <th scope="col">
                  {label} ({unit})
                </th>
              </tr>
            </thead>
            <tbody>
              {points.map((point) => (
                <tr key={point.date}>
                  <th scope="row">{point.label}</th>
                  <td>{point[metric]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </Card>
  );
}
