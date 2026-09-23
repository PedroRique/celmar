import { Component } from '@angular/core';
import { WHATSAPP_URL } from '../core/whatsapp';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  readonly whatsappUrl = WHATSAPP_URL;
}
