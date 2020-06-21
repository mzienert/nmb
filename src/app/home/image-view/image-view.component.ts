import { Component, OnInit } from '@angular/core';
import { Lightbox, LightboxConfig } from 'ngx-lightbox';
import { ImagesService } from '../../services/images.service';
import { Images, Album } from './images';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.css']
})
export class ImageViewComponent implements OnInit {

  images: any = [];
  albums: Album[] = [];
  bucket: string;

  constructor(private _lightbox: Lightbox, private _lightboxConfig: LightboxConfig, private imagesService: ImagesService) {
    this.bucket = 'https://nmb-compress.s3-us-west-2.amazonaws.com/public';
    //_lightboxConfig.centerVertically = true;
    _lightboxConfig.alwaysShowNavOnTouchDevices = true;
    _lightboxConfig.showImageNumberLabel = true;
    _lightboxConfig.positionFromTop = 40;
  }

  ngOnInit() {
    this.imagesService.listImages().subscribe((data: any) => {
      console.log(data.Items)
      this.images = data.Items;
      this.buildGallery();
    });
  }

  buildGallery() {
    for (let i = 0; i < this.images.length; i++) {
      const src = `${this.bucket}/${this.images[i].url}`;
      //const caption = 'Image ' + i + ' caption here';
      const thumb = `${this.bucket}/${this.images[i].thumb}`;
      const album = {
        src: src,
        thumb: thumb
      };
      this.albums.push(album);
    }
  }

  open(index: number): void {
    this._lightbox.open(this.albums, index);
  }

  close(): void {
    this._lightbox.close();
  }

}
