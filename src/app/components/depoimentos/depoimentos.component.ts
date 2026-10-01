import { Component, OnInit } from '@angular/core';
import SwiperCore, { Navigation, Pagination, A11y, SwiperOptions } from 'swiper';
import { BrandingService } from '../../core/branding.service';
import { GoogleReview, GoogleReviewsPayload, GoogleReviewsService } from '../../services/google-reviews.service';

SwiperCore.use([Navigation, Pagination, A11y]);

type Star = 'full' | 'half' | 'empty';

const CELMAR_OCULTOS = new Set(['camilla', 'nilza mello']);

@Component({
  selector: 'app-depoimentos',
  templateUrl: './depoimentos.component.html',
  styleUrls: ['./depoimentos.component.sass']
})
export class DepoimentosComponent implements OnInit {

  public swiperVisible = true;
  public summary: GoogleReviewsPayload | null = null;
  public depoimentos: GoogleReview[] = [
    {
      nome: 'Eliane Santos',
      texto: 'Super qualidade. Fiz meu quarto e cozinha em uns de seus representantes há 20 anos atrás. Parabéns pela qualidade e assistência!'
    }
  ];

  public config: SwiperOptions = {
    slidesPerView: 1,
    navigation: true,
    pagination: { clickable: true },
    autoHeight: true,
  };

  constructor(
    private reviews: GoogleReviewsService,
    private branding: BrandingService
  ) { }

  ngOnInit() {
    const title = (this.branding.branding?.appTitle || '').toLowerCase();
    const brand = title.includes('predilect') ? 'predilecta' : 'celmar';

    this.reviews.getReviews(brand).subscribe({
      next: (data) => {
        if (!data?.reviews?.length) {
          return;
        }
        const reviews = brand === 'celmar' ?
          data.reviews.filter((dep) => !CELMAR_OCULTOS.has((dep.nome || '').trim().toLowerCase())) :
          data.reviews;
        if (!reviews.length) {
          return;
        }
        this.summary = data.total > 0 ? data : null;
        this.depoimentos = reviews;
        this.swiperVisible = false;
        setTimeout(() => {
          this.swiperVisible = true;
        });
      },
      error: () => undefined
    });
  }

  get lojasGoogle(): { nome: string; mapsUrl: string }[] {
    const seen = new Map<string, string>();
    this.depoimentos.forEach((dep) => {
      if (dep.loja && dep.mapsUrl && !seen.has(dep.loja)) {
        seen.set(dep.loja, dep.mapsUrl);
      }
    });
    return Array.from(seen, ([nome, mapsUrl]) => ({ nome, mapsUrl }));
  }

  formatRating(value: number): string {
    return value.toFixed(1).replace('.', ',');
  }

  stars(rating: number): Star[] {
    const result: Star[] = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        result.push('full');
      } else if (rating >= i - 0.5) {
        result.push('half');
      } else {
        result.push('empty');
      }
    }
    return result;
  }

  starClass(star: Star): string {
    if (star === 'half') {
      return 'fas fa-star-half-alt';
    }
    if (star === 'empty') {
      return 'far fa-star';
    }
    return 'fas fa-star';
  }

  onPhotoError(event: Event): void {
    const img = event.target as HTMLImageElement | null;
    if (!img || img.src.includes('avatar.jpg')) {
      return;
    }
    img.src = 'assets/images/avatar.jpg';
  }
}
