import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {

  users : User[] = [];
  user !: User;

  constructor(
    private userService: UserService,
    private route : ActivatedRoute,
    public authService : AuthService
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.getUser()
  }

  getUsers() : void { 
    const id = String(this.route.snapshot.paramMap.get('userId'));
    this.userService.getFollowers(id).subscribe(
      users => this.users = users);
  }

  getUser() : void {
    const id = String(this.route.snapshot.paramMap.get('userId'));
    this.userService.getUser(id).subscribe(
      user => this.user = user);
  }

}
