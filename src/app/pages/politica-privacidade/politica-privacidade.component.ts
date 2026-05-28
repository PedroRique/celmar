import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BrandingService } from '../../core/branding.service';

@Component({
  selector: 'app-politica-privacidade',
  templateUrl: './politica-privacidade.component.html',
  styleUrls: ['./politica-privacidade.component.sass'],
})
export class PoliticaPrivacidadeComponent implements OnInit {
  constructor(
    public branding: BrandingService,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle(
      `${this.branding.branding.appTitle} — Política de Privacidade`
    );
  }
}
