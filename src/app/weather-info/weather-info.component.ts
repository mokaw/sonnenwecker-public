import { Component, OnInit, inject, Input, SimpleChanges } from '@angular/core';
import { WeatherService } from '../weather.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.scss'],
  standalone: false,
})
export class WeatherInfoComponent implements OnInit {
  @Input() city: string = '';
  weatherDisc: string = '';
  weatherIcon: string = 'assets/weather-icons/';
  weatherInfoList: any;
  weatherService: WeatherService = inject(WeatherService);
  storageService: StorageService = inject(StorageService);
 
  async ngOnInit() {
    await this.storageService.init();

    const storedCity = await this.storageService.get('city');
    if(storedCity){
      this.city = storedCity;
      this.loadWeather();
    }

  }

  async ngOnChanges(changes: SimpleChanges) {
    if(changes['city']){
      await this.storageService.set('city', this.city);
      this.loadWeather()
    }
    
  }

  loadWeather(){
    this.weatherService.loadWeatherAPI(this.city).subscribe((data) => {

        this.weatherInfoList = data;

        this.weatherIcon = 'assets/weather-icons/';
        this.weatherDiscription();
    })

  }

  weatherDiscription() {
    if (
      this.weatherInfoList?.current.condition.text
        .toLowerCase()
        .includes('sunny') ||
      this.weatherInfoList?.current.condition.text
        .toLowerCase()
        .includes('clear')
    ) {
      this.weatherDisc = 'sun.png';
    } else if (
      this.weatherInfoList?.current.condition.text
        .toLowerCase()
        .includes('snow') ||
      this.weatherInfoList?.current.condition.text
        .toLowerCase()
        .includes('freez') ||
      this.weatherInfoList.current.condition.text
        .toLowerCase()
        .includes('sleet') ||
      this.weatherInfoList.current.condition.text
        .toLowerCase()
        .includes('blizzard') ||
      this.weatherInfoList.current.condition.text.toLowerCase().includes('ice')
    ) {
      this.weatherDisc = 'snow.png';
    } else if (
      this.weatherInfoList?.current.condition.text
        .toLowerCase()
        .includes('cloud') ||
      this.weatherInfoList?.current.condition.text
        .toLowerCase()
        .includes('overcast')
    ) {
      this.weatherDisc = 'sun-cloud.png';
    } else if (
      this.weatherInfoList?.current.condition.text
        .toLowerCase()
        .includes('rain') ||
      this.weatherInfoList?.current.condition.text
        .toLowerCase()
        .includes('drizzle')
    ) {
      this.weatherDisc = 'weather.png';
    } else if (
      this.weatherInfoList?.current.condition.text
        .toLowerCase()
        .includes('mist') ||
      this.weatherInfoList?.current.condition.text.toLowerCase().includes('fog')
    ) {
      this.weatherDisc = 'mist.png';
    } else if (
      this.weatherInfoList?.current.condition.text
        .toLowerCase()
        .includes('storm') ||
      this.weatherInfoList?.current.condition.text
        .toLowerCase()
        .includes('thunder')
    ) {
      this.weatherDisc = 'storm.png';
    }

    this.weatherIcon = this.weatherIcon + this.weatherDisc;
  }
}

export interface WeatherInfo {
  city: string;
  day: string;
  temperatur: number;
  weatherDisc: string;
  sunrise: Date;
}
