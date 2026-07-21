import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from '../../services/event-emitter.service';

@Component({
  selector: 'app-agende',
  templateUrl: './agende.component.html',
  styleUrls: ['./agende.component.sass']
})
export class AgendeComponent implements OnInit {
  constructor(private eventEmitterService: EventEmitterService) { }

  ngOnInit() { }

  openWhatsappModal(event: Event) {
    event.preventDefault();
    this.eventEmitterService.onOpenWhatsappModal();
  }
}
