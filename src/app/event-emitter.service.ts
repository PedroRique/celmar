import { Injectable, EventEmitter} from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  invokeGallery = new EventEmitter();
  subsVar: Subscription;

  constructor() { }

  onOpenGallery(id:string, type:string) {
    let gallery = { id, type };
    this.invokeGallery.emit(gallery);
  }
}
