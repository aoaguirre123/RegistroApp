import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisdatosPage } from './misdatos.page';

const routes: Routes = [
  {
    path: '',
    component: MisdatosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisdatosPageRoutingModule {}
