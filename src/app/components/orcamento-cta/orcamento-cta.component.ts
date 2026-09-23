import { Component } from '@angular/core';
import { WHATSAPP_URL } from '../../core/whatsapp';

@Component({
  selector: 'app-orcamento-cta',
  templateUrl: './orcamento-cta.component.html',
  styleUrls: ['./orcamento-cta.component.sass'],
})
export class OrcamentoCtaComponent {
  readonly whatsappUrl = WHATSAPP_URL;
}
