import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, DatePipe],
  declarations: [],
})
export class WeatherInfoModule {}
