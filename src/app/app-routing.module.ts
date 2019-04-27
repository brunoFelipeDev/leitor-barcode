import { Routes, RouterModule } from '@angular/router';
import { LeitorComponent } from './leitor/leitor.component';

const ROUTES: Routes = [
  { path: 'leitor', component: LeitorComponent },
  { path: '', redirectTo: 'leitor', pathMatch: 'full' },
  { path: '/', redirectTo: 'leitor', pathMatch: 'full' }

];

export const routing = RouterModule.forRoot(ROUTES, { useHash: true });
