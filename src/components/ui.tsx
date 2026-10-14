import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, Info, MapPin, Sprout } from "lucide-react";
import Link from "next/link";
import type { Garden, GardenSnapshot } from "@/types/garden";

export function Badge({
  children,
  tone = "green",
}: {
  children: ReactNode;
  tone?: "green" | "yellow" | "neutral";
}) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

export function PageHeading({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <div className="page-heading">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {children}
    </div>
  );
}

export function Card({
  title,
  subtitle,
  action,
  children,
  className = "",
}: {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`card ${className}`}>
      {title && (
        <div className="card-heading">
          <div>
            <h2>{title}</h2>
            {subtitle && <p>{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function MetricCard({
  icon: Icon,
  label,
  value,
  unit,
  note,
  tone = "green",
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  unit?: string;
  note: string;
  tone?: "green" | "yellow" | "blue" | "neutral";
}) {
  return (
    <section className="card metric-card">
      <div className="metric-top">
        <span>{label}</span>
        <span className={`icon-box icon-${tone}`}>
          <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
        </span>
      </div>
      <div className="metric-value">
        {value}
        <span>{unit}</span>
      </div>
      <p>{note}</p>
    </section>
  );
}

export function GardenOverview({ garden }: { garden: Garden }) {
  return (
    <Card
      title={garden.name}
      subtitle="พื้นที่เล็ก ๆ ที่เราใส่ใจ"
      action={
        <span className="icon-box icon-green">
          <Sprout size={20} strokeWidth={1.8} aria-hidden="true" />
        </span>
      }
    >
      <p className="location">
        <MapPin size={17} aria-hidden="true" />
        {garden.location}
      </p>
      <div className="crop-list">
        {garden.crops.map((crop) => (
          <span key={crop}>{crop}</span>
        ))}
      </div>
      <div className="card-divider">
        <span>{garden.areaLabel}</span>
        <Link className="text-link" href="/garden">
          ดูสวน <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </Card>
  );
}

export function RecommendationCard({
  recommendation,
}: {
  recommendation: GardenSnapshot["recommendation"];
}) {
  return (
    <section className="recommendation">
      <div className="recommendation-top">
        <span className="icon-box">
          <Sprout size={24} aria-hidden="true" />
        </span>
        <Badge tone="yellow">คำแนะนำจำลอง</Badge>
      </div>
      <span className="eyebrow">แนวทางดูแลสวน · ตัวอย่างเท่านั้น</span>
      <h2>{recommendation.title}</h2>
      <p>{recommendation.description}</p>
      <Link className="button button-light" href="/weather">
        ดูพยากรณ์ตัวอย่าง <ArrowUpRight size={18} aria-hidden="true" />
      </Link>
    </section>
  );
}

export function InfoNote({ children }: { children: ReactNode }) {
  return (
    <div className="info-note">
      <Info size={20} aria-hidden="true" />
      <p>{children}</p>
    </div>
  );
}

export function EmptyState({
  title,
  description,
  icon: Icon = Sprout,
}: {
  title: string;
  description: string;
  icon?: LucideIcon;
}) {
  return (
    <div className="empty-state">
      <span className="icon-box icon-green">
        <Icon size={24} aria-hidden="true" />
      </span>
      <h3>{title}</h3>
      <p>{description}</p>
      <Badge tone="neutral">พร้อมพัฒนาในระยะถัดไป</Badge>
    </div>
  );
}
