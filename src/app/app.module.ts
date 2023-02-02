import { DatePipe, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalulartasaService } from './services/credito/calulartasa.service';
import { SimuladorcreditoComponent } from './simuladorcredito/simuladorcredito.component';

@NgModule({
  declarations: [
    AppComponent,
    SimuladorcreditoComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //emp
    FormsModule,  
    ReactiveFormsModule,
  ],
  providers: [
    //emp
    DatePipe,
    DecimalPipe,
    CalulartasaService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
