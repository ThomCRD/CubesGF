import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-resto',
  templateUrl: './resto.page.html',
  styleUrls: ['./resto.page.scss'],
})
export class RestoPage implements OnInit {

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
