import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from '../services/event-emitter.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private eventEmitterService: EventEmitterService) {
  }

  ngOnInit() {
  }

  openWhatsappModal(event: Event) {
    event.preventDefault();
    this.eventEmitterService.onOpenWhatsappModal();
  }
}
