import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TweetService } from 'src/app/services/tweet.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import { NewTweet } from 'src/app/interfaces/tweet';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-create-tweet',
  templateUrl: './create-tweet.component.html',
  styleUrls: ['./create-tweet.component.css']
})
export class CreateTweetComponent implements OnInit {

  constructor(private tweetService : TweetService, private userService : UserService, private authService : AuthService, private router : Router, private route : ActivatedRoute) { }
  user !: User;
  content = ''
  newTweets = 0;

  ngOnInit(): void {
    this.getUser();
    this.newTweets = 0;
  }

  newTweet() {
    let body : NewTweet = {
      userId : this.authService.parsedToken(),
      replyId : null,
      content : this.content,
      media : null,
      likes : 0
    }
    this.tweetService.newTweet(body).subscribe();
    this.content = '';
    this.newTweets += 1
  }

  getUser() : void {
    this.userService.getUser(this.authService.parsedToken()).subscribe(res => this.user = res);
  }

  userClicked() : void {
    this.router.navigate(['/user/', this.authService.parsedToken()], { relativeTo: this.route.parent});
  }

  onClickShowTweets() : void {
    this.newTweets = 0;
    window.location.reload();
  }

}
