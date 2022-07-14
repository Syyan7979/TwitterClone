import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-follow-window',
  templateUrl: './follow-window.component.html',
  styleUrls: ['./follow-window.component.css']
})
export class FollowWindowComponent implements OnInit {

  users : User[] = [];
  threeUsers : User[] = [];
  @Input() windowTitle : string = 'Who to follow'

  constructor(
    private userService : UserService,
    private authService : AuthService,
    private route : ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() : void { 
    const id = String(this.route.snapshot.paramMap.get('userId'));
    this.userService.getUserRecommendations(this.authService.parsedToken()).subscribe(
      users => {
        if(this.authService.parsedToken() !== id) {
          this.users = users.filter((user) => {return user.user_id !== id});
        } else {
          this.users = users;
        }
        this.threeUsers = this.users.slice(0, 3);
    });
  }

  showMoreCicked() : void {
      this.router.navigate([`/connect`], { relativeTo: this.route.root, queryParams: {
        userId: this.authService.parsedToken()
      }})
  }

}
