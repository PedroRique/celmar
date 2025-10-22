import { Component, OnInit } from '@angular/core';
import { BrandingService } from 'src/app/core/branding.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
})
export class NavbarComponent implements OnInit {
  public isOpen: Boolean = false;

  constructor(public brandingService: BrandingService) {}

  ngOnInit() {}

  closeMenu() {
    if (window.innerWidth < 768) {
      this.isOpen = false;
    }
  }
}
