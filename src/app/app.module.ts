import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { LeitorComponent } from './leitor/leitor.component';
import { routing } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    LeitorComponent
  ],
  imports: [
    BrowserModule,
    routing,
    ZXingScannerModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
