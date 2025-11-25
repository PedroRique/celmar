import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../services/site.service';
import { BrandingService } from '../../core/branding.service';

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

  constructor(
    private service: SiteService,
    private branding: BrandingService
  ) {}

  ngOnInit() {
    this.getLojas();
  }

  async getLojas() {
    // Busca todas as lojas do Firebase
    const todasLojas: Endereco[] = await this.service.getLojas();

    // Filtra apenas as lojas da marca atual
    const empresaAtual = this.branding.branding.appTitle.toLowerCase(); 
    this.enderecos = todasLojas.filter(loja => loja.empresa.toLowerCase() === empresaAtual);
  }
}