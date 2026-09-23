import { Component, OnDestroy, OnInit } from '@angular/core';
import SwiperCore, { Navigation, Pagination, A11y, SwiperOptions } from 'swiper';
import { BrandingService } from 'src/app/core/branding.service';
import { WHATSAPP_URL } from '../../core/whatsapp';

SwiperCore.use([Navigation, Pagination, A11y]);

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.sass']
})
export class BannerComponent implements OnInit, OnDestroy {
  public banners: string[] = [];
  readonly whatsappUrl = WHATSAPP_URL;
  public bannerHeight = '';

  public config: SwiperOptions = {
    slidesPerView: 1,
    navigation: true,
    loop: true,
    pagination: { clickable: true },
  };

  constructor(private brandingService: BrandingService) { }

  ngOnInit() {
    this.banners = this.brandingService.banners;
    this.syncBannerHeight();
    window.addEventListener('resize', this.syncBannerHeight);
    window.visualViewport?.addEventListener('resize', this.syncBannerHeight);
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.syncBannerHeight);
    window.visualViewport?.removeEventListener('resize', this.syncBannerHeight);
  }

  private syncBannerHeight = () => {
    if (window.innerWidth > 768) {
      this.bannerHeight = '';
      return;
    }

    const height = window.visualViewport?.height ?? window.innerHeight;
    this.bannerHeight = `${Math.round(height)}px`;
  };
}
