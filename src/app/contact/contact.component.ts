import { Component, Input } from '@angular/core';
import { ScrollService } from '../scroll.service';
import emailjs from 'emailjs-com';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  @Input() localBooking!: Boolean;
  name: string = '';
  phone: string = '';
  email: string = '';
  message: string = '';
  subject: string = '';

  showMessage: boolean = false;
  isError: boolean = false;
  messageText: string = ''; // aquí guardaremos la clave, no el texto traducido

  constructor(private scrollService: ScrollService) {}

  sendEmail() {
    const templateParams = {
      name: this.name,
      phone: this.phone,
      email: this.email,
      message: this.message,
      subject: 'Richiesta generica Casa Dalmazia',
    };

    emailjs
      .send(
        'service_c2es7y7', // ID del servicio configurado en EmailJS
        'template_0tv3uka', // ID de la plantilla creada en EmailJS
        templateParams,
        'WIU45eX1aE0qkhOEG' // Tu clave pública de EmailJS
      )
      .then((response) => {
        console.log('Email inviato con successo', response);
        this.isError = false;
        this.messageText = 'FORMSEND_SUCCESS'; // 👈 guardamos la clave
      })
      .catch((error) => {
        console.error('Error durante el envío del email', error);
        this.isError = true;
        this.messageText = 'FORMSEND_ERROR'; // 👈 guardamos la clave
      });

    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 4000);

    // limpiar campos
    this.name = '';
    this.phone = '';
    this.email = '';
    this.message = '';
  }

  openWhatsApp() {
    const url = 'https://wa.me/+393760888410';
    window.open(url, '_blank');
  }

  scrollTo(sectionId: string) {
    this.scrollService.scrollToSection(sectionId);
  }

  openLinkInNewTab() {
    const url = '';
    window.open(url, '_blank');
  }
}
