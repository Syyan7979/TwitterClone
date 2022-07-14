import { Component, OnInit } from '@angular/core';
import { Tweet } from 'src/app/interfaces/tweet';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  tweets : Tweet[] = [];

  constructor(private tweetService : TweetService, private authService : AuthService, private router : Router, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.getTweets();
  }

  getTweets() : void {
    this.tweetService.getUserFeed(this.authService.parsedToken()).subscribe(value => this.tweets = value);
  }

  onClick(id : string) : void {
    this.router.navigate(['user', id], { relativeTo: this.route.parent});
  }
}
