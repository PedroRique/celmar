import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

export interface Branding {
  appTitle: string;
  logoUrl: string;
  faviconUrl: string;
  theme?: Record<string, string>;
  manifestUrl?: string;
  historia?: string;          // texto da história
  show70Anos?: boolean;       // exibir seção dos 70 anos
  historiaVideoUrl?: string;  // URL do vídeo da história
  banners?: string[];         // array com nomes das imagens de banner
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

  async load(): Promise<void> {
    const hostRaw = window.location.hostname.toLowerCase();
    const host = hostRaw.replace(/^www\./, '');

    const map: Record<string, string> = {
      'localhost': 'default',
      '127.0.0.1': 'default',
      'celmarrio.com.br': 'celmarrio',
      'celmarrio.local': 'celmarrio',
      'celmarrio.localhost': 'celmarrio',
      'grupopredilectario.com.br': 'grupopredilectario',
      'grupopredilectario.local': 'grupopredilectario',
      'grupopredilectario.localhost': 'grupopredilectario'
    };

    const key = map[host] ?? 'default';
    const url = `/assets/brands/${key}/branding.json`;

    try {
      const res = await fetch(url, { cache: 'no-store' });
      this.data = res.ok ? await res.json() : await this.defaultBranding();
    } catch {
      this.data = await this.defaultBranding();
    }

    this.apply();
  }

  private async defaultBranding(): Promise<Branding> {
    return {
      appTitle: 'App',
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
    this.title.setTitle(this.data.appTitle);

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

    this.meta.updateTag({ name: 'og:title', content: this.data.appTitle });
    this.meta.updateTag({ name: 'twitter:title', content: this.data.appTitle });
  }
}