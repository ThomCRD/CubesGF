import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MenuPage } from '../menu/menu.page';
import { CartPage } from '../cart/cart.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  // Constructor for modal controller.
  constructor(
    public modalController: ModalController
  ) {}

  // Opens the menu page.
  async openMenu() {
    const modal = await this.modalController.create({
      component: MenuPage

    });
    return await modal.present();
  }

  // Opens a cart page.
  async openCart() {
    const modal = await this.modalController.create({
      component: CartPage

    });
    return await modal.present();
  }
}
