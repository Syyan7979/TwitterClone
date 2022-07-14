import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users : User[] = [];
  threeUsers : User[] = [];
  constructor(private userService : UserService, private authService : AuthService) {}

  ngOnInit(): void {
    //this.getUsers();
  }
  /*
  getUsers() : void { 
    
    this.userService.getUserRecommendations(this.authService.parsedToken()).subscribe(
      users => {
        this.users = users;
        this.threeUsers = this.usersKnuthShuffle(users).slice(0, 3);
    });
  }

  usersKnuthShuffle(users : User[]) : User[] {
    let m = users.length, t, i;

    while (m) {
      i = Math.floor(Math.random() * m--) ;
      t = users[m];
      users[m] = users[i];
      users[i] = t;
    }

    return users;
  }*/

}
