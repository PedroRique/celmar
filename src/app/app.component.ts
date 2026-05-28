import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <app-cookie-banner></app-cookie-banner>
  `,
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'celmar';
}
