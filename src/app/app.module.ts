import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

import { LOCALE_ID } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule
  , IonicModule.forRoot({ innerHTMLTemplatesEnabled: true })
  , AppRoutingModule
  , BrowserAnimationsModule
  , MatNativeDateModule
  , MatInputModule
  , MatButtonModule
  , MatCardModule
  , MatFormFieldModule
  , MatCheckboxModule
  , MatDatepickerModule
  , MatRadioModule
  , MatSelectModule
],
  providers: [
    { 
      provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy 
    },
    {
      provide: LOCALE_ID,
      useValue: 'es-CL'
    },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
