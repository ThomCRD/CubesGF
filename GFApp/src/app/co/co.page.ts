import { Component, OnInit } from '@angular/core';
import { Router } from 'express';
import { AuthService } from '../auth.service';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { mongo } from 'mongoose';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-co',
  templateUrl: './co.page.html',
  styleUrls: ['./co.page.scss'],
})



export class CoPage implements OnInit {

  /*ionicForm: FormGroup;*/

  coUserData: any = {};


  constructor(private auth: AuthService, public http: HttpClient, public formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  /*submitForm() {
    console.log(this.ionicForm.value);
  }*/

  coUser(){
    //console.log(this.coUserData);

    /*this.auth.coUser(this.coUserData)*/
    /*this.http.post('http://127.0.0.1:9000/API/login', this.coUserData)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      );*/

      const body = {
        email : this.coUserData.email,
        password : this.coUserData.password
      };
      console.log('post login with '+body.email);

    // this.http.post('http://localhost:9000/API/login',body)
    //   .subscribe(
    //     data => {
    //     console.log('couser data '+data);
    //    }, error => {
    //     console.log('couser err'+error);
    //   });
    return this.http.post('http://localhost:9000/API/login',body)
    .subscribe(
      data => {
      console.log('couser data '+data);
     }, error => {
      console.log('couser err'+error);
    });

  }
}
