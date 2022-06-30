import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService : UserService, private router : Router) {}
  private user : string = '';

  ngOnInit(): void {
  }

  signIn(credentials : any) : void {
    let body = credentials.value
    this.userService.getCurrentUser(body.userName, body.password).subscribe( 
      user => {
        this.user = user.userId;
        this.userService.setUser(this.user);
        this.router.navigate(['home'], {state: {id: this.user}})});
  }
}
