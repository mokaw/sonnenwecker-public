import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { WeatherInfoComponent } from './weather-info/weather-info.component';
import { provideHttpClient } from '@angular/common/http';
import { GermanWeekdaysPipe } from './german-weekdays.pipe';
import { AlarmClockComponent } from './alarm-clock/alarm-clock.component';
import { IonicStorageModule } from '@ionic/storage-angular';
import {Drivers} from '@ionic/storage'
import { FormsModule } from '@angular/forms';

@NgModule({
  providers: [provideHttpClient()],
  declarations: [AppComponent, WeatherInfoComponent, SearchbarComponent, GermanWeekdaysPipe, AlarmClockComponent],
  imports: [
    CommonModule,
    BrowserModule,
    IonicModule.forRoot({ mode: 'md' }),
    IonicStorageModule.forRoot({
      name: 'appDb',
      driverOrder: [Drivers.LocalStorage]
    }),
    FormsModule
  ],
  exports:[GermanWeekdaysPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
