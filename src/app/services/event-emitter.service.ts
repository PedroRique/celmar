import { Injectable, EventEmitter} from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  invokeGallery = new EventEmitter();
  invokeWhatsappModal = new EventEmitter();
  subsVar: Subscription | undefined;

  constructor() { }

  onOpenGallery(id:string, type:string) {
    let gallery = { id, type };
    this.invokeGallery.emit(gallery);
  }

  onOpenWhatsappModal() {
    this.invokeWhatsappModal.emit();
  }
}
