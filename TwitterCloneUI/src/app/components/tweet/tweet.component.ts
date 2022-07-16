import { Component, OnInit, Input } from '@angular/core';
import { Tweet, Dimensions, NewTweet } from 'src/app/interfaces/tweet';
import { User } from 'src/app/interfaces/user';
import { Router, ActivatedRoute } from '@angular/router';
import { TweetService } from 'src/app/services/tweet.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {

  @Input() tweet!: Tweet;
  quotedTweet?: Tweet;
  user !: User;

  liked : boolean = false;
  retweeted : boolean = false;

  tweetClickAvailable : boolean = true;
  likedImgUrl : string = "https://img.icons8.com/ios/100/536471/hearts--v1.png"
  retweetImgUrl : string = "https://img.icons8.com/material-rounded/96/536471/retweet.png"

  likeCount : number = 0;
  retweetCount : number = 0;

  tweetMedias : string[] = [];
  quotedTweetMedias : string[] = [];
  imgWidth : string = 'auto';
  imgHeight : string = 'auto';
  retweetClicked : boolean = false;
  
  content : string = ''
  selectedFiles : File[] = [];
  selectedImages : unknown[] = [];

  constructor( 
    private router : Router, 
    private route : ActivatedRoute,
    private tweetService: TweetService,
    public authService : AuthService,
    private userService : UserService) { }

  ngOnInit(): void {
    this.getUser();
    this.initLiked();
    this.initRetweet();
    this.parseTweetMedia();
    this.getQuotedTweet();
    console.log(this.tweet)
  }

  userClicked(id : string) : void {
    this.router.navigate(['/user/', id], { relativeTo: this.route.parent});
  }

  tweetClicked() : void {
    if (this.tweetClickAvailable) {
      this.router.navigate([`/user/${this.tweet.user_id}/status/${this.tweet.tweet_id}`], { relativeTo: this.route.root})
    }
  }

  clickLike() : void {
    if (this.authService.loggedIn()) {
      if (!this.liked){
        this.tweetService.establishLike(this.authService.parsedToken(), this.tweet.retweet_id? this.tweet.retweet_id : this.tweet.tweet_id).subscribe();
        this.liked = true;
        this.likedImgUrl = "https://img.icons8.com/ios-filled/100/F91880/hearts.png"
        this.likeCount += 1;
      } else {
        this.tweetService.deleteLike(this.authService.parsedToken(), this.tweet.retweet_id? this.tweet.retweet_id : this.tweet.tweet_id).subscribe();
        this.liked = false;
        this.likedImgUrl = "https://img.icons8.com/ios/100/536471/hearts--v1.png"
        this.likeCount -= 1;
      }
    } else {
      this.router.navigate(['/login']);
    }
    
  }

  getQuotedTweet() : void {
    if (this.tweet.quote_tweet_id) {
      this.tweetService.getTweet(this.tweet.quote_tweet_id).subscribe(
        res => {
          this.quotedTweet = res;
          if (this.quotedTweet.media) {
            this.quotedTweetMedias = JSON.parse(this.quotedTweet.media)
          }
          console.log(res)
        }
      )
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

  parseTweetMedia() : void {
    if (this.tweet.media) {
      this.tweetMedias = JSON.parse(this.tweet.media);
    }
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

  styleUpdate() : string {
    if (this.retweetClicked) {
      return 'opacity: 1; transform: translateY(0);'
    } else {
      return 'opacity: 0; transform: translateY(-10); transition: opacity 150ms ease-in-ease-out, transform 150ms ease-in-ease-out';
    }
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
            quote_tweet_id : this.tweet.quote_tweet_id? this.tweet.quote_tweet_id : null,
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
            quote_tweet_id : this.tweet.quote_tweet_id? this.tweet.quote_tweet_id : null,
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

  getUser() : void {
    this.userService.getUser(this.authService.parsedToken()).subscribe(res => this.user = res);
  }

  clickQuouteModal() {
    this.tweet = this.tweet;
  }

  quoteTweet() {
    let fd = new FormData();
    this.selectedFiles.forEach((file) => { fd.append('images', file, file.name) })
    this.tweetService.uploadPhotos(fd).subscribe(
      res => {
        let body : NewTweet = {
          user_id : this.authService.parsedToken(),
          reply_id : null,
          content : this.content,
          media : res === 'null'? res : JSON.stringify(res),
          likes : 0,
          user_name : this.user.user_name,
          twitter_handle : this.user.twitter_handle,
          profile_image : this.user.profile_image,
          retweet_id : null,
          retweet_user_id : null,
          retweet_twitter_handle : null,
          quote_tweet_id : this.tweet.tweet_id,
          retweet_quoute_count : 0
        }
        this.tweetService.newTweet(body).subscribe();
        this.content = '';
        this.selectedFiles = [];
        this.selectedImages = [];
      });
  }

  async fileSelected(event : any) {
    if (this.selectedFiles.length < 4 && this.selectedFiles.length + event.target.files.length <= 4) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.selectedFiles.push(<File>event.target.files[i])
      }
      let images = await Promise.all(this.selectedFiles.map(f=>{return this.readAsDataURL(f)}));
      this.selectedImages = images;
      console.log(this.selectedImages)
    } else {
      window.alert("Please choose up to 4 photos")
    }
  }

  readAsDataURL(file : File) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = function() {
        return resolve(reader.result);
      }
      reader.readAsDataURL(file);
    })
  }

  quoutedTweetClicked() : void {
    this.router.navigate([`/user/${this.quotedTweet?.user_id}/status/${this.quotedTweet?.tweet_id}`], { relativeTo: this.route.root} );
  }

}

