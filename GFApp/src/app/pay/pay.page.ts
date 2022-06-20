import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartPage } from '../cart/cart.page';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.page.html',
  styleUrls: ['./pay.page.scss'],
})
export class PayPage implements OnInit {

  // Constructor for modal controller.
  constructor(
    public modalController: ModalController
  ) { }

  // Dismisses the modal.
  close() {
    this.modalController.dismiss();
  }

  // Opens a cart page.
  async openCart() {
    const modal = await this.modalController.create({
      component: CartPage

    });
    return await modal.present();
  }

  // ngOnInit - ng on init
  ngOnInit() {
  }

}
