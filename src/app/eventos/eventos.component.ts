import { Component, OnInit } from '@angular/core';
import { SiteService } from '../site.service';
import { Router } from '@angular/router';
import { EventEmitterService } from '../event-emitter.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  public eventos = [];

  constructor(public service: SiteService, private router: Router, private eventEmitterService: EventEmitterService) {
    this.eventos = this.service.getEventos();
  }

  ngOnInit() {
  }

  getBg(id, image){
    return `url(../../assets/images/eventos/${id}/1.jpg)`;
  }

  abreEvento(id){
    this.eventEmitterService.onOpenGallery(id, 'eventos');
    //this.router.navigate(['evento/'+ id]);
  }

}
