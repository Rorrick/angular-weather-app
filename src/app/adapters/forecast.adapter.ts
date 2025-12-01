import { ForecastDay } from "../models/forecast-day.model";

// src/app/weather/adapters/forecast.adapter.ts
export function toDailySummaries(raw: any): ForecastDay[] {
    if (!raw || !raw.list || !raw.city) return [];
  
    const tzOffsetSec = raw.city.timezone ?? 0; // seconds offset from UTC
    const byDay = new Map<string, any[]>();
  
    // Helper: get local date string (YYYY-MM-DD) for each item
    const localDateKey = (dt: number) => {
      // Shift dt (seconds) by timezone, then take UTC date parts
      const local = new Date((dt + tzOffsetSec) * 1000);
      const y = local.getUTCFullYear();
      const m = (local.getUTCMonth() + 1).toString().padStart(2, '0');
      const d = local.getUTCDate().toString().padStart(2, '0');
      return `${y}-${m}-${d}`;
    };
  
    // 1) Bucket 3h entries per local day
    for (const item of raw.list) {
      const key = localDateKey(item.dt);
      if (!byDay.has(key)) byDay.set(key, []);
      byDay.get(key)!.push(item);
    }
  
    // 2) Reduce each day to a summary
    const days: ForecastDay[] = [];
    for (const [date, items] of byDay.entries()) {
      // temps
      let min = Number.POSITIVE_INFINITY;
      let max = Number.NEGATIVE_INFINITY;
  
      // icon/condition selection: pick the entry closest to 12:00 local
      const targetHour = 12;
      let best: any | null = null;
      let bestDelta = Number.POSITIVE_INFINITY;
  
      // precipitation + pop
      let rainTotal = 0;
      let popPeak = 0;
  
      for (const it of items) {
        const t = it.main?.temp;
        if (typeof it.main?.temp_min === 'number') min = Math.min(min, it.main.temp_min);
        if (typeof it.main?.temp_max === 'number') max = Math.max(max, it.main.temp_max);
        if (typeof t === 'number') {
          min = Math.min(min, t);
          max = Math.max(max, t);
        }
  
        // choose representative slot near 12:00
        const local = new Date((it.dt + tzOffsetSec) * 1000);
        const hour = local.getUTCHours();
        const delta = Math.abs(hour - targetHour);
        if (delta < bestDelta) {
          bestDelta = delta;
          best = it;
        }
  
        // precip
        const rain3h = it.rain?.['3h'] ?? 0;
        rainTotal += rain3h;
        popPeak = Math.max(popPeak, it.pop ?? 0);
      }
  
      // fallback if we got no temps
      if (!isFinite(min)) min = items[0]?.main?.temp ?? 0;
      if (!isFinite(max)) max = items[0]?.main?.temp ?? 0;
  
      const w0 = best?.weather?.[0] ?? items[0]?.weather?.[0] ?? {};
      days.push({
        date,
        min: Math.round(min),
        max: Math.round(max),
        condition: w0.main ?? '',
        description: w0.description ?? '',
        icon: w0.icon ?? '01d',
        pop: Number(popPeak.toFixed(2)),
        rainMm: Math.round(rainTotal * 10) / 10,
        entries: items,
      });
    }
  
    // Sort by date asc
    days.sort((a, b) => (a.date < b.date ? -1 : 1));
    return days;
  }
  