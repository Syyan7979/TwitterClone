import { AbstractControl, AsyncValidatorFn, FormControl, ValidationErrors } from '@angular/forms';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { Tweet } from '../interfaces/tweet';
import { map, debounceTime } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl: string = 'http://localhost:3000/users';

  constructor(private http: HttpClient, private authService : AuthService) {};

  getUserFeed(id : string | undefined) : Observable<Tweet[]> {
    return this.http.get<Tweet[]>(this.usersUrl + `/${id}/feed`);
  }

  getUserTweets(id : string | undefined) : Observable<Tweet[]> {
    return this.http.get<Tweet[]>(this.usersUrl + `/${id}/tweets`);
  }

  getUser(id : string | undefined) : Observable<User> {
    return this.http.get<User>(this.usersUrl + `/${id}`);
  }

  getUsers() : Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl + '/all');
  }

  getUserRecommendations(id : string | undefined) : Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl + `?userId=${id}`);
  }

  getFollowers(id : string | undefined) : Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl + `/${id}/followers`);
  }

  getFollowings(id : string | undefined) : Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl + `/${id}/followings`);
  }

  userAsyncValidator() : AsyncValidatorFn {
    return (control : AbstractControl) : Observable<ValidationErrors | null> => {
      if (String(control.value).length === 0) {
        return of(null)
      } else {
        let pattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$"
        let url = ""
        if (control.value.match(pattern) == null) {
          url = this.usersUrl + `?userName=${control.value}`
        } else {
          url = this.usersUrl + `?email=${control.value}`
        }

        return this.http.get<User[]>(url).pipe(
          debounceTime(500),
          map((response) => (response.length > 0 ? {userExists : true} : null))
        )
      }
    }
      
  }

}

