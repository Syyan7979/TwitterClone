import { FollowCheck } from 'src/app/interfaces/follow';
import { Component, OnInit } from '@angular/core';
import { Tweet, NewTweet } from 'src/app/interfaces/tweet';
import { UserService } from 'src/app/services/user.service'; 
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { TweetService } from 'src/app/services/tweet.service';
import { AuthService } from 'src/app/services/auth.service';
import { FollowingService } from 'src/app/services/following.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  tweet !: Tweet;
  quotedTweet?: Tweet;

  tweets : Tweet[] = []

  user !: User;

  mainUser !: User;
  content : string = '';
  replyContent : string = '';

  followRecoClickable : boolean = true;
  followMessage : string = 'Follow';

  following : boolean = false;
  followHover : boolean = false;
  
  likedImgUrl : string = "https://img.icons8.com/ios/100/536471/hearts--v1.png"
  retweetImgUrl : string ="https://img.icons8.com/material-rounded/96/536471/retweet.png"

  tweetClickAvailable : boolean = false;

  liked : boolean = false;
  retweetClicked : boolean = false;
  retweeted : boolean = false;

  likeCount : number = 0;
  retweetCount : number = 0;

  tweetMedias : string[] = [];
  quotedTweetMedias : string[] = [];

  imgWidth : string = 'auto';
  imgHeight : string = 'auto';

  constructor( 
    private userService: UserService, 
    private router : Router, 
    private route : ActivatedRoute, 
    private tweetService : TweetService, 
    public authService : AuthService,
    private followingService : FollowingService
    ) { 
      this.router.routeReuseStrategy.shouldReuseRoute = function() {
        return false;
      };
    }

  ngOnInit(): void {
    this.getTweet();
    this.getUser();
    this.getTweets();
    this.getMainUser();
    this.checkIfFollowing();
  }

  getTweet() : void {
    const id = String(this.route.snapshot.paramMap.get('tweetId'));
    console.log(id)
    this.tweetService.getTweet(id).subscribe(
      res => {this.tweet = res; 
        this.initLiked();
        this.initRetweet();
        this.getQuotedTweet();
        if (this.tweet.media) {
          this.tweetMedias = JSON.parse(this.tweet.media);
        }
    
        switch (this.tweetMedias.length) {
          case 1:
            this.imgWidth = '70%';
            this.imgHeight = 'auto';
            break;
          case 2:
            this.imgWidth = '200px';
            this.imgHeight = '400px';
            break;
          case 3:
            this.imgWidth = '200px';
            this.imgHeight = '200px';
            break;
          case 4:
            this.imgWidth = '200px';
            this.imgHeight = '200px';
        }
      }
    )
  }

  quoteTweet() {
    let body : NewTweet = {
      user_id : this.authService.parsedToken(),
      reply_id : null,
      content : this.content,
      media : null,
      likes : 0,
      user_name : this.mainUser.user_name,
      twitter_handle : this.mainUser.twitter_handle,
      profile_image : this.mainUser.profile_image,
      retweet_id : null,
      retweet_user_id : null,
      retweet_twitter_handle : null,
      quote_tweet_id : this.tweet.tweet_id,
      retweet_quoute_count : 0
    }
    this.tweetService.newTweet(body).subscribe();
    this.content = '';
  }

  getQuotedTweet() : void {
    if (this.tweet.quote_tweet_id) {
      this.tweetService.getTweet(this.tweet.quote_tweet_id).subscribe(
        res => {
          this.quotedTweet = res;
          if (this.quotedTweet.media) {
            this.quotedTweetMedias = JSON.parse(this.quotedTweet.media)
          }
        }
      )
    }
  }

  getUser() : void {
    const id = String(this.route.snapshot.paramMap.get('userId'));
    this.userService.getUser(id).subscribe(value => this.user = value  );
  }

  getMainUser() : void {
    this.userService.getUser(this.authService.parsedToken()).subscribe(value => this.mainUser = value  );
  }

  getTweets() : void {
    const id = String(this.route.snapshot.paramMap.get('tweetId'));
    this.tweetService.getTweetReplies(id).subscribe(value => this.tweets = value);
  }

  replyTweet() : void {
    let body : NewTweet = {
      user_id : this.authService.parsedToken(),
      reply_id : String(this.route.snapshot.paramMap.get('tweetId')),
      content : this.replyContent,
      media : null,
      likes : 0,
      user_name : this.mainUser.user_name,
      twitter_handle : this.mainUser.twitter_handle,
      profile_image : this.mainUser.profile_image,
      retweet_id : null,
      retweet_user_id : null,
      retweet_twitter_handle : null,
      quote_tweet_id : null,
      retweet_quoute_count : 0
    }
    this.tweetService.newTweet(body).subscribe();
    this.content = '';
    window.location.reload();
  }

  userClicked(id : string) : void {
    if (this.followRecoClickable) {
      this.router.navigate(['/user/', id], { relativeTo: this.route.root});
    }
  }

  followClicked() : void {
    if (this.authService.loggedIn()) {
      let body : FollowCheck = {
        follower_id : this.authService.parsedToken(),
        followee_id : this.user.user_id
      }
      if (this.following) {
        this.followingService.deleteFollow(body).subscribe();
        this.followMessage = "Follow"
        this.following = false
      } else {
        this.followingService.createFollow(body).subscribe();
        this.followMessage = "Following"
        this.following = true
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  followBGColor() : string {
    if (this.following) {
      return 'white'
    } else {
      return 'black';
    }
  }

  followBorderColor() : string {
    if (this.following) {
      console.log(this.followHover)
      if (this.followHover) {
        return 'red'
      } else {
        return 'darkgrey';
      }
    } else {
      return 'black';
    }
  }

  followTextColor() : string {
    if (this.following) {
      if (this.followHover) {
        return 'red'
      } else {
        return 'black';
      }
    } else {
      return 'white';
    }
  }

  checkIfFollowing() : void {
    let body : FollowCheck = {
      follower_id : this.authService.parsedToken(),
      followee_id : String(this.route.snapshot.paramMap.get('userId'))
    }
    this.followingService.checkFollowing(body).subscribe(
      res => {this.following = res;
        if (this.following) {
          this.followMessage = "Following"
        } else {
          this.followMessage = "Follow"
        }}
    )
  }

  clickLike() : void {
    if (this.authService.loggedIn()) {
      if (!this.liked){
        this.tweetService.establishLike(this.authService.parsedToken(), this.tweet.tweet_id).subscribe();
        this.liked = true;
        this.likedImgUrl = "https://img.icons8.com/ios-filled/100/F91880/hearts.png"
      } else {
        this.tweetService.deleteLike(this.authService.parsedToken(), this.tweet.tweet_id).subscribe();
        this.liked = false;
        this.likedImgUrl = "https://img.icons8.com/ios/100/536471/hearts--v1.png"
      }
    } else {
      this.router.navigate(['/login']);
    }
    
  }

  initLiked() : void {
    this.likeCount = this.tweet.likes;
    this.tweetService.likeExistence(this.authService.parsedToken(), this.tweet.retweet_id? this.tweet.retweet_id : this.tweet.tweet_id).subscribe(
      res => {
        this.liked = res;
        if (res) {
          this.likedImgUrl = "https://img.icons8.com/ios-filled/100/F91880/hearts.png"
        } else {
          this.likedImgUrl = "https://img.icons8.com/ios/100/536471/hearts--v1.png"
        }
      }
    );
  }

  initRetweet() {
    this.retweetCount = this.tweet.retweet_quoute_count;
    this.tweetService.retweetExistence(this.authService.parsedToken(), this.tweet.retweet_id? this.tweet.retweet_id : this.tweet.tweet_id).subscribe(
      res => {
        this.retweeted = res;
        if (res) {
          this.retweetImgUrl ="https://img.icons8.com/material-rounded/96/00ba7c/retweet.png"
        } else {
          this.retweetImgUrl ="https://img.icons8.com/material-rounded/96/536471/retweet.png"
        }
      }
    );
  }

  parseTweetMedia() : void {
    if (this.tweet.media) {
      this.tweetMedias = JSON.parse(this.tweet.media);
    }

    switch (this.tweetMedias.length) {
      case 1:
        this.imgWidth = '100%';
        this.imgHeight = 'auto';
        break;
      case 2:
        this.imgWidth = '200px';
        this.imgHeight = '400px';
        break;
      case 3:
        this.imgWidth = '200px';
        this.imgHeight = '200px';
        break;
      case 4:
        this.imgWidth = '200px';
        this.imgHeight = '200px';
    }
  }

  quoutedTweetClicked() : void {
    this.router.navigate([`/user/${this.quotedTweet?.user_id}/status/${this.quotedTweet?.tweet_id}`], { relativeTo: this.route.root} );
  }

  onRetweetClicked() : void {
    if (this.authService.loggedIn()) {
    this.retweetClicked = !this.retweetClicked;
    } else {
      this.router.navigate(['/login']);
    }
  }

  clickedOutside() : void {
    this.retweetClicked = false;
  }

  Retweet() {
    if (!this.tweetClickAvailable) {
      if (this.retweeted) {
        if (this.tweet.retweet_id) {
          this.tweetService.deleteRetweet(this.authService.parsedToken(), this.tweet.retweet_id).subscribe();
        } else {
          this.tweetService.deleteRetweet(this.authService.parsedToken(), this.tweet.tweet_id).subscribe();
        }
        this.retweeted = false;
        this.retweetCount -= 1;
        this.retweetImgUrl ="https://img.icons8.com/material-rounded/96/536471/retweet.png"
      } else {
        let body : NewTweet;
        if (this.tweet.retweet_id) {
          body = {
            user_id : this.tweet.user_id,
            reply_id : this.tweet.reply_id,
            content : this.tweet.content,
            media : this.tweet.media,
            likes : this.likeCount,
            user_name : this.tweet.user_name,
            twitter_handle : this.tweet.twitter_handle,
            profile_image : this.tweet.profile_image,
            retweet_id : this.tweet.retweet_id,
            retweet_user_id : this.user.user_id,
            retweet_twitter_handle : this.user.twitter_handle,
            quote_tweet_id : null,
            retweet_quoute_count : this.retweetCount + 1,
          }
        } else {
          body = {
            user_id : this.tweet.user_id,
            reply_id : this.tweet.reply_id,
            content : this.tweet.content,
            media : this.tweet.media,
            likes : this.likeCount,
            user_name : this.tweet.user_name,
            twitter_handle : this.tweet.twitter_handle,
            profile_image : this.tweet.profile_image,
            retweet_id : this.tweet.tweet_id,
            retweet_user_id : this.user.user_id,
            retweet_twitter_handle : this.user.twitter_handle,
            quote_tweet_id : null,
            retweet_quoute_count : this.retweetCount + 1,
          }
        }
        this.retweeted = true;
        this.retweetImgUrl ="https://img.icons8.com/material-rounded/96/00ba7c/retweet.png"
        this.retweetCount += 1;
        this.tweetService.newTweet(body).subscribe();
      }
      this.retweetClicked = !this.retweetClicked;
    }
    
  }
}
