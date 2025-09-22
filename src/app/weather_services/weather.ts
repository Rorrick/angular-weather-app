import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Weather {
  private apiKey = '351f1dfcb8a7cefd09a09b4592711185';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private httpClient: HttpClient){}

  getWeatherData(city:string):Observable<any>{
    const weatherApiURL = `${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric`
    return this.httpClient.get(weatherApiURL);
  }
}
