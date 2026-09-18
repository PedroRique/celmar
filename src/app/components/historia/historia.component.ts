import { Component } from '@angular/core';
import { BrandingService } from 'src/app/core/branding.service';
import { mediaUrl } from 'src/app/core/media-url';

@Component({
  selector: 'app-historia',
  templateUrl: './historia.component.html',
  styleUrls: ['./historia.component.sass']
})
export class HistoriaComponent {
  readonly video70AnosUrl = mediaUrl('images/celmar-70-anos.mp4');

  constructor(public brandingService: BrandingService) {}

  get historia(): string {
    return this.brandingService.branding.historia || '';
  }

  get show70Anos(): boolean {
    return this.brandingService.branding.show70Anos || false;
  }

  get historiaVideoUrl(): string {
    return this.brandingService.branding.historiaVideoUrl || '';
  }
}
