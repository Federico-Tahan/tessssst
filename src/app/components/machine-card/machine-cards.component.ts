// machine-cards.component.ts
import { CommonModule } from '@angular/common';
import { Component, Input, HostListener } from '@angular/core';

export interface MachineSpec {
  icon: string;
  text: string;
  highlight?: string;
}

export interface Machine {
  id: string;
  name: string;
  image: string;
  backgroundImage?: string;
  specs: MachineSpec[];
}

@Component({
  selector: 'app-machine-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './machine-cards.component.html',
  styleUrl: './machine-cards.component.scss'
})
export class MachineCardComponent {
  @Input() machine!: Machine;
  isModalOpen = false;

  formatSpecText(spec: MachineSpec): string {
    if (spec.highlight) {
      return spec.text.replace(spec.highlight, `<span class="spec-highlight">${spec.highlight}</span>`);
    }
    return spec.text;
  }

  onImageClick(): void {
    console.log('Image clicked for machine:', this.machine.name);
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.isModalOpen = false;
    document.body.style.overflow = 'auto';
  }

  onDetailsClick(event: Event): void {
    event.preventDefault();
    console.log('Details clicked for machine:', this.machine.name);
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent): void {
    if (this.isModalOpen) {
      this.closeModal();
    }
  }

  onModalImageClick(event: Event): void {
    event.stopPropagation();
  }
}