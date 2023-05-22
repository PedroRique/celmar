import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from '../../services/event-emitter.service';
import { SiteService } from '../../services/site.service';

export interface Event {
  nome: string;
  id: string;
  qtd: number;
  qtdVideo?: boolean;
  description?: string;
}

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.sass'],
})
export class EventosComponent implements OnInit {
  public events: Event[] = [];

  constructor(
    public service: SiteService,
    private eventEmitterService: EventEmitterService
  ) {
    this.events = this.service.getEventos();
  }

  ngOnInit() {}

  getBg(id: string) {
    return `url(../../assets/images/eventos/${id}/1.jpg)`;
  }

  abreEvento(id: string) {
    this.eventEmitterService.onOpenGallery(id, 'eventos');
  }
}
