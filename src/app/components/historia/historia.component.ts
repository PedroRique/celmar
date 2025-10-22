import { Component } from '@angular/core';
import { BrandingService } from 'src/app/core/branding.service';

@Component({
  selector: 'app-historia',
  templateUrl: './historia.component.html',
  styleUrls: ['./historia.component.sass']
})
export class HistoriaComponent {
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