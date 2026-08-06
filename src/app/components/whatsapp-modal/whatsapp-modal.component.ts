import { Component, OnInit, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EventEmitterService } from '../../services/event-emitter.service';
import { SiteService } from '../../services/site.service';
import { phoneValidator } from '../../shared/validators/phone.validator';

const WHATSAPP_NUMBER = '5521964746100';

@Component({
  selector: 'app-whatsapp-modal',
  templateUrl: './whatsapp-modal.component.html',
  styleUrls: ['./whatsapp-modal.component.sass'],
})
export class WhatsappModalComponent implements OnInit, OnDestroy {
  showModal = false;
  submitting = false;

  public form = this.fb.group({
    nome: ['', Validators.required],
    sobrenome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    telefone: ['', [Validators.required, phoneValidator()]],
  });

  private subs?: Subscription;

  constructor(
    private fb: UntypedFormBuilder,
    private eventEmitterService: EventEmitterService,
    private siteService: SiteService
  ) {}

  ngOnInit() {
    this.subs = this.eventEmitterService.invokeWhatsappModal.subscribe(() => {
      this.showModal = true;
    });
  }

  ngOnDestroy() {
    this.subs?.unsubscribe();
  }

  onClose() {
    if (this.submitting) {
      return;
    }
    this.showModal = false;
  }

  onSubmit() {
    if (this.form.invalid || this.submitting) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;
    const { nome, sobrenome, email, telefone } = this.form.value;
    const fullName = `${nome} ${sobrenome}`.trim();
    const message = encodeURIComponent(`Olá, meu nome é ${fullName}. Quero saber mais sobre seus móveis personalizados.`);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

    window.open(whatsappUrl, '_blank');

    this.siteService
      .enviarWhatsappLead({ nome, sobrenome, email, telefone })
      .then(() => {
        this.form.reset();
        this.showModal = false;
      })
      .catch(() =>
        alert(
          'Seus dados não puderam ser salvos, mas você pode continuar no WhatsApp.'
        )
      )
      .finally(() => {
        this.submitting = false;
      });
  }
}
