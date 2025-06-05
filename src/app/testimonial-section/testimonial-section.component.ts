import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestimonialCardComponent } from "../components/testimonial-card/testimonial-card.component";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  message: string;
  rating: number;
  avatar?: string;
}

@Component({
  selector: 'app-testimonial-section',
  standalone: true,
  imports: [CommonModule, TestimonialCardComponent],
  templateUrl: './testimonial-section.component.html',
  styleUrl: './testimonial-section.component.scss'
})
export class TestimonialSectionComponent implements OnInit, OnDestroy {
  private intervalId?: number;
  currentIndex = 0;
  isTransitioning = false;
  
  testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Laura F.",
      role: "",
      company: "Patio Olmos Shopping",
      message: "Vendify aumentó las ventas de snacks un 22 % y eliminó las filas en el patio de comidas.",
      rating: 5
    },
    {
      id: 2,
      name: "Ing. Carlos G.",
      role: "",
      company: "UCC",
      message: "El servicio 24/7 y la telemetría nos permiten olvidarnos del abastecimiento; la máquina avisa todo.",
      rating: 5
    },
    {
      id: 3,
      name: "Martín S.",
      role: "",
      company: "Torre CEO",
      message: "Instalamos un modelo SlimFit en un pasillo de 70 cm; las ventas superaron nuestras proyecciones en el primer mes.",
      rating: 5
    }
  ];
  

  ngOnInit() {
    this.startSlider();
  }

  ngOnDestroy() {
    this.stopSlider();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // Reiniciar slider al cambiar tamaño de ventana
    this.currentIndex = 0;
  }

  private startSlider() {
    this.intervalId = window.setInterval(() => {
      this.nextSlide();
    }, 4000);
  }

  private stopSlider() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private nextSlide() {
    if (this.isTransitioning) return;
    
    this.isTransitioning = true;
    const visibleItems = this.getVisibleItems();
    const maxIndex = this.testimonials.length - visibleItems;
    
    if (this.currentIndex >= maxIndex) {
      this.currentIndex = 0;
    } else {
      this.currentIndex++;
    }
    
    setTimeout(() => {
      this.isTransitioning = false;
    }, 800);
  }

  onMouseEnter() {
    this.stopSlider();
  }

  onMouseLeave() {
    this.startSlider();
  }

  getTransform(): string {
    const slideWidth = 100 / this.getVisibleItems();
    return `translateX(-${this.currentIndex * slideWidth}%)`;
  }

  getVisibleItems(): number {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1200) return 3;
      if (window.innerWidth >= 768) return 2;
    }
    return 1;
  }

  getSlideWidth(): string {
    const visibleItems = this.getVisibleItems();
    return `${100 / visibleItems}%`;
  }
}