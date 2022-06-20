import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartPage } from '../cart/cart.page';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  searchTerm: string;
  restaurant = [
    {
      place:'Paris',
      name:'Food CO'
    },
    {
      place:'Pau',
      name:'GreenField'
    },
    {
      place:'Toulouse',
      name:'Eat enterprise'
    },
    {
      place:'Lyon',
      name:'Hungry lines'
    },
    {
      place:'Pau',
      name:'Food Plus'
    },
    {
      place:'Nice',
      name:'Healthy Wave'
    },
  ];

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
