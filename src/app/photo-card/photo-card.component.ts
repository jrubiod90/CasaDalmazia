import { Component, Input, OnInit, HostListener } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'photo-card',
  templateUrl: './photo-card.component.html',
  styleUrls: ['./photo-card.component.css']
})
export class PhotoCardComponent implements OnInit {
  @Input() title!: string;
  @Input() content!: string;
  @Input() images: string[] = [];

  currentIndex = 0;
  cardPhoto!: string;
  album: Array<{ src: string; caption: string; thumb: string }> = [];

  private touchStartX = 0;
  private touchEndX = 0;
  private minSwipeDistance = 50; // distancia mínima para considerar swipe

  constructor(private lightbox: Lightbox) {}

  ngOnInit() {
    this.cardPhoto = this.images[0];
    this.album = this.images.map(img => ({
      src: img,
      caption: this.title,
      thumb: img
    }));
  }

  openGallery() {
    this.lightbox.open(this.album, this.currentIndex);
  }

  prevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.cardPhoto = this.images[this.currentIndex];
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.cardPhoto = this.images[this.currentIndex];
  }

  // Detectar cuando comienza el toque
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  // Detectar cuando termina el toque y decidir si es swipe
  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipeGesture();
  }

  handleSwipeGesture() {
    const distance = this.touchEndX - this.touchStartX;
    if (Math.abs(distance) > this.minSwipeDistance) {
      if (distance > 0) {
        this.prevImage();
      } else {
        this.nextImage();
      }
    }
  }
}
