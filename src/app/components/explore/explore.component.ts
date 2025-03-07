import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../services/site.service';
import { Router } from '@angular/router';

export interface Explore {
  link: string;
  nome: string;
  texto: string;
  endereco?: string;
}

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.sass'],
})
export class ExploreComponent implements OnInit {
  public explores: Explore[] = [];

  public showNumber = 3;

  constructor(public service: SiteService, private router: Router) {}

  ngOnInit() {
    this.getExplores();
  }

  async getExplores() {
    this.explores = await this.service.getExplores();
  }

  public toggleShowNumber() {
    this.showNumber = this.showNumber === 3 ? this.explores.length : 3;
  }
}
