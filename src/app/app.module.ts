import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';
import { NgxGalleryModule } from 'ngx-gallery';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DecoradosComponent } from './decorados/decorados.component';
import { HomeComponent } from './home/home.component';
import { HistoriaComponent } from './historia/historia.component';
import { GaleriaComponent } from './galeria/galeria.component';
import { DepoimentosComponent } from './depoimentos/depoimentos.component';
import { AgendeComponent } from './agende/agende.component';
import { FooterComponent } from './footer/footer.component';
import { BannerComponent } from './banner/banner.component';
import { DecoradoComponent } from './decorado/decorado.component';
import { CelmarqComponent } from './celmarq/celmarq.component';
import { MapasComponent } from './mapas/mapas.component';
import { ContatoComponent } from './contato/contato.component';
import { ComunicadoComponent } from './comunicado/comunicado.component';

import { SiteService } from './site.service';

import 'hammerjs';
import { LoaderComponent } from './loader/loader.component';
import { ExploreComponent } from './explore/explore.component';
import { EventosComponent } from './eventos/eventos.component';
import { EventoComponent } from './evento/evento.component';
import { ModalComponent } from './modal/modal.component';
import { EventEmitterService } from './event-emitter.service';
import { firebaseConfig } from 'src/environments/environment';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'decorado/:id', component: DecoradoComponent },
  { path: 'evento/:id', component: EventoComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DecoradosComponent,
    HomeComponent,
    HistoriaComponent,
    GaleriaComponent,
    DepoimentosComponent,
    AgendeComponent,
    FooterComponent,
    BannerComponent,
    DecoradoComponent,
    CelmarqComponent,
    MapasComponent,
    ContatoComponent,
    LoaderComponent,
    ExploreComponent,
    EventosComponent,
    EventoComponent,
    ModalComponent,
    ComunicadoComponent
  ],
  imports: [
    BrowserModule,
    SlickCarouselModule,
    HttpClientModule,
    AngularSvgIconModule,
    NgxGalleryModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled'
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
  ],
  providers: [SiteService, EventEmitterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
