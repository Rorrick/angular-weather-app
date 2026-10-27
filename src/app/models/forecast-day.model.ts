// src/app/weather/models/forecast-day.model.ts
export interface ForecastDay {
    date: string;
    min: number;
    max: number;
    condition: string;
    description: string;
    icon: string;
    pop: number;
    rainMm?: number;
    entries: any[];
  }
  