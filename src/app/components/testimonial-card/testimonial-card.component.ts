// testimonial-card.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-testimonial-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonial-card.component.html',
  styleUrl: './testimonial-card.component.scss'
})
export class TestimonialCardComponent {
  @Input() name: string = '';
  @Input() role: string = '';
  @Input() company: string = '';
  @Input() message: string = '';
  @Input() rating: number = 5;
  @Input() avatar?: string;

  getInitials(): string {
    return this.name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  getStarsArray(): number[] {
    return Array.from({ length: 5 }, (_, i) => i + 1);
  }
}