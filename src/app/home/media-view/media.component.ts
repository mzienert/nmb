import { Component, OnInit } from '@angular/core';
import { Lightbox, LightboxConfig } from 'ngx-lightbox';
import { ImagesService } from '../../services/images.service';
import { Images, Album } from '../image-view/images';

@Component({
  selector: 'app-media-view',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaViewComponent implements OnInit {

  images: Images[] = [];
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
    this.imagesService.listMedia().subscribe((data: Images[]) => {
      this.images = data;
      this.buildGallery();
    })
  }

  buildGallery() {   
    for (let i = 0; i < this.images.length; i++) {
      const src = `${this.bucket}/${this.images[i].name}`;
      //const caption = 'Image ' + i + ' caption here';
      const thumb = `${this.bucket}/${this.images[i].name}`;
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
