import { Compass, MapPin, Sprout } from "lucide-react";
import type { Garden } from "@/types/garden";

export function MapPlaceholder({
  garden,
  compact = false,
}: {
  garden: Garden;
  compact?: boolean;
}) {
  return (
    <div
      className={`map-placeholder ${compact ? "map-compact" : ""}`}
      role="img"
      aria-label="ภาพจำลองตำแหน่งสวน ไม่ใช่แผนที่จริง ขอบเขตและเส้นทางเป็นภาพประกอบ"
    >
      <svg
        className="map-art"
        viewBox="0 0 800 430"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <rect width="800" height="430" fill="#E9EDDF" />
        <path
          d="M0 0H270L214 160H0ZM340 0H800V116L417 134ZM0 240L196 203L262 430H0ZM489 250L800 203V430H473Z"
          fill="#D9E3CB"
        />
        <path
          d="M605 -30C484 100 656 140 551 250S512 377 590 460"
          stroke="#BDDBDF"
          strokeWidth="44"
          fill="none"
        />
        <path
          d="M-30 194L830 155M302 -30L364 460"
          stroke="#FAFBF5"
          strokeWidth="25"
        />
        <path
          d="M-30 194L830 155M302 -30L364 460"
          stroke="#D0D3C4"
          strokeWidth="2"
          strokeDasharray="7 8"
        />
        <path
          d="M381 218L490 210L505 298L394 310Z"
          fill="#7C9F69"
          fillOpacity=".45"
          stroke="#47744E"
          strokeWidth="3"
          strokeDasharray="7 5"
        />
        <path
          d="M405 228L414 291M431 224L440 288M457 220L466 284M481 220L490 280"
          stroke="#648357"
          strokeWidth="4"
          opacity=".5"
        />
      </svg>
      <span className="map-label">ภาพจำลอง · ไม่ใช่แผนที่จริง</span>
      <span className="map-compass">
        <Compass size={24} aria-hidden="true" />
        <span>N</span>
      </span>
      <div className="map-pin">
        <span>
          <MapPin size={27} aria-hidden="true" />
        </span>
        <strong>{garden.name}</strong>
      </div>
      <div className="map-caption">
        <Sprout size={19} aria-hidden="true" />
        <span>
          พิกัดทดสอบ {garden.coordinates.latitude.toFixed(5)},{" "}
          {garden.coordinates.longitude.toFixed(5)}
        </span>
      </div>
    </div>
  );
}
