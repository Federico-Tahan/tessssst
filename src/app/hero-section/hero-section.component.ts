import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FloatingIcon {
  id: string;
  icon: string;
  position: 'top-right' | 'bottom-right' | 'top-left';
  background: string;
  color: string;
  animationDelay: number;
}

interface CtaButton {
  text: string;
  href: string;
  icon: string;
  isPrimary: boolean;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss']
})
export class HeroComponent {
    brand : string = "Vendify";
    //slogan : string = '"Lo que querés, cuando querés"';
    title : string = 'Máquinas expendedoras inteligentes y 100 % cashless.'
    subtitle : string = 'Lo que querés, cuando querés. Lleva comodidad y modernidad a tu espacio con instalación plug and play y servicio 24/7.';
}