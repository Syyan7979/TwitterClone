import { Component, OnInit } from '@angular/core';
import { TweetService } from 'src/app/services/tweet.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-tweet',
  templateUrl: './create-tweet.component.html',
  styleUrls: ['./create-tweet.component.css']
})
export class CreateTweetComponent implements OnInit {

  constructor(private tweetService : TweetService, private userService : UserService) { 
    this.id = userService.getUserId();
  }
  private id : string = '';
  content = ''

  ngOnInit(): void {
  }

  newTweet(tweet :any) {
    let body = tweet.value;
    body.userId = this.id;
    body.replyId = null;
    body.media = null;
    body.likes = 0;
    this.tweetService.newTweet(body).subscribe();
    this.content = '';
  }

}
