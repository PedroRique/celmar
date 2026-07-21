import { Component, OnInit, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EventEmitterService } from '../../services/event-emitter.service';
import { SiteService } from '../../services/site.service';

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
    telefone: ['', Validators.required],
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
    if (!this.form.valid || this.submitting) {
      return;
    }

    this.submitting = true;
    const { nome, sobrenome, email, telefone } = this.form.value;

    this.siteService
      .enviarWhatsappLead({ nome, sobrenome, email, telefone })
      .then(() => {
        const fullName = `${nome} ${sobrenome}`.trim();
        const message = encodeURIComponent(`Olá, meu nome é ${fullName}`);
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');

        this.form.reset();
        this.showModal = false;
      })
      .catch(() => alert('Ocorreu um erro, tente novamente mais tarde.'))
      .finally(() => {
        this.submitting = false;
      });
  }
}
