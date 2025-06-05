import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isMobileMenuOpen = false;
  isLogoVisible = false;

  navLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Quiénes somos', href: '#nosotros' },
    { label: 'Catálogo', href: '#catalogo' },
    { label: 'Precios', href: '#precios' },
    { label: 'Contacto', href: '#contacto' }
  ];

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    
    // Prevenir scroll del body cuando el menú está abierto
    if (this.isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
  scrollToSection(event: Event, href: string) {
    event.preventDefault();
    const targetId = href.substring(1); // Remove the '#'
    const element = document.getElementById(targetId);
    
    if (element) {
      const navbarHeight = 80; // Ajusta según la altura de tu navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    
    this.closeMobileMenu();
  }
  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    document.body.style.overflow = '';
  }

  onScroll() {
    const scrollPosition = window.scrollY;
    this.isLogoVisible = scrollPosition > 200;
  }
}