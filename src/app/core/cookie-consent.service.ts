import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

export type CookieConsentChoice = 'accepted' | 'rejected';

const STORAGE_KEY = 'celmar_cookie_consent';
const GTM_ID = 'GTM-MFM3F7H';

@Injectable({ providedIn: 'root' })
export class CookieConsentService {
  private gtmLoaded = false;

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  get hasChoice(): boolean {
    return this.getStoredChoice() !== null;
  }

  shouldShowBanner(): boolean {
    return !this.hasChoice;
  }

  getStoredChoice(): CookieConsentChoice | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    try {
      const value = localStorage.getItem(STORAGE_KEY);
      if (value === 'accepted' || value === 'rejected') {
        return value;
      }
    } catch {
      return null;
    }
    return null;
  }

  init(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    if (this.getStoredChoice() === 'accepted') {
      this.loadGtm();
    }
  }

  accept(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, 'accepted');
    } catch {
      return;
    }
    this.loadGtm();
  }

  reject(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, 'rejected');
    } catch {
      /* storage indisponível — banner permanece na próxima visita */
    }
  }

  private loadGtm(): void {
    if (this.gtmLoaded || !isPlatformBrowser(this.platformId)) {
      return;
    }
    this.gtmLoaded = true;

    const w = window as unknown as { dataLayer: unknown[] };
    w.dataLayer = w.dataLayer || [];

    const gtag = (...args: unknown[]) => {
      w.dataLayer.push(args);
    };

    gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
      wait_for_update: 500,
    });

    gtag('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted',
    });

    w.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });

    const script = this.doc.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
    const firstScript = this.doc.getElementsByTagName('script')[0];
    firstScript?.parentNode?.insertBefore(script, firstScript);

    const noscript = this.doc.createElement('noscript');
    const iframe = this.doc.createElement('iframe');
    iframe.src = `https://www.googletagmanager.com/ns.html?id=${GTM_ID}`;
    iframe.height = '0';
    iframe.width = '0';
    iframe.setAttribute('style', 'display:none;visibility:hidden');
    noscript.appendChild(iframe);
    this.doc.body.insertBefore(noscript, this.doc.body.firstChild);
  }
}
