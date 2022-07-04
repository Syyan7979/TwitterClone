import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../interfaces/user'
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FollowingService } from 'src/app/services/following.service';
import { Follow, FollowCheck } from 'src/app/interfaces/follow';
import { Observable, Subject} from 'rxjs'
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  public user: User | undefined;
  public following? : Follow;
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
    this.currentUrl = location.path();
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
    return this.authService.parsedToken() !== this.user?.userId;
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
      followerId : this.authService.parsedToken(),
      followeeId : String(this.route.snapshot.paramMap.get('userId'))
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
    let body : FollowCheck = {
      followerId : this.authService.parsedToken(),
      followeeId : String(this.route.snapshot.paramMap.get('userId'))
    }
    if (this.following) {
      this.followingService.deleteFollow(body).subscribe();
      this.followMessage = "Follow"
    } else {
      this.followingService.createFollow(body).subscribe();
      this.followMessage = "Following"
    }
  }

  getFollowers() : void {
    this.userService.getFollowers(this.user?.userId).subscribe(res => this.followers = res);
  }

  getFollowings() : void {
    this.userService.getFollowings(this.user?.userId).subscribe(res => this.followings = res);
  }

  
}
