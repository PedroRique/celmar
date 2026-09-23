import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { SlugifyPipe } from '../../../shared/pipes/slugify.pipe';
import { CertificatesComponent } from '../certificates/certificates.component';
import { Endereco } from '../lojas.component';
import { mediaUrl } from '../../../core/media-url';

@Component({
  selector: 'app-loja',
  templateUrl: './loja.component.html',
  styleUrls: ['./loja.component.sass'],
})
export class LojaComponent implements OnInit {
  @Input() public endereco!: Endereco;

  public lojaId = '';
  public telefones: { label: string; href: string }[] = [];

  constructor(
    private slugifyPipe: SlugifyPipe,
    private eventEmitterService: EventEmitterService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.lojaId = this.slugifyPipe.transform(
      `${this.endereco.empresa} ${this.endereco.nome}`
    );
    this.telefones = this.parseTelefones(this.endereco.telefone);
  }

  public openMap(link: string): void {
    window.open(link);
  }

  public openPhotos(): void {
    this.eventEmitterService.onOpenGallery(this.lojaId, 'showrooms');
  }

  public openCertificates(): void {
    this.dialog.open(CertificatesComponent, {
      data: this.lojaId,
      autoFocus: false,
    });
  }

  public getCoverUrl() {
    return mediaUrl(`images/showrooms/${this.lojaId}/1.jpg`);
  }

  public parseTelefones(telefone: string): { label: string; href: string }[] {
    return (telefone || '')
      .split(/\s*[|\/;]\s*/)
      .map((part) => part.trim())
      .filter(Boolean)
      .map((label) => ({
        label,
        href: this.getTelHref(label),
      }))
      .filter((item) => item.href);
  }

  public getTelHref(telefone: string): string {
    const digits = (telefone || '').replace(/\D/g, '');
    if (!digits) {
      return '';
    }

    const withCountry = digits.startsWith('55') ? digits : `55${digits}`;
    return `tel:+${withCountry}`;
  }

  public getEmailHref(email: string): string {
    const value = (email || '').trim();
    return value ? `mailto:${value}` : '';
  }
}
