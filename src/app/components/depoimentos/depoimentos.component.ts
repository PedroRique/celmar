import { Component, OnInit } from '@angular/core';

import SwiperCore, { Navigation, Pagination, A11y, SwiperOptions } from 'swiper';

SwiperCore.use([Navigation, Pagination, A11y]);

@Component({
  selector: 'app-depoimentos',
  templateUrl: './depoimentos.component.html',
  styleUrls: ['./depoimentos.component.sass']
})
export class DepoimentosComponent implements OnInit {

  public depoimentos = [
    {
      id: '0',
      nome: 'Eliane Santos',
      texto: 'Super qualidade. Fiz meu quarto e cozinha em uns de seus representantes há 20 anos atrás. Parabéns pela qualidade e assistência!'
    }
  ];

  public config: SwiperOptions = {
    slidesPerView: 1
  };
  
  constructor() { }

  ngOnInit() {
  }

}
