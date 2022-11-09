import { Component, ChangeDetectorRef } from '@angular/core';
import { SiteService } from '../../services/site.service';
import { UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.sass']
})
export class ContatoComponent {

  public contatoForm = this.fb.group({
    nome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    telefone: [''],
    bairro: [''],
    mensagem: ['', Validators.required]
  });

  constructor(private service: SiteService, private fb: UntypedFormBuilder, private cd: ChangeDetectorRef) { }

  enviarEmail(){    
    this.service.enviarEmail(this.contatoForm.value);
    this.contatoForm.reset();
  }
}
