import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-agende',
  templateUrl: './agende.component.html',
  styleUrls: ['./agende.component.css']
})
export class AgendeComponent implements OnInit {

  public horas = [];

  constructor() {
    this.getHoras(8,18);
  }

  ngOnInit() {
    
  }

  ngAfterViewInit(){
    var SPMaskBehavior = function (val) {
      return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
    },
    spOptions = {
      onKeyPress: function(val, e, field, options) {
          field.mask(SPMaskBehavior.apply({}, arguments), options);
        }
    };
    
    $('#telefone').mask(SPMaskBehavior, spOptions);
  }

  getHoras(ini, fim){
    for(let i = ini; i <= fim; i++){
      this.horas.push(i + ':00');
      this.horas.push(i + ':30');

      if(i == fim){
        this.horas.pop();
      }
    }
  }

}
