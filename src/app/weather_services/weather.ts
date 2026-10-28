import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ForecastDay } from '../models/forecast-day.model';
import { toDailySummaries } from '../adapters/forecast.adapter';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private httpClient: HttpClient) {}

  getWeatherData(city: string): Observable<any> {
    return this.httpClient.get('/api/weather', { params: { q: city } });
  }

  getWeatherForecast(city: string): Observable<any> {
    return this.httpClient.get('/api/forecast', { params: { q: city } });
  }

  getDailyForecast(city: string): Observable<ForecastDay[]> {
    return this.getWeatherForecast(city).pipe(
      map((raw: any) => toDailySummaries(raw))
    );
  }
}
