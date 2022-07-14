import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { FollowingService } from 'src/app/services/following.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FollowCheck } from 'src/app/interfaces/follow';

@Component({
  selector: 'app-follow-recommendation',
  templateUrl: './follow-recommendation.component.html',
  styleUrls: ['./follow-recommendation.component.css']
})
export class FollowRecommendationComponent implements OnInit {

  @Input() user!: User;
  followMessage : string = 'Follow';
  following : boolean = false;
  followRecoClickable : boolean = true;
  followHover : boolean = false;

  constructor(
    private authService : AuthService,
    private router : Router,
    private followingService : FollowingService,
    private route : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initFollowing();
  }

  initFollowing() : void {
    let body : FollowCheck = {
      follower_id : this.authService.parsedToken(),
      followee_id : this.user.user_id
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

  userClicked() : void {
    this.router.navigate(['/user/', this.user.user_id], { relativeTo: this.route.root});
  }

  userContainerClicked() : void {
    if (this.followRecoClickable) {
      this.router.navigate(['/user/', this.user.user_id], { relativeTo: this.route.root});
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
}
