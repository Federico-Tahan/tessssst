import { Component } from "@angular/core";
import { Machine, MachineCardComponent } from "../components/machine-card/machine-cards.component";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-catalog-section',
  standalone: true,
  imports: [MachineCardComponent, CommonModule],
  templateUrl: './catalog-section.component.html',
  styleUrl: './catalog-section.component.scss'
})
export class CatalogSectionComponent {
  machines: Machine[] = [
    {
      id: 'snack-drink-pro',
      name: 'Snack & Drink Pro',
      image: 'https://imgur.com/874OhnC.jpeg',
      backgroundImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      specs: [
        { icon: 'fas fa-boxes', text: '400 snacks + 300 bebidas', highlight: '700 productos' },
        { icon: 'fas fa-tv', text: 'Pantalla táctil 49"', highlight: '49"' },
        { icon: 'fas fa-temperature-low', text: 'Temp. 2 - 14 °C', highlight: '2 - 14 °C' },
        { icon: 'fas fa-qrcode', text: 'QR, MODO, tarjetas', highlight: 'Múltiples pagos' }
      ]
    },
    {
      id: 'slimfit-690',
      name: 'SlimFit 690 mm',
      image: 'https://imgur.com/lrfG670.jpeg',
      backgroundImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      specs: [
        { icon: 'fas fa-ruler-horizontal', text: 'Ancho 69 cm', highlight: '69 cm' },
        { icon: 'fas fa-arrow-up', text: 'Ascensor productos frágiles', highlight: 'Ascensor' },
        { icon: 'fas fa-battery-full', text: 'Clase A++', highlight: 'A++' },
        { icon: 'fas fa-boxes', text: '280 productos', highlight: '280 pcs' }
      ]
    },
    {
      id: 'gourmet-10c',
      name: 'Gourmet 10C',
      image: 'https://imgur.com/your-image-link.jpeg',
      backgroundImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      specs: [
        { icon: 'fas fa-cubes', text: 'Modular', highlight: 'Modular' },
        { icon: 'fas fa-thermometer-half', text: 'Dual 2/18 °C', highlight: '2/18 °C' },
        { icon: 'fas fa-lightbulb', text: 'LED inteligente', highlight: 'LED' },
        { icon: 'fas fa-lemon', text: 'Frescos e isotónicos', highlight: 'Frescos' }
      ]
    }
  ];
  
}