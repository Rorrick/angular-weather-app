import { Component, OnInit } from '@angular/core';
import { WeatherService} from '../weather_services/weather'
import { CommonModule, DecimalPipe} from '@angular/common'; 
import { MatCardModule } from '@angular/material/card';
import { SearchBar } from '../search-bar/search-bar';
import { ForecastComponent } from '../forcast/forecast';
import { HttpErrorResponse } from '@angular/common/http';          // new
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';   // new
import { Subject, EMPTY } from 'rxjs';                             // new
import { map, filter, debounceTime, tap, switchMap, catchError } from 'rxjs/operators'; 

@Component({
  selector: 'app-dashboard',
  standalone:true,
  imports: [ CommonModule, MatCardModule, SearchBar, ForecastComponent, DecimalPipe ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit  {
  title = 'Weather Dashboard'
 weatherData: any;
 city: string = 'New York';
 loading = false;
 error = '';

 private search$ = new Subject<string>();

 constructor(private weatherService:WeatherService){

  this.search$
      .pipe(
        map(c => c.trim()),
        filter(c => c.length > 0),
        debounceTime(300),
        tap(() => { this.loading = true; this.error = ''; }),
        switchMap(city =>
          this.weatherService.getWeatherData(city).pipe(
            map(data => ({ city, data })),
            catchError((err: HttpErrorResponse) => {
              this.loading = false;
              this.error = this.messageFor(err, city);
              return EMPTY;
            })
          )
        ),
        takeUntilDestroyed()
      )
      .subscribe(({ city, data }) => {
        this.weatherData = data;
        this.city = city;
        this.loading = false;
      });
  }

  ngOnInit(): void {
    this.search$.next(this.city);
  }

  onCitySelected(city: string) {
    this.search$.next(city);
  }

  private messageFor(err: HttpErrorResponse, city: string): string {
    if (err.status === 404) return `Couldn't find "${city}". Check the spelling and try again.`;
    if (err.status === 0) return "Can't reach the weather service. Check your connection.";
    return 'Something went wrong. Please try again.';
  }
 }