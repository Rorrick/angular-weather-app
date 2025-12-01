import { Component, OnInit } from '@angular/core';
import { WeatherService} from '../weather_services/weather'
import { CommonModule } from '@angular/common'; 
import { MatCardModule } from '@angular/material/card';
import { SearchBar } from '../search-bar/search-bar';
import { ForecastComponent } from '../forcast/forecast';

@Component({
  selector: 'app-dashboard',
  standalone:true,
  imports: [ CommonModule, MatCardModule, SearchBar, ForecastComponent ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit  {
 weatherData: any;
 city: string = 'New York';

 constructor(private weatherService:WeatherService){}

 ngOnInit():void{
  this.fetchData();
 }
 fetchData(city: string = this.city) {
  this.weatherService.getWeatherData(city).subscribe(data => {
    this.weatherData = data;
  });
}

  onCitySelected(city: string) {
    this.city = city;           // update city
    this.fetchData(city);       // refresh current weather
  }
}
