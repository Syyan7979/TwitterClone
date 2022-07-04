import { Component, OnInit } from '@angular/core';
import { Tweet } from 'src/app/interfaces/tweet';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-likes',
  templateUrl: './user-likes.component.html',
  styleUrls: ['./user-likes.component.css']
})
export class UserLikesComponent implements OnInit {

  tweets : Tweet[] = []
  constructor(private userService : UserService, 
    private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.getTweets();
  }

  getTweets() : void {
    let id : string = String(this.route.parent?.snapshot.paramMap.get('userId'))
    this.userService.getLikedTweets(id).subscribe(value => this.tweets = value);
  }

}
