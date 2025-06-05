import { Component } from '@angular/core';
import { ComparisonTableComponent } from "../components/comparison-table/comparison-table.component";
import { PricingCardComponent } from "../components/pricing-card/pricing-card.component";

@Component({
  selector: 'app-prices',
  standalone: true,
  imports: [ComparisonTableComponent, PricingCardComponent],
  templateUrl: './prices.component.html',
  styleUrl: './prices.component.scss'
})
export class PricesComponent {
alquilerFeatures = [
  { text: 'Cero inversión inicial' },
  { text: 'Mantenimiento incluido' },
  { text: 'Reposición automática' },
  { text: 'Soporte 24/7 incluido' },
  { text: 'Instalación y puesta en marcha' }
];

ventaFeatures = [
  { text: 'Propiedad completa del equipo' },
  { text: 'ROI más rápido a largo plazo' },
  { text: 'Control total de ingresos' },
  { text: 'Garantía completa incluida' },
  { text: 'Instalación y puesta en marcha' }

];
}
