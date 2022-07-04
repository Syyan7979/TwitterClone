import { Component } from '@angular/core';
import { FormControl, Validators, ValidationErrors } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterUser } from 'src/app/interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  
  constructor(
    private userService: UserService, 
    private authService : AuthService, 
    private router : Router
  ) {}

  public userName = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)] ,this.userService.userAsyncValidator());
  public email = new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")], this.userService.userAsyncValidator());
  public password = new FormControl('', [Validators.required, Validators.pattern("^(?=.*[A-Z].)(?=.*[-_!@#$&*])(?=.*[0-9].)(?=.*[a-z].).{8,}$")]);
  public rePassword = new FormControl('', Validators.required);


  createAccount(): void {
    let registerUSer : RegisterUser = {
      userName : this.userName.value,
      twitterHandle : this.userName.value,
      email : this.email.value,
      password : this.password.value,
      profileImage : "https://i.pinimg.com/originals/e5/91/dc/e591dc82326cc4c86578e3eeecced792.png",
      headerImage : "https://jannaschreier.files.wordpress.com/2012/03/website-header-blue-grey-background.jpg"
    }
    this.authService.registerUser(registerUSer).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/home']);
      }
    );
  }

  errorCheck (input : string) : boolean | undefined {
    let controlErrors: ValidationErrors | null = null;
    if (input === "username") {
      controlErrors = this.userName.errors
    } else if (input === "email") {
      controlErrors = this.email.errors;;
    }
    if (controlErrors != null){
      return controlErrors['userExists'] || controlErrors['minlength'] != null || controlErrors['pattern'] != null;
    } else {
      return undefined;
    }
  }

  user_exists (input : string) : boolean | undefined {
    let controlErrors: ValidationErrors | null = null;
    if (input === "username") {
      controlErrors = this.userName.errors
    } else if (input === "email") {
      controlErrors = this.email.errors;;
    }

    if (controlErrors != null){
      return controlErrors['userExists'];
    } else {
      return undefined;
    }
  }

  too_short () : boolean | undefined {
    const controlErrors: ValidationErrors | null = this.userName.errors;
    if (controlErrors != null){
      return controlErrors['minlength'] != null;
    } else {
      return undefined;
    }
  }

  invalid_input(input : string) : boolean | undefined {
    let controlErrors: ValidationErrors | null = null;
    if (input === "password") {
      controlErrors = this.password.errors
    } else if (input === "email") {
      controlErrors = this.email.errors;;
    }
    if (controlErrors != null){
      return controlErrors['pattern'] != null;
    } else {
      return undefined;
    }
  }

  password_consistency() : boolean {
    return this.password.value === this.rePassword.value;
  }
}