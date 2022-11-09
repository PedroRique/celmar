import { Component, Input } from '@angular/core';
import { Endereco } from '../lojas.component';
import { SlugifyPipe } from '../../../shared/pipes/slugify.pipe';

@Component({
  selector: 'app-loja',
  templateUrl: './loja.component.html',
  styleUrls: ['./loja.component.sass'],
})
export class LojaComponent {
  @Input() public endereco!: Endereco;

  constructor(private slugifyPipe: SlugifyPipe) {}

  public openMap(link: string): void {
    window.open(link);
  }

  public openPhotos(empresa: string, nome: string): void {
    const id = this.slugifyPipe.transform(`${empresa} ${nome}`);
  }
}
