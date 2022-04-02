import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SwiperModule } from 'swiper/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { BannerComponent } from './components/banner/banner.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ExploreComponent } from './components/explore/explore.component';
import { environment } from '../environments/environment';
import { SiteService } from './services/site.service';
import { AngularFireModule } from '@angular/fire/compat';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from './components/footer/footer.component';
import { EventEmitterService } from './services/event-emitter.service';
import { CommonModule } from '@angular/common';
import { DecoradosComponent } from './components/decorados/decorados.component';
import { ModalComponent } from './components/modal/modal.component';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { EventosComponent } from './components/eventos/eventos.component';
import { HistoriaComponent } from './components/historia/historia.component';
import { GaleriaComponent } from './components/galeria/galeria.component';


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
    GaleriaComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    SwiperModule,
    NgxGalleryModule,
    BrowserAnimationsModule,
    NgbModule,
    MatIconModule,
    MatButtonModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [SiteService, EventEmitterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
