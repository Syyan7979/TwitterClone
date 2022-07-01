import { Observable } from 'rxjs';
import { User, RegisterUser, LoginUser } from './../interfaces/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerUrl: string = 'http://localhost:3000/users';
  private loginUrl: string = 'http://localhost:3000/users/login';
  constructor(private http : HttpClient) { }

  registerUser (user : RegisterUser) : Observable<User>{
    return this.http.post<User>(this.registerUrl, user);
  }

  loginUser (user : LoginUser) : Observable<User> {
    return this.http.post<User>(this.loginUrl, user);
  }
}
