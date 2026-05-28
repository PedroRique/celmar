import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PoliticaPrivacidadeComponent } from './pages/politica-privacidade/politica-privacidade.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'politica-de-privacidade', component: PoliticaPrivacidadeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
