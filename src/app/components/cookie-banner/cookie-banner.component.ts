import {
  Component,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { CookieConsentService } from '../../core/cookie-consent.service';

@Component({
  selector: 'app-cookie-banner',
  templateUrl: './cookie-banner.component.html',
  styleUrls: ['./cookie-banner.component.sass'],
})
export class CookieBannerComponent implements OnInit {
  visible = true;

  constructor(
    private cookieConsent: CookieConsentService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cookieConsent.init();
    this.visible = this.cookieConsent.shouldShowBanner();
    this.cdr.detectChanges();
  }

  accept(): void {
    this.cookieConsent.accept();
    this.visible = false;
  }
}
