import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from '../../services/event-emitter.service';
import { SiteService } from '../../services/site.service';

export interface Event {
  nome: string;
  id: string;
  qtd: number;
  qtdVideo?: number;
  description?: string;
  empresas?: string[]; // 👈 lista de marcas (celmar, predilecta)
}

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.sass'],
})
export class EventosComponent implements OnInit {
  public events: Event[] = [];

  constructor(
    public service: SiteService,
    private eventEmitterService: EventEmitterService
  ) {}

  ngOnInit() {
    const brand = this.getBrand();
    this.events = this.service
      .getEventos()
      .filter((e) => e.empresas?.includes(brand));
  }

  /** Identifica a marca atual pelo hostname ou query param (?brand=celmar) */
  getBrand(): string {
    const host = window.location.hostname.toLowerCase();

    if (host.includes('celmar')) return 'celmar';
    if (host.includes('predilect')) return 'predilecta';

    // Ambiente local (permite alternar entre as marcas com query param)
    const params = new URLSearchParams(window.location.search);
    return params.get('brand') ?? 'predilecta';
  }

  /** Retorna a imagem de fundo do evento */
  getBg(id: string) {
    return `url(../../assets/images/eventos/${id}/1.jpg)`;
  }

  /** Abre modal de evento */
  abreEvento(id: string) {
    this.eventEmitterService.onOpenGallery(id, 'eventos');
  }
}