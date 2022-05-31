import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(
    public modalController: ModalController
  ) { }

  close() {
    this.modalController.dismiss();
  }

  ngOnInit() {
  }

}
