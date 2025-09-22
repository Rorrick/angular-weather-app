import { Component, OnInit } from '@angular/core';
import { Weather} from '../weather_services/weather'
import { CommonModule } from '@angular/common'; 
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-dashboard',
  standalone:true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit  {
 weatherData: any;
 city: string = 'Cape Town';

 constructor(private weatherService:Weather){}

 ngOnInit():void{
  this.fetchData();
 }
 fetchData(){
  this.weatherService.getWeatherData(this.city).subscribe(data =>{
    this.weatherData = data;
    console.log(data)
  })
 }

}
