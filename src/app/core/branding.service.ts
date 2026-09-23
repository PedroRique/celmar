import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

export interface PrivacyBranding {
  companyName?: string;
  contactEmail?: string;
}

export interface Branding {
  appTitle: string;
  pageTitle?: string;
  logoUrl: string;
  faviconUrl: string;
  theme?: Record<string, string>;
  manifestUrl?: string;
  historia?: string;          // texto da história
  show70Anos?: boolean;       // exibir seção dos 70 anos
  historiaVideoUrl?: string;  // URL do vídeo da história
  banners?: string[];         // array com nomes das imagens de banner
  privacy?: PrivacyBranding;
}

@Injectable({ providedIn: 'root' })
export class BrandingService {
  private data!: Branding;

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private title: Title,
    private meta: Meta
  ) {}

  get branding(): Branding {
    return this.data;
  }

  get historia(): string {
    return this.data.historia ?? 'História ainda não disponível para esta marca.';
  }

  get show70Anos(): boolean {
    return this.data.show70Anos ?? false;
  }

  get historiaVideoUrl(): string {
    return this.data.historiaVideoUrl ?? '';
  }

  get banners(): string[] {
    return this.data.banners ?? ['default-banner1', 'default-banner2'];
  }

  get privacyCompanyName(): string {
    return this.data.privacy?.companyName ?? this.data.appTitle;
  }

  get privacyContactEmail(): string | null {
    return this.data.privacy?.contactEmail ?? null;
  }

  async load(): Promise<void> {
    const hostRaw = window.location.hostname.toLowerCase();
    const host = hostRaw.replace(/^www\./, '');
    const key = this.resolveBrandKey(host);
    const url = `/assets/brands/${key}/branding.json`;

    try {
      const res = await fetch(url, { cache: 'no-store' });
      this.data = res.ok ? await res.json() : await this.defaultBranding(key);
    } catch {
      this.data = await this.defaultBranding(key);
    }

    this.apply();
  }

  private resolveBrandKey(host: string): string {
    if (host.includes('predilect')) {
      return 'grupopredilectario';
    }
    if (host.includes('celmar')) {
      return 'celmarrio';
    }

    const params = new URLSearchParams(window.location.search);
    const brand = (params.get('brand') ?? '').toLowerCase();
    if (brand.includes('predilect')) {
      return 'grupopredilectario';
    }

    return 'celmarrio';
  }

  private async defaultBranding(key = 'celmarrio'): Promise<Branding> {
    return {
      appTitle: key === 'grupopredilectario' ? 'Predilecta' : 'Celmar',
      pageTitle: key === 'grupopredilectario' ? 'Grupo Predilecta Rio' : 'Celmar Rio',
      logoUrl: '/assets/brands/default/logo.svg',
      faviconUrl: '/assets/brands/default/favicon.png',
      theme: {
        '--brand-primary': '#0ea5e9',
        '--brand-bg': '#ffffff',
        '--brand-text': '#000000'
      },
      historia: 'Texto de história padrão para fallback.',
      banners: ['default-banner1', 'default-banner2']
    };
  }

  private apply(): void {
    const pageTitle = this.data.pageTitle ?? this.data.appTitle;
    this.title.setTitle(pageTitle);

    let link = this.doc.querySelector("link[rel*='icon']") as HTMLLinkElement | null;
    if (!link) {
      link = this.doc.createElement('link');
      link.rel = 'icon';
      this.doc.head.appendChild(link);
    }
    link.href = this.data.faviconUrl;

    const manifest = this.doc.getElementById('app-manifest') as HTMLLinkElement | null;
    if (manifest && this.data.manifestUrl) {
      manifest.href = this.data.manifestUrl;
    }

    Object.entries(this.data.theme ?? {}).forEach(([key, value]) => {
      this.doc.documentElement.style.setProperty(key, value);
    });

    this.meta.updateTag({ name: 'og:title', content: pageTitle });
    this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
  }
}