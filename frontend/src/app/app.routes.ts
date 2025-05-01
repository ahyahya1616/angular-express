import { Routes } from '@angular/router';
import { ClientOrdersComponent} from './components/clients/clients-orders/clients-orders.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: ClientOrdersComponent },
  { path: '**', redirectTo: 'dashboard' }
];
