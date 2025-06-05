import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-support-card',
  standalone: true,
  imports: [],
  templateUrl: './support-card.component.html',
  styleUrl: './support-card.component.scss'
})
export class SupportCardComponent {
  @Input() iconClass: string = 'fas fa-shield-alt';
  @Input() title: string = '';
  @Input() description: string = '';
}
