import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-depoimentos',
  templateUrl: './depoimentos.component.html',
  styleUrls: ['./depoimentos.component.css']
})
export class DepoimentosComponent implements OnInit {

  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1, "arrows": false};

  public depoimentos = [
    {
      id: '0',
      nome: 'Eliane Santos',
      texto: 'Super qualidade. Fiz meu quarto e cozinha em uns de seus representantes há 20 anos atrás. Parabéns pela qualidade e assistência!'
    }
  ]
  
  constructor() { }

  ngOnInit() {
  }
  
  slickInit(e) {
    console.log('slick initialized');
  }
  
  breakpoint(e) {
    console.log('breakpoint');
  }
  
  afterChange(e) {
    console.log('afterChange');
  }
  
  beforeChange(e) {
    console.log('beforeChange');
  }

}
