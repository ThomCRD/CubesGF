import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  coUser(user){
    return this.http.post<any>('/API/login', user);
    //todo ici call function / route;
    //return this.app.post('/API/login', user);
  }
}
