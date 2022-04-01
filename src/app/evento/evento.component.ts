import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { SiteService } from '../site.service';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

declare var $: any;

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {

  public eventoId = '';
  public qtd : any;
  public current = 1;
  public imagesGaleria;
  slideConfig = {
    "slidesToShow": 3,
    "slidesToScroll": 1,
    "arrows": false,
    "lazyLoad": 'ondemand',
    "centerMode": true,
  };

  public evento = {
    qtd: 0,
    nome: ''
  };

  public galleryOptions: NgxGalleryOptions[];
  public galleryImages: NgxGalleryImage[];

  @ViewChild('slickImages', {static: false}) public slickImages : any;

  constructor(private activatedRoute: ActivatedRoute, public service: SiteService) {
    const app = this;

    this.activatedRoute.params.subscribe(params => {
      app.eventoId = params['id'];
    });

    app.evento = this.service.getEvento(app.eventoId);
  }

  ngOnInit() {
    $('body').addClass('scroll');

    const app = this;

    this.galleryOptions = [
      { "arrowPrevIcon": "fa fa-arrow-circle-o-left", "arrowNextIcon": "fa fa-arrow-circle-o-right", "closeIcon": "fa fa-window-close", "fullscreenIcon": "fa fa-arrows", "spinnerIcon": "fa fa-refresh fa-spin fa-3x fa-fw", "previewFullscreen": true },
      { "imageArrows": false, "imageSwipe": true, "thumbnailsArrows": false, "thumbnailsSwipe": true, "previewSwipe": true },
      { "previewCloseOnClick": true, "previewCloseOnEsc": true },
      { "previewZoom": true, "previewRotate": true },
      { width: '100%', height: '600px', thumbnailsColumns: 6, imageAnimation: NgxGalleryAnimation.Slide }
    ];
    
    let images = [];

    for(let i = 1; i <= app.evento.qtd; i++) {
      let imgStr = 'assets/images/eventos/' + app.eventoId + '/' + i + '.jpg';
      let obj = {
        small: imgStr,
        medium: imgStr,
        big: imgStr
      }

      images.push(obj);
    }

    this.galleryImages = images;
  }

  ngAfterViewInit(){
    $('.slick-cloned').click((elem) => {
      this.selectFoto(elem.target.alt);
    });
  }

  beforeChange(e){
    // console.log(this.current, e.nextSlide);
    this.current = e.nextSlide;
  }

  selectFoto(i){
    // console.log(i);
    this.slickImages.slickGoTo(i);
  }

}