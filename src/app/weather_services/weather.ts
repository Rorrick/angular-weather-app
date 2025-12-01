import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ForecastDay } from '../models/forecast-day.model';
import { toDailySummaries } from '../adapters/forecast.adapter';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = '351f1dfcb8a7cefd09a09b4592711185';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private apiUrlForecast  = 'https://api.openweathermap.org/data/2.5/forecast'

  constructor(private httpClient: HttpClient){}

  getWeatherData(city:string):Observable<any>{
    const weatherApiURL = `${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric`
    return this.httpClient.get(weatherApiURL);
  }

  getWeatherForecast(city:string):Observable<any>{
    const forcastApiURL = `${this.apiUrlForecast}?q=${city}&appid=${this.apiKey}&units=metric`
    return this.httpClient.get(forcastApiURL);
  }

  getDailyForecast(city: string): Observable<ForecastDay[]> {
    return this.getWeatherForecast(city).pipe(
      map((raw: any) => toDailySummaries(raw))
    );
  }
}
