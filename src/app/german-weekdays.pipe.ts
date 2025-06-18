import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: false,
  name: 'germanWeekdays',
})
export class GermanWeekdaysPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    let day = '';
    if (value) {
      if (value.toLocaleLowerCase() == 'monday') {
        day = 'Montag';
      }
      if (value.toLocaleLowerCase() == 'tuesday') {
        day = 'Dienstag';
      }
      if (value.toLocaleLowerCase() == 'wednesday') {
        day = 'Mittwoch';
      }
      if (value.toLocaleLowerCase() == 'thursday') {
        day = 'Donnerstag';
      }
      if (value.toLocaleLowerCase() == 'friday') {
        day = 'Freitag';
      }
      if (value.toLocaleLowerCase() == 'saturday') {
        day = 'Samstag';
      }
      if (value.toLocaleLowerCase() == 'sunday') {
        day = 'Sonntag';
      }
    }

    return day;
  }
}
