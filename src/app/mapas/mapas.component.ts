import { Component, OnInit } from '@angular/core';
import { SiteService } from '../site.service';

@Component({
  selector: 'app-mapas',
  templateUrl: './mapas.component.html',
  styleUrls: ['./mapas.component.css']
})
export class MapasComponent implements OnInit {

  public enderecos = [];

  constructor(private service: SiteService) { }

  ngOnInit() {
    this.getExplores();
  }

  async getExplores() {
    this.enderecos = await this.service.getLojas();
  }
}
