import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuPageModule } from './menu/menu.module';
import { AuthService } from './auth.service';
import { RestoPageModule } from './resto/resto.module';
import { CartPageModule } from './cart/cart.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, FormsModule, HttpClientModule, IonicModule.forRoot(), AppRoutingModule,
     CartPageModule, MenuPageModule, RestoPageModule],
providers: [AuthService,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy}],
  bootstrap: [AppComponent],
})
export class AppModule {}
