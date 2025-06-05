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
      lng:  -64.2339189672631,
    },
  ];
  
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

  async onSubmit(): Promise<void> {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      
      const formData = new FormData();
      formData.append('nome', this.contactForm.get('nombre')?.value);
      formData.append('email', this.contactForm.get('email')?.value);
      formData.append('assunto', `Consulta de ${this.contactForm.get('nombre')?.value}`);
      formData.append('mensagem', `
        Nombre: ${this.contactForm.get('nombre')?.value}
        Email: ${this.contactForm.get('email')?.value}
        Teléfono: ${this.contactForm.get('telefono')?.value}
        
        Mensaje:
        ${this.contactForm.get('mensaje')?.value}
      `);
      formData.append('_subject', 'Nueva consulta desde el sitio web');

      try {
        const response = await fetch('https://formsubmit.co/fedetahan8@gmail.com', {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          this.isSubmitting = false;
          this.showSuccess = true;
        } else {
          this.isSubmitting = false;
          alert('Hubo un error al enviar el formulario. Por favor, intentá nuevamente.');
        }
      } catch (error) {
        this.isSubmitting = false;
        alert('Hubo un error al enviar el formulario. Por favor, intentá nuevamente.');
      }
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