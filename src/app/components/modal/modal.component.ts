import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { SiteService } from '../../services/site.service';
import { EventEmitterService } from '../../services/event-emitter.service';
import { NgImageSliderComponent } from 'ng-image-slider';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface MediaItem {
  type: 'image' | 'video' | 'youtube';
  url?: string;
  thumbUrl?: string;
  youtubeUrl?: SafeResourceUrl;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent implements OnInit, OnDestroy {
  @ViewChild('imageSlider') imageSlider: NgImageSliderComponent | undefined;

  public showModal = false;
  public images: Array<any> = [];
  public mediaItems: MediaItem[] = [];

  constructor(
    public service: SiteService,
    private eventEmitterService: EventEmitterService,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    if (this.eventEmitterService.subsVar == undefined) {
      this.eventEmitterService.subsVar = this.eventEmitterService
        .invokeGallery.subscribe((gallery) => {
          this.openGallery(gallery);
        });
    }
  }

  ngOnDestroy() {
    // Cleanup se necessário
  }

  /** Converte URL do YouTube para embed URL */
  private getYoutubeEmbedUrl(url: string): string {
    let videoId = '';
    
    if (url.includes('youtube.com/embed/')) {
      return url;
    }
    
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0] || '';
    } else if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1]?.split('&')[0] || '';
    }
    
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  }

  /** Verifica se é uma URL do YouTube */
  private isYoutubeUrl(url: string): boolean {
    return url.includes('youtube.com') || url.includes('youtu.be');
  }

  /** Cria uma imagem placeholder cinzenta para YouTube */
  private createYoutubePlaceholder(): string {
    // Usando data URI para criar uma imagem cinzenta simples
    return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23333333"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-size="24" font-family="Arial"%3EYouTube Video%3C/text%3E%3C/svg%3E';
  }

  /** Abre a galeria de imagens/vídeos */
  openGallery(gallery: { type: string; id: any }) {
    let g: any;

    if (gallery.type === 'decorados') {
      g = this.service.getDecorado(gallery.id);
    } else if (gallery.type === 'eventos') {
      g = this.service.getEvento(gallery.id);
    } else if (gallery.type === 'cases') {
      g = this.service.getCase(gallery.id);
    } else {
      g = this.service.getShowroom(gallery.id);
    }

    if (!g) return;

    const images: any[] = [];
    this.mediaItems = [];

    // Adiciona imagens PRIMEIRO (carregam rápido)
    for (let i = 1; i <= g.qtd; i++) {
      const imgStr = `assets/images/${gallery.type}/${g.id}/${i}.jpg`;
      images.push({ image: imgStr, thumbImage: imgStr });
      this.mediaItems.push({
        type: 'image',
        url: imgStr,
        thumbUrl: imgStr
      });
    }

    // Adiciona vídeos do YouTube depois (se existirem)
    if (g.videoUrls && g.videoUrls.length > 0) {
      for (const videoUrl of g.videoUrls) {
        if (this.isYoutubeUrl(videoUrl)) {
          const embedUrl = this.getYoutubeEmbedUrl(videoUrl);
          const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
          
          // Adiciona ao array de mídia
          this.mediaItems.push({
            type: 'youtube',
            youtubeUrl: safeUrl
          });

          // Adiciona o iframe do YouTube como vídeo válido para ng-image-slider
          images.push({ 
            video: embedUrl
          });
        } else {
          images.push({ video: videoUrl });
          this.mediaItems.push({
            type: 'video',
            url: videoUrl
          });
        }
      }
    }

    // Adiciona vídeos locais depois (compatibilidade com formato anterior)
    if (g.qtdVideo && !g.videoUrls) {
      for (let i = 1; i <= g.qtdVideo; i++) {
        const vidStr = `assets/videos/${gallery.type}/${g.id}/${i}.mp4`;
        images.push({ video: vidStr });
        this.mediaItems.push({
          type: 'video',
          url: vidStr
        });
      }
    }

    this.images = images;
    this.mediaItems = this.mediaItems;

    setTimeout(() => {
      this.showModal = true;
      this.imageSlider?.imageOnClick(0);
      this.cdr.markForCheck();
    }, 0);
  }

  /** Fecha o modal */
  onClose() {
    this.showModal = false;
  }
}