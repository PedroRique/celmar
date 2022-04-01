import { Component, OnInit, ViewChild} from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, INgxGalleryOptions, NgxGalleryComponent} from 'ngx-gallery';
import { SiteService } from '../site.service';
import { EventEmitterService } from '../event-emitter.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @ViewChild('gallery', {static: false}) gallery: NgxGalleryComponent;
  public galleryOptions: INgxGalleryOptions[] = [{
    image:      false,
    thumbnails: false,
    "width": "0px",
    "height": "0px",
    previewCloseOnClick:       true,
    previewCloseOnEsc:         true,
    previewKeyboardNavigation: true,
    previewSwipe:              true
  }];
  public galleryImages: NgxGalleryImage[];

  constructor(public service: SiteService, private eventEmitterService: EventEmitterService) { }

  ngOnInit() {    
    if (this.eventEmitterService.subsVar==undefined) {    
      this.eventEmitterService.subsVar = this.eventEmitterService.    
      invokeGallery.subscribe((gallery) => {    
        this.openGallery(gallery);
      });    
    }
  }  

  openGallery(gallery) {
    let g;
    if(gallery.type == 'decorados') {
      g = this.service.getDecorado(gallery.id);
    }else {
      g = this.service.getEvento(gallery.id);
    }
    let images = [];
    
    for(let i = 1; i <= g.qtd; i++) {
      let imgStr = 'assets/images/' + gallery.type + '/' + g.id + '/' + i + '.jpg';
      let obj = {
        small: imgStr,
        medium: imgStr,
        big: imgStr
      }

      images.push(obj);
    }

    this.galleryImages = images;

    setTimeout(() => {
      this.gallery.openPreview(0);
    },0);
  }

}
