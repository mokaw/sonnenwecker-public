import { Component, inject, OnInit, Input, SimpleChanges } from '@angular/core';
import { WeatherService } from '../weather.service';
import {
  LocalNotifications,
  ScheduleOptions,
} from '@capacitor/local-notifications';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-alarm-clock',
  templateUrl: './alarm-clock.component.html',
  styleUrls: ['./alarm-clock.component.scss'],
  standalone: false,
})
export class AlarmClockComponent implements OnInit {
  @Input() city: string = '';
  date = new Date();
  isoSunrise: string = '';
  sunriseInfoList: any;
  weatherService: WeatherService = inject(WeatherService);
  storageService: StorageService = inject(StorageService);
  alarm: boolean | undefined;
  storedCity = '';

  constructor() {}
  ngOnInit() {
    this.loadWeather();
    this.loadData();
  }

  async loadData() {
    await this.storageService.init();
    this.storedCity = await this.storageService.get('city');
    const storedTime = await this.storageService.get('isoSunrise');
    const storedToggle = await this.storageService.get('alarmBool');

    if (this.storedCity) {
      this.city = this.storedCity;

      this.loadWeather();
    }
    if (storedTime) {
      this.isoSunrise = storedTime;
    } else {
      this.loadWeather();
    }

    if (storedToggle) {
      if (storedToggle === true) {
        this.alarm = true;
      }

      if (storedToggle === false) {
        this.alarm = false;
      }
    } else {
      this.alarm = true;
    }
  }

  async scheduleNotification() {
    console.log('alarm gesetzt');
    const res = await LocalNotifications.requestPermissions();
    if (res.display === 'granted') {
      let options: ScheduleOptions = {
        notifications: [
          {
            id: 111,
            title: 'Good Morning ☀️',
            body: `It's your time to shine!`,
            schedule: {
              at: new Date(this.isoSunrise),
              allowWhileIdle: true
            },
          },
        ],
      };
      if (this.alarm) {
        try {
          console.log('alarm getriggert');
          await LocalNotifications.schedule(options);
        } catch (ex) {
          console.log('Notification Error: ', ex);
        }
      }
    }
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['city'] && this.city != '') {
      console.log('city', this.city);
      this.loadWeather();
    }
  }

  async loadWeather() {
    console.log(this.city, 'tis.city');
    this.weatherService.loadWeatherAPI(this.city).subscribe(async (data) => {
      if (
        data?.forecast?.forecastday?.[1]?.astro?.sunrise &&
        data?.forecast?.forecastday?.[1]?.date
      ) {
        this.sunriseInfoList = data.forecast.forecastday[1];
        if (this.city != this.storedCity || this.isoSunrise == '')
          this.isoSunrise =
            data.forecast.forecastday[1].date +
            'T' +
            data.forecast.forecastday[1].astro.sunrise.slice(0, 5) +
            ':00';
        console.log('Sunrise ', this.sunriseInfoList);

        await this.storageService.set('isoSunrise', this.isoSunrise);
        this.scheduleNotification();
      }
    });

    console.log('alarm', this.alarm);
  }

  async isAlarm() {
    this.alarm = !this.alarm;
    this.storageService.set('alarmBool', this.alarm);
    if (this.alarm) {
      this.scheduleNotification();
    } else {
      LocalNotifications.cancel({ notifications: [{ id: 111 }] });
    }
  }

  async onIonChange(event: CustomEvent) {
    this.isoSunrise = event.detail.value;
    await this.storageService.set('isoSunrise', this.isoSunrise);
    this.scheduleNotification();
  }
}
