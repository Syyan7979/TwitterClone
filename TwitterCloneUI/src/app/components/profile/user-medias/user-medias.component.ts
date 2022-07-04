import { Tweet } from 'src/app/interfaces/tweet';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-medias',
  templateUrl: './user-medias.component.html',
  styleUrls: ['./user-medias.component.css']
})
export class UserMediasComponent implements OnInit {

  tweets : Tweet[] = []
  constructor(private userService : UserService, 
    private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.getTweets();
  }

  getTweets() : void {
    let id : string = String(this.route.parent?.snapshot.paramMap.get('userId'))
    this.userService.getUserTweetsWithMedia(id).subscribe(value => this.tweets = value);
  }

}
