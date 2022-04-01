import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  public banner = 0;

  public banners = [
    {
      img: 'banner2',
      title: 'Banner 1',
      text: 'Carlos Navero'
    },
    {
      img: 'dorm',
      title: 'Banner 3',
      text: 'Texto do banner 3'
    },
    {
      img: 'show',
      title: 'Banner 4',
      text: 'Texto do banner 4'
    },
    {
      img: 'office',
      title: 'Banner 5',
      text: 'Texto do banner 5'
    }
  ];
  
  slideConfig = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "arrows": false,
    "lazyLoad": 'ondemand',
    "dots": true
  };

  constructor() { }

  ngOnInit() {
  }

  beforeChange(e){
    this.banner = e.nextSlide;
  }

}
