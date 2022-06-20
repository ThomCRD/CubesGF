import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MenuPage } from '../menu/menu.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    public modalController: ModalController
  ) {}

  async openMenu() {
    const modal = await this.modalController.create({
      component: MenuPage

    });
    return await modal.present();
  }
}
