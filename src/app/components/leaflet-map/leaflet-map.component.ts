import { Component, Input, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Tipos para Leaflet
declare var L: any;

export interface MapMarker {
  lat: number;
  lng: number;
  title?: string;
  description?: string;
  icon?: string;
}

export interface MapOptions {
  center: [number, number];
  zoom: number;
  markers?: MapMarker[];
  height?: string;
  width?: string;
}

@Component({
  selector: 'app-leaflet-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leaflet-map.component.html',
  styleUrl: './leaflet-map.component.scss',
})
export class LeafletMapComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('mapElement', { static: true }) mapElement!: ElementRef;
  @Input() options: MapOptions = {
    center: [-31.382875176171524, -64.2339189672631],
    zoom: 13
  };

  private map: any;
  private markers: any[] = [-31.382875176171524, -64.2339189672631];
  isLoading = true;

  ngOnInit(): void {
    this.loadLeafletScript();
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  private loadLeafletScript(): void {
    if (typeof L !== 'undefined') {
      this.initializeMap();
      return;
    }

    const cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    cssLink.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
    cssLink.crossOrigin = '';
    document.head.appendChild(cssLink);

    // Cargar JavaScript de Leaflet
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
    script.crossOrigin = '';
    script.onload = () => {
      this.initializeMap();
    };
    script.onerror = () => {
      console.error('Error cargando Leaflet');
      this.isLoading = false;
    };
    document.head.appendChild(script);
  }

  private initializeMap(): void {
    try {
      this.map = L.map(this.mapElement.nativeElement).setView(
        this.options.center,
        this.options.zoom
      );

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);

      if (this.options.markers && this.options.markers.length > 0) {
        this.addMarkers(this.options.markers);
      }

      this.isLoading = false;
    } catch (error) {
      console.error('Error inicializando el mapa:', error);
      this.isLoading = false;
    }
  }

  private addMarkers(markers: MapMarker[]): void {
    markers.forEach(markerData => {
      const marker = L.marker([markerData.lat, markerData.lng]);
      
      if (markerData.title || markerData.description) {
        const popupContent = `
          ${markerData.title ? `<h4>${markerData.title}</h4>` : ''}
          ${markerData.description ? `<p>${markerData.description}</p>` : ''}
        `;
        marker.bindPopup(popupContent);
      }

      marker.addTo(this.map);
      this.markers.push(marker);
    });

    // Ajustar la vista para mostrar todos los marcadores
    if (markers.length > 1) {
      const group = new L.featureGroup(this.markers);
      this.map.fitBounds(group.getBounds().pad(0.1));
    }
  }

  // Métodos públicos para interactuar con el mapa
  addMarker(markerData: MapMarker): void {
    if (this.map) {
      const marker = L.marker([markerData.lat, markerData.lng]);
      
      if (markerData.title || markerData.description) {
        const popupContent = `
          ${markerData.title ? `<h4>${markerData.title}</h4>` : ''}
          ${markerData.description ? `<p>${markerData.description}</p>` : ''}
        `;
        marker.bindPopup(popupContent);
      }

      marker.addTo(this.map);
      this.markers.push(marker);
    }
  }

  clearMarkers(): void {
    this.markers.forEach(marker => {
      this.map.removeLayer(marker);
    });
    this.markers = [];
  }

  setCenter(lat: number, lng: number, zoom?: number): void {
    if (this.map) {
      this.map.setView([lat, lng], zoom || this.map.getZoom());
    }
  }

  fitBounds(): void {
    if (this.map && this.markers.length > 0) {
      const group = new L.featureGroup(this.markers);
      this.map.fitBounds(group.getBounds().pad(0.1));
    }
  }
}