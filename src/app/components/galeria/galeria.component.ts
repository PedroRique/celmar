import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.sass']
})
export class GaleriaComponent implements OnInit {

  public foto = {id:0, foto: ''};
  public activedFilterIcon = 'cozinha';
  public imagesGaleria;

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor() {
    this.galleryOptions = [
      { "arrowPrevIcon": "fa fa-arrow-circle-o-left", "arrowNextIcon": "fa fa-arrow-circle-o-right", "closeIcon": "fa fa-window-close", "fullscreenIcon": "fa fa-arrows", "spinnerIcon": "fa fa-refresh fa-spin fa-3x fa-fw", "previewFullscreen": true },
      { "imageArrows": false, "imageSwipe": true, "thumbnailsArrows": false, "thumbnailsSwipe": true, "previewSwipe": true },
      { "previewCloseOnClick": true, "previewCloseOnEsc": true },
      { "previewZoom": true, "previewRotate": true },
      { width: '100%', height: '600px', thumbnailsColumns: 6, imageAnimation: NgxGalleryAnimation.Slide }
    ];

    this.imagesGaleria = ['banho_abruzzo', 'cozinha_navero', 'final_dormitorio', 'gourmet_marsala', 'gourmet', 'home_york', 'lavanderia', 'curva_rgb', 'dorm_verona', 'closet_amendoa', 'cozinha_rgb', 'gourmet_personal', 'office_lineo'];

    this.galleryImages = this.imagesGaleria.map(image => {
      let imgStr = 'assets/images/galeria/' + image + '.jpg';

      return {
        small: imgStr,
        medium: imgStr,
        big: imgStr
      };
    })
  }

  ngOnInit() { }
}
