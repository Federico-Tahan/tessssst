import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ComparisonRow {
  feature: string;
  venta: string;
  alquiler: string;
  ventaType?: 'alta' | 'si' | 'no' | 'cero' | 'variable' | 'largo' | 'inmediato';
  alquilerType?: 'alta' | 'si' | 'no' | 'cero' | 'variable' | 'largo' | 'inmediato';
}

@Component({
  selector: 'app-comparison-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comparison-table.component.html',
  styleUrl: './comparison-table.component.scss'
})
export class ComparisonTableComponent {
  @Input() title: string = 'Comparativa Venta vs. Alquiler';
  
  @Input() data: ComparisonRow[] = [
    {
      feature: 'Inversión inicial',
      venta: 'USD 3 800–4 500 + nacionalización',
      alquiler: 'Sin costo',
      ventaType: 'no',
      alquilerType: 'no'
    },
    {
      feature: 'Mantenimiento',
      venta: 'A cargo del cliente',
      alquiler: 'Incluido 100%',
      ventaType: 'no',
      alquilerType: 'no'
    },
    {
      feature: 'Reposición stock',
      venta: 'Opcional',
      alquiler: 'Automática incluida',
      ventaType: 'no',
      alquilerType: 'no'
    },
    {
      feature: 'Ingresos',
      venta: '100% para el cliente',
      alquiler: 'Revenue share acordado',
      ventaType: 'no',
      alquilerType: 'no'
    },
  ];
}