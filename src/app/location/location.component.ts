import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
@Component({
  selector: 'app-location',
  imports: [],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css'
})
export class LocationComponent implements OnInit {
  lat: number | null = null;
  lng: number | null = null;

  private map: L.Map | null = null;
  private marker: L.Marker | null = null;

  ngOnInit(): void {
    // Fix for missing marker icons
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });

    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => this.updateLocation(position),
        (error) => console.error('Location error:', error),
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 15000,
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  updateLocation(position: GeolocationPosition): void {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    this.lat = parseFloat(lat.toFixed(6));
    this.lng = parseFloat(lng.toFixed(6));

    const coords: [number, number] = [lat, lng];

    if (!this.map) {
      this.map = L.map('map').setView(coords, 15);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(this.map);

      this.marker = L.marker(coords).addTo(this.map).bindPopup('You are here').openPopup();
    } else {
      this.marker?.setLatLng(coords);
      this.map.setView(coords);
    }
  }
}
