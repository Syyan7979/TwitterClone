import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TweetService } from 'src/app/services/tweet.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import { NewTweet } from 'src/app/interfaces/tweet';
import { Router, ActivatedRoute } from '@angular/router';
import { SocketService } from 'src/app/services/socket.service';


@Component({
  selector: 'app-create-tweet',
  templateUrl: './create-tweet.component.html',
  styleUrls: ['./create-tweet.component.css']
})
export class CreateTweetComponent implements OnInit {

  constructor(
    private tweetService : TweetService, 
    private userService : UserService, 
    private authService : AuthService, 
    private router : Router, 
    private route : ActivatedRoute,
    private socketService : SocketService
  ) { }
  user !: User;
  content = ''
  newTweets = 0;

  selectedFiles : File[] = [];
  selectedImages : unknown[] = [];

  ngOnInit(): void {
    this.getUser();
    this.newTweets = 0;
  }

  newTweet() {
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
          quote_tweet_id : null,
          retweet_quoute_count : 0
        }
        this.tweetService.newTweet(body).subscribe();
        this.socketService.sendMessage('hello');
        this.content = '';
        this.newTweets += 1
        this.selectedFiles = [];
        this.selectedImages = [];
      }
    );
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

  async fileSelected(event : any) {
    if (this.selectedFiles.length < 4 && this.selectedFiles.length + event.target.files.length <= 4) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.selectedFiles.push(<File>event.target.files[i])
      }
      let images = await Promise.all(this.selectedFiles.map(f=>{return this.readAsDataURL(f)}));
      this.selectedImages = images;
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

}
