import { Component, EventEmitter, Output } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  standalone:true,
  imports: [MatInputModule , MatIconModule, MatButtonModule, FormsModule, MatFormFieldModule, 
    CommonModule, ReactiveFormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss'
})
export class SearchBar {
  searchControl = new FormControl('');

  @Output() citySearch = new EventEmitter<string>();

  onSearch():void{
    const city = this.searchControl.value?.trim();
    if(city)this.citySearch.emit(city);
  }

  clearInput(){
    this.searchControl.setValue('');
  }

}
