import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule, Title, Meta } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SwiperModule } from 'swiper/angular';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgImageSliderModule } from 'ng-image-slider';
import { NgxGalleryModule } from 'ngx-gallery-images-video';

// Components
import { HomeComponent } from './home/home.component';
import { BannerComponent } from './components/banner/banner.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EntrevistaComponent } from './components/entrevista/entrevista.component';
import { ExploreComponent } from './components/explore/explore.component';
import { FooterComponent } from './components/footer/footer.component';
import { DecoradosComponent } from './components/decorados/decorados.component';
import { ModalComponent } from './components/modal/modal.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { CasesComponent } from './components/cases/cases.component';
import { HistoriaComponent } from './components/historia/historia.component';
import { GaleriaComponent } from './components/galeria/galeria.component';
import { DepoimentosComponent } from './components/depoimentos/depoimentos.component';
import { AgendeComponent } from './components/agende/agende.component';
import { LojasComponent } from './components/lojas/lojas.component';
import { LojaComponent } from './components/lojas/loja/loja.component';
import { CertificatesComponent } from './components/lojas/certificates/certificates.component';
import { ContatoComponent } from './components/contato/contato.component';
import { ShowroomsComponent } from './components/showrooms/showrooms.component';

// Pipes & Services
import { SafeUrlPipe } from './shared/safe-url.pipe';
import { SlugifyPipe } from './shared/pipes/slugify.pipe';
import { EventEmitterService } from './services/event-emitter.service';
import { SiteService } from './services/site.service';

// Branding
import { BrandingService } from './core/branding.service';

// APP_INITIALIZER to load branding
export function initBranding(brandingService: BrandingService) {
  return () => brandingService.load();
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BannerComponent,
    NavbarComponent,
    EntrevistaComponent,
    ExploreComponent,
    FooterComponent,
    DecoradosComponent,
    ModalComponent,
    EventosComponent,
    CasesComponent,
    HistoriaComponent,
    GaleriaComponent,
    DepoimentosComponent,
    AgendeComponent,
    LojasComponent,
    LojaComponent,
    CertificatesComponent,
    ContatoComponent,
    ShowroomsComponent,
    SafeUrlPipe
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,

    // UI libs
    BrowserAnimationsModule,
    SwiperModule,
    NgbModule,

    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatIconModule,

    NgImageSliderModule,
    NgxGalleryModule,

    // Firebase
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [
    SiteService,
    EventEmitterService,
    SlugifyPipe,
    Title,
    Meta,
    BrandingService,
    {
      provide: APP_INITIALIZER,
      useFactory: initBranding,
      deps: [BrandingService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}