import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartPage } from '../cart/cart.page';

@Component({
  selector: 'app-food',
  templateUrl: './food.page.html',
  styleUrls: ['./food.page.scss'],
})
export class FoodPage implements OnInit {

  // Constructor for modal controller.
  constructor(
    public modalController: ModalController
  ) {}

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
