import { Component, ChangeDetectorRef } from '@angular/core';
import { SiteService } from '../site.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent {

  public emailPattern = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";

  public contatoForm = this.fb.group({
    nome: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    telefone: [''],
    bairro: [''],
    mensagem: ['', Validators.required]
  });

  public phoneMask = '(00) 0000-00009';

  constructor(private service: SiteService, private fb: FormBuilder, private cd: ChangeDetectorRef) {

  }

  onFileChange(event) {
    const reader = new FileReader();
 
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
  
      reader.onload = () => {
        this.contatoForm.patchValue({
          file: reader.result
       });
      
        this.cd.markForCheck();
      };
    }
  }

  onPhoneChange(event){
    this.phoneMask = this.contatoForm.get('telefone').value.length == 11 ? '(00) 00000-0000' : '(00) 0000-00009';
  }

  enviarEmail(event){    
    this.service.enviarEmail(this.contatoForm.value);
    this.contatoForm.reset();
  }

  //Neste caso você precisa pegar com sua certificadora a chave CSR do certificado e abrir um chamado na sua central do cliente com essa chave para fazermos a instalação do seu SSL no nosso servidor
}
