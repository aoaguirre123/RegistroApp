import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { MisdatosPageRoutingModule } from './misdatos-routing.module';

import { MisdatosPage } from './misdatos.page';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RouteReuseStrategy } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisdatosPageRoutingModule,
    MatDatepickerModule
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
  ],
  declarations: [MisdatosPage]
})
export class MisdatosPageModule {}
