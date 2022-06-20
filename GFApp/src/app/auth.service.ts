import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // Connect a new user.
  coUser(user){
    return this.http.post<any>('/API/login', user);
    //todo ici call function / route;
    //return this.app.post('/API/login', user);
  }

  // Register a sub - user
  subUser(user){
    return this.http.post<any>('/API/register', user);
  }
}
