import { Component, ChangeDetectorRef } from '@angular/core';
import { SiteService } from '../../services/site.service';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { phoneValidator } from '../../shared/validators/phone.validator';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.sass']
})
export class ContatoComponent {
  submitting = false;

  public contatoForm = this.fb.group({
    nome: ['', Validators.required],
    sobrenome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    telefone: ['', [Validators.required, phoneValidator()]],
    bairro: ['', Validators.required],
    mensagem: ['', Validators.required],
  });

  constructor(private service: SiteService, private fb: UntypedFormBuilder, private cd: ChangeDetectorRef) { }

  enviarEmail() {
    if (this.contatoForm.invalid || this.submitting) {
      this.contatoForm.markAllAsTouched();
      return;
    }

    this.submitting = true;

    this.service
      .enviarEmail(this.contatoForm.value)
      .then(() => {
        this.contatoForm.reset();
      })
      .finally(() => {
        this.submitting = false;
      });
  }
}
