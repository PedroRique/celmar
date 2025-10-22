import { Component, OnInit } from '@angular/core';
import SwiperCore, { Navigation, Pagination, A11y, SwiperOptions } from 'swiper';
import { BrandingService } from 'src/app/core/branding.service';

SwiperCore.use([Navigation, Pagination, A11y]);

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.sass']
})
export class BannerComponent implements OnInit {
  public banners: string[] = [];

  public config: SwiperOptions = {
    slidesPerView: 1,
    navigation: true,
    loop: true,
    pagination: { clickable: true },
  };

  constructor(private brandingService: BrandingService) { }

  ngOnInit() {
    this.banners = this.brandingService.banners;
  }
}