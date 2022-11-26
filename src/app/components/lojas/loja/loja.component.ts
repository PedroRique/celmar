import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { SlugifyPipe } from '../../../shared/pipes/slugify.pipe';
import { CertificatesComponent } from '../certificates/certificates.component';
import { Endereco } from '../lojas.component';

@Component({
  selector: 'app-loja',
  templateUrl: './loja.component.html',
  styleUrls: ['./loja.component.sass'],
})
export class LojaComponent implements OnInit {
  @Input() public endereco!: Endereco;

  public lojaId = '';

  constructor(
    private slugifyPipe: SlugifyPipe,
    private eventEmitterService: EventEmitterService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.lojaId = this.slugifyPipe.transform(
      `${this.endereco.empresa} ${this.endereco.nome}`
    );
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

  public getBg(): string {
    return `url(../../../assets/images/showrooms/${this.lojaId}/1.jpg)`;
  }
}
