import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SiteService } from 'src/app/services/site.service';
import { Certificate } from 'src/app/shared/models/certificate.model';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.sass'],
})
export class CertificatesComponent implements OnInit {
  public lojaId = '';
  public certificates: Certificate[] | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    private siteService: SiteService
  ) {}

  ngOnInit(): void {
    this.getCertificates();
  }

  async getCertificates() {
    this.certificates = await this.siteService.getCertificates(this.data);
  }
}
