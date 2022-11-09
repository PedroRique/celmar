import { Component, Input, OnInit } from '@angular/core';
import { Endereco } from '../lojas.component';
import { SlugifyPipe } from '../../../shared/pipes/slugify.pipe';
import { EventEmitterService } from 'src/app/services/event-emitter.service';

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
    private eventEmitterService: EventEmitterService
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

  public getBg(): string {
    return `url(../../../assets/images/showrooms/${this.lojaId}/1.jpg)`;
  }
}
