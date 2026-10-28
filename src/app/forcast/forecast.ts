import { Component, Input, SimpleChanges } from '@angular/core';
import { WeatherService } from '../weather_services/weather';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
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
  daily: ForecastDay[] = [];
  loading = false;
  error = '';


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
    this.loading = true;
  this.error = '';

  this.forecastService.getDailyForecast(city).subscribe({
    next: days => {
      this.daily = days;
      this.loading = false;
    },
    error: () => {
      this.daily = [];   // don't show an old city's forecast under a new city
      this.loading = false;
      this.error = "Couldn't load the forecast. Please try again.";
    }
  });
  }
  }
