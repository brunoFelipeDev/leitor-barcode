import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { LeitorComponent } from './leitor/leitor.component';
import { routing } from './app-routing.module';
import { AlertModule } from 'ngx-bootstrap/alert';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { AutenticacaoComponent } from './componentes/autenticacao/autenticacao.component';
import {NgxMaskModule} from 'ngx-mask'

@NgModule({
  declarations: [
    AppComponent,
    LeitorComponent,
    NavbarComponent,
    AutenticacaoComponent
  ],
  imports: [
    BrowserModule,
    routing,
    ZXingScannerModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    CollapseModule.forRoot(),
    AlertModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
