import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../services/site.service';
import { Router } from '@angular/router';
import { EventEmitterService } from '../../services/event-emitter.service';

export interface Evento {
  nome: string;
  id: string;
  qtd: number;
  qtdVideo?: boolean;
}

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.sass']
})
export class EventosComponent implements OnInit {

  public eventos: Evento[] = [];

  constructor(public service: SiteService, private router: Router, private eventEmitterService: EventEmitterService) {
    this.eventos = this.service.getEventos();
  }

  ngOnInit() {
  }

  getBg(id: string){
    return `url(../../assets/images/eventos/${id}/1.jpg)`;
  }

  abreEvento(id: string){
    this.eventEmitterService.onOpenGallery(id, 'eventos');
  }

}
