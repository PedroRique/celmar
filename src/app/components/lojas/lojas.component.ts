import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../services/site.service';

export interface Endereco {
  empresa: string;
  nome: string;
  endereco: string;
  telefone: string;
  email: string;
  link: string;
  mapa: string;
}

@Component({
  selector: 'app-lojas',
  templateUrl: './lojas.component.html',
  styleUrls: ['./lojas.component.sass'],
})
export class LojasComponent implements OnInit {
  public enderecos: Endereco[] = [];

  constructor(private service: SiteService) {}

  ngOnInit() {
    this.getLojas();
  }

  async getLojas() {
    this.enderecos = await this.service.getLojas();
  }
}
