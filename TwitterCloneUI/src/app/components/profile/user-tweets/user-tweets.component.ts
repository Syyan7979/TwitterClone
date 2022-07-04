import { ActivatedRoute } from '@angular/router';
import { Tweet } from 'src/app/interfaces/tweet';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-tweets',
  templateUrl: './user-tweets.component.html',
  styleUrls: ['./user-tweets.component.css']
})
export class UserTweetsComponent implements OnInit {
  tweets : Tweet[] = [];
  constructor(
    private userService : UserService, 
    private route : ActivatedRoute
   ) { }

  ngOnInit(): void {
    this.getTweets();
  }

  getTweets() : void {
    let id : string = String(this.route.parent?.snapshot.paramMap.get('userId'))
    this.userService.getUserTweets(id).subscribe(value => this.tweets = value);
  }
}
