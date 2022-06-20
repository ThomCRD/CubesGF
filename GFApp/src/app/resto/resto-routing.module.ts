import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestoPage } from './resto.page';

const routes: Routes = [
  {
    path: '',
    component: RestoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestoPageRoutingModule {}
