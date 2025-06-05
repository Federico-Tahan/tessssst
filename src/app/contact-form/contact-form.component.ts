import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeafletMapComponent, MapMarker, MapOptions } from '../components/leaflet-map/leaflet-map.component';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, LeafletMapComponent],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {
  contactForm: FormGroup;
  isSubmitting = false;
  showSuccess = false;

  locations: MapMarker[] = [
    {
      lat: -31.382875176171524,
      lng: -64.2339189672631,
    },
  ];

  mapOptions: MapOptions = {
    center: [-31.382875176171524, -64.2339189672631],
    zoom: 13,
    markers: this.locations,
    height: '400px',
    width: '100%'
  };

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required]],
      mensaje: ['', [Validators.required]]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isSubmitting = true;

      setTimeout(() => {
        this.isSubmitting = false;
        this.showSuccess = true;
        console.log('Formulario enviado:', this.contactForm.value);
      }, 2000);
    } else {
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
    }
  }

  resetForm(): void {
    this.showSuccess = false;
    this.contactForm.reset();
    Object.keys(this.contactForm.controls).forEach(key => {
      this.contactForm.get(key)?.markAsUntouched();
    });
  }
}
