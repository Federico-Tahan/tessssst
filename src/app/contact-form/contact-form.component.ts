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
      lng: -64.2339189672631,
    },
  ]
  
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
    // Trackear intento de envío
    this.analytics.trackButtonClick('vendify_contact_submit', {
      section: 'contact_form',
      form_valid: this.contactForm.valid,
      timestamp: new Date().toISOString()
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
        next: (response: any) => {
          this.isSubmitting = false;
          this.showSuccess = true;
          
          // Trackear envío exitoso
          this.analytics.trackFormSubmission('vendify-contacto');
          
          // Trackear lead generado (evento de conversión)
          this.analytics.trackEvent('vendify_lead_generated', {
            event_category: 'conversion',
            lead_source: 'contact_form',
            has_phone: !!this.contactForm.get('telefono')?.value,
            message_length: this.contactForm.get('mensaje')?.value?.length || 0,
            value: 100 // valor estimado del lead
          });
          
          console.log('Formulario enviado exitosamente:', response);
        },
        error: (error) => {
          this.isSubmitting = false;
          this.showError = true;
          
          // Trackear error en envío
          this.analytics.trackEvent('vendify_form_error', {
            event_category: 'form_error',
            error_type: 'submission_failed',
            error_message: error.message,
            form_name: 'contacto-vendify'
          });
          
          console.error('Error al enviar formulario:', error);
        }
      });
    } else {
      // Trackear intento con formulario inválido
      this.analytics.trackEvent('vendify_form_validation_error', {
        event_category: 'form_validation',
        invalid_fields: this.getInvalidFields(),
        completion_rate: this.getFormCompleteness()
      });
      
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
    }
  }

  resetForm(): void {
    // Trackear click en "nueva consulta"
    this.analytics.trackButtonClick('vendify_new_consultation', {
      section: 'success_message',
      action: 'reset_form'
    });
    
    this.showSuccess = false;
    this.contactForm.reset();
    Object.keys(this.contactForm.controls).forEach(key => {
      this.contactForm.get(key)?.markAsUntouched();
    });
  }

  // Métodos helper para analytics
  private getInvalidFields(): string[] {
    const invalid = [];
    const controls = this.contactForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }

  private getFormCompleteness(): number {
    const controls = this.contactForm.controls;
    const totalFields = Object.keys(controls).length;
    const completedFields = Object.keys(controls).filter(key => 
      controls[key].value && controls[key].value.toString().trim() !== ''
    ).length;
    
    return Math.round((completedFields / totalFields) * 100);
  }
}