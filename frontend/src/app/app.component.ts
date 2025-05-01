
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ClientOrdersComponent,} from './components/clients/clients-orders/clients-orders.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ClientOrdersComponent,
    HttpClientModule,
    CommonModule,
    RouterOutlet,
  ],
  template: '<app-client-orders></app-client-orders>'
})
export class AppComponent {
  title:string = "gestion-commandes";
}


