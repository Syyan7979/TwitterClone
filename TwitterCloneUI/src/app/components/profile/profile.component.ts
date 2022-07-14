import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../interfaces/user'
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FollowingService } from 'src/app/services/following.service';
import { Follow, FollowCheck } from 'src/app/interfaces/follow';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  user: User | undefined;
  following? : boolean;
  followers ?: User[];
  followings ?: User[];
  followMessage : string = "Follow"
  currentUrl : string = "";

  constructor(
    private userService: UserService,
    private route : ActivatedRoute,
    private authService : AuthService,
    private router : Router,
    private followingService : FollowingService,
    private location : Location
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
    this.currentUrl = this.location.path();
   }

  ngOnInit(): void {
    this.getUser();
    this.checkIfFollowing();
  }

  getUser() : void {
    const id = String(this.route.snapshot.paramMap.get('userId'));
    this.userService.getUser(id).subscribe(
      res => {this.user = res; 
        this.getFollowers();
        this.getFollowings();}
    );
  }

  checkIfUser() : boolean {
    return this.authService.parsedToken() !== this.user?.user_id;
  }

  onClick(route : string) : void {
    if (route === '') {
      this.router.navigate([`${this.route.snapshot.url[0].path + '/' + this.route.snapshot.url[1].path}`], {relativeTo: this.route.parent})
    } else {
      this.router.navigate([`${route}`], {relativeTo: this.route})
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

  followClicked() : void {
    if (this.authService.loggedIn()) {
      let body : FollowCheck = {
        follower_id : this.authService.parsedToken(),
        followee_id : String(this.route.snapshot.paramMap.get('userId'))
      }
      if (this.following) {
        this.followingService.deleteFollow(body).subscribe();
        this.followMessage = "Follow"
        this.following = false;
      } else {
        this.followingService.createFollow(body).subscribe();
        this.followMessage = "Following"
        this.following = true;
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  getFollowers() : void {
    this.userService.getFollowers(this.user?.user_id).subscribe(res => this.followers = res);
  }

  getFollowings() : void {
    this.userService.getFollowings(this.user?.user_id).subscribe(res => this.followings = res);
  }

  followTypeClicked(name : string) : void {
    let id = String(this.route.snapshot.paramMap.get('userId'));
      this.router.navigate([`/user/${id}/${name}`], { relativeTo: this.route.root});
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
      return 'darkgrey';
    } else {
      return 'black';
    }
  }

  followTextColor() : string {
    if (this.following) {
      return 'black';
    } else {
      return 'white';
    }
  }
}
