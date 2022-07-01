import { AbstractControl, AsyncValidatorFn, FormControl, ValidationErrors } from '@angular/forms';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { Tweet } from '../interfaces/tweet';
import { map, debounceTime } from 'rxjs/operators';

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

