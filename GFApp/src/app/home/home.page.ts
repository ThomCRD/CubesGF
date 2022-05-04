import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FoodPage } from '../food/food.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    public modalController: ModalController
  ) {}

  async openFood() {
    const modal = await this.modalController.create({
      component: FoodPage
    });
    return await modal.present();
  }
}
