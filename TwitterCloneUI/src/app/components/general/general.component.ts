import { User } from 'src/app/interfaces/user';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {
  user ?: User;
  constructor(
    private authService : AuthService,
    private userService : UserService, 
    private router : Router,
    private route : ActivatedRoute
  ) { }

  homeImg : string = "https://img.icons8.com/ios/100/000000/dog-house.png"
  profileImg : string = "https://img.icons8.com/material-outlined/96/000000/person-male.png"

  ngOnInit(): void {
    this.getUser();
    if (this.router.url === "/home") {
      this.homeImg = "https://img.icons8.com/ios-filled/100/000000/dog-house.png"
    }

    if (this.router.url === `/user/${this.authService.parsedToken()}`) {
      this.profileImg = "https://img.icons8.com/material-rounded/96/000000/person-male.png"
    }
  }

  getUser() : void {
    this.userService.getUser(this.authService.parsedToken()).subscribe(
      res => this.user = res
    );
  }

  homeClicked() : void {
    this.router.navigate(['home'], {relativeTo: this.route.root});
  }

  profileClicked() : void {
    this.router.navigate(['user', this.authService.parsedToken()], { relativeTo: this.route.root});
  }
}