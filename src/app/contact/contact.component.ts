import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ScrollService } from '../scroll.service';


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
  messageText: string = '';

  constructor(private http: HttpClient, private scrollService: ScrollService) {}

  sendEmail() {
    const datos = {
      name: this.name,
      phone: this.phone,
      email: this.email,
      message: this.message,
      subject: "Richiesta generica Casa Dalmazia"
    };

  this.http.post('https://emailapi-production-d4cd.up.railway.app/email/send-email', datos).subscribe({
next: (response) => {
  console.log('Email inviata con successo', response);
  this.isError = false;
  this.messageText = 'Messaggio inviato, ti contatteremo al più presto.';
},
error: (error) => {
  console.error('Errore durante l\'invio dell\'email', error);
  this.isError = true;
  this.messageText = 'Si è verificato un errore, prova a chiamarci.';
},
  });

  this.showMessage = true;
  setTimeout(() => {
    this.showMessage = false;
  }, 4000);

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
