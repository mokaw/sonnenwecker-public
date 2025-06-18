import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private http = inject(HttpClient);

  loadWeatherAPI(cityName: string): Observable<any> {
    const key = environment.weatherApiKey;
    let url = '';

    console.log('reload');
    if (cityName) {
      url = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${cityName}&days=2&aqi=no&alerts=no`;
    } 

    return this.http.get(url);
  }
}
