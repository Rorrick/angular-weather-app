// src/app/weather/models/forecast-day.model.ts
export interface ForecastDay {
    date: string;        // e.g. "2025-10-20" (local date for the city)
    min: number;
    max: number;
    condition: string;   // e.g. "Clouds"
    description: string; // e.g. "scattered clouds"
    icon: string;        // e.g. "03d"
    pop: number;         // average/peak probability of precip (0–1)
    rainMm?: number;     // total rain for the day (sum of 3h buckets)
    entries: any[];      // optional raw items if you want to drill in
  }
  