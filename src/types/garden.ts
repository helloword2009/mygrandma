export type DataMode = "demo";

export interface Garden {
  id: string;
  name: string;
  location: string;
  coordinates: { latitude: number; longitude: number };
  crops: string[];
  areaLabel: string;
}

export interface ForecastDay {
  date: string;
  label: string;
  condition: "sun" | "cloud" | "rain";
  high: number;
  low: number;
  rainProbability: number;
  rainfall: number;
}

export interface MonitoringPoint {
  date: string;
  label: string;
  rainfall: number;
  temperature: number;
}

export interface GardenSnapshot {
  mode: DataMode;
  scenarioDate: string;
  garden: Garden;
  weather: {
    temperature: number;
    humidity: number;
    rainfall: number;
    rainProbability: number;
    windSpeed: number;
  };
  forecast: ForecastDay[];
  history: MonitoringPoint[];
  recommendation: { title: string; description: string; mode: DataMode };
  activities: {
    id: string;
    time: string;
    title: string;
    description: string;
  }[];
}
