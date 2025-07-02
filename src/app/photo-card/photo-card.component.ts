import { Component, Input, OnInit } from '@angular/core';
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
}
