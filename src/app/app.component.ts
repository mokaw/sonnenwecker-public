import { Component } from '@angular/core';
import { SearchbarComponent } from './searchbar/searchbar.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor() {}
  cityName: string = '';
  handleEnter(cityName: string) {
    this.cityName = cityName;
    
    console.log('handle ', this.cityName)
  }
}
