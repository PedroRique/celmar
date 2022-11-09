import { Component, Input } from '@angular/core';
import { Endereco } from '../lojas.component';

@Component({
  selector: 'app-loja',
  templateUrl: './loja.component.html',
  styleUrls: ['./loja.component.sass'],
})
export class LojaComponent {
  @Input() public endereco!: Endereco;
}
