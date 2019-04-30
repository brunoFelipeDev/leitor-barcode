import { Routes, RouterModule } from '@angular/router';
import { LeitorComponent } from './leitor/leitor.component';
import { AutenticacaoComponent } from './componentes/autenticacao/autenticacao.component';

const ROUTES: Routes = [
  { path: 'leitor', component: LeitorComponent },
  { path: 'leitor/:cnpj', component: LeitorComponent },
  { path: 'login', component: AutenticacaoComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },

];

export const routing = RouterModule.forRoot(ROUTES, { useHash: true });
