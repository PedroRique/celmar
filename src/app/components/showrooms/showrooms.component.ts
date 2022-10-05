import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../services/site.service';
import { Router } from '@angular/router';
import { EventEmitterService } from '../../services/event-emitter.service';

export interface Showroom {
  nome: string;
  id: string;
  qtd: number;
  qtdVideo?: number;
}

@Component({
  selector: 'app-showrooms',
  templateUrl: './showrooms.component.html',
  styleUrls: ['./showrooms.component.sass']
})
export class ShowroomsComponent implements OnInit {

  public showrooms: Showroom[] = [];

  constructor(public service: SiteService, private router: Router, private eventEmitterService: EventEmitterService) {
    this.showrooms = this.service.getShowrooms();
  }

  ngOnInit() {
  }

  getBg(id: string){
    return `url(../../assets/images/showrooms/${id}/1.jpg)`;
  }

  abreShowroom(id: string){
    this.eventEmitterService.onOpenGallery(id, 'showrooms');
  }

}
