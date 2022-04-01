import { Component, OnInit } from '@angular/core';
import { SiteService } from '../site.service';
import { Router } from '@angular/router';
import { ModalComponent } from '../../app/modal/modal.component';
import { EventEmitterService } from '../event-emitter.service';

@Component({
  selector: 'app-decorados',
  templateUrl: './decorados.component.html',
  styleUrls: ['./decorados.component.css']
})
export class DecoradosComponent implements OnInit {

  public decorados = [];

  constructor(public service: SiteService, private router: Router, private eventEmitterService: EventEmitterService) {
    this.decorados = this.service.getDecorados();
  }

  ngOnInit() {
  }

  getBg(id){
    return `url(../../assets/images/decorados/${id}/1.jpg)`;
  }

  abreDecorado(id:string){
    this.eventEmitterService.onOpenGallery(id, 'decorados');
    //this.router.navigate(['decorado/'+ id]);
  }
}
