import { demoSnapshot } from "@/data/demo-garden";
import type { GardenSnapshot } from "@/types/garden";

export interface GardenDataService {
  getSnapshot(): Promise<GardenSnapshot>;
}

// Replace the adapter when real sources are introduced; keep the UI contract typed.
export const gardenDataService: GardenDataService = {
  async getSnapshot() {
    return demoSnapshot;
  },
};
