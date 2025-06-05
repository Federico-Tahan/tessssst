import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroComponent } from './hero-section/hero-section.component';
import { NavbarComponent } from './navbar/navbar.component';
import { WhoWeAreComponent } from "./who-we-are/who-we-are.component";
import { WarranyAndSupportComponent } from "./warrany-and-support/warrany-and-support.component";
import { PricesComponent } from "./prices/prices.component";
import { CatalogSectionComponent } from './catalog-section/catalog-section.component';
import { MapShowCaseComponent } from './map-showcase/map-showcase.component';
import { TestimonialSectionComponent } from './testimonial-section/testimonial-section.component';
import { ContactFormComponent } from './contact-form/contact-form.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    HeroComponent, 
    NavbarComponent,
    WhoWeAreComponent, 
    WarranyAndSupportComponent, 
    PricesComponent, 
    CatalogSectionComponent,
    MapShowCaseComponent,
    TestimonialSectionComponent,
    ContactFormComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
