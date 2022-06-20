import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

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
