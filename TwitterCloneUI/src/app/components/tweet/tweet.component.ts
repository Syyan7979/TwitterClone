import { Component, OnInit, Input } from '@angular/core';
import { Tweet } from 'src/app/interfaces/tweet';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {

  @Input() tweet!: Tweet;
  user !: User;
  constructor( private userService: UserService, private router : Router, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.initUser();
  }

  initUser() : void {
    this.userService.getUser(this.correctUserID()).subscribe(user => this.user = user);
  }

  userClicked() : void {
    this.router.navigate(['/user/', this.correctUserID()], { relativeTo: this.route.parent});
  }

  tweetClicked() : void {
    this.router.navigate([`/user/${this.correctUserID()}/status/${this.tweet.tweetId}`], { relativeTo: this.route.root})
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
}
