import { Component, ChangeDetectorRef } from '@angular/core';
import { SiteService } from '../../services/site.service';
import { FormBuilder, Validators } from '@angular/forms';

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

  constructor(private service: SiteService, private fb: FormBuilder, private cd: ChangeDetectorRef) { }

  enviarEmail(){    
    this.service.enviarEmail(this.contatoForm.value);
    this.contatoForm.reset();
  }
}
