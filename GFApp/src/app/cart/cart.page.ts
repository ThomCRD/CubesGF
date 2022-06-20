import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  // Constructor for modal controller.
  constructor(
    public modalController: ModalController
  ) { }

  // Dismisses the modal.
  close() {
    this.modalController.dismiss();
  }

  // ngOnInit - ng on init
  ngOnInit() {
  }

}
