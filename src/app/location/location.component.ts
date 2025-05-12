import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
@Component({
  selector: 'app-location',
  imports: [],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css'
})
export class LocationComponent implements AfterViewInit {
latitude: number = 0;
  longitude: number = 0;

  ngAfterViewInit(): void {
    navigator.geolocation.watchPosition(position => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;

      const map = L.map('map').setView([this.latitude, this.longitude], 15);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
      L.marker([this.latitude, this.longitude]).addTo(map)
        .bindPopup('You are here')
        .openPopup();
    });
  }
}
