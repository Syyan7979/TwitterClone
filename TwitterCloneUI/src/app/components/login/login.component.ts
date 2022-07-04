import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoginUser } from 'src/app/interfaces/user';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService : UserService, private router : Router, private authService : AuthService) {}
  private user : string = '';

  public userName_email = new FormControl('');
  public password = new FormControl('');

  ngOnInit(): void {
  }

  signIn() : void { 
    let loginUser : LoginUser = {
      userName : null,
      email : null,
      password : this.password.value,
    }
    let pattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$"
    if (this,this.userName_email.value?.match(pattern) == null) {
      loginUser.userName = this.userName_email.value;
    } else {
      loginUser.email = this.userName_email.value;
    }
    this.authService.loginUser(loginUser).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/home']);
      }
    )
  }
}
