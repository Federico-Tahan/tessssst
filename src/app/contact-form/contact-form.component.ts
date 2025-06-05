import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeafletMapComponent, MapMarker, MapOptions } from '../components/leaflet-map/leaflet-map.component';
import { HttpClient } from '@angular/common/http';
import { GoogleAnalyticsService } from '../services/google-analytics.service';

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
  showError = false;
  http = inject(HttpClient);
  analytics = inject(GoogleAnalyticsService); 

  locations: MapMarker[] = [
    {
      lat: -31.382875176171524,
      lng:  -64.2339189672631,
    },
  ]
  
  mapOptions: MapOptions = {
    center: [-31.382875176171524,  -64.2339189672631], 
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
    this.analytics.trackButtonClick('contact_form_submit', {
      section: 'contact_form',
      form_valid: this.contactForm.valid
    });
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      this.showError = false;
  
      const formData = new FormData();
      formData.append('form-name', 'contacto-vendify');
      formData.append('nombre', this.contactForm.get('nombre')?.value || '');
      formData.append('email', this.contactForm.get('email')?.value || '');
      formData.append('telefono', this.contactForm.get('telefono')?.value || '');
      formData.append('mensaje', this.contactForm.get('mensaje')?.value || '');
  
      this.http.post('/', formData).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.showSuccess = true;
          console.log('Formulario enviado exitosamente:', response);
        },
        error: (error) => {
          this.isSubmitting = false;
          this.showError = true;
          console.error('Error al enviar formulario:', error);
        }
      });
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