import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SwiperModule } from 'swiper/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire/compat';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgImageSliderModule } from 'ng-image-slider';
import { NgxGalleryModule } from 'ngx-gallery-images-video';
import { environment } from '../environments/environment';
import { AgendeComponent } from './components/agende/agende.component';
import { BannerComponent } from './components/banner/banner.component';
import { ContatoComponent } from './components/contato/contato.component';
import { DecoradosComponent } from './components/decorados/decorados.component';
import { DepoimentosComponent } from './components/depoimentos/depoimentos.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { ExploreComponent } from './components/explore/explore.component';
import { FooterComponent } from './components/footer/footer.component';
import { GaleriaComponent } from './components/galeria/galeria.component';
import { HistoriaComponent } from './components/historia/historia.component';
import { CertificatesComponent } from './components/lojas/certificates/certificates.component';
import { LojaComponent } from './components/lojas/loja/loja.component';
import { LojasComponent } from './components/lojas/lojas.component';
import { ModalComponent } from './components/modal/modal.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ShowroomsComponent } from './components/showrooms/showrooms.component';
import { EventEmitterService } from './services/event-emitter.service';
import { SiteService } from './services/site.service';
import { SlugifyPipe } from './shared/pipes/slugify.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BannerComponent,
    NavbarComponent,
    ExploreComponent,
    FooterComponent,
    DecoradosComponent,
    ModalComponent,
    EventosComponent,
    HistoriaComponent,
    GaleriaComponent,
    DepoimentosComponent,
    AgendeComponent,
    LojasComponent,
    LojaComponent,
    CertificatesComponent,
    ContatoComponent,
    ShowroomsComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    SwiperModule,
    NgxGalleryModule,
    BrowserAnimationsModule,
    NgbModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgImageSliderModule,
    MatDialogModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [SiteService, EventEmitterService, SlugifyPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
