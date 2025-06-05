import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
interface PricingFeature {
  text: string;
  icon?: string;
}
@Component({
  selector: 'app-pricing-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pricing-card.component.html',
  styleUrl: './pricing-card.component.scss'
})
export class PricingCardComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() iconClass: string = 'fas fa-shopping-cart';
  @Input() priceText: string = '';
  @Input() priceNote: string = '';
  @Input() features: PricingFeature[] = [];
  @Input() isFeatured: boolean = false;
  @Input() featuredText: string = 'Más popular';
  @Input() cardClass: string = '';
}
