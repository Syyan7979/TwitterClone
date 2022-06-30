import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Tweet } from 'src/app/interfaces/tweet';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  private userId : string = '';
  returnValue : any;
  tweets : Tweet[] = [];

  constructor(private userService : UserService) { 
    this.userId = this.userService.getUserId();
  }

  ngOnInit(): void {
    this.getTweets();
  }

  getTweets() : void {
    this.userService.getUserFeed(this.userId).subscribe(value => {
      this.returnValue = value;
      this.tweets = this.returnValue.Data;
      console.log(this.tweets[0])
    });
  }
}
