import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { Tweet } from '../interfaces/tweet';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl: string = 'http://localhost:3000/users';

  private user : string = "";

  constructor(private http: HttpClient) {};
  
  createUser(user: User): Observable<User> {
    return this.http.post<any>(this.usersUrl + '/create', user)
  }

  getCurrentUser(userName : string, password : string): Observable<User> {
    return this.http.get<any>(this.usersUrl + `?userName=${userName}&password=${password}`);
  }

  setUser(userId : string) : void {
    this.user = userId;
  }

  getUserId() : string {
    return this.user;
  }

  getUserFeed(id : string) : Observable<Tweet[]> {
    return this.http.get<Tweet[]>(this.usersUrl + `/user/${id}/feed`)
  }
}

