import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from '../../services/event-emitter.service';
import { SiteService } from '../../services/site.service';

export interface Case {
  nome: string;
  id: string;
  qtd: number;
  qtdVideo?: number;
}

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.sass'],
})
export class CasesComponent implements OnInit {
  public cases: Case[] = [];

  constructor(
    public service: SiteService,
    private eventEmitterService: EventEmitterService
  ) {
    this.cases = this.service.getCases();
  }

  ngOnInit() {}

  getBg(id: string) {
    return `url(../../assets/images/cases/${id}/1.jpg)`;
  }

  abreCase(id: string) {
    this.eventEmitterService.onOpenGallery(id, 'cases');
  }
}
