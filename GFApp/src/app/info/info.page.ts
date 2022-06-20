import { Component, OnInit } from '@angular/core';
import { Router } from 'express';
import { AuthService } from '../auth.service';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { mongo } from 'mongoose';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  subUserData: any = {};

  // Creates a constructor.
  constructor(private auth: AuthService, public http: HttpClient,private alertCtrl: AlertController, public navCtrl: NavController) { }

  // ngOnInit - ng on init
  ngOnInit() {
  }

  // Register a sub - user with the API.
  subUser(){

    const body = {
      firstName : this.subUserData.firstName,
      lastName : this.subUserData.lastName,
      email : this.subUserData.email,
      password : this.subUserData.password,
      phone : this.subUserData.phone
    };
    console.log('post register with ' +body.firstName +body.lastName +body.email +body.password +body.phone);

  return this.http.put('http://localhost:9000/API/register-customer',body)
  .subscribe(
    data => {
    console.log('subuser data '+data);
    this.navCtrl.navigateRoot('/enter');
   }, async error => {
    console.log('subuser err'+error);
    const alert = this.alertCtrl.create({
      header: 'Error',
      subHeader: 'Missing or wrong informations',
    });
    (await alert).present();
  });
 }
}
