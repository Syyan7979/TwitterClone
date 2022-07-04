import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Tweet } from 'src/app/interfaces/tweet';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  tweets : Tweet[] = [];

  constructor(private userService : UserService, private authService : AuthService, private router : Router, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.getTweets();
  }

  getTweets() : void {
    this.userService.getUserFeed(this.authService.parsedToken()).subscribe(value => this.tweets = value);
  }

  onClick(id : string) : void {
    this.router.navigate(['user', id], { relativeTo: this.route.parent});
  }
}
