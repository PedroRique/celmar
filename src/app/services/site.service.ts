import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  constructor(private db: AngularFireDatabase) { }

  private decorados = [
    {
      nome: 'Vivaz Magarça',
      id: 'vivaz-magarca',
      company: 'Cyrela',
      qtd: 24
    },
    {
      nome: 'Vivaz Marechal Rondon',
      id: 'vivaz-marechal-rondon',
      company: 'Cyrela',
      qtd: 21
    },
    {
      nome: 'Vivaz Del Castilho',
      id: 'vivaz-del-castilho',
      company: 'Cyrela',
      qtd: 13
    },
    {
      nome: 'Campo dos Afonsos',
      id: 'campo-dos-afonsos',
      company: 'Tegra',
      qtd: 8
    },
    {
      nome: 'Refinatto',
      id: 'refinatto',
      company: 'Calçada',
      qtd: 18
    },
    {
      nome: 'Aquarela Carioca',
      id: 'aquarela-carioca',
      company: 'Calçada',
      qtd: 13
    },
    {
      nome: 'Aquarela Carioca (Stand)',
      id: 'aquarela-carioca-stand',
      company: 'Calçada',
      qtd: 19
    },
    {
      nome: 'Vida América',
      id: 'vidamerica',
      company: 'Rjz Cyrela / Living',
      qtd: 12
    },
    {
      nome: 'Choice',
      id: 'choice',
      company: 'Rjz Cyrela / Living',
      qtd: 17
    },
    {
      nome: 'Viva Penha',
      id: 'viva-penha',
      company: 'Calçada',
      qtd: 18
    },
    {
      nome: 'Vogue',
      id: 'vogue',
      company: 'Calçada',
      qtd: 9
    },
    {
      nome: 'Vogue Square',
      id: 'vogue-square',
      company: 'Calçada',
      qtd: 9
    },
    {
      nome: 'Stadio 2Q',
      id: 'stadio-2q',
      company: 'Calçada',
      qtd: 14
    },
    {
      nome: 'Stadio 3Q',
      id: 'stadio-3q',
      company: 'Calçada',
      qtd: 23
    },
    {
      nome: 'Neo Life',
      id: 'neo-life',
      company: 'Rjz Cyrela / Living',
      qtd: 6
    },
    {
      nome: 'Carioca Residencial',
      id: 'carioca',
      company: 'Rjz Cyrela / Living',
      qtd: 75
    },
    {
      nome: 'East Side',
      id: 'east-side',
      company: 'Tegra',
      qtd: 10
    },
    {
      nome: 'Start',
      id: 'start',
      company: 'Rjz Cyrela',
      qtd: 20
    },
    {
      nome: 'Vivaz Ramos',
      id: 'vivaz-ramos',
      company: 'Cyrela',
      qtd: 16
    }
  ];

  private eventos = [
    {
      nome: 'Morar Mais',
      id: 'morar-mais',
      qtd: 45
    }
  ];

  enviarEmail(values: any) {
    this.db.list('contatos').push(values)
      .then(() => alert('Mensagem enviada com sucesso!'))
      .catch(() => alert('Ocorreu um erro, tente novamente mais tarde.'));
  }

  getDecorados() {
    return this.decorados;
  }

  getDecorado(id: any) {
    return this.decorados.filter(d => d.id === id)[0];;
  }

  getEventos() {
    return this.eventos;
  }

  getEvento(id: any) {
    return this.eventos.filter(e => e.id === id)[0];;
  }

  async getExplores() {
    try {
      const snapshot = await this.db.database.ref('explorados').once("value");
      return snapshot.val();
    } catch (error) {
      console.log(error);
    }
  }

  async getLojas() {
    try {
      const snapshot = await this.db.database.ref('lojas').once("value");
      return snapshot.val();
    } catch (error) {
      console.log(error);
    }
  }
}
