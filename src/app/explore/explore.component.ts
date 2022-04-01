import { Component, OnInit } from '@angular/core';
import { SiteService } from '../site.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  public explores = [];

  constructor(public service: SiteService, private router: Router) {}

  ngOnInit() {
    this.getExplores();
  }

  async getExplores() {
    this.explores = await this.service.getExplores();
  }

}
