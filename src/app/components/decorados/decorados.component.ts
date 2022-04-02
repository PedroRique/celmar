import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../services/site.service';
import { Router } from '@angular/router';
// import { ModalComponent } from '../../app/modal/modal.component';
import { EventEmitterService } from '../../services/event-emitter.service';

export interface Decorado {
  nome: string;
  id: string;
  company: string;
  qtd: number;
  qtdVideo?: number;
}

@Component({
  selector: 'app-decorados',
  templateUrl: './decorados.component.html',
  styleUrls: ['./decorados.component.sass']
})
export class DecoradosComponent implements OnInit {

  public decorados: Decorado[] = [];

  public showNumber = 4;

  constructor(public service: SiteService, private router: Router, private eventEmitterService: EventEmitterService) {
    this.decorados = this.service.getDecorados();
  }

  ngOnInit() {
  }

  getBg(id: string){
    return `url(../../assets/images/decorados/${id}/1.jpg)`;
  }

  abreDecorado(id:string){
    this.eventEmitterService.onOpenGallery(id, 'decorados');
  }

  public toggleShowNumber() {
    this.showNumber = this.showNumber === 4 ? this.decorados.length : 4;
  }
}
