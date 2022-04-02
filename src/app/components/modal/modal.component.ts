import { Component, OnInit, ViewChild} from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryComponent, NgxGalleryAnimation} from 'ngx-gallery-images-video';
import { SiteService } from '../../services/site.service';
import { EventEmitterService } from '../../services/event-emitter.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass']
})
export class ModalComponent implements OnInit {

  @ViewChild('gallery', {static: false}) gallery: NgxGalleryComponent | undefined;
  // public galleryOptions: NgxGalleryOptions[] = [{
  //   image: false,
  //   thumbnails: false,
  //   "width": "0px",
  //   "height": "0px",
  //   previewCloseOnClick: true,
  //   previewCloseOnEsc: true,
  //   previewKeyboardNavigation: true,
  //   previewSwipe: true
  // }];

  public galleryOptions = [
    {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
    },
    {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
    },
    {
        breakpoint: 400,
        preview: false
    }
];
  public galleryImages: NgxGalleryImage[] | undefined;

  constructor(public service: SiteService, private eventEmitterService: EventEmitterService) { }

  ngOnInit() {    
    if (this.eventEmitterService.subsVar==undefined) {    
      this.eventEmitterService.subsVar = this.eventEmitterService.    
      invokeGallery.subscribe((gallery) => {    
        this.openGallery(gallery);
      });    
    }
  }  

  openGallery(gallery: { type: string; id: any; }) {
    let g;
    if(gallery.type == 'decorados') {
      g = this.service.getDecorado(gallery.id);
    }else {
      g = this.service.getEvento(gallery.id);
    }
    let images = [];

    if(g.qtdVideo) {
      for(let i = 1; i <= g.qtdVideo; i++) {
        let vidStr = 'assets/videos/' + gallery.type + '/' + g.id + '/' + i + '.mp4';
        let obj = { small: vidStr, medium: vidStr, big: vidStr }
        images.push(obj);
      }
    }
    
    for(let i = 1; i <= g.qtd; i++) {
      let imgStr = 'assets/images/' + gallery.type + '/' + g.id + '/' + i + '.jpg';
      let obj = { small: imgStr, medium: imgStr, big: imgStr }
      images.push(obj);
    }

    this.galleryImages = images;

    setTimeout(() => {
      this.gallery!.openPreview(0);
    },0);
  }

}
