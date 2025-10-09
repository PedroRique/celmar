import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

export interface Branding {
  appTitle: string;
  logoUrl: string;
  faviconUrl: string;
  theme?: Record<string, string>;
  manifestUrl?: string;
}

@Injectable({ providedIn: 'root' })
export class BrandingService {
  private data!: Branding;

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private title: Title,
    private meta: Meta
  ) {}

  async load(): Promise<void> {
    const hostRaw = window.location.hostname.toLowerCase();
    const host = hostRaw.replace(/^www\./, '');

    // 🗺️ Mapeamento de domínios
    const map: Record<string, string> = {
      'celmarrio.com.br': 'celmarrio.com.br',
      'grupopredilectario.com.br': 'grupopredilectario.com.br',
      'localhost': 'default',
      '127.0.0.1': 'default',
      'celmarrio.local': 'celmarrio.com.br',
      'grupopredilectario.local': 'grupopredilectario.com.br',
      'celmarrio.localhost': 'celmarrio.com.br',
      'grupopredilectario.localhost': 'grupopredilectario.com.br',
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

  get branding(): Branding {
    return this.data;
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
      }
    };
  }

  private apply(): void {
    // 🏷️ Título da página
    this.title.setTitle(this.data.appTitle);

    // 🌐 Favicon
    let link = this.doc.querySelector("link[rel*='icon']") as HTMLLinkElement | null;
    if (!link) {
      link = this.doc.createElement('link');
      link.rel = 'icon';
      this.doc.head.appendChild(link);
    }
    link.href = this.data.faviconUrl;

    // 📱 Manifest (opcional)
    const manifest = this.doc.getElementById('app-manifest') as HTMLLinkElement | null;
    if (manifest && this.data.manifestUrl) {
      manifest.href = this.data.manifestUrl;
    }

    // 🎨 CSS Custom Properties
    Object.entries(this.data.theme ?? {}).forEach(([key, value]) =>
      this.doc.documentElement.style.setProperty(key, value)
    );

    // 🧩 Meta tags básicas (ajuste conforme necessário)
    this.meta.updateTag({ name: 'og:title', content: this.data.appTitle });
    this.meta.updateTag({ name: 'twitter:title', content: this.data.appTitle });
  }
}