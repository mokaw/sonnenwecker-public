import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
  standalone: false,
})
export class SearchbarComponent {
  @Output() cityNameEvent = new EventEmitter<string>();

  handleEnter(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const cityName = target.value?.toLowerCase();
    this.cityNameEvent.emit(cityName);
  }
}
