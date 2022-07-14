import { TweetService } from 'src/app/services/tweet.service';
import { Tweet } from 'src/app/interfaces/tweet';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-medias',
  templateUrl: './user-medias.component.html',
  styleUrls: ['./user-medias.component.css']
})
export class UserMediasComponent implements OnInit {

  tweets : Tweet[] = []
  constructor(private tweetService : TweetService, 
    private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.getTweets();
  }

  getTweets() : void {
    let id : string = String(this.route.parent?.snapshot.paramMap.get('userId'))
    this.tweetService.getUserMedias(id).subscribe(value => this.tweets = value);
  }

}
