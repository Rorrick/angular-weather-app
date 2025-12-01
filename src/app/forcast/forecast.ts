import { Component, Input, SimpleChanges } from '@angular/core';
import { WeatherService } from '../weather_services/weather';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { SearchBar } from '../search-bar/search-bar';
import { ForecastDay } from '../models/forecast-day.model';


@Component({
  selector: 'app-forecast',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './forecast.html',
  styleUrl: './forecast.scss'
})
export class ForecastComponent {
  @Input() city = 'New York';
  weatherForecastData: any;
  daily: ForecastDay[] = [];

  constructor(private forecastService: WeatherService) {}

  ngOnInit(): void {
    this.fetchForecastData(this.city);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['city'] && !changes['city'].firstChange) {
      this.fetchForecastData(this.city);
    }
  }

  fetchForecastData(city: string): void {
    this.forecastService.getDailyForecast(city).subscribe(days => {
      this.daily = days;
    });
  }
  }
