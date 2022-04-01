import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent implements OnInit {

  public foto = {id:0, foto: ''};
  public activedFilterIcon = 'cozinha';
  public imagesGaleria;

  @ViewChild('filter', {static: false}) filter;

  public filters = [
    {
      id: 'cozinha',
      name: 'Cozinha'
    },
    {
      id: 'dormitorio',
      name: 'Dormitório'
    },
    {
      id: 'office',
      name: 'Office'
    },
    {
      id: 'home-theater',
      name: 'Home Theater'
    },
    {
      id: 'banheiro',
      name: 'Banheiro'
    },
    {
      id: 'closet',
      name: 'Closet'
    },
    {
      id: 'lavanderia',
      name: 'Lavanderia'
    }
  ]

  public fotos = [
    {
      foto: 'banner1',
      id: 0,
      type: 'cozinha'
    },
    {
      foto: 'banner1',
      id: 1,
      type: 'banheiro'
    },
    {
      foto: 'banner1',
      id: 2,
      type: 'comodos'
    },
    {
      foto: 'banner1',
      id: 3,
      type: 'dormitorio'
    },
    {
      foto: 'banner1',
      id: 3,
      type: 'office'
    },
    {
      foto: 'banner1',
      id: 3,
      type: 'home-theater'
    },
    {
      foto: 'banner1',
      id: 3,
      type: 'lavanderia'
    },
    {
      foto: 'banner1',
      id: 3,
      type: 'cozinha'
    },
    {
      foto: 'banner1',
      id: 3,
      type: 'dormitorio'
    },
    {
      foto: 'banner1',
      id: 3
    },
    {
      foto: 'banner1',
      id: 3
    },
    {
      foto: 'banner1',
      id: 3
    }
  ]

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor() { }

  ngOnInit() {
    this.galleryOptions = [
      { "arrowPrevIcon": "fa fa-arrow-circle-o-left", "arrowNextIcon": "fa fa-arrow-circle-o-right", "closeIcon": "fa fa-window-close", "fullscreenIcon": "fa fa-arrows", "spinnerIcon": "fa fa-refresh fa-spin fa-3x fa-fw", "previewFullscreen": true },
      { "imageArrows": false, "imageSwipe": true, "thumbnailsArrows": false, "thumbnailsSwipe": true, "previewSwipe": true },
      { "previewCloseOnClick": true, "previewCloseOnEsc": true },
      { "previewZoom": true, "previewRotate": true },
      { width: '100%', height: '600px', thumbnailsColumns: 6, imageAnimation: NgxGalleryAnimation.Slide }
    ];

    this.imagesGaleria = ['banho_abruzzo', 'cozinha_navero', 'final_dormitorio', 'gourmet_marsala', 'gourmet', 'home_york', 'lavanderia', 'curva_rgb', 'dorm_verona', 'closet_amendoa', 'cozinha_rgb', 'gourmet_personal', 'office_lineo'];

    // ,'ban_bco', 'closet_vicenza', 'corp_vicenza', 'coz_boc', 'coz_diamante', 'coz_frost'

    this.galleryImages = this.imagesGaleria.map(image => {
      let imgStr = 'assets/images/galeria/' + image + '.jpg';
      let obj = {
        small: imgStr,
        medium: imgStr,
        big: imgStr
      }

      return obj;
    })
  }

  selectFoto(foto){
    this.foto = foto;
  }

  changeFoto(direction){
    if(direction){
      this.foto.id = this.foto.id + 1;
    }else{
      this.foto.id = this.foto.id - 1;
    }
  }

  changeFilter(){
    this.activedFilterIcon = this.filter.nativeElement.value;
  }

}
