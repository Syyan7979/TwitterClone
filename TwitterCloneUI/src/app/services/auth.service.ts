import { Observable } from 'rxjs';
import { User, RegisterUser, LoginUser } from './../interfaces/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode' 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerUrl: string = 'http://localhost:3000/users';
  private loginUrl: string = 'http://localhost:3000/users/login';
  constructor(private http : HttpClient, private router : Router) { }

  registerUser (user : RegisterUser) : Observable<any>{
    return this.http.post<any>(this.registerUrl, user);
  }

  loginUser (user : LoginUser) : Observable<any> {
    return this.http.post<any>(this.loginUrl, user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  parsedToken() : string | undefined {
    let token = this.getToken();
    if (token != null) {
      let parsedToken : {subject : string, iat : number} = jwt_decode(token);
      return parsedToken.subject;
    } else {
      return undefined;
    }
  }
}
