import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DecoPage } from './deco.page';

const routes: Routes = [
  {
    path: '',
    component: DecoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DecoPageRoutingModule {}
