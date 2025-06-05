import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-large-card-icon',
  standalone: true,
  imports: [],
  templateUrl: './large-card-icon.component.html',
  styleUrl: './large-card-icon.component.scss'
})
export class LargeCardIconComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() iconClass: string = 'fas fa-rocket';
  @Input() backgroundColor: string = '#3B82F6';
}