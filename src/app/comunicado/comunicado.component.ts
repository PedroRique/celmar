import { Component, OnInit } from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-comunicado',
  templateUrl: './comunicado.component.html',
  styleUrls: ['./comunicado.component.css']
})
export class ComunicadoComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  openComunicado(){
    $("#comunicado-covid").modal('show');
  }

}
