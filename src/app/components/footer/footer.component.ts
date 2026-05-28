import { Component } from '@angular/core';
import { BrandingService } from '../../core/branding.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass']
})
export class FooterComponent {
  readonly year = new Date().getFullYear();

  constructor(public branding: BrandingService) {}
}
