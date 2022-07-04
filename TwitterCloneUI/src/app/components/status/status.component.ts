import { Component, OnInit } from '@angular/core';
import { Tweet, NewTweet } from 'src/app/interfaces/tweet';
import { UserService } from 'src/app/services/user.service'; 
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { TweetService } from 'src/app/services/tweet.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  tweet !: Tweet;
  tweets : Tweet[] = []
  user !: User;
  content : string = '';
  constructor( private userService: UserService, private router : Router, private route : ActivatedRoute, private tweetService : TweetService, private authService : AuthService) { }

  ngOnInit(): void {
    this.getTweet();
    this.getUser();
    this.getTweets();
  }

  getTweet() : void {
    const id = String(this.route.snapshot.paramMap.get('tweetId'));
    console.log(id)
    this.tweetService.getTweet(id).subscribe(
      res => this.tweet = res
    )
  }

  getUser() : void {
    const id = String(this.route.snapshot.paramMap.get('userId'));
    console.log(id)
    this.userService.getUser(id).subscribe(value => this.user = value  );
  }

  getTweets() : void {
    const id = String(this.route.snapshot.paramMap.get('tweetId'));
    this.tweetService.getTweetReplies(id).subscribe(value => this.tweets = value);
  }

  correctUserID() : string {
    return (this.tweet.userID !== undefined ? this.tweet.userID : this.tweet.userId)
  }

  correctTweetID() : string { 
    return (this.tweet.tweetID !== undefined ? this.tweet.tweetID : this.tweet.tweetId)
  }

  correctReplyID() : string {
    return (this.tweet.replyID !== undefined ? this.tweet.replyID : this.tweet.replyId)
  }

  correctTimeStamp() : number {
    return (this.tweet.timeStamp !== undefined ? this.tweet.timeStamp : this.tweet.timestamp)
  }

  replyTweet() : void {
    let body : NewTweet = {
      userId : this.authService.parsedToken(),
      replyId : String(this.route.snapshot.paramMap.get('tweetId')),
      content : this.content,
      media : null,
      likes : 0
    }
    this.tweetService.newTweet(body).subscribe();
    this.content = '';
    window.location.reload();
  }

  userClicked() : void {
    this.router.navigate(['/user/', this.authService.parsedToken()], { relativeTo: this.route.parent});
  }

}
