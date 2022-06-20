import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DecoPageRoutingModule } from './deco-routing.module';

import { DecoPage } from './deco.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DecoPageRoutingModule
  ],
  declarations: [DecoPage]
})
export class DecoPageModule {}
