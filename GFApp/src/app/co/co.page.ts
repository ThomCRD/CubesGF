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
  selector: 'app-co',
  templateUrl: './co.page.html',
  styleUrls: ['./co.page.scss'],
})



export class CoPage implements OnInit {

  coUserData: any = {};
  subUserData: any = {};

  // Creates a constructor
  constructor(private auth: AuthService,private alertCtrl: AlertController , public http: HttpClient,
    public formBuilder: FormBuilder, public navCtrl: NavController) { }

    // ngOnInit - ng on init
  ngOnInit() {
  }

  // Login with the co - user
  coUser(){

      const body = {
        email : this.coUserData.email,
        password : this.coUserData.password
      };
      console.log('post login with '+body.email);

    return this.http.post('http://localhost:9000/API/login-customer',body)
    .subscribe(
      data => {
      console.log('couser data '+data);
      this.navCtrl.navigateRoot('/enter');
     }, async error => {
      console.log('couser err'+error);
      const alert = this.alertCtrl.create({
        header: 'Error',
        subHeader: 'Missing or wrong Email or Password',
      });
      (await alert).present();
    });

  }

}
