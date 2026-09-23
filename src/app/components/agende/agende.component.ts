import { Component } from '@angular/core';
import { WHATSAPP_URL } from '../../core/whatsapp';

@Component({
  selector: 'app-agende',
  templateUrl: './agende.component.html',
  styleUrls: ['./agende.component.sass']
})
export class AgendeComponent {
  readonly whatsappUrl = WHATSAPP_URL;
}
