import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { lastValueFrom } from 'rxjs';
import { Decorado } from '../components/decorados/decorados.component';
import { Event } from '../components/eventos/eventos.component';
import { Showroom } from '../components/showrooms/showrooms.component';
import { Certificate } from '../shared/models/certificate.model';

declare var $: any;

@Injectable({
  providedIn: 'root',
})
export class SiteService {
  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage
  ) {}

  private showrooms: Showroom[] = [
    {
      id: 'celmar-copacabana',
      nome: 'Celmar - Copacabana',
      qtd: 19,
    },
    {
      id: 'celmar-engenho-de-dentro',
      nome: 'Celmar - Engenho de Dentro',
      qtd: 16,
    },
    {
      id: 'celmar-recreio',
      nome: 'Celmar - Recreio',
      qtd: 17,
    },
    {
      id: 'celmar-jacarepagua',
      nome: 'Celmar - Jacarepaguá',
      qtd: 31,
    },
    {
      id: 'predilecta-engenho-de-dentro',
      nome: 'Predilecta - Engenho de Dentro',
      qtd: 15,
    },
  ];

  private decorados: Decorado[] = [
    {
      nome: 'Jardim da Barra',
      id: 'jardim-da-barra',
      company: 'Calçada / Montserrat',
      qtd: 20,
    },
    {
      nome: 'Invert Barra 3Q',
      id: 'invert-barra-3q',
      company: 'Gafisa',
      qtd: 63,
    },
    {
      nome: 'Invert Barra 4Q',
      id: 'invert-barra-4q',
      company: 'Gafisa',
      qtd: 66,
    },
    {
      nome: 'East Side 2',
      id: 'east-side-2',
      company: 'Tegra',
      qtd: 37,
    },
    {
      nome: 'Send Cooliving',
      id: 'send',
      company: 'WTorre',
      qtd: 21,
      qtdVideo: 5,
    },
    {
      nome: 'We Sorocaba',
      id: 'we-sorocaba',
      company: 'Gafisa',
      qtd: 1,
      qtdVideo: 1,
    },
    {
      nome: 'Vivaz Magarça',
      id: 'vivaz-magarca',
      company: 'Cyrela',
      qtd: 24,
    },
    {
      nome: 'Vivaz Marechal Rondon',
      id: 'vivaz-marechal-rondon',
      company: 'Cyrela',
      qtd: 21,
    },
    {
      nome: 'Vivaz Del Castilho',
      id: 'vivaz-del-castilho',
      company: 'Cyrela',
      qtd: 13,
    },
    {
      nome: 'Campo dos Afonsos',
      id: 'campo-dos-afonsos',
      company: 'Tegra',
      qtd: 8,
    },
    {
      nome: 'Refinatto',
      id: 'refinatto',
      company: 'Calçada',
      qtd: 18,
    },
    {
      nome: 'Aquarela Carioca',
      id: 'aquarela-carioca',
      company: 'Calçada',
      qtd: 13,
    },
    {
      nome: 'Aquarela Carioca (Stand)',
      id: 'aquarela-carioca-stand',
      company: 'Calçada',
      qtd: 19,
    },
    {
      nome: 'Vida América',
      id: 'vidamerica',
      company: 'Rjz Cyrela / Living',
      qtd: 12,
    },
    {
      nome: 'Choice',
      id: 'choice',
      company: 'Rjz Cyrela / Living',
      qtd: 17,
    },
    {
      nome: 'Viva Penha',
      id: 'viva-penha',
      company: 'Calçada',
      qtd: 18,
    },
    {
      nome: 'Vogue',
      id: 'vogue',
      company: 'Calçada',
      qtd: 9,
    },
    {
      nome: 'Vogue Square',
      id: 'vogue-square',
      company: 'Calçada',
      qtd: 9,
    },
    {
      nome: 'Stadio 2Q',
      id: 'stadio-2q',
      company: 'Calçada',
      qtd: 14,
    },
    {
      nome: 'Stadio 3Q',
      id: 'stadio-3q',
      company: 'Calçada',
      qtd: 23,
    },
    {
      nome: 'Neo Life',
      id: 'neo-life',
      company: 'Rjz Cyrela / Living',
      qtd: 6,
    },
    {
      nome: 'Carioca Residencial',
      id: 'carioca',
      company: 'Rjz Cyrela / Living',
      qtd: 75,
    },
    {
      nome: 'East Side',
      id: 'east-side',
      company: 'Tegra',
      qtd: 10,
    },
    {
      nome: 'Start',
      id: 'start',
      company: 'Rjz Cyrela',
      qtd: 20,
    },
    {
      nome: 'Vivaz Ramos',
      id: 'vivaz-ramos',
      company: 'Cyrela',
      qtd: 16,
    },
  ];

  private eventos: Event[] = [
    {
      nome: 'Morar Mais',
      id: 'morar-mais',
      qtd: 45,
      description: 'Evento 2019',
    },
    {
      nome: 'Flutuante Urca',
      id: 'flutuante-urca',
      qtd: 98,
      description:
        'Almoço Comemorativo do Resultado de 2022, com os arquitetos parceiros.',
    },
  ];

  enviarEmail(values: any) {
    this.db
      .list('contatos')
      .push(values)
      .then(() => alert('Mensagem enviada com sucesso!'))
      .catch(() => alert('Ocorreu um erro, tente novamente mais tarde.'));
  }

  getDecorados(): Decorado[] {
    return this.decorados;
  }

  getDecorado(id: any) {
    return this.decorados.filter((d) => d.id === id)[0];
  }

  getEventos() {
    return this.eventos;
  }

  getEvento(id: any) {
    return this.eventos.filter((e) => e.id === id)[0];
  }

  getShowrooms() {
    return this.showrooms;
  }

  getShowroom(id: any) {
    return this.showrooms.filter((e) => e.id === id)[0];
  }

  async getExplores() {
    try {
      const snapshot = await this.db.database.ref('explorados').once('value');
      return snapshot.val();
    } catch (error) {
      console.log(error);
    }
  }

  async getLojas() {
    try {
      const snapshot = await this.db.database.ref('lojas').once('value');
      return snapshot.val();
    } catch (error) {
      console.log(error);
    }
  }

  async getCertificates(lojaId: string) {
    let certificatesUrls: Certificate[] = [];

    try {
      let storageRef = this.storage.ref(`certificates/${lojaId}`);
      const res = await lastValueFrom(storageRef.listAll());
      for (let index = 0; index < res.items.length; index++) {
        const ref = res.items[index];
        const name = ref.name;
        const url = await ref.getDownloadURL();
        certificatesUrls.push({
          name,
          url,
        });
      }
    } catch (error) {
      console.error(error);
    }

    return certificatesUrls;
  }
}
