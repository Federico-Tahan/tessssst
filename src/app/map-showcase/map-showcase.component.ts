import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { LeafletMapComponent, MapMarker, MapOptions } from "../components/leaflet-map/leaflet-map.component";

@Component({
  selector: 'app-map-showcase',
  standalone: true,
  imports: [CommonModule, LeafletMapComponent],
  templateUrl: './map-showcase.component.html',
  styleUrl: './map-showcase.component.scss'
})
export class MapShowCaseComponent {
  locations: MapMarker[] = [
    {
      lat: -31.4201,
      lng: -64.1888,
      title: 'Centro de Córdoba',
      description: 'Nuestra oficina principal en el corazón de la ciudad'
    },
    {
      lat: -31.4135,
      lng: -64.1810,
      title: 'Nueva Córdoba',
      description: 'Sucursal en el barrio universitario'
    },
    {
      lat: -31.4400,
      lng: -64.1900,
      title: 'Barrio Güemes',
      description: 'Punto de atención en zona comercial'
    }
  ];

  mapOptions: MapOptions = {
    center: [-31.4201, -64.1888], 
    zoom: 12,
    markers: this.locations,
    height: '400px',
    width: '100%'
  };
}