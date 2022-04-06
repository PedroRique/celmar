import { Component, OnInit, ViewChild} from '@angular/core';
import { SiteService } from '../../services/site.service';
import { EventEmitterService } from '../../services/event-emitter.service';
import { NgImageSliderComponent } from 'ng-image-slider';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass']
})
export class ModalComponent implements OnInit {
  @ViewChild('imageSlider') imageSlider: NgImageSliderComponent | undefined;
  
  public showModal = false;
  public images: Array<object> = [];

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
    } else if (gallery.type === 'eventos') {
      g = this.service.getEvento(gallery.id);
    } else {
      g = this.service.getShowroom(gallery.id);
    }

    let images = [];

    if(g.qtdVideo) {
      for(let i = 1; i <= g.qtdVideo; i++) {
        let vidStr = 'assets/videos/' + gallery.type + '/' + g.id + '/' + i + '.mp4';
        let obj = { video: vidStr }
        images.push(obj);
      }
    }
    
    for(let i = 1; i <= g.qtd; i++) {
      let imgStr = 'assets/images/' + gallery.type + '/' + g.id + '/' + i + '.jpg';
      let obj = { image: imgStr, thumbImage: imgStr }
      images.push(obj);
    }

    this.images = images;

    setTimeout(() => {
      this.showModal = true;
      this.imageSlider?.imageOnClick(0);
    },0);
  }

  onClose() {
    this.showModal = false;
  }

}
