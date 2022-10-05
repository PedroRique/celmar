import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../services/site.service';

export interface Endereco {
  email: string;
  endereco: string;
  filial: string;
  link: string;
  telefone: string;
}

@Component({
  selector: 'app-mapas',
  templateUrl: './mapas.component.html',
  styleUrls: ['./mapas.component.sass'],
})
export class MapasComponent implements OnInit {
  public enderecos: Endereco[] = [];

  constructor(private service: SiteService) {}

  ngOnInit() {
    this.getLojas();
  }

  async getLojas() {
    this.enderecos = await this.service.getLojas();
  }
}
