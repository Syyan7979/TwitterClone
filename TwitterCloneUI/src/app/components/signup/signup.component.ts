import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private userService: UserService) {}

  createAccount(login : any): void {
    let body = login.value;
    body['twitterHandle'] = '@'+body.userName;
    this.userService.createUser(body).subscribe(user => console.log(user));
  }
}